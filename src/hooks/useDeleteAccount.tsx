import { DeleteUserAccountResponse, User } from '@/interfaces/user.interface';
import { useMutation } from '@tanstack/react-query';
import { deleteUserAccount } from '@/services/auth.service';

// Hook pour gérer la suppression d'un compte utilisateur avec React Query
// ===========================================================================================
export function useDeleteAccount() {
  return useMutation<DeleteUserAccountResponse, Error, User['id']>({
    mutationFn: (userId: User['id']) => deleteUserAccount(userId),
  });
}
