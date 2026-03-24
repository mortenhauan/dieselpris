/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@mathieuc/tradingview", "ws"],
  cacheComponents: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
