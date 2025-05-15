import { siteName, currentYear } from '@/config';

export default function Footer() {
  return (
    <footer className="flex h-20 w-full items-center justify-center border-t border-whiteLight bg-darkColor">
      <p className="font-light">
        ©{currentYear} - {siteName}
      </p>
    </footer>
  );
}
