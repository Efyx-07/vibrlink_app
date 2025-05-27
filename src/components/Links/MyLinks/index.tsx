'use client';

import useUserStore from '@/stores/userStore';
import { User } from '@/interfaces/user.interface';
import { useReleases } from '@/hooks/useReleases';
import LoadingPage from '@/components/LoadingPage';
import LinkCard from '../Shared/LinkCard';
import PageTitle from '@/components/Shared/PageTitle';
import EmptyList from './EmptyList';

export default function MyLinks() {
  const userStore = useUserStore();
  const userId: User['id'] | undefined = userStore.user?.id;

  // Utilise le hook useReleases pour récupérer les releases de l'utilisateur
  const { data: releases, isLoading } = useReleases(userId);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="flex w-full max-w-[70rem] flex-col gap-4">
      {releases && releases.length > 0 ? (
        <>
          <PageTitle primaryPart="Manage" secondaryPart="your links" />
          {releases.map((release) => (
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
