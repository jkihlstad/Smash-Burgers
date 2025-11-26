'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  className?: string
  children: React.ReactNode
}

export const GlassCard = ({ className, children }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-glass-border',
        'bg-glass-clear backdrop-blur-xl backdrop-saturate-150',
        'shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]',
        'group transition-all duration-500 ease-out',
        className
      )}
    >
      {/* Specular Highlight (The 'Wet' Look) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Magma Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
