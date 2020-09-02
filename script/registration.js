import { Driver } from './driver.js';
import { Shipper } from './shipper.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'
import { isInputEmpty, redBorder } from './checkInputEmpty.js'


document.querySelector('.form-button').addEventListener('click', () => {

    let name = document.querySelector('#firstname');
    let lastname = document.querySelector('#lastname');
    let phone = document.querySelector('#phonenumber');
    let email = document.querySelector('#email');
    let pass = document.querySelector('#password');

    let err = false;

    let phoneReg = /^\d[\d\(\)\ -]{8,13}\d$/;
    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (isInputEmpty(name)) err = true;
    if (isInputEmpty(lastname)) err = true;
    if (emailReg.test(email.value) == false) {
        redBorder(email);
        err = true;
    }
    if (phoneReg.test(phone.value) == false) {
        redBorder(phone);
        err = true;
    }

    if (!window.location.href.includes('edit-profile')) {
        if (isInputEmpty(pass)) err = true;
    }


    if (getCookieValue('user') == 'driver' || getCookieValue()[0] == 'd') {
        let city = document.querySelector('#town');
        let anotherTown = document.querySelector('input[name=opportunity]:checked');

        if (isInputEmpty(city)) err = true;
        if (anotherTown == null) {
            err = true;

            let radiobuttons = document.querySelectorAll('label');
            for (let elem of radiobuttons) {
                elem.style.color = 'red';
                setTimeout(() => elem.removeAttribute('style'), 2000);
            }
        }
    }

    if (err) event.preventDefault();

    if (window.location.href.includes('edit-profile')) {
        checkEditEmail(email, event, err);
    } else {
        checkEqualEmail(email, event, err);
    }

});

function checkEqualEmail(mail, event, err) {

    let drivers = JSON.parse(localStorage.getItem('drivers'));

    for (let key in drivers) {
        if (drivers[key]._email == mail.value) {
            event.preventDefault();
            redBorder(email);
            return false;
        }
    }

    let shippers = JSON.parse(localStorage.getItem('shippers'));

    for (let key in shippers) {
        if (shippers[key]._email == mail.value) {
            event.preventDefault();
            redBorder(email);
            return false;
        }
    }

    if (window.location.href.includes('edit-profile') && mail.value && !err) {
        saveEditProfile();
        return true;
    }

    if (mail.value && !err) registration();
    return true;
}

function checkEditEmail(email, event, err) {

    if (getCookieValue()[0] == 'd') {
        let driver = Driver.getDriverById(getCookieValue().slice(1));
        if (driver.email != email.value) {
            checkEqualEmail(email, event, err);
        } else {
            if (!err) saveEditProfile();
        }
    } else {
        let shipper = Shipper.getShipperById(getCookieValue().slice(1));
        if (shipper.email != email.value) {
            checkEqualEmail(email, event, err);
        } else {
            if (!err) saveEditProfile();
        }
    }

}

function saveEditProfile() {
    let user;
    if (getCookieValue()[0] == 'd') {
        user = Driver.getDriverById(getCookieValue().slice(1));
        user.town = document.querySelector('#town').value;
        user.anotherTown = document.querySelector('input[name=opportunity]:checked').value;
    } else {
        user = Shipper.getShipperById(getCookieValue().slice(1));
    }

    user.name = document.querySelector('#firstname').value;
    user.lastname = document.querySelector('#lastname').value;
    user.phone = document.querySelector('#phonenumber').value;
    user.email = document.querySelector('#email').value;

    if (getCookieValue()[0] == 'd') {
        user.saveDriver()
    } else {
        user.saveShipper();
    }
}

function registration() {
    let name = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let phone = document.querySelector('#phonenumber').value;
    let email = document.querySelector('#email').value;
    let pass = document.querySelector('#password').value;

    let user;

    if (getCookieValue('user') == 'driver') {
        let town = document.querySelector('#town').value;
        let anotherTown = document.querySelector('input[name=opportunity]:checked').value;
        user = new Driver(name, lastname, phone, email, pass, town, anotherTown);
        user.saveDriver();
    } else {
        user = new Shipper(name, lastname, phone, email, pass);
        user.saveShipper();
    }
    setUserCookie(user);
}