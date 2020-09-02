import { Load } from './load.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'

document.querySelector('.main-content').addEventListener('click', function(event) {

    if (event.target.classList.contains('delete-button')) {
        Load.getLoadById(event.target.classList[0].slice(4)).deleteLoad();
    }
})