'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  Github,
  Clock,
  CheckCircle2,
  Circle,
  Star,
  Server,
  Globe,
  Terminal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Card from './Card'
import Badge from './Badge'
import type { Lab, Difficulty, LabEnvironment } from '@/content/data/types'

interface LabCardProps {
  lab: Lab
  isCompleted?: boolean
  onToggleComplete?: (labId: string) => void
  className?: string
}

const difficultyConfig: Record<Difficulty, { color: string; label: string }> = {
  beginner: { color: 'bg-green-500/10 text-green-400 border-green-500/20', label: 'Beginner' },
  intermediate: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', label: 'Intermediate' },
  advanced: { color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', label: 'Advanced' },
  expert: { color: 'bg-red-500/10 text-red-400 border-red-500/20', label: 'Expert' },
}

const environmentIcons: Record<LabEnvironment, React.ComponentType<{ className?: string }>> = {
  web: Globe,
  docker: Server,
  local: Terminal,
  cloud: Server,
  vm: Server,
}

export default function LabCard({
  lab,
  isCompleted = false,
  onToggleComplete,
  className,
}: LabCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const difficultyStyle = difficultyConfig[lab.difficulty]
  const EnvironmentIcon = environmentIcons[lab.environment]

  return (
    <Card
      className={cn('p-5 relative overflow-hidden', className)}
      hoverable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion Toggle */}
      {onToggleComplete && (
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleComplete(lab.id)
          }}
          className={cn(
            'absolute top-4 right-4 p-1 rounded-full transition-colors z-10',
            isCompleted
              ? 'text-green-400 hover:text-green-300'
              : 'text-muted hover:text-text'
          )}
          title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3 pr-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-text truncate">{lab.title}</h3>
            {lab.isFree && (
              <Badge variant="success" size="sm" className="shrink-0">
                Free
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted">{lab.provider}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted mb-4 line-clamp-2">{lab.description}</p>

      {/* Badges Row */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={cn(
            'px-2 py-0.5 text-xs font-medium rounded-full border',
            difficultyStyle.color
          )}
        >
          {difficultyStyle.label}
        </span>

        <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-surface border border-border rounded-full text-muted">
          <EnvironmentIcon className="w-3 h-3" />
          {lab.environment}
        </span>

        {lab.estimatedTime && (
          <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-surface border border-border rounded-full text-muted">
            <Clock className="w-3 h-3" />
            {lab.estimatedTime}
          </span>
        )}
      </div>

      {/* OWASP Mapping */}
      {lab.owaspMapping && lab.owaspMapping.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {lab.owaspMapping.map((owasp) => (
            <Badge key={owasp} variant="outline" size="sm">
              {owasp}
            </Badge>
          ))}
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {lab.categories.slice(0, 3).map((category) => (
          <Badge key={category} variant="secondary" size="sm">
            {category}
          </Badge>
        ))}
        {lab.categories.length > 3 && (
          <Badge variant="secondary" size="sm">
            +{lab.categories.length - 3}
          </Badge>
        )}
      </div>

      {/* Features */}
      {lab.features && lab.features.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4 text-xs text-muted">
          {lab.features.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="flex items-center gap-1">
              <Star className="w-3 h-3 text-accent" />
              {feature}
              {idx < Math.min(lab.features!.length - 1, 1) && (
                <span className="mx-1">•</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-3 border-t border-border">
        <a
          href={lab.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {lab.environment === 'docker' ? 'View on GitHub' : 'Launch Lab'}
        </a>

        {lab.githubUrl && lab.url !== lab.githubUrl && (
          <a
            href={lab.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors"
          >
            <Github className="w-4 h-4" />
            Source
          </a>
        )}
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </Card>
  )
}
