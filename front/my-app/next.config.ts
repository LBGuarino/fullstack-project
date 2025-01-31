import type { NextConfig } from "next";

const BACKEND_URL = 'https://fullstack-project-back-mtag.onrender.com';
const IMAGE_DOMAINS = ['cms-images.mmst.eu', 'assets.mmsrg.com'];

const nextConfig: NextConfig = {
  images: {
    domains: IMAGE_DOMAINS,
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

// Configuración de debug solo en desarrollo
if (process.env.NODE_ENV === 'development') {
  nextConfig.rewrites = async () => {
    const originalRewrites = await (nextConfig.rewrites?.() || []);
    console.log('Configured API Rewrites:', originalRewrites);
    return originalRewrites;
  };
}

export default nextConfig;