import { Release, Platform } from '@/interfaces/release.interface';
import { useState, useMemo } from 'react';
import { updateLink } from '@/services/release.service';
import PlatformSelector from './PlatformSelector';
import PlatformField from './PlatformField';
import Button from '@/components/Shared/Button';
import { useUrlState } from './hooks/useUrlState';

interface LinkEditorFormProps {
  release: Release;
}

export default function LinkEditorForm({ release }: LinkEditorFormProps) {
  const [platformsState, setPlatformsState] = useState<Platform[]>(
    release.platforms,
  );

  // Mémorisation pour éviter boucle infinie
  const normalizedPlatformsState = useMemo(() => {
    return platformsState.map((platform) => ({
      ...platform,
      url: platform.url === null ? undefined : platform.url,
    }));
  }, [platformsState]);

  const { newUrls, updateUrl } = useUrlState(normalizedPlatformsState);

  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  const platformsWithUrl = platformsState.filter(
    (platform) => platform.url && platform.url.trim() !== '',
  );

  const platformsWithoutUrl = platformsState.filter(
    (platform) => !platform.url || platform.url.trim() === '',
  );

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const platformId = parseInt(e.target.value, 10);
    const foundPlatform = platformsState.find((p) => p.id === platformId);
    if (!foundPlatform) return;
    setSelectedPlatform({ ...foundPlatform });
  };

  const handleSelectedPlatformUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!selectedPlatform) return;
    updateUrl(selectedPlatform.id, e.target.value);
  };

  const handleAddButtonClick = () => {
    if (!selectedPlatform) return;
    const enteredUrl = newUrls[selectedPlatform.id]?.trim();
    if (!enteredUrl) return;

    const updatedPlatforms = platformsState.map((platform) =>
      platform.id === selectedPlatform.id
        ? { ...platform, url: enteredUrl }
        : platform,
    );

    setPlatformsState(updatedPlatforms);
    setSelectedPlatform(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // On extrait la visibilité actuelle de chaque plateforme
    const platformsVisibility = platformsState.reduce(
      (acc, platform) => {
        acc[platform.id] = platform.visibility;
        return acc;
      },
      {} as { [key: number]: boolean },
    );
    try {
      const updatedRelease = await updateLink(
        newUrls,
        platformsVisibility,
        release.id,
      );
      console.log('Release updated:', updatedRelease);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <h1>Generated links</h1>
      {platformsWithUrl.map((platform) => (
        <PlatformField
          key={platform.id}
          value={newUrls[platform.id] || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateUrl(platform.id, e.target.value)
          }
          platformsWithUrl={platformsWithUrl}
          platform={platform}
          onAddButtonClick={() => {}}
        />
      ))}
      <h1>Enter more links manually</h1>
      {selectedPlatform && (
        <PlatformField
          value={newUrls[selectedPlatform.id] || ''}
          onChange={handleSelectedPlatformUrlChange}
          platform={selectedPlatform}
          onAddButtonClick={handleAddButtonClick}
        />
      )}
      <PlatformSelector
        platformsWithoutUrl={platformsWithoutUrl}
        onChange={handlePlatformChange}
      />
      <Button type="submit" label="Update link" />
    </form>
  );
}
