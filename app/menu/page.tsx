'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import MenuHeader from '@/components/menu/MenuHeader';
import MenuItemCard from '@/components/menu/MenuItemCard';
import CartSidebar, { CartItemType } from '@/components/menu/CartSidebar';
import { CATEGORIES, MENU_ITEMS, MenuItemType } from '@/data/menuData';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('beef');
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Scroll to category when clicking tabs
  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    const element = document.getElementById(catId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const addToCart = (item: MenuItemType) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: number, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter((item): item is CartItemType => item !== null));
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    alert(`Order placed! Total: $${total.toFixed(2)}`);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-gray-100 selection:bg-orange-500 selection:text-white">
      {/* Site Header - Hides on scroll */}
      <nav className={`sticky top-0 z-[60] bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/5 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-orange-500 rounded-full p-2">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M11 18.5V16.5C11 14.29 9.21 12.5 7 12.5C4.79 12.5 3 14.29 3 16.5V18.5M11 18.5H3M21 18.5V16.5C21 14.29 19.21 12.5 17 12.5C14.79 12.5 13 14.29 13 16.5V18.5M21 18.5H13M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold uppercase tracking-wider text-white">
                Smash Burgers
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/menu"
                className="text-orange-500 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/locations"
                className="text-white/60 hover:text-orange-500 transition-colors font-medium"
              >
                Locations
              </Link>
              <Link
                href="/contact"
                className="text-white/60 hover:text-orange-500 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/5">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/menu"
                  className="text-orange-500 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/locations"
                  className="text-white/60 hover:text-orange-500 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Locations
                </Link>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-orange-500 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Menu Header with categories */}
      <MenuHeader
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      <div className="flex max-w-[1600px] mx-auto relative">
        {/* Main Content */}
        <main className="flex-1 px-4 py-8 lg:px-8">
          {CATEGORIES.map((cat) => {
            const items = MENU_ITEMS.filter(item => item.category === cat.id);
            if (items.length === 0) return null;

            return (
              <section key={cat.id} id={cat.id} className="mb-12 scroll-mt-48">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-black text-white uppercase tracking-wider">{cat.label}</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-gray-800 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {items.map(item => (
                    <MenuItemCard key={item.id} item={item} addToCart={addToCart} />
                  ))}
                </div>
              </section>
            );
          })}
        </main>

        {/* Sidebar Cart (Desktop) & Drawer (Mobile) */}
        <CartSidebar
          cart={cart}
          updateQuantity={updateQuantity}
          isOpen={isCartOpen}
          closeCart={() => setIsCartOpen(false)}
          checkout={handleCheckout}
        />
      </div>
    </div>
  );
}
