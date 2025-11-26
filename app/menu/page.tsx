import { MapPin, UtensilsCrossed } from "lucide-react";
import { MenuItemCard } from "@/components/features/MenuItemCard";
import { CategoryNav } from "@/components/features/CategoryNav";
import { getMenuData, formatPrice } from "@/lib/menu-data";

// Load menu data from JSON file
const menuData = getMenuData();

const categories = [
  { id: "smash-burgers", label: "Burgers", href: "#smash-burgers" },
  { id: "chicken-sandwiches", label: "Chicken", href: "#chicken-sandwiches" },
  { id: "reubens", label: "Reubens", href: "#reubens" },
  { id: "fries-sides", label: "Sides", href: "#fries-sides" },
];

export default function MenuPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-dark-bg">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-glass-border bg-dark-bg/80 backdrop-blur-md p-4 pb-2">
        <div className="flex size-12 shrink-0 items-center justify-center text-primary">
          <UtensilsCrossed className="h-10 w-10" strokeWidth={2} />
        </div>

        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">
          Our Menu
        </h1>

        <div className="flex w-auto items-center justify-end gap-1.5 pr-2">
          <MapPin className="h-4 w-4 text-white/40" />
          <p className="shrink-0 text-base font-bold leading-normal tracking-[0.015em] text-white/40">
            Albany, OR
          </p>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNav categories={categories} />

      {/* Main Content */}
      <main className="flex-grow px-4">
        {/* Smash Burgers Section */}
        <section className="pt-6" id="smash-burgers">
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.015em] text-primary">
            Smash Burgers
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {menuData.burgers.map((item) => (
              <MenuItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={formatPrice(item.price)}
                image={item.imagePath}
              />
            ))}
          </div>
        </section>

        {/* Chicken Sandwiches Section */}
        <section className="pt-8" id="chicken-sandwiches">
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.015em] text-primary">
            Chicken Sandwiches
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {menuData.chicken.map((item) => (
              <MenuItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={formatPrice(item.price)}
                image={item.imagePath}
              />
            ))}
          </div>
        </section>

        {/* Reubens Section */}
        <section className="pt-8" id="reubens">
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.015em] text-primary">
            Reubens
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {menuData.reubens.map((item) => (
              <MenuItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={formatPrice(item.price)}
                image={item.imagePath}
              />
            ))}
          </div>
        </section>

        {/* Fries & Sides Section */}
        <section className="pb-8 pt-8" id="fries-sides">
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.015em] text-primary">
            Fries &amp; Sides
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {menuData.sides.map((item) => (
              <MenuItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={formatPrice(item.price)}
                image={item.imagePath}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 bg-dark-surface py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white/40">
            © 2024 Smash Burgers. All Rights Reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a
              className="text-sm text-white/60 transition-colors hover:text-primary"
              href="/locations"
            >
              Locations
            </a>
            <a
              className="text-sm text-white/60 transition-colors hover:text-primary"
              href="/about"
            >
              About Us
            </a>
            <a
              className="text-sm text-white/60 transition-colors hover:text-primary"
              href="/contact"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
