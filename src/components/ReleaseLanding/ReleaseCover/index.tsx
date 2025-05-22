import { Release } from '@/interfaces/release.interface';
import Image from 'next/image';

interface ReleaseCoverProps {
  release: Release;
}

export default function ReleaseCover({ release }: ReleaseCoverProps) {
  return (
    <div>
      <Image
        src={release.cover}
        width={500}
        height={500}
        alt={release.title}
        priority
      />
    </div>
  );
}
