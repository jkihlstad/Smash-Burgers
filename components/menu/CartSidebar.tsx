'use client';

import { MenuItemType } from '@/data/menuData';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export type CartItemType = MenuItemType & {
  quantity: number;
};

interface CartSidebarProps {
  cart: CartItemType[];
  updateQuantity: (itemId: number, change: number) => void;
  isOpen: boolean;
  closeCart: () => void;
  checkout: () => void;
}

// Simple icon for empty state
const ShoppingBasketIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 11-1 9" />
    <path d="m19 11-4-7" />
    <path d="M2 11h20" />
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
    <path d="m4.5 15.5h15" />
    <path d="m5 11 4-7" />
    <path d="m9 11 1 9" />
  </svg>
);

const CartSidebar = ({ cart, updateQuantity, isOpen, closeCart, checkout }: CartSidebarProps) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
          onClick={closeCart}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#111318] border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:static lg:h-[calc(100vh-2rem)] lg:w-96 lg:rounded-2xl lg:border lg:my-4 lg:mr-4 lg:sticky lg:top-24`}>

        {/* Cart Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-[#1F2937] lg:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-orange-500" />
            <h2 className="text-xl font-bold text-white tracking-wide">CART</h2>
          </div>
          <button onClick={closeCart} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBasketIcon size={64} className="opacity-20" />
              <p>Your cart is empty</p>
              <button onClick={closeCart} className="text-orange-500 hover:underline lg:hidden">
                Go to menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.name}`} className="bg-[#1F2937] p-4 rounded-xl flex gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-200 text-sm leading-tight">{item.name}</h3>
                    <span className="font-bold text-orange-500 ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-3 bg-black/20 w-fit rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold text-gray-200 w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        <div className="p-6 bg-[#1F2937] border-t border-gray-800 lg:rounded-b-2xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-2xl font-bold text-white">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={checkout}
            disabled={cart.length === 0}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-900/20 active:scale-95"
          >
            Checkout - ${subtotal.toFixed(2)}
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
