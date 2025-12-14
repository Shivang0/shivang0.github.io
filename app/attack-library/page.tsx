'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Swords,
  AlertTriangle,
  Shield,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Target,
  BookOpen,
  Layers,
  Terminal,
  Database,
  Brain,
  Code,
  Users,
  FileText,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import FilterBar, { FilterState, FilterGroup, createSearchFilter } from '@/components/ui/FilterBar'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import {
  attackLibrary,
  getAllAttacks,
  getAttacksBySeverity,
  getAttacksByDifficulty,
  attackStats,
  type AttackTechnique,
  type AttackCategory,
} from '@/content/data/attack-library'
import type { Severity, Difficulty, AttackVector } from '@/content/data/types'

const severityColors: Record<Severity, 'primary' | 'secondary' | 'success' | 'warning' | 'danger'> = {
  critical: 'danger',
  high: 'warning',
  medium: 'primary',
  low: 'secondary',
}

const difficultyLabels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'prompt-injection': Terminal,
  'jailbreaking': Code,
  'data-extraction': Database,
  'agent-attacks': Users,
  'model-attacks': Brain,
  'multimodal': FileText,
}

// Filter configuration
const attackFilters: FilterGroup[] = [
  createSearchFilter('Search attacks by name, description, or OWASP mapping...'),
  {
    id: 'category',
    label: 'Category',
    type: 'single',
    options: attackLibrary.map((cat) => ({
      value: cat.id,
      label: cat.title,
    })),
  },
  {
    id: 'severity',
    label: 'Severity',
    type: 'single',
    options: [
      { value: 'critical', label: 'Critical' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
  },
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
]

function AttackCard({ attack, categoryTitle }: { attack: AttackTechnique; categoryTitle: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{attack.title}</h3>
              <Badge variant={severityColors[attack.severity]}>
                {attack.severity.toUpperCase()}
              </Badge>
            </div>
            <p className="text-muted text-sm">{attack.description}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-muted hover:text-text transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{categoryTitle}</Badge>
          <Badge variant="secondary">{difficultyLabels[attack.difficulty]}</Badge>
          {attack.owaspMapping.map((mapping, i) => (
            <Badge key={i} variant="primary">{mapping}</Badge>
          ))}
          {attack.mitreAtlas && (
            <Badge variant="secondary">{attack.mitreAtlas}</Badge>
          )}
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border pt-4 mt-2 space-y-4"
          >
            {/* Attack Steps */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                Attack Steps
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted">
                {attack.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Mitigations */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Mitigations
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                {attack.mitigations.map((mitigation, index) => (
                  <li key={index}>{mitigation}</li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            {attack.examples && attack.examples.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  Examples
                </h4>
                <div className="space-y-2">
                  {attack.examples.map((example, index) => (
                    <div
                      key={index}
                      className="p-3 bg-panel rounded-lg text-sm font-mono text-muted"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {attack.references && (
              <div>
                <h4 className="font-medium mb-2">References</h4>
                <div className="flex flex-wrap gap-2 text-sm">
                  {attack.references.owaspLLM && attack.references.owaspLLM.length > 0 && (
                    <span className="text-muted">
                      OWASP: {attack.references.owaspLLM.join(', ')}
                    </span>
                  )}
                  {attack.references.mitreAtlas && (
                    <span className="text-muted">
                      MITRE ATLAS: {attack.references.mitreAtlas}
                    </span>
                  )}
                  {attack.references.cwe && attack.references.cwe.length > 0 && (
                    <span className="text-muted">
                      CWE: {attack.references.cwe.join(', ')}
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  )
}

export default function AttackLibraryPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    severity: 'all',
    difficulty: 'all',
  })

  const filteredCategories = useMemo(() => {
    return attackLibrary
      .map((category) => {
        const filteredAttacks = category.attacks.filter((attack) => {
          // Search filter
          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            const matchesSearch =
              attack.title.toLowerCase().includes(searchLower) ||
              attack.description.toLowerCase().includes(searchLower) ||
              attack.owaspMapping.some((m) => m.toLowerCase().includes(searchLower)) ||
              (attack.mitreAtlas && attack.mitreAtlas.toLowerCase().includes(searchLower))
            if (!matchesSearch) return false
          }

          // Category filter
          if (filters.category !== 'all' && category.id !== filters.category) {
            return false
          }

          // Severity filter
          if (filters.severity !== 'all' && attack.severity !== filters.severity) {
            return false
          }

          // Difficulty filter
          if (filters.difficulty !== 'all' && attack.difficulty !== filters.difficulty) {
            return false
          }

          return true
        })

        return { ...category, attacks: filteredAttacks }
      })
      .filter((category) => category.attacks.length > 0)
  }, [filters])

  const totalFiltered = filteredCategories.reduce(
    (sum, cat) => sum + cat.attacks.length,
    0
  )

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
                <Swords className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Attack Library
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Comprehensive collection of attack techniques targeting AI/ML systems,
                including prompt injection, jailbreaking, data extraction, and adversarial attacks.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{attackStats.totalAttacks}</span>
                  <span className="text-muted">Attacks</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Layers className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{attackStats.categories}</span>
                  <span className="text-muted">Categories</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  <span className="text-text font-medium">{attackStats.bySeverity.critical}</span>
                  <span className="text-muted">Critical</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Filters Section */}
        <section className="py-6 bg-background border-b border-border sticky top-16 z-30">
          <Container>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <FilterBar
                filters={attackFilters}
                value={filters}
                onChange={setFilters}
                layout="horizontal"
                className="flex-1"
              />
              <span className="text-sm text-muted">
                {totalFiltered} {totalFiltered === 1 ? 'attack' : 'attacks'}
              </span>
            </div>
          </Container>
        </section>

        {/* Attacks Content */}
        <section className="py-12">
          <Container>
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Swords className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No attacks found</h3>
                <p className="text-muted mb-4">Try adjusting your filters or search query</p>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setFilters({
                      search: '',
                      category: 'all',
                      severity: 'all',
                      difficulty: 'all',
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
                  const Icon = categoryIcons[category.id] || Swords

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
                          {category.attacks.length} {category.attacks.length === 1 ? 'attack' : 'attacks'}
                        </Badge>
                      </div>

                      <div className="grid gap-4">
                        {category.attacks.map((attack) => (
                          <AttackCard
                            key={attack.id}
                            attack={attack}
                            categoryTitle={category.title}
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

        {/* Info Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">Understanding AI Attacks</h2>
              <p className="text-muted mb-6">
                This library documents known attack techniques against AI systems for educational and
                defensive purposes. Understanding these attacks is essential for building secure AI
                applications and implementing effective mitigations.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/threat-taxonomy">
                  <Button variant="secondary">
                    View Threat Taxonomy
                  </Button>
                </Link>
                <Link href="/labs">
                  <Button variant="secondary">
                    Practice in Labs
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
