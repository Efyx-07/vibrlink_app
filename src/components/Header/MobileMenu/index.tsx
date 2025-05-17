interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobilieMenu({ isOpen }: MobileMenuProps) {
  return (
    <div className="fixed top-20 h-[calc(100dvh-5rem)] w-full bg-darkColorRelief">
      <h1>Mobile menu</h1>
    </div>
  );
}
