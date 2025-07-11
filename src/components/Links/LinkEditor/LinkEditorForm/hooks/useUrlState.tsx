import { useState, useEffect, useRef, RefObject } from 'react';
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
    platforms.filter((platform) => platform.platformUrl),
  );

  // État pour les plateformes sans URL
  const [platformsWithoutUrl, setPlatformsWithoutUrl] = useState<Platform[]>(
    platforms.filter((platform) => !platform.platformUrl),
  );

  // État pour les nouvelles URL
  const [newUrls, setNewUrls] = useState<{
    [key: Platform['platformId']]: string;
  }>({});

  // État pour la plateforme sélectionnée
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  // État pour les IDs des plateformes à ajouter
  const [platformIdsToAdd, setPlatformIdsToAdd] = useState<
    Platform['platformId'][]
  >([]);

  // Référence pour vérifier si le hook a été initialisé
  const isInitialized: RefObject<boolean> = useRef(false);

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
  const handleUrlChange = (
    platformId: Platform['platformId'],
    url: string,
  ): void => {
    setNewUrls((prevUrls) => ({ ...prevUrls, [platformId]: url }));
  };

  // Fonction pour ajouter une plateforme avec URL
  const addToPlatformsWithUrl = (): void => {
    if (selectedPlatform && newUrls[selectedPlatform.platformId]) {
      const platformToAdd = {
        ...selectedPlatform,
        url: newUrls[selectedPlatform.platformId],
      };
      setPlatformsWithUrl((prev) => [...prev, platformToAdd]);
      setPlatformIdsToAdd((prev) => [...prev, selectedPlatform.platformId]);
      setSelectedPlatform(null);
      triggerUpdate(); // Signale au parent qu'il faut lancer la mutation
    }
  };

  // Fonction pour gérer le changement de plateforme
  const handlePlatformChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const id: Platform['platformId'] = parseInt(e.target.value);
    const platform = platforms.find((p) => p.platformId === id) ?? null;
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
function createInitialUrls(platforms: Platform[]): {
  [key: Platform['platformId']]: string;
} {
  const urls: { [key: Platform['platformId']]: string } = {};
  platforms.forEach((platform) => {
    if (platform.platformUrl) urls[platform.platformId] = platform.platformUrl;
  });
  return urls;
}

// Filtre les plateformes sans URL en excluant celles déjà ajoutées
// ===========================================================================================
function filterPlatformsWithoutUrl(
  platformsWithoutUrl: Platform[],
  platformIdsToAdd: Platform['platformId'][],
): Platform[] {
  return platformsWithoutUrl.filter(
    (platform) => !platformIdsToAdd.includes(platform.platformId),
  );
}
