import { validateSpotifyUrl } from '../validateSpotifyUrl';

// Test de la fonction validateSpotifyUrl
// ===========================================================================================
describe('validateSpotifyUrl', () => {
  const valid22CharId = '1234567890123456789012';
  const valid48CharId = '123456789012345678901212345678901234567890123456';

  // Test succès avec id de 22 chars et prefix pays
  it('returns true for a valid country-prefixed Spotify URL with 22-char ID', () => {
    const url = `https://open.spotify.com/intl-fr/album/${valid22CharId}`;
    expect(validateSpotifyUrl(url)).toBe(true);
  });

  // Test succès avec id de 48 chars et prefix pays
  it('returns true for a valid country-prefixed Spotify URL with 48-char ID', () => {
    const url = `https://open.spotify.com/intl-fr/album/${valid48CharId}`;
    expect(validateSpotifyUrl(url)).toBe(true);
  });

  // Test succès avec id de 22 chars et prefix international
  it('returns true for a valid international Spotify URL with 22-char ID', () => {
    const url = `https://open.spotify.com/album/${valid22CharId}`;
    expect(validateSpotifyUrl(url)).toBe(true);
  });

  // Test succès avec id de 48 chars et prefix international
  it('returns true for a valid international Spotify URL with 48-char ID', () => {
    const url = `https://open.spotify.com/album/${valid48CharId}`;
    expect(validateSpotifyUrl(url)).toBe(true);
  });

  // Test erreur: prefix invalide
  it('returns false if the prefix is invalid', () => {
    const url = `https://wrong.spotify.com/album/${valid22CharId}`;
    expect(validateSpotifyUrl(url)).toBe(false);
  });

  // Test erreur: id trop court
  it('returns false if the ID length is invalid (too short)', () => {
    const url = `https://open.spotify.com/album/shortid`;
    expect(validateSpotifyUrl(url)).toBe(false);
  });

  // Test erreur: id trop long
  it('returns false if the ID length is invalid (too long)', () => {
    const url = `https://open.spotify.com/album/${'x'.repeat(50)}`;
    expect(validateSpotifyUrl(url)).toBe(false);
  });
});
