// script.js

// Code from visual002.html
const fileInput = document.getElementById('audioFile');
const canvas = document.getElementById('visualizer');
const canvasCtx = canvas.getContext('2d');
const barWidthControl = document.getElementById('barWidth');
const barHeightControl = document.getElementById('barHeight');
const loginButton = document.getElementById('loginButton');
const topTracksButton = document.getElementById('topTracksButton');

let audioCtx;
let analyser;
let audioSrc;
let audioElement;
let barWidth = 1.5;
let barHeightMultiplier = 1.5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

barWidthControl.addEventListener('input', function() {
    barWidth = parseFloat(this.value);
});

barHeightControl.addEventListener('input', function() {
    barHeightMultiplier = parseFloat(this.value);
});

loginButton.addEventListener('click', () => {
    const client_id = 'e28d188f008c489aae294bae8420b298';
    const redirect_uri = 'https://aca7-2600-6c56-5000-600-c03e-6863-7269-8759.ngrok-free.app/callback'; // Update this to your ngrok URL

    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const scopes = [
        'user-read-currently-playing',
        'user-read-playback-state',
        'user-top-read',
        'streaming',
    ];

    const authUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&show_dialog=true`;
    window.location = authUrl;
});

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1).split('&').reduce((initial, item) => {
        if (item) {
            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});

    window.location.hash = '';

    let _token = hash.access_token;

    if (_token) {
        document.getElementById('controls').style.display = 'block';
        topTracksButton.style.display = 'block';

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(_token);

        topTracksButton.addEventListener('click', async () => {
            const topTracks = await getTopTracks(spotifyApi);
            console.log(
                topTracks?.map(
                    ({name, artists}) =>
                        `${name} by ${artists.map(artist => artist.name).join(', ')}`
                )
            );
            if (topTracks && topTracks.length > 0) {
                startVisualizer(topTracks[0].preview_url);
            }
        });
    }
});

async function fetchWebApi(endpoint, method, token, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}

async function getTopTracks(spotifyApi) {
    return (await spotifyApi.getMyTopTracks({
        time_range: 'long_term',
        limit: 5
    })).items;
}

function startVisualizer(previewUrl) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;

    audioElement = new Audio(previewUrl);

    audioSrc = audioCtx.createMediaElementSource(audioElement);
    audioSrc.connect(analyser);
    analyser.connect(audioCtx.destination);

    audioElement.play().catch(error => {
        console.error("Error playing the audio:", error);
    });

    visualize();

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function visualize() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidthCalculated = (canvas.width / bufferLength) * barWidth;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * barHeightMultiplier;

            const red = (barHeight + 100) % 255;
            const green = (x / canvas.width) * 255;
            const blue = 50 + (barHeight / 255) * 200;

            const gradient = canvasCtx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
            gradient.addColorStop(0, `rgba(${red},${green},${blue},1)`);
            gradient.addColorStop(1, `rgba(${red},${green},${blue},0.5)`);

            canvasCtx.fillStyle = gradient;
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidthCalculated, barHeight);
            x += barWidthCalculated + 1;
        }
    }

    draw();
}

// Code from callback.html
const hashCallback = window.location.hash.substring(1).split('&').reduce((initial, item) => {
    if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
}, {});

window.location.hash = '';

localStorage.setItem('spotify_token', hashCallback.access_token);

window.location.href = '/visual002.html';

