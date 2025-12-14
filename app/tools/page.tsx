'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Wrench,
  Github,
  Globe,
  Shield,
  Lock,
  Cpu,
  Database,
  Zap,
  ExternalLink,
  Star,
  Brain,
  Search,
  Eye,
  Target,
  Bug,
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
  securityTools,
  toolCategories,
  toolStats,
  getToolsByCategory,
  type ToolCategory,
  type SecurityTool,
} from '@/content/data/tools'

// Icon mapping for categories
const categoryIcons: Record<ToolCategory, React.ComponentType<{ className?: string }>> = {
  'red-teaming': Target,
  'vulnerability-scanner': Shield,
  'llm-defense': Brain,
  'adversarial-testing': Zap,
  evaluation: Eye,
  fuzzing: Bug,
  privacy: Lock,
  'model-security': Cpu,
  'supply-chain': Database,
  monitoring: Search,
}

const resources = [
  {
    title: 'OWASP Top 10 for LLM Applications',
    description: 'Comprehensive guide to the most critical security risks in LLM applications',
    url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
    type: 'Documentation',
  },
  {
    title: 'MITRE ATLAS',
    description: 'Adversarial threat landscape for AI systems',
    url: 'https://atlas.mitre.org/',
    type: 'Framework',
  },
  {
    title: 'NIST AI Risk Management Framework',
    description: 'Comprehensive framework for managing AI risks',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    type: 'Standard',
  },
  {
    title: 'AI Incident Database',
    description: 'Repository of AI failures and incidents',
    url: 'https://incidentdatabase.ai/',
    type: 'Database',
  },
  {
    title: 'Hugging Face Model Security',
    description: 'Security scanning for Hugging Face models',
    url: 'https://huggingface.co/docs/hub/security',
    type: 'Platform',
  },
  {
    title: 'Google Secure AI Framework',
    description: 'Google approach to securing AI systems',
    url: 'https://blog.google/technology/safety-security/introducing-googles-secure-ai-framework/',
    type: 'Framework',
  },
]

function ToolCard({ tool }: { tool: SecurityTool }) {
  return (
    <Card className="p-6 h-full flex flex-col" hoverable>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{tool.name}</h3>
        {tool.stars && (
          <div className="flex items-center gap-1 text-sm text-muted">
            <Star className="w-4 h-4" />
            {tool.stars}
          </div>
        )}
      </div>

      <p className="text-muted mb-4 flex-1">{tool.description}</p>

      {tool.maintainer && (
        <div className="text-xs text-muted mb-3">Maintained by {tool.maintainer}</div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {tool.tags.slice(0, 4).map((tag, tagIndex) => (
          <Badge key={tagIndex} variant="outline" size="sm">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex gap-3 mt-auto pt-2">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:text-accent-600 transition-colors text-sm"
        >
          <Globe className="w-4 h-4" />
          Website
        </a>
        {tool.github && (
          <a
            href={tool.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:text-accent-600 transition-colors text-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
      </div>
    </Card>
  )
}

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all')

  const filteredTools = useMemo(() => {
    let tools = securityTools

    if (selectedCategory !== 'all') {
      tools = tools.filter((t) => t.category === selectedCategory)
    }

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      tools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags.some((t) => t.toLowerCase().includes(searchLower))
      )
    }

    return tools
  }, [searchQuery, selectedCategory])

  const groupedTools = useMemo(() => {
    if (selectedCategory !== 'all') return null

    const groups: Record<string, SecurityTool[]> = {}
    filteredTools.forEach((tool) => {
      if (!groups[tool.category]) {
        groups[tool.category] = []
      }
      groups[tool.category].push(tool)
    })
    return groups
  }, [filteredTools, selectedCategory])

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
                <Wrench className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Tools & Resources
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Curated collection of {toolStats.totalTools} tools and frameworks for AI/ML security
                across {toolStats.categories} categories
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Wrench className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{toolStats.totalTools}</span>
                  <span className="text-muted">Tools</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Github className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{toolStats.withGithub}</span>
                  <span className="text-muted">Open Source</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Database className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{toolStats.categories}</span>
                  <span className="text-muted">Categories</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Filters Section */}
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
                  placeholder="Search tools by name, description, or tag..."
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ToolCategory | 'all')}
                  className="px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                >
                  <option value="all">All Categories</option>
                  {toolCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label} ({toolStats.byCategory[cat.id] || 0})
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-sm text-muted">
                {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>
          </Container>
        </section>

        {/* Tools Content */}
        <section className="py-12">
          <Container>
            {filteredTools.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Filter className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tools found</h3>
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
            ) : selectedCategory !== 'all' || searchQuery ? (
              // Flat view when filtered
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredTools.map((tool) => (
                  <motion.div key={tool.id} variants={fadeInUp}>
                    <ToolCard tool={tool} />
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
                {groupedTools &&
                  Object.entries(groupedTools).map(([categoryId, tools]) => {
                    const category = toolCategories.find((c) => c.id === categoryId)
                    if (!category || tools.length === 0) return null
                    const Icon = categoryIcons[categoryId as ToolCategory] || Wrench

                    return (
                      <motion.div key={categoryId} variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-accent/10 text-accent">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-semibold">{category.label}</h2>
                            <p className="text-sm text-muted">{category.description}</p>
                          </div>
                          <Badge variant="secondary" className="ml-auto">
                            {tools.length} {tools.length === 1 ? 'tool' : 'tools'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                          ))}
                        </div>
                      </motion.div>
                    )
                  })}
              </motion.div>
            )}

            {/* Additional Resources */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <Card key={index} className="p-6" hoverable>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="secondary" size="sm" className="mb-2">
                          {resource.type}
                        </Badge>
                        <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                        <p className="text-muted mb-4">{resource.description}</p>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-accent hover:text-accent-600 transition-colors"
                        >
                          Visit Resource
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
