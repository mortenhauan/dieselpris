/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["@mathieuc/tradingview", "ws"],
  cacheComponents: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [{ source: "/national", destination: "/", permanent: true }];
  },
}

export default nextConfig
