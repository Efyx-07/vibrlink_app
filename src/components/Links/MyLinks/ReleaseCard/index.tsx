import { Release } from '@/interfaces/release.interface';
import { useRouter } from 'next/navigation';

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const router = useRouter();

  const navToReleaseToEditPage = (releaseSlug: string): void => {
    router.push(`/vl/links/link-editor/${releaseSlug}`);
  };

  return (
    <div className="w-full bg-darkColorRelief">
      <h1>{release.title}</h1>
      <button onClick={() => navToReleaseToEditPage(release.slug)}>Edit</button>
    </div>
  );
}
