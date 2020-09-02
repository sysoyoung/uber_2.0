import { User, createId } from './user.js';
import { Truck } from './truck.js'

export class Driver extends User {

    constructor(name, lastName, phone, email, password, town, anotherTown, id, mark = 0, truckId = 0, loadId = 0) {
        if (id == undefined) id = createId('drivers');
        super(id, name, lastName, phone, email, password, mark);
        this._town = town;
        this._anotherTown = anotherTown;
        this._truckId = truckId;
        this._loadId = loadId;
    }

    get town() { return this._town; }
    set town(town) { this._town = town }

    get anotherTown() { return this._anotherTown; }
    set anotherTown(anotherTown) { this._anotherTown = anotherTown; }

    get truckId() { return this._truckId; }
    set truckId(value) { this._truckId = value; }

    get loadId() { return this._loadId; }
    set loadId(value) { this._loadId = value; }

    saveDriver() {
        let driversStorage = JSON.parse(localStorage.getItem('drivers'));
        driversStorage[this._id] = this;
        localStorage.setItem('drivers', JSON.stringify(driversStorage));
    }

    deleteDriver() {
        let driversStorage = JSON.parse(localStorage.getItem('drivers'));
        delete driversStorage[this._id];
        localStorage.setItem('drivers', JSON.stringify(driversStorage));
    }

    static getDriverById(id) {
        let driver = JSON.parse(localStorage.getItem('drivers'))[id];

        return new Driver(driver._name, driver._lastName, driver._phone, driver._email, driver._password, driver._town, driver._anotherTown, driver._id, driver._mark, driver._truckId, driver._loadId);
    }
}