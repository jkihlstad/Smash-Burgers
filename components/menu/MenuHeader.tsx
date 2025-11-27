'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CATEGORIES } from '@/data/menuData';

interface MenuHeaderProps {
  activeCategory: string;
  onCategoryClick: (catId: string) => void;
  cartCount: number;
  toggleCart: () => void;
}

const MenuHeader = ({ activeCategory, onCategoryClick, cartCount, toggleCart }: MenuHeaderProps) => {
  return (
    <div className="sticky top-0 z-50 bg-[#0F1115] border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo Section */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <span className="text-2xl" role="img" aria-label="burger">🍔</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-2xl font-black tracking-wider text-orange-500 uppercase">REENERS</h1>
              <h2 className="text-sm font-bold tracking-[0.2em] text-gray-300 uppercase">Smash Burgers</h2>
            </div>
          </div>

          <button
            onClick={toggleCart}
            className="relative p-2 hover:bg-gray-800 rounded-full transition-colors group"
          >
            <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-orange-500" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-[#1F2937] text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
