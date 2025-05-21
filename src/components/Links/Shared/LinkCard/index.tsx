import { Release } from '@/interfaces/release.interface';
import { openInANewTab } from '@/utils/openInANewTab';
import { useRouter } from 'next/navigation';
import { deleteLinkByReleaseId } from '@/services/release.service';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import HorizontalSeparator from '@/components/Shared/Separator/HorizontalSeparator';
import Button from '@/components/Shared/Button';
import { formatDate, timeAgo } from '@/utils/formatDate';
import ConfirmModal from '@/components/Shared/ConfirmModal';

interface LinkCardProps {
  release: Release;
  isEditor?: boolean;
}

export default function LinkCard({ release, isEditor }: LinkCardProps) {
  return (
    <div className="flex w-full flex-col gap-8 border border-whiteLight bg-darkColorRelief p-4 md:grid md:grid-cols-[4fr_1.5fr]">
      <div className="flex gap-4">
        <div className="size-full max-w-[13rem]">
          <Image
            src={release.cover}
            width={500}
            height={500}
            alt={release.title}
            priority
          />
        </div>
        <LinkCardInfos release={release} isEditor={isEditor} />
      </div>
      {!isEditor && <ActionButtons release={release} />}
    </div>
  );
}

// Composant local pour les informations de la release
// ===========================================================================================
interface LinkCardInfosProps {
  release: Release;
  isEditor?: boolean;
}
function LinkCardInfos({ release, isEditor }: LinkCardInfosProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="size-6 md:size-9">
            <Image
              className="size-full rounded-full border-2 border-whiteColor"
              src={release.artistImage}
              width={500}
              height={500}
              alt={release.title}
              priority
            />
          </div>
          <p className="text-sm opacity-75">{release.artist}</p>
        </div>
        <p className="text-2xl font-semibold">{release.title}</p>
      </div>
      {!isEditor && (
        <>
          <HorizontalSeparator />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal opacity-75">
              {formatDate(release.creationDate)}
            </p>
            {release.creationDate !== release.lastUpdate && (
              <p className="text-xs font-normal opacity-75">
                {timeAgo(release.lastUpdate)}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Composant local pour les boutons d'action
// ===========================================================================================
interface ActionButtonsProps {
  release: Release;
}

function ActionButtons({ release }: ActionButtonsProps) {
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

  const CTAButtons = [
    { label: 'Edit', onClick: () => navToLinkToEditPage(release.slug) },
    { label: 'Delete link', onClick: deleteLink },
    {
      label: 'Landing page',
      onClick: () => navToReleaseLandingPage(release.slug),
    },
    { label: 'Copy album link', onClick: () => {} },
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
      <ConfirmModal
        topline={`Are you sure you want to delete "${release.title}" ?`}
        message="This will definitely remove this release."
        onConfirm={deleteLink}
        onCancel={() => {}}
        icon="mdi:skull-crossbones"
      />
    </div>
  );
}
