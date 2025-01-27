import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cms-images.mmst.eu', 'assets.mmsrg.com']
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
