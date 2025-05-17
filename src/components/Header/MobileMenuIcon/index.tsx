import { Icon } from '@iconify/react';

export default function MobileMenuIcon() {
  return (
    <div className="flex h-full items-center">
      <Icon
        icon="material-symbols:menu"
        className="cursor-pointer text-2xl hover:text-accentColor"
      />
    </div>
  );
}
