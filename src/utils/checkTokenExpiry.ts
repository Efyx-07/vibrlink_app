import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

// Vérifie si le token est expiré, retourne un boolean
// ===========================================================================================
export default function isTokenExpired(token: string): boolean {
  if (!token) return true; // Si aucun token n'est fourni, considéré comme expiré
  try {
    const decodedToken = jwtDecode<DecodedToken>(token); // Décode le token avec JWT
    const currentTime = Date.now() / 1000; // Récupère l'heure actuelle en secondes
    return decodedToken.exp < currentTime; // Retourne true si le token est expiré
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
}
