'use client';

import { MenuItemType } from '@/data/menuData';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface MenuItemCardProps {
  item: MenuItemType;
  addToCart: (item: MenuItemType) => void;
}

const MenuItemCard = ({ item, addToCart }: MenuItemCardProps) => {
  return (
    <div className="bg-[#1F2937] rounded-xl overflow-hidden flex flex-col h-full group hover:ring-2 hover:ring-orange-500/50 transition-all duration-300 shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] to-transparent opacity-60"></div>
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-orange-500 font-bold px-3 py-1 rounded-full text-sm border border-orange-500/30">
          ${item.price.toFixed(2)}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-100 mb-2">{item.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
          {item.description}
        </p>

        <button
          onClick={() => addToCart(item)}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          Add to Cart <Plus size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
