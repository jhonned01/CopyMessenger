/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
  },
};
