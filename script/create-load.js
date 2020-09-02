import { Load } from './load.js';
import { Shipper } from './shipper.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'
import { isInputEmpty, redBorder } from './checkInputEmpty.js'

document.querySelector('.form-button').addEventListener('click', () => {

    let load = getLoad();
    let err = false;

    if (isInputEmpty(load.title)) err = true;
    if (isInputEmpty(load.width)) err = true;
    if (isInputEmpty(load.length)) err = true;
    if (isInputEmpty(load.height)) err = true;
    if (isInputEmpty(load.weight)) err = true;
    if (isInputEmpty(load.beginAddress)) err = true;
    if (isInputEmpty(load.endAddress)) err = true;

    if (err) {
        event.preventDefault();
        return false
    } else {
        if (window.location.href.includes('load-edit')) {
            updateLoad()
        } else {
            createLoad();
        }
    }
})

function createLoad() {
    let load = getLoadValue();
    let log = [{ 'created': new Date() }];
    let newLoad = new Load(load.title, { width: +load.width, length: +load.length, height: +load.height }, +load.weight, load.message, load.beginAddress, load.endAddress, 'NEW', null, +getCookieValue().slice(1), 0, log)
    newLoad.saveLoad();

    let shipper = Shipper.getShipperById(getCookieValue().slice(1));
    shipper.addLoad(newLoad.id);
    shipper.saveShipper();
}

function updateLoad() {

    let newLoad = getLoadValue();
    let log = { 'updated': new Date() };
    let load = Load.getLoadById(getCookieValue('load').slice(4));

    load.title = newLoad.title;
    load.dimension = { width: newLoad.width, length: newLoad.length, height: newLoad.height };
    load.payload = newLoad.weight;
    load.beginAddress = newLoad.beginAddress;
    load.endAddress = newLoad.endAddress;
    load.description = newLoad.message;
    load.log = log;

    load.saveLoad();
}

function getLoad() {
    let title = document.querySelector('#load-title');
    let width = document.querySelector('#load-width');
    let length = document.querySelector('#load-length');
    let height = document.querySelector('#load-height');
    let weight = document.querySelector('#load-weight');
    let beginAddress = document.querySelector('#load-beginaddress');
    let endAddress = document.querySelector('#load-endaddress');
    let message = document.querySelector('#load-message');

    return {
        title,
        width,
        length,
        height,
        weight,
        beginAddress,
        endAddress,
        message,
    }
}

function getLoadValue() {
    let load = getLoad();

    return {
        title: load.title.value,
        width: load.width.value,
        length: load.length.value,
        height: load.height.value,
        weight: load.weight.value,
        beginAddress: load.beginAddress.value,
        endAddress: load.endAddress.value,
        message: load.message.value,
    }
}