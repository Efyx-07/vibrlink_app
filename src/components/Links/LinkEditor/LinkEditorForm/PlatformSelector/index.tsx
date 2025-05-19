import { Platform } from '@/interfaces/release.interface';
import { ChangeEventHandler } from 'react';

interface PlatformSelectorProps {
  platformsWithoutUrl: Platform[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function PlatformSelector({
  platformsWithoutUrl,
  onChange,
}: PlatformSelectorProps) {
  const defaultOptionValue = 'Add a platform';
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
