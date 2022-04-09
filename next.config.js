/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //assetPrefix: "./",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "i.imgur.com",
      "imgur.com",
      "streamerfacts.com",
      "cdn.discordapp.com",
      "cdn.betterttv.net",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
