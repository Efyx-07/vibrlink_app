import { Release } from '@/interfaces/release.interface';
import './Triangle.css';

interface ReleaseInfosProps {
  release: Release;
}

export default function ReleaseInfos({ release }: ReleaseInfosProps) {
  return (
    <div className="sticky top-40 z-20 flex min-h-20 w-full max-w-80 flex-col justify-center gap-1 rounded-b-md bg-whiteColor p-2 text-center text-darkColor xl:relative xl:top-0 xl:max-w-none xl:bg-transparent xl:p-0 xl:text-left xl:text-whiteColor">
      <p className="font-semibold xl:text-[2.5rem]">
        {release.artist} - {release.title}
      </p>
      <p className="text-sm xl:hidden">Choose your platform</p>
      <div className="triangle xl:hidden" />
    </div>
  );
}
