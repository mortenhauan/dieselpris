import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/site-url";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  description:
    "ICE-basert råvarepris oppdatert jevnlig (ikke sanntid). Veiledende modell av avgifter og pumpepris — ikke kjøpspris eller prisgaranti.",
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
  title: "Dieselpris.no – veiledende dieselpriser og avgifter i Norge",
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
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
};
export default RootLayout;
