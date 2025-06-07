'use client';

import { Release } from '@/interfaces/release.interface';
import LoadingPage from '../LoadingPage';
import ReleaseCover from '../Shared/ReleaseCover';
import ReleaseInfos from './ReleaseInfos';
import ReleaseLinks from './ReleaseLinks';
import Watermark from './Watermark';

interface ReleaseLandingProps {
  release: Release;
}

export default function ReleaseLanding({ release }: ReleaseLandingProps) {
  if (!release) return <LoadingPage />;
  return (
    <div
      className="flex h-dvh w-full justify-center overflow-hidden bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${release.cover})` }}
    >
      <div className="flex w-full justify-center overflow-y-auto bg-blackOverlay75 backdrop-blur-xl">
        {/* Visible uniquement sur desktop */}
        <ReleaseLandingCardDesktop release={release} />
        {/* Visible uniquement sur mobile */}
        <ReleaseLandingCardMobile release={release} />
      </div>
    </div>
  );
}

// Interface pour les composants enfants
interface ReleaseLandingCardProps {
  release: Release;
}

// Composant local pour la carte version desktop
// ===========================================================================================
function ReleaseLandingCardDesktop({ release }: ReleaseLandingCardProps) {
  return (
    <div className="relative hidden h-dvh w-full grid-cols-2 gap-16 overflow-y-scroll p-16 xl:grid">
      <div className="fixed top-1/2 ml-40 flex w-[33%] max-w-[35rem] -translate-y-1/2 items-center">
        <ReleaseCover release={release} size={750} />
      </div>
      <div className="col-start-2 col-end-[-1] flex w-full max-w-[45rem] flex-col gap-8 px-0 py-16">
        <ReleaseInfos release={release} />
        <ReleaseLinks release={release} />
        <Watermark />
      </div>
    </div>
  );
}

// Composant local pour la carte version mobile
// ===========================================================================================
function ReleaseLandingCardMobile({ release }: ReleaseLandingCardProps) {
  return (
    <div className="relative flex w-full max-w-80 flex-col items-center xl:hidden">
      <div className="sticky -top-20">
        <ReleaseCover release={release} />
      </div>
      <ReleaseInfos release={release} />
      <ReleaseLinks release={release} />
      <Watermark />
    </div>
  );
}
