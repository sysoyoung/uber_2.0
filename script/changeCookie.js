import { Driver } from './driver.js';

export function getCookieValue(name = 'user') {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setUserCookie(user) {
    if (user instanceof Driver) {
        document.cookie = `user=d${user.id}`
    } else {
        document.cookie = `user=s${user.id}`
    }
}