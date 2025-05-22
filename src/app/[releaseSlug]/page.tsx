import { Metadata } from 'next';
import { fetchReleaseDataBySlug } from '@/services/release-api.service';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ReleaseLanding from '@/components/ReleaseLanding';

interface Props {
  params: { releaseSlug: string };
}

// Génère les métadonnées pour la page
// ===========================================================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const release = await fetchReleaseDataBySlug(params.releaseSlug);
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
export default async function ReleaseLandingPage({ params }: Props) {
  const queryClient = new QueryClient();

  // Précharge les données de la release côté serveur et les met en cache dans le client
  const release = await fetchReleaseDataBySlug(params.releaseSlug);

  // Utilise le client de requête pour précharger les données
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
