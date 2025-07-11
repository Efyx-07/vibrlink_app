import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProviders from '@/components/Utils/ReactQueryProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VibrLink | Fanlink generator',
  description: 'Fanlink generator',
};

// Layout global de l'app
// ===========================================================================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/ico" href="/vibrlink-favicon.ico" />
      </head>
      <body className={inter.className}>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}
