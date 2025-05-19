import { Release } from '@/interfaces/release.interface';
import { openInANewTab } from '@/utils/openInANewTab';
import { useRouter } from 'next/navigation';
import { deleteLinkByReleaseId } from '@/services/release.service';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Separator from '@/components/Shared/Separator';
import Button from '@/components/Shared/Button';

interface LinkCardProps {
  release: Release;
}

export default function LinkCard({ release }: LinkCardProps) {
  return (
    <div className="grid w-full grid-cols-[4fr_1.5fr] gap-8 border border-whiteLight bg-darkColorRelief p-4">
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
        <LinkCardInfos release={release} />
      </div>
      <ActionButtons release={release} />
    </div>
  );
}

// Composant local pour les informations de la release
// ===========================================================================================
interface LinkCardInfosProps {
  release: Release;
}
function LinkCardInfos({ release }: LinkCardInfosProps) {
  return (
    <div className="w-full">
      <div>
        <div className="flex items-center gap-2">
          <div className="size-full max-w-9">
            <Image
              src={release.artistImage}
              width={500}
              height={500}
              alt={release.title}
              priority
            />
          </div>
          <p>{release.artist}</p>
        </div>
        <p>{release.title}</p>
      </div>
      <Separator />
      <p>Creation date</p>
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
    </div>
  );
}
