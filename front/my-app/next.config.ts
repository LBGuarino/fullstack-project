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
    minimumCacheTTL: 86400, // 24 horas
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      // Auth endpoints
      {
        source: '/api/auth/:path*',
        destination: `${BACKEND_URL}/users/:path*`
      },
      // Users management
      {
        source: '/api/users/:path*',
        destination: `${BACKEND_URL}/users/:path*`
      },
      // Products routes
      {
        source: '/api/products/:path*',
        destination: `${BACKEND_URL}/products/:path*`
      },
      // Orders management
      {
        source: '/api/orders/:path*',
        destination: `${BACKEND_URL}/orders/:path*`
      },
      // Payment processing
      {
        source: '/api/payment/:path*',
        destination: `${BACKEND_URL}/payment/:path*`
      },
      // Redirect legacy auth endpoints
      {
        source: '/api/:action(login|logout|register|session)',
        destination: `${BACKEND_URL}/users/:action`
      },
      // Catch-all para otras rutas de API
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/:path*`
      }
    ];
  },
  async headers() {
    return [
      {
        source: 'api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.thescentedshop.blog' 
          },
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