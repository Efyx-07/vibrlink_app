'use client';

import Button from '@/components/Shared/Button';
import FormField from '@/components/Shared/Forms/FormField';
import { useState } from 'react';
import { login } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';

export default function LoginForm() {
  const router = useRouter();
  const { setUserData, setToken } = useUserStore();

  // State pour le formulaire de connexion
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // State pour le loader du bouton
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await login(email, password);
      setUserData(data.user);
      const token = data.token;
      localStorage.setItem('token', token);
      setToken(token);
      router.push('/vl/links/my-links');
    } catch (error) {
      setIsLoading(false);
      console.error('Error while connecting: ', error);
    }
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
      <Button type="submit" label="Log in" isLoading={isLoading}/>
    </form>
  );
}
