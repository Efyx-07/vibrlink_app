'use client';

import { useRelease } from '@/hooks/useRelease';
import { Release } from '@/interfaces/release.interface';
import LoadingPage from '../LoadingPage';

interface ReleaseLandingProps {
  slug: Release['slug'];
}

export default function ReleaseLanding({ slug }: ReleaseLandingProps) {
  const { data, isLoading } = useRelease(slug);

  if (isLoading || !data) return <LoadingPage />;
  return (
    <div>
      <h1>{data.slug}</h1>
      {data?.platforms
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
