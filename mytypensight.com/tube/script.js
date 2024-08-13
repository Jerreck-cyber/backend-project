document.getElementById('toggle-btn').addEventListener('click', function () {
    var sidebar = document.getElementById('sidebar');
    var content = document.querySelector('.content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
});

// Handle video upload
document.getElementById('upload-link').addEventListener('click', function () {
    document.getElementById('video-upload').click();
});

document.getElementById('video-upload').addEventListener('change', function (event) {
    var file = event.target.files[0];
    if (file) {
        var videoTitlePrompt = prompt("Enter the title for your video:", file.name);
        var videoTitleText = videoTitlePrompt ? videoTitlePrompt : file.name;

        var videoGrid = document.getElementById('video-grid');
        var newVideoThumbnail = document.createElement('div');
        newVideoThumbnail.className = 'video-thumbnail';

        var videoElement = document.createElement('video');
        videoElement.src = URL.createObjectURL(file);
        videoElement.controls = true;
        newVideoThumbnail.appendChild(videoElement);

        var videoTitle = document.createElement('p');
        videoTitle.textContent = videoTitleText;
        videoTitle.className = 'video-title';
        newVideoThumbnail.appendChild(videoTitle);

        var videoViews = document.createElement('p');
        videoViews.textContent = '0 views • Just now';
        newVideoThumbnail.appendChild(videoViews);

        videoGrid.appendChild(newVideoThumbnail);
    }
});

// Handle search functionality
document.querySelector('.search-container button').addEventListener('click', function () {
    var query = document.querySelector('.search-container input').value.toLowerCase();
    var videos = document.querySelectorAll('.video-thumbnail');
    videos.forEach(function (video) {
        var title = video.querySelector('.video-title').textContent.toLowerCase();
        if (title.includes(query)) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
});


