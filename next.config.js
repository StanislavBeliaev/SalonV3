/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL_RELEASE || 'https://salonpro.online/api/v1'
      : process.env.NEXT_PUBLIC_BASE_URL_TEST || 'https://test3.salon.balinasoft.com/api/v1';
    return [
      {
        source: '/api/:path*',
        destination: `${baseUrl}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test3.salon.balinasoft.com',
      },
      {
        protocol: 'https',
        hostname: 'salonpro.online',
      },
    ],
  },
}

module.exports = nextConfig;