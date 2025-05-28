import { useMutation } from '@tanstack/react-query';
import { logoutUserApi } from '@/services/auth.service';
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';

// Hook pour gérer:
// déconnexion utilisateur avec React Query
// deconnexion avec méthode du store
// redirection vers la page d'accueil
// ===========================================================================================
export function useLogoutUser() {
  const logoutUserLocal = useUserStore((state) => state.logoutUserLocal);
  const router = useRouter();

  const mutation = useMutation({ mutationFn: logoutUserApi });

  const logout = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        logoutUserLocal();
        router.push('/vl/home');
      },
      onError: (error) => console.error('Logout failed', error),
    });
  };

  return {
    ...mutation,
    logout,
  };
}
