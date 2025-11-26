import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Smash Burgers | Get in Touch',
  description: 'Contact Smash Burgers at our Albany or Salem locations. Send us a message, find directions, or give us a call. We\'d love to hear from you!',
  openGraph: {
    title: 'Contact Us - Smash Burgers',
    description: 'Get in touch with Smash Burgers. Visit us in Albany or Salem, Oregon.',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
