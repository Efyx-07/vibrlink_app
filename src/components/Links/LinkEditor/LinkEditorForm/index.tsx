import { Platform, Release } from '@/interfaces/release.interface';
import Button from '@/components/Shared/Button';
import PlatformSelector from './PlatformSelector';
import PlatformField from './PlatformField';
import { useUpdateReleaseLinks } from '@/hooks/useUpdateReleaseLinks';
import HorizontalSeparator from '@/components/Shared/Separator/HorizontalSeparator';
import useUrlState from './hooks/useUrlState';
import useVisibilityState from './hooks/useVisibilityState';
import { useEffect, useMemo, useState } from 'react';

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
  const [shouldUpdate, setShouldUpdate] = useState(false);

  // Memo pour éviter recalcul à chaque render pour la visiibilité des plateformes
  // Transforme l'objet platformsVisibility en tableau d'objets
  const platformsVisibilityArray = useMemo(
    () =>
      Object.entries(platformsVisibility).map(([id, visibility]) => ({
        id: Number(id),
        visibility,
      })),
    [platformsVisibility],
  );

  // Utilisation du hook de mise à jour des liens
  const { mutate, isPending } = useUpdateReleaseLinks();

  // Fonction pour soumettre la mutation avec son payload
  const submitMutation = () => {
    mutate({
      releaseId: release.id,
      newUrls,
      platformsState: platformsVisibilityArray,
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation();
  };

  // Gère toutes les mises à jour déclenchées (par changement de visibilité ou d'URL)
  useEffect(() => {
    if (shouldUpdate) {
      submitMutation();
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);
  // ===========================================================================================

  return (
    <form className="flex w-full flex-col gap-12" onSubmit={handleSubmit}>
      <LinkEditorSection title="Generated links">
        {platformsWithUrl.map((platform) => (
          <PlatformField
            key={platform.id}
            platform={platform}
            platformsWithUrl={platformsWithUrl}
            value={newUrls[platform.id] || ''}
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
              value={newUrls[selectedPlatform.id] || ''}
              onChange={handleUrlChange}
              platformsVisibility={{}}
              onVisibilityChange={() => {}}
              onAddButtonClick={addToPlatformsWithUrl}
            />
          )}
          <PlatformSelector
            platformsWithoutUrl={platformsWithoutUrl}
            onChange={handlePlatformChange}
            selectedPlatformId={selectedPlatform?.id ?? null}
          />
        </LinkEditorSection>
      )}
      <Button type="submit" label="Update link" isLoading={isPending} />
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
      <div className="flex w-full items-baseline gap-4">
        <h1 className="whitespace-nowrap">{title}</h1>
        <HorizontalSeparator />
      </div>
      <div className="flex w-full flex-col gap-8 md:gap-6">{children}</div>
    </div>
  );
}
