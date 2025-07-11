import Button from '@/components/Shared/Button';
import ConfirmModal from '@/components/Shared/ConfirmModal';
import { useDeleteLink } from '@/hooks/releases/useDeleteLink';
import { Release } from '@/interfaces/release.interface';
import { openInANewTab } from '@/utils/openInANewTab';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { appUrl } from '@/constant';

interface CardCTAButtonsProps {
  release: Release;
}

export default function CardCTAButtons({ release }: CardCTAButtonsProps) {
  const router = useRouter();

  // State pour gérer l'ouverture et la fermeture de la modale de confirmation
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Navigue vers la page d'édition du lien
  const navToLinkToEditPage = (releaseSlug: Release['slug']): void =>
    router.push(`/vl/links/link-editor/${releaseSlug}`);

  // Ouvre la landing page du lien dans un nouvel onglet
  const navToReleaseLandingPage = (releaseSlug: Release['slug']): void =>
    openInANewTab(`/${releaseSlug}`);

  // Copie le lien de la release dans le presse-papiers
  const [copied, setCopied] = useState<boolean>(false);
  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`${appUrl}/${release.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy!', error);
    }
  };

  // Gère l'ouverture et la fermeture de la modale de confirmation
  const openConfirmModal = () => setIsOpen(true);
  const closeConfirmModal = () => setIsOpen(false);

  // Utilisation du hook et la mutation pour supprimer le lien
  const { mutate, isPending } = useDeleteLink();
  const deleteLink = async (): Promise<void> => {
    mutate(release.id);
    closeConfirmModal();
  };

  // Liste des boutons d'action
  const CTAButtons = [
    { label: 'Edit', onClick: () => navToLinkToEditPage(release.slug) },
    {
      label: 'Landing page',
      onClick: () => navToReleaseLandingPage(release.slug),
    },
    {
      label: copied ? 'Copied to clipboard!' : 'Copy album link',
      onClick: copyToClipboard,
    },
    { label: 'Delete link', onClick: openConfirmModal },
  ];
  // ===========================================================================================

  return (
    <>
      <div className="flex flex-col gap-4">
        {CTAButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            isSmall={true}
            isDangerous={button.label === 'Delete link'}
            label={button.label}
            onButtonClick={button.onClick}
          />
        ))}
      </div>
      {isOpen && (
        <ConfirmModal
          topline={`Are you sure you want to delete "${release.title}" ?`}
          message="This will definitely remove this release."
          onConfirm={deleteLink}
          onCancel={closeConfirmModal}
          icon="mdi:skull-crossbones"
          isLoading={isPending}
        />
      )}
    </>
  );
}
