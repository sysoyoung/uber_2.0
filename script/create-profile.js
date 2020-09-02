import { Driver } from './driver.js';
import { Shipper } from './shipper.js';
import { getCookieValue } from './changeCookie.js'

getUserInfo();

function getUserInfo() {
    let userIdent = getCookieValue();

    let user;

    if (userIdent[0] == 'd') {
        user = Driver.getDriverById(userIdent.slice(1));
    } else {
        user = Shipper.getShipperById(userIdent.slice(1))
    }

    document.querySelector('#name').insertAdjacentText('afterbegin', `${user.name} ${user.lastname}`);
    document.querySelector('#email').insertAdjacentText('afterbegin', user.email);
    document.querySelector('#phone').insertAdjacentText('afterbegin', user.phone);

    if (userIdent[0] == 'd') {
        document.querySelector('#town').insertAdjacentText('afterbegin', user.town);
        document.querySelector('#anothertown').insertAdjacentText('afterbegin', user.anotherTown);
    }
}