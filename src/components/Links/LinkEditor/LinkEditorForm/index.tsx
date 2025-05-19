import { Release } from '@/interfaces/release.interface';
import { updateLink } from '@/services/release.service';
import Button from '@/components/Shared/Button';
import { useLinkEditor } from './hooks/useLinkEditor';
import PlatformSelector from './PlatformSelector';
import PlatformField from './PlatformField';

interface LinkEditorFormProps {
  release: Release;
}

export default function LinkEditorForm({ release }: LinkEditorFormProps) {
  const {
    platformsState,
    platformsWithUrl,
    platformsWithoutUrl,
    selectedPlatform,
    handlePlatformChange,
    handleAddPlatform,
    updateUrl,
    newUrls,
  } = useLinkEditor(release.platforms);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Provisoire avant gestion d'un toggle de visibilité
    const platformsVisibility = platformsState.reduce(
      (acc, p) => {
        acc[p.id] = p.visibility;
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
          platform={platform}
          value={newUrls[platform.id] || ''}
          onChange={(e) => updateUrl(platform.id, e.target.value)}
          onAddButtonClick={() => {}}
        />
      ))}
      <h1>Enter more links manually</h1>
      {selectedPlatform && (
        <PlatformField
          platform={selectedPlatform}
          value={newUrls[selectedPlatform.id] || ''}
          onChange={(e) => updateUrl(selectedPlatform.id, e.target.value)}
          onAddButtonClick={handleAddPlatform}
        />
      )}
      <PlatformSelector
        platformsWithoutUrl={platformsWithoutUrl}
        onChange={(e) => handlePlatformChange(parseInt(e.target.value, 10))}
      />
      <Button type="submit" label="Update link" />
    </form>
  );
}
