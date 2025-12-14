'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { OWASPLLMEntry, Severity } from '@/content/data/types'

interface ThreatDiagramProps {
  entries: OWASPLLMEntry[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  className?: string
}

const severityColors: Record<Severity, { bg: string; border: string; text: string; glow: string }> = {
  critical: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-400',
    glow: 'shadow-red-500/20',
  },
  high: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/50',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/20',
  },
  medium: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/20',
  },
  low: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/50',
    text: 'text-green-400',
    glow: 'shadow-green-500/20',
  },
}

// Position nodes in a circular layout with the most critical in center
function getNodePosition(
  index: number,
  total: number,
  centerX: number,
  centerY: number,
  radius: number
): { x: number; y: number } {
  // First 3 entries form inner ring (most critical)
  if (index < 3) {
    const innerRadius = radius * 0.4
    const angle = (index * 2 * Math.PI) / 3 - Math.PI / 2
    return {
      x: centerX + Math.cos(angle) * innerRadius,
      y: centerY + Math.sin(angle) * innerRadius,
    }
  }

  // Remaining entries form outer ring
  const outerIndex = index - 3
  const outerCount = total - 3
  const angle = (outerIndex * 2 * Math.PI) / outerCount - Math.PI / 2
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  }
}

export default function ThreatDiagram({
  entries,
  selectedId,
  onSelect,
  className,
}: ThreatDiagramProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const viewBoxWidth = 800
  const viewBoxHeight = 600
  const centerX = viewBoxWidth / 2
  const centerY = viewBoxHeight / 2
  const outerRadius = 220

  // Calculate node positions
  const nodes = useMemo(() => {
    return entries.map((entry, index) => ({
      ...entry,
      position: getNodePosition(index, entries.length, centerX, centerY, outerRadius),
    }))
  }, [entries, centerX, centerY, outerRadius])

  // Draw connections between related nodes
  const connections = useMemo(() => {
    const lines: Array<{
      from: string
      to: string
      x1: number
      y1: number
      x2: number
      y2: number
    }> = []

    // Connect related vulnerabilities based on common attack patterns
    const relationshipMap: Record<string, string[]> = {
      LLM01: ['LLM02', 'LLM05', 'LLM06', 'LLM07'], // Prompt injection connects to many
      LLM02: ['LLM01', 'LLM08'], // Data disclosure related to injection and RAG
      LLM03: ['LLM04'], // Supply chain related to poisoning
      LLM04: ['LLM03', 'LLM08'], // Poisoning related to supply chain and RAG
      LLM05: ['LLM01', 'LLM06'], // Output handling related to injection and agency
      LLM06: ['LLM01', 'LLM05'], // Agency related to injection and output
      LLM07: ['LLM01'], // System prompt leakage related to injection
      LLM08: ['LLM02', 'LLM04'], // RAG related to data and poisoning
      LLM09: ['LLM08'], // Misinformation related to RAG
      LLM10: ['LLM06'], // Resource exhaustion related to agency
    }

    Object.entries(relationshipMap).forEach(([fromId, toIds]) => {
      const fromNode = nodes.find((n) => n.id === fromId)
      if (!fromNode) return

      toIds.forEach((toId) => {
        const toNode = nodes.find((n) => n.id === toId)
        if (!toNode) return

        // Avoid duplicates
        const exists = lines.some(
          (l) =>
            (l.from === fromId && l.to === toId) ||
            (l.from === toId && l.to === fromId)
        )
        if (!exists) {
          lines.push({
            from: fromId,
            to: toId,
            x1: fromNode.position.x,
            y1: fromNode.position.y,
            x2: toNode.position.x,
            y2: toNode.position.y,
          })
        }
      })
    })

    return lines
  }, [nodes])

  return (
    <div className={cn('relative w-full aspect-[4/3]', className)}>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full"
        style={{ maxHeight: '600px' }}
      >
        {/* Background gradient */}
        <defs>
          <radialGradient id="bg-gradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(var(--accent-rgb), 0.05)" />
            <stop offset="100%" stopColor="rgba(var(--accent-rgb), 0)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={centerX} cy={centerY} r={outerRadius + 50} fill="url(#bg-gradient)" />

        {/* Connection lines */}
        <g className="opacity-20">
          {connections.map((conn, i) => {
            const isHighlighted =
              hoveredId === conn.from ||
              hoveredId === conn.to ||
              selectedId === conn.from ||
              selectedId === conn.to

            return (
              <motion.line
                key={`${conn.from}-${conn.to}`}
                x1={conn.x1}
                y1={conn.y1}
                x2={conn.x2}
                y2={conn.y2}
                stroke="currentColor"
                strokeWidth={isHighlighted ? 2 : 1}
                className={cn(
                  'text-border transition-all duration-300',
                  isHighlighted && 'text-accent opacity-60'
                )}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isHighlighted ? 0.6 : 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              />
            )
          })}
        </g>

        {/* Center label */}
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted text-xs font-medium"
        >
          OWASP LLM
        </text>
        <text
          x={centerX}
          y={centerY + 16}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted text-xs"
        >
          Top 10 2025
        </text>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const colors = severityColors[node.severity]
          const isSelected = selectedId === node.id
          const isHovered = hoveredId === node.id
          const nodeSize = index < 3 ? 50 : 45

          return (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect(isSelected ? null : node.id)}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Node background */}
              <motion.circle
                cx={node.position.x}
                cy={node.position.y}
                r={nodeSize}
                className={cn(
                  'transition-all duration-300',
                  colors.bg,
                  isSelected || isHovered ? 'opacity-100' : 'opacity-70'
                )}
                animate={{
                  r: isSelected || isHovered ? nodeSize + 5 : nodeSize,
                }}
                filter={isSelected || isHovered ? 'url(#glow)' : undefined}
              />

              {/* Node border */}
              <motion.circle
                cx={node.position.x}
                cy={node.position.y}
                r={nodeSize}
                fill="none"
                strokeWidth={isSelected || isHovered ? 3 : 2}
                className={cn(
                  'transition-all duration-300',
                  colors.border.replace('border-', 'stroke-')
                )}
                animate={{
                  r: isSelected || isHovered ? nodeSize + 5 : nodeSize,
                }}
              />

              {/* Node ID */}
              <text
                x={node.position.x}
                y={node.position.y - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn('font-bold text-sm', colors.text.replace('text-', 'fill-'))}
              >
                {node.id}
              </text>

              {/* Node rank */}
              <text
                x={node.position.x}
                y={node.position.y + 10}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted text-xs"
              >
                #{node.rank}
              </text>

              {/* Hover tooltip */}
              <AnimatePresence>
                {isHovered && !isSelected && (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    <rect
                      x={node.position.x - 80}
                      y={node.position.y + nodeSize + 10}
                      width={160}
                      height={30}
                      rx={4}
                      className="fill-surface stroke-border"
                    />
                    <text
                      x={node.position.x}
                      y={node.position.y + nodeSize + 28}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-text text-xs font-medium"
                    >
                      {node.title.length > 20
                        ? node.title.substring(0, 18) + '...'
                        : node.title}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-xs">
        {Object.entries(severityColors).map(([severity, colors]) => (
          <div key={severity} className="flex items-center gap-1.5">
            <div
              className={cn('w-3 h-3 rounded-full', colors.bg, colors.border, 'border')}
            />
            <span className="text-muted capitalize">{severity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
