import { Release } from '@/interfaces/release.interface';
import { openInANewTab } from '@/utils/openInANewTab';
import { useRouter } from 'next/navigation';

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const router = useRouter();

  const navToReleaseToEditPage = (releaseSlug: string): void => {
    router.push(`/vl/links/link-editor/${releaseSlug}`);
  };

  const navToReleaseLandingPage = (releaseSlug: string): void => {
    openInANewTab(`/${releaseSlug}`);
  };

  return (
    <div className="w-full bg-darkColorRelief">
      <h1>{release.title}</h1>
      <button onClick={() => navToReleaseToEditPage(release.slug)}>Edit</button>
      <button onClick={() => navToReleaseLandingPage(release.slug)}>
        Landing page
      </button>
    </div>
  );
}
