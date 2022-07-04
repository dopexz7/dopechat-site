/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
      "cdn.frankerfacez.com",
      "cdn.7tv.app",
      "static-cdn.jtvnw.net",
      "emxllayyisdskjtscvck.supabase.co",
      "cdn-test.frankerfacez.com",
    ],
  },
};

module.exports = nextConfig;
