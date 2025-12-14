'use client'

import { useState, useCallback } from 'react'
import { Search, X, Filter, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from './Button'
import Badge from './Badge'

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  id: string
  label: string
  type: 'single' | 'multi' | 'search'
  options?: FilterOption[]
  placeholder?: string
}

export interface FilterState {
  search: string
  [key: string]: string | string[]
}

interface FilterBarProps {
  filters: FilterGroup[]
  value: FilterState
  onChange: (filters: FilterState) => void
  showClearAll?: boolean
  layout?: 'horizontal' | 'vertical' | 'stacked'
  className?: string
}

export default function FilterBar({
  filters,
  value,
  onChange,
  showClearAll = true,
  layout = 'horizontal',
  className,
}: FilterBarProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null)

  const handleSearchChange = useCallback(
    (searchValue: string) => {
      onChange({ ...value, search: searchValue })
    },
    [value, onChange]
  )

  const handleFilterChange = useCallback(
    (filterId: string, filterValue: string | string[]) => {
      onChange({ ...value, [filterId]: filterValue })
    },
    [value, onChange]
  )

  const handleClearAll = useCallback(() => {
    const cleared: FilterState = { search: '' }
    filters.forEach(filter => {
      if (filter.type === 'multi') {
        cleared[filter.id] = []
      } else if (filter.type === 'single') {
        cleared[filter.id] = 'all'
      }
    })
    onChange(cleared)
  }, [filters, onChange])

  const hasActiveFilters = value.search || filters.some(filter => {
    const filterValue = value[filter.id]
    if (filter.type === 'multi') {
      return Array.isArray(filterValue) && filterValue.length > 0
    }
    return filterValue && filterValue !== 'all'
  })

  const searchFilter = filters.find(f => f.type === 'search')
  const selectFilters = filters.filter(f => f.type !== 'search')

  return (
    <div
      className={cn(
        'flex gap-3',
        layout === 'vertical' && 'flex-col',
        layout === 'stacked' && 'flex-col sm:flex-row sm:flex-wrap',
        layout === 'horizontal' && 'flex-col sm:flex-row',
        className
      )}
    >
      {/* Search Input */}
      {searchFilter && (
        <div className="relative flex-1 min-w-0 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder={searchFilter.placeholder || 'Search...'}
            value={value.search || ''}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-surface border border-border rounded-lg text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
          {value.search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-text transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Filter Selects */}
      <div className={cn(
        'flex gap-2',
        layout === 'vertical' && 'flex-col',
        layout !== 'vertical' && 'flex-wrap'
      )}>
        {selectFilters.map(filter => (
          <div key={filter.id} className="relative">
            {filter.type === 'single' && filter.options && (
              <select
                value={(value[filter.id] as string) || 'all'}
                onChange={e => handleFilterChange(filter.id, e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer transition-all min-w-[140px]"
              >
                <option value="all">All {filter.label}</option>
                {filter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                    {option.count !== undefined && ` (${option.count})`}
                  </option>
                ))}
              </select>
            )}

            {filter.type === 'multi' && filter.options && (
              <div className="relative">
                <button
                  onClick={() =>
                    setExpandedFilter(expandedFilter === filter.id ? null : filter.id)
                  }
                  className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-lg text-text hover:bg-panel transition-colors min-w-[140px]"
                >
                  <Filter className="w-4 h-4 text-muted" />
                  <span>{filter.label}</span>
                  {Array.isArray(value[filter.id]) &&
                    (value[filter.id] as string[]).length > 0 && (
                      <Badge variant="primary" size="sm">
                        {(value[filter.id] as string[]).length}
                      </Badge>
                    )}
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-muted transition-transform ml-auto',
                      expandedFilter === filter.id && 'rotate-180'
                    )}
                  />
                </button>

                {expandedFilter === filter.id && (
                  <div className="absolute top-full left-0 z-10 mt-1 w-64 p-2 bg-surface border border-border rounded-lg shadow-lg">
                    <div className="max-h-64 overflow-y-auto space-y-1">
                      {filter.options.map(option => {
                        const isSelected =
                          Array.isArray(value[filter.id]) &&
                          (value[filter.id] as string[]).includes(option.value)
                        return (
                          <label
                            key={option.value}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-panel cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={e => {
                                const current = (value[filter.id] as string[]) || []
                                if (e.target.checked) {
                                  handleFilterChange(filter.id, [...current, option.value])
                                } else {
                                  handleFilterChange(
                                    filter.id,
                                    current.filter(v => v !== option.value)
                                  )
                                }
                              }}
                              className="w-4 h-4 rounded border-border text-accent focus:ring-accent/50"
                            />
                            <span className="flex-1 text-sm text-text">{option.label}</span>
                            {option.count !== undefined && (
                              <span className="text-xs text-muted">{option.count}</span>
                            )}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dropdown arrow for single select */}
            {filter.type === 'single' && (
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            )}
          </div>
        ))}

        {/* Clear All Button */}
        {showClearAll && hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted hover:text-text"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}

// Preset filter configurations for common use cases
export const severityFilter: FilterGroup = {
  id: 'severity',
  label: 'Severity',
  type: 'single',
  options: [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ],
}

export const difficultyFilter: FilterGroup = {
  id: 'difficulty',
  label: 'Difficulty',
  type: 'single',
  options: [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
  ],
}

export const createSearchFilter = (placeholder?: string): FilterGroup => ({
  id: 'search',
  label: 'Search',
  type: 'search',
  placeholder: placeholder || 'Search...',
})
