import { ReactNode } from 'react';
import { WithPageLoader } from '../WithPageLoader';

interface PageWrapperProps {
  children: ReactNode;
  isJustifyStart?: boolean;
}

// Wrapper pour les pages du dashboard nécessitant un style commun inclut un loader de transition
// ===========================================================================================
export default function PageWrapper({
  children,
  isJustifyStart,
}: PageWrapperProps) {
  return (
    <WithPageLoader>
      <div
        className={`flex h-full min-h-[calc(100dvh-10rem)] w-full flex-col items-center ${isJustifyStart ? 'justify-start' : 'justify-center'}`}
      >
        <div className="flex h-full w-full max-w-[75rem] flex-col items-center justify-center px-4 py-16 md:px-8 2xl:max-w-[90rem]">
          {children}
        </div>
      </div>
    </WithPageLoader>
  );
}
