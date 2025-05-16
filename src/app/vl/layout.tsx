'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useAppInitializer from '@/hooks/useAppInitializer';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loading = useAppInitializer();
  return (
    <>
    {loading ? (<p>Loading</p>) : (
      <>
        <Header />
        {children}
        <Footer />
      </>
    )}
    </>
  );
}
