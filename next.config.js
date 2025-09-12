/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'salonpro.online',
          port: '',
          pathname: '/images/**',
        },
      ],
    },
  }
module.exports = nextConfig;
