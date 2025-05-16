import { create } from 'zustand';
import { User } from '@/interfaces/user.interface';

interface State {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setToken: (newToken: string | null) => void;
  saveUserDataInLocalStorage: () => void;
  setUserData: (user: User) => void;
  logOutUser: () => void;
}

const useUserStore = create<State>((set, get) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  setToken: (newToken) => {
    set({ token: newToken, isLoggedIn: !!newToken });
    localStorage.setItem('token', newToken ?? '');
  },
  saveUserDataInLocalStorage: () => {
    localStorage.setItem('user', JSON.stringify(get().user));
  },
  setUserData: (user) => {
    set({ user });
    get().saveUserDataInLocalStorage();
  },
  logOutUser: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isLoggedIn: false });
  },
}));

export default useUserStore;
