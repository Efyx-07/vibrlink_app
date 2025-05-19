import { Platform } from '@/interfaces/release.interface';
import Image from 'next/image';

interface PlatformLogoProps {
  platform: Platform;
}

export default function PlatformLogo({ platform }: PlatformLogoProps) {
  return (
    <Image
      src={platform.logoUrl}
      width={125}
      height={125}
      alt={platform.name}
      priority
    />
  );
}
