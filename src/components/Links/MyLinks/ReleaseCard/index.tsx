import { Release } from '@/interfaces/release.interface';

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <div className="w-full bg-darkColorRelief">
      <h1>{release.title}</h1>
    </div>
  );
}
