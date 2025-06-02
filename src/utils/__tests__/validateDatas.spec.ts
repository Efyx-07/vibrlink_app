import {
  validateData,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../validateDatas';

// Test de la fonction validateEmail
// ===========================================================================================
describe('validateEmail', () => {
  // Test succès
  it('returns true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  // Test erreur
  it('returns false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('user@.com')).toBe(false);
    expect(validateEmail('user@com')).toBe(false);
  });
});

// Test de la fonction validatePassword
// ===========================================================================================
describe('validatePassword', () => {
  // Test succès
  it('returns true for valid password', () => {
    expect(validatePassword('StrongP@ssword1')).toBe(true);
  });

  // Test erreur
  it('returns false for invalid password', () => {
    expect(validatePassword('weak')).toBe(false); // trop court
    expect(validatePassword('NoSpecial1')).toBe(false); // pas de char spécial
    expect(validatePassword('nospecial123')).toBe(false); // pas de majuscule
    expect(validatePassword('NOSPECIAL123')).toBe(false); // pas de minuscule
  });
});

// Test de la fonction validateData
// ===========================================================================================
describe('validateData', () => {
  // Test succès
  it('returns true when both email and password are valid', () => {
    expect(validateData('user@example.com', 'StrongP@ss1')).toBe(true);
  });

  // Test erreur mail
  it('returns false when email is invalid', () => {
    expect(validateData('invalid-email', 'StrongP@ss1')).toBe(false);
  });

  // Test erreur password
  it('returns false when password is invalid', () => {
    expect(validateData('user@example.com', 'weak')).toBe(false);
  });
});

// Test de la fonction validateConfirmPassword
// ===========================================================================================
describe('validateConfirmPassword', () => {
  // Test succès
  it('returns true when passwords match', () => {
    expect(validateConfirmPassword('abc123!', 'abc123!')).toBe(true);
  });

  // Test erreur
  it('returns false when passwords do not match', () => {
    expect(validateConfirmPassword('abc123!', 'different')).toBe(false);
  });
});
