import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Identity
        primary: {
          DEFAULT: '#FF5E0F',  // Smash Burger Orange
          glow: '#FF8A50',     // Highlight
          deep: '#CC4000',     // Shadow/Pressed
        },
        // Backgrounds
        dark: {
          bg: '#0F0F0F',       // Main background (Rich Black)
          surface: '#161616',  // Secondary background
        },
        // Glass System (The Core Aesthetic)
        glass: {
          clear: 'rgba(255, 255, 255, 0.03)',
          frosted: 'rgba(255, 255, 255, 0.1)',
          magma: 'rgba(255, 94, 15, 0.1)', // Orange tinted glass
          border: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 255, 255, 0.15)',
        },
      },
      fontFamily: {
        display: ['var(--font-anton)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      backdropSaturate: {
        150: '1.5',
      },
    },
  },
  plugins: [],
}

export default config
