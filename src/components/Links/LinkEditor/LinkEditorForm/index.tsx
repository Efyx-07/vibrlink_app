import { Release, Platform } from '@/interfaces/release.interface';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import PlatformLogo from '@/components/Shared/PlatformLogo';

interface LinkEditorFormProps {
  release: Release;
}

export default function LinkEditorForm({ release }: LinkEditorFormProps) {
  // État local pour gérer la liste des plateformes modifiables
  const [platformsState, setPlatformsState] = useState<Platform[]>(
    release.platforms,
  );

  // Plateforme sélectionnée dans la liste déroulante
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  // Plateformes avec une URL définie
  const platformsWithUrl: Platform[] = platformsState.filter(
    (platform) => platform.url && platform.url.trim() !== '',
  );

  // Plateformes sans URL encore définie
  const platformsWithoutUrl: Platform[] = platformsState.filter(
    (platform) => !platform.url || platform.url.trim() === '',
  );

  // Gère le changement de plateforme sélectionnée dans le select
  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const platformId = parseInt(e.target.value, 10);
    const foundPlatform = platformsState.find((p) => p.id === platformId);
    if (foundPlatform) setSelectedPlatform({ ...foundPlatform });
  };

  // Gère le changement de l'input de l'URL pour la plateforme sélectionnée
  const handleSelectedPlatformUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!selectedPlatform) return;
    setSelectedPlatform({
      ...selectedPlatform,
      url: e.target.value,
    });
  };

  // Gère l'ajout à la lise des plateformes avec une URL
  const handleAddButtonClick = () => {
    if (
      !selectedPlatform ||
      !selectedPlatform.url ||
      selectedPlatform.url.trim() === ''
    )
      return;

    const updatedPlatforms = platformsState.map((platform) => {
      // mise à jour avec l'URL saisie
      if (platform.id === selectedPlatform.id) return { ...selectedPlatform };
      return platform;
    });

    setPlatformsState(updatedPlatforms);
    setSelectedPlatform(null);
  };
  // ===========================================================================================

  return (
    <form className="w-full">
      <div className="flex flex-col gap-4">
        <h1>Generated links</h1>
        {platformsWithUrl.map((platform) => (
          <PlatformField
            key={platform.id}
            value={platform.url as string}
            onChange={() => {}}
            platformsWithUrl={platformsWithUrl}
            platform={platform}
            onAddButtonClick={() => {}}
          />
        ))}
        <h1>Enter more links manually</h1>
        {selectedPlatform && (
          <PlatformField
            value={(selectedPlatform.url as string) || ''}
            onChange={handleSelectedPlatformUrlChange}
            platform={selectedPlatform}
            onAddButtonClick={handleAddButtonClick}
          />
        )}
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

// Composant local pour le champ d'une plateforme
// ===========================================================================================
interface PlatformFieldProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  platformsWithUrl?: Platform[];
  platform: Platform;
  onAddButtonClick: MouseEventHandler<HTMLButtonElement>;
}
function PlatformField({
  value,
  onChange,
  platformsWithUrl,
  platform,
  onAddButtonClick,
}: PlatformFieldProps) {
  return (
    <div className="flex w-full items-center gap-4">
      <PlatformLogo platform={platform} />
      <input
        className="h-16 w-full border border-whiteLight bg-darkColorRelief pl-4 outline-none focus:border-accentColor"
        type="text"
        value={value}
        onChange={onChange}
      />
      {platformsWithUrl ? null : (
        <button onClick={onAddButtonClick}>Add</button>
      )}
    </div>
  );
}
