import { User } from '@/interfaces/user.interface';
import { updatePassword } from '@/services/password.service';
import { useMutation } from '@tanstack/react-query';

// Hook pour gérer la mise à jour du mot de passe d'un utilisateur avec React Query
// ===========================================================================================
type UpdatePasswordParams = {
  userId: User['id'];
  currentPassword: User['password'];
  newPassword: User['password'];
};

export function useUpdatePassword() {
  return useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: async ({
      userId,
      currentPassword,
      newPassword,
    }: UpdatePasswordParams) => {
      return updatePassword(userId, currentPassword, newPassword);
    },
  });
}
