import Cookies from 'js-cookie';

export function setDateCookieClientSide(gameDate) {
  Cookies.set('gamedate', gameDate);
}
