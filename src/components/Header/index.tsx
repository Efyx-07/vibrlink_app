import SiteLogo from './SiteLogo';
import Navigation from '../Navigation';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full justify-center border-b border-whiteLight bg-darkColor">
      <div className="flex w-full max-w-[75rem] items-center justify-between px-4">
        <SiteLogo />
        <Navigation />
      </div>
    </header>
  );
}
