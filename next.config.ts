import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Set NEXT_PUBLIC_BASE_PATH=/preview to build a copy that can be served from a subfolder.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: {
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
