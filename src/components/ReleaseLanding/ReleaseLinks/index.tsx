import { Release } from '@/interfaces/release.interface';
import { openInANewTab } from '@/utils/openInANewTab';
import PlatformLogo from '@/components/Shared/PlatformLogo';

interface ReleaseLinksProps {
  release: Release;
}

export default function ReleaseLinks({ release }: ReleaseLinksProps) {
  return (
    <div className="flex h-full w-full flex-col bg-whiteLight xl:gap-4 xl:bg-transparent">
      {release.platforms.map((platform) =>
        platform.url && platform.visibility ? (
          <div
            className="group flex h-20 cursor-pointer items-center justify-between border-t border-t-whiteLight px-4 hover:bg-darkColor xl:h-[4.25rem] xl:rounded-[4rem] xl:bg-whiteLight25 xl:px-8"
            key={platform.id}
            onClick={() => platform.url && openInANewTab(platform.url)}
          >
            <PlatformLogo platform={platform} size={112} />
            <button className="border border-whiteLight bg-transparent px-4 py-1 group-hover:bg-whiteColor group-hover:text-darkColor">
              {platform.actionVerb}
            </button>
          </div>
        ) : null,
      )}
    </div>
  );
}
