import { User, createId } from './user.js'

export class Shipper extends User {

    constructor(name, lastName, phone, email, password, id, mark = 0, loads = []) {
        if (id == undefined) id = createId('shippers');
        super(id, name, lastName, phone, email, password, mark);
        this._loads = loads;
    }

    get loads() {
        return this._loads;
    }

    addLoad(load) {
        this._loads.push(load);
    }

    deleteLoadById(loadId) {
        this._loads = this._loads.filter(load => load != loadId);
    }

    saveShipper() {
        let shippersStorage = JSON.parse(localStorage.getItem('shippers'));
        shippersStorage[this._id] = this;
        localStorage.setItem('shippers', JSON.stringify(shippersStorage));
    }

    deleteShipper() {
        let shippersStorage = JSON.parse(localStorage.getItem('shippers'));
        delete shippersStorage[this._id];
        localStorage.setItem('shippers', JSON.stringify(shippersStorage));

    }

    static getShipperById(id) {
        let shipper = JSON.parse(localStorage.getItem('shippers'))[id];

        return new Shipper(shipper._name, shipper._lastName, shipper._phone, shipper._email, shipper._password, shipper._id, shipper._mark, shipper._loads);
    }
}