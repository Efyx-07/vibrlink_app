import { Release } from '@/interfaces/release.interface';
import { openInANewTab } from '@/utils/openInANewTab';
import { useRouter } from 'next/navigation';
import { deleteLinkByReleaseId } from '@/services/release.service';
import { useQueryClient } from '@tanstack/react-query';

interface LinkCardProps {
  release: Release;
}

export default function LinkCard({ release }: LinkCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const navToLinkToEditPage = (releaseSlug: Release['slug']): void => {
    router.push(`/vl/links/link-editor/${releaseSlug}`);
  };

  const navToReleaseLandingPage = (releaseSlug: Release['slug']): void => {
    openInANewTab(`/${releaseSlug}`);
  };

  const deleteLink = async (): Promise<void> => {
    try {
      await deleteLinkByReleaseId(release.id);
      queryClient.invalidateQueries({ queryKey: ['releases'] });
    } catch (error) {
      console.error('Error while deleting link:', error);
    }
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
        <button className="border border-whiteColor p-2" onClick={deleteLink}>
          Delete link
        </button>
      </div>
    </div>
  );
}
