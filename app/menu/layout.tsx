import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu - Smash Burgers | Burgers, Chicken & More',
  description: 'Explore our menu featuring smash burgers, crispy chicken sandwiches, classic Reubens, and hand-cut fries. Fresh, quality ingredients in every bite.',
  openGraph: {
    title: 'Our Menu - Smash Burgers',
    description: 'Browse our full menu of delicious smash burgers, sandwiches, and sides.',
    type: 'website',
  },
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
