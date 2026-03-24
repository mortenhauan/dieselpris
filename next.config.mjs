/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    dieselPrices: {
      // Idle expire: long enough that a Fri visitor → Mon visitor rarely forces a cold
      // refetch while daily bars barely move over the weekend; weekday cron still warms.
      expire: 96 * 60 * 60,
      revalidate: 30 * 60,
      // Client router: how long navigations can use cached UI without rechecking the server.
      stale: 5 * 60,
    },
  },
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  redirects() {
    return [
      { destination: "/", permanent: true, source: "/national" },
      { destination: "/ost", permanent: true, source: "/oslo-east" },
      { destination: "/sor", permanent: true, source: "/south" },
      { destination: "/ost", permanent: true, source: "/øst" },
      { destination: "/sor", permanent: true, source: "/sør" },
      { destination: "/vest", permanent: true, source: "/west" },
      { destination: "/midt", permanent: true, source: "/trondelag" },
      { destination: "/nord", permanent: true, source: "/north" },
    ];
  },
  serverExternalPackages: ["@mathieuc/tradingview", "ws"],
};

export default nextConfig;
