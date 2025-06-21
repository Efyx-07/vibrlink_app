import { User } from '@/interfaces/user.interface';
import { loginUser } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';

// Hook pour gérer la connexion utilisateur avec React Query
// ===========================================================================================
type LoginParams = {
  email: User['email'];
  password: User['password'];
};

type LoginUserOptions = {
  onError: () => void;
  setIsRedirecting: (f: boolean) => void;
};

export function useLoginUser({ setIsRedirecting, onError }: LoginUserOptions) {
  const router = useRouter();
  const { setUserData } = useUserStore();

  return useMutation({
    mutationKey: ['loginUser'],
    mutationFn: async ({ email, password }: LoginParams) => {
      return loginUser(email, password);
    },
    // Met à jour le user dans le store
    // Passe le state pour l'opération de redirection à true
    // Redirige vers la page voulue
    onSuccess: (data) => {
      setUserData(data.user);
      setIsRedirecting(true);
      router.push('/vl/links/my-links');
    },
    onError,
  });
}
