'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  AlertOctagon,
  Calendar,
  Building,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Lightbulb,
  Target,
  BookOpen,
  Filter,
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
  incidents,
  incidentCategories,
  incidentStats,
  getIncidentsByCategory,
  getIncidentsBySeverity,
  type Incident,
  type IncidentCategory,
  type IncidentSeverity,
} from '@/content/data/incidents'

const severityColors: Record<IncidentSeverity, string> = {
  critical: 'danger',
  high: 'warning',
  medium: 'primary',
  low: 'secondary',
}

// Filter configuration
const incidentFilters: FilterGroup[] = [
  createSearchFilter('Search incidents by title, organization, or description...'),
  {
    id: 'category',
    label: 'Category',
    type: 'single',
    options: incidentCategories.map((cat) => ({
      value: cat.id,
      label: cat.label,
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
    id: 'year',
    label: 'Year',
    type: 'single',
    options: incidentStats.years.map((year) => ({
      value: year.toString(),
      label: year.toString(),
    })),
  },
]

function IncidentCard({ incident }: { incident: Incident }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const category = incidentCategories.find((c) => c.id === incident.category)

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge
                variant={severityColors[incident.severity]}
              >
                {incident.severity.toUpperCase()}
              </Badge>
              <Badge variant="secondary">
                {category?.label}
              </Badge>
              <span className="text-sm text-muted flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(incident.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{incident.title}</h3>
            <p className="text-sm text-muted mt-1 flex items-center gap-1">
              <Building className="w-4 h-4" />
              {incident.organization}
            </p>
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
        <p className="text-muted">{incident.description}</p>

        {/* Impact Preview */}
        <div className="p-3 bg-panel rounded-lg">
          <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-danger" />
            Impact
          </h4>
          <p className="text-sm text-muted">{incident.impact}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {incident.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-border pt-4 mt-2 space-y-4"
          >
            {/* Technical Details */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                Technical Details
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                {incident.technicalDetails.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>

            {/* Lessons Learned */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-warning" />
                Lessons Learned
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                {incident.lessonsLearned.map((lesson, i) => (
                  <li key={i}>{lesson}</li>
                ))}
              </ul>
            </div>

            {/* Mitigations */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Mitigations Applied
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                {incident.mitigations.map((mitigation, i) => (
                  <li key={i}>{mitigation}</li>
                ))}
              </ul>
            </div>

            {/* Sources */}
            <div>
              <h4 className="font-medium mb-2">Sources</h4>
              <div className="flex flex-wrap gap-2">
                {incident.sources.map((source, i) => (
                  <a
                    key={i}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    {source.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  )
}

export default function IncidentsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    severity: 'all',
    year: 'all',
  })

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          incident.title.toLowerCase().includes(searchLower) ||
          incident.description.toLowerCase().includes(searchLower) ||
          incident.organization.toLowerCase().includes(searchLower) ||
          incident.tags.some((t) => t.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.category !== 'all' && incident.category !== filters.category) {
        return false
      }

      // Severity filter
      if (filters.severity !== 'all' && incident.severity !== filters.severity) {
        return false
      }

      // Year filter
      if (filters.year !== 'all') {
        const incidentYear = new Date(incident.date).getFullYear().toString()
        if (incidentYear !== filters.year) return false
      }

      return true
    })
  }, [filters])

  // Sort by date (most recent first)
  const sortedIncidents = useMemo(() => {
    return [...filteredIncidents].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [filteredIncidents])

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
                <AlertOctagon className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Incidents
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Documented AI security incidents, breaches, and vulnerabilities. Learn from
                real-world cases to improve your security posture.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <AlertOctagon className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{incidentStats.totalIncidents}</span>
                  <span className="text-muted">Incidents</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Building className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{incidentStats.organizations}</span>
                  <span className="text-muted">Organizations</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Target className="w-5 h-5 text-danger" />
                  <span className="text-text font-medium">{incidentStats.bySeverity.critical}</span>
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
                filters={incidentFilters}
                value={filters}
                onChange={setFilters}
                layout="horizontal"
                className="flex-1"
              />
              <span className="text-sm text-muted">
                {filteredIncidents.length} {filteredIncidents.length === 1 ? 'incident' : 'incidents'}
              </span>
            </div>
          </Container>
        </section>

        {/* Timeline View */}
        <section className="py-12">
          <Container>
            {sortedIncidents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Filter className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No incidents found</h3>
                <p className="text-muted mb-4">Try adjusting your filters or search query</p>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setFilters({
                      search: '',
                      category: 'all',
                      severity: 'all',
                      year: 'all',
                    })
                  }
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {sortedIncidents.map((incident) => (
                  <motion.div key={incident.id} variants={fadeInUp}>
                    <IncidentCard incident={incident} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </Container>
        </section>

        {/* Category Summary */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Incidents by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {incidentCategories.map((category) => {
                  const count = incidentStats.byCategory[category.id] || 0
                  return (
                    <Card
                      key={category.id}
                      className="p-4 text-center cursor-pointer hover:border-accent transition-colors"
                      onClick={() => setFilters({ ...filters, category: category.id })}
                    >
                      <div className="text-2xl font-bold text-accent">{count}</div>
                      <div className="text-sm text-muted mt-1">{category.label}</div>
                    </Card>
                  )
                })}
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="secondary" href="/attack-library">
                  View Attack Library
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
