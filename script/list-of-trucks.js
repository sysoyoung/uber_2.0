document.querySelector('.main-content').addEventListener('click', () => {
    if (event.target.classList.contains('info-button')) {
        event.target.closest('.current-truck').classList.toggle('current-truck-fullinfo');
    }
});