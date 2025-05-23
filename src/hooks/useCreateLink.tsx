import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLink } from '@/services/release.service';
import { User } from '@/interfaces/user.interface';

// Hook pour gérer la création d'un lien avec React Query
// ===========================================================================================
export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createLink'],
    mutationFn: async (params: {
      albumUrl: string;
      userId: User['id'] | undefined;
    }) => {
      const { albumUrl, userId } = params;
      return createLink(albumUrl, userId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['releases'] }),
    onError: (error) => console.error('Create failed:', error),
  });
}
