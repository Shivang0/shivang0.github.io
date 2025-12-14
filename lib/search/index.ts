import Fuse, { IFuseOptions } from 'fuse.js'
import type { SearchableItem } from '@/content/data/types'

// Fuse.js options for fuzzy search
const fuseOptions: IFuseOptions<SearchableItem> = {
  keys: [
    { name: 'title', weight: 1.0 },
    { name: 'description', weight: 0.7 },
    { name: 'tags', weight: 0.5 },
    { name: 'category', weight: 0.4 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
}

// Create a new Fuse instance with the given items
export const createSearchIndex = (items: SearchableItem[]): Fuse<SearchableItem> => {
  return new Fuse(items, fuseOptions)
}

// Search function that returns results
export const search = (
  fuse: Fuse<SearchableItem>,
  query: string,
  limit: number = 10
): SearchableItem[] => {
  if (!query.trim()) return []

  const results = fuse.search(query, { limit })
  return results.map(result => result.item)
}

// Group search results by type
export const groupResultsByType = (
  results: SearchableItem[]
): Record<string, SearchableItem[]> => {
  return results.reduce((acc, item) => {
    const type = item.type
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(item)
    return acc
  }, {} as Record<string, SearchableItem[]>)
}

// Type labels for display
export const typeLabels: Record<string, string> = {
  checklist: 'Checklist Items',
  tool: 'Security Tools',
  prompt: 'Test Prompts',
  lab: 'Labs & CTFs',
  attack: 'Attack Techniques',
  threat: 'Threats',
  standard: 'Standards',
  research: 'Research',
  glossary: 'Glossary',
  certification: 'Certifications',
  incident: 'Incidents',
}

// Type icons (Lucide icon names)
export const typeIcons: Record<string, string> = {
  checklist: 'CheckSquare',
  tool: 'Wrench',
  prompt: 'Terminal',
  lab: 'FlaskConical',
  attack: 'Swords',
  threat: 'AlertTriangle',
  standard: 'ScrollText',
  research: 'BookOpen',
  glossary: 'BookA',
  certification: 'Award',
  incident: 'ShieldAlert',
}

// Recent searches management
const RECENT_SEARCHES_KEY = 'ai-security-recent-searches'
const MAX_RECENT_SEARCHES = 5

export const getRecentSearches = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const addRecentSearch = (query: string): void => {
  if (typeof window === 'undefined' || !query.trim()) return
  try {
    const recent = getRecentSearches()
    const filtered = recent.filter(s => s !== query)
    const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  } catch {
    // Ignore localStorage errors
  }
}

export const clearRecentSearches = (): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch {
    // Ignore localStorage errors
  }
}
