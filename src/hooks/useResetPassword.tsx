import { User } from '@/interfaces/user.interface';
import { resetPassword } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer la réinitialisation du mot de passe d'un utilisateur avec React Query
// ===========================================================================================
export function useResetPassword() {
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (params: {
      token: string | null;
      newPassword: User['password'];
    }) => {
      const { token, newPassword } = params;
      return resetPassword(token, newPassword);
    },
  });
}
