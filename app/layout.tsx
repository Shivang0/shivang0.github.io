import type { Metadata } from 'next'
import { Inter, Sora, IBM_Plex_Mono } from 'next/font/google'
import { DefaultSeo } from 'next-seo'
import defaultSEO from '@/lib/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Security Platform - AI Security & Vulnerability Research',
    template: '%s | Security Platform',
  },
  description: 'Leading AI security platform providing vulnerability bounties, automated scanning, threat intelligence, and red team assessments.',
  keywords: ['security', 'AI security', 'vulnerability research', 'bug bounty', 'threat intelligence'],
  authors: [{ name: 'Security Platform Team' }],
  creator: 'Security Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://security-platform.com',
    siteName: 'Security Platform',
    images: [
      {
        url: 'https://security-platform.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@securityplatform',
    creator: '@securityplatform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: '#0f1115',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${ibmPlexMono.variable}`}>
      <body className="font-body bg-background text-text antialiased">
        {children}
      </body>
    </html>
  )
}