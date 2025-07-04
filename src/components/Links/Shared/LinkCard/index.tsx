import { Release } from '@/interfaces/release.interface';
import Image from 'next/image';
import ReleaseCover from '@/components/Shared/ReleaseCover';
import HorizontalSeparator from '@/components/Shared/Separator/HorizontalSeparator';
import { formatDate, timeAgo } from '@/utils/formatDate';
import CardCTAButtons from './CardCTAButtons';

interface LinkCardProps {
  release: Release;
  isEditor?: boolean;
}

export default function LinkCard({ release, isEditor }: LinkCardProps) {
  return (
    <div className="flex w-full flex-col gap-8 border border-whiteLight bg-darkColorRelief p-4 md:flex-row">
      <div className="flex w-full gap-4 md:gap-6">
        <div className="size-full max-w-52">
          <ReleaseCover release={release} size={208} />
        </div>
        <LinkCardInfos release={release} isEditor={isEditor} />
      </div>
      {!isEditor && <CardCTAButtons release={release} />}
    </div>
  );
}

// Composant local pour les informations de la release
// ===========================================================================================
interface LinkCardInfosProps {
  release: Release;
  isEditor?: boolean;
}
function LinkCardInfos({ release, isEditor }: LinkCardInfosProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="size-6 md:size-9">
            <Image
              className="size-full rounded-full border-2 border-whiteColor"
              src={release.artistImage}
              width={100}
              height={100}
              alt={release.title}
              priority
            />
          </div>
          <p className="text-sm opacity-75">{release.artist}</p>
        </div>
        <p className="text-2xl font-semibold">{release.title}</p>
      </div>
      {!isEditor && (
        <>
          <HorizontalSeparator />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-light opacity-75">
              created: {formatDate(release.creationDate)}
            </p>
            {release.creationDate !== release.lastUpdate && (
              <p className="text-xs font-light opacity-75">
                updated: {timeAgo(release.lastUpdate)}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
