'use client';

import { Release } from '@/interfaces/release.interface';
import { useParams } from 'next/navigation';
import { useRelease } from '@/hooks/releases/useRelease';
import LoadingPage from '@/components/Layout/LoadingPage';
import LinkCard from '../Shared/LinkCard';
import LinkEditorForm from './LinkEditorForm';
import PageTitle from '@/components/Shared/PageTitle';
import { apiUrl } from '@/constant';

export default function LinkEditor() {
  const { releaseSlug } = useParams();

  // Utilise le hook useRelease pour récupérer la release à éditer
  const { data: release, isLoading } = useRelease(
    apiUrl,
    releaseSlug as Release['slug'],
  );

  if (isLoading) return <LoadingPage />;

  if (!release) return null;

  return (
    <div className="flex w-full max-w-[70rem] flex-col items-center gap-4">
      <PageTitle primaryPart="Edit" secondaryPart="your link" />
      <div className="flex w-full flex-col gap-12">
        <LinkCard release={release} isEditor={true} />
        <LinkEditorForm release={release} />
      </div>
    </div>
  );
}
