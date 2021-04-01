import Cookies from 'js-cookie';

export function setDateCookieClientSide(newDate) {
  Cookies.set('gamedate', newDate);
}

export function setSearchCookieClientSide(newSearch) {
  Cookies.set('search', newSearch);
}

export function getSearchFromCookie() {
  const search = Cookies.get('search') || [];
  return search;
}

export function getDateFromCookie() {
  const date = Cookies.get('gamedate') || [];
  return date;
}

export function deleteDateCookie() {
  const deleteCookie = Cookies.remove('gamedate');

  return deleteCookie;
}

export function deleteSearchCookie() {
  const deleteSrchCookie = Cookies.remove('search');

  return deleteSrchCookie;
}
