/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //assetPrefix: "./",
  images: {
    domains: ["i.imgur.com", "imgur.com", "streamerfacts.com"],
  },
};

module.exports = nextConfig;
