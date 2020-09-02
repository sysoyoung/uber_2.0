import { getCookieValue, setUserCookie } from './changeCookie.js'

window.onload = () => {
    let selector;
    if (getCookieValue()[0] == 'd') {
        selector = '.driver-side';
    } else {
        selector = '.shipper-side';
    }

    let elems = document.querySelectorAll(selector);

    for (let elem of elems) {
        elem.style.display = 'block';
    }
}