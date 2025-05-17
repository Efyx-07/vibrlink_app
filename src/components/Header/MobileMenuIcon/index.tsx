import { Icon } from '@iconify/react';

interface MobileMenuIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileMenuIcon({
  isOpen,
  onClick,
}: MobileMenuIconProps) {
  return (
    <div className="flex h-full items-center">
      <Icon
        icon={`${isOpen ? 'material-symbols:close' : 'material-symbols:menu'}`}
        className="cursor-pointer text-2xl hover:text-accentColor"
        onClick={onClick}
      />
    </div>
  );
}
