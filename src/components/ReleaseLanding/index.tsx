'use client';

import { useRelease } from '@/hooks/useRelease';
import { Release } from '@/interfaces/release.interface';
import LoadingPage from '../LoadingPage';
import ReleaseCover from './ReleaseCover';

interface ReleaseLandingProps {
  slug: Release['slug'];
}

export default function ReleaseLanding({ slug }: ReleaseLandingProps) {
  const { data, isLoading } = useRelease(slug);

  if (isLoading || !data) return <LoadingPage />;
  return (
    <div
      className="flex h-dvh w-full justify-center overflow-hidden bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${data.cover})` }}
    >
      <div className="flex w-full justify-center overflow-y-auto bg-blackOverlay75 backdrop-blur-xl">
        <ReleaseCover release={data} />
        {/* <h1>{data.slug}</h1>
        {data.platforms
          ?.filter((platform) => platform.visibility && platform.url)
          .map((platform) => (
            <div key={platform.id}>
              <h3>{platform.name}</h3>
              <p>{platform.url}</p>
            </div>
          ))} */}
      </div>
    </div>
  );
}
