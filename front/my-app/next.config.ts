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
        destination: 'https://fullstack-project-back-mtag.onrender.com/:path*'
      },
      {
        source: "/users/:path*",
        destination: "https://fullstack-project-back-mtag.onrender.com/users/:path*"
      }
    ]
  },
};

export default nextConfig;
