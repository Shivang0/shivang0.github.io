'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertTriangle, TrendingUp, Shield, Award, Globe, BookOpen, ExternalLink, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { frameworks } from '@/content/data/ai-security-research'

const standards = [
  {
    id: 'nist-ai-rmf',
    title: 'NIST AI Risk Management Framework 1.0',
    organization: 'National Institute of Standards and Technology',
    year: '2023',
    icon: Shield,
    coverage: 92,
    description: 'Comprehensive framework for managing risks throughout the AI lifecycle',
    keyComponents: [
      {
        name: 'GOVERN',
        description: 'Cultivate a culture of risk management',
        items: ['Policies', 'Accountability', 'Culture', 'Workforce']
      },
      {
        name: 'MAP',
        description: 'Categorize AI system and identify risks',
        items: ['Context', 'Risks', 'Impacts', 'Dependencies']
      },
      {
        name: 'MEASURE',
        description: 'Assess and track AI risks',
        items: ['Performance', 'Reliability', 'Fairness', 'Privacy']
      },
      {
        name: 'MANAGE',
        description: 'Prioritize and respond to AI risks',
        items: ['Response', 'Recovery', 'Communication', 'Improvement']
      }
    ],
    resources: [
      { type: 'Framework Document', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf' },
      { type: 'Playbook', url: 'https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook' },
      { type: 'Crosswalk', url: 'https://airc.nist.gov/AI_RMF_Knowledge_Base/Crosswalk' }
    ]
  },
  {
    id: 'iso-23053',
    title: 'ISO/IEC 23053:2022',
    organization: 'International Organization for Standardization',
    year: '2022',
    icon: Globe,
    coverage: 88,
    description: 'Framework for AI systems using machine learning',
    keyComponents: [
      {
        name: 'AI System Lifecycle',
        description: 'End-to-end process management',
        items: ['Inception', 'Design', 'Development', 'Deployment', 'Monitoring']
      },
      {
        name: 'Data Management',
        description: 'Data quality and governance',
        items: ['Collection', 'Processing', 'Annotation', 'Validation']
      },
      {
        name: 'Model Development',
        description: 'ML model creation and validation',
        items: ['Training', 'Evaluation', 'Selection', 'Integration']
      },
      {
        name: 'System Validation',
        description: 'Testing and quality assurance',
        items: ['Functional', 'Performance', 'Robustness', 'Safety']
      }
    ],
    resources: [
      { type: 'Standard', url: 'https://www.iso.org/standard/74438.html' },
      { type: 'Technical Report', url: 'https://www.iso.org/standard/74439.html' }
    ]
  },
  {
    id: 'iso-23894',
    title: 'ISO/IEC 23894:2023',
    organization: 'International Organization for Standardization',
    year: '2023',
    icon: Globe,
    coverage: 85,
    description: 'AI risk management guidelines',
    keyComponents: [
      {
        name: 'Risk Identification',
        description: 'Systematic risk discovery',
        items: ['Technical', 'Ethical', 'Legal', 'Social']
      },
      {
        name: 'Risk Analysis',
        description: 'Comprehensive risk assessment',
        items: ['Likelihood', 'Impact', 'Vulnerability', 'Exposure']
      },
      {
        name: 'Risk Evaluation',
        description: 'Risk prioritization and decisions',
        items: ['Severity', 'Acceptability', 'Trade-offs', 'Thresholds']
      },
      {
        name: 'Risk Treatment',
        description: 'Mitigation and control measures',
        items: ['Avoidance', 'Reduction', 'Transfer', 'Acceptance']
      }
    ],
    resources: [
      { type: 'Standard', url: 'https://www.iso.org/standard/77304.html' },
      { type: 'Guidelines', url: 'https://www.iso.org/committee/6794475.html' }
    ]
  },
  {
    id: 'ieee-7000',
    title: 'IEEE 7000-2021',
    organization: 'Institute of Electrical and Electronics Engineers',
    year: '2021',
    icon: Award,
    coverage: 82,
    description: 'Model process for addressing ethical concerns during system design',
    keyComponents: [
      {
        name: 'Ethical Value Elicitation',
        description: 'Identify stakeholder values',
        items: ['Stakeholder Analysis', 'Value Identification', 'Prioritization', 'Documentation']
      },
      {
        name: 'Ethical Requirements',
        description: 'Transform values into requirements',
        items: ['Value Translation', 'Requirement Specification', 'Validation', 'Traceability']
      },
      {
        name: 'Ethical Risk Analysis',
        description: 'Assess ethical implications',
        items: ['Risk Scenarios', 'Impact Assessment', 'Mitigation Strategies', 'Monitoring']
      }
    ],
    resources: [
      { type: 'Standard', url: 'https://standards.ieee.org/standard/7000-2021.html' },
      { type: 'Implementation Guide', url: 'https://ethicsinaction.ieee.org/' }
    ]
  },
  {
    id: 'eu-ai-act',
    title: 'EU AI Act',
    organization: 'European Union',
    year: '2024',
    icon: Globe,
    coverage: 90,
    description: 'Comprehensive regulatory framework for AI systems in the EU',
    keyComponents: [
      {
        name: 'Risk Categories',
        description: 'Four-tier risk classification',
        items: ['Unacceptable Risk', 'High Risk', 'Limited Risk', 'Minimal Risk']
      },
      {
        name: 'Compliance Requirements',
        description: 'Mandatory obligations',
        items: ['Conformity Assessment', 'CE Marking', 'Documentation', 'Registration']
      },
      {
        name: 'Governance Structure',
        description: 'Regulatory oversight',
        items: ['AI Board', 'National Authorities', 'Notified Bodies', 'Sandboxes']
      }
    ],
    resources: [
      { type: 'Legal Text', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021PC0206' },
      { type: 'Compliance Guide', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' }
    ]
  },
  {
    id: 'owasp-top-10',
    title: 'OWASP Top 10 for LLM Applications',
    organization: 'Open Web Application Security Project',
    year: '2024',
    icon: Shield,
    coverage: 88,
    description: 'Security and safety risks in LLM applications',
    keyComponents: [
      {
        name: 'Top Vulnerabilities',
        description: 'Critical security risks',
        items: ['Prompt Injection', 'Data Leakage', 'Inadequate Sandboxing', 'Unauthorized Code Execution']
      },
      {
        name: 'Mitigation Strategies',
        description: 'Security controls',
        items: ['Input Validation', 'Output Encoding', 'Access Control', 'Monitoring']
      }
    ],
    resources: [
      { type: 'Documentation', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
      { type: 'GitHub', url: 'https://github.com/OWASP/www-project-top-10-for-large-language-model-applications' }
    ]
  }
]

const complianceMatrix = [
  { category: 'Governance & Strategy', nist: 95, iso: 88, owasp: 85, eu: 92, ieee: 90 },
  { category: 'Risk Management', nist: 98, iso: 92, owasp: 88, eu: 85, ieee: 82 },
  { category: 'Data Protection', nist: 85, iso: 90, owasp: 82, eu: 98, ieee: 95 },
  { category: 'Model Security', nist: 88, iso: 85, owasp: 95, eu: 78, ieee: 80 },
  { category: 'Transparency', nist: 82, iso: 78, owasp: 75, eu: 95, ieee: 92 },
  { category: 'Human Oversight', nist: 90, iso: 85, owasp: 70, eu: 98, ieee: 88 },
]

export default function StandardsPage() {
  const [selectedFramework, setSelectedFramework] = useState<number | null>(null)
  const [expandedStandard, setExpandedStandard] = useState<string | null>(null)

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-success'
    if (score >= 80) return 'text-warning'
    if (score >= 70) return 'text-accent'
    return 'text-danger'
  }

  return (
    <>
      <AnimeBackground variant="rings" />
      <Navbar />
      
      <main className="pt-16">
        <section className="py-12 bg-surface border-b border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
                <FileText className="w-8 h-8 text-accent" />
                <h1 className="text-2xl sm:text-display-2 font-display font-bold">
                  AI Security Standards & Frameworks
                </h1>
              </div>
              <p className="text-base sm:text-lg text-muted mb-8 px-4 sm:px-0">
                International standards, regulatory frameworks, and industry best practices for AI/ML security
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-0">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{standards.length + frameworks.length}</div>
                  <div className="text-sm text-muted">Total Standards</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">87%</div>
                  <div className="text-sm text-muted">Avg Coverage</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">2024</div>
                  <div className="text-sm text-muted">Latest Updates</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">150+</div>
                  <div className="text-sm text-muted">Requirements</div>
                </Card>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <Tabs defaultValue="standards" className="space-y-8">
              <TabsList>
                <TabsTrigger value="standards">ISO & Regulatory Standards</TabsTrigger>
                <TabsTrigger value="frameworks">Industry Frameworks</TabsTrigger>
                <TabsTrigger value="compliance">Compliance Matrix</TabsTrigger>
              </TabsList>

              <TabsContent value="standards">
                <motion.div
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {standards.map((standard) => {
                    const Icon = standard.icon
                    const isExpanded = expandedStandard === standard.id
                    
                    return (
                      <motion.div key={standard.id} variants={fadeInUp}>
                        <Card 
                          variant="elevated"
                          className="overflow-hidden cursor-pointer"
                          onClick={() => setExpandedStandard(isExpanded ? null : standard.id)}
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                  <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-semibold">{standard.title}</h3>
                                    <Badge variant="outline" size="sm">{standard.year}</Badge>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-muted">Coverage:</span>
                                      <span className={cn(
                                        "text-sm font-semibold",
                                        getComplianceColor(standard.coverage)
                                      )}>
                                        {standard.coverage}%
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted mb-1">{standard.organization}</p>
                                  <p className="text-muted">{standard.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-muted" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-muted" />
                                )}
                              </div>
                            </div>
                            
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-6 pt-6 border-t border-border"
                              >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                  {standard.keyComponents.map((component, idx) => (
                                    <div key={idx} className="space-y-2">
                                      <h4 className="font-semibold text-accent">{component.name}</h4>
                                      <p className="text-sm text-muted">{component.description}</p>
                                      <ul className="grid grid-cols-2 gap-2">
                                        {component.items.map((item, itemIdx) => (
                                          <li key={itemIdx} className="text-sm text-muted flex items-center gap-2">
                                            <CheckCircle className="w-3 h-3 text-success" />
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {standard.resources.map((resource, idx) => (
                                    <Button
                                      key={idx}
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        window.open(resource.url, '_blank')
                                      }}
                                    >
                                      {resource.type}
                                      <ExternalLink className="w-3 h-3 ml-2" />
                                    </Button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </TabsContent>

              <TabsContent value="frameworks">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Industry Framework Comparison</h2>
                    <Badge variant="secondary" size="lg">{frameworks.length} Frameworks</Badge>
                  </div>
                  <motion.div
                    className="grid gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {frameworks.map((framework, index) => {
                      const Icon = framework.icon
                      const isExpanded = selectedFramework === index
                      
                      return (
                        <motion.div key={index} variants={fadeInUp}>
                          <Card 
                            variant="elevated" 
                            className="p-6 cursor-pointer transition-all"
                            onClick={() => setSelectedFramework(isExpanded ? null : index)}
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                  <div>
                                    <h3 className="text-xl font-semibold">{framework.name}</h3>
                                    <p className="text-sm text-muted">{framework.organization}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">{framework.coverage}</Badge>
                                    {framework.url && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(framework.url, '_blank');
                                        }}
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <p className="text-muted mb-4">{framework.description}</p>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="space-y-3 pt-4 border-t border-border"
                                  >
                                    <p className="text-sm font-medium text-accent">Key Strengths:</p>
                                    <ul className="space-y-2">
                                      {framework.strengths.map((strength, idx) => (
                                        <li key={idx} className="text-sm text-muted flex items-start gap-2">
                                          <ChevronRight className="w-4 h-4 text-accent mt-0.5" />
                                          {strength}
                                        </li>
                                      ))}
                                    </ul>
                                    {framework.docsUrl && (
                                      <div className="pt-4">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(framework.docsUrl, '_blank');
                                          }}
                                        >
                                          View Documentation
                                          <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                      </div>
                                    )}
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="compliance">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Compliance Coverage Matrix</h2>
                  <Card variant="elevated" className="p-6 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4">Category</th>
                          <th className="text-center py-3 px-4">NIST</th>
                          <th className="text-center py-3 px-4">ISO</th>
                          <th className="text-center py-3 px-4">OWASP</th>
                          <th className="text-center py-3 px-4">EU AI Act</th>
                          <th className="text-center py-3 px-4">IEEE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complianceMatrix.map((row, idx) => (
                          <tr key={idx} className="border-b border-border/50">
                            <td className="py-3 px-4 font-medium">{row.category}</td>
                            <td className={cn("text-center py-3 px-4 font-semibold", getComplianceColor(row.nist))}>
                              {row.nist}%
                            </td>
                            <td className={cn("text-center py-3 px-4 font-semibold", getComplianceColor(row.iso))}>
                              {row.iso}%
                            </td>
                            <td className={cn("text-center py-3 px-4 font-semibold", getComplianceColor(row.owasp))}>
                              {row.owasp}%
                            </td>
                            <td className={cn("text-center py-3 px-4 font-semibold", getComplianceColor(row.eu))}>
                              {row.eu}%
                            </td>
                            <td className={cn("text-center py-3 px-4 font-semibold", getComplianceColor(row.ieee))}>
                              {row.ieee}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Card className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-success" />
                        <h3 className="font-semibold">Strengths</h3>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-muted">Strong risk management coverage (91% avg)</li>
                        <li className="text-sm text-muted">Comprehensive data protection (90% avg)</li>
                        <li className="text-sm text-muted">Robust human oversight requirements</li>
                      </ul>
                    </Card>
                    
                    <Card className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-warning" />
                        <h3 className="font-semibold">Gaps</h3>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-muted">Inconsistent transparency requirements</li>
                        <li className="text-sm text-muted">Varying model security standards</li>
                        <li className="text-sm text-muted">Limited technical implementation guidance</li>
                      </ul>
                    </Card>
                    
                    <Card className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="w-6 h-6 text-accent" />
                        <h3 className="font-semibold">Recommendations</h3>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-muted">Adopt multi-framework approach</li>
                        <li className="text-sm text-muted">Prioritize risk-based compliance</li>
                        <li className="text-sm text-muted">Implement continuous monitoring</li>
                      </ul>
                    </Card>
                  </div>
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