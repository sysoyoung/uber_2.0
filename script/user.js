export class User {

    constructor(id, name, lastName, phone, email, password, mark) {
        this._id = id;
        this._name = name;
        this._lastName = lastName;
        this._phone = phone;
        this._email = email;
        this._password = password;
        this._mark = mark;
    }

    get id() { return this._id; }

    get name() { return this._name; }
    set name(name) { this._name = name; }

    get lastname() { return this._lastName; }
    set lastname(lastName) { this._lastName = lastName; }

    get phone() { return this._phone; }
    set phone(phone) { this._phone = phone }

    get email() { return this._email; }
    set email(email) { this._email = email }

    get password() { return this._password }
    set password(pass) { this._password = pass; }

    get mark() { return this._mark; }
    set mark(value) {
        if (this._mark == 0) {
            this._mark = value;
        } else {
            this._mark = (this._mark + value) / 2;
        }
    }
}

export function createId(storage) {
    let users = JSON.parse(localStorage.getItem(`${storage}`));
    users = Object.keys(users);
    let i = 1;
    while (true) {
        if (users.includes(i.toString())) {
            i++;
        } else {
            return i;
        }
    }
}