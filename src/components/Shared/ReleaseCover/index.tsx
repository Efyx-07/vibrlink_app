import { Release } from '@/interfaces/release.interface';
import Image from 'next/image';

interface ReleaseCoverProps {
  release: Release;
  size?: number;
}

export default function ReleaseCover({ release, size }: ReleaseCoverProps) {
  return (
    <div>
      <Image
        src={release.cover}
        width={size || 500}
        height={size || 500}
        alt={release.title}
        priority
      />
    </div>
  );
}
