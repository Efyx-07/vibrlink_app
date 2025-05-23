// Récupère le token d'authentification dans le local-storage
// ===========================================================================================
export function getAuthTokenFromLocalStorage(): string | null {
  return localStorage.getItem('token');
}
