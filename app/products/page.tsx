'use client'

import { motion } from 'framer-motion'
import { Shield, Bug, Brain, Target, CheckCircle, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'

const products = [
  {
    id: 'bounty',
    icon: Bug,
    title: 'Vulnerability Bounty Program',
    description: 'Crowdsourced security with rewards up to $100K',
    features: [
      'Continuous vulnerability assessment',
      'Global researcher network',
      'Rapid triage and validation',
      'Transparent reward structure',
      'Responsible disclosure coordination',
    ],
    pricing: 'Custom pricing',
  },
  {
    id: 'scanner',
    icon: Shield,
    title: 'AI-Powered Scanner',
    description: 'Automated vulnerability detection at scale',
    features: [
      'Deep code analysis',
      'Container security scanning',
      'API security testing',
      'Real-time monitoring',
      'CI/CD integration',
    ],
    pricing: 'From $999/month',
  },
  {
    id: 'intel',
    icon: Brain,
    title: 'Threat Intelligence Platform',
    description: 'Predictive threat analysis and risk scoring',
    features: [
      'Dark web monitoring',
      'Zero-day tracking',
      'Supply chain analysis',
      'Custom threat feeds',
      'Executive reporting',
    ],
    pricing: 'From $2,499/month',
  },
  {
    id: 'raid',
    icon: Target,
    title: 'Red Team Services',
    description: 'Elite offensive security assessments',
    features: [
      'Physical security testing',
      'Social engineering',
      'Advanced persistent threat simulation',
      'Purple team exercises',
      'Executive briefings',
    ],
    pricing: 'Project-based',
  },
]

export default function ProductsPage() {
  return (
    <>
      <AnimeBackground variant="dots" />
      <Navbar />
      
      <main className="pt-16">
        <section className="section-padding">
          <Container>
            <SectionHeader
              badge="Products"
              title="Enterprise Security Solutions"
              subtitle="Comprehensive protection against modern threats"
            />
            
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  id={product.id}
                  variants={fadeInUp}
                  className="scroll-mt-24"
                >
                  <Card variant="elevated" className="h-full p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-lg bg-accent/10 text-accent">
                        <product.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
                        <p className="text-muted">{product.description}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <div className="text-sm text-muted">Starting at</div>
                        <div className="text-xl font-semibold">{product.pricing}</div>
                      </div>
                      <Button icon={ArrowRight} iconPosition="right">
                        Learn More
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
        
        <section className="section-padding bg-surface">
          <Container>
            <SectionHeader
              title="Why Choose Our Platform"
              subtitle="Industry-leading features that set us apart"
            />
            
            <Tabs defaultValue="technology" className="mt-12">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="expertise">Expertise</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="technology" className="mt-8">
                <Card variant="outlined" className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Advanced AI Technology</h3>
                  <p className="text-muted mb-6">
                    Our proprietary AI engine analyzes millions of code patterns to identify vulnerabilities 
                    that traditional scanners miss. Machine learning models continuously improve detection 
                    accuracy based on new threat intelligence.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold gradient-text">98%</div>
                      <div className="text-sm text-muted">Detection Rate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text">0.01%</div>
                      <div className="text-sm text-muted">False Positives</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text">24ms</div>
                      <div className="text-sm text-muted">Avg Response Time</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="expertise" className="mt-8">
                <Card variant="outlined" className="p-8">
                  <h3 className="text-xl font-semibold mb-4">World-Class Security Team</h3>
                  <p className="text-muted mb-6">
                    Our team includes former NSA analysts, Google Project Zero researchers, and winners of 
                    major CTF competitions. Combined experience of over 200 years in offensive and defensive 
                    security operations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold gradient-text">50+</div>
                      <div className="text-sm text-muted">Security Experts</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text">1000+</div>
                      <div className="text-sm text-muted">CVEs Discovered</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text">15</div>
                      <div className="text-sm text-muted">Industry Awards</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="results" className="mt-8">
                <Card variant="outlined" className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Proven Track Record</h3>
                  <p className="text-muted mb-6">
                    Trusted by Fortune 500 companies and government agencies worldwide. Our platform has 
                    prevented billions in potential damages and protected millions of users from cyber threats.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold gradient-text">$2B+</div>
                      <div className="text-sm text-muted">Damages Prevented</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text">500+</div>
                      <div className="text-sm text-muted">Enterprise Clients</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text">99.9%</div>
                      <div className="text-sm text-muted">Uptime SLA</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}