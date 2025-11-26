'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-primary rounded-full p-2">
              <svg
                className="h-8 w-8 text-white"
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
            <span className="text-2xl font-display uppercase tracking-wider text-white">
              Smash Burgers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/menu"
              className="text-white/60 hover:text-primary transition-colors font-medium"
            >
              Menu
            </Link>
            <Link
              href="/locations"
              className="text-white/60 hover:text-primary transition-colors font-medium"
            >
              Locations
            </Link>
            <Link
              href="/contact"
              className="text-white/60 hover:text-primary transition-colors font-medium"
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
            <Menu className="h-8 w-8" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col space-y-4">
              <Link
                href="/menu"
                className="text-white/60 hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/locations"
                className="text-white/60 hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Locations
              </Link>
              <Link
                href="/contact"
                className="text-white/60 hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
