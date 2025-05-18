import { Release } from '@/interfaces/release.interface';
import { openInANewTab } from '@/utils/openInANewTab';
import { useRouter } from 'next/navigation';

interface LinkCardProps {
  release: Release;
}

export default function LinkCard({ release }: LinkCardProps) {
  const router = useRouter();

  const navToLinkToEditPage = (releaseSlug: string): void => {
    router.push(`/vl/links/link-editor/${releaseSlug}`);
  };

  const navToReleaseLandingPage = (releaseSlug: string): void => {
    openInANewTab(`/${releaseSlug}`);
  };

  return (
    <div className="w-full bg-darkColorRelief">
      <h1>{release.title}</h1>
      <div className="flex gap-2">
        <button
          className="border border-whiteColor p-2"
          onClick={() => navToLinkToEditPage(release.slug)}
        >
          Edit
        </button>
        <button
          className="border border-whiteColor p-2"
          onClick={() => navToReleaseLandingPage(release.slug)}
        >
          Landing page
        </button>
      </div>
    </div>
  );
}
