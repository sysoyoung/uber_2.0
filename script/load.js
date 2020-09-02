import { createId } from './user.js'
import { Shipper } from './shipper.js';

export class Load {

    constructor(title, dimension, payload, description, beginAddress, endAddress, status, state, created_by, assigned_to, log, id) {
        if (id == undefined) id = createId('loads');
        this._id = id;

        this._title = title;
        this._dimension = dimension;
        this._payload = payload;
        this._description = description;

        this._beginAddress = beginAddress;
        this._endAddress = endAddress;

        this._status = status; // NEW POSTED ASSIGNED SHIPPED
        this._state = state; //En route to pick up, Arrived to pick up, En route to delivery, Arrived to delivery
        this._created_by = created_by;
        this._assigned_to = assigned_to;
        this._log = [...log];

    }

    get id() { return this._id; }

    get title() { return this._title; }
    set title(title) { this._title = title; }

    get dimension() { return this._dimension; }
    set dimension(dimension) { this._dimension = dimension; }

    get payload() { return this._payload; }
    set payload(payload) { this._payload = payload; }

    get description() { return this._description; }
    set description(description) { this._description = description; }

    get beginAddress() { return this._beginAddress; }
    set beginAddress(address) { this._beginAddress = address; }

    get endAddress() { return this._endAddress; }
    set endAddress(address) { this._endAddress = address; }

    get status() { return this._status; }
    set status(status) { this._status = status; }

    get state() { return this._state; }
    set state(state) { this._state = state; }

    get created_by() { return this._created_by; }

    get assigned_to() { return this._assigned_to; }
    set assigned_to(id) { this._assigned_to = id; }

    get log() { return this._log; }
    set log(log) { this._log[this._log.length] = log; }

    saveLoad() {
        let loadsStorage = JSON.parse(localStorage.getItem('loads'));
        loadsStorage[this._id] = this;
        localStorage.setItem('loads', JSON.stringify(loadsStorage));
    }

    deleteLoad() {
        let loadsStorage = JSON.parse(localStorage.getItem('loads'));
        delete loadsStorage[this._id];
        localStorage.setItem('loads', JSON.stringify(loadsStorage));

        let shipper = Shipper.getShipperById(this._created_by);
        shipper.deleteLoadById(this._id);
        shipper.saveShipper();
    }

    static getLoadById(id) {
        let load = JSON.parse(localStorage.getItem('loads'))[id];
        return new Load(load._title, load._dimension, load._payload, load._description, load._beginAddress, load._endAddress, load._status, load._state, load._created_by, load._assigned_to, load._log, load._id);
    }
}