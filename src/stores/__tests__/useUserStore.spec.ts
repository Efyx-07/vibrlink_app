import useUserStore from '../userStore';
import { User } from '@/interfaces/user.interface';

// Mock utilisateur pour les tests
const mockUser: User = {
  id: 123,
  email: 'john@example.com',
};

describe('useUserStore', () => {
  beforeEach(() => {
    // Avant chaque test, on réinitialise l'état du store et on nettoie le localStorage
    useUserStore.setState({
      user: null,
      isLoggedIn: false,
      initialized: false,
    });
    localStorage.clear();
    jest.restoreAllMocks();
  });

  // Test : mise à jour de l'utilisateur avec setUserData
  // ===========================================================================================
  it('should set user data and update localStorage', () => {
    const store = useUserStore.getState();
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    store.setUserData(mockUser); // Mise à jour des données utilisateur

    const updated = useUserStore.getState();

    // Vérifie que l'utilisateur a bien été mis à jour
    expect(updated.user).toEqual(mockUser);
    expect(updated.isLoggedIn).toBe(true);

    // Vérifie que les données ont été sauvegardées dans le localStorage
    expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
  });

  // Test : déconnexion avec logoutUserLocal
  // ===========================================================================================
  it('should remove user data on logout', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    // Simule un utilisateur connecté
    useUserStore.setState({ user: mockUser, isLoggedIn: true });

    useUserStore.getState().logoutUserLocal(); // 🔒 Déconnexion

    const updated = useUserStore.getState();

    // Vérifie que l'état a bien été réinitialisé
    expect(updated.user).toBeNull();
    expect(updated.isLoggedIn).toBe(false);

    // Vérifie que le localStorage a bien été nettoyé
    expect(removeItemSpy).toHaveBeenCalledWith('user');
  });

  // Test : sauvegarde directe avec saveUserDataInLocalStorage
  // ===========================================================================================
  it('should save user to localStorage directly', () => {
    useUserStore.setState({ user: mockUser }); // Définition d'un utilisateur

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    useUserStore.getState().saveUserDataInLocalStorage(); // Sauvegarde manuelle

    // Vérifie que le localStorage contient bien les données utilisateur
    expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
  });

  // Test : chargement depuis le localStorage si non initialisé
  // ===========================================================================================
  it('should load user data from localStorage if not initialized', async () => {
    // Pré-remplit le localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));

    await useUserStore.getState().loadUserDataFromLocalStorage(); // Chargement

    const updated = useUserStore.getState();

    // Vérifie que les données ont bien été restaurées
    expect(updated.user).toEqual(mockUser);
    expect(updated.isLoggedIn).toBe(true);
    expect(updated.initialized).toBe(true);
  });

  // Test : ne charge pas à nouveau si déjà initialisé
  // ===========================================================================================
  it('should not load from localStorage if already initialized', async () => {
    useUserStore.setState({ initialized: true }); // Marque comme déjà initialisé

    const setSpy = jest.spyOn(useUserStore, 'setState');

    await useUserStore.getState().loadUserDataFromLocalStorage(); // Tentative de rechargement

    // Vérifie qu'aucune mise à jour n'a été faite
    expect(setSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({ user: expect.anything() }),
    );
  });
});
