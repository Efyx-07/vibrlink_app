import { useState } from 'react';

// Hook pour centraliser la gestion de la visibilité des mots de passe
// ===========================================================================================
export function usePasswordVisibility() {
  const [passwordVisibility, setPasswordVisibility] = useState<
    Record<string, boolean>
  >({});

  const isPasswordVisible = (key: string): boolean => !!passwordVisibility[key];

  const togglePasswordVisibility = (key: string): void => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return { isPasswordVisible, togglePasswordVisibility };
}
