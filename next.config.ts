import type { NextConfig } from 'next';
import { apiUrl, backendUrl } from '@/config';

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

  async rewrites() {
    return [
      {
        source: `/${apiUrl}/user/:path*`,
        destination: `${backendUrl}/user/:path*`,
      },
      {
        source: `/${apiUrl}/passwordRoute/:path*`,
        destination: `${backendUrl}/passwordRoute/:path*`,
      },
      {
        source: `/${apiUrl}/releasesRoute/:path*`,
        destination: `${backendUrl}/releasesRoute/:path*`,
      },
    ];
  },
};

export default nextConfig;
