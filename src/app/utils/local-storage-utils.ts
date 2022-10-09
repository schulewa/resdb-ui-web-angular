const CURRENT_JWT: string = 'resdb_current_jwt';
const CURRENT_USER: string = 'resdb_current_user';

export function getCurrentJwt() {
  return localStorage.getItem(CURRENT_JWT);
}

export function removeCurrentJwt() {
  localStorage.removeItem(CURRENT_JWT);
}

export function storeCurrentJwt(jwt: string) {
  localStorage.setItem(CURRENT_JWT, jwt);
}

export function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER);
}

export function removeCurrentUser() {
  localStorage.removeItem(CURRENT_USER);
}

export function storeCurrentUser(user: string) {
  localStorage.setItem(CURRENT_USER, user);
}
