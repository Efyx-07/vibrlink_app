import PlatformLogo from '@/components/Shared/PlatformLogo';
import Switch from '@/components/Shared/Switch';
import { Platform } from '@/interfaces/release.interface';
import { MouseEventHandler } from 'react';
import { openInANewTab } from '@/utils/openInANewTab';
import { VerticalSeparator } from '@/components/Shared/Separator';

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
    <div className="flex h-16 w-full items-center">
      <PlatformLogo platform={platform} />
      <input
        className="ml-8 size-full border border-r-0 border-whiteLight bg-darkColorRelief pl-4 text-sm placeholder-whiteLight25 outline-none focus:border-accentColor"
        type="text"
        value={value}
        onChange={(e) => onChange(platform.id, e.target.value)}
        placeholder="Enter your URL here"
      />
      <div className="h-full bg-darkColorRelief py-3">
        <VerticalSeparator />
      </div>
      <div className="flex size-full max-w-48 flex-col items-center justify-center gap-1 border border-l-0 border-whiteLight bg-darkColorRelief">
        {platformsWithUrl ? (
          <>
            <button
              className="text-sm hover:text-accentColor"
              onClick={() => platform.url && openInANewTab(platform.url)}
            >
              Test link
            </button>
            <Switch
              checked={platformsVisibility[platform.id] || false}
              onChange={(checked) => onVisibilityChange(platform.id, checked)}
              label={platformsVisibility[platform.id] ? 'Visible' : 'Hidden'}
            />
          </>
        ) : (
          <button
            className="text-sm hover:text-accentColor"
            onClick={onAddButtonClick}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
