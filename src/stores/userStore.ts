import { create } from 'zustand';
import { User } from '@/interfaces/user.interface';

interface State {
  user: User | null;
  initialized: boolean;
  isLoggedIn: boolean;
  saveUserDataInLocalStorage: () => void;
  setUserData: (user: User) => void;
  logoutUserLocal: () => void;
  loadUserDataFromLocalStorage: () => Promise<void>;
}

// Store pour la gestion de l'utilisateur
// ===========================================================================================
const useUserStore = create<State>((set, get) => ({
  user: null,
  initialized: false,
  isLoggedIn: false,

  // Sauvegarde les données user dans le local-storage
  // ===========================================================================================
  saveUserDataInLocalStorage: () =>
    localStorage.setItem('user', JSON.stringify(get().user)),

  // Met à jour les données utilisateur dans le store et les sauvegarde dans le local-storage
  // ===========================================================================================
  setUserData: (user) => {
    set({ user, isLoggedIn: true });
    get().saveUserDataInLocalStorage();
  },

  // Déconnecte l'utilisateur : supprime données utilisateur du localStorage et du store
  // ===========================================================================================
  logoutUserLocal: () => {
    localStorage.removeItem('user');
    set({ user: null, isLoggedIn: false });
  },

  // Charge les données utilisateur depuis le local-storage
  // ===========================================================================================
  loadUserDataFromLocalStorage: async () => {
    const { initialized } = get();
    if (initialized) return;

    const localStorageUserData = localStorage.getItem('user');
    if (localStorageUserData)
      set({
        user: JSON.parse(localStorageUserData),
        isLoggedIn: true,
      });
    else set({ user: null, isLoggedIn: false });

    set({ initialized: true });
  },
}));

export default useUserStore;
