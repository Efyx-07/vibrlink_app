import type { NextConfig } from 'next';
import { backendUrl } from '@/config';

if (!backendUrl) throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Proxy pour eviter les restrictions CORS du backend avec un autre domaine.
  // !important pour l'utilisation du middleware en prod.
  async rewrites() {
    return [
      {
        source: '/vl/user/:path*',
        destination: `${backendUrl}/user/:path*`,
      },
      {
        source: '/vl/passwordRoute/:path*',
        destination: `${backendUrl}/passwordRoute/:path*`,
      },
      {
        source: '/vl/releasesRoute/:path*',
        destination: `${backendUrl}/releasesRoute/:path*`,
      },
    ];
  },
};

export default nextConfig;
