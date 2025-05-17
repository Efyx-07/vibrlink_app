'use client';

import { Release } from '@/interfaces/release.interface';
import { useParams } from 'next/navigation';
import { useRelease } from '@/hooks/useRelease';
import LoadingPage from '@/components/LoadingPage';

export default function LinkEditor() {
  const { releaseSlug } = useParams();

  const {
    data: release,
    error,
    isLoading,
  } = useRelease(releaseSlug as Release['slug']);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div>
      <h1>{releaseSlug}</h1>
      <h2>{release?.artist}</h2>
    </div>
  );
}
