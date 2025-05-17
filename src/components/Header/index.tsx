'use client';

import SiteLogo from './SiteLogo';
import Navigation from './Navigation';
import MyAccountItem from './MyAccountItem';
import MobileMenuIcon from './MobileMenuIcon';
import MobilieMenu from './MobileMenu';
import { useState } from 'react';

export default function Header() {
  // Gestion de l'état d'ouverture du Mobile Menu
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Gestion de l'état d'affichage de MyAccountItem en version mobile
  const [isDisplayed, setIsDisplayed] = useState<boolean>(true);

  // Alterne les états
  const toggleMobileMenu = (): void => {
    setIsOpen((prev) => !prev);
    setIsDisplayed((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full justify-center border-b border-whiteLight bg-darkColor">
      <div className="flex h-full w-full max-w-[75rem] items-center justify-between px-4 md:px-8 2xl:max-w-[90rem]">
        <SiteLogo />
        <div className="hidden md:flex md:h-full md:gap-12">
          <Navigation />
          <MyAccountItem />
        </div>
        <div className="flex h-full gap-10 md:hidden">
          {isDisplayed && <MyAccountItem />}
          <MobileMenuIcon isOpen={isOpen} onClick={toggleMobileMenu} />
        </div>
      </div>
      <MobilieMenu isOpen={isOpen} onCloseMenu={() => setIsOpen(false)} />
    </header>
  );
}
