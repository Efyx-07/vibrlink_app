import { Metadata } from 'next';
import { fetchReleaseDataBySlug } from '@/services/release-api.service';
import ReleaseLanding from '@/components/ReleaseLanding';
import { Release } from '@/interfaces/release.interface';
import { backendUrl } from '@/constant';

type Params = Promise<{ releaseSlug: string }>;

// Génère les métadonnées pour la page
// ===========================================================================================
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { releaseSlug } = await params;
  const release: Release = await fetchReleaseDataBySlug(
    backendUrl,
    releaseSlug,
  );
  if (!release) return { title: 'Not Found' };

  return {
    title: `${release?.artist} | ${release?.title}`,
    description: `Listen to ${release?.title} by ${release?.artist}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${release?.slug}`,
    },
    openGraph: {
      title: `${release?.artist} | ${release?.title}`,
      description: `Listen to ${release?.title} by ${release?.artist}`,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${release?.slug}`,
      images: [`${release?.cover}`],
    },
  };
}

// Page de destination pour une release sélectionnée
// ===========================================================================================
export default async function ReleaseLandingPage({
  params,
}: {
  params: Params;
}) {
  const { releaseSlug } = await params;

  // Précharge les données de la release côté serveur
  const release: Release = await fetchReleaseDataBySlug(
    backendUrl,
    releaseSlug,
  );
  return <ReleaseLanding release={release} />;
}
