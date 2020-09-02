import { Load } from './load.js';
import { getCookieValue, setUserCookie } from './changeCookie.js'

window.onload = () => {

    let load = Load.getLoadById(getCookieValue('load').slice(4));

    document.querySelector('h1').insertAdjacentText('afterbegin', `${load.title}`);
    document.querySelector('.width-info').insertAdjacentText('afterbegin', `${load.dimension.width}`);
    document.querySelector('.length-info').insertAdjacentText('afterbegin', `${load.dimension.length}`);
    document.querySelector('.height-info').insertAdjacentText('afterbegin', `${load.dimension.height}`);
    document.querySelector('.weight-info').insertAdjacentText('afterbegin', `${load.payload}`);
    document.querySelector('.beginaddress-info').insertAdjacentText('afterbegin', `${load.beginAddress}`);
    document.querySelector('.endaddress-info').insertAdjacentText('afterbegin', `${load.endAddress}`);
    document.querySelector('.description-info').insertAdjacentText('afterbegin', `${load.description}`);

    if (load.status == 'NEW') {
        let editItem = createLoadMenuItem('load-edit.html', `Edit`);
        document.querySelector('.sidebar>ul').append(editItem);
    }

    if (load.status == 'SHIPPED' || load.status == 'NEW') {
        let deleteItem = createLoadMenuItem('shipper-main.html', `Delete`);
        document.querySelector('.sidebar>ul').append(deleteItem);
        deleteItem.addEventListener('click', () => {
            load.deleteLoad();
        });
    }
}

function createLoadMenuItem(link, text) {
    let Item = document.createElement('li');
    let Link = document.createElement('a');
    Link.className = 'addit-menu';
    Link.href = link;
    Link.insertAdjacentText('afterbegin', text);
    Item.append(Link);
    return Item;
}