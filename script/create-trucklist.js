import { Driver } from './driver.js';
import { Sprinter, SmallStraite, LargeStraite, Truck } from './truck.js'
import { getCookieValue, setUserCookie } from './changeCookie.js'
import { createTruckHtml, createMoreInfoItemHtml, createMoreInfoTitleHtml, createMoreInfoTextHtml } from './create-truck-html.js';


createTrucklist();

function createTrucklist() {

    let driverId = getCookieValue().slice(1);
    let driver = Driver.getDriverById(driverId);
    let trucks = JSON.parse(localStorage.getItem('trucks'));
    for (let key in trucks) {
        let truck = Truck.getTruckById(key);
        if (truck.created_by == driverId && truck.assigned_to == 0) {
            let div = createTruckHtml(truck, driver.loadId != 0);
            document.querySelector('.main-content').append(div);
        }
    }
}