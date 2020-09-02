import { createId } from './user.js'

export class Truck {

    constructor(title, type, payload, dimensions, created_by, assigned_to = 0, status = 'IS', id) {
        if (id == undefined) id = createId('trucks');
        this._title = title;
        this._type = type;
        this._payload = payload;
        this._dimensions = dimensions;
        this._created_by = created_by;
        this._assigned_to = assigned_to;
        this._status = status;
        this._id = id;
    }

    get id() { return this._id; }
    get title() { return this._title }
    get payload() { return this._payload }
    get dimensions() { return this._dimensions }

    get type() { return this._type }
    get created_by() { return this._created_by }

    get assigned_to() { return this._assigned_to }
    set assigned_to(id) { this._assigned_to = id }

    get status() { return this._status }
    set status(status) { this._status = status }

    saveTruck() {
        let trucksStorage = JSON.parse(localStorage.getItem('trucks'));
        trucksStorage[this._id] = this;
        localStorage.setItem('trucks', JSON.stringify(trucksStorage));
    }

    deleteTruck() {
        let trucksStorage = JSON.parse(localStorage.getItem('trucks'));
        delete trucksStorage[this._id];
        localStorage.setItem('trucks', JSON.stringify(trucksStorage));
    }

    static getTruckById(id) {
        let truck = JSON.parse(localStorage.getItem('trucks'))[id];

        return new Truck(truck._title, truck._type, truck._payload, truck._dimensions, truck._created_by, truck._assigned_to, truck._status, truck._id);
    }
}

export class Sprinter extends Truck {
    constructor(title, created_by) {
        super(title, 'Sprinter', 1700, { width: 300, length: 250, height: 170 }, created_by);
    }
}

export class SmallStraite extends Truck {
    constructor(title, created_by) {
        super(title, 'Small Straite', 2500, { width: 500, length: 250, height: 170 }, created_by);
    }
}

export class LargeStraite extends Truck {
    constructor(title, created_by) {
        super(title, 'Long Straite', 4000, { width: 700, length: 350, height: 200 }, created_by);
    }
}