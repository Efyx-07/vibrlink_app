import { Platform, Release } from '@/interfaces/release.interface';
import Button from '@/components/Shared/Button';
import PlatformSelector from './PlatformSelector';
import PlatformField from './PlatformField';
import { useUpdateReleaseLinks } from '@/hooks/releases/useUpdateReleaseLinks';
import useUrlState from './hooks/useUrlState';
import useVisibilityState from './hooks/useVisibilityState';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SectionTitle from '@/components/Shared/SectionTitle';

interface LinkEditorFormProps {
  release: Release;
}

export default function LinkEditorForm({ release }: LinkEditorFormProps) {
  // Récupération des plateformes depuis la release
  const platforms: Platform[] = release.platforms;

  // Recupération des datas et méthodes de mise à jour des URLS
  const {
    platformsWithUrl,
    platformsWithoutUrl,
    newUrls,
    handleUrlChange,
    addToPlatformsWithUrl,
    selectedPlatform,
    handlePlatformChange,
  } = useUrlState({ platforms, triggerUpdate: () => setShouldUpdate(true) });

  // Recupération des datas et méthodes de mise à jour de la visibilité des plateformes
  const { platformsVisibility, handleVisibilityChange } = useVisibilityState({
    platforms,
    triggerUpdate: () => setShouldUpdate(true),
  });

  // Nouveau flag pour gérer la mise à jour automatique après un changement
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);

  // Memo pour éviter recalcul à chaque render pour la visiibilité des plateformes
  // Transforme l'objet platformsVisibility en tableau d'objets
  const platformsVisibilityArray: {
    id: Platform['platformId'];
    visibility: Platform['platformVisibility'];
  }[] = useMemo(
    () =>
      Object.entries(platformsVisibility).map(([id, visibility]) => ({
        id: Number(id),
        visibility,
      })),
    [platformsVisibility],
  );

  // Utilisation du hook de mise à jour des liens
  const { mutate, isPending } = useUpdateReleaseLinks();

  // Fonction pour soumettre la mutation avec son payload et memorisation avec useCallback
  const submitMutation = useCallback((): void => {
    mutate({
      releaseId: release.id,
      newUrls,
      platformsState: platformsVisibilityArray,
    });
  }, [mutate, release.id, newUrls, platformsVisibilityArray]);

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    submitMutation();
  };

  // Gère toutes les mises à jour déclenchées (par changement de visibilité ou d'URL)
  useEffect(() => {
    if (shouldUpdate) {
      submitMutation();
      setShouldUpdate(false);
    }
  }, [shouldUpdate, submitMutation]);
  // ===========================================================================================

  return (
    <form className="flex w-full flex-col gap-12" onSubmit={handleSubmit}>
      <LinkEditorSection title="Generated links">
        {platformsWithUrl.map((platform) => (
          <PlatformField
            key={platform.platformId}
            platform={platform}
            platformsWithUrl={platformsWithUrl}
            value={newUrls[platform.platformId] || ''}
            onChange={handleUrlChange}
            platformsVisibility={platformsVisibility}
            onVisibilityChange={handleVisibilityChange}
            onAddButtonClick={() => {}}
          />
        ))}
      </LinkEditorSection>
      {platformsWithoutUrl.length > 0 && (
        <LinkEditorSection title="Enter more links manually">
          {selectedPlatform && (
            <PlatformField
              platform={selectedPlatform}
              value={newUrls[selectedPlatform.platformId] || ''}
              onChange={handleUrlChange}
              platformsVisibility={{}}
              onVisibilityChange={() => {}}
              onAddButtonClick={addToPlatformsWithUrl}
            />
          )}
          <PlatformSelector
            platformsWithoutUrl={platformsWithoutUrl}
            onChange={handlePlatformChange}
            selectedPlatformId={selectedPlatform?.platformId ?? null} // Réinitialise à la valeur par défaut après ajout d'une platform
          />
        </LinkEditorSection>
      )}
      <Button
        type="submit"
        label="Update link"
        isLoading={isPending}
        addMention="Auto-save"
      />
    </form>
  );
}

// Composant local pour une section de liens
// ===========================================================================================
interface LinkEditorSectionProps {
  title: string;
  children: React.ReactNode;
}
function LinkEditorSection({ title, children }: LinkEditorSectionProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      <SectionTitle title={title} />
      <div className="flex w-full flex-col gap-8 md:gap-6">{children}</div>
    </div>
  );
}
