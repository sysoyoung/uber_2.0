export function isInputEmpty(element) {
    if (element.value == '') {
        redBorder(element)
        return true;
    }
    return false;
}

export function redBorder(element) {
    element.style.outline = '1px solid red';
    setTimeout(() => element.removeAttribute('style'), 2000);
}