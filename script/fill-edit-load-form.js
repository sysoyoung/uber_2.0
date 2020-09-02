import { Load } from './load.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'

window.onload = () => {
    let load = Load.getLoadById(getCookieValue('load').slice(4));

    document.querySelector('#load-title').value = load.title;
    document.querySelector('#load-width').value = load.dimension.width;
    document.querySelector('#load-length').value = load.dimension.length;
    document.querySelector('#load-height').value = load.dimension.height;
    document.querySelector('#load-weight').value = load.payload;
    document.querySelector('#load-beginaddress').value = load.beginAddress;
    document.querySelector('#load-endaddress').value = load.endAddress;
    document.querySelector('#load-message').value = load.description;
}