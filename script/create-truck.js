import { Sprinter, SmallStraite, LargeStraite } from './truck.js'
import { isInputEmpty, redBorder } from './checkInputEmpty.js'
import { getCookieValue, setUserCookie } from './changeCookie.js'

document.querySelector('.form-button').addEventListener('click', () => {

    let title = document.querySelector('#truck-title');
    let category = document.querySelector('#truck-category');

    let err = false;

    if (isInputEmpty(title)) {
        err = true;
    }
    if (isInputEmpty(category)) {
        err = true;
    }

    if (err) {
        event.preventDefault();
        return false;
    }

    createTruck(title.value, category.value);

    return err;
});

function createTruck(title, category) {
    let truck;
    switch (category) {
        case 'Sprinter':
            truck = new Sprinter(title, +getCookieValue().slice(1));
            break;
        case 'Small Straite':
            truck = new SmallStraite(title, +getCookieValue().slice(1));
            break;
        case 'Long Straite':
            truck = new LargeStraite(title, +getCookieValue().slice(1));
            break;
    }
    truck.saveTruck();
}