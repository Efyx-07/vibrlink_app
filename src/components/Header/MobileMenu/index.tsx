interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobilieMenu({ isOpen }: MobileMenuProps) {
  return (
    <div
      className={`fixed top-20 flex h-[calc(100dvh-5rem)] w-full transform items-center bg-darkColorRelief transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
    >
      <h1>Mobile menu</h1>
    </div>
  );
}
