import { withContentCollections } from "@content-collections/next";
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone',
    // distDir: '.next',
    experimental: {
        optimizePackageImports: ['@content-collections/next', '@content-collections/cli', '@content-collections/core', '@content-collections/mdx'],
    },
    // webpackMemoryOptimizations: true,
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

const withBundleAnalyzerConfig = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default withContentCollections(withBundleAnalyzerConfig(nextConfig));
