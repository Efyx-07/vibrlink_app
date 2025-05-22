import { Release } from '@/interfaces/release.interface';
import './Triangle.css';

interface ReleaseInfosProps {
  release: Release;
}

export default function ReleaseInfos({ release }: ReleaseInfosProps) {
  return (
    <div className="sticky top-40 z-20 flex min-h-20 w-full flex-col justify-center gap-1 bg-whiteColor p-2 text-center text-darkColor md:relative md:bg-transparent md:p-0 md:text-left md:text-whiteColor">
      <p className="font-semibold md:text-4xl">
        {release.artist} - {release.title}
      </p>
      <p className="text-sm md:hidden">Choose your platform</p>
      <div className="triangle md:hidden" />
    </div>
  );
}
