import SiteLogo from '../SiteLogo';

export default function Header() {
  return (
    <div className="sticky top-0 flex h-20 w-full justify-center border-b">
      <div className='w-full max-w-[90rem] flex items-center justify-between px-4'>
        <SiteLogo />
      </div>
    </div>
  );
}
