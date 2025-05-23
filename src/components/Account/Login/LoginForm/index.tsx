'use client';

import Button from '@/components/Shared/Button';
import FormField from '@/components/Shared/Forms/FormField';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';
import { useLoginUser } from '@/hooks/useLoginUser';
import { User } from '@/interfaces/user.interface';

export default function LoginForm() {
  const router = useRouter();
  const { setUserData, setToken } = useUserStore();

  // State pour le formulaire de connexion
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<string>('');

  // Utilisation du hook de connexion utilisateur
  const { mutate, isPending } = useLoginUser();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Appelle la mutation pour la connexion
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setUserData(data.user);
          localStorage.setItem('token', data.token);
          setToken(data.token);
          router.push('/vl/links/my-links');
        },
        onError: (error) => {
          console.error('Error while connecting:', error);
        },
      },
    );
  };
  // ===========================================================================================

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
      <FormField
        id="email"
        label="Email address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        id="password"
        label="Enter your password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" label="Log in" isLoading={isPending} />
    </form>
  );
}
