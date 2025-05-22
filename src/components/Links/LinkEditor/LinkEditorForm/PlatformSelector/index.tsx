import { Platform } from '@/interfaces/release.interface';
import { ChangeEventHandler } from 'react';
import { Icon } from '@iconify/react';

interface PlatformSelectorProps {
  platformsWithoutUrl: Platform[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  selectedPlatformId: number | null;
}

export default function PlatformSelector({
  platformsWithoutUrl,
  onChange,
  selectedPlatformId,
}: PlatformSelectorProps) {
  const defaultOptionValue = '';
  return (
    <div className="group relative h-14 w-full">
      <select
        className="size-full cursor-pointer appearance-none border border-whiteLight bg-darkColorRelief pl-4 outline-none"
        onChange={onChange}
        id="platform-select"
        value={selectedPlatformId ?? defaultOptionValue}
      >
        <option disabled value={defaultOptionValue} className="default-option">
          Add a platform
        </option>
        {platformsWithoutUrl.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
      <Icon
        icon="ri:arrow-down-s-line"
        className="pointer-events-none absolute right-4 top-4 text-2xl group-hover:text-accentColor"
      />
    </div>
  );
}
