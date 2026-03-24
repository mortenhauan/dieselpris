/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["@mathieuc/tradingview", "ws"],
  cacheComponents: true,
  cacheLife: {
    dieselPrices: {
      // Client router: how long navigations can use cached UI without rechecking the server.
      stale: 5 * 60,
      revalidate: 30 * 60,
      // Idle expire: long enough that a Fri visitor → Mon visitor rarely forces a cold
      // refetch while daily bars barely move over the weekend; weekday cron still warms.
      expire: 96 * 60 * 60,
    },
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [{ source: "/national", destination: "/", permanent: true }];
  },
}

export default nextConfig
