import type { NextConfig } from 'next';

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
        source: '/vl/user/:path*', 
        destination: 'https://vibrlinks-backend.vercel.app/user/:path*',
      },
      {
        source: '/vl/password/:path*',
        destination: 'https://vibrlinks-backend.vercel.app/passwordRoute/:path*',
      },
      {
        source: '/vl/releases/:path*',
        destination: 'https://vibrlinks-backend.vercel.app/releasesRoute/:path*',
      },
    ];
  },
};

export default nextConfig;
