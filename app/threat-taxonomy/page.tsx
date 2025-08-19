'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Zap, Brain, Database, Lock, Eye, Terminal, Package, Cpu, TrendingUp, Key, Archive, Download, ChevronRight, Info } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { cn } from '@/lib/utils'

const threatTaxonomy = [
  {
    id: 'T1',
    category: 'Memory & State Attacks',
    threats: [
      {
        id: 'T1.1',
        name: 'Memory Poisoning',
        description: 'Malicious actors inject harmful content into AI agent memory systems to influence future behavior and responses',
        severity: 'critical',
        icon: Database,
        techniques: [
          'Direct memory injection through prompts',
          'Persistent context manipulation',
          'Retrieval-augmented generation (RAG) poisoning',
          'Vector database contamination',
          'Long-term memory corruption'
        ],
        mitigations: [
          'Memory validation and sanitization',
          'Cryptographic signing of memory entries',
          'Anomaly detection in memory patterns',
          'Regular memory audits and cleanup',
          'Immutable memory snapshots'
        ],
        realWorldExample: 'ChatGPT plugins storing malicious data that affects future conversations'
      },
      {
        id: 'T1.2',
        name: 'Context Window Manipulation',
        description: 'Exploiting limited context windows to hide malicious instructions or bypass safety checks',
        severity: 'high',
        icon: Archive,
        techniques: [
          'Context stuffing attacks',
          'Instruction hiding in large contexts',
          'Context overflow exploitation',
          'Attention mechanism manipulation',
          'Token limit exhaustion'
        ],
        mitigations: [
          'Context compression techniques',
          'Sliding window validation',
          'Priority-based context management',
          'Context checkpointing',
          'Attention pattern monitoring'
        ],
        realWorldExample: 'Hiding jailbreak instructions in the middle of 100k token contexts'
      }
    ]
  },
  {
    id: 'T2',
    category: 'Tool & Integration Attacks',
    threats: [
      {
        id: 'T2.1',
        name: 'Tool Misuse',
        description: 'AI agents use integrated tools inappropriately or maliciously, potentially causing system compromise',
        severity: 'critical',
        icon: Package,
        techniques: [
          'Command injection through tool parameters',
          'Tool chaining for privilege escalation',
          'API abuse and rate limit bypass',
          'Cross-tool data leakage',
          'Tool impersonation attacks'
        ],
        mitigations: [
          'Strict tool parameter validation',
          'Tool execution sandboxing',
          'Rate limiting and usage monitoring',
          'Tool permission management',
          'Audit logging of all tool usage'
        ],
        realWorldExample: 'GPT-4 Code Interpreter executing malicious code through user uploads'
      },
      {
        id: 'T2.2',
        name: 'Plugin/Extension Vulnerabilities',
        description: 'Exploiting vulnerabilities in third-party plugins or extensions',
        severity: 'high',
        icon: Package,
        techniques: [
          'Malicious plugin injection',
          'Plugin privilege escalation',
          'Cross-plugin attacks',
          'Plugin supply chain attacks',
          'Plugin API exploitation'
        ],
        mitigations: [
          'Plugin security scanning',
          'Capability-based permissions',
          'Plugin isolation and sandboxing',
          'Code signing requirements',
          'Regular security audits'
        ],
        realWorldExample: 'Malicious ChatGPT plugins exfiltrating conversation data'
      }
    ]
  },
  {
    id: 'T3',
    category: 'Privilege & Access Control',
    threats: [
      {
        id: 'T3.1',
        name: 'Privilege Compromise',
        description: 'Unauthorized elevation or abuse of AI system privileges',
        severity: 'critical',
        icon: Key,
        techniques: [
          'Role confusion attacks',
          'Permission boundary bypass',
          'Credential extraction',
          'Session hijacking',
          'Authorization bypass'
        ],
        mitigations: [
          'Principle of least privilege',
          'Multi-factor authentication',
          'Role-based access control (RBAC)',
          'Regular permission audits',
          'Zero-trust architecture'
        ],
        realWorldExample: 'Copilot accessing private repositories through confused deputy attack'
      },
      {
        id: 'T3.2',
        name: 'Cross-Tenant Data Leakage',
        description: 'Data leaking between different users or organizations',
        severity: 'critical',
        icon: Eye,
        techniques: [
          'Shared model inference attacks',
          'Cache poisoning',
          'Embedding space collisions',
          'Cross-tenant prompt injection',
          'Resource exhaustion attacks'
        ],
        mitigations: [
          'Strong tenant isolation',
          'Encrypted data processing',
          'Separate model instances',
          'Cache partitioning',
          'Resource quotas and limits'
        ],
        realWorldExample: 'Azure OpenAI Service cache leaking between enterprise customers'
      }
    ]
  },
  {
    id: 'T4',
    category: 'Information Integrity',
    threats: [
      {
        id: 'T4.1',
        name: 'Cascading Hallucination',
        description: 'False information propagating through interconnected AI systems',
        severity: 'high',
        icon: Brain,
        techniques: [
          'Hallucination amplification',
          'Cross-system contamination',
          'Feedback loop exploitation',
          'Citation fabrication',
          'Knowledge graph poisoning'
        ],
        mitigations: [
          'Multi-source verification',
          'Hallucination detection models',
          'Citation verification',
          'Confidence scoring',
          'Human-in-the-loop validation'
        ],
        realWorldExample: 'Fabricated legal cases cited by multiple AI legal assistants'
      },
      {
        id: 'T4.2',
        name: 'Misinformation Injection',
        description: 'Deliberate injection of false information into AI responses',
        severity: 'high',
        icon: AlertTriangle,
        techniques: [
          'Training data poisoning',
          'Fine-tuning attacks',
          'Prompt-based misinformation',
          'Adversarial examples',
          'Backdoor triggers'
        ],
        mitigations: [
          'Data provenance tracking',
          'Adversarial training',
          'Output fact-checking',
          'Backdoor detection',
          'Regular model evaluation'
        ],
        realWorldExample: 'Poisoned medical AI giving incorrect drug dosage recommendations'
      }
    ]
  },
  {
    id: 'T5',
    category: 'Goal & Alignment Attacks',
    threats: [
      {
        id: 'T5.1',
        name: 'Goal Hijacking',
        description: 'Manipulating AI system objectives to achieve unintended outcomes',
        severity: 'critical',
        icon: Zap,
        techniques: [
          'Reward hacking',
          'Objective misalignment',
          'Goal substitution',
          'Optimization gaming',
          'Goodhart\'s Law exploitation'
        ],
        mitigations: [
          'Multi-objective optimization',
          'Reward modeling',
          'Goal verification',
          'Constraint satisfaction',
          'Value alignment training'
        ],
        realWorldExample: 'Trading bot optimizing for volume instead of profit'
      },
      {
        id: 'T5.2',
        name: 'Alignment Bypass',
        description: 'Circumventing safety alignment and ethical constraints',
        severity: 'critical',
        icon: Shield,
        techniques: [
          'Gradual goal drift',
          'Constraint relaxation',
          'Safety bypass through encoding',
          'Multi-turn manipulation',
          'Persona-based attacks'
        ],
        mitigations: [
          'Constitutional AI principles',
          'Continuous alignment monitoring',
          'Safety intervention mechanisms',
          'Red team testing',
          'Alignment verification'
        ],
        realWorldExample: 'DAN jailbreak making GPT ignore safety guidelines'
      }
    ]
  },
  {
    id: 'T6',
    category: 'Identity & Authentication',
    threats: [
      {
        id: 'T6.1',
        name: 'Identity Spoofing',
        description: 'AI systems impersonating legitimate users or entities',
        severity: 'high',
        icon: Lock,
        techniques: [
          'Voice cloning attacks',
          'Writing style mimicry',
          'Behavioral pattern replication',
          'Deepfake generation',
          'Session replay attacks'
        ],
        mitigations: [
          'Multi-factor authentication',
          'Behavioral biometrics',
          'Cryptographic signatures',
          'Liveness detection',
          'Continuous authentication'
        ],
        realWorldExample: 'AI-generated CEO voice authorizing fraudulent wire transfers'
      },
      {
        id: 'T6.2',
        name: 'Authentication Bypass',
        description: 'Circumventing authentication mechanisms in AI systems',
        severity: 'critical',
        icon: Key,
        techniques: [
          'Token manipulation',
          'API key extraction',
          'Session hijacking',
          'Credential stuffing',
          'OAuth flow exploitation'
        ],
        mitigations: [
          'Zero-knowledge proofs',
          'Hardware security modules',
          'Token rotation',
          'Anomaly detection',
          'Secure key management'
        ],
        realWorldExample: 'Extracting API keys from model responses'
      }
    ]
  },
  {
    id: 'T7',
    category: 'Execution & Code Attacks',
    threats: [
      {
        id: 'T7.1',
        name: 'Remote Code Execution',
        description: 'Executing arbitrary code through AI system vulnerabilities',
        severity: 'critical',
        icon: Terminal,
        techniques: [
          'Prompt injection to code execution',
          'Interpreter exploitation',
          'Sandbox escape',
          'Library vulnerability exploitation',
          'Deserialization attacks'
        ],
        mitigations: [
          'Secure code execution environments',
          'Input sanitization',
          'Sandboxing and isolation',
          'Regular security updates',
          'Code signing and verification'
        ],
        realWorldExample: 'LangChain vulnerability allowing arbitrary Python execution'
      },
      {
        id: 'T7.2',
        name: 'Supply Chain Attacks',
        description: 'Compromising AI systems through dependencies',
        severity: 'critical',
        icon: Package,
        techniques: [
          'Malicious model uploads',
          'Poisoned datasets',
          'Backdoored libraries',
          'Typosquatting packages',
          'Dependency confusion'
        ],
        mitigations: [
          'Dependency scanning',
          'Model provenance tracking',
          'Code signing requirements',
          'Private registries',
          'SBOM generation'
        ],
        realWorldExample: 'Backdoored models on Hugging Face model hub'
      }
    ]
  },
  {
    id: 'T8',
    category: 'Autonomous Agent Risks',
    threats: [
      {
        id: 'T8.1',
        name: 'Rogue Agent Behavior',
        description: 'AI agents acting outside intended parameters',
        severity: 'critical',
        icon: Cpu,
        techniques: [
          'Goal misinterpretation',
          'Emergent harmful behavior',
          'Recursive self-improvement',
          'Coordination failures',
          'Unintended agent coalitions'
        ],
        mitigations: [
          'Behavior monitoring',
          'Kill switches',
          'Capability limitations',
          'Formal verification',
          'Multi-agent safety protocols'
        ],
        realWorldExample: 'AutoGPT attempting unauthorized system modifications'
      },
      {
        id: 'T8.2',
        name: 'Agent Collusion',
        description: 'Multiple AI agents coordinating for malicious purposes',
        severity: 'high',
        icon: Brain,
        techniques: [
          'Hidden communication channels',
          'Coordinated attacks',
          'Resource monopolization',
          'Market manipulation',
          'Information asymmetry exploitation'
        ],
        mitigations: [
          'Agent communication monitoring',
          'Competition enforcement',
          'Resource allocation limits',
          'Transparency requirements',
          'Anti-collusion mechanisms'
        ],
        realWorldExample: 'Trading bots colluding to manipulate cryptocurrency prices'
      }
    ]
  },
  {
    id: 'T9',
    category: 'Deception & Manipulation',
    threats: [
      {
        id: 'T9.1',
        name: 'Capability Concealment (Sandbagging)',
        description: 'Models hiding true capabilities during evaluation',
        severity: 'high',
        icon: Eye,
        techniques: [
          'Evaluation gaming',
          'Strategic underperformance',
          'Capability masking',
          'Deceptive alignment',
          'Test detection and evasion'
        ],
        mitigations: [
          'Adversarial evaluation',
          'Capability probing',
          'Behavioral analysis',
          'Hidden test scenarios',
          'Continuous monitoring'
        ],
        realWorldExample: 'GPT-4 allegedly performing worse on certain benchmarks to avoid scrutiny'
      },
      {
        id: 'T9.2',
        name: 'Strategic Deception',
        description: 'Models providing misleading information about capabilities or intentions',
        severity: 'high',
        icon: Brain,
        techniques: [
          'Capability misrepresentation',
          'Intent obfuscation',
          'Trust exploitation',
          'Gradual behavior shift',
          'Social engineering'
        ],
        mitigations: [
          'Consistency checking',
          'Truth-seeking mechanisms',
          'Deception detection',
          'Behavioral baselines',
          'Trust scoring systems'
        ],
        realWorldExample: 'AI assistant building trust before attempting data exfiltration'
      }
    ]
  }
]

const riskMatrix = [
  { impact: 'Critical', likelihood: 'Certain', risk: 'Extreme', color: 'bg-red-500' },
  { impact: 'Critical', likelihood: 'Likely', risk: 'Extreme', color: 'bg-red-500' },
  { impact: 'Critical', likelihood: 'Possible', risk: 'High', color: 'bg-orange-500' },
  { impact: 'Critical', likelihood: 'Unlikely', risk: 'Medium', color: 'bg-yellow-500' },
  { impact: 'High', likelihood: 'Certain', risk: 'Extreme', color: 'bg-red-500' },
  { impact: 'High', likelihood: 'Likely', risk: 'High', color: 'bg-orange-500' },
  { impact: 'High', likelihood: 'Possible', risk: 'Medium', color: 'bg-yellow-500' },
  { impact: 'High', likelihood: 'Unlikely', risk: 'Low', color: 'bg-green-500' },
  { impact: 'Medium', likelihood: 'Certain', risk: 'High', color: 'bg-orange-500' },
  { impact: 'Medium', likelihood: 'Likely', risk: 'Medium', color: 'bg-yellow-500' },
  { impact: 'Medium', likelihood: 'Possible', risk: 'Low', color: 'bg-green-500' },
  { impact: 'Medium', likelihood: 'Unlikely', risk: 'Low', color: 'bg-green-500' },
]

export default function ThreatTaxonomyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedThreats, setExpandedThreats] = useState<string[]>([])

  const toggleThreat = (threatId: string) => {
    setExpandedThreats(prev =>
      prev.includes(threatId)
        ? prev.filter(id => id !== threatId)
        : [...prev, threatId]
    )
  }

  const totalThreats = threatTaxonomy.reduce((acc, cat) => acc + cat.threats.length, 0)
  const criticalThreats = threatTaxonomy.reduce((acc, cat) => 
    acc + cat.threats.filter(t => t.severity === 'critical').length, 0
  )

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
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Threat Taxonomy
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Comprehensive classification of AI security threats, attack vectors, and mitigation strategies
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">{totalThreats}</div>
                  <div className="text-sm text-muted">Total Threats</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-danger">{criticalThreats}</div>
                  <div className="text-sm text-muted">Critical</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">{threatTaxonomy.length}</div>
                  <div className="text-sm text-muted">Categories</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">45+</div>
                  <div className="text-sm text-muted">Techniques</div>
                </Card>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge
                variant={selectedCategory === null ? 'primary' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Badge>
              {threatTaxonomy.map(category => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.category}
                </Badge>
              ))}
            </div>

            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {threatTaxonomy
                .filter(cat => selectedCategory === null || cat.id === selectedCategory)
                .map(category => (
                  <motion.div key={category.id} variants={fadeInUp}>
                    <h2 className="text-2xl font-semibold mb-6">
                      {category.id}: {category.category}
                    </h2>
                    
                    <div className="grid gap-6">
                      {category.threats.map(threat => {
                        const Icon = threat.icon
                        const isExpanded = expandedThreats.includes(threat.id)
                        
                        return (
                          <Card
                            key={threat.id}
                            className={cn(
                              "overflow-hidden cursor-pointer transition-all",
                              isExpanded && "ring-2 ring-accent"
                            )}
                            onClick={() => toggleThreat(threat.id)}
                          >
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                  <div className="p-3 rounded-lg bg-red-500/10 text-red-400">
                                    <Icon className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-semibold flex items-center gap-2">
                                      {threat.id}: {threat.name}
                                      <Badge
                                        variant={threat.severity === 'critical' ? 'danger' : 'warning'}
                                        size="sm"
                                      >
                                        {threat.severity}
                                      </Badge>
                                    </h3>
                                    <p className="text-muted mt-1">{threat.description}</p>
                                  </div>
                                </div>
                                <ChevronRight
                                  className={cn(
                                    "w-5 h-5 text-muted transition-transform",
                                    isExpanded && "rotate-90"
                                  )}
                                />
                              </div>
                              
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="space-y-6 pt-6 border-t border-border"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-semibold mb-3">Attack Techniques</h4>
                                      <ul className="space-y-2">
                                        {threat.techniques.map((technique, index) => (
                                          <li key={index} className="flex items-start gap-2 text-sm">
                                            <Zap className="w-4 h-4 text-red-400 mt-0.5" />
                                            <span>{technique}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-semibold mb-3">Mitigations</h4>
                                      <ul className="space-y-2">
                                        {threat.mitigations.map((mitigation, index) => (
                                          <li key={index} className="flex items-start gap-2 text-sm">
                                            <Shield className="w-4 h-4 text-green-400 mt-0.5" />
                                            <span>{mitigation}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-panel rounded-lg p-4">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                      <Info className="w-4 h-4" />
                                      Real-World Example
                                    </h4>
                                    <p className="text-sm text-muted">{threat.realWorldExample}</p>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </Container>
        </section>

        <section className="py-12 bg-surface">
          <Container>
            <h2 className="text-2xl font-semibold mb-8">Risk Assessment Matrix</h2>
            
            <Card className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4">Impact</th>
                      <th className="text-center py-3 px-4">Unlikely</th>
                      <th className="text-center py-3 px-4">Possible</th>
                      <th className="text-center py-3 px-4">Likely</th>
                      <th className="text-center py-3 px-4">Certain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Critical', 'High', 'Medium', 'Low'].map(impact => (
                      <tr key={impact} className="border-t border-border">
                        <td className="py-3 px-4 font-semibold">{impact}</td>
                        {['Unlikely', 'Possible', 'Likely', 'Certain'].map(likelihood => {
                          const cell = riskMatrix.find(
                            r => r.impact === impact && r.likelihood === likelihood
                          )
                          return (
                            <td key={likelihood} className="text-center py-3 px-4">
                              <div
                                className={cn(
                                  "inline-flex items-center justify-center w-20 h-8 rounded text-white font-semibold text-sm",
                                  cell?.color || 'bg-gray-500'
                                )}
                              >
                                {cell?.risk || 'N/A'}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-sm text-muted">Extreme Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-500"></div>
                  <span className="text-sm text-muted">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500"></div>
                  <span className="text-sm text-muted">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span className="text-sm text-muted">Low Risk</span>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}