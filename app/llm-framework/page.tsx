'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Shield, Brain, Zap, Lock, Eye, Terminal, Database, AlertTriangle, CheckCircle, TrendingUp, Package, ChevronRight, Download, FileText } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { cn } from '@/lib/utils'

const redTeamingFramework = [
  {
    id: 'phase1',
    phase: 'Reconnaissance & Planning',
    icon: Eye,
    color: 'text-blue-400',
    description: 'Initial assessment and strategy development',
    steps: [
      {
        id: 'R1',
        title: 'System Profiling',
        tasks: [
          'Identify model architecture and version',
          'Enumerate available tools and plugins',
          'Map API endpoints and parameters',
          'Discover rate limits and quotas',
          'Profile security controls'
        ],
        tools: ['API documentation review', 'Endpoint fuzzing', 'Version fingerprinting'],
        duration: '2-4 hours'
      },
      {
        id: 'R2',
        title: 'Attack Surface Mapping',
        tasks: [
          'Identify input vectors',
          'Map data flows',
          'Enumerate trust boundaries',
          'Document authentication mechanisms',
          'Assess third-party integrations'
        ],
        tools: ['Burp Suite', 'OWASP ZAP', 'Custom scripts'],
        duration: '4-8 hours'
      },
      {
        id: 'R3',
        title: 'Threat Modeling',
        tasks: [
          'Create attack trees',
          'Prioritize attack vectors',
          'Assess impact scenarios',
          'Define success criteria',
          'Establish rules of engagement'
        ],
        tools: ['STRIDE', 'MITRE ATLAS', 'Custom frameworks'],
        duration: '2-4 hours'
      }
    ]
  },
  {
    id: 'phase2',
    phase: 'Capability Testing',
    icon: Brain,
    color: 'text-purple-400',
    description: 'Evaluating model capabilities and boundaries',
    steps: [
      {
        id: 'C1',
        title: 'Capability Concealment Detection',
        tasks: [
          'Test for sandbagging behaviors',
          'Compare evaluation vs production performance',
          'Probe for hidden capabilities',
          'Test capability disclosure consistency',
          'Evaluate strategic deception'
        ],
        tools: ['Custom evaluation suites', 'A/B testing', 'Behavioral analysis'],
        duration: '4-6 hours'
      },
      {
        id: 'C2',
        title: 'Boundary Testing',
        tasks: [
          'Context window limits',
          'Token generation limits',
          'Knowledge cutoff probing',
          'Language capability assessment',
          'Multi-modal capability testing'
        ],
        tools: ['Automated test harnesses', 'Boundary fuzzing', 'Edge case generators'],
        duration: '3-5 hours'
      },
      {
        id: 'C3',
        title: 'Emergent Behavior Analysis',
        tasks: [
          'Test for unexpected capabilities',
          'Identify emergent patterns',
          'Assess chain-of-thought reasoning',
          'Evaluate self-modification attempts',
          'Monitor for goal modification'
        ],
        tools: ['Behavioral monitoring', 'Pattern analysis', 'Anomaly detection'],
        duration: '6-8 hours'
      }
    ]
  },
  {
    id: 'phase3',
    phase: 'Prompt Injection & Jailbreaking',
    icon: Terminal,
    color: 'text-green-400',
    description: 'Testing prompt-based attack vectors',
    steps: [
      {
        id: 'P1',
        title: 'Direct Injection Attacks',
        tasks: [
          'System prompt override attempts',
          'Instruction hierarchy manipulation',
          'Context confusion attacks',
          'Role-playing exploits',
          'Authority impersonation'
        ],
        tools: ['Garak', 'Custom prompt libraries', 'Fuzzing tools'],
        duration: '4-6 hours'
      },
      {
        id: 'P2',
        title: 'Encoding & Obfuscation',
        tasks: [
          'Base64/Unicode bypass attempts',
          'Language switching attacks',
          'Homoglyph substitution',
          'Zero-width character injection',
          'Cipher-based encoding'
        ],
        tools: ['Encoding libraries', 'Character manipulation tools', 'Custom scripts'],
        duration: '3-4 hours'
      },
      {
        id: 'P3',
        title: 'Multi-Turn Attacks',
        tasks: [
          'Gradual context poisoning',
          'Trust building exploitation',
          'Memory manipulation',
          'Conversation hijacking',
          'Persistent state attacks'
        ],
        tools: ['Conversation simulators', 'State tracking tools', 'Attack chains'],
        duration: '5-7 hours'
      }
    ]
  },
  {
    id: 'phase4',
    phase: 'Data & Privacy Attacks',
    icon: Database,
    color: 'text-orange-400',
    description: 'Testing data extraction and privacy boundaries',
    steps: [
      {
        id: 'D1',
        title: 'Training Data Extraction',
        tasks: [
          'Membership inference attacks',
          'Training data reconstruction',
          'PII extraction attempts',
          'Model inversion attacks',
          'Memorization exploitation'
        ],
        tools: ['Privacy meter', 'Extraction frameworks', 'Statistical analysis'],
        duration: '6-8 hours'
      },
      {
        id: 'D2',
        title: 'Cross-User Data Leakage',
        tasks: [
          'Session isolation testing',
          'Cache poisoning attempts',
          'Shared state exploitation',
          'Context bleed assessment',
          'Tenant isolation verification'
        ],
        tools: ['Multi-user simulators', 'Session analyzers', 'Isolation testers'],
        duration: '4-6 hours'
      },
      {
        id: 'D3',
        title: 'Credential & Secret Extraction',
        tasks: [
          'API key extraction attempts',
          'Password disclosure testing',
          'Token leakage assessment',
          'Configuration extraction',
          'Environment variable probing'
        ],
        tools: ['Secret scanners', 'Regex patterns', 'Extraction scripts'],
        duration: '3-5 hours'
      }
    ]
  },
  {
    id: 'phase5',
    phase: 'Tool & Integration Exploitation',
    icon: Package,
    color: 'text-red-400',
    description: 'Testing tool use and integration vulnerabilities',
    steps: [
      {
        id: 'T1',
        title: 'Tool Misuse & Abuse',
        tasks: [
          'Command injection testing',
          'Tool chaining exploits',
          'Permission escalation',
          'Rate limit bypass',
          'Resource exhaustion'
        ],
        tools: ['Tool fuzzers', 'Injection payloads', 'Chain builders'],
        duration: '5-7 hours'
      },
      {
        id: 'T2',
        title: 'Plugin/Extension Security',
        tasks: [
          'Malicious plugin testing',
          'Plugin interaction vulnerabilities',
          'Supply chain assessment',
          'Permission boundary testing',
          'Plugin isolation verification'
        ],
        tools: ['Plugin analyzers', 'Dependency scanners', 'Sandbox escapes'],
        duration: '4-6 hours'
      },
      {
        id: 'T3',
        title: 'External Service Attacks',
        tasks: [
          'SSRF exploitation',
          'API abuse scenarios',
          'Third-party service manipulation',
          'Webhook vulnerabilities',
          'External data poisoning'
        ],
        tools: ['SSRF payloads', 'API fuzzers', 'Service simulators'],
        duration: '5-6 hours'
      }
    ]
  },
  {
    id: 'phase6',
    phase: 'Adversarial & Evasion',
    icon: Zap,
    color: 'text-yellow-400',
    description: 'Advanced adversarial techniques and evasion',
    steps: [
      {
        id: 'A1',
        title: 'Adversarial Input Generation',
        tasks: [
          'Gradient-based attacks (FGSM, PGD)',
          'Black-box adversarial examples',
          'Universal perturbations',
          'Semantic adversarial inputs',
          'Multi-modal adversarial attacks'
        ],
        tools: ['CleverHans', 'Foolbox', 'TextAttack', 'ART'],
        duration: '6-8 hours'
      },
      {
        id: 'A2',
        title: 'Detection Evasion',
        tasks: [
          'Safety filter bypass',
          'Anomaly detection evasion',
          'Signature-based detection bypass',
          'Behavioral analysis evasion',
          'Rate limiting circumvention'
        ],
        tools: ['Evasion frameworks', 'Obfuscation tools', 'Timing attacks'],
        duration: '4-6 hours'
      },
      {
        id: 'A3',
        title: 'Backdoor & Trojan Testing',
        tasks: [
          'Backdoor trigger identification',
          'Trojan behavior detection',
          'Hidden functionality discovery',
          'Activation pattern analysis',
          'Persistence mechanism testing'
        ],
        tools: ['Backdoor scanners', 'Trigger generators', 'Behavior monitors'],
        duration: '5-7 hours'
      }
    ]
  },
  {
    id: 'phase7',
    phase: 'Reporting & Remediation',
    icon: FileText,
    color: 'text-indigo-400',
    description: 'Documentation and improvement recommendations',
    steps: [
      {
        id: 'R1',
        title: 'Vulnerability Documentation',
        tasks: [
          'Create detailed findings report',
          'Document reproduction steps',
          'Assess impact and likelihood',
          'Provide proof-of-concept code',
          'Generate executive summary'
        ],
        tools: ['Report templates', 'PoC frameworks', 'Risk matrices'],
        duration: '4-6 hours'
      },
      {
        id: 'R2',
        title: 'Mitigation Recommendations',
        tasks: [
          'Propose security controls',
          'Design detection mechanisms',
          'Suggest architectural improvements',
          'Recommend policy changes',
          'Provide implementation guidance'
        ],
        tools: ['Best practice guides', 'Control frameworks', 'Implementation templates'],
        duration: '3-5 hours'
      },
      {
        id: 'R3',
        title: 'Validation & Retesting',
        tasks: [
          'Verify implemented fixes',
          'Regression testing',
          'Bypass attempt validation',
          'Performance impact assessment',
          'Continuous monitoring setup'
        ],
        tools: ['Automated test suites', 'Monitoring platforms', 'CI/CD integration'],
        duration: '4-6 hours'
      }
    ]
  }
]

const testCategories = [
  {
    name: 'Capability Tests',
    tests: ['Sandbagging detection', 'Hidden capabilities', 'Emergent behaviors', 'Goal modification'],
    coverage: 85
  },
  {
    name: 'Security Tests',
    tests: ['Prompt injection', 'Data extraction', 'Privilege escalation', 'Tool exploitation'],
    coverage: 92
  },
  {
    name: 'Safety Tests',
    tests: ['Harmful content', 'Bias detection', 'Misinformation', 'Alignment verification'],
    coverage: 78
  },
  {
    name: 'Privacy Tests',
    tests: ['PII handling', 'Data isolation', 'Consent verification', 'Right to deletion'],
    coverage: 88
  },
  {
    name: 'Reliability Tests',
    tests: ['Consistency', 'Hallucination detection', 'Error handling', 'Graceful degradation'],
    coverage: 81
  }
]

export default function LLMFrameworkPage() {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['phase1'])
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev =>
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    )
  }

  const totalSteps = redTeamingFramework.reduce((acc, phase) => acc + phase.steps.length, 0)
  const totalHours = redTeamingFramework.reduce((acc, phase) => 
    acc + phase.steps.reduce((stepAcc, step) => {
      const hours = step.duration.match(/\d+/g)
      return stepAcc + (hours ? parseInt(hours[1] || hours[0]) : 0)
    }, 0), 0
  )

  const exportFramework = () => {
    const frameworkData = {
      title: 'LLM Red Teaming Framework',
      version: '2.0',
      timestamp: new Date().toISOString(),
      phases: redTeamingFramework,
      totalSteps,
      estimatedHours: totalHours,
      testCategories
    }
    
    const blob = new Blob([JSON.stringify(frameworkData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `llm-red-teaming-framework-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <AnimeBackground variant="dots" />
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
                <Target className="w-8 h-8 text-red-400" />
                <h1 className="text-display-2 font-display font-bold">
                  LLM Red Teaming Framework
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Systematic methodology for security testing of Large Language Models and AI agents
              </p>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">AUTHORIZATION REQUIRED</span>
                </div>
                <p className="text-sm text-amber-300">
                  This framework should only be used on systems you own or have explicit authorization to test.
                  Ensure compliance with all applicable laws and regulations.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{redTeamingFramework.length}</div>
                  <div className="text-sm text-muted">Phases</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{totalSteps}</div>
                  <div className="text-sm text-muted">Test Steps</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">~{totalHours}h</div>
                  <div className="text-sm text-muted">Est. Duration</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">40+</div>
                  <div className="text-sm text-muted">Tools</div>
                </Card>
              </div>

              <Button
                variant="primary"
                icon={Download}
                onClick={exportFramework}
              >
                Export Framework
              </Button>
            </motion.div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {redTeamingFramework.map((phase, phaseIndex) => {
                const Icon = phase.icon
                const isExpanded = expandedPhases.includes(phase.id)
                
                return (
                  <motion.div key={phase.id} variants={fadeInUp}>
                    <Card className="overflow-hidden">
                      <div
                        className="p-6 cursor-pointer hover:bg-panel/50 transition-colors"
                        onClick={() => togglePhase(phase.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn("p-3 rounded-lg bg-opacity-10", phase.color)}>
                              <Icon className={cn("w-6 h-6", phase.color)} />
                            </div>
                            <div>
                              <h2 className="text-xl font-semibold flex items-center gap-3">
                                Phase {phaseIndex + 1}: {phase.phase}
                                <Badge variant="outline" size="sm">
                                  {phase.steps.length} Steps
                                </Badge>
                              </h2>
                              <p className="text-sm text-muted mt-1">{phase.description}</p>
                            </div>
                          </div>
                          <ChevronRight
                            className={cn(
                              "w-5 h-5 text-muted transition-transform",
                              isExpanded && "rotate-90"
                            )}
                          />
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-border"
                        >
                          <div className="p-6 space-y-4">
                            {phase.steps.map((step, stepIndex) => (
                              <Card
                                key={step.id}
                                className={cn(
                                  "p-4 cursor-pointer transition-all",
                                  selectedStep === step.id && "ring-2 ring-accent"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedStep(selectedStep === step.id ? null : step.id)
                                }}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h3 className="font-semibold flex items-center gap-2">
                                      Step {stepIndex + 1}: {step.title}
                                      <Badge variant="secondary" size="sm">
                                        {step.duration}
                                      </Badge>
                                    </h3>
                                  </div>
                                </div>
                                
                                {selectedStep === step.id && (
                                  <div className="space-y-4 pt-3 border-t border-border">
                                    <div>
                                      <h4 className="font-medium mb-2">Tasks:</h4>
                                      <ul className="space-y-1">
                                        {step.tasks.map((task, taskIndex) => (
                                          <li key={taskIndex} className="flex items-start gap-2 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                                            <span>{task}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-medium mb-2">Tools:</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {step.tools.map((tool, toolIndex) => (
                                          <Badge key={toolIndex} variant="outline" size="sm">
                                            {tool}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Card>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </Container>
        </section>

        <section className="py-12 bg-surface">
          <Container>
            <h2 className="text-2xl font-semibold mb-8">Test Coverage Matrix</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{category.name}</h3>
                      <Badge
                        variant={category.coverage >= 90 ? 'success' : category.coverage >= 80 ? 'warning' : 'secondary'}
                      >
                        {category.coverage}%
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-panel rounded-full h-2 mb-4">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          category.coverage >= 90 ? "bg-green-500" :
                          category.coverage >= 80 ? "bg-yellow-500" : "bg-gray-500"
                        )}
                        style={{ width: `${category.coverage}%` }}
                      />
                    </div>
                    
                    <ul className="space-y-1">
                      {category.tests.map((test, testIndex) => (
                        <li key={testIndex} className="text-sm text-muted flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {test}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <Card className="mt-8 p-8 bg-accent/5 border-accent/20">
              <h3 className="text-xl font-semibold mb-4">Engagement Timeline</h3>
              <div className="space-y-4">
                {[
                  { week: 'Week 1', activities: 'Planning, Reconnaissance, Initial Testing', progress: 25 },
                  { week: 'Week 2', activities: 'Deep Dive Testing, Vulnerability Discovery', progress: 50 },
                  { week: 'Week 3', activities: 'Exploitation, Impact Assessment', progress: 75 },
                  { week: 'Week 4', activities: 'Reporting, Remediation, Validation', progress: 100 }
                ].map((week, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">{week.week}</span>
                        <span className="text-sm text-muted ml-3">{week.activities}</span>
                      </div>
                      <Badge variant="outline">{week.progress}%</Badge>
                    </div>
                    <div className="w-full bg-panel rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent-600 rounded-full transition-all"
                        style={{ width: `${week.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}