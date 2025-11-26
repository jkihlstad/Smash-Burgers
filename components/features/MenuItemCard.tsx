"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MenuItemCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  className?: string;
}

export const MenuItemCard = ({
  name,
  description,
  price,
  image,
  className,
}: MenuItemCardProps) => {
  const handleAddToCart = () => {
    console.log(`Add ${name} to cart`);
    // TODO: Implement cart functionality
  };
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        "flex items-center gap-4 rounded-lg p-3 shadow-sm transition-shadow duration-300 group",
        "bg-glass-clear backdrop-blur-xl backdrop-saturate-150",
        "border border-glass-border",
        "hover:shadow-lg hover:ring-2 hover:ring-primary",
        "relative overflow-hidden",
        className
      )}
    >
      {/* Specular Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Magma Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 h-24 w-24 shrink-0 overflow-hidden rounded-md">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="96px"
        />
      </div>

      <div className="relative z-10 flex-grow">
        <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">
          {name}
        </h3>
        <p className="text-sm font-normal leading-normal mt-1 text-white/60">
          {description}
        </p>
        <p className="text-lg font-bold leading-normal mt-2 text-primary">
          {price}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        className={cn(
          "relative z-10 flex min-w-[36px] max-w-[480px] cursor-pointer items-center justify-center",
          "overflow-hidden rounded-full h-9 w-9",
          "bg-primary/20 text-primary",
          "group-hover:bg-primary group-hover:text-white",
          "transition-colors duration-300 ml-auto self-end"
        )}
      >
        <Plus className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
};
