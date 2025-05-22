'use client';

import { Release } from '@/interfaces/release.interface';
import { useParams } from 'next/navigation';
import { useRelease } from '@/hooks/useRelease';
import LoadingPage from '@/components/LoadingPage';

export default function ReleaseLanding() {
  const { releaseSlug } = useParams();

  // Utilise le hook useRelease pour récupérer la release à éditer
  const { data: release, isLoading } = useRelease(
    releaseSlug as Release['slug'],
  );

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div>
      <h1>{releaseSlug}</h1>
      {release?.platforms
        ?.filter((platform) => platform.visibility && platform.url)
        .map((platform) => (
          <div key={platform.id}>
            <h3>{platform.name}</h3>
            <p>{platform.url}</p>
          </div>
        ))}
    </div>
  );
}
