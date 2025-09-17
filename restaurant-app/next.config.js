/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // GitHub Pages에서는 필요
  },
};

module.exports = nextConfig;
