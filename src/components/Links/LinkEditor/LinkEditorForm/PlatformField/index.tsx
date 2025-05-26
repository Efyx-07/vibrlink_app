import PlatformLogo from '@/components/Shared/PlatformLogo';
import Switch from '@/components/Shared/Switch';
import { Platform } from '@/interfaces/release.interface';
import { MouseEventHandler } from 'react';
import { openInANewTab } from '@/utils/openInANewTab';
import VerticalSeparator from '@/components/Shared/Separator/VerticalSeparator';

interface PlatformFieldProps {
  value: string;
  onChange: (platformId: Platform['id'], url: string) => void;
  platformsWithUrl?: Platform[];
  platform: Platform;
  onAddButtonClick: MouseEventHandler<HTMLButtonElement>;
  platformsVisibility: { [key: Platform['id']]: Platform['visibility'] };
  onVisibilityChange: (platformId: Platform['id'], checked: boolean) => void;
}

// Composant global pour un champ du LinkEditorForm
// ===========================================================================================
export default function PlatformField({
  value,
  onChange,
  platformsWithUrl,
  platform,
  onAddButtonClick,
  platformsVisibility,
  onVisibilityChange,
}: PlatformFieldProps) {
  return (
    <div className="flex w-full flex-col items-center gap-2 md:h-16 md:flex-row md:gap-8">
      <div className="hidden md:block">
        <PlatformLogo platform={platform} />
      </div>
      <div className="flex w-full items-center justify-between md:hidden">
        <PlatformLogo platform={platform} size={100} />
        <ActionButtons
          platform={platform}
          platformsWithUrl={platformsWithUrl}
          platformsVisibility={platformsVisibility}
          onVisibilityChange={onVisibilityChange}
          onAddButtonClick={onAddButtonClick}
        />
      </div>
      <div className="flex h-16 w-full">
        <PlatformFieldInput
          value={value}
          onChange={onChange}
          platform={platform}
        />
        <div className="hidden h-full border-y border-y-whiteLight bg-darkColorRelief py-3 md:block">
          <VerticalSeparator />
        </div>
        <div className="hidden size-full max-w-48 border border-l-0 border-whiteLight bg-darkColorRelief md:block">
          <ActionButtons
            platform={platform}
            platformsWithUrl={platformsWithUrl}
            platformsVisibility={platformsVisibility}
            onVisibilityChange={onVisibilityChange}
            onAddButtonClick={onAddButtonClick}
          />
        </div>
      </div>
    </div>
  );
}

// Composant local pour le champ de saisie de l'URL
// ===========================================================================================
interface PlatformFieldInputProps {
  value: string;
  onChange: (platformId: Platform['id'], url: string) => void;
  platform: Platform;
}

function PlatformFieldInput({
  value,
  onChange,
  platform,
}: PlatformFieldInputProps) {
  return (
    <input
      className="size-full border border-whiteLight bg-darkColorRelief pl-4 text-sm outline-none placeholder:text-whiteLight25 focus:border-accentColor md:border-r-transparent"
      type="url"
      value={value}
      onChange={(e) => onChange(platform.id, e.target.value)}
      placeholder="Enter your URL here"
    />
  );
}

// Composant local pour les boutons d'action
// ===========================================================================================
interface ActionButtonsProps {
  platform: Platform;
  platformsWithUrl?: Platform[];
  platformsVisibility: { [key: Platform['id']]: Platform['visibility'] };
  onVisibilityChange: (platformId: Platform['id'], checked: boolean) => void;
  onAddButtonClick: MouseEventHandler<HTMLButtonElement>;
}
function ActionButtons({
  platform,
  platformsWithUrl,
  platformsVisibility,
  onVisibilityChange,
  onAddButtonClick,
}: ActionButtonsProps) {
  return (
    <div className="flex size-full items-center justify-end gap-4 md:flex-col md:justify-center md:gap-1">
      {platformsWithUrl ? (
        <>
          <AcionButton
            label="Test link"
            onClick={() => platform.url && openInANewTab(platform.url)}
          />
          <Switch
            checked={platformsVisibility[platform.id] || false}
            onChange={(checked) => onVisibilityChange(platform.id, checked)}
            label={platformsVisibility[platform.id] ? 'Visible' : 'Hidden'}
          />
        </>
      ) : (
        <AcionButton label="Add" onClick={onAddButtonClick} />
      )}
    </div>
  );
}

// Composant local pour un bouton d'action
// ===========================================================================================
interface ActionButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AcionButton({ label, onClick }: ActionButtonProps) {
  return (
    <button className="text-sm hover:text-accentColor" onClick={onClick}>
      {label}
    </button>
  );
}
