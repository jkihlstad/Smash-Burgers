"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  href: string;
}

interface CategoryNavProps {
  categories: Category[];
  className?: string;
}

export const CategoryNav = ({ categories, className }: CategoryNavProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map((cat) => {
        const element = document.getElementById(cat.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: cat.id,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      }).filter(Boolean);

      // Find the section that's currently in view
      const current = sections.find(
        (section) => section && section.top <= 200 && section.bottom >= 200
      );

      if (current) {
        setActiveCategory(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveCategory(id);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140; // Offset for sticky headers
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-[72px] z-40 pt-3 pb-3",
        "bg-dark-bg/80 backdrop-blur-md",
        "border-b border-glass-border",
        className
      )}
    >
      <div className="flex gap-2.5 px-4 overflow-x-auto whitespace-nowrap no-scrollbar">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <motion.a
              key={category.id}
              href={category.href}
              onClick={(e) => handleClick(e, category.href, category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4",
                "border-2 transition-all duration-300",
                "relative overflow-hidden",
                isActive
                  ? "bg-primary border-primary text-white"
                  : "bg-glass-clear backdrop-blur-md border-glass-border text-white/70 hover:border-primary/50 hover:text-white"
              )}
            >
              {/* Glow effect for active category */}
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary/20 blur-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <p className="relative z-10 text-sm font-bold leading-normal">
                {category.label}
              </p>
            </motion.a>
          );
        })}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};
