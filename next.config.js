/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // No basePath needed since this is username.github.io
  trailingSlash: true,
}

module.exports = nextConfig