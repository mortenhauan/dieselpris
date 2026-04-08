import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { websiteJsonLd } from "@/lib/site-structured-data";
import { SITE_URL } from "@/lib/site-url";
import { X_SITE_HANDLE } from "@/lib/social-profiles";

import "./globals.css";

const ADSENSE_CLIENT_ID = "ca-pub-9912628280603975";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  description: "Forstå bedre råvarepriser og avgifter på diesel i Norge.",
  icons: {
    apple: "/apple-icon.png",
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon-light-32x32.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon-dark-32x32.png",
      },
      {
        type: "image/svg+xml",
        url: "/logo.svg",
      },
    ],
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    locale: "nb_NO",
    siteName: "Dieselpris.no",
    type: "website",
    url: SITE_URL,
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
  robots: {
    follow: true,
    index: true,
  },
  title:
    "Dieselpris.no – forstå bedre råvarepriser og avgifter på diesel i Norge",
  twitter: {
    card: "summary_large_image",
    site: X_SITE_HANDLE,
  },
};

const RootLayout = function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={`${inter.variable} font-sans antialiased`}>
        <JsonLd data={websiteJsonLd()} />
        {children}
        <Footer />
        <Script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="afterInteractive"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};
export default RootLayout;
