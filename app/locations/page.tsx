import { MapPin, Clock, Phone } from "lucide-react";
import Image from "next/image";

export default function LocationsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-dark-bg">
      {/* Hero Section */}
      <div className="relative flex min-h-[50vh] items-center justify-center px-6 py-16 text-center text-white">
        <div className="absolute inset-0 z-10 bg-black/60"></div>
        <div className="absolute inset-0 bg-cover bg-center">
          <Image
            src="/images/IMG_6429.JPG"
            alt="Smash Burgers restaurant locations in Oregon"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 flex flex-col items-center">
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            Our Locations
          </h1>
          <p className="max-w-xl text-base font-light text-white/90 md:text-lg">
            Visit us at either of our Oregon locations for the best smash
            burgers in the state.
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Albany Location */}
            <div className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-glass-border bg-glass-clear p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              {/* Specular Highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />

              {/* Magma Glow on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

              {/* Noise Texture */}
              <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

              <div className="relative z-10">
                <h3 className="mb-4 font-display text-2xl font-bold text-white">
                  Albany
                </h3>
                <div className="mb-4 border-t border-white/10"></div>

                <div className="mb-4 flex items-start gap-3 text-white/80">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <p className="flex-1">123 Burger Lane, Albany, OR 97321</p>
                </div>

                <div className="mb-4 flex items-start gap-3 text-white/80">
                  <Clock className="mt-1 h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold text-white">Tuesday - Sunday</p>
                    <p>11:00 AM - 8:00 PM</p>
                    <p className="mt-1 text-sm text-white/60">(Closed Mondays)</p>
                  </div>
                </div>

                <div className="mb-6 flex items-start gap-3 text-white/80">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <a
                    href="tel:+15415550123"
                    className="flex-1 transition-colors hover:text-primary"
                  >
                    (541) 555-0123
                  </a>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Salem Location */}
            <div className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-glass-border bg-glass-clear p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              {/* Specular Highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />

              {/* Magma Glow on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

              {/* Noise Texture */}
              <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

              <div className="relative z-10">
                <h3 className="mb-4 font-display text-2xl font-bold text-white">
                  Salem
                </h3>
                <div className="mb-4 border-t border-white/10"></div>

                <div className="mb-4 flex items-start gap-3 text-white/80">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <p className="flex-1">456 Patty Place, Salem, OR 97301</p>
                </div>

                <div className="mb-4 flex items-start gap-3 text-white/80">
                  <Clock className="mt-1 h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold text-white">Tuesday - Sunday</p>
                    <p>11:00 AM - 8:00 PM</p>
                    <p className="mt-1 text-sm text-white/60">(Closed Mondays)</p>
                  </div>
                </div>

                <div className="mb-6 flex items-start gap-3 text-white/80">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <a
                    href="tel:+15035550456"
                    className="flex-1 transition-colors hover:text-primary"
                  >
                    (503) 555-0456
                  </a>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary/5">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
          <h2 className="max-w-3xl font-display text-4xl uppercase tracking-wider md:text-5xl">
            Ready to Visit?
          </h2>
          <p className="max-w-2xl text-lg text-white/80">
            Stop by either location today and taste the difference that fresh,
            quality ingredients make.
          </p>
          <a
            href="/menu"
            className="inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 text-lg font-bold uppercase leading-normal tracking-wide text-white transition-transform hover:scale-105 active:scale-100"
          >
            View Menu
          </a>
        </div>
      </div>
    </div>
  );
}
