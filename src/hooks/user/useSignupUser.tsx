import { User } from '@/interfaces/user.interface';
import { signupUser } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer l'inscription utilisateur avec React Query
// ===========================================================================================
type SignupUserParams = {
  email: User['email'];
  password: User['password'];
};

export function useSignupUser() {
  return useMutation({
    mutationKey: ['signupUser'],
    mutationFn: async ({ email, password }: SignupUserParams) => {
      return signupUser(email, password);
    },
  });
}
