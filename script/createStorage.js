let driverStorage = JSON.parse(localStorage.getItem('drivers'));
if (!driverStorage) localStorage.setItem('drivers', JSON.stringify({}));

let shipperStorage = JSON.parse(localStorage.getItem('shippers'));
if (!shipperStorage) localStorage.setItem('shippers', JSON.stringify({}));

let truckStorage = JSON.parse(localStorage.getItem('trucks'));
if (!truckStorage) localStorage.setItem('trucks', JSON.stringify({}));

let loadsStorage = JSON.parse(localStorage.getItem('loads'));
if (!loadsStorage) localStorage.setItem('loads', JSON.stringify({}));