import { Driver } from './driver.js';
import { Truck } from './truck.js'
import { getCookieValue, setUserCookie } from './changeCookie.js'

document.querySelector('.main-content').addEventListener('click', function(event) {

    if (event.target.classList.contains('agree-button')) {

        let driver = Driver.getDriverById(getCookieValue().slice(1));
        if (!driver._truckId == 0) {
            let truck = Truck.getTruckById(driver._truckId);
            truck.assigned_to = 0;
            truck.saveTruck();
        }
        driver._truckId = (event.target.classList[0]).slice(5);
        driver.saveDriver();

        let truck = Truck.getTruckById((event.target.classList[0]).slice(5));
        truck.assigned_to = +getCookieValue().slice(1);
        truck.saveTruck();

    }
});