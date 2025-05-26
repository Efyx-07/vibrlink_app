import { create } from 'zustand';
import { User } from '@/interfaces/user.interface';

interface State {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setToken: (newToken: string | null) => void;
  saveUserDataInLocalStorage: () => void;
  setUserData: (user: User) => void;
  logoutUser: () => void;
  loadUserDataFromLocalStorage: () => Promise<void>;
}

// Store pour la gestion de l'utilisateur
// ===========================================================================================
const useUserStore = create<State>((set, get) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  // Met à jour le token et statut de connexion, sauvegarde le token dans le local-storage
  // ===========================================================================================
  setToken: (newToken) => {
    set({ token: newToken, isLoggedIn: !!newToken });
    localStorage.setItem('token', newToken ?? '');
  },

  // Sauvegarde les données user dans le local-storage
  // ===========================================================================================
  saveUserDataInLocalStorage: () => {
    localStorage.setItem('user', JSON.stringify(get().user));
  },

  // Met à jour les données utilisateur dans le store et les sauvegarde dans le local-storage
  // ===========================================================================================
  setUserData: (user) => {
    set({ user });
    get().saveUserDataInLocalStorage();
  },

  // Déconnecte l'utilisateur : supprime token et données utilisateur du localStorage et du store
  // ===========================================================================================
  logoutUser: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isLoggedIn: false });
  },

  // Charge les données utilisateur et le token depuis le local-storage
  // ===========================================================================================
  loadUserDataFromLocalStorage: async () => {
    const localStorageUserData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (localStorageUserData && token)
      set({ user: JSON.parse(localStorageUserData), token, isLoggedIn: true });
    else set({ user: null, token: null, isLoggedIn: false });
  },
}));

export default useUserStore;
