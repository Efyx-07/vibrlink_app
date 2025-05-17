import Navigation from '../Navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onCloseMenu: () => void;
}

export default function MobilieMenu({ isOpen, onCloseMenu }: MobileMenuProps) {
  return (
    <div
      className={`fixed top-20 flex h-[calc(100dvh-5rem)] w-full transform items-center bg-darkColorRelief transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} p-8 md:hidden`}
    >
      <Navigation onCloseMenu={onCloseMenu} />
    </div>
  );
}
