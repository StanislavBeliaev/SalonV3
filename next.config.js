/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://test3.salon.balinasoft.com/api/v1/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test3.salon.balinasoft.com',
      },
    ],
  },
}

module.exports = nextConfig;