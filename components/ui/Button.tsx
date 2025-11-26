'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'rounded-full font-bold uppercase tracking-wide transition-all duration-300 relative overflow-hidden'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-deep',
    secondary:
      'bg-glass-frosted backdrop-blur-xl text-white border border-glass-border hover:bg-glass-highlight',
    ghost: 'bg-transparent text-white hover:bg-white/10',
  }

  const sizes = {
    sm: 'h-10 px-6 text-sm',
    md: 'h-14 px-8 text-lg',
    lg: 'h-16 px-10 text-xl',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
