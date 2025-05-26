import { User } from '@/interfaces/user.interface';
import { signupUser } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer l'inscription utilisateur avec React Query
// ===========================================================================================
export function useRegisterUser() {
  return useMutation({
    mutationKey: ['registerUser'],
    mutationFn: async (params: {
      email: User['email'];
      password: User['password'];
    }) => {
      const { email, password } = params;
      return signupUser(email, password);
    },
  });
}
