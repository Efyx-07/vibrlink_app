import { useState, useEffect, useRef, RefObject } from 'react';
import { Platform } from '@/interfaces/release.interface';

interface UseVisibilityStateParams {
  platforms: Platform[];
  triggerUpdate: () => void;
}

// Hook pour gérer l'état de visibilité des plateformes
// ===========================================================================================
export default function useVisibilityState({
  platforms,
  triggerUpdate,
}: UseVisibilityStateParams) {
  // État pour la visibilité des plateformes
  const [platformsVisibility, setPlatformsVisibility] = useState<{
    [key: Platform['id']]: Platform['visibility'];
  }>({});

  // Référence pour vérifier si le hook a été initialisé
  const isInitialized: RefObject<boolean> = useRef(false);

  // Effet pour initialiser la visibilité des plateformes
  useEffect(() => {
    if (!isInitialized.current) {
      setPlatformsVisibility(createInitialVisibility(platforms));
      isInitialized.current = true;
    }
  }, [platforms]);

  // Fonction pour gérer le changement de visibilité
  const handleVisibilityChange = (
    platformId: number,
    checked: boolean,
  ): void => {
    setPlatformsVisibility((prevVisibilityStatus) => ({
      ...prevVisibilityStatus,
      [platformId]: checked,
    }));
    triggerUpdate(); // Signale au parent qu'il faut lancer la mutation
  };
  // ===========================================================================================

  return {
    platformsVisibility,
    handleVisibilityChange,
  };
}

// Crée un objet de visibilité initial pour les plateformes
// ===========================================================================================
function createInitialVisibility(platforms: Platform[]): {
  [key: Platform['id']]: Platform['visibility'];
} {
  const visibility: { [key: Platform['id']]: Platform['visibility'] } = {};
  platforms.forEach((platform) => {
    visibility[platform.id] = platform.visibility;
  });
  return visibility;
}
