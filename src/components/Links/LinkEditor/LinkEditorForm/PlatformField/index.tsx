import PlatformLogo from '@/components/Shared/PlatformLogo';
import Switch from '@/components/Shared/Switch';
import { Platform } from '@/interfaces/release.interface';
import { MouseEventHandler } from 'react';

interface PlatformFieldProps {
  value: string;
  onChange: (platformId: Platform['id'], url: string) => void;
  platformsWithUrl?: Platform[];
  platform: Platform;
  onAddButtonClick: MouseEventHandler<HTMLButtonElement>;
  platformsVisibility: { [key: number]: boolean };
  onVisibilityChange: (platformId: number, checked: boolean) => void;
}

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
    <div className="flex w-full items-center gap-4">
      <PlatformLogo platform={platform} />
      <input
        className="h-16 w-full border border-whiteLight bg-darkColorRelief pl-4 text-sm placeholder-whiteLight25 outline-none focus:border-accentColor"
        type="text"
        value={value}
        onChange={(e) => onChange(platform.id, e.target.value)}
        placeholder="Enter your URL here"
      />
      {platformsWithUrl ? (
        <Switch
          checked={platformsVisibility[platform.id] || false}
          onChange={(checked) => onVisibilityChange(platform.id, checked)}
          label={platformsVisibility[platform.id] ? 'Visible' : 'Hidden'}
        />
      ) : (
        <button onClick={onAddButtonClick}>Add</button>
      )}
    </div>
  );
}
