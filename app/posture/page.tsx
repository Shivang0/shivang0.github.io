'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Brain, BarChart3, FileText, AlertCircle, Lock, Zap } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { comprehensiveSecurityChecklist as securityChecklist } from '@/content/data/comprehensive-security-checklist'
import { cn } from '@/lib/utils'

interface SecurityMetrics {
  overallScore: number
  maturityLevel: string
  criticalGaps: number
  highPriorityActions: string[]
  strengths: string[]
  weaknesses: string[]
  recommendations: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  }
}

export default function PosturePage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null)

  useEffect(() => {
    // Load checklist state from localStorage
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('ai-security-checklist')
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState)
          setCheckedItems(new Set(parsed.checkedItems || []))
        } catch (e) {
          console.error('Failed to load checklist state:', e)
        }
      }
    }
  }, [])

  const performSecurityAnalysis = (checked: Set<string>): SecurityMetrics => {
    const categoryScores: Record<string, { completed: number; total: number; critical: number }> = {}
    let totalCritical = 0
    let completedCritical = 0
    
    // Calculate category-level metrics
    securityChecklist.categories.forEach(category => {
      const categoryItems = category.items
      const completedItems = categoryItems.filter(item => checked.has(item.id))
      const criticalItems = categoryItems.filter(item => item.severity === 'critical')
      const completedCriticalItems = criticalItems.filter(item => checked.has(item.id))
      
      categoryScores[category.id] = {
        completed: completedItems.length,
        total: categoryItems.length,
        critical: criticalItems.length - completedCriticalItems.length
      }
      
      totalCritical += criticalItems.length
      completedCritical += completedCriticalItems.length
    })
    
    // Calculate overall score (weighted by severity)
    let weightedCompleted = 0
    let totalWeight = 0
    
    securityChecklist.categories.forEach(category => {
      category.items.forEach(item => {
        const weight = item.severity === 'critical' ? 3 :
                       item.severity === 'high' ? 2 :
                       item.severity === 'medium' ? 1 : 0.5
        totalWeight += weight
        if (checked.has(item.id)) {
          weightedCompleted += weight
        }
      })
    })
    
    const overallScore = totalWeight > 0 ? Math.round((weightedCompleted / totalWeight) * 100) : 0
    
    // Determine maturity level
    let maturityLevel = 'Initial'
    if (overallScore >= 90) maturityLevel = 'Optimized'
    else if (overallScore >= 75) maturityLevel = 'Managed'
    else if (overallScore >= 50) maturityLevel = 'Defined'
    else if (overallScore >= 25) maturityLevel = 'Developing'
    
    // Identify critical gaps
    const criticalGaps = totalCritical - completedCritical
    
    // Identify strengths (categories with >70% completion)
    const strengths: string[] = []
    Object.entries(categoryScores).forEach(([categoryId, scores]) => {
      if (scores.total > 0) {
        const completion = (scores.completed / scores.total) * 100
        if (completion > 70) {
          const category = securityChecklist.categories.find(c => c.id === categoryId)
          if (category) strengths.push(category.title)
        }
      }
    })
    
    // Identify weaknesses (categories with <40% completion or critical gaps)
    const weaknesses: string[] = []
    Object.entries(categoryScores).forEach(([categoryId, scores]) => {
      if (scores.total > 0) {
        const completion = (scores.completed / scores.total) * 100
        if (completion < 40 || scores.critical > 0) {
          const category = securityChecklist.categories.find(c => c.id === categoryId)
          if (category) weaknesses.push(category.title)
        }
      }
    })
    
    // Generate high-priority actions
    const highPriorityActions: string[] = []
    securityChecklist.categories.forEach(category => {
      const uncheckedCritical = category.items.filter(
        item => item.severity === 'critical' && !checked.has(item.id)
      )
      uncheckedCritical.slice(0, 2).forEach(item => {
        highPriorityActions.push(`${category.title}: ${item.title}`)
      })
    })
    
    // Generate recommendations
    const recommendations = {
      immediate: [
        'Deploy prompt injection defenses immediately',
        'Implement output validation and token limits',
        'Enable data encryption for PII protection',
        'Create an AI incident response plan',
        'Conduct threat modeling session'
      ].slice(0, 3),
      shortTerm: [
        'Secure vector databases and implement retrieval filtering',
        'Deploy comprehensive monitoring systems',
        'Establish penetration testing schedule',
        'Implement automated security testing',
        'Develop security training programs'
      ].slice(0, 3),
      longTerm: [
        'Build AI security center of excellence',
        'Implement continuous security improvement',
        'Develop advanced threat detection',
        'Create security knowledge base',
        'Establish vendor partnerships'
      ].slice(0, 3)
    }
    
    return {
      overallScore,
      maturityLevel,
      criticalGaps,
      highPriorityActions: highPriorityActions.slice(0, 5),
      strengths: strengths.slice(0, 5),
      weaknesses: weaknesses.slice(0, 5),
      recommendations
    }
  }

  const runAnalysis = () => {
    const analysis = performSecurityAnalysis(checkedItems)
    setMetrics(analysis)
    setShowAnalysis(true)
  }

  const getMaturityColor = (level: string) => {
    switch (level) {
      case 'Optimized': return 'text-green-500'
      case 'Managed': return 'text-blue-500'
      case 'Defined': return 'text-yellow-500'
      case 'Developing': return 'text-orange-500'
      case 'Initial': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-blue-500'
    if (score >= 40) return 'text-yellow-500'
    if (score >= 20) return 'text-orange-500'
    return 'text-red-500'
  }

  const totalItems = securityChecklist.categories.reduce(
    (acc, cat) => acc + cat.items.length, 0
  )

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
                <Brain className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  Security Posture Analysis
                </h1>
              </div>
              <p className="text-lg text-muted mb-6">
                AI-powered analysis of your security checklist completion
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="py-8">
          <Container>
            {!showAnalysis ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto text-center"
              >
                <Card className="p-8">
                  <BarChart3 className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-4">Ready to Analyze</h2>
                  <p className="text-muted mb-6">
                    You have completed {checkedItems.size} out of {totalItems} items.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={runAnalysis}
                    className="min-w-[200px]"
                  >
                    Start Analysis
                  </Button>
                </Card>
              </motion.div>
            ) : (
              metrics && (
                <div className="space-y-8">
                  {/* Score Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-6 text-center">
                      <div className={cn("text-4xl font-bold mb-2", getScoreColor(metrics.overallScore))}>
                        {metrics.overallScore}%
                      </div>
                      <div className="text-sm text-muted">Overall Score</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <div className={cn("text-2xl font-bold mb-2", getMaturityColor(metrics.maturityLevel))}>
                        {metrics.maturityLevel}
                      </div>
                      <div className="text-sm text-muted">Maturity Level</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <div className="text-4xl font-bold text-danger mb-2">
                        {metrics.criticalGaps}
                      </div>
                      <div className="text-sm text-muted">Critical Gaps</div>
                    </Card>
                    <Card className="p-6 text-center">
                      <div className="text-4xl font-bold text-warning mb-2">
                        {metrics.highPriorityActions.length}
                      </div>
                      <div className="text-sm text-muted">Priority Actions</div>
                    </Card>
                  </div>

                  {/* Strengths and Weaknesses */}
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        Strengths
                      </h3>
                      {metrics.strengths.length > 0 ? (
                        <ul className="space-y-2">
                          {metrics.strengths.map((strength, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <TrendingUp className="w-4 h-4 text-success mt-0.5" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted">Complete more items to identify strengths</p>
                      )}
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-danger" />
                        Areas for Improvement
                      </h3>
                      {metrics.weaknesses.length > 0 ? (
                        <ul className="space-y-2">
                          {metrics.weaknesses.map((weakness, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-danger mt-0.5" />
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted">Great coverage!</p>
                      )}
                    </Card>
                  </div>

                  {/* Priority Actions */}
                  {metrics.highPriorityActions.length > 0 && (
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-warning" />
                        High Priority Actions
                      </h3>
                      <ul className="space-y-3">
                        {metrics.highPriorityActions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Badge variant="warning" size="sm">P{idx + 1}</Badge>
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-accent" />
                      Recommendations
                    </h3>
                    
                    <div className="space-y-6">
                      <Card className="p-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-danger" />
                          Immediate Actions
                        </h4>
                        <ul className="space-y-2">
                          {metrics.recommendations.immediate.map((rec, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <Lock className="w-4 h-4 text-danger mt-0.5" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </Card>

                      <Card className="p-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-warning" />
                          Short Term Goals
                        </h4>
                        <ul className="space-y-2">
                          {metrics.recommendations.shortTerm.map((rec, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <TrendingUp className="w-4 h-4 text-warning mt-0.5" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </Card>

                      <Card className="p-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          Long Term Strategy
                        </h4>
                        <ul className="space-y-2">
                          {metrics.recommendations.longTerm.map((rec, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <Shield className="w-4 h-4 text-success mt-0.5" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-8">
                    <Button
                      variant="outline"
                      onClick={() => setShowAnalysis(false)}
                    >
                      Run New Analysis
                    </Button>
                    <Button
                      variant="primary"
                      icon={FileText}
                      onClick={() => {
                        const report = JSON.stringify(metrics, null, 2)
                        const blob = new Blob([report], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `security-posture-${new Date().toISOString().split('T')[0]}.json`
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                    >
                      Export Report
                    </Button>
                  </div>
                </div>
              )
            )}
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}