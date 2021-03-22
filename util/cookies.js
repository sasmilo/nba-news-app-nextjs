import Cookies from 'js-cookie';

export function getDateFromCookie() {
  const date = Cookies.getJSON('gamedate') || [];
  return date;
}

export function deleteDateCookie() {
  const deleteCookie = Cookies.remove('gamedate');

  return deleteCookie;
}
