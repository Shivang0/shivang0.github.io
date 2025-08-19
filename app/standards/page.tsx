'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertTriangle, TrendingUp, Shield, Award, Globe, BookOpen } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { cn } from '@/lib/utils'

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
        description: 'Risk assessment and prioritization',
        items: ['Likelihood', 'Impact', 'Velocity', 'Interconnection']
      },
      {
        name: 'Risk Treatment',
        description: 'Risk mitigation strategies',
        items: ['Avoidance', 'Reduction', 'Transfer', 'Acceptance']
      },
      {
        name: 'Risk Monitoring',
        description: 'Continuous risk tracking',
        items: ['Indicators', 'Thresholds', 'Reporting', 'Review']
      }
    ],
    resources: [
      { type: 'Standard', url: 'https://www.iso.org/standard/77304.html' }
    ]
  },
  {
    id: 'owasp-top10-llm',
    title: 'OWASP Top 10 for LLM Applications',
    organization: 'Open Web Application Security Project',
    year: '2024',
    icon: Shield,
    coverage: 95,
    description: 'Critical security risks for Large Language Model applications',
    keyComponents: [
      {
        name: 'LLM01: Prompt Injection',
        description: 'Manipulating LLM via crafted inputs',
        items: ['Direct injection', 'Indirect injection', 'System prompt override']
      },
      {
        name: 'LLM02: Insecure Output Handling',
        description: 'Insufficient validation of LLM outputs',
        items: ['XSS', 'SQL injection', 'Code execution', 'SSRF']
      },
      {
        name: 'LLM03: Training Data Poisoning',
        description: 'Manipulation of training data',
        items: ['Backdoors', 'Bias injection', 'Degradation attacks']
      },
      {
        name: 'LLM04: Model Denial of Service',
        description: 'Resource exhaustion attacks',
        items: ['Context window flooding', 'Recursive prompts', 'Variable-length attacks']
      }
    ],
    resources: [
      { type: 'Guide', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
      { type: 'Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/LLM_AI_Security_Checklist.html' }
    ]
  },
  {
    id: 'eu-ai-act',
    title: 'EU AI Act',
    organization: 'European Union',
    year: '2024',
    icon: Award,
    coverage: 78,
    description: 'Comprehensive AI regulation framework for the European Union',
    keyComponents: [
      {
        name: 'Risk Categories',
        description: 'AI system risk classification',
        items: ['Unacceptable risk', 'High risk', 'Limited risk', 'Minimal risk']
      },
      {
        name: 'Requirements for High-Risk AI',
        description: 'Mandatory compliance measures',
        items: ['Risk management', 'Data governance', 'Documentation', 'Human oversight']
      },
      {
        name: 'Transparency Obligations',
        description: 'Disclosure requirements',
        items: ['AI interaction disclosure', 'Emotion recognition', 'Biometric categorization', 'Deepfake labeling']
      },
      {
        name: 'Governance Structure',
        description: 'Regulatory framework',
        items: ['AI Board', 'National authorities', 'Conformity assessment', 'Market surveillance']
      }
    ],
    resources: [
      { type: 'Regulation Text', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj' },
      { type: 'Compliance Guide', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' }
    ]
  },
  {
    id: 'ieee-p7000',
    title: 'IEEE P7000 Series',
    organization: 'Institute of Electrical and Electronics Engineers',
    year: '2021-2024',
    icon: BookOpen,
    coverage: 82,
    description: 'Model process for addressing ethical concerns in system design',
    keyComponents: [
      {
        name: 'IEEE 7000-2021',
        description: 'Ethical design processes',
        items: ['Stakeholder analysis', 'Value elicitation', 'Ethical risk assessment']
      },
      {
        name: 'IEEE 7001',
        description: 'Transparency of autonomous systems',
        items: ['Transparency levels', 'Explanation interfaces', 'Audit trails']
      },
      {
        name: 'IEEE 7002',
        description: 'Data privacy process',
        items: ['Privacy by design', 'Data minimization', 'User control']
      },
      {
        name: 'IEEE 7003',
        description: 'Algorithmic bias considerations',
        items: ['Bias identification', 'Mitigation strategies', 'Impact assessment']
      }
    ],
    resources: [
      { type: 'Standards Portal', url: 'https://standards.ieee.org/industry-connections/ec/autonomous-systems/' }
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <FileText className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Standards & Compliance
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                International standards and regulatory frameworks for AI/ML security and governance
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">6</div>
                  <div className="text-sm text-muted">Major Standards</div>
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
                  <div className="text-sm text-muted">Countries</div>
                </Card>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {standards.map((standard) => {
                const Icon = standard.icon
                return (
                  <motion.div key={standard.id} variants={fadeInUp}>
                    <Card className="overflow-hidden">
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-accent/10 text-accent">
                              <Icon className="w-8 h-8" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-semibold mb-1">{standard.title}</h2>
                              <p className="text-muted">{standard.organization} • {standard.year}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-accent">{standard.coverage}%</div>
                            <div className="text-sm text-muted">Coverage</div>
                          </div>
                        </div>
                        
                        <p className="text-lg mb-8">{standard.description}</p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                          {standard.keyComponents.map((component, index) => (
                            <div key={index} className="bg-panel rounded-lg p-6">
                              <h3 className="font-semibold mb-2">{component.name}</h3>
                              <p className="text-sm text-muted mb-4">{component.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {component.items.map((item, itemIndex) => (
                                  <Badge key={itemIndex} variant="outline" size="sm">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          {standard.resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              {resource.type}
                            </a>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
            
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-8">Compliance Coverage Matrix</h2>
              
              <Card className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-4">Category</th>
                        <th className="text-center py-4 px-4">NIST</th>
                        <th className="text-center py-4 px-4">ISO</th>
                        <th className="text-center py-4 px-4">OWASP</th>
                        <th className="text-center py-4 px-4">EU AI Act</th>
                        <th className="text-center py-4 px-4">IEEE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceMatrix.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-4 px-4 font-medium">{row.category}</td>
                          <td className="text-center py-4 px-4">
                            <div className={cn(
                              "inline-flex items-center justify-center w-16 h-8 rounded-full font-semibold text-sm",
                              row.nist >= 90 ? "bg-green-500/20 text-green-400" :
                              row.nist >= 80 ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-red-500/20 text-red-400"
                            )}>
                              {row.nist}%
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <div className={cn(
                              "inline-flex items-center justify-center w-16 h-8 rounded-full font-semibold text-sm",
                              row.iso >= 90 ? "bg-green-500/20 text-green-400" :
                              row.iso >= 80 ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-red-500/20 text-red-400"
                            )}>
                              {row.iso}%
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <div className={cn(
                              "inline-flex items-center justify-center w-16 h-8 rounded-full font-semibold text-sm",
                              row.owasp >= 90 ? "bg-green-500/20 text-green-400" :
                              row.owasp >= 80 ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-red-500/20 text-red-400"
                            )}>
                              {row.owasp}%
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <div className={cn(
                              "inline-flex items-center justify-center w-16 h-8 rounded-full font-semibold text-sm",
                              row.eu >= 90 ? "bg-green-500/20 text-green-400" :
                              row.eu >= 80 ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-red-500/20 text-red-400"
                            )}>
                              {row.eu}%
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <div className={cn(
                              "inline-flex items-center justify-center w-16 h-8 rounded-full font-semibold text-sm",
                              row.ieee >= 90 ? "bg-green-500/20 text-green-400" :
                              row.ieee >= 80 ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-red-500/20 text-red-400"
                            )}>
                              {row.ieee}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500/20"></div>
                    <span className="text-sm text-muted">90%+ Coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500/20"></div>
                    <span className="text-sm text-muted">80-89% Coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500/20"></div>
                    <span className="text-sm text-muted">&lt;80% Coverage</span>
                  </div>
                </div>
              </Card>
              
              <Card className="mt-8 p-8 bg-accent/5 border-accent/20">
                <h3 className="text-xl font-semibold mb-4">Implementation Roadmap</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { phase: 'Phase 1', title: 'Assessment', duration: '2-4 weeks', tasks: ['Gap analysis', 'Risk assessment', 'Stakeholder mapping'] },
                    { phase: 'Phase 2', title: 'Planning', duration: '3-6 weeks', tasks: ['Standard selection', 'Resource allocation', 'Timeline creation'] },
                    { phase: 'Phase 3', title: 'Implementation', duration: '3-6 months', tasks: ['Process updates', 'Tool deployment', 'Training'] },
                    { phase: 'Phase 4', title: 'Validation', duration: '4-8 weeks', tasks: ['Testing', 'Auditing', 'Certification'] },
                    { phase: 'Phase 5', title: 'Monitoring', duration: 'Ongoing', tasks: ['Continuous monitoring', 'Updates', 'Improvements'] },
                    { phase: 'Phase 6', title: 'Maturity', duration: '12+ months', tasks: ['Optimization', 'Innovation', 'Leadership'] },
                  ].map((phase, index) => (
                    <div key={index} className="bg-surface rounded-lg p-6">
                      <Badge variant="primary" size="sm" className="mb-2">{phase.phase}</Badge>
                      <h4 className="font-semibold mb-1">{phase.title}</h4>
                      <p className="text-sm text-muted mb-3">{phase.duration}</p>
                      <ul className="space-y-1">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-accent" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}