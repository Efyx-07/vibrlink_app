import { User } from '@/interfaces/user.interface';
import { requestPasswordReset } from '@/services/password.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer la demande de réinitialisation de mot de passe avec React Query
// ===========================================================================================
type RequestPasswordResetParams = {
  email: User['email'];
};

export function useRequestPasswordReset() {
  return useMutation({
    mutationKey: ['requestPasswordReset'],
    mutationFn: async ({ email }: RequestPasswordResetParams) => {
      return requestPasswordReset(email);
    },
  });
}
