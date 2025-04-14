import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        optimizePackageImports: ['@chakra-ui/react'],
    },
    sassOptions: {
        additionalData: '$var: red;',
    },
    reactStrictMode: false,
};

export default nextConfig;
