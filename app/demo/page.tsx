'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Building, Mail, Phone, CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'

const benefits = [
  'Personalized platform walkthrough',
  'Custom security assessment',
  'ROI analysis for your organization',
  'Q&A with security experts',
  'Pricing and implementation timeline',
  'Free trial setup assistance',
]

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    employees: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Demo request submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <AnimeBackground variant="rings" />
      <Navbar />
      
      <main className="pt-16">
        <section className="section-padding">
          <Container size="lg">
            <SectionHeader
              badge="Request Demo"
              title="See Our Platform in Action"
              subtitle="Schedule a personalized demo with our security experts"
            />
            
            <div className="mt-12 grid lg:grid-cols-2 gap-12">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeInUp}>
                  <Card variant="elevated" className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Company *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          name="jobTitle"
                          required
                          value={formData.jobTitle}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Company Size *
                        </label>
                        <select
                          name="employees"
                          required
                          value={formData.employees}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                        >
                          <option value="">Select...</option>
                          <option value="1-50">1-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Additional Information
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your security needs..."
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                        />
                      </div>
                      
                      <Button type="submit" variant="primary" fullWidth size="lg">
                        Schedule Demo
                      </Button>
                      
                      <p className="text-xs text-muted text-center">
                        By submitting this form, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </form>
                  </Card>
                </motion.div>
              </motion.div>
              
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold mb-4">What to Expect</h3>
                  <p className="text-muted mb-6">
                    Our security experts will guide you through a comprehensive demonstration 
                    tailored to your organization's specific needs.
                  </p>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <Card variant="outlined" className="p-6 bg-surface/50">
                    <h4 className="font-semibold mb-3">Demo Duration</h4>
                    <div className="flex items-center gap-2 text-muted">
                      <Clock className="w-4 h-4" />
                      <span>45-60 minutes</span>
                    </div>
                  </Card>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <Card variant="outlined" className="p-6 bg-surface/50">
                    <h4 className="font-semibold mb-3">Available Time Slots</h4>
                    <div className="flex items-center gap-2 text-muted">
                      <Calendar className="w-4 h-4" />
                      <span>Monday - Friday, 9 AM - 5 PM EST</span>
                    </div>
                  </Card>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <Card variant="outlined" className="p-6 bg-accent/5 border-accent/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="primary">Limited Time Offer</Badge>
                    </div>
                    <h4 className="font-semibold mb-2">Free Security Assessment</h4>
                    <p className="text-sm text-muted">
                      Schedule a demo this month and receive a complimentary security assessment 
                      worth $5,000 for your organization.
                    </p>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}