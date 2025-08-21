'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Calendar, ChevronRight, ExternalLink, TrendingUp, AlertTriangle, Clock, CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { 
  researchPapers, 
  criticalGaps, 
  implementationRoadmap,
  governanceRecommendations,
  practicalResources,
  caseStudies 
} from '@/content/data/ai-security-research'

export default function ResearchPage() {
  const [selectedGap, setSelectedGap] = useState<number | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'danger'
      case 'high': return 'warning'
      case 'medium': return 'secondary'
      case 'optimization': return 'success'
      default: return 'outline'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-danger'
      case 'high': return 'text-warning'
      default: return 'text-secondary'
    }
  }

  return (
    <>
      <AnimeBackground variant="rings" />
      <Navbar />
      
      <main className="pt-16">
        <section className="section-padding">
          <Container>
            <SectionHeader
              badge="AI Security Research"
              title="Comprehensive AI Security Analysis"
              subtitle="Industry-leading research comparing frameworks, identifying gaps, and providing actionable recommendations"
            />
            
            <Tabs defaultValue="papers" className="mt-12">
              <TabsList>
                <TabsTrigger value="papers">Research Papers</TabsTrigger>
                <TabsTrigger value="gaps">Critical Gaps</TabsTrigger>
                <TabsTrigger value="roadmap">Implementation</TabsTrigger>
                <TabsTrigger value="governance">Governance</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="cases">Case Studies</TabsTrigger>
              </TabsList>

              <TabsContent value="papers">
                <div className="space-y-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Latest AI Security Research</h2>
                    <Badge variant="primary" size="lg">{researchPapers.length} Papers</Badge>
                  </div>
                  <motion.div
                    className="grid gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {researchPapers.map((paper, index) => (
                      <motion.div key={index} variants={fadeInUp}>
                        <Card variant="elevated" className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-3 mb-3">
                                <Badge variant="primary" size="sm">
                                  {paper.category}
                                </Badge>
                                <span className="text-sm text-muted flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {paper.date}
                                </span>
                                <span className="text-sm text-muted flex items-center gap-1">
                                  <Download className="w-3 h-3" />
                                  {paper.downloads} downloads
                                </span>
                              </div>
                              <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                              <p className="text-sm text-muted mb-3">By {paper.authors}</p>
                              <p className="text-muted mb-4">{paper.abstract}</p>
                              {paper.highlights && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-accent">Key Highlights:</p>
                                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {paper.highlights.map((highlight, idx) => (
                                      <li key={idx} className="text-sm text-muted flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                        {highlight}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              {paper.paperUrl && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  icon={FileText}
                                  onClick={() => window.open(paper.paperUrl, '_blank')}
                                >
                                  View Paper
                                </Button>
                              )}
                              {paper.pdfUrl && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  icon={Download}
                                  onClick={() => window.open(paper.pdfUrl, '_blank')}
                                >
                                  PDF
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="gaps">
                <div className="space-y-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Critical Security Gaps</h2>
                    <Badge variant="danger" size="lg">{criticalGaps.length} Gap Areas</Badge>
                  </div>
                  <motion.div
                    className="grid gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {criticalGaps.map((gap, index) => {
                      const Icon = gap.icon
                      const isExpanded = selectedGap === index
                      
                      return (
                        <motion.div key={index} variants={fadeInUp}>
                          <Card 
                            variant="elevated" 
                            className="p-6 cursor-pointer border-l-4 border-l-danger"
                            onClick={() => setSelectedGap(isExpanded ? null : index)}
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-danger/10 text-danger">
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-xl font-semibold">{gap.category}</h3>
                                  <Badge variant="danger" size="sm">
                                    {gap.severity}
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <p className="text-sm font-medium text-danger mb-2">Identified Gaps:</p>
                                    <ul className="space-y-2">
                                      {gap.gaps.map((item, idx) => (
                                        <li key={idx} className="text-sm text-muted flex items-start gap-2">
                                          <AlertTriangle className="w-4 h-4 text-danger mt-0.5" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                    >
                                      <p className="text-sm font-medium text-success mb-2">Recommendations:</p>
                                      <ul className="space-y-2">
                                        {gap.recommendations.map((rec, idx) => (
                                          <li key={idx} className="text-sm text-muted flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                                            {rec}
                                          </li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="roadmap">
                <div className="space-y-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Implementation Roadmap</h2>
                    <Badge variant="success" size="lg">{implementationRoadmap.length} Phases</Badge>
                  </div>
                  <motion.div
                    className="grid gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {implementationRoadmap.map((phase, index) => {
                      const Icon = phase.icon
                      
                      return (
                        <motion.div key={index} variants={fadeInUp}>
                          <Card variant="elevated" className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                  <h3 className="text-xl font-semibold">{phase.phase}</h3>
                                  <Badge variant={getPriorityColor(phase.priority) as any} size="sm">
                                    {phase.priority}
                                  </Badge>
                                  <span className="text-sm text-muted flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {phase.duration}
                                  </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <p className="text-sm font-medium text-accent mb-2">Key Tasks:</p>
                                    <ul className="space-y-2">
                                      {phase.tasks.map((task, idx) => (
                                        <li key={idx} className="text-sm text-muted flex items-start gap-2">
                                          <ChevronRight className="w-4 h-4 text-accent mt-0.5" />
                                          {task}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-success mb-2">Expected Outcome:</p>
                                    <p className="text-sm text-muted bg-success/10 p-3 rounded-lg">
                                      {phase.expectedOutcome}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="governance">
                <div className="space-y-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Governance Recommendations</h2>
                    <Badge variant="primary" size="lg">{governanceRecommendations.length} Areas</Badge>
                  </div>
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {governanceRecommendations.map((gov, index) => {
                      const Icon = gov.icon
                      
                      return (
                        <motion.div key={index} variants={fadeInUp}>
                          <Card variant="elevated" className="h-full p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold">{gov.area}</h3>
                                <Badge variant="secondary" size="sm">{gov.maturityLevel}</Badge>
                              </div>
                            </div>
                            
                            <ul className="space-y-2">
                              {gov.recommendations.map((rec, idx) => (
                                <li key={idx} className="text-sm text-muted flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="resources">
                <div className="space-y-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Practical Resources</h2>
                    <Badge variant="success" size="lg">{practicalResources.length} Categories</Badge>
                  </div>
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {practicalResources.map((resource, index) => {
                      const Icon = resource.icon
                      
                      return (
                        <motion.div key={index} variants={fadeInUp}>
                          <Card variant="elevated" hoverable className="h-full p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-lg bg-success/10 text-success">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">{resource.category}</h3>
                                <p className="text-xs text-muted">{resource.format}</p>
                              </div>
                            </div>
                            
                            <ul className="space-y-2">
                              {resource.resources.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted flex items-start gap-2">
                                  <Download className="w-4 h-4 text-success mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                            
                            {resource.url && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                fullWidth 
                                className="mt-4"
                                onClick={() => window.open(resource.url, '_blank')}
                              >
                                Access Resources
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                          </Card>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="cases">
                <div className="space-y-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Industry Case Studies</h2>
                    <Badge variant="primary" size="lg">{caseStudies.length} Cases</Badge>
                  </div>
                  <motion.div
                    className="grid gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {caseStudies.map((study, index) => {
                      const Icon = study.icon
                      
                      return (
                        <motion.div key={index} variants={fadeInUp}>
                          <Card variant="elevated" className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              <div className="lg:col-span-2">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                    <Icon className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-semibold">{study.title}</h3>
                                    <Badge variant="outline" size="sm">{study.industry}</Badge>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-sm font-medium text-danger">Challenge:</span>
                                    <p className="text-sm text-muted mt-1">{study.challenge}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-accent">Solution:</span>
                                    <p className="text-sm text-muted mt-1">{study.solution}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-success">Result:</span>
                                    <p className="text-sm text-muted mt-1">{study.result}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-panel rounded-lg p-4">
                                <h4 className="text-sm font-semibold mb-3 text-accent">Key Metrics</h4>
                                <div className="space-y-3">
                                  {Object.entries(study.metrics).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center">
                                      <span className="text-xs text-muted capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                                      </span>
                                      <span className="text-sm font-medium text-success">{value}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="space-y-2">
                                  {study.caseUrl && (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      fullWidth 
                                      onClick={() => window.open(study.caseUrl, '_blank')}
                                    >
                                      View Case Study
                                      <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                  )}
                                  {study.reportUrl && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      fullWidth
                                      onClick={() => window.open(study.reportUrl, '_blank')}
                                    >
                                      Technical Report
                                      <FileText className="w-4 h-4 ml-2" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}