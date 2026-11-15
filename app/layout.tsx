import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { NATIONAL_SITE_SUMMARY_DESCRIPTION } from "@/lib/site-seo-copy";
import { websiteJsonLd } from "@/lib/site-structured-data";
import { SITE_URL } from "@/lib/site-url";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  description: NATIONAL_SITE_SUMMARY_DESCRIPTION,
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
    description: NATIONAL_SITE_SUMMARY_DESCRIPTION,
    locale: "nb_NO",
    siteName: "Dieselpris.no",
    type: "website",
    url: SITE_URL,
  },
  robots: {
    follow: true,
    index: true,
  },
  title:
    "Dieselpris.no – forstå bedre råvarepriser og avgifter på diesel i Norge",
  twitter: {
    card: "summary_large_image",
    description: NATIONAL_SITE_SUMMARY_DESCRIPTION,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="no">
    <body className={`${inter.variable} font-sans antialiased`}>
      <JsonLd data={websiteJsonLd()} />
      {children}
      <Footer />
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);
export default RootLayout;
