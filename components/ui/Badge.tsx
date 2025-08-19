'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors'

    const variants = {
      primary: 'bg-accent/10 text-accent border border-accent/20',
      secondary: 'bg-surface text-text border border-border',
      success: 'bg-green-500/10 text-green-400 border border-green-500/20',
      warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
      danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
      outline: 'border border-border text-muted',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export default Badge