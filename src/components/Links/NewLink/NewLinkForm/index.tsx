'use client';

import FormField from '@/components/Shared/Forms/FormField';
import Button from '@/components/Shared/Button';
import { useState } from 'react';
import { validateSpotifyUrl } from '@/utils/validateSpotifyUrl';
import useUserStore from '@/stores/userStore';
import { User } from '@/interfaces/user.interface';
import { Release } from '@/interfaces/release.interface';
import { useRouter } from 'next/navigation';
import { useCreateLink } from '@/hooks/useCreateLink';

export default function NewLinkForm() {
  const userStore = useUserStore();
  const router = useRouter();

  // State pour l'URL de l'album
  const [albumUrl, setAlbumUrl] = useState<string>('');

  // Utilisation du hook de création des liens
  const { mutate, isPending } = useCreateLink();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérifie si l'URL est valide
    if (!validateSpotifyUrl(albumUrl)) return;

    // Récupère l'ID de l'utilisateur dans le store
    const userId: User['id'] | undefined = userStore.user?.id;

    // Appelle la mutation pour créer le lien
    mutate(
      { albumUrl, userId },
      {
        onSuccess: (data) => {
          const releaseSlug: Release['slug'] = data.releaseSlug;
          router.push(`/vl/links/link-editor/${releaseSlug}`);
        },
        onError: (error) => console.error('Failed to create link:', error),
      },
    );
  };
  // ===========================================================================================

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
      <FormField
        id="albumUrl"
        label="Enter your release Spotify link:"
        addedMention='example: "https://open.spotify.com/intl-fr/album/..."'
        name="albumUrl"
        type="text"
        value={albumUrl}
        onChange={(e) => setAlbumUrl(e.target.value)}
      />
      <Button type="submit" label="Create my link" isLoading={isPending} />
    </form>
  );
}
