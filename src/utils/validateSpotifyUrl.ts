import { SpotifyEntry } from '@/interfaces/spotify.interface';

// Url Spotify valide: spotifyPrefix(Country or International) + spotifyId (22 or 48 chars)
// !!! spotifyCountryPrefix !== spotifyInternationalPrefix

const spotifyCountryPrefixRegex: RegExp =
  /^https:\/\/open\.spotify\.com\/intl-[a-z]{2}\/album\//; // example: https://open.spotify.com/intl-fr/album/
const spotifyInternationalPrefix: string = 'https://open.spotify.com/album/';
const regexString22: RegExp = /^.{22}$/;
const regexString48: RegExp = /^.{48}$/;

// Foncion pour valider une URL Spotify au bon format
// ===========================================================================================
export function validateSpotifyUrl(
  albumUrl: SpotifyEntry['albumUrl'],
): boolean {
  if (
    spotifyCountryPrefixRegex.test(albumUrl) ||
    albumUrl.startsWith(spotifyInternationalPrefix)
  ) {
    const spotifyId: string = spotifyCountryPrefixRegex.test(albumUrl)
      ? albumUrl.replace(spotifyCountryPrefixRegex, '')
      : albumUrl.replace(spotifyInternationalPrefix, '');

    if (regexString22.test(spotifyId) || regexString48.test(spotifyId))
      return true;
  }
  return false;
}
