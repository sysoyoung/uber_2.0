import { Driver } from './driver.js';
import { Shipper } from './shipper.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'
import { isInputEmpty, redBorder } from './checkInputEmpty.js'

document.querySelector('.login').addEventListener('click', () => {

    let email = document.querySelector('#form-email');
    let pass = document.querySelector('#form-pass');

    let err = false;

    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailReg.test(email.value) == false) {
        redBorder(email);
        err = true;
    }

    if (isInputEmpty(pass)) err = true;

    if (err) {
        event.preventDefault();
        return err
    }

    findUserEmail(email, pass);
});

function findUserEmail(mail, pass) {

    let drivers = JSON.parse(localStorage.getItem('drivers'));

    for (let key in drivers) {
        if (drivers[key]._email == mail.value) {
            document.querySelector('.enter-link').href = 'http://localhost:8080/pages/driver-main.html';
            checkPass(pass, drivers[key], `d${drivers[key]._id}`);
            return true;
        }
    }

    let shippers = JSON.parse(localStorage.getItem('shippers'));

    for (let key in shippers) {
        if (shippers[key]._email == mail.value) {
            document.querySelector('.enter-link').href = 'http://localhost:8080/pages/shipper-main.html';
            checkPass(pass, shippers[key], `s${shippers[key]._id}`);
            return true;
        }
    }

    event.preventDefault();
    redBorder(mail);
    return false;
}

function checkPass(pass, user, userCookie) {

    if (pass.value == user._password) {
        document.cookie = `user=${userCookie}`;
        return true;
    }

    event.preventDefault();
    redBorder(pass);
    return false;
}