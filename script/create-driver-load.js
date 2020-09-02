import { Driver } from './driver.js';
import { Shipper } from './shipper.js';
import { Truck } from './truck.js'
import { Load } from './load.js'
import { getCookieValue, setUserCookie } from './changeCookie.js'
import { createLinkElem } from './create-truck-html.js';

window.onload = () => {
    let driver = Driver.getDriverById(getCookieValue().slice(1));

    if (driver.loadId == 0) {
        document.querySelector('.current-load').innerHTML = '';
        return false;
    }

    let load = Load.getLoadById(driver.loadId);

    document.querySelector('.load-name').insertAdjacentText('afterbegin', load.title);
    document.querySelector('.beginaddress').insertAdjacentText('afterbegin', load.beginAddress);
    document.querySelector('.endaddress').insertAdjacentText('afterbegin', load.endAddress);
    document.querySelector('.description').insertAdjacentText('afterbegin', load.description);

    let shipper = Shipper.getShipperById(load.created_by);

    document.querySelector('.shipper-name').insertAdjacentText('afterbegin', `${shipper.name} ${shipper.lastname}`);
    document.querySelector('.shipper-phone').insertAdjacentText('afterbegin', shipper.phone);
    document.querySelector('.shipper-email').insertAdjacentText('afterbegin', shipper.email);

    //En route to pick up, Arrived to pick up, En route to delivery, Arrived to delivery

    if (load.state == null) {
        let enRoutePickUpButton = createButton('En route to pick up');
        document.querySelector('.load-button-box').append(enRoutePickUpButton);
        enRoutePickUpButton.addEventListener('click', enRoutePickUpButtonHandler);
    } else if (load.state == 'En route to pick up') {
        let arrivedToPickUpButton = createButton('Arrived to pick up');
        document.querySelector('.load-button-box').append(arrivedToPickUpButton);
        arrivedToPickUpButton.addEventListener('click', arrivedToPickUpButtonHandler);
    } else if (load.state == 'Arrived to pick up') {
        let enRouteToDeliveryButton = createButton('En route to delivery');
        document.querySelector('.load-button-box').append(enRouteToDeliveryButton);
        enRouteToDeliveryButton.addEventListener('click', enRouteToDeliveryButtonHndler);
    } else {
        let arrivedToDeliveryButton = createButton('Arrived to delivery');
        document.querySelector('.load-button-box').append(arrivedToDeliveryButton);
        arrivedToDeliveryButton.addEventListener('click', arrivedToDeliveryButtonHndler);
    }
}

function createButton(text) {
    let button = document.createElement('button');
    button.className = 'agree-button content-button';
    button.insertAdjacentText('afterbegin', text);
    let buttonLink = createLinkElem('driver-main.html');
    buttonLink.prepend(button);
    return buttonLink;
}

function enRoutePickUpButtonHandler() {
    loadStateButtonHandler('En route to pick up');

}

function arrivedToPickUpButtonHandler() {
    loadStateButtonHandler('Arrived to pick up');
}

function enRouteToDeliveryButtonHndler() {
    loadStateButtonHandler('En route to delivery');
}

function arrivedToDeliveryButtonHndler() {
    loadStateButtonHandler('Arrived to delivery');

    let driver = Driver.getDriverById(getCookieValue().slice(1));
    let load = Load.getLoadById(driver.loadId);
    let truck = Truck.getTruckById(driver.truckId);

    truck.status = 'IS';
    truck.saveTruck();

    driver.loadId = 0;
    driver.saveDriver();

    load.status = 'SHIPPED';
    load.log = { 'shipped': new Date() };

    load.saveLoad();

}

function loadStateButtonHandler(state) {

    let driver = Driver.getDriverById(getCookieValue().slice(1));
    let load = Load.getLoadById(driver.loadId);

    load.state = state;
    let log = {};
    log[state] = new Date();
    load.log = log;
    load.saveLoad();
}