import type { NextConfig } from 'next';
import { backendUrl } from '@/constant';

if (!backendUrl) throw new Error('BACKEND_URL is not defined');

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

  // Proxy pour eviter les restrictions CORS du backend(qui n'est pas sur le même domaine).
  // !important pour l'utilisation du middleware en prod.
  async rewrites() {
    return [
      {
        source: '/vl/users/:path*',
        destination: `${backendUrl}/users/:path*`,
      },
      {
        source: '/vl/password/:path*',
        destination: `${backendUrl}/password/:path*`,
      },
      {
        source: '/vl/releases/:path*',
        destination: `${backendUrl}/releases/:path*`,
      },
    ];
  },
};

export default nextConfig;
