import AppInitializer from '@/components/Hoc/AppInitializer';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppInitializer>
        <Header />
        {children}
        <Footer />
      </AppInitializer>
    </>
  );
}
