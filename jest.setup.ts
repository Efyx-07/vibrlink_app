import '@testing-library/jest-dom';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('Error in geocoding address') ||
      message.includes('No geocoding results found')
    ) {
      return; // silence ces erreurs spécifiques
    }

    // Sinon, fallback vers console.warn ou autre si tu veux les garder
    // console.warn('[console.error mock]', ...args); // <- commentaire ou suppression
  });

  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('Error fetching monuments data') ||
      message.includes('Network error')
    ) {
      return; // silence les warnings spécifiques
    }

    // Garde les autres warnings si besoin
    // console.log('[console.warn fallback]', ...args); // optionnel
  });
});
