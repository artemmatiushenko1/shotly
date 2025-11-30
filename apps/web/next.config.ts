import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./app/_i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@shotly/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
    viewTransition: true,
  },
};

export default withNextIntl(nextConfig);
