'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import Card from './Card'
import Badge from './Badge'

export interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  image?: string
  date: string
  readTime?: string
  category?: string
  className?: string
}

const BlogCard = forwardRef<HTMLDivElement, BlogCardProps>(
  ({ slug, title, excerpt, image, date, readTime, category, className }, ref) => {
    return (
      <motion.article
        ref={ref}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={className}
      >
        <Link href={`/blog/${slug}`} className="block h-full">
          <Card variant="elevated" hoverable className="h-full overflow-hidden">
            {image && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {category && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" size="sm">
                      {category}
                    </Badge>
                  </div>
                )}
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-muted mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(date)}
                </span>
                {readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {readTime}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-muted text-sm line-clamp-3 mb-4">
                {excerpt}
              </p>
              <motion.div
                className="inline-flex items-center gap-1 text-accent text-sm font-medium"
                whileHover={{ gap: '0.5rem' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                Read more
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </Card>
        </Link>
      </motion.article>
    )
  }
)

BlogCard.displayName = 'BlogCard'

export default BlogCard