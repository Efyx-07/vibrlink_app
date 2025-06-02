import { openInANewTab } from '../openInANewTab';

// Test de la fonction openInANewTab
// ===========================================================================================
describe('openInANewTab', () => {
  it('should open the URL in a new tab', () => {
    const openMock = jest.fn();
    window.open = openMock;

    openInANewTab('https://example.com');

    expect(openMock).toHaveBeenCalledWith('https://example.com', '_blank');
  });
});
