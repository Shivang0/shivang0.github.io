'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  ExternalLink,
  MessageCircle,
  Hash,
  MessageSquare,
  Mail,
  Headphones,
  Youtube,
  FileText,
  Github,
  Calendar,
  Microscope,
  Flag,
  GraduationCap,
  Filter,
  Star,
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
  communityResources,
  resourceTypes,
  resourceFocuses,
  communityStats,
  getResourcesByType,
  getResourcesByFocus,
  getFreeResources,
  type CommunityResource,
  type ResourceType,
  type ResourceFocus,
} from '@/content/data/community'

const typeIcons: Record<ResourceType, React.ComponentType<{ className?: string }>> = {
  discord: MessageCircle,
  slack: Hash,
  forum: MessageSquare,
  newsletter: Mail,
  podcast: Headphones,
  youtube: Youtube,
  blog: FileText,
  twitter: MessageCircle,
  github: Github,
  conference: Calendar,
  meetup: Users,
  'research-group': Microscope,
  ctf: Flag,
  training: GraduationCap,
}

// Filter configuration
const communityFilters: FilterGroup[] = [
  createSearchFilter('Search resources by name, description, or tag...'),
  {
    id: 'type',
    label: 'Type',
    type: 'single',
    options: resourceTypes.map((type) => ({
      value: type.id,
      label: type.label,
    })),
  },
  {
    id: 'focus',
    label: 'Focus',
    type: 'single',
    options: resourceFocuses.map((focus) => ({
      value: focus.id,
      label: focus.label,
    })),
  },
  {
    id: 'cost',
    label: 'Cost',
    type: 'single',
    options: [
      { value: 'free', label: 'Free Only' },
      { value: 'paid', label: 'Paid' },
    ],
  },
]

function ResourceCard({ resource }: { resource: CommunityResource }) {
  const Icon = typeIcons[resource.type] || Users
  const resourceType = resourceTypes.find((t) => t.id === resource.type)

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-accent/10 text-accent flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">{resource.name}</h3>
            {resource.free ? (
              <Badge variant="success" className="text-xs">Free</Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">Paid</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted mb-2">
            <span>{resourceType?.label}</span>
            {resource.memberCount && (
              <>
                <span>•</span>
                <span>{resource.memberCount} members</span>
              </>
            )}
            {resource.frequency && (
              <>
                <span>•</span>
                <span>{resource.frequency}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted mt-3 mb-4 flex-1">
        {resource.description}
      </p>

      {/* Highlights */}
      <div className="mb-4">
        <ul className="space-y-1">
          {resource.highlights.slice(0, 3).map((highlight, i) => (
            <li key={i} className="text-xs text-muted flex items-start gap-1.5">
              <Star className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Focus Areas */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {resource.focus.slice(0, 3).map((focusId) => {
          const focus = resourceFocuses.find((f) => f.id === focusId)
          return focus ? (
            <Badge key={focusId} variant="secondary" className="text-xs">
              {focus.label}
            </Badge>
          ) : null
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {resource.tags.slice(0, 4).map((tag, i) => (
          <span
            key={i}
            className="text-xs px-1.5 py-0.5 bg-panel rounded text-muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
      >
        Visit Resource
        <ExternalLink className="w-4 h-4" />
      </a>
    </Card>
  )
}

export default function CommunityPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'all',
    focus: 'all',
    cost: 'all',
  })

  const filteredResources = useMemo(() => {
    return communityResources.filter((resource) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          resource.name.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower) ||
          resource.tags.some((t) => t.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }

      // Type filter
      if (filters.type !== 'all' && resource.type !== filters.type) {
        return false
      }

      // Focus filter
      if (filters.focus !== 'all' && !resource.focus.includes(filters.focus as ResourceFocus)) {
        return false
      }

      // Cost filter
      if (filters.cost !== 'all') {
        if (filters.cost === 'free' && !resource.free) return false
        if (filters.cost === 'paid' && resource.free) return false
      }

      return true
    })
  }, [filters])

  // Group by type for display
  const groupedResources = useMemo(() => {
    const groups: Record<string, CommunityResource[]> = {}
    filteredResources.forEach((resource) => {
      if (!groups[resource.type]) {
        groups[resource.type] = []
      }
      groups[resource.type].push(resource)
    })
    return groups
  }, [filteredResources])

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
                <Users className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Community
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Connect with the AI security community through Discord servers, Slack channels,
                newsletters, podcasts, conferences, and research groups.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{communityStats.totalResources}</span>
                  <span className="text-muted">Resources</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">
                    {(communityStats.byType.discord || 0) + (communityStats.byType.slack || 0)}
                  </span>
                  <span className="text-muted">Communities</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{communityStats.freeResources}</span>
                  <span className="text-muted">Free</span>
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
                filters={communityFilters}
                value={filters}
                onChange={setFilters}
                layout="horizontal"
                className="flex-1"
              />
              <span className="text-sm text-muted">
                {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
              </span>
            </div>
          </Container>
        </section>

        {/* Resources Content */}
        <section className="py-12">
          <Container>
            {filteredResources.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Filter className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-muted mb-4">Try adjusting your filters or search query</p>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setFilters({
                      search: '',
                      type: 'all',
                      focus: 'all',
                      cost: 'all',
                    })
                  }
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : filters.type !== 'all' ? (
              // Single type view
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredResources.map((resource) => (
                  <motion.div key={resource.id} variants={fadeInUp}>
                    <ResourceCard resource={resource} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Grouped view
              <motion.div
                className="space-y-12"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {Object.entries(groupedResources).map(([typeId, resources]) => {
                  const type = resourceTypes.find((t) => t.id === typeId)
                  if (!type || resources.length === 0) return null
                  const Icon = typeIcons[typeId as ResourceType] || Users

                  return (
                    <motion.div key={typeId} variants={fadeInUp}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold">{type.label}</h2>
                        </div>
                        <Badge variant="secondary" className="ml-auto">
                          {resources.length} {resources.length === 1 ? 'resource' : 'resources'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((resource) => (
                          <ResourceCard key={resource.id} resource={resource} />
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </Container>
        </section>

        {/* Quick Links Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Quick Links</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {resourceTypes.slice(0, 8).map((type) => {
                  const Icon = typeIcons[type.id]
                  const count = communityStats.byType[type.id] || 0
                  return (
                    <Card
                      key={type.id}
                      className="p-4 text-center cursor-pointer hover:border-accent transition-colors"
                      onClick={() => setFilters({ ...filters, type: type.id })}
                    >
                      <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                      <div className="font-medium text-sm">{type.label}</div>
                      <div className="text-xs text-muted">{count} resources</div>
                    </Card>
                  )
                })}
              </div>

              <div className="flex justify-center mt-8 gap-3">
                <Button variant="secondary" href="/learning-paths">
                  Learning Paths
                </Button>
                <Button variant="secondary" href="/certifications">
                  Certifications
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
