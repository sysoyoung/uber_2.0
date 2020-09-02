import { Load } from './load.js';
import { Shipper } from './shipper.js';
import { Driver } from './driver.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'
import { createLinkElem } from './create-truck-html.js';

createLoadlist();

function createLoadlist() {

    let shipperId = getCookieValue().slice(1);

    let loadsId = Shipper.getShipperById(shipperId).loads;

    let postedLoads = [];

    loadsId.forEach(id => {

        let load = Load.getLoadById(id);

        if (load.status == "NEW") {
            let div = createLoadHtml(load);
            document.querySelector('.main-content').append(div);
        } else {
            postedLoads.push(load);
        }
    });

    postedLoads.forEach(load => {
        let div = createLoadHtml(load);
        document.querySelector('.main-content').append(div);
    })
}

export function createLoadHtml(load) {
    let loadDiv = document.createElement('div');
    loadDiv.className = `load`;

    let loadHead = document.createElement('div');
    loadHead.className = `load-head`;

    let loadName = document.createElement('div');
    loadName.className = `load-name`;
    loadName.insertAdjacentText('afterbegin', `${load.title}`);
    if (load.status == "ASSIGNED") {
        let post = document.createElement('span');
        post.className = 'assigned-sign';
        post.insertAdjacentText('afterbegin', `ASSIGNED`);
        loadName.append(post);
    }
    if (load.status == "SHIPPED") {
        let post = document.createElement('span');
        post.className = 'shipped-sign';
        post.insertAdjacentText('afterbegin', `SHIPPED`);
        loadName.append(post);
    }

    let loadButtons = document.createElement('div');
    loadButtons.className = `load-buttons`;

    let infoButton = document.createElement('button');
    infoButton.className = `load${load.id} info-button content-button`;
    infoButton.insertAdjacentText('afterbegin', 'Info');
    let infoButtonLink = createLinkElem('load-moreinfo.html');
    infoButtonLink.prepend(infoButton);

    loadButtons.prepend(infoButtonLink);

    if (load.status == "NEW" || load.status == 'SHIPPED') {

        let deleteButton = document.createElement('button');
        deleteButton.className = `load${load.id} delete-button content-button`;
        deleteButton.insertAdjacentText('afterbegin', 'Delete');
        let deleteButtonLink = createLinkElem('shipper-main.html');
        deleteButtonLink.prepend(deleteButton);

        loadButtons.append(deleteButtonLink);
    }

    if (load.status == 'NEW') {
        let postButton = document.createElement('button');
        postButton.className = `load${load.id} agree-button content-button`;
        postButton.insertAdjacentText('afterbegin', 'Post');
        let postButtonLink = createLinkElem('shipper-main.html');
        postButtonLink.prepend(postButton);

        loadButtons.append(postButtonLink);
    }

    loadHead.append(loadName, loadButtons);

    loadDiv.append(loadHead);

    return loadDiv;
}