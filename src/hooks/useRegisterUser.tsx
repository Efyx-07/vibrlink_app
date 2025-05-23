import { User } from '@/interfaces/user.interface';
import { registerUser } from '@/services/auth.service';
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
      return registerUser(email, password);
    },
    onError: (error) => console.error('Registration failed:', error),
  });
}
