'use client'

import { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  CheckSquare,
  Wrench,
  Terminal,
  FlaskConical,
  Swords,
  AlertTriangle,
  ScrollText,
  BookOpen,
  BookA,
  Award,
  ShieldAlert,
  Clock,
  ArrowRight,
} from 'lucide-react'
import Fuse from 'fuse.js'
import type { SearchableItem } from '@/content/data/types'
import {
  createSearchIndex,
  search,
  groupResultsByType,
  typeLabels,
  getRecentSearches,
  addRecentSearch,
} from '@/lib/search'

// Import data sources
import { comprehensiveSecurityChecklist } from '@/content/data/comprehensive-security-checklist'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  checklist: CheckSquare,
  tool: Wrench,
  prompt: Terminal,
  lab: FlaskConical,
  attack: Swords,
  threat: AlertTriangle,
  standard: ScrollText,
  research: BookOpen,
  glossary: BookA,
  certification: Award,
  incident: ShieldAlert,
}

interface CommandPaletteProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function CommandPalette({ isOpen: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()

  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  // Build search index from all data sources
  const searchIndex = useMemo(() => {
    const items: SearchableItem[] = []

    // Add checklist items
    comprehensiveSecurityChecklist.categories.forEach(category => {
      category.items.forEach(item => {
        items.push({
          id: item.id,
          type: 'checklist',
          title: item.title,
          description: item.description,
          url: `/#${category.id}`,
          category: category.title,
          severity: item.severity as SearchableItem['severity'],
          tags: [category.title, item.severity],
        })
      })
    })

    // Add more data sources as they become available
    // Tools, prompts, labs, etc. will be added when those data files are created

    return createSearchIndex(items)
  }, [])

  // Search results
  const results = useMemo(() => {
    if (!query.trim()) return []
    return search(searchIndex, query, 20)
  }, [searchIndex, query])

  // Grouped results
  const groupedResults = useMemo(() => {
    return groupResultsByType(results)
  }, [results])

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches())
  }, [open])

  // Keyboard shortcut to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, setOpen])

  // Handle selection
  const handleSelect = useCallback(
    (item: SearchableItem) => {
      addRecentSearch(query)
      setOpen(false)
      setQuery('')
      router.push(item.url)
    },
    [query, router, setOpen]
  )

  // Handle recent search selection
  const handleRecentSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Command Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <Command
              className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
              shouldFilter={false}
            >
              {/* Search Input */}
              <div className="flex items-center border-b border-border px-4">
                <Search className="mr-2 h-5 w-5 shrink-0 text-muted" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search checklist, tools, prompts, labs..."
                  className="flex h-14 w-full bg-transparent text-text placeholder:text-muted focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-muted hover:text-text transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <kbd className="ml-2 hidden rounded bg-panel px-2 py-1 text-xs text-muted sm:inline-block">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                {/* Empty state */}
                {query && results.length === 0 && (
                  <Command.Empty className="py-6 text-center text-sm text-muted">
                    No results found for &quot;{query}&quot;
                  </Command.Empty>
                )}

                {/* Recent searches (when no query) */}
                {!query && recentSearches.length > 0 && (
                  <Command.Group heading="Recent Searches">
                    {recentSearches.map((recentQuery, index) => (
                      <Command.Item
                        key={`recent-${index}`}
                        value={`recent-${recentQuery}`}
                        onSelect={() => handleRecentSearch(recentQuery)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer aria-selected:bg-panel"
                      >
                        <Clock className="h-4 w-4 text-muted" />
                        <span className="text-text">{recentQuery}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Quick links (when no query) */}
                {!query && (
                  <Command.Group heading="Quick Links">
                    {[
                      { label: 'Security Checklist', url: '/', icon: CheckSquare },
                      { label: 'Tools', url: '/tools', icon: Wrench },
                      { label: 'Test Prompts', url: '/prompts', icon: Terminal },
                      { label: 'Standards', url: '/standards', icon: ScrollText },
                      { label: 'Threats', url: '/threat-taxonomy', icon: AlertTriangle },
                      { label: 'Research', url: '/research', icon: BookOpen },
                    ].map(link => (
                      <Command.Item
                        key={link.url}
                        value={link.label}
                        onSelect={() => {
                          setOpen(false)
                          router.push(link.url)
                        }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer aria-selected:bg-panel"
                      >
                        <link.icon className="h-4 w-4 text-accent" />
                        <span className="text-text">{link.label}</span>
                        <ArrowRight className="ml-auto h-4 w-4 text-muted" />
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Search results grouped by type */}
                {query &&
                  Object.entries(groupedResults).map(([type, items]) => {
                    const Icon = iconMap[type] || CheckSquare
                    return (
                      <Command.Group key={type} heading={typeLabels[type] || type}>
                        {items.map(item => (
                          <Command.Item
                            key={item.id}
                            value={item.id}
                            onSelect={() => handleSelect(item)}
                            className="flex items-start gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer aria-selected:bg-panel"
                          >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-text truncate">
                                {item.title}
                              </div>
                              <div className="text-xs text-muted truncate">
                                {item.description}
                              </div>
                            </div>
                            {item.severity && (
                              <span
                                className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${
                                  item.severity === 'critical'
                                    ? 'bg-red-500/10 text-red-400'
                                    : item.severity === 'high'
                                    ? 'bg-orange-500/10 text-orange-400'
                                    : item.severity === 'medium'
                                    ? 'bg-yellow-500/10 text-yellow-400'
                                    : 'bg-green-500/10 text-green-400'
                                }`}
                              >
                                {item.severity}
                              </span>
                            )}
                          </Command.Item>
                        ))}
                      </Command.Group>
                    )
                  })}
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-panel px-1.5 py-0.5">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-panel px-1.5 py-0.5">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-panel px-1.5 py-0.5">esc</kbd>
                    close
                  </span>
                </div>
                <span>Powered by Fuse.js</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Search trigger button component
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted bg-surface border border-border rounded-lg hover:bg-panel hover:text-text transition-colors"
    >
      <Search className="w-4 h-4" />
      <span className="hidden md:inline">Search</span>
      <kbd className="hidden md:inline px-1.5 py-0.5 text-xs bg-panel rounded">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}
