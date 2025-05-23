// Ouvre un lien dans un nouvel onglet
// ===========================================================================================
export function openInANewTab(url: string): void {
  window.open(url, '_blank');
}
