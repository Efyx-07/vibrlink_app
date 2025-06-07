import { useMutation } from '@tanstack/react-query';
import { logoutUserApi } from '@/services/auth.service';
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';

// Hook pour gérer:
// déconnexion utilisateur avec React Query
// deconnexion avec méthode du store
// redirection vers la page de connexion
// ===========================================================================================
interface LogoutOptions {
  redirect?: boolean;
}

export const useLogoutUser = () => {
  const router = useRouter();
  const { logoutUserLocal } = useUserStore();

  const mutation = useMutation<unknown, Error, LogoutOptions | undefined>({
    mutationFn: async (_options) => {
      await logoutUserApi();
      logoutUserLocal();
      return _options;
    },
    onSuccess: (_data, variables) => {
      if (variables?.redirect !== false) router.push('/vl/account/login');
    },
    onError: (error) => console.error('Logout error:', error),
  });

  const logout = (options?: LogoutOptions) => mutation.mutate(options); // options = { redirect: true/false }

  return {
    ...mutation,
    logout,
  };
};
