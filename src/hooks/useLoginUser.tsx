import { User } from '@/interfaces/user.interface';
import { loginUser } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer la connexion utilisateur avec React Query
// ===========================================================================================
export function useLoginUser() {
  return useMutation({
    mutationKey: ['loginUser'],
    mutationFn: async (params: {
      email: User['email'];
      password: User['password'];
    }) => {
      const { email, password } = params;
      return loginUser(email, password);
    },
  });
}
