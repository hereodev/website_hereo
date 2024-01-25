/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imgix.com',
                port: '',
                // pathname: '/account123/**',
            },
            {
                protocol: 'https',
                hostname: 'hereotherwise.b-cdn.net',
                port: '',
                // pathname: '/hereotherwise/**',
            },
        ],
    },
};

export default nextConfig;
