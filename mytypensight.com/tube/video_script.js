document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('videoId');

    if (videoId) {
        const videoData = JSON.parse(localStorage.getItem(videoId));

        if (videoData) {
            const videoPlayer = document.getElementById('videoPlayer');
            const titleElement = document.getElementById('videoTitle');
            const viewsElement = document.getElementById('videoViews');

            videoPlayer.querySelector('source').src = videoData.url;
            videoPlayer.querySelector('source').type = videoData.type;
            videoPlayer.load();

            titleElement.textContent = videoData.title;
            viewsElement.textContent = `${videoData.views} views`;

            // Handle like button
            const likeButton = document.getElementById('likeButton');
            likeButton.addEventListener('click', () => {
                alert('Liked!');
            });

            // Handle subscribe button
            const subscribeButton = document.getElementById('subscribeButton');
            subscribeButton.addEventListener('click', () => {
                alert('Subscribed!');
            });

            // Handle comments
            const commentForm = document.getElementById('commentForm');
            const commentsList = document.getElementById('commentsList');

            commentForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const commentText = document.getElementById('commentText').value;
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.textContent = commentText;
                commentsList.appendChild(commentItem);
                document.getElementById('commentText').value = '';
            });
        }
    }
});


