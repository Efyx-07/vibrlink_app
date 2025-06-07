'use client';

import FormField from '@/components/Shared/Forms/FormField';
import Button from '@/components/Shared/Button';
import { useEffect, useState } from 'react';
import { validateSpotifyUrl } from '@/utils/validateSpotifyUrl';
import useUserStore from '@/stores/userStore';
import { User } from '@/interfaces/user.interface';
import { Release } from '@/interfaces/release.interface';
import { SpotifyEntry } from '@/interfaces/spotify.interface';
import { useRouter } from 'next/navigation';
import { useCreateLink } from '@/hooks/releases/useCreateLink';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';

export default function NewLinkForm() {
  const userStore = useUserStore();
  const router = useRouter();

  // State pour l'URL de l'album
  const [albumUrl, setAlbumUrl] = useState<SpotifyEntry['albumUrl']>('');
  const [isAlbumUrlValid, setIsAlbumUrlValid] = useState<boolean>(false);

  // State pour l'opération de redirection
  // Permet au bouton de rester en mode loading jusqu'à la fin du processus Succès
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  // State pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Vérification de la validité du champ
  useEffect(() => {
    setIsAlbumUrlValid(validateSpotifyUrl(albumUrl));
  }, [albumUrl]);

  // Utilisation du hook de création des liens
  const { mutate, isPending } = useCreateLink();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setErrorMessage(''); // Reset du message d'erreur

    // Vérifie si l'URL est valide
    if (!validateSpotifyUrl(albumUrl)) {
      setErrorMessage('Invalid spotify url');
      return;
    }

    // Récupère l'ID de l'utilisateur dans le store
    const userId: User['id'] | undefined = userStore.user?.id;

    // Appelle la mutation pour créer le lien
    mutate(
      { albumUrl, userId },
      {
        onSuccess: (data) => {
          const releaseSlug: Release['slug'] = data.releaseSlug;
          setIsRedirecting(true);
          router.push(`/vl/links/link-editor/${releaseSlug}`);
        },
        onError: () => {
          const message: string = 'Failed to create link';
          setErrorMessage(message);
        },
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
        type="url"
        value={albumUrl}
        onChange={(e) => {
          setAlbumUrl(e.target.value);
          if (errorMessage) setErrorMessage('');
        }}
        isValid={isAlbumUrlValid}
      />
      <Button
        type="submit"
        label="Create my link"
        isLoading={isPending || isRedirecting}
        disabled={isPending || isRedirecting}
      />
      {errorMessage && <ErrorMessage text={errorMessage} />}
    </form>
  );
}
