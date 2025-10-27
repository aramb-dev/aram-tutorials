import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trae-api-us.mchost.guru',
        port: '',
        pathname: '/api/ide/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack requires serializable loader options, so we reference plugins by module path
    remarkPlugins: ['remark-gfm'] as any,
    rehypePlugins: [
      'rehype-highlight',
      // Temporarily disable these to avoid conflicts with MDXRemote
      // 'rehype-slug',
      // [
      //   'rehype-autolink-headings',
      //   {
      //     behavior: 'wrap',
      //     properties: {
      //       className: ['anchor'],
      //     },
      //   },
      // ],
    ] as any,
  },
});

export default withMDX(nextConfig);
