'use client';

import { useRelease } from '@/hooks/useRelease';
import { Release } from '@/interfaces/release.interface';
import LoadingPage from '../LoadingPage';
import ReleaseCover from './ReleaseCover';
import ReleaseInfos from './ReleaseInfos';
import ReleaseLinks from './ReleaseLinks';

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
        <div className="relative grid h-dvh w-full grid-cols-2 gap-16 overflow-y-scroll p-16">
          <div className="fixed top-1/2 ml-40 flex w-[33%] max-w-[35rem] -translate-y-1/2 transform items-center">
            <ReleaseCover release={data} />
          </div>
          <div className="col-start-2 col-end-[-1] flex w-full max-w-[45rem] flex-col gap-8 px-0 py-16">
            {/* <ReleaseInfos release={data} /> */}
            <ReleaseLinks release={data} />
          </div>
        </div>
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
