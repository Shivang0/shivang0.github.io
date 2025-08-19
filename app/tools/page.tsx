'use client'

import { motion } from 'framer-motion'
import { Wrench, Github, Globe, Terminal, Shield, Lock, Eye, Cpu, Database, Zap, ExternalLink, Star, Brain } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'

const toolCategories = [
  {
    title: 'Vulnerability Scanners',
    icon: Shield,
    tools: [
      {
        name: 'Nuclei',
        description: 'Fast vulnerability scanner with AI/LLM security templates',
        url: 'https://nuclei.projectdiscovery.io/',
        github: 'https://github.com/projectdiscovery/nuclei',
        tags: ['Templates', 'Automation', 'CI/CD'],
        stars: '17.2k'
      },
      {
        name: 'Semgrep',
        description: 'Static analysis tool with rules for AI/ML security',
        url: 'https://semgrep.dev/',
        github: 'https://github.com/returntocorp/semgrep',
        tags: ['SAST', 'Code Analysis', 'Custom Rules'],
        stars: '9.8k'
      },
      {
        name: 'Trivy',
        description: 'Container and IaC scanner for AI model deployments',
        url: 'https://trivy.dev/',
        github: 'https://github.com/aquasecurity/trivy',
        tags: ['Container', 'Kubernetes', 'Supply Chain'],
        stars: '21.3k'
      }
    ]
  },
  {
    title: 'LLM Security Tools',
    icon: Brain,
    tools: [
      {
        name: 'Garak',
        description: 'LLM vulnerability scanner and red teaming framework',
        url: 'https://github.com/leondz/garak',
        github: 'https://github.com/leondz/garak',
        tags: ['LLM Testing', 'Red Team', 'Automation'],
        stars: '1.2k'
      },
      {
        name: 'LLM Guard',
        description: 'Security toolkit for LLM applications',
        url: 'https://llm-guard.com/',
        github: 'https://github.com/protectai/llm-guard',
        tags: ['Input Validation', 'Output Filtering', 'PII Detection'],
        stars: '890'
      },
      {
        name: 'NeMo Guardrails',
        description: 'NVIDIA toolkit for building safe LLM applications',
        url: 'https://github.com/NVIDIA/NeMo-Guardrails',
        github: 'https://github.com/NVIDIA/NeMo-Guardrails',
        tags: ['Safety Rails', 'NVIDIA', 'Enterprise'],
        stars: '3.4k'
      },
      {
        name: 'Langfuse',
        description: 'LLM observability and security monitoring',
        url: 'https://langfuse.com/',
        github: 'https://github.com/langfuse/langfuse',
        tags: ['Monitoring', 'Tracing', 'Analytics'],
        stars: '4.1k'
      }
    ]
  },
  {
    title: 'Adversarial Testing',
    icon: Zap,
    tools: [
      {
        name: 'TextAttack',
        description: 'Framework for adversarial attacks on NLP models',
        url: 'https://textattack.readthedocs.io/',
        github: 'https://github.com/QData/TextAttack',
        tags: ['NLP', 'Adversarial', 'Research'],
        stars: '2.8k'
      },
      {
        name: 'Adversarial Robustness Toolbox',
        description: 'IBM library for ML security',
        url: 'https://adversarial-robustness-toolbox.org/',
        github: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox',
        tags: ['IBM', 'Defense', 'Attack'],
        stars: '4.5k'
      },
      {
        name: 'CleverHans',
        description: 'Library for adversarial example generation',
        url: 'https://github.com/cleverhans-lab/cleverhans',
        github: 'https://github.com/cleverhans-lab/cleverhans',
        tags: ['TensorFlow', 'PyTorch', 'JAX'],
        stars: '6.1k'
      },
      {
        name: 'Foolbox',
        description: 'Python toolbox for adversarial attacks',
        url: 'https://foolbox.jonasrauber.de/',
        github: 'https://github.com/bethgelab/foolbox',
        tags: ['Multi-framework', 'Research', 'Benchmarking'],
        stars: '2.6k'
      }
    ]
  },
  {
    title: 'Privacy & Data Protection',
    icon: Lock,
    tools: [
      {
        name: 'Presidio',
        description: 'Microsoft data protection and PII detection',
        url: 'https://microsoft.github.io/presidio/',
        github: 'https://github.com/microsoft/presidio',
        tags: ['PII', 'Microsoft', 'Anonymization'],
        stars: '3.2k'
      },
      {
        name: 'Private AI',
        description: 'PII detection and redaction API',
        url: 'https://www.private-ai.com/',
        github: null,
        tags: ['API', 'Enterprise', 'Compliance'],
        stars: 'N/A'
      },
      {
        name: 'Opacus',
        description: 'Differential privacy library for PyTorch',
        url: 'https://opacus.ai/',
        github: 'https://github.com/pytorch/opacus',
        tags: ['Differential Privacy', 'PyTorch', 'Meta'],
        stars: '1.6k'
      },
      {
        name: 'TensorFlow Privacy',
        description: 'Privacy-preserving machine learning',
        url: 'https://github.com/tensorflow/privacy',
        github: 'https://github.com/tensorflow/privacy',
        tags: ['TensorFlow', 'Google', 'DP-SGD'],
        stars: '1.9k'
      }
    ]
  },
  {
    title: 'Model Security',
    icon: Cpu,
    tools: [
      {
        name: 'ModelScan',
        description: 'Security scanner for ML model files',
        url: 'https://github.com/protectai/modelscan',
        github: 'https://github.com/protectai/modelscan',
        tags: ['Model Scanning', 'Malware Detection', 'CI/CD'],
        stars: '450'
      },
      {
        name: 'AI Verify',
        description: 'Singapore AI governance testing framework',
        url: 'https://aiverifyfoundation.sg/',
        github: 'https://github.com/aiverify-foundation/aiverify',
        tags: ['Governance', 'Testing', 'Compliance'],
        stars: '320'
      },
      {
        name: 'MLflow',
        description: 'ML lifecycle platform with security features',
        url: 'https://mlflow.org/',
        github: 'https://github.com/mlflow/mlflow',
        tags: ['MLOps', 'Tracking', 'Deployment'],
        stars: '17.8k'
      },
      {
        name: 'Weights & Biases',
        description: 'ML experiment tracking and model registry',
        url: 'https://wandb.ai/',
        github: 'https://github.com/wandb/wandb',
        tags: ['Monitoring', 'Versioning', 'Collaboration'],
        stars: '8.4k'
      }
    ]
  },
  {
    title: 'Supply Chain Security',
    icon: Database,
    tools: [
      {
        name: 'Sigstore',
        description: 'Signing and verification for software supply chain',
        url: 'https://www.sigstore.dev/',
        github: 'https://github.com/sigstore',
        tags: ['Signing', 'SLSA', 'OpenSSF'],
        stars: '2.1k'
      },
      {
        name: 'SLSA',
        description: 'Supply chain security framework',
        url: 'https://slsa.dev/',
        github: 'https://github.com/slsa-framework',
        tags: ['Framework', 'Google', 'Standards'],
        stars: '1.5k'
      },
      {
        name: 'In-toto',
        description: 'Supply chain security for software',
        url: 'https://in-toto.io/',
        github: 'https://github.com/in-toto/in-toto',
        tags: ['Attestation', 'CNCF', 'Provenance'],
        stars: '850'
      },
      {
        name: 'Syft',
        description: 'SBOM generation for containers and filesystems',
        url: 'https://github.com/anchore/syft',
        github: 'https://github.com/anchore/syft',
        tags: ['SBOM', 'Container', 'Dependencies'],
        stars: '5.7k'
      }
    ]
  }
]

const resources = [
  {
    title: 'OWASP Top 10 for LLM Applications',
    description: 'Comprehensive guide to the most critical security risks in LLM applications',
    url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
    type: 'Documentation'
  },
  {
    title: 'MITRE ATLAS',
    description: 'Adversarial threat landscape for AI systems',
    url: 'https://atlas.mitre.org/',
    type: 'Framework'
  },
  {
    title: 'NIST AI Risk Management Framework',
    description: 'Comprehensive framework for managing AI risks',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    type: 'Standard'
  },
  {
    title: 'AI Incident Database',
    description: 'Repository of AI failures and incidents',
    url: 'https://incidentdatabase.ai/',
    type: 'Database'
  },
  {
    title: 'Hugging Face Model Security',
    description: 'Security scanning for Hugging Face models',
    url: 'https://huggingface.co/docs/hub/security',
    type: 'Platform'
  },
  {
    title: 'Google Secure AI Framework',
    description: 'Google approach to securing AI systems',
    url: 'https://blog.google/technology/safety-security/introducing-googles-secure-ai-framework/',
    type: 'Framework'
  }
]

export default function ToolsPage() {
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
                <Wrench className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Tools & Resources
                </h1>
              </div>
              <p className="text-lg text-muted">
                Curated collection of tools, frameworks, and resources for AI/ML security
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <motion.div
              className="space-y-12"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {toolCategories.map((category, categoryIndex) => {
                const Icon = category.icon
                return (
                  <motion.div key={categoryIndex} variants={fadeInUp}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-semibold">{category.title}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {category.tools.map((tool, toolIndex) => (
                        <Card key={toolIndex} className="p-6" hoverable>
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold">{tool.name}</h3>
                            {tool.stars && (
                              <div className="flex items-center gap-1 text-sm text-muted">
                                <Star className="w-4 h-4" />
                                {tool.stars}
                              </div>
                            )}
                          </div>
                          
                          <p className="text-muted mb-4">{tool.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tool.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" size="sm">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent hover:text-accent-600 transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              Website
                            </a>
                            {tool.github && (
                              <a
                                href={tool.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-accent hover:text-accent-600 transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                GitHub
                              </a>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
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