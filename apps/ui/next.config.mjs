import { withContentCollections } from "@content-collections/next";

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

export default withContentCollections(nextConfig);
