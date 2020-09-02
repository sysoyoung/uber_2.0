import { Shipper } from './shipper.js'
import { Driver } from './driver.js'
import { getCookieValue, setUserCookie } from './changeCookie.js'


window.onload = () => {

    let userCookie = getCookieValue();
    let user;

    if (userCookie[0] == 's') {
        user = Shipper.getShipperById(userCookie.slice(1));
    } else {
        user = Driver.getDriverById(userCookie.slice(1));
    }

    document.querySelector('#firstname').value = user.name;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#email').value = user.email;
    document.querySelector('#phonenumber').value = user.phone;

    if (userCookie[0] == 'd') {
        document.querySelector('#town').value = user.town;
        if (user.anotherTown == 'yes') {
            document.querySelector('#yes-opportunity').checked = true;
        } else {
            document.querySelector('#no-opportunity').checked = true;
        }
    }
}