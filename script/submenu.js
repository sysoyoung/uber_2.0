let elem = document.querySelector('.profile-info');

document.addEventListener("click", () => {
    if (!document.querySelector('.submenu').classList.contains('display')) {
        document.querySelector('.submenu').classList.toggle('display');
    }
});

elem.addEventListener("click", () => {
    document.querySelector('.submenu').classList.toggle('display');
    event.stopPropagation();
});