import SiteLogo from '../SiteLogo';

export default function Header() {
  return (
    <header className="sticky top-0 flex h-20 w-full justify-center border-b border-whiteLight">
      <div className="flex w-full max-w-[90rem] items-center justify-between px-4">
        <SiteLogo />
      </div>
    </header>
  );
}
