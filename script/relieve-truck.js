import { Driver } from './driver.js';
import { Truck } from './truck.js'
import { getCookieValue, setUserCookie } from './changeCookie.js'

document.querySelector('.current-truck').addEventListener('click', function(event) {

    if (event.target.classList.contains('delete-button')) {

        let driver = Driver.getDriverById(getCookieValue().slice(1));

        let truck = Truck.getTruckById(driver.truckId);
        truck.assigned_to = 0;
        truck.saveTruck();

        driver.truckId = 0;
        driver.saveDriver();

        document.querySelector('.current-truck').innerHTML = '';
    }
});