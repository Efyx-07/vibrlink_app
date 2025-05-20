import { useState, useEffect, useRef } from 'react';
import { Platform } from '@/interfaces/release.interface';

interface UseUrlStateParams {
  platforms: Platform[];
  triggerUpdate: () => void; // Fonction pour déclencher la mise à jour côté parent
}

// Hook pour gérer l'état des URL des plateformes
// ===========================================================================================
export default function useUrlState({
  platforms,
  triggerUpdate,
}: UseUrlStateParams) {
  // État pour les plateformes avec URL
  const [platformsWithUrl, setPlatformsWithUrl] = useState<Platform[]>(
    platforms.filter((platform) => platform.url),
  );

  // État pour les plateformes sans URL
  const [platformsWithoutUrl, setPlatformsWithoutUrl] = useState<Platform[]>(
    platforms.filter((platform) => !platform.url),
  );

  // État pour les nouvelles URL
  const [newUrls, setNewUrls] = useState<{ [key: number]: string }>({});

  // État pour la plateforme sélectionnée
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  // État pour les IDs des plateformes à ajouter
  const [platformIdsToAdd, setPlatformIdsToAdd] = useState<number[]>([]);

  // Référence pour vérifier si le hook a été initialisé
  const isInitialized = useRef(false);

  // Effet pour initialiser les URL des plateformes
  useEffect(() => {
    if (!isInitialized.current) {
      setNewUrls(createInitialUrls(platforms));
      isInitialized.current = true;
    }
  }, [platforms]);

  // Effet pour mettre à jour les plateformes sans URL
  useEffect(() => {
    if (platformIdsToAdd.length > 0) {
      setPlatformsWithoutUrl((prev) =>
        filterPlatformsWithoutUrl(prev, platformIdsToAdd),
      );
    }
  }, [platformIdsToAdd]);

  // Fonction pour gérer le changement d'URL
  const handleUrlChange = (platformId: number, url: string): void => {
    setNewUrls((prevUrls) => ({ ...prevUrls, [platformId]: url }));
  };

  // Fonction pour ajouter une plateforme avec URL
  const addToPlatformsWithUrl = () => {
    if (selectedPlatform && newUrls[selectedPlatform.id]) {
      const platformToAdd = {
        ...selectedPlatform,
        url: newUrls[selectedPlatform.id],
      };
      setPlatformsWithUrl((prev) => [...prev, platformToAdd]);
      setPlatformIdsToAdd((prev) => [...prev, selectedPlatform.id]);
      setSelectedPlatform(null);
      triggerUpdate(); // Signale au parent qu'il faut lancer la mutation
    }
  };

  // Fonction pour gérer le changement de plateforme
  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    const platform = platforms.find((p) => p.id === id) ?? null;
    setSelectedPlatform(platform);
  };
  // ===========================================================================================

  return {
    platformsWithUrl,
    platformsWithoutUrl,
    newUrls,
    handleUrlChange,
    addToPlatformsWithUrl,
    selectedPlatform,
    handlePlatformChange,
  };
}

// Crée un objet d'URL initial à partir des plateformes
// ===========================================================================================
function createInitialUrls(platforms: Platform[]): { [key: number]: string } {
  const urls: { [key: number]: string } = {};
  platforms.forEach((platform) => {
    if (platform.url) urls[platform.id] = platform.url;
  });
  return urls;
}

// Filtre les plateformes sans URL en excluant celles déjà ajoutées
// ===========================================================================================
function filterPlatformsWithoutUrl(
  platformsWithoutUrl: Platform[],
  platformIdsToAdd: number[],
): Platform[] {
  return platformsWithoutUrl.filter(
    (platform) => !platformIdsToAdd.includes(platform.id),
  );
}
