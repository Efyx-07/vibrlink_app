import { siteName } from '@/config';

export default function SiteLogo() {
  return (
    <h1 className="text-[2rem] font-bold text-accentColor">
      {siteName}
    </h1>
  );
}
