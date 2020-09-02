import { Driver } from './driver.js';
import { Truck } from './truck.js'
import { getCookieValue, setUserCookie } from './changeCookie.js'
import { createTruckHtml, createLinkElem } from './create-truck-html.js';


createAssignedTruck();

function createAssignedTruck() {

    let driver = Driver.getDriverById(getCookieValue().slice(1))
    let truckId = driver.truckId;

    if (truckId != 0) {
        let truck = Truck.getTruckById(truckId);
        let truckHtml = createTruckHtml(truck);

        deleteTruckButtons(truckHtml);

        if (driver.loadId == 0) {
            let relieveButton = createRelieveButton();
            truckHtml.querySelector('.info-button').after(relieveButton);
        }

        document.querySelector('.current-truck').replaceWith(truckHtml);

        truckHtml.addEventListener('click', () => {
            if (event.target.classList.contains('info-button'))
                document.querySelector('.current-truck').classList.toggle('current-truck-fullinfo');
        });
    }
}

function deleteTruckButtons(truckHtml) {
    truckHtml.querySelector('.content-link').remove();
    truckHtml.querySelector('.content-link').remove();
}

function createRelieveButton() {

    let button = document.createElement('button');
    button.className = `delete-button content-button`;
    button.insertAdjacentText('afterbegin', 'Relieve');

    let link = createLinkElem('driver-main.html');
    link.prepend(button);

    return link;
}