// Initialize Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiamVycmVjayIsImEiOiJjbHhrajh6eGgwMXp4MmlwcDk5b3VsNWUzIn0.-Lgcpi44tH4Df3BkhlJJCg';

var mapboxMap = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jerreck/clxkm6aei01qh01qkhslc5zha',
    center: [-98.5795, 39.8283],
    zoom: 3
});

mapboxMap.on('load', function () {
    fetch('us-states.geojson')
        .then(response => response.json())
        .then(data => {
            mapboxMap.addSource('states', {
                type: 'geojson',
                data: data
            });

            mapboxMap.addLayer({
                'id': 'state-layer',
                'type': 'fill',
                'source': 'states',
                'layout': {},
                'paint': {
                    'fill-color': '#888888',
                    'fill-opacity': 0.5
                }
            });

            mapboxMap.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'states',
                'layout': {},
                'paint': {
                    'line-color': '#ffffff',
                    'line-width': 2
                }
            });

            mapboxMap.on('click', 'state-layer', function (e) {
                var coordinates = e.lngLat;
                var stateName = e.features[0].properties.name;
                var stateCode = e.features[0].properties.state;

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML('<h3>' + stateName + '</h3><p>State Code: ' + stateCode + '</p>')
                    .addTo(mapboxMap);
            });

            mapboxMap.on('mouseenter', 'state-layer', function () {
                mapboxMap.getCanvas().style.cursor = 'pointer';
            });

            mapboxMap.on('mouseleave', 'state-layer', function () {
                mapboxMap.getCanvas().style.cursor = '';
            });
        });
});

// Function to toggle between globe and flat view on Mapbox
document.getElementById('viewToggle').addEventListener('click', function () {
    if (mapboxMap.getProjection().name === 'mercator') {
        mapboxMap.setProjection('globe');
    } else {
        mapboxMap.setProjection('mercator');
    }
});

// Initialize Chart.js
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', etc.
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

