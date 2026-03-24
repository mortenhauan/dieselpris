import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { SITE_URL } from '@/lib/site-url'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Dieselpris.no – aktuelle dieselpriser og avgifter i Norge',
  description:
    'Følg dieselpriser fra ICE-børsen i sanntid. Se hvordan norske avgifter påvirker pumpeprisen, inkludert veibruksavgift, CO2-avgift og mva.',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    siteName: 'Dieselpris.no',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="no">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
