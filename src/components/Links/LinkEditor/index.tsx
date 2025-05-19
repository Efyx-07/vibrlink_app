'use client';

import { Release } from '@/interfaces/release.interface';
import { useParams } from 'next/navigation';
import { useRelease } from '@/hooks/useRelease';
import LoadingPage from '@/components/LoadingPage';
import LinkCard from '../Shared/LinkCard';

export default function LinkEditor() {
  const { releaseSlug } = useParams();

  const {
    data: release,
    error,
    isLoading,
  } = useRelease(releaseSlug as Release['slug']);

  if (isLoading) return <LoadingPage />;

  if (!release) return null;

  return (
    <div>
      <LinkCard release={release} isEditor={true} />
    </div>
  );
}
