'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Card from './Card'
import { fadeInUp } from '@/components/motion/variants'

export interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  link?: string
  linkText?: string
  className?: string
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon: Icon, title, description, link, linkText = 'Learn more', className }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className={className}
      >
        <Card variant="elevated" hoverable className="h-full p-6">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
            <p className="text-muted text-sm flex-grow">{description}</p>
            {link && (
              <motion.a
                href={link}
                className={cn(
                  'inline-flex items-center gap-1 text-accent text-sm font-medium mt-4',
                  'hover:gap-2 transition-all'
                )}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {linkText}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </Card>
      </motion.div>
    )
  }
)

FeatureCard.displayName = 'FeatureCard'

export default FeatureCard