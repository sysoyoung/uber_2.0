import { Driver } from './driver.js';
import { Truck } from './truck.js'
import { getCookieValue, setUserCookie } from './changeCookie.js'

document.querySelector('.main-content').addEventListener('click', function(event) {

    if (event.target.classList.contains('delete-button')) {
        let truck = Truck.getTruckById((event.target.classList[0]).slice(5));
        truck.deleteTruck();
    }
});