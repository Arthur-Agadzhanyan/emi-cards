/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['gateway.pinata.cloud','resizer.atomichub.io','ipfs.atomichub.io'],
  },
}

module.exports = nextConfig
