import PlatformLogo from '@/components/Shared/PlatformLogo';
import { Platform } from '@/interfaces/release.interface';
import { ChangeEventHandler, MouseEventHandler } from 'react';

interface PlatformFieldProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
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
