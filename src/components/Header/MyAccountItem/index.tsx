'use client';

import useUserStore from '@/stores/userStore';

export default function MyAccountItem() {
  // Récupère l'état de connexion de l'utilisateur
  const isLogged: boolean = useUserStore((state) => state.isLoggedIn);
  return (
    isLogged && (
      <div className="flex h-full cursor-pointer items-center hover:text-accentColor">
        <p>My account</p>
      </div>
    )
  );
}
