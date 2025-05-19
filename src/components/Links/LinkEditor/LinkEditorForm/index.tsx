import { Release, Platform } from '@/interfaces/release.interface';
import { ChangeEventHandler, useState } from 'react';

interface LinkEditorFormProps {
  release: Release;
}

export default function LinkEditorForm({ release }: LinkEditorFormProps) {
  // Gère l'état de la plateforme sélectionnée
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  // Récupère les plateformes de la release
  const platforms = release.platforms;

  // Filtre les plateformes pour ne garder que celles qui ont une URL (trim vérifie que l'URL n'est pas vide)
  const platformsWithUrl: Platform[] = release.platforms.filter(
    (platform) => platform.url && platform.url.trim() !== '',
  );

  // Filtre les plateformes pour ne garder que celles qui n'ont pas encore d'URL
  const platformsWithoutUrl: Platform[] = release.platforms.filter(
    (platform) => !platform.url,
  );

  const handlePlatformChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const platformId = parseInt(e.target.value);
    const platform = platforms.find((p) => p.id === platformId);
    if (platform) setSelectedPlatform(platform);
  };
  // ===========================================================================================

  return (
    <form>
      <div className="flex flex-col gap-4">
        {platformsWithUrl.map((platform) => (
          <input
            key={platform.id}
            className="h-16 border border-whiteLight bg-darkColorRelief pl-4 outline-none focus:border-accentColor"
            type="text"
            value={platform.url as string}
            onChange={() => {}}
          />
        ))}
        {selectedPlatform && (
          <input
            className="h-16 border border-whiteLight bg-darkColorRelief pl-4 outline-none focus:border-accentColor"
            type="text"
            value={selectedPlatform.url as string}
            onChange={() => {}}
          />
        )}
        {/* Sélecteur de plateforme */}
        <PlatformSelector
          platformsWithoutUrl={platformsWithoutUrl}
          onChange={handlePlatformChange}
        />
      </div>
    </form>
  );
}

// Composant local pour le selecteur de plateforme
// ===========================================================================================
interface PlatformSelectorProps {
  platformsWithoutUrl: Platform[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

function PlatformSelector({
  platformsWithoutUrl,
  onChange,
}: PlatformSelectorProps) {
  const defaultOptionValue = 'Sélectionner une plateforme';
  return (
    <select
      className="h-16 border border-whiteLight bg-darkColorRelief pl-4 outline-none focus:border-accentColor"
      onChange={onChange}
      id="platform-select"
      defaultValue={defaultOptionValue}
    >
      <option disabled value={defaultOptionValue} className="default-option">
        {defaultOptionValue}
      </option>
      {platformsWithoutUrl.map((platform) => (
        <option key={platform.id} value={platform.id}>
          {platform.name}
        </option>
      ))}
    </select>
  );
}
