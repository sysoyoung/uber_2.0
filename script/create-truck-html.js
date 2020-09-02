export function createTruckHtml(truck, assignLoad = false) {
    let currentTruckDiv = document.createElement('div');
    currentTruckDiv.className = `current-truck`;

    let currentTruckHead = document.createElement('div');
    currentTruckHead.className = `current-truck-head`;

    let truckName = document.createElement('div');
    truckName.className = `truck-name`;
    truckName.insertAdjacentText('afterbegin', truck.title);

    let truckButtons = document.createElement('div');
    truckButtons.className = `truck-buttons`;

    if (!assignLoad) {
        let takeButton = document.createElement('button');
        takeButton.className = `truck${truck.id} agree-button content-button`;
        takeButton.insertAdjacentText('afterbegin', 'Take');
        let takeButtonLink = createLinkElem('driver-main.html');
        takeButtonLink.prepend(takeButton);
        truckButtons.prepend(takeButtonLink);
    }

    let deleteButton = document.createElement('button');
    deleteButton.className = `truck${truck.id} delete-button content-button`;
    deleteButton.insertAdjacentText('afterbegin', 'Delete');
    let deleteButtonLink = createLinkElem('list-of-trucks.html');
    deleteButtonLink.prepend(deleteButton);

    let infoButton = document.createElement('button');
    infoButton.className = `info-button content-button truck-info`;
    infoButton.insertAdjacentText('afterbegin', 'Info');

    truckButtons.prepend(infoButton, deleteButtonLink);

    currentTruckHead.append(truckName, truckButtons);

    let moreInfo = document.createElement('div');
    moreInfo.className = `current-truck-moreinfo`;
    let arr = ['Tipe:', `${truck.type}`, 'Carrying capacity:', `${truck.payload}`, 'Size:', `Width: ${truck.dimensions.width}, Length: ${truck.dimensions.length}, Height: ${truck.dimensions.height}`]

    for (let i = 0; i < arr.length; i += 2) {
        let moreInfoItem = createMoreInfoItemHtml();
        let moreInfoTitle = createMoreInfoTitleHtml();
        moreInfoTitle.insertAdjacentText('afterbegin', arr[i]);
        let moreInfoText = createMoreInfoTextHtml();
        moreInfoText.insertAdjacentText('afterbegin', arr[i + 1]);
        moreInfoItem.append(moreInfoTitle, moreInfoText);
        moreInfo.append(moreInfoItem);
    }

    currentTruckDiv.prepend(currentTruckHead, moreInfo);

    return currentTruckDiv;
}

export function createMoreInfoItemHtml() {
    let div = document.createElement('div');
    div.className = `moreinfo-item`;
    return div;
}

export function createMoreInfoTitleHtml() {
    let div = document.createElement('div');
    div.className = `moreinfo-title`;
    return div;
}

export function createMoreInfoTextHtml() {
    let div = document.createElement('div');
    div.className = `moreinfo-text`;
    return div;
}

export function createLinkElem(link = '#') {
    let a = document.createElement('a');
    a.className = `content-link`;
    a.href = `${link}`;
    return a;
}