import { Driver } from './driver.js';
import { Shipper } from './shipper.js';
import { Truck } from './truck.js'
import { Load } from './load.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'

document.querySelector('.delete-user').addEventListener('click', () => {
    let userId = getCookieValue().slice(1);
    if (getCookieValue()[0] == 'd') {
        Driver.getDriverById(userId).deleteDriver();
        let trucks = JSON.parse(localStorage.getItem('trucks'));
        for (let key in trucks) {
            let truck = Truck.getTruckById(key);
            if (truck.created_by == userId) {
                truck.deleteTruck();
            }
        }
    } else {
        let shipper = Shipper.getShipperById(userId);
        shipper.loads.forEach(loadId => {
            Load.getLoadById(loadId).deleteLoad();
        })
        shipper.deleteShipper();
    }
})