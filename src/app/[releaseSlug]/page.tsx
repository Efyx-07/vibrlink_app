import { Metadata } from 'next';
import { fetchReleaseDataBySlug } from '@/services/release-api.service';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ReleaseLanding from '@/components/ReleaseLanding';
import { Release } from '@/interfaces/release.interface';
import { notFound } from 'next/navigation';

type Params = Promise<{ releaseSlug: string }>;

// Génère les métadonnées pour la page
// ===========================================================================================
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { releaseSlug } = await params;
  const release: Release = await fetchReleaseDataBySlug(releaseSlug);
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

  // Précharge les données de la release côté serveur et les met en cache dans le client
  const release: Release = await fetchReleaseDataBySlug(releaseSlug);

  // Utilise le client de requête pour précharger les données
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['release', release.slug],
    queryFn: () => Promise.resolve(release),
  });

  // Déhydrate le cache dans un objet JS simple
  const dehydratedState = dehydrate(queryClient);

  // Passe le state pré-hydraté au composant client
  return (
    <HydrationBoundary state={dehydratedState}>
      <ReleaseLanding slug={release.slug} />
    </HydrationBoundary>
  );
}
