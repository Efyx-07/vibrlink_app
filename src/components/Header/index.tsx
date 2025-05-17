import SiteLogo from './SiteLogo';
import Navigation from '../Navigation';
import MyAccountItem from './MyAccountItem';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full justify-center border-b border-whiteLight bg-darkColor">
      <div className="flex h-full w-full max-w-[75rem] items-center justify-between px-4 md:px-8 2xl:max-w-[90rem]">
        <SiteLogo />
        <div className="flex h-full gap-12">
          <Navigation />
          <MyAccountItem />
        </div>
      </div>
    </header>
  );
}
