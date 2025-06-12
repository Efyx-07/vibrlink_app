'use client';

import { Release } from '@/interfaces/release.interface';
import { openInANewTab } from '@/utils/openInANewTab';
import PlatformLogo from '@/components/Shared/PlatformLogo';
import { useRelease } from '@/hooks/releases/useRelease';
import { apiUrl } from '@/constant';
import React from 'react';

interface ReleaseLinksProps {
  slug: Release['slug'];
}

export default function ReleaseLinks({ slug }: ReleaseLinksProps) {
  // Utilise le hook pour récupérer la release par son slug
  // Permet un refetch des liens à chaque modification dans le Link-editor
  const { data: release, isLoading, isError } = useRelease(apiUrl, slug);

  if (isLoading) return linkLoadingSkeleton();
  if (isError || !release) return <p>Erreur lors du chargement</p>;

  // ===========================================================================================
  return (
    <div className="flex size-full flex-col bg-whiteLight xl:gap-4 xl:bg-transparent">
      {release.platforms.map((platform) =>
        platform.url && platform.visibility ? (
          <div
            className="group flex h-20 cursor-pointer items-center justify-between border-t border-t-whiteLight px-4 hover:bg-darkColor xl:h-[4.25rem] xl:rounded-[4rem] xl:border xl:border-whiteLight xl:bg-whiteLight25 xl:px-8"
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

function linkLoadingSkeleton() {
  const skeletonItem = (
    <div className="flex h-20 items-center justify-between border-t border-t-whiteLight px-4 xl:h-[4.25rem] xl:rounded-[4rem] xl:border xl:border-whiteLight xl:bg-whiteLight25 xl:px-8">
      Loading...
    </div>
  );

  return (
    <div className="flex size-full flex-col bg-whiteLight xl:gap-4 xl:bg-transparent">
      {[...Array(3)].map((_, index: number) => (
        <div key={index}>{skeletonItem}</div>
      ))}
    </div>
  );
}
