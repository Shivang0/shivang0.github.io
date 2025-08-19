'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  badge?: string
  align?: 'left' | 'center' | 'right'
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, badge, align = 'center', ...props }, ref) => {
    const alignments = {
      left: 'text-left',
      center: 'text-center mx-auto',
      right: 'text-right',
    }

    return (
      <div
        ref={ref}
        className={cn('max-w-3xl', alignments[align], className)}
        {...props}
      >
        {badge && (
          <div
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
              'bg-accent/10 text-accent border border-accent/20 mb-4'
            )}
          >
            {badge}
          </div>
        )}
        <h2
          className="text-display-2 font-display font-semibold text-text"
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-4 text-lg text-muted"
          >
            {subtitle}
          </p>
        )}
      </div>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'

export default SectionHeader