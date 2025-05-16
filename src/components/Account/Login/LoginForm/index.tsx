'use client';

import Button from '@/components/Shared/Button';
import FormField from '@/components/Shared/Forms/FormField';
import { useState } from 'react';
import { login } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  // State pour le formulaire de connexion
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      const token = data.token;
      localStorage.setItem('token', token);
      router.push('/links/my-links');
    } catch (error) {
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
      <Button type="submit" label="Log in" />
    </form>
  );
}
