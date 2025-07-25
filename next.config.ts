import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: false,
  },
  images: {
    domains: [
      'localhost',
      'auroreecommerce.duckdns.org',
      '54.206.66.100',
      'aurore-theta.vercel.app',
      'cdn-domain.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
