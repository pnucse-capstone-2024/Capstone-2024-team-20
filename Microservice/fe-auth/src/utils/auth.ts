export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function setUserType(userType: 'CLIENT' | 'PROVIDER') {
  localStorage.setItem('userType', userType);
}

export function getUserType(): 'CLIENT' | 'PROVIDER' {
  const userType = localStorage.getItem('userType');
  if (userType === 'CLIENT' || userType === 'PROVIDER') {
    return userType;
  }

  return null;
}

export function setUserEmail(email: string) {
  localStorage.setItem('userEmail', email);
}

export function getUserEmail() {
  return localStorage.getItem('userEmail');
}

export function setExp(exp: number) {
  localStorage.setItem('exp', exp.toString());
}

export function getExp() {
  return Number(localStorage.getItem('exp'));
}

export function removeUserSessionData() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userType');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('exp');
}

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
}

export function isExpiredToken() {
  return Number(Date.now() / 1000) >= getExp();
}
