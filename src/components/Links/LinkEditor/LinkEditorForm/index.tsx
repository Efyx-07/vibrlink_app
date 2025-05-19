import { Release } from '@/interfaces/release.interface';
import Button from '@/components/Shared/Button';
import { useLinkEditor } from './hooks/useLinkEditor';
import PlatformSelector from './PlatformSelector';
import PlatformField from './PlatformField';
import { useUpdateReleaseLinks } from '@/hooks/useUpdateReleaseLinks';
import Separator from '@/components/Shared/Separator';

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

  const { mutate, isPending } = useUpdateReleaseLinks(
    release.id,
    newUrls,
    platformsState,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form className="flex w-full flex-col gap-12" onSubmit={handleSubmit}>
      <LinkEditorSection title="Generated links">
        {platformsWithUrl.map((platform) => (
          <PlatformField
            key={platform.id}
            platform={platform}
            platformsWithUrl={platformsWithUrl}
            value={newUrls[platform.id] || ''}
            onChange={(e) => updateUrl(platform.id, e.target.value)}
            onAddButtonClick={() => {}}
          />
        ))}
      </LinkEditorSection>
      <LinkEditorSection title="Enter more links manually">
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
      </LinkEditorSection>
      <Button type="submit" label="Update link" isLoading={isPending} />
    </form>
  );
}

// Composant local pour une section
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
