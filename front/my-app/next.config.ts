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
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://thescentedshop.blog" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization" }
        ]
      }
    ];
  }
};

export default nextConfig;
