import { User } from '@/interfaces/user.interface';
import { updatePassword } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer la mise à jour du mot de passe d'un utilisateur avec React Query
// ===========================================================================================
export function useUpdatePassword() {
  return useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: async (params: {
      token: string | null;
      userId: User['id'];
      currentPassword: User['password'];
      newPassword: User['password'];
    }) => {
      const { token, userId, currentPassword, newPassword } = params;
      return updatePassword(token, userId, currentPassword, newPassword);
    },
  });
}
