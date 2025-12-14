'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Award,
  DollarSign,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  Building,
  Star,
  CheckCircle2,
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
  certifications,
  certStats,
  getCertsByDifficulty,
  getCertsByAIRelevance,
  type Certification,
} from '@/content/data/certifications'
import type { Difficulty } from '@/content/data/types'

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'success',
  intermediate: 'primary',
  advanced: 'warning',
  expert: 'danger',
}

const aiRelevanceColors: Record<string, string> = {
  primary: 'accent',
  secondary: 'warning',
  foundational: 'secondary',
}

const aiRelevanceLabels: Record<string, string> = {
  primary: 'AI-Focused',
  secondary: 'AI-Related',
  foundational: 'Foundation',
}

// Filter configuration
const certFilters: FilterGroup[] = [
  createSearchFilter('Search certifications by name, provider, or topic...'),
  {
    id: 'difficulty',
    label: 'Level',
    type: 'single',
    options: [
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' },
      { value: 'expert', label: 'Expert' },
    ],
  },
  {
    id: 'aiRelevance',
    label: 'AI Relevance',
    type: 'single',
    options: [
      { value: 'primary', label: 'AI-Focused' },
      { value: 'secondary', label: 'AI-Related' },
      { value: 'foundational', label: 'Foundation' },
    ],
  },
  {
    id: 'cost',
    label: 'Exam Cost',
    type: 'single',
    options: [
      { value: 'under500', label: 'Under $500' },
      { value: '500to1000', label: '$500-$1000' },
      { value: 'over1000', label: 'Over $1000' },
    ],
  },
]

function CertCard({ cert }: { cert: Certification }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10 text-accent flex-shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{cert.abbreviation}</h3>
                <Badge
                  variant={difficultyColors[cert.difficulty] as 'success' | 'primary' | 'warning' | 'danger'}
                >
                  {cert.difficulty.charAt(0).toUpperCase() + cert.difficulty.slice(1)}
                </Badge>
                <Badge variant="secondary">
                  {aiRelevanceLabels[cert.aiRelevance]}
                </Badge>
              </div>
              <p className="text-sm text-text font-medium">{cert.title}</p>
              <p className="text-sm text-muted mt-1">{cert.providerName}</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-muted hover:text-text transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Description */}
        <p className="text-muted text-sm">{cert.description}</p>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium text-text">${cert.cost.exam}</span>
            <span>exam</span>
          </div>
          <div className="flex items-center gap-1 text-muted">
            <Clock className="w-4 h-4" />
            <span>{cert.duration}</span>
          </div>
          {cert.renewalPeriod && (
            <div className="flex items-center gap-1 text-muted">
              <Target className="w-4 h-4" />
              <span>Renew: {cert.renewalPeriod}</span>
            </div>
          )}
        </div>

        {/* AI Topics Preview */}
        <div className="flex flex-wrap gap-1.5">
          {cert.aiTopics.slice(0, 3).map((topic, i) => (
            <Badge key={i} variant="primary" className="text-xs">
              {topic}
            </Badge>
          ))}
          {cert.aiTopics.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{cert.aiTopics.length - 3} more
            </Badge>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-border pt-4 mt-2 space-y-4"
          >
            {/* Prerequisites */}
            <div>
              <h4 className="font-medium mb-2">Prerequisites</h4>
              <ul className="list-disc list-inside text-sm text-muted space-y-1">
                {cert.prerequisites.map((prereq, i) => (
                  <li key={i}>{prereq}</li>
                ))}
              </ul>
            </div>

            {/* Domains */}
            <div>
              <h4 className="font-medium mb-2">Exam Domains</h4>
              <div className="space-y-2">
                {cert.domains.map((domain, i) => (
                  <div
                    key={i}
                    className="p-3 bg-panel rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{domain.name}</span>
                      {domain.weight && (
                        <Badge variant="secondary" className="text-xs">
                          {domain.weight}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {domain.topics.map((topic, j) => (
                        <span key={j} className="text-xs text-muted">
                          {topic}
                          {j < domain.topics.length - 1 && ' • '}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Topics */}
            <div>
              <h4 className="font-medium mb-2">AI Security Topics</h4>
              <div className="flex flex-wrap gap-1.5">
                {cert.aiTopics.map((topic, i) => (
                  <Badge key={i} variant="primary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Exam Info */}
            <div className="p-3 bg-panel rounded-lg">
              <h4 className="font-medium mb-2">Exam Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted">Format:</span>
                  <span className="ml-2">{cert.examFormat}</span>
                </div>
                {cert.passingScore && (
                  <div>
                    <span className="text-muted">Passing Score:</span>
                    <span className="ml-2">{cert.passingScore}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted">Exam Cost:</span>
                  <span className="ml-2">${cert.cost.exam} {cert.cost.currency}</span>
                </div>
                {cert.cost.training && cert.cost.training > 0 && (
                  <div>
                    <span className="text-muted">Training:</span>
                    <span className="ml-2">${cert.cost.training} {cert.cost.currency}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" className="w-full">
                  Learn More
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  )
}

export default function CertificationsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    difficulty: 'all',
    aiRelevance: 'all',
    cost: 'all',
  })

  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          cert.title.toLowerCase().includes(searchLower) ||
          cert.abbreviation.toLowerCase().includes(searchLower) ||
          cert.description.toLowerCase().includes(searchLower) ||
          cert.providerName.toLowerCase().includes(searchLower) ||
          cert.aiTopics.some((t) => t.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }

      // Difficulty filter
      if (filters.difficulty !== 'all' && cert.difficulty !== filters.difficulty) {
        return false
      }

      // AI Relevance filter
      if (filters.aiRelevance !== 'all' && cert.aiRelevance !== filters.aiRelevance) {
        return false
      }

      // Cost filter
      if (filters.cost !== 'all') {
        const cost = cert.cost.exam
        if (filters.cost === 'under500' && cost >= 500) return false
        if (filters.cost === '500to1000' && (cost < 500 || cost > 1000)) return false
        if (filters.cost === 'over1000' && cost <= 1000) return false
      }

      return true
    })
  }, [filters])

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
                <Award className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Certifications
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Industry certifications relevant to AI security, from foundational security
                credentials to specialized AI/ML certifications from leading providers.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{certStats.totalCerts}</span>
                  <span className="text-muted">Certifications</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Building className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{certStats.providers}</span>
                  <span className="text-muted">Providers</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{certStats.byAIRelevance.primary}</span>
                  <span className="text-muted">AI-Focused</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">${certStats.avgExamCost}</span>
                  <span className="text-muted">Avg Cost</span>
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
                filters={certFilters}
                value={filters}
                onChange={setFilters}
                layout="horizontal"
                className="flex-1"
              />
              <span className="text-sm text-muted">
                {filteredCerts.length} {filteredCerts.length === 1 ? 'certification' : 'certifications'}
              </span>
            </div>
          </Container>
        </section>

        {/* Certifications Content */}
        <section className="py-12">
          <Container>
            {filteredCerts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Award className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No certifications found</h3>
                <p className="text-muted mb-4">Try adjusting your filters or search query</p>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setFilters({
                      search: '',
                      difficulty: 'all',
                      aiRelevance: 'all',
                      cost: 'all',
                    })
                  }
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="grid gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredCerts.map((cert) => (
                  <motion.div key={cert.id} variants={fadeInUp}>
                    <CertCard cert={cert} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </Container>
        </section>

        {/* Recommendation Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Certification Path Recommendations
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <h3 className="font-medium">Getting Started</h3>
                  </div>
                  <p className="text-sm text-muted mb-3">
                    Build foundational security knowledge before specializing in AI.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mr-2">Security+</Badge>
                    <Badge variant="secondary">CEH</Badge>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <h3 className="font-medium">AI/ML Focus</h3>
                  </div>
                  <p className="text-sm text-muted mb-3">
                    Specialize in cloud ML platforms and AI engineering.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="primary" className="mr-2">AWS ML</Badge>
                    <Badge variant="primary" className="mr-2">GCP ML</Badge>
                    <Badge variant="primary">Azure AI</Badge>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-warning" />
                    <h3 className="font-medium">Advanced Security</h3>
                  </div>
                  <p className="text-sm text-muted mb-3">
                    Expert-level security credentials for leadership roles.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="warning" className="mr-2">CISSP</Badge>
                    <Badge variant="warning" className="mr-2">GPEN</Badge>
                    <Badge variant="warning">OSCP</Badge>
                  </div>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
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
