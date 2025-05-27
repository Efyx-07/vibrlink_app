import { User } from '@/interfaces/user.interface';
import { requestPasswordReset } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer la demande de réinitialisation de mot de passe avec React Query
// ===========================================================================================
export function useRequestPasswordReset() {
  return useMutation({
    mutationKey: ['requestPasswordReset'],
    mutationFn: async (params: { email: User['email'] }) => {
      const { email } = params;
      return requestPasswordReset(email);
    },
  });
}
