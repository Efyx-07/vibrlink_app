export function getAuthTokenFromLocalStorage(): string | null {
  return localStorage.getItem('token');
}
