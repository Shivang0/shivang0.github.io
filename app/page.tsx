'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, AlertTriangle, Info, Search, Filter, ChevronDown, ChevronUp, Download, FileJson, FileText, Brain } from 'lucide-react'
import * as Icons from 'lucide-react'
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

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'danger'
    case 'high': return 'warning'
    case 'medium': return 'secondary'
    case 'low': return 'success'
    default: return 'outline'
  }
}

export default function ChecklistPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [progressPercentage, setProgressPercentage] = useState(0)

  useEffect(() => {
    // Load saved checklist state from localStorage
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('ai-security-checklist')
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState)
          const savedItems = new Set<string>(parsed.checkedItems || [])
          setCheckedItems(savedItems)
          
          // Calculate initial progress
          const totalItems = securityChecklist.categories.reduce(
            (acc, cat) => acc + cat.items.length, 0
          )
          const progress = Math.round((savedItems.size / totalItems) * 100)
          setProgressPercentage(progress)
        } catch (e) {
          console.error('Failed to load checklist state:', e)
        }
      }
    }
  }, [])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      
      // Calculate progress
      const totalItems = securityChecklist.categories.reduce(
        (acc, cat) => acc + cat.items.length, 0
      )
      const progress = Math.round((newSet.size / totalItems) * 100)
      setProgressPercentage(progress)
      
      // Save to localStorage for posture analysis
      localStorage.setItem('ai-security-checklist', JSON.stringify({
        checkedItems: Array.from(newSet),
        lastUpdated: new Date().toISOString()
      }))
      
      return newSet
    })
  }

  const filteredCategories = securityChecklist.categories.map(category => ({
    ...category,
    items: category.items.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSeverity = selectedSeverity === 'all' || item.severity === selectedSeverity
      return matchesSearch && matchesSeverity
    })
  })).filter(category => category.items.length > 0)

  const totalItems = securityChecklist.categories.reduce(
    (acc, cat) => acc + cat.items.length, 0
  )
  const completedItems = checkedItems.size

  const exportChecklistJSON = () => {
    const exportData = {
      version: securityChecklist.version,
      timestamp: new Date().toISOString(),
      totalItems,
      completedItems,
      progressPercentage,
      completionByCategory: securityChecklist.categories.map(cat => ({
        category: cat.title,
        completed: cat.items.filter(item => checkedItems.has(item.id)).length,
        total: cat.items.length,
        percentage: Math.round((cat.items.filter(item => checkedItems.has(item.id)).length / cat.items.length) * 100)
      })),
      categories: securityChecklist.categories.map(category => ({
        id: category.id,
        title: category.title,
        icon: category.icon,
        severity: category.severity,
        items: category.items.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          severity: item.severity,
          completed: checkedItems.has(item.id),
          completedAt: checkedItems.has(item.id) ? new Date().toISOString() : null
        }))
      }))
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-security-checklist-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportChecklistCSV = () => {
    let csv = 'Category,Category Severity,Item ID,Item Title,Item Severity,Description,Status,Completion Time\n'
    
    securityChecklist.categories.forEach(category => {
      category.items.forEach(item => {
        const status = checkedItems.has(item.id) ? 'Completed' : 'Pending'
        const completionTime = checkedItems.has(item.id) ? new Date().toISOString() : 'N/A'
        csv += `"${category.title}","${category.severity}","${item.id}","${item.title}","${item.severity}","${item.description}","${status}","${completionTime}"\n`
      })
    })
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-security-checklist-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportChecklistMarkdown = () => {
    let markdown = `# Comprehensive AI Security Checklist Report\n\n`
    markdown += `**Version:** ${securityChecklist.version}\n`
    markdown += `**Generated:** ${new Date().toLocaleString()}\n`
    markdown += `**Overall Progress:** ${completedItems}/${totalItems} items completed (${progressPercentage}%)\n\n`
    markdown += `## Executive Summary\n\n`
    markdown += `- Total Categories: ${securityChecklist.categories.length}\n`
    markdown += `- Critical Items: ${securityChecklist.categories.reduce((acc, cat) => acc + cat.items.filter(i => i.severity === 'critical').length, 0)}\n`
    markdown += `- High Priority Items: ${securityChecklist.categories.reduce((acc, cat) => acc + cat.items.filter(i => i.severity === 'high').length, 0)}\n\n`
    
    securityChecklist.categories.forEach(category => {
      markdown += `## ${category.title}\n\n`
      markdown += `**Severity:** ${category.severity}\n\n`
      
      category.items.forEach(item => {
        const status = checkedItems.has(item.id) ? '✅' : '⬜'
        markdown += `- ${status} **${item.title}** (${item.severity})\n`
        markdown += `  ${item.description}\n\n`
      })
    })
    
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-security-checklist-${new Date().toISOString().split('T')[0]}.md`
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Checklist
                </h1>
              </div>
              <p className="text-lg text-muted mb-6">
                Comprehensive OWASP-based security guidelines for AI applications, LLMs, and agentic systems
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Brain}
                  onClick={() => window.location.href = '/posture'}
                >
                  Analyze Security Posture
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{totalItems}</div>
                  <div className="text-sm text-muted">Total Items</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{completedItems}</div>
                  <div className="text-sm text-muted">Completed</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">{progressPercentage}%</div>
                  <div className="text-sm text-muted">Progress</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-danger">{securityChecklist.categories.length}</div>
                  <div className="text-sm text-muted">Categories</div>
                </Card>
              </div>
              
              <div className="w-full bg-panel rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-accent-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-8">
          <Container>
            <div className="flex flex-col gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder="Search checklist items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['all', 'critical', 'high', 'medium', 'low'].map(severity => (
                  <Button
                    key={severity}
                    variant={selectedSeverity === severity ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSeverity(severity)}
                  >
                    {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </Button>
                ))}
                
                <div className="flex gap-2 sm:ml-4 sm:pl-4 sm:border-l border-border">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FileJson}
                    onClick={exportChecklistJSON}
                    title="Export as JSON"
                  >
                    JSON
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FileText}
                    onClick={exportChecklistCSV}
                    title="Export as CSV"
                  >
                    CSV
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Download}
                    onClick={exportChecklistMarkdown}
                    title="Export as Markdown"
                  >
                    Report
                  </Button>
                </div>
              </div>
            </div>

            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {filteredCategories.map((category) => {
                const IconComponent = (Icons[category.icon as keyof typeof Icons] as any) || Shield
                const isExpanded = expandedCategories.includes(category.id)
                const categoryProgress = category.items.filter(item => 
                  checkedItems.has(item.id)
                ).length

                return (
                  <motion.div key={category.id} variants={fadeInUp}>
                    <Card className="overflow-hidden">
                      <div
                        className="p-6 cursor-pointer hover:bg-panel/50 transition-colors"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-accent/10 text-accent">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div>
                              <h2 className="text-xl font-semibold flex items-center gap-3">
                                {category.title}
                                <Badge variant={getSeverityColor(category.severity) as any} size="sm">
                                  {category.severity}
                                </Badge>
                              </h2>
                              <p className="text-sm text-muted mt-1">
                                {categoryProgress} of {category.items.length} completed
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-panel rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-accent transition-all"
                                style={{ width: `${(categoryProgress / category.items.length) * 100}%` }}
                              />
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-muted" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border"
                        >
                          <div className="p-6 space-y-4">
                            {category.items.map((item) => (
                              <div
                                key={item.id}
                                className={cn(
                                  "flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer",
                                  checkedItems.has(item.id)
                                    ? "bg-accent/5 border-accent/20"
                                    : "bg-surface border-border hover:bg-panel/50"
                                )}
                                onClick={() => toggleItem(item.id)}
                              >
                                <div className="mt-1">
                                  {checkedItems.has(item.id) ? (
                                    <CheckCircle className="w-5 h-5 text-accent" />
                                  ) : (
                                    <div className="w-5 h-5 rounded border-2 border-border" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <Badge 
                                      variant={getSeverityColor(item.severity) as any} 
                                      size="sm"
                                    >
                                      {item.severity}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
            
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <Info className="w-12 h-12 text-muted mx-auto mb-4" />
                <p className="text-muted">No items found matching your criteria.</p>
              </div>
            )}
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}