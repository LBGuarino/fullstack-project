import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cms-images.mmst.eu', 'assets.mmsrg.com']
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fullstack-project-back-mtag.onrender.com/api/:path*'
      },
      {
        source: "/users/:path*",
        destination: "https://fullstack-project-back-mtag.onrender.com/users/:path*"
      },
      // Nueva regla para categorías
      {
        source: "/products/:path*",
        destination: "https://fullstack-project-back-mtag.onrender.com/products/:path*"
      }
    ]
  }
};

export default nextConfig;
