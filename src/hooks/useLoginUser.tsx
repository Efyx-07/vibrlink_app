import { User } from '@/interfaces/user.interface';
import { loginUser } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer la connexion utilisateur avec React Query
// ===========================================================================================
type LoginParams = {
  email: User['email'];
  password: User['password'];
};

export function useLoginUser() {
  return useMutation({
    mutationKey: ['loginUser'],
    mutationFn: async ({ email, password }: LoginParams) => {
      return loginUser(email, password);
    },
  });
}
