'use client';

import { useQueryClient } from '@tanstack/react-query';
import useUserStore from '@/stores/userStore';
import { User } from '@/interfaces/user.interface';
import { useEffect } from 'react';
import { useReleases } from '@/hooks/useReleases';
import LoadingPage from '@/components/LoadingPage';
import ReleaseCard from './ReleaseCard';

export default function MyLinks() {
  const userStore = useUserStore();
  const userId: User['id'] | undefined = userStore.user?.id;

  const queryClient = useQueryClient();

  const { data: releases, error, isLoading } = useReleases(userId);

  // Re-fetch si userId devient dispo après le 1er rendu
  useEffect(() => {
    if (typeof userId === 'number') {
      void queryClient.invalidateQueries({ queryKey: ['releases', userId] });
    }
  }, [userId, queryClient]);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      {releases &&
        releases.map((release) => (
          <div key={release.id} className="w-full">
            <ReleaseCard release={release} />
          </div>
        ))}
    </>
  );
}
