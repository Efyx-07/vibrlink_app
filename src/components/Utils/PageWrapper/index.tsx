'use client';

import { ReactNode } from 'react';
import { WithPageLoader } from '../WithPageLoader';
import { motion } from 'motion/react';

interface PageWrapperProps {
  children: ReactNode;
  isJustifyStart?: boolean;
  isScrollingInside?: boolean;
}

// Wrapper pour les pages du dashboard nécessitant un style commun
// WithPageLoader intègre un loader de transition
// Motion gère l'animation au rendu de la page
// ===========================================================================================
export default function PageWrapper({
  children,
  isJustifyStart,
  isScrollingInside,
}: PageWrapperProps) {
  return (
    <WithPageLoader>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`flex size-full min-h-screen-minus-10 flex-col items-center ${isJustifyStart ? 'justify-start' : 'justify-center'}`}
      >
        <div
          className={`${isScrollingInside ? 'lg:py-0' : ''} flex size-full max-w-[75rem] flex-col items-center justify-center px-4 py-16 lg:px-8 2xl:max-w-[90rem]`}
        >
          {children}
        </div>
      </motion.div>
    </WithPageLoader>
  );
}
