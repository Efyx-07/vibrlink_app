import { ReactNode } from 'react';
import { WithPageLoader } from '../WithPageLoader';

interface PageWrapperProps {
  children: ReactNode;
  isJustifyStart?: boolean;
  isScrollingInside?: boolean;
}

// Wrapper pour les pages du dashboard nécessitant un style commun inclut un loader de transition
// ===========================================================================================
export default function PageWrapper({
  children,
  isJustifyStart,
  isScrollingInside,
}: PageWrapperProps) {
  return (
    <WithPageLoader>
      <div
        className={`flex size-full min-h-screen-minus-10 flex-col items-center ${isJustifyStart ? 'justify-start' : 'justify-center'}`}
      >
        <div
          className={`${isScrollingInside ? 'lg:py-0' : ''} flex size-full max-w-[75rem] flex-col items-center justify-center px-4 py-16 lg:px-8 2xl:max-w-[90rem]`}
        >
          {children}
        </div>
      </div>
    </WithPageLoader>
  );
}
