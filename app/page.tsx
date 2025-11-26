import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MapPin, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <header className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_6429.JPG"
            alt="A delicious looking smash burger with melted cheese and fresh lettuce, alongside a portion of crispy golden fries"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 p-4 flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider">
            Simply Better Burgers
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-white/90">
            Fresh, handcrafted burgers, sandwiches, and fries made daily.
          </p>
          <Link
            href="/menu"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-wide uppercase transition-transform hover:scale-105 active:scale-100"
          >
            <span className="truncate">View Menu &amp; Order</span>
          </Link>
        </div>
      </header>

      {/* Locations & Hours Section */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="bg-dark-surface rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Locations */}
          <div className="flex flex-col items-center text-center gap-4 py-8 md:py-4">
            <MapPin className="text-primary text-4xl" size={40} />
            <h2 className="text-2xl font-bold font-display tracking-wide uppercase">
              Our Locations
            </h2>
            <div className="text-white/60 text-lg space-y-1">
              <p>Albany, Oregon</p>
              <p>Salem, Oregon</p>
            </div>
            <a
              href="/locations"
              className="mt-2 font-semibold text-primary hover:underline"
            >
              Get Directions
            </a>
          </div>

          {/* Operating Hours */}
          <div className="flex flex-col items-center text-center gap-4 py-8 md:py-4">
            <Clock className="text-primary text-4xl" size={40} />
            <h2 className="text-2xl font-bold font-display tracking-wide uppercase">
              Operating Hours
            </h2>
            <div className="text-white/60 text-lg space-y-1">
              <p>Tuesday - Sunday</p>
              <p>11:00 AM - 8:00 PM</p>
            </div>
            <p className="mt-2 text-white/60">(Closed Mondays)</p>
          </div>
        </div>
      </section>

      {/* Famous For Section */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col gap-8 text-center items-center">
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wider max-w-3xl">
            What We're Famous For
          </h2>
          <p className="text-lg text-white/60 max-w-3xl">
            Every meal is crafted with high-quality ingredients and a passion
            for flavor. Discover your new favorite.
          </p>
        </div>

        {/* Grid of Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Smash Burgers */}
          <div className="flex flex-col gap-4 group">
            <div className="w-full overflow-hidden rounded-lg">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/IMG_6422.JPG"
                  alt="Close up of a juicy smash burger with cheese and pickles on a brioche bun"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Smash Burgers</h3>
              <p className="text-white/60 mt-1">
                Perfectly seared patties with a crispy crust, melted cheese, and
                fresh toppings.
              </p>
            </div>
          </div>

          {/* Chicken Sandwiches */}
          <div className="flex flex-col gap-4 group">
            <div className="w-full overflow-hidden rounded-lg">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/IMG_6427.JPG"
                  alt="A crispy fried chicken sandwich with lettuce and sauce on a toasted bun"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Chicken Sandwiches</h3>
              <p className="text-white/60 mt-1">
                Juicy, tender chicken, fried to golden perfection and served on a
                toasted bun.
              </p>
            </div>
          </div>

          {/* Classic Reubens */}
          <div className="flex flex-col gap-4 group">
            <div className="w-full overflow-hidden rounded-lg">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/IMG_6435.JPG"
                  alt="A classic Reuben sandwich sliced in half, showing layers of corned beef, sauerkraut, and Swiss cheese"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Classic Reubens</h3>
              <p className="text-white/60 mt-1">
                A timeless classic with corned beef, Swiss cheese, sauerkraut, and
                Russian dressing.
              </p>
            </div>
          </div>

          {/* Crispy Fries */}
          <div className="flex flex-col gap-4 group">
            <div className="w-full overflow-hidden rounded-lg">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/IMG_6450.JPG"
                  alt="A basket of golden, crispy french fries"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Crispy Fries</h3>
              <p className="text-white/60 mt-1">
                Hand-cut and double-fried for the ultimate crispy texture and
                fluffy inside.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10">
        <div className="container mx-auto px-4 py-16 sm:py-24 text-center flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wider max-w-3xl">
            Ready to Eat?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl">
            Don't wait. Find your nearest Smash Burgers and order now for pickup
            or delivery.
          </p>
          <Link
            href="/menu"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-wide uppercase transition-transform hover:scale-105 active:scale-100"
          >
            <span className="truncate">View Menu &amp; Order</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
