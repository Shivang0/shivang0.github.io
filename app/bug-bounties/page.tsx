'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Bug,
  DollarSign,
  ExternalLink,
  Shield,
  Building2,
  Trophy,
  Clock,
  Target,
  Filter,
  Sparkles,
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
  bugBountyPrograms,
  getAllPrograms,
  bountyStats,
  type BugBountyCategory,
} from '@/content/data/bug-bounties'
import type { BountyPlatform, BountyStatus } from '@/content/data/types'

// Platform badge colors
const platformColors: Record<BountyPlatform, string> = {
  hackerone: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  bugcrowd: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  intigriti: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  synack: 'bg-red-500/10 text-red-400 border-red-500/20',
  direct: 'bg-green-500/10 text-green-400 border-green-500/20',
  huntr: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

// Status badge config
const statusConfig: Record<BountyStatus, { color: string; label: string }> = {
  active: { color: 'bg-green-500/10 text-green-400', label: 'Active' },
  paused: { color: 'bg-yellow-500/10 text-yellow-400', label: 'Paused' },
  closed: { color: 'bg-red-500/10 text-red-400', label: 'Closed' },
  'invite-only': { color: 'bg-purple-500/10 text-purple-400', label: 'Invite Only' },
}

// Filter configuration
const bountyFilters: FilterGroup[] = [
  createSearchFilter('Search programs by company, platform, or AI system...'),
  {
    id: 'platform',
    label: 'Platform',
    type: 'single',
    options: [
      { value: 'hackerone', label: 'HackerOne' },
      { value: 'bugcrowd', label: 'Bugcrowd' },
      { value: 'huntr', label: 'Huntr' },
      { value: 'direct', label: 'Direct' },
    ],
  },
  {
    id: 'minReward',
    label: 'Min Reward',
    type: 'single',
    options: [
      { value: '5000', label: '$5,000+' },
      { value: '10000', label: '$10,000+' },
      { value: '20000', label: '$20,000+' },
    ],
  },
  {
    id: 'category',
    label: 'Category',
    type: 'single',
    options: bugBountyPrograms.map((cat) => ({
      value: cat.id,
      label: cat.title,
    })),
  },
]

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function BugBountiesPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    platform: 'all',
    minReward: 'all',
    category: 'all',
  })

  // Filter programs
  const filteredCategories = useMemo(() => {
    return bugBountyPrograms
      .map((category) => {
        const filteredPrograms = category.programs.filter((program) => {
          // Search filter
          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            const matchesSearch =
              program.title.toLowerCase().includes(searchLower) ||
              program.company.toLowerCase().includes(searchLower) ||
              program.description.toLowerCase().includes(searchLower) ||
              program.aiSystemsInScope.some((s) => s.toLowerCase().includes(searchLower)) ||
              program.platform.toLowerCase().includes(searchLower)
            if (!matchesSearch) return false
          }

          // Platform filter
          if (filters.platform !== 'all' && program.platform !== filters.platform) {
            return false
          }

          // Min reward filter
          if (filters.minReward !== 'all') {
            const minAmount = parseInt(filters.minReward as string)
            if (program.maxReward < minAmount) return false
          }

          // Category filter
          if (filters.category !== 'all' && category.id !== filters.category) {
            return false
          }

          return true
        })

        return { ...category, programs: filteredPrograms }
      })
      .filter((category) => category.programs.length > 0)
  }, [filters])

  const totalFiltered = filteredCategories.reduce((sum, cat) => sum + cat.programs.length, 0)

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
                <Bug className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Bug Bounty Programs
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Earn rewards for finding security vulnerabilities in AI/ML systems.
                Curated list of programs accepting AI security research.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{bountyStats.totalPrograms}</span>
                  <span className="text-muted">Programs</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{bountyStats.activePrograms}</span>
                  <span className="text-muted">Active</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">
                    {formatCurrency(bountyStats.maxPossibleReward)}
                  </span>
                  <span className="text-muted">Max Reward</span>
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
                filters={bountyFilters}
                value={filters}
                onChange={setFilters}
                layout="horizontal"
                className="flex-1"
              />

              <span className="text-sm text-muted whitespace-nowrap">
                {totalFiltered} {totalFiltered === 1 ? 'program' : 'programs'}
              </span>
            </div>
          </Container>
        </section>

        {/* Programs Content */}
        <section className="py-12">
          <Container>
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Filter className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No programs found</h3>
                <p className="text-muted mb-4">Try adjusting your filters or search query</p>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setFilters({
                      search: '',
                      platform: 'all',
                      minReward: 'all',
                      category: 'all',
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
                {filteredCategories.map((category) => (
                  <motion.div key={category.id} variants={fadeInUp}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold">{category.title}</h2>
                        <p className="text-sm text-muted">{category.description}</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {category.programs.length}{' '}
                        {category.programs.length === 1 ? 'program' : 'programs'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {category.programs.map((program) => (
                        <Card key={program.id} className="p-6" hoverable>
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg text-text truncate">
                                  {program.title}
                                </h3>
                                <span
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    statusConfig[program.status].color
                                  }`}
                                >
                                  {statusConfig[program.status].label}
                                </span>
                              </div>
                              <p className="text-sm text-muted">{program.company}</p>
                            </div>
                            <div className="flex flex-col items-end ml-4">
                              <span className="text-lg font-bold text-accent">
                                {formatCurrency(program.maxReward)}
                              </span>
                              <span className="text-xs text-muted">max reward</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted mb-4 line-clamp-2">
                            {program.description}
                          </p>

                          {/* Platform & Response Time */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full border ${
                                platformColors[program.platform]
                              }`}
                            >
                              {program.platform === 'hackerone'
                                ? 'HackerOne'
                                : program.platform === 'bugcrowd'
                                ? 'Bugcrowd'
                                : program.platform.charAt(0).toUpperCase() +
                                  program.platform.slice(1)}
                            </span>
                            {program.responseTime && (
                              <span className="flex items-center gap-1 px-2 py-1 text-xs bg-surface border border-border rounded-full text-muted">
                                <Clock className="w-3 h-3" />
                                {program.responseTime}
                              </span>
                            )}
                            <span className="px-2 py-1 text-xs bg-surface border border-border rounded-full text-muted">
                              {program.rewardRange}
                            </span>
                          </div>

                          {/* AI Systems in Scope */}
                          <div className="mb-4">
                            <div className="text-xs font-medium text-muted mb-2">
                              AI Systems in Scope:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {program.aiSystemsInScope.slice(0, 4).map((system) => (
                                <Badge key={system} variant="outline" size="sm">
                                  {system}
                                </Badge>
                              ))}
                              {program.aiSystemsInScope.length > 4 && (
                                <Badge variant="outline" size="sm">
                                  +{program.aiSystemsInScope.length - 4}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Excluded Vulnerabilities */}
                          {program.excludedVulnerabilities.length > 0 && (
                            <div className="mb-4">
                              <div className="text-xs font-medium text-muted mb-2">
                                Out of Scope:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {program.excludedVulnerabilities.slice(0, 2).map((excl) => (
                                  <span
                                    key={excl}
                                    className="px-2 py-0.5 text-xs bg-red-500/10 text-red-400 rounded"
                                  >
                                    {excl}
                                  </span>
                                ))}
                                {program.excludedVulnerabilities.length > 2 && (
                                  <span className="px-2 py-0.5 text-xs text-muted">
                                    +{program.excludedVulnerabilities.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Action */}
                          <div className="pt-4 border-t border-border">
                            <a
                              href={program.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Program
                            </a>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </Container>
        </section>

        {/* Tips Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Tips for AI Bug Bounty Hunting
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-accent mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-2">Focus on Security Impact</h3>
                      <p className="text-sm text-muted">
                        Most programs exclude pure jailbreaking without security impact. Focus on
                        data leaks, authentication bypasses, and cross-tenant vulnerabilities.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-accent mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-2">Read the Scope Carefully</h3>
                      <p className="text-sm text-muted">
                        AI programs often have specific exclusions. Prompt injection without data
                        exposure is typically out of scope. Check for AI-specific reward categories.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-6 h-6 text-accent mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-2">Document Thoroughly</h3>
                      <p className="text-sm text-muted">
                        AI vulnerabilities can be hard to reproduce. Provide detailed PoCs,
                        screenshots, and exact prompts used. Show clear security impact.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-accent mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-2">Be Patient</h3>
                      <p className="text-sm text-muted">
                        AI security is a new field. Triage teams may need extra time to understand
                        and validate AI-specific issues. Provide additional context when asked.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
