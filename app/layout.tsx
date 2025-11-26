import type { Metadata } from 'next'
import { Anton, Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Smash Burgers - Simply Better Burgers',
    template: '%s | Smash Burgers',
  },
  description: 'Fresh, handcrafted burgers, sandwiches, and fries made daily in Albany and Salem, Oregon. Experience the perfect smash burger with quality ingredients.',
  keywords: ['smash burgers', 'burgers', 'Albany Oregon', 'Salem Oregon', 'chicken sandwiches', 'Reubens', 'restaurant', 'fresh food'],
  authors: [{ name: 'Smash Burgers' }],
  openGraph: {
    title: 'Smash Burgers - Simply Better Burgers',
    description: 'Fresh, handcrafted burgers, sandwiches, and fries made daily in Albany and Salem, Oregon.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Smash Burgers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smash Burgers - Simply Better Burgers',
    description: 'Fresh, handcrafted burgers, sandwiches, and fries made daily in Albany and Salem, Oregon.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${jakarta.variable}`}>
      <body className="bg-dark-bg text-white font-body antialiased">
        {/* Noise Overlay */}
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none z-50" />
        {children}
      </body>
    </html>
  )
}
