import { useMutation } from '@tanstack/react-query';
import { logoutUserApi } from '@/services/auth.service';

// Hook pour gérer la déconnexion utilisateur avec React Query
// ===========================================================================================
export function useLogoutUser() {
  return useMutation({
    mutationKey: ['logoutUserApi'],
    mutationFn: logoutUserApi,
  });
}
