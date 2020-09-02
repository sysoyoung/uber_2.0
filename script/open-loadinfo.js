document.querySelector('.main-content').addEventListener('click', function(event) {
    if (event.target.classList.contains('info-button'))
        document.cookie = `load=${event.target.classList[0]}`;
});