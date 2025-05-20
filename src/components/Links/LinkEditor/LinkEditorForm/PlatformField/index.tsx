import PlatformLogo from '@/components/Shared/PlatformLogo';
import { Platform } from '@/interfaces/release.interface';
import { MouseEventHandler } from 'react';

interface PlatformFieldProps {
  value: string;
  onChange: (platformId: Platform['id'], url: string) => void;
  platformsWithUrl?: Platform[];
  platform: Platform;
  onAddButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export default function PlatformField({
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
        className="h-16 w-full border border-whiteLight bg-darkColorRelief pl-4 text-sm placeholder-whiteLight25 outline-none focus:border-accentColor"
        type="text"
        value={value}
        onChange={(e) => onChange(platform.id, e.target.value)}
        placeholder="Enter your URL here"
      />
      {platformsWithUrl ? null : (
        <button onClick={onAddButtonClick}>Add</button>
      )}
    </div>
  );
}
