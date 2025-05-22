import { User } from '@/interfaces/user.interface';
import { loginUser } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

export function useLoginUser() {
  return useMutation({
    mutationKey: ['loginUser'],
    mutationFn: async (params: {
      email: User['email'];
      password: User['password'];
    }) => {
      const { email, password } = params;
      return loginUser(email, password);
    },
    onError: (error) => console.error('Login failed:', error),
  });
}
