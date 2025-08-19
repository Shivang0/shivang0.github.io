import { NextSeoProps } from 'next-seo'

const defaultSEO: NextSeoProps = {
  titleTemplate: '%s | Security Platform',
  defaultTitle: 'Security Platform - AI Security & Vulnerability Research',
  description: 'Leading AI security platform providing vulnerability bounties, automated scanning, threat intelligence, and red team assessments.',
  canonical: 'https://security-platform.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://security-platform.com',
    siteName: 'Security Platform',
    title: 'Security Platform - AI Security & Vulnerability Research',
    description: 'Leading AI security platform providing vulnerability bounties, automated scanning, threat intelligence, and red team assessments.',
    images: [
      {
        url: 'https://security-platform.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Security Platform',
      },
    ],
  },
  twitter: {
    handle: '@securityplatform',
    site: '@securityplatform',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#0f1115',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
}

export const pageSEO = {
  home: {
    title: 'Home',
    description: 'Leading AI security platform providing vulnerability bounties, automated scanning, threat intelligence, and red team assessments.',
  },
  products: {
    title: 'Products',
    description: 'Comprehensive security solutions including vulnerability bounties, automated scanning, threat intelligence, and red team services.',
  },
  research: {
    title: 'Research',
    description: 'Latest AI security research, vulnerability disclosures, and threat intelligence reports.',
  },
  blog: {
    title: 'Blog',
    description: 'Security insights, industry updates, and technical deep-dives from our research team.',
  },
  disclosures: {
    title: 'Vulnerability Disclosures',
    description: 'Responsible disclosure program and vulnerability reports.',
  },
  demo: {
    title: 'Request a Demo',
    description: 'Schedule a personalized demo of our security platform.',
  },
}

export default defaultSEO