/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  images: {
    domains: ["img.clerk.com"],
  },
};

module.exports = nextConfig;
