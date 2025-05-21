import { Platform } from '@/interfaces/release.interface';
import Image from 'next/image';

interface PlatformLogoProps {
  platform: Platform;
  size?: number;
}

export default function PlatformLogo({ platform, size }: PlatformLogoProps) {
  return (
    <Image
      src={platform.logoUrl}
      width={size || 125}
      height={size || 125}
      alt={platform.name}
      priority
    />
  );
}
