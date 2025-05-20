import { useState, useEffect } from 'react';
import { Platform } from '@/interfaces/release.interface';

// Hook pour gérer l'état des URLs des plateformes
// ===========================================================================================
export const useUrlState = (platforms: Platform[]) => {
  // État local pour stocker les nouvelles URLs associées à chaque plateforme (clé = id)
  const [newUrls, setNewUrls] = useState<{ [id: Platform['id']]: string }>({});

  useEffect(() => {
    // Initialisation des URLs à partir de la prop "platforms"
    const initialUrls: { [id: Platform['id']]: string } = {};

    platforms.forEach((platform) => {
      // Return si aucune URL
      if (!platform.url) return;

      // On ajoute l'URL à notre objet d'état
      initialUrls[platform.id] = platform.url;
    });

    // On met à jour le state avec les URLs récupérées
    setNewUrls(initialUrls);
  }, [platforms]);

  // Fonction pour mettre à jour l'URL d'une plateforme spécifique
  const updateUrl = (platformId: number, url: string): void => {
    setNewUrls((prev) => ({
      ...prev, // on garde les valeurs précédentes
      [platformId]: url, // et on écrase seulement celle qu’on met à jour
    }));
  };

  // On retourne à la fois les données et la méthode de mise à jour
  return { newUrls, updateUrl };
};
