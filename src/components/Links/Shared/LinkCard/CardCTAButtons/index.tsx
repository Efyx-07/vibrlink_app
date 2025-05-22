import Button from '@/components/Shared/Button';
import ConfirmModal from '@/components/Shared/ConfirmModal';
import { Release } from '@/interfaces/release.interface';
import { deleteLinkByReleaseId } from '@/services/release.service';
import { openInANewTab } from '@/utils/openInANewTab';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CardCTAButtonsProps {
  release: Release;
}

export default function CardCTAButtons({ release }: CardCTAButtonsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navToLinkToEditPage = (releaseSlug: Release['slug']): void => {
    router.push(`/vl/links/link-editor/${releaseSlug}`);
  };

  const navToReleaseLandingPage = (releaseSlug: Release['slug']): void => {
    openInANewTab(`/${releaseSlug}`);
  };

  const openConfirmModal = () => setIsOpen(true);
  const closeConfirmModal = () => setIsOpen(false);

  const deleteLink = async (): Promise<void> => {
    try {
      await deleteLinkByReleaseId(release.id);
      queryClient.invalidateQueries({ queryKey: ['releases'] });
    } catch (error) {
      console.error('Error while deleting link:', error);
    }
  };

  const CTAButtons = [
    { label: 'Edit', onClick: () => navToLinkToEditPage(release.slug) },
    {
      label: 'Landing page',
      onClick: () => navToReleaseLandingPage(release.slug),
    },
    { label: 'Copy album link', onClick: () => {} },
    { label: 'Delete link', onClick: openConfirmModal },
  ];
  return (
    <div>
      <div className="flex flex-col gap-4">
        {CTAButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            isLinkCard={true}
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
        />
      )}
    </div>
  );
}
