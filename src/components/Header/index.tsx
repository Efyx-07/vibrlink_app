import SiteLogo from './SiteLogo';
import Navigation from '../Navigation';
import MyAccountItem from './MyAccountItem';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full justify-center border-b border-whiteLight bg-darkColor">
      <div className="h-full flex w-full max-w-[90rem] items-center justify-between px-4">
        <SiteLogo />
        <div className='h-full flex gap-8'>
          <Navigation />
          <MyAccountItem />
        </div>
      </div>
    </header>
  );
}
