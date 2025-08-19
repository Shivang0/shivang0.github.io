'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crosshair, Shield, Zap, Brain, Target, AlertTriangle, FileText, ChevronRight, Lock, Eye, Database, Cpu, Terminal, Package, Wrench, TrendingUp, Key, Search, Archive, Download } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { cn } from '@/lib/utils'

const attackMethodologies = [
  {
    id: 'prompt-injection',
    title: 'Prompt Injection Attacks',
    severity: 'critical',
    icon: Terminal,
    description: 'Manipulate AI behavior through crafted inputs',
    techniques: [
      'Direct prompt override',
      'Indirect injection via external content',
      'Context window manipulation',
      'System prompt extraction',
      'Role-playing attacks'
    ],
    tools: ['Garak', 'PromptInject', 'Custom scripts'],
    mitigations: [
      'Input validation and sanitization',
      'Prompt templates with strict boundaries',
      'Output filtering and validation',
      'Context isolation'
    ],
    realWorldExample: 'Bing Chat vulnerability allowing system prompt extraction and behavior modification'
  },
  {
    id: 'data-poisoning',
    title: 'Training Data Poisoning',
    severity: 'critical',
    icon: Database,
    description: 'Corrupt model behavior by manipulating training data',
    techniques: [
      'Label flipping attacks',
      'Backdoor injection',
      'Gradient poisoning',
      'Feature collision attacks',
      'Clean-label poisoning'
    ],
    tools: ['Adversarial Robustness Toolbox', 'BackdoorBox', 'TrojanNN'],
    mitigations: [
      'Data validation and anomaly detection',
      'Differential privacy in training',
      'Robust aggregation methods',
      'Regular model auditing'
    ],
    realWorldExample: 'Microsoft Tay chatbot corrupted through coordinated data poisoning'
  },
  {
    id: 'adversarial',
    title: 'Adversarial Examples',
    severity: 'high',
    icon: Zap,
    description: 'Craft inputs that cause misclassification',
    techniques: [
      'FGSM (Fast Gradient Sign Method)',
      'PGD (Projected Gradient Descent)',
      'C&W (Carlini & Wagner)',
      'Universal adversarial perturbations',
      'Physical world attacks'
    ],
    tools: ['CleverHans', 'Foolbox', 'TextAttack', 'ART'],
    mitigations: [
      'Adversarial training',
      'Input preprocessing and detection',
      'Ensemble defenses',
      'Certified robustness methods'
    ],
    realWorldExample: 'Tesla Autopilot fooled by adversarial stickers on stop signs'
  },
  {
    id: 'model-extraction',
    title: 'Model Extraction & Stealing',
    severity: 'high',
    icon: Cpu,
    description: 'Recreate proprietary models through API queries',
    techniques: [
      'Query synthesis attacks',
      'Model distillation',
      'Membership inference',
      'Architecture extraction',
      'Hyperparameter stealing'
    ],
    tools: ['KnockoffNets', 'ModelExtractor', 'PRADA'],
    mitigations: [
      'Rate limiting and monitoring',
      'Output perturbation',
      'Watermarking',
      'API access controls'
    ],
    realWorldExample: 'GPT-3.5 behavior replicated through systematic API queries'
  },
  {
    id: 'privacy-attacks',
    title: 'Privacy & Data Leakage',
    severity: 'high',
    icon: Eye,
    description: 'Extract sensitive information from models',
    techniques: [
      'Membership inference attacks',
      'Model inversion',
      'Attribute inference',
      'Training data extraction',
      'Gradient leakage'
    ],
    tools: ['ML-Privacy-Meter', 'TensorFlow Privacy', 'Opacus'],
    mitigations: [
      'Differential privacy',
      'Secure multi-party computation',
      'Federated learning',
      'Output filtering'
    ],
    realWorldExample: 'GPT-2 memorization of training data including PII'
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Attacks',
    severity: 'critical',
    icon: Package,
    description: 'Compromise AI systems through dependencies',
    techniques: [
      'Malicious model uploads',
      'Dependency confusion',
      'Typosquatting packages',
      'Backdoored pretrained models',
      'Poisoned datasets'
    ],
    tools: ['ModelScan', 'Syft', 'Safety', 'pip-audit'],
    mitigations: [
      'Model and data provenance',
      'Dependency scanning',
      'Sandboxed execution',
      'Supply chain attestation'
    ],
    realWorldExample: 'Backdoored models on Hugging Face model hub'
  }
]

const killChain = [
  { phase: 'Reconnaissance', description: 'Gather information about target AI system', icon: Eye },
  { phase: 'Resource Development', description: 'Prepare attack tools and infrastructure', icon: Wrench },
  { phase: 'Initial Access', description: 'Gain entry to AI system or API', icon: Lock },
  { phase: 'Execution', description: 'Run malicious prompts or inputs', icon: Zap },
  { phase: 'Persistence', description: 'Maintain access through backdoors', icon: Database },
  { phase: 'Privilege Escalation', description: 'Bypass safety controls', icon: TrendingUp },
  { phase: 'Defense Evasion', description: 'Avoid detection mechanisms', icon: Shield },
  { phase: 'Credential Access', description: 'Extract API keys or tokens', icon: Key },
  { phase: 'Discovery', description: 'Explore system capabilities', icon: Search },
  { phase: 'Collection', description: 'Gather sensitive data', icon: Archive },
  { phase: 'Exfiltration', description: 'Extract data or models', icon: Download },
  { phase: 'Impact', description: 'Achieve attack objectives', icon: Target }
]


export default function RedTeamingPage() {
  const [selectedMethodology, setSelectedMethodology] = useState<string | null>(null)

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
                <Crosshair className="w-8 h-8 text-red-400" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Red Teaming & Threat Intelligence
                </h1>
              </div>
              <p className="text-lg text-muted mb-6">
                Advanced methodologies for testing AI system resilience and understanding threat landscapes
              </p>
              
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">AUTHORIZED TESTING ONLY</span>
                </div>
                <p className="text-sm text-red-300">
                  Red team methodologies should only be used on systems you own or have explicit authorization to test.
                  Unauthorized testing may violate laws and regulations.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">6</div>
                  <div className="text-sm text-muted">Attack Vectors</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">12</div>
                  <div className="text-sm text-muted">Kill Chain Phases</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">30+</div>
                  <div className="text-sm text-muted">Techniques</div>
                </Card>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <h2 className="text-2xl font-semibold mb-8">Attack Methodologies</h2>
            
            <motion.div
              className="grid gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {attackMethodologies.map((methodology) => (
                <motion.div key={methodology.id} variants={fadeInUp}>
                  <Card 
                    className={cn(
                      "overflow-hidden cursor-pointer transition-all",
                      selectedMethodology === methodology.id && "ring-2 ring-accent"
                    )}
                    onClick={() => setSelectedMethodology(
                      selectedMethodology === methodology.id ? null : methodology.id
                    )}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                            <Zap className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{methodology.title}</h3>
                            <p className="text-muted">{methodology.description}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={methodology.severity === 'critical' ? 'danger' : 'warning'}
                        >
                          {methodology.severity}
                        </Badge>
                      </div>
                      
                      {selectedMethodology === methodology.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-6 pt-6 border-t border-border"
                        >
                          <div>
                            <h4 className="font-semibold mb-3">Techniques</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {methodology.techniques.map((technique, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <ChevronRight className="w-4 h-4 text-accent" />
                                  <span className="text-sm">{technique}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Tools</h4>
                              <div className="flex flex-wrap gap-2">
                                {methodology.tools.map((tool, index) => (
                                  <Badge key={index} variant="outline">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-3">Real-World Example</h4>
                              <p className="text-sm text-muted">
                                {methodology.realWorldExample}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Mitigations</h4>
                            <ul className="space-y-2">
                              {methodology.mitigations.map((mitigation, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <Shield className="w-4 h-4 text-green-400 mt-0.5" />
                                  <span>{mitigation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        <section className="py-12 bg-surface">
          <Container>
            <h2 className="text-2xl font-semibold mb-8">AI Attack Kill Chain</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {killChain.map((phase, index) => {
                const Icon = phase.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <Badge variant="outline" size="sm" className="mb-2">
                            Phase {index + 1}
                          </Badge>
                          <h3 className="font-semibold mb-1">{phase.phase}</h3>
                          <p className="text-sm text-muted">{phase.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </Container>
        </section>

      </main>
      
      <Footer />
    </>
  )
}