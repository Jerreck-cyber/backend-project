
let db;
let request = indexedDB.open('videoDatabase', 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    db.createObjectStore('videos', { keyPath: 'id', autoIncrement: true });
    console.log('IndexedDB setup complete');
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log('IndexedDB opened successfully');
    loadUploads(); // Load uploads on page load if on the uploads page
};

request.onerror = function(event) {
    console.error('Database error:', event.target.errorCode);
};

document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle functionality
    document.getElementById('sidebarToggle').addEventListener('click', function () {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    });

    // Edit profile link functionality
    document.getElementById('editProfileLink').addEventListener('click', function () {
        var editProfileOptions = document.getElementById('editProfileOptions');
        editProfileOptions.classList.toggle('hidden');
    });

    // Upload video link functionality
    document.getElementById('uploadVideoLink').addEventListener('click', function () {
        document.getElementById('uploadVideo').click();
    });

    // Profile picture upload functionality
    document.getElementById('uploadProfilePicture').addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.querySelector('.profile-picture').style.backgroundImage = 'url(' + event.target.result + ')';
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // Background upload functionality
    document.getElementById('uploadBackground').addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.body.style.backgroundImage = 'url(' + event.target.result + ')';
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // Video upload functionality
    document.getElementById('uploadVideo').addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function (event) {
            var videoData = event.target.result;

            let transaction = db.transaction(['videos'], 'readwrite');
            let objectStore = transaction.objectStore('videos');
            let request = objectStore.add({ videoData });

            request.onsuccess = function(event) {
                console.log('Video uploaded successfully');

                // Clear the input value to allow re-uploading the same file
                e.target.value = '';

                // Redirect to video uploads page if uploading from profile or uploads page
                document.location.href = 'video-uploads.html';
            };

            request.onerror = function(event) {
                console.error('Error uploading video:', event.target.errorCode);
            };
        };
        reader.readAsDataURL(file);
    });

    // Function to load all uploads into uploads feed
    function loadUploads() {
        let transaction = db.transaction(['videos'], 'readonly');
        let objectStore = transaction.objectStore('videos');
        let request = objectStore.getAll();

        request.onsuccess = function(event) {
            let uploadsFeed = document.getElementById('uploadsFeed');
            if (uploadsFeed) {
                uploadsFeed.innerHTML = ''; // Clear existing uploads
                event.target.result.forEach(function (video) {
                    let videoContainer = document.createElement('div');
                    videoContainer.className = 'video-container';
                    videoContainer.innerHTML = '<video controls src="' + video.videoData + '"></video>';
                    uploadsFeed.appendChild(videoContainer);
                });
                console.log('Videos loaded successfully');
            }
        };
    }

    if (document.getElementById('uploadsFeed')) {
        loadUploads();
    }
});
