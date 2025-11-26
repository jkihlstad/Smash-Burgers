import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Locations - Smash Burgers | Albany & Salem, Oregon',
  description: 'Find Smash Burgers locations in Albany and Salem, Oregon. Get directions, hours, and contact information for both our restaurants.',
  openGraph: {
    title: 'Our Locations - Smash Burgers',
    description: 'Visit us at either of our Oregon locations in Albany or Salem.',
    type: 'website',
  },
}

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
