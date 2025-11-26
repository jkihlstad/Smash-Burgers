import Image from "next/image";
import type { Metadata } from "next";
import {
  Lightbulb,
  Store,
  PartyPopper,
  Heart,
  Leaf,
  Handshake,
  BadgeCheck,
  MapPin,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Smash Burgers | Our Story & Values",
  description: "Learn about Smash Burgers' journey from a simple idea to Oregon's favorite burger spot. Discover our commitment to quality, local sourcing, and community.",
  openGraph: {
    title: "About Us - Smash Burgers",
    description: "Learn about our story, values, and commitment to serving the best smash burgers in Oregon.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      {/* Hero Section with Parallax Background */}
      <div className="relative min-h-[50vh] flex items-center justify-center text-center text-white px-6 py-16">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_6429.JPG"
            alt="A juicy, freshly made smash burger with melted cheese and fresh toppings, ready to be served."
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
            The Art of the Smash.
          </h1>
          <p className="max-w-xl text-base md:text-lg font-light text-white/90">
            Crafting Oregon's favorite burgers from the freshest local ingredients.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 md:py-24 px-6 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-6">
            Our <span className="text-primary">Story</span>
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark text-lg md:text-xl font-light leading-relaxed mb-4">
            Welcome to Smash Burgers, where our passion for the perfect burger is smashed into every single patty. It all started with a simple mission: to serve the best smash burgers in Oregon, made with love and the finest local ingredients.
          </p>
          <p className="text-text-muted-light dark:text-text-muted-dark text-lg md:text-xl font-light leading-relaxed">
            We believe in quality you can taste, community you can feel, and a flavor that brings you back.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="px-6 py-16 md:py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-text-light dark:text-text-dark mb-12">
            From a <span className="text-primary">Simple Idea</span> to a Local Favorite
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
            <div className="relative flex flex-col gap-12">
              {/* Timeline Item 1 */}
              <div className="flex items-start gap-6">
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="pt-1.5">
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-1">
                    2018: The Spark
                  </h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                    A dream to create the perfect smash burger using only Oregon's best local produce takes root.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex items-start gap-6">
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
                  <Store className="w-5 h-5" />
                </div>
                <div className="pt-1.5">
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-1">
                    2020: Albany Opens
                  </h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                    Our first location opens its doors, quickly becoming a beloved spot for Albany's burger enthusiasts.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex items-start gap-6">
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
                  <PartyPopper className="w-5 h-5" />
                </div>
                <div className="pt-1.5">
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-1">
                    2022: Welcome, Salem!
                  </h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                    We bring the smash to Salem, expanding our family and sharing our passion with a new community.
                  </p>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex items-start gap-6">
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="pt-1.5">
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-1">
                    Today: More Than a Burger
                  </h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                    We continue to serve up smiles, support local farms, and strive to be your favorite neighborhood burger joint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section with Team Image */}
      <div className="relative bg-surface-light dark:bg-surface-dark py-16 px-6 md:py-24">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <div className="aspect-square w-full rounded-lg overflow-hidden shadow-lg relative">
              <Image
                src="/images/IMG_6433.JPG"
                alt="A team of smiling chefs working in a clean, modern restaurant kitchen."
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
              Our Values
            </h3>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
              Crafted with Care
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark text-lg font-light leading-relaxed mb-6">
              Our team is a family of food lovers dedicated to the art of the burger. We're the friendly faces who greet you, the skilled hands that craft your meal, and the reason every visit feels like coming home. We're committed to three things:
            </p>
            <ul className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <Leaf className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-text-light dark:text-text-dark">
                    Local Sourcing
                  </h4>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Supporting Oregon farms for unbeatable flavor.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Handshake className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-text-light dark:text-text-dark">
                    Community First
                  </h4>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Building a welcoming place for friends and family.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BadgeCheck className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-text-light dark:text-text-dark">
                    Uncompromising Quality
                  </h4>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    From our 100% grass-fed beef to our daily-baked buns.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="px-6 py-16 md:py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-12">
            Come Say Hi!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Albany Location */}
            <div className="flex flex-col gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">
                Albany
              </h3>
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
              <div className="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="flex-1">520 Pacific Blvd SW, Albany, OR 97321</p>
              </div>
              <div className="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="flex-1">Tue - Sun: 11:00 AM - 8:00 PM (Closed Mondays)</p>
              </div>
              <a
                className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
                href="https://www.google.com/maps/search/?api=1&query=520+Pacific+Blvd+SW+Albany+OR+97321"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </div>

            {/* Salem Location */}
            <div className="flex flex-col gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">
                Salem
                <span className="ml-2 text-sm font-normal text-primary">(Coming Soon)</span>
              </h3>
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
              <div className="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="flex-1">Location Coming Soon</p>
              </div>
              <div className="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="flex-1">Opening Soon - Stay Tuned!</p>
              </div>
              <button
                disabled
                className="mt-4 inline-flex items-center justify-center rounded-full bg-gray-400 dark:bg-gray-600 px-6 py-3 text-base font-bold text-gray-200 dark:text-gray-400 cursor-not-allowed opacity-60"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="sticky bottom-0 mt-auto w-full bg-white/90 p-4 backdrop-blur-md dark:bg-background-dark/90 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <a
            className="flex w-full items-center justify-center rounded-full bg-primary px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            href="/menu"
          >
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
}
