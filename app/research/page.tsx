'use client'

import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Shield, Lock, Eye } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'

const researchPapers = [
  {
    title: 'AI Model Extraction Attacks: A Comprehensive Analysis',
    authors: 'Security Research Team',
    date: '2025-01-12',
    category: 'AI Security',
    downloads: '2.3K',
    abstract: 'This paper presents novel techniques for extracting proprietary AI models through API interactions, demonstrating vulnerabilities in current deployment practices.',
  },
  {
    title: 'Supply Chain Vulnerabilities in Container Orchestration',
    authors: 'Cloud Security Division',
    date: '2024-12-20',
    category: 'Cloud Security',
    downloads: '1.8K',
    abstract: 'Analysis of security weaknesses in Kubernetes supply chains, including dependency confusion attacks and malicious image injection techniques.',
  },
  {
    title: 'Post-Quantum Cryptography Implementation Challenges',
    authors: 'Cryptography Research Lab',
    date: '2024-11-15',
    category: 'Cryptography',
    downloads: '3.1K',
    abstract: 'Examination of practical challenges in deploying post-quantum cryptographic algorithms in production environments.',
  },
  {
    title: 'Zero-Click Exploits in Modern Mobile Operating Systems',
    authors: 'Mobile Security Team',
    date: '2024-10-28',
    category: 'Mobile Security',
    downloads: '4.2K',
    abstract: 'Research into zero-click attack vectors affecting iOS and Android, with proof-of-concept demonstrations and mitigation strategies.',
  },
]

const caseStudies = [
  {
    title: 'Fortune 500 Financial Institution',
    industry: 'Banking',
    challenge: 'Critical vulnerabilities in online banking platform',
    solution: 'Comprehensive security audit and remediation program',
    result: '100% vulnerability remediation, zero security incidents post-implementation',
    icon: Lock,
  },
  {
    title: 'Global E-commerce Platform',
    industry: 'Retail',
    challenge: 'API security vulnerabilities exposing customer data',
    solution: 'API gateway implementation with advanced threat detection',
    result: '99.9% reduction in unauthorized API access attempts',
    icon: Shield,
  },
  {
    title: 'Healthcare Technology Provider',
    industry: 'Healthcare',
    challenge: 'HIPAA compliance gaps and data encryption weaknesses',
    solution: 'End-to-end encryption and compliance automation framework',
    result: 'Full HIPAA compliance achieved with automated monitoring',
    icon: Eye,
  },
]

export default function ResearchPage() {
  return (
    <>
      <AnimeBackground variant="rings" />
      <Navbar />
      
      <main className="pt-16">
        <section className="section-padding">
          <Container>
            <SectionHeader
              badge="Research"
              title="Security Research & Publications"
              subtitle="Advancing the field of cybersecurity through rigorous research"
            />
            
            <div className="mt-12 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Latest Research Papers</h2>
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
                            <div className="flex items-center gap-3 mb-3">
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
                            <p className="text-muted">{paper.abstract}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" icon={FileText}>
                              View Paper
                            </Button>
                            <Button variant="ghost" size="sm" icon={Download}>
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Case Studies</h2>
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {caseStudies.map((study, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card variant="elevated" hoverable className="h-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-accent/10 text-accent">
                            <study.icon className="w-6 h-6" />
                          </div>
                          <Badge variant="outline" size="sm">
                            {study.industry}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{study.title}</h3>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium text-accent">Challenge:</span>
                            <p className="text-muted mt-1">{study.challenge}</p>
                          </div>
                          <div>
                            <span className="font-medium text-accent">Solution:</span>
                            <p className="text-muted mt-1">{study.solution}</p>
                          </div>
                          <div>
                            <span className="font-medium text-accent">Result:</span>
                            <p className="text-muted mt-1">{study.result}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}