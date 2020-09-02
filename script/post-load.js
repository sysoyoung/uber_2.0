import { Load } from './load.js';
import { Driver } from './driver.js';
import { Truck } from './truck.js';
import { getCookieValue, setUserCookie } from './changeCookie.js';


document.querySelector('.main-content').addEventListener('click', function(event) {
    if (event.target.classList.contains('agree-button')) {
        let load = Load.getLoadById(event.target.classList[0].slice(4));

        load.status = 'POSTED';
        load.log = { 'posted': new Date() };

        let drivers = JSON.parse(localStorage.getItem('drivers'));

        if (checkEqualCity(load)) {
            for (let key in drivers) {
                let driver = Driver.getDriverById(key);
                if (driver.truckId != 0) {
                    if (assigneToSuitTruck(load, driver)) return true;
                }
            }
        } else {
            for (let key in drivers) {
                let driver = Driver.getDriverById(key);
                if (driver.truckId != 0 && driver.anotherTown == 'yes') {
                    if (assigneToSuitTruck(load, driver)) return true;
                }
            }
        }

        load.status = 'NEW';
        load.log = { 'rolled back': new Date() };
        load.saveLoad();

    }
})

function checkEqualCity(load) {
    if (load.beginAddress == load.endAddress) return true;
    return false;
}

function assigneToSuitTruck(load, driver) {
    let truck = Truck.getTruckById(driver.truckId);

    if (truck.payload > load.payload &&
        truck.dimensions.width > load.dimension.width &&
        truck.dimensions.length > load.dimension.length &&
        truck.dimensions.height > load.dimension.height &&
        truck.status == 'IS') {

        load.assigned_to = truck.assigned_to;
        load.status = 'ASSIGNED';
        load.log = { 'assigned': new Date() };
        load.saveLoad();

        truck.status = 'OL';
        truck.saveTruck();

        driver.loadId = load.id;
        driver.saveDriver();

        return true;
    }
    return false;
}