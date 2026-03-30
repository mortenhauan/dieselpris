import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { websiteJsonLd } from "@/lib/site-structured-data";
import { SITE_URL } from "@/lib/site-url";

import "./globals.css";

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
        url: "/icon.svg",
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
  robots: {
    follow: true,
    index: true,
  },
  title:
    "Dieselpris.no – forstå bedre råvarepriser og avgifter på diesel i Norge",
  twitter: {
    card: "summary_large_image",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};
export default RootLayout;
