'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Target,
  ShieldCheck,
  Search as SearchIcon,
  X,
  Info,
  AlertCircle,
  Zap,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ThreatDiagram from '@/components/diagrams/ThreatDiagram'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { owaspLLM2025, owaspStats, getEntryById } from '@/content/data/owasp-llm-2025'
import type { Severity } from '@/content/data/types'

// Severity configuration
const severityConfig: Record<Severity, { color: string; bg: string; icon: React.ElementType }> = {
  critical: { color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/10', icon: AlertTriangle },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Info },
  low: { color: 'text-green-400', bg: 'bg-green-500/10', icon: ShieldCheck },
}

export default function OWASPInteractivePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>('overview')

  const selectedEntry = selectedId ? getEntryById(selectedId) : null

  // Detail panel sections
  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'examples', label: 'Examples', icon: AlertTriangle },
    { id: 'components', label: 'Affected Components', icon: Target },
    { id: 'prevention', label: 'Prevention', icon: ShieldCheck },
    { id: 'detection', label: 'Detection', icon: SearchIcon },
    { id: 'resources', label: 'Resources', icon: ExternalLink },
  ]

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
                <Shield className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  OWASP LLM Top 10 (2025)
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Interactive exploration of the most critical security risks in Large Language Model
                applications. Click on any threat to explore details, mitigations, and resources.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-text font-medium">{owaspStats.bySeverity.critical}</span>
                  <span className="text-muted">Critical</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <span className="text-text font-medium">{owaspStats.bySeverity.high}</span>
                  <span className="text-muted">High</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{owaspStats.newEntries}</span>
                  <span className="text-muted">New in 2025</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Threat Diagram */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <Card className="p-4 overflow-hidden">
                  <h2 className="text-lg font-semibold mb-4">Threat Landscape</h2>
                  <ThreatDiagram
                    entries={owaspLLM2025}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                  <p className="text-xs text-muted mt-4 text-center">
                    Click on any node to view detailed information
                  </p>
                </Card>

                {/* Quick List */}
                <Card className="p-4 mt-4">
                  <h3 className="text-sm font-semibold mb-3">All Threats</h3>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {owaspLLM2025.map((entry) => {
                      const config = severityConfig[entry.severity]
                      const isSelected = selectedId === entry.id
                      return (
                        <button
                          key={entry.id}
                          onClick={() => setSelectedId(isSelected ? null : entry.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                            isSelected
                              ? 'bg-accent/10 text-accent'
                              : 'hover:bg-panel text-text'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${config.bg} ${config.color}`}
                          >
                            {entry.rank}
                          </span>
                          <span className="flex-1 text-sm truncate">{entry.title}</span>
                          <Badge
                            variant={
                              entry.severity === 'critical'
                                ? 'danger'
                                : entry.severity === 'high'
                                ? 'warning'
                                : 'secondary'
                            }
                            size="sm"
                          >
                            {entry.severity}
                          </Badge>
                        </button>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* Detail Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <AnimatePresence mode="wait">
                  {selectedEntry ? (
                    <motion.div
                      key={selectedEntry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {/* Header */}
                      <Card className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 py-1 rounded text-sm font-bold ${
                                  severityConfig[selectedEntry.severity].bg
                                } ${severityConfig[selectedEntry.severity].color}`}
                              >
                                {selectedEntry.id}
                              </span>
                              <Badge
                                variant={
                                  selectedEntry.severity === 'critical'
                                    ? 'danger'
                                    : selectedEntry.severity === 'high'
                                    ? 'warning'
                                    : 'secondary'
                                }
                              >
                                {selectedEntry.severity}
                              </Badge>
                              {selectedEntry.changesFrom2023?.changeType === 'new' && (
                                <Badge variant="primary">New in 2025</Badge>
                              )}
                            </div>
                            <h2 className="text-2xl font-bold">{selectedEntry.title}</h2>
                          </div>
                          <button
                            onClick={() => setSelectedId(null)}
                            className="p-2 text-muted hover:text-text transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-muted">{selectedEntry.description}</p>

                        {/* Changes from 2023 */}
                        {selectedEntry.changesFrom2023 && (
                          <div className="mt-4 p-3 bg-panel rounded-lg border border-border">
                            <div className="text-xs font-medium text-muted mb-1">
                              Changes from 2023
                            </div>
                            <p className="text-sm text-text">
                              {selectedEntry.changesFrom2023.changeDescription}
                              {selectedEntry.changesFrom2023.previousRank && (
                                <span className="text-muted">
                                  {' '}
                                  (Previously #{selectedEntry.changesFrom2023.previousRank})
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </Card>

                      {/* Section Navigation */}
                      <div className="flex flex-wrap gap-2">
                        {sections.map((section) => {
                          const Icon = section.icon
                          return (
                            <button
                              key={section.id}
                              onClick={() =>
                                setExpandedSection(
                                  expandedSection === section.id ? null : section.id
                                )
                              }
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                expandedSection === section.id
                                  ? 'bg-accent text-white'
                                  : 'bg-surface border border-border text-muted hover:text-text'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              {section.label}
                            </button>
                          )
                        })}
                      </div>

                      {/* Section Content */}
                      <AnimatePresence mode="wait">
                        {expandedSection && (
                          <motion.div
                            key={expandedSection}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <Card className="p-6">
                              {expandedSection === 'overview' && (
                                <div>
                                  <h3 className="font-semibold mb-3">Overview</h3>
                                  <p className="text-muted whitespace-pre-line">
                                    {selectedEntry.overview}
                                  </p>
                                </div>
                              )}

                              {expandedSection === 'examples' && (
                                <div>
                                  <h3 className="font-semibold mb-3">Common Examples</h3>
                                  <ul className="space-y-2">
                                    {selectedEntry.commonExamples.map((example, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start gap-2 text-sm text-muted"
                                      >
                                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        {example}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {expandedSection === 'components' && (
                                <div>
                                  <h3 className="font-semibold mb-3">Affected Components</h3>
                                  <div className="space-y-3">
                                    {selectedEntry.affectedComponents.map((comp, idx) => {
                                      const riskConfig = severityConfig[comp.riskLevel]
                                      return (
                                        <div
                                          key={idx}
                                          className="p-3 bg-panel rounded-lg border border-border"
                                        >
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-text">
                                              {comp.component}
                                            </span>
                                            <span
                                              className={`px-1.5 py-0.5 text-xs rounded ${riskConfig.bg} ${riskConfig.color}`}
                                            >
                                              {comp.riskLevel}
                                            </span>
                                          </div>
                                          <p className="text-sm text-muted">{comp.description}</p>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              {expandedSection === 'prevention' && (
                                <div>
                                  <h3 className="font-semibold mb-3">Prevention Strategies</h3>
                                  <ul className="space-y-2">
                                    {selectedEntry.preventionStrategies.map((strategy, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start gap-2 text-sm text-muted"
                                      >
                                        <ShieldCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                        {strategy}
                                      </li>
                                    ))}
                                  </ul>

                                  {selectedEntry.mitigations.length > 0 && (
                                    <>
                                      <h3 className="font-semibold mt-6 mb-3">Mitigations</h3>
                                      <ul className="space-y-2">
                                        {selectedEntry.mitigations.map((mitigation, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-start gap-2 text-sm text-muted"
                                          >
                                            <Target className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                            {mitigation}
                                          </li>
                                        ))}
                                      </ul>
                                    </>
                                  )}
                                </div>
                              )}

                              {expandedSection === 'detection' && (
                                <div>
                                  <h3 className="font-semibold mb-3">Detection Methods</h3>
                                  <ul className="space-y-2">
                                    {selectedEntry.detectionMethods.map((method, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start gap-2 text-sm text-muted"
                                      >
                                        <SearchIcon className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        {method}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {expandedSection === 'resources' && (
                                <div>
                                  <h3 className="font-semibold mb-3">Resources & References</h3>

                                  {/* OWASP/MITRE References */}
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedEntry.references.mitreAtlas && (
                                      <Badge variant="outline">
                                        MITRE: {selectedEntry.references.mitreAtlas}
                                      </Badge>
                                    )}
                                    {selectedEntry.references.cwe?.map((cwe) => (
                                      <Badge key={cwe} variant="outline">
                                        {cwe}
                                      </Badge>
                                    ))}
                                  </div>

                                  {/* External Links */}
                                  {selectedEntry.resources.length > 0 && (
                                    <div className="space-y-2">
                                      {selectedEntry.resources.map((resource, idx) => (
                                        <a
                                          key={idx}
                                          href={resource.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2 p-3 bg-panel rounded-lg border border-border hover:border-accent transition-colors"
                                        >
                                          <ExternalLink className="w-4 h-4 text-accent" />
                                          <span className="flex-1 text-sm text-text">
                                            {resource.label}
                                          </span>
                                          {resource.type && (
                                            <Badge variant="secondary" size="sm">
                                              {resource.type}
                                            </Badge>
                                          )}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex items-center justify-center min-h-[400px]"
                    >
                      <div className="text-center">
                        <Shield className="w-16 h-16 text-muted mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Select a Threat</h3>
                        <p className="text-muted max-w-md">
                          Click on any node in the diagram or select from the list to explore
                          detailed information about each OWASP LLM Top 10 vulnerability.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Quick Reference Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Quick Reference</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {owaspLLM2025.slice(0, 5).map((entry) => {
                  const config = severityConfig[entry.severity]
                  return (
                    <Card
                      key={entry.id}
                      className="p-4 cursor-pointer"
                      hoverable
                      onClick={() => setSelectedId(entry.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${config.bg} ${config.color}`}
                        >
                          {entry.rank}
                        </span>
                        <span className="text-xs text-muted">{entry.id}</span>
                      </div>
                      <h3 className="font-medium text-sm mb-1">{entry.title}</h3>
                      <p className="text-xs text-muted line-clamp-2">{entry.description}</p>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
