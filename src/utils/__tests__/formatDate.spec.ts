import { formatDate, timeAgo } from '../formatDate';

// Test de la fonction formatDate
// ===========================================================================================
describe('formatDate', () => {
  it('should format the date as yyyy-MM-dd', () => {
    const date = new Date('2024-06-01T12:00:00Z');
    expect(formatDate(date)).toBe('2024-06-01');
  });
});

// Test de la fonction timeAgo
// ===========================================================================================
describe('timeAgo', () => {
  it('should return a string like "x days ago"', () => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const result = timeAgo(twoDaysAgo);

    expect(result).toMatch(/2 days ago/);
  });
});
