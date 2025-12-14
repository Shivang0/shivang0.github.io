'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  Link2,
  Filter,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import {
  glossaryTerms,
  glossaryCategories,
  glossaryStats,
  getTermsByCategory,
  getTermsAlphabetically,
  searchTerms,
  getRelatedTerms,
  type GlossaryTerm,
  type GlossaryCategory,
} from '@/content/data/glossary'

const categoryColors: Record<GlossaryCategory, string> = {
  attacks: 'danger',
  defenses: 'success',
  'ml-concepts': 'primary',
  'llm-concepts': 'primary',
  'security-concepts': 'warning',
  frameworks: 'secondary',
  tools: 'primary',
  governance: 'secondary',
  'prompt-injection': 'danger',
  'jailbreaking': 'danger',
  'rag-security': 'warning',
  'agent-security': 'warning',
  'named-attacks': 'danger',
  'llm-architecture': 'primary',
  'safety-alignment': 'success',
  'adversarial-ml': 'danger',
  'compliance': 'secondary',
}

function TermCard({
  term,
  onTermClick,
}: {
  term: GlossaryTerm
  onTermClick: (termName: string) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const category = glossaryCategories.find((c) => c.id === term.category)
  const relatedTerms = getRelatedTerms(term.id)

  return (
    <Card className="p-5" id={term.id}>
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold">{term.term}</h3>
              {term.abbreviation && (
                <Badge variant="secondary" className="text-xs">
                  {term.abbreviation}
                </Badge>
              )}
            </div>
            <Badge
              variant={categoryColors[term.category] as 'danger' | 'success' | 'primary' | 'warning' | 'secondary'}
              className="text-xs"
            >
              {category?.label}
            </Badge>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-muted hover:text-text transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Definition */}
        <p className="text-muted">{term.definition}</p>

        {/* Related Terms Preview */}
        {term.relatedTerms.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Link2 className="w-4 h-4 text-muted" />
            {term.relatedTerms.slice(0, 3).map((rt, i) => (
              <button
                key={i}
                onClick={() => onTermClick(rt)}
                className="text-xs text-accent hover:underline"
              >
                {rt}
              </button>
            ))}
            {term.relatedTerms.length > 3 && (
              <span className="text-xs text-muted">
                +{term.relatedTerms.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-border pt-4 mt-1 space-y-4"
          >
            {/* Extended Description */}
            {term.extendedDescription && (
              <div>
                <h4 className="font-medium mb-2 text-sm">Details</h4>
                <p className="text-sm text-muted">{term.extendedDescription}</p>
              </div>
            )}

            {/* Examples */}
            {term.examples && term.examples.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-sm flex items-center gap-2">
                  <Tag className="w-4 h-4 text-accent" />
                  Examples
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                  {term.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* All Related Terms */}
            {term.relatedTerms.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-sm flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-accent" />
                  Related Terms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {term.relatedTerms.map((rt, i) => (
                    <button
                      key={i}
                      onClick={() => onTermClick(rt)}
                      className="px-2 py-1 text-xs bg-panel rounded-lg hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      {rt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {term.references && term.references.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-sm">References</h4>
                <div className="flex flex-wrap gap-2">
                  {term.references.map((ref, i) => (
                    <a
                      key={i}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      {ref.title}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  )
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all')
  const [viewMode, setViewMode] = useState<'alphabetical' | 'category'>('alphabetical')

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms

    // Search filter
    if (searchQuery) {
      terms = searchTerms(searchQuery)
    }

    // Category filter
    if (selectedCategory !== 'all') {
      terms = terms.filter((t) => t.category === selectedCategory)
    }

    // Sort
    if (viewMode === 'alphabetical') {
      terms = [...terms].sort((a, b) => a.term.localeCompare(b.term))
    }

    return terms
  }, [searchQuery, selectedCategory, viewMode])

  // Group by letter for alphabetical view
  const groupedByLetter = useMemo(() => {
    if (viewMode !== 'alphabetical') return {}
    const groups: Record<string, GlossaryTerm[]> = {}
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase()
      if (!groups[letter]) {
        groups[letter] = []
      }
      groups[letter].push(term)
    })
    return groups
  }, [filteredTerms, viewMode])

  // Group by category for category view
  const groupedByCategory = useMemo(() => {
    if (viewMode !== 'category') return {}
    const groups: Record<string, GlossaryTerm[]> = {}
    filteredTerms.forEach((term) => {
      if (!groups[term.category]) {
        groups[term.category] = []
      }
      groups[term.category].push(term)
    })
    return groups
  }, [filteredTerms, viewMode])

  const handleTermClick = (termName: string) => {
    setSearchQuery(termName)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Get unique letters for quick navigation
  const letters = useMemo(() => {
    const uniqueLetters = new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()))
    return Array.from(uniqueLetters).sort()
  }, [])

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
                <BookOpen className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Glossary
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Comprehensive glossary of AI security terminology covering attacks, defenses,
                ML concepts, frameworks, and governance.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{glossaryStats.totalTerms}</span>
                  <span className="text-muted">Terms</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Tag className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{Object.keys(glossaryStats.byCategory).length}</span>
                  <span className="text-muted">Categories</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Search and Filters */}
        <section className="py-6 bg-background border-b border-border sticky top-16 z-30">
          <Container>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search terms..."
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as GlossaryCategory | 'all')}
                  className="px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                >
                  <option value="all">All Categories</option>
                  {glossaryCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('alphabetical')}
                  className={`px-4 py-2 text-sm transition-colors ${
                    viewMode === 'alphabetical'
                      ? 'bg-accent text-white'
                      : 'bg-surface text-muted hover:text-text'
                  }`}
                >
                  A-Z
                </button>
                <button
                  onClick={() => setViewMode('category')}
                  className={`px-4 py-2 text-sm transition-colors ${
                    viewMode === 'category'
                      ? 'bg-accent text-white'
                      : 'bg-surface text-muted hover:text-text'
                  }`}
                >
                  By Category
                </button>
              </div>

              <span className="text-sm text-muted">
                {filteredTerms.length} terms
              </span>
            </div>

            {/* Quick Letter Navigation */}
            {viewMode === 'alphabetical' && !searchQuery && selectedCategory === 'all' && (
              <div className="flex flex-wrap gap-1 mt-4">
                {letters.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => {
                      const element = document.getElementById(`letter-${letter}`)
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-8 h-8 text-sm font-medium bg-panel rounded hover:bg-accent hover:text-white transition-colors"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* Glossary Content */}
        <section className="py-12">
          <Container>
            {filteredTerms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Filter className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No terms found</h3>
                <p className="text-muted mb-4">Try adjusting your search or filters</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : viewMode === 'alphabetical' ? (
              // Alphabetical View
              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {Object.entries(groupedByLetter).map(([letter, terms]) => (
                  <motion.div key={letter} variants={fadeInUp} id={`letter-${letter}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-accent">{letter}</span>
                      <div className="h-px flex-1 bg-border" />
                      <Badge variant="secondary">{terms.length}</Badge>
                    </div>
                    <div className="grid gap-4">
                      {terms.map((term) => (
                        <TermCard key={term.id} term={term} onTermClick={handleTermClick} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Category View
              <motion.div
                className="space-y-12"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {Object.entries(groupedByCategory).map(([categoryId, terms]) => {
                  const category = glossaryCategories.find((c) => c.id === categoryId)
                  if (!category) return null

                  return (
                    <motion.div key={categoryId} variants={fadeInUp}>
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-2xl font-semibold">{category.label}</h2>
                        <Badge variant="secondary">{terms.length} terms</Badge>
                      </div>
                      <p className="text-muted mb-4">{category.description}</p>
                      <div className="grid gap-4">
                        {terms.map((term) => (
                          <TermCard key={term.id} term={term} onTermClick={handleTermClick} />
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </Container>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
              <p className="text-muted mb-6">
                This glossary covers key terminology used in AI security. For deeper learning,
                explore our learning paths or check out the attack library for practical examples.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/learning-paths">
                  <Button variant="secondary">
                    Learning Paths
                  </Button>
                </Link>
                <Link href="/attack-library">
                  <Button variant="secondary">
                    Attack Library
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
