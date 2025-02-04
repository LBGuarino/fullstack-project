import type { NextConfig } from "next";
import { ImageConfig } from "next/dist/shared/lib/image-config";

const BACKEND_URL = 'https://fullstack-project-back-mtag.onrender.com';
const RemotePatterns: ImageConfig['remotePatterns'] = [
  {
    protocol: 'https',
    hostname: 'cms-images.mmst.eu',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'assets.mmsrg.com',
    port: '',
    pathname: '/**',
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: RemotePatterns,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${BACKEND_URL}/users/:path*`
      },
      {
        source: '/api/users/:path*',
        destination: `${BACKEND_URL}/users/:path*`
      },
      {
        source: '/api/products/:path*',
        destination: `${BACKEND_URL}/products/:path*`
      },
      {
        source: '/api/orders/:path*',
        destination: `${BACKEND_URL}/orders/:path*`
      },
      {
        source: '/api/payment/:path*',
        destination: `${BACKEND_URL}/payment/:path*`
      },
      {
        source: '/api/:action(login|logout|register|session)',
        destination: `${BACKEND_URL}/users/:action`
      },
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/:path*`
      },
      {
        source: '/api/users/cart/:productId',
        destination: `${BACKEND_URL}/users/cart/:productId`
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};

export default nextConfig;