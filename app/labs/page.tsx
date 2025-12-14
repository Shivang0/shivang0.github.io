'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FlaskConical,
  Terminal,
  Database,
  Server,
  Filter,
  LayoutGrid,
  List,
  Trophy,
  Target,
  BookOpen,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import LabCard from '@/components/ui/LabCard'
import FilterBar, { FilterState, FilterGroup, createSearchFilter } from '@/components/ui/FilterBar'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { labsDirectory, getAllLabs, labStats, type LabCategory } from '@/content/data/labs-directory'
import type { Difficulty } from '@/content/data/types'

// Icon mapping for categories
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'prompt-injection': Terminal,
  'comprehensive-platforms': FlaskConical,
  'rag-data-extraction': Database,
  'self-hosted': Server,
}

// Progress persistence key
const PROGRESS_KEY = 'ai-security-labs-progress'

// Filter configuration
const labFilters: FilterGroup[] = [
  createSearchFilter('Search labs by name, provider, or topic...'),
  {
    id: 'difficulty',
    label: 'Difficulty',
    type: 'single',
    options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' },
      { value: 'expert', label: 'Expert' },
    ],
  },
  {
    id: 'category',
    label: 'Category',
    type: 'single',
    options: labsDirectory.map((cat) => ({
      value: cat.id,
      label: cat.title.replace(' & ', ' / '),
    })),
  },
  {
    id: 'environment',
    label: 'Environment',
    type: 'single',
    options: [
      { value: 'web', label: 'Web-based' },
      { value: 'docker', label: 'Docker/Self-hosted' },
      { value: 'local', label: 'Local' },
      { value: 'cloud', label: 'Cloud' },
    ],
  },
]

export default function LabsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    difficulty: 'all',
    category: 'all',
    environment: 'all',
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [completedLabs, setCompletedLabs] = useState<Set<string>>(new Set())

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PROGRESS_KEY)
      if (saved) {
        try {
          setCompletedLabs(new Set(JSON.parse(saved)))
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [])

  // Save progress to localStorage
  const toggleLabCompletion = useCallback((labId: string) => {
    setCompletedLabs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(labId)) {
        newSet.delete(labId)
      } else {
        newSet.add(labId)
      }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(newSet)))
      return newSet
    })
  }, [])

  // Filter labs
  const filteredCategories = useMemo(() => {
    return labsDirectory
      .map((category) => {
        const filteredLabs = category.labs.filter((lab) => {
          // Search filter
          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            const matchesSearch =
              lab.title.toLowerCase().includes(searchLower) ||
              lab.description.toLowerCase().includes(searchLower) ||
              lab.provider.toLowerCase().includes(searchLower) ||
              lab.categories.some((c) => c.toLowerCase().includes(searchLower)) ||
              lab.owaspMapping.some((o) => o.toLowerCase().includes(searchLower))
            if (!matchesSearch) return false
          }

          // Difficulty filter
          if (filters.difficulty !== 'all' && lab.difficulty !== filters.difficulty) {
            return false
          }

          // Category filter
          if (filters.category !== 'all' && category.id !== filters.category) {
            return false
          }

          // Environment filter
          if (filters.environment !== 'all' && lab.environment !== filters.environment) {
            return false
          }

          return true
        })

        return { ...category, labs: filteredLabs }
      })
      .filter((category) => category.labs.length > 0)
  }, [filters])

  const totalFiltered = filteredCategories.reduce((sum, cat) => sum + cat.labs.length, 0)
  const totalLabs = getAllLabs().length
  const progressPercent = Math.round((completedLabs.size / totalLabs) * 100)

  return (
    <>
      <AnimeBackground variant="dots" />
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-surface border-b border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <FlaskConical className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Labs & CTFs
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Hands-on practice environments for learning AI/LLM security through capture-the-flag
                challenges, vulnerable applications, and interactive labs.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{labStats.totalLabs}</span>
                  <span className="text-muted">Labs</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{labStats.categories}</span>
                  <span className="text-muted">Categories</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Trophy className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{completedLabs.size}</span>
                  <span className="text-muted">Completed</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Progress Bar */}
        {completedLabs.size > 0 && (
          <section className="py-4 bg-panel border-b border-border">
            <Container>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted whitespace-nowrap">
                  Your Progress: {completedLabs.size}/{totalLabs} labs
                </span>
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-sm font-medium text-accent">{progressPercent}%</span>
              </div>
            </Container>
          </section>
        )}

        {/* Filters Section */}
        <section className="py-6 bg-background border-b border-border sticky top-16 z-30">
          <Container>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <FilterBar
                filters={labFilters}
                value={filters}
                onChange={setFilters}
                layout="horizontal"
                className="flex-1"
              />

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">
                  {totalFiltered} {totalFiltered === 1 ? 'lab' : 'labs'}
                </span>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-accent text-white'
                        : 'bg-surface text-muted hover:text-text'
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-accent text-white'
                        : 'bg-surface text-muted hover:text-text'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Labs Content */}
        <section className="py-12">
          <Container>
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Filter className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No labs found</h3>
                <p className="text-muted mb-4">Try adjusting your filters or search query</p>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setFilters({
                      search: '',
                      difficulty: 'all',
                      category: 'all',
                      environment: 'all',
                    })
                  }
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-12"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredCategories.map((category) => {
                  const Icon = categoryIcons[category.id] || FlaskConical
                  return (
                    <motion.div key={category.id} variants={fadeInUp}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold">{category.title}</h2>
                          <p className="text-sm text-muted">{category.description}</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto">
                          {category.labs.length} {category.labs.length === 1 ? 'lab' : 'labs'}
                        </Badge>
                      </div>

                      <div
                        className={
                          viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                            : 'space-y-4'
                        }
                      >
                        {category.labs.map((lab) => (
                          <LabCard
                            key={lab.id}
                            lab={lab}
                            isCompleted={completedLabs.has(lab.id)}
                            onToggleComplete={toggleLabCompletion}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </Container>
        </section>

        {/* Getting Started Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">New to AI Security?</h2>
              <p className="text-muted mb-6">
                Start with beginner-friendly labs like Gandalf or GPT Prompt Attack to learn the
                fundamentals of prompt injection. Progress to intermediate platforms like PortSwigger
                Labs for comprehensive training.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="primary"
                  onClick={() =>
                    setFilters({ ...filters, difficulty: 'beginner', category: 'all' })
                  }
                >
                  Start with Beginner Labs
                </Button>
                <Link href="/learning-paths">
                  <Button variant="secondary">
                    View Learning Paths
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
