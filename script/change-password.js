import { Driver } from './driver.js';
import { Shipper } from './shipper.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'
import { isInputEmpty, redBorder } from './checkInputEmpty.js'

document.querySelector('.form-button').addEventListener('click', () => {

    let currentPass = document.querySelector('#prev-pass');
    let newPass = document.querySelector('#new-pass');

    let err = false;

    if (isInputEmpty(currentPass)) err = true;
    if (isInputEmpty(newPass)) err = true;

    let user;

    if (getCookieValue()[0] == 'd') {
        user = Driver.getDriverById(getCookieValue().slice(1));
    } else {
        user = Shipper.getShipperById(getCookieValue().slice(1));
    }

    if (user.password != currentPass.value) {
        err = true;
        redBorder(currentPass);
    }

    if (err) {
        event.preventDefault();
        return false;
    }

    user.password = newPass.value;

    if (getCookieValue()[0] == 'd') {
        user.saveDriver();
    } else {
        user.saveShipper();
    }
})