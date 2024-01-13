/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    domains: [
      "img.clerk.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "files.edgestore.dev",
    ],
  },
};

module.exports = nextConfig;
