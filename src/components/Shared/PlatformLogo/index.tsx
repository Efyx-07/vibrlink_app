import { Platform } from '@/interfaces/release.interface';
import Image from 'next/image';

interface PlatformLogoProps {
  platform: Platform;
  size?: number;
}

export default function PlatformLogo({
  platform,
  size = 125,
}: PlatformLogoProps) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <Image
        src={platform.platformLogoUrl}
        alt={platform.platformName}
        fill
        sizes={`${size}px`}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
}
