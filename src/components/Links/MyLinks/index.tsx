'use client';

import { useReleases } from '@/hooks/releases/useReleases';
import LoadingPage from '@/components/Layout/LoadingPage';
import LinkCard from '../Shared/LinkCard';
import PageTitle from '@/components/Shared/PageTitle';
import EmptyList from './EmptyList';
import { Release } from '@/interfaces/release.interface';

export default function MyLinks() {
  // Utilise le hook useReleases pour récupérer les releases de l'utilisateur
  const { data: releases, isLoading } = useReleases();

  // Inverse l'ordre des releases pour un affichage du plus récent en 1er
  const reverseReleases = (releases: readonly Release[]) => {
    return [...releases].reverse();
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="flex w-full max-w-[70rem] flex-col gap-4">
      {releases && releases.length > 0 ? (
        <>
          <PageTitle primaryPart="Manage" secondaryPart="your links" />
          {reverseReleases(releases).map((release) => (
            <div key={release.id} className="w-full">
              <LinkCard release={release} />
            </div>
          ))}
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}
