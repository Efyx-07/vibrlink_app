'use client';

import { siteName } from '@/config';
import { useRouter } from 'next/navigation';

export default function SiteLogo() {
  const router = useRouter();

  return (
    <h1
      className="text-[2rem] font-bold text-accentColor cursor-pointer"
      onClick={() => router.push('/vl/home')}
    >
      {siteName}
    </h1>
  );
}
