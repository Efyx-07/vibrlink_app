import { useState, useMemo } from 'react';
import { Platform } from '@/interfaces/release.interface';
import { useUrlState } from './useUrlState';

export function useLinkEditor(initialPlatforms: Platform[]) {
  // État local contenant les plateformes avec leurs URLs (ou non)
  const [platformsState, setPlatformsState] =
    useState<Platform[]>(initialPlatforms);

  // Plateforme actuellement sélectionnée dans la liste déroulante
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  // Normalisation des URLs pour remplacer les valeurs null par undefined
  // (permet d'éviter les problèmes d'inconsistances dans les champs de formulaire)
  const normalizedPlatformsState = useMemo(() => {
    return platformsState.map((platform) => ({
      ...platform,
      url: platform.url === null ? undefined : platform.url,
    }));
  }, [platformsState]);

  // Hook custom pour gérer les URLs saisies ou modifiées manuellement
  const { newUrls, updateUrl } = useUrlState(normalizedPlatformsState);

  // Liste des plateformes qui ont déjà une URL renseignée
  const platformsWithUrl = platformsState.filter((p) => p.url?.trim());

  // Liste des plateformes sans URL (affichées dans le sélecteur)
  const platformsWithoutUrl = platformsState.filter((p) => !p.url?.trim());

  /**
   * Fonction appelée lors du changement dans le select
   * Recherche la plateforme par son ID et la définit comme sélectionnée
   */
  const handlePlatformChange = (platformId: number) => {
    const foundPlatform = platformsState.find((p) => p.id === platformId);
    if (foundPlatform) setSelectedPlatform({ ...foundPlatform });
  };

  /**
   * Fonction appelée lors du clic sur le bouton "Add"
   * Si une plateforme est sélectionnée et qu'une URL a été saisie,
   * elle est ajoutée à l'état général des plateformes
   */
  const handleAddPlatform = () => {
    if (!selectedPlatform) return;

    const url = newUrls[selectedPlatform.id]?.trim();
    if (!url) return;

    // Mise à jour de l'état local avec l'URL ajoutée à la bonne plateforme
    setPlatformsState((prev) =>
      prev.map((p) => (p.id === selectedPlatform.id ? { ...p, url } : p)),
    );

    // Réinitialisation de la sélection (pour que l'utilisateur puisse en choisir une autre)
    setSelectedPlatform(null);
  };

  // On retourne toutes les fonctions et états utiles au composant parent
  return {
    platformsState, // état global des plateformes
    platformsWithUrl, // plateformes avec lien renseigné
    platformsWithoutUrl, // plateformes sans lien (affichées dans le select)
    selectedPlatform, // plateforme actuellement sélectionnée
    setSelectedPlatform, // setter de sélection (si besoin côté composant)
    handlePlatformChange, // fonction à appeler sur changement de plateforme dans le select
    handleAddPlatform, // fonction à appeler quand on veut ajouter une nouvelle URL
    updateUrl, // fonction permettant de modifier dynamiquement une URL via un input
    newUrls, // structure contenant les URLs saisies pour chaque plateforme
  };
}
