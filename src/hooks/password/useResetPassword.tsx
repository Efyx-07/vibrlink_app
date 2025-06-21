import { User } from '@/interfaces/user.interface';
import { resetPassword } from '@/services/password.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer la réinitialisation du mot de passe d'un utilisateur avec React Query
// ===========================================================================================
type ResetPasswordParams = {
  token: string | null;
  newPassword: User['password'];
};

export function useResetPassword() {
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async ({ token, newPassword }: ResetPasswordParams) => {
      return resetPassword(token, newPassword);
    },
  });
}
