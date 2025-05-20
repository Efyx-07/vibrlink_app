import { Platform, Release } from '@/interfaces/release.interface';
import Button from '@/components/Shared/Button';
import PlatformSelector from './PlatformSelector';
import PlatformField from './PlatformField';
import { useUpdateReleaseLinks } from '@/hooks/useUpdateReleaseLinks';
import Separator from '@/components/Shared/Separator';
import useUrlState from './hooks/useUrlState';
import useVisibilityState from './hooks/useVisibilityState';
import { useEffect } from 'react';
import { updateLink } from '@/services/release.service';

interface LinkEditorFormProps {
  release: Release;
}

export default function LinkEditorForm({ release }: LinkEditorFormProps) {
  const platforms: Platform[] = release.platforms;

  const {
    platformsWithUrl,
    platformsWithoutUrl,
    newUrls,
    handleUrlChange,
    addToPlatformsWithUrl,
    selectedPlatform,
    handlePlatformChange,
    shouldUpdateAfterPlatformAdding,
    setShouldUpdateAfterPlatformAdding,
  } = useUrlState(platforms);

  const {
    platformsVisibility,
    handleVisibilityChange,
    shouldUpdateAfterVisibilityChange,
    setShouldUpdateAfterVisibilityChange,
  } = useVisibilityState(platforms);

  const platformsVisibilityArray = Object.entries(platformsVisibility).map(
    ([id, visibility]) => ({
      id: Number(id),
      visibility,
    }),
  );

  const { mutate, isPending } = useUpdateReleaseLinks(
    release.id,
    newUrls,
    platformsVisibilityArray,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('payload', {
      newUrls,
      platformsVisibilityArray,
      releaseId: release.id,
    });
    mutate();
  };

  useEffect(() => {
    if (shouldUpdateAfterPlatformAdding) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
      setShouldUpdateAfterPlatformAdding(false);
    }
  }, [
    shouldUpdateAfterPlatformAdding,
    handleSubmit,
    setShouldUpdateAfterPlatformAdding,
  ]);

  useEffect(() => {
    if (shouldUpdateAfterVisibilityChange) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
      setShouldUpdateAfterVisibilityChange(false);
    }
  }, [
    shouldUpdateAfterVisibilityChange,
    handleSubmit,
    setShouldUpdateAfterVisibilityChange,
  ]);

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
        <Separator />
      </div>
      <div className="flex w-full flex-col gap-6">{children}</div>
    </div>
  );
}
