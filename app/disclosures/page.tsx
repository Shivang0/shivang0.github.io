'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Clock, CheckCircle, Info } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'

const disclosures = [
  {
    id: 'CVE-2025-0001',
    title: 'Critical RCE in Popular AI Framework',
    severity: 'Critical',
    score: 9.8,
    status: 'Patched',
    date: '2025-01-10',
    vendor: 'AI Framework Inc.',
    description: 'Remote code execution vulnerability allowing unauthenticated attackers to execute arbitrary code.',
  },
  {
    id: 'CVE-2024-9876',
    title: 'Authentication Bypass in Cloud Platform',
    severity: 'High',
    score: 8.1,
    status: 'Patched',
    date: '2024-12-15',
    vendor: 'CloudProvider Corp',
    description: 'Authentication bypass allowing unauthorized access to administrative functions.',
  },
  {
    id: 'CVE-2024-8765',
    title: 'SQL Injection in Enterprise CRM',
    severity: 'High',
    score: 7.5,
    status: 'Mitigation Available',
    date: '2024-11-20',
    vendor: 'CRM Solutions Ltd',
    description: 'SQL injection vulnerability in user input handling allowing database compromise.',
  },
  {
    id: 'CVE-2024-7654',
    title: 'XSS in Social Media Platform',
    severity: 'Medium',
    score: 6.1,
    status: 'Under Review',
    date: '2024-10-05',
    vendor: 'Social Network Inc',
    description: 'Stored XSS vulnerability allowing execution of malicious JavaScript in user contexts.',
  },
]

const timeline = [
  { step: 'Discovery', description: 'Vulnerability identified by our research team', icon: AlertTriangle },
  { step: 'Validation', description: 'Proof of concept developed and tested', icon: Shield },
  { step: 'Notification', description: 'Vendor notified through responsible disclosure', icon: Info },
  { step: 'Remediation', description: 'Vendor develops and tests patch', icon: Clock },
  { step: 'Disclosure', description: 'Public disclosure after patch availability', icon: CheckCircle },
]

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'danger'
    case 'high': return 'warning'
    case 'medium': return 'secondary'
    default: return 'outline'
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'patched': return 'success'
    case 'mitigation available': return 'primary'
    default: return 'outline'
  }
}

export default function DisclosuresPage() {
  return (
    <>
      <AnimeBackground variant="dots" />
      <Navbar />
      
      <main className="pt-16">
        <section className="section-padding">
          <Container>
            <SectionHeader
              badge="Disclosures"
              title="Vulnerability Disclosure Program"
              subtitle="Responsible disclosure of security vulnerabilities to protect users worldwide"
            />
            
            <div className="mt-12 space-y-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Disclosure Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 rounded-lg bg-accent/10 text-accent mb-3">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold mb-1">{item.step}</h3>
                        <p className="text-sm text-muted">{item.description}</p>
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="hidden md:block absolute top-6 left-full w-full h-[2px] bg-border -translate-x-1/2" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Recent Disclosures</h2>
                <motion.div
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {disclosures.map((disclosure) => (
                    <motion.div key={disclosure.id} variants={fadeInUp}>
                      <Card variant="elevated" className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant={getSeverityColor(disclosure.severity) as any}>
                                {disclosure.severity} ({disclosure.score})
                              </Badge>
                              <Badge variant={getStatusColor(disclosure.status) as any} size="sm">
                                {disclosure.status}
                              </Badge>
                              <span className="text-sm text-muted">
                                {disclosure.date}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                              {disclosure.id}: {disclosure.title}
                            </h3>
                            <p className="text-sm text-muted mb-2">
                              Vendor: {disclosure.vendor}
                            </p>
                            <p className="text-muted">
                              {disclosure.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <Card variant="outlined" className="p-8 bg-surface/50">
                <h3 className="text-xl font-semibold mb-4">Report a Vulnerability</h3>
                <p className="text-muted mb-6">
                  If you've discovered a security vulnerability, we encourage you to report it through our 
                  responsible disclosure program. We offer rewards up to $100,000 for critical vulnerabilities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-bold gradient-text">24 hours</div>
                    <div className="text-sm text-muted">Initial Response Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">$100K</div>
                    <div className="text-sm text-muted">Maximum Bounty</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">500+</div>
                    <div className="text-sm text-muted">Researchers Rewarded</div>
                  </div>
                </div>
                <Button variant="primary">Submit Vulnerability Report</Button>
              </Card>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}