'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  Target,
  Trophy,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Play,
  Users,
  Briefcase,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import {
  learningPaths,
  pathStats,
  type LearningPath,
  type PathModule,
} from '@/content/data/learning-paths'
import type { Difficulty } from '@/content/data/types'

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'success',
  intermediate: 'primary',
  advanced: 'warning',
  expert: 'danger',
}

const PROGRESS_KEY = 'ai-security-learning-progress'

interface ModuleCardProps {
  module: PathModule
  pathId: string
  moduleIndex: number
  isCompleted: boolean
  onToggleComplete: (pathId: string, moduleId: string) => void
}

function ModuleCard({ module, pathId, moduleIndex, isCompleted, onToggleComplete }: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className={`p-4 ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            isCompleted
              ? 'bg-green-500 text-white'
              : 'bg-panel border border-border text-muted'
          }`}
        >
          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : moduleIndex + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium">{module.title}</h4>
              <p className="text-sm text-muted mt-1">{module.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {module.estimatedHours}h
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleComplete(pathId, module.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isCompleted
                    ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                    : 'bg-panel text-muted hover:text-text'
                }`}
                title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg bg-panel text-muted hover:text-text transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 space-y-4 border-t border-border pt-4"
            >
              {/* Topics */}
              <div>
                <h5 className="text-sm font-medium mb-2">Topics Covered</h5>
                <div className="flex flex-wrap gap-1.5">
                  {module.topics.map((topic, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h5 className="text-sm font-medium mb-2">Resources</h5>
                <ul className="space-y-1.5">
                  {module.resources.map((resource, i) => (
                    <li key={i}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:underline inline-flex items-center gap-1"
                      >
                        {resource.title}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-xs text-muted ml-2">({resource.type})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Labs */}
              {module.labs && module.labs.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium mb-2">Practice Labs</h5>
                  <div className="flex flex-wrap gap-2">
                    {module.labs.map((lab, i) => (
                      <Badge key={i} variant="primary" className="text-xs">
                        {lab}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              <div>
                <h5 className="text-sm font-medium mb-2">Skills Gained</h5>
                <div className="flex flex-wrap gap-1.5">
                  {module.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}

function PathCard({
  path,
  progress,
  onToggleModule,
}: {
  path: LearningPath
  progress: Set<string>
  onToggleModule: (pathId: string, moduleId: string) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const completedModules = path.modules.filter((m) => progress.has(`${path.id}:${m.id}`)).length
  const progressPercent = Math.round((completedModules / path.modules.length) * 100)

  return (
    <motion.div variants={fadeInUp}>
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Path Header */}
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold">{path.title}</h2>
                  <Badge variant={difficultyColors[path.difficulty] as 'success' | 'primary' | 'warning' | 'danger'}>
                    {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
                  </Badge>
                </div>
                <p className="text-muted">{path.description}</p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {path.modules.length} modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {path.estimatedWeeks} weeks
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {path.totalHours} hours
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted">Progress</span>
                <span className="font-medium">
                  {completedModules}/{path.modules.length} modules
                </span>
              </div>
              <div className="h-2 bg-panel rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="lg:w-64 space-y-3">
            <div className="p-3 bg-panel rounded-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                Career Outcomes
              </h4>
              <div className="flex flex-wrap gap-1">
                {path.careerOutcomes.slice(0, 3).map((outcome, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {outcome}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Hide Modules' : 'View Modules'}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-border space-y-6"
          >
            {/* Prerequisites */}
            {path.prerequisites.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Prerequisites</h4>
                <ul className="list-disc list-inside text-sm text-muted space-y-1">
                  {path.prerequisites.map((prereq, i) => (
                    <li key={i}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills Gained */}
            <div>
              <h4 className="font-medium mb-2">Skills You'll Gain</h4>
              <div className="flex flex-wrap gap-2">
                {path.skillsGained.map((skill, i) => (
                  <Badge key={i} variant="primary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Modules */}
            <div>
              <h4 className="font-medium mb-4">Learning Modules</h4>
              <div className="space-y-3">
                {path.modules.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    pathId={path.id}
                    moduleIndex={index}
                    isCompleted={progress.has(`${path.id}:${module.id}`)}
                    onToggleComplete={onToggleModule}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

export default function LearningPathsPage() {
  const [progress, setProgress] = useState<Set<string>>(new Set())
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all')

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PROGRESS_KEY)
      if (saved) {
        try {
          setProgress(new Set(JSON.parse(saved)))
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [])

  // Toggle module completion
  const toggleModule = useCallback((pathId: string, moduleId: string) => {
    setProgress((prev) => {
      const key = `${pathId}:${moduleId}`
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(newSet)))
      return newSet
    })
  }, [])

  const filteredPaths = useMemo(() => {
    if (selectedDifficulty === 'all') return learningPaths
    return learningPaths.filter((p) => p.difficulty === selectedDifficulty)
  }, [selectedDifficulty])

  const totalModules = learningPaths.reduce((sum, p) => sum + p.modules.length, 0)
  const completedModules = progress.size
  const overallProgress = Math.round((completedModules / totalModules) * 100)

  return (
    <>
      <AnimeBackground variant="dots" />
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-surface border-b border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <GraduationCap className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Learning Paths
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Structured learning journeys to master AI security, from fundamentals to
                expert-level research. Track your progress and build practical skills.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{pathStats.totalPaths}</span>
                  <span className="text-muted">Paths</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{pathStats.totalModules}</span>
                  <span className="text-muted">Modules</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{pathStats.totalHours}</span>
                  <span className="text-muted">Hours</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Trophy className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{completedModules}</span>
                  <span className="text-muted">Completed</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Overall Progress */}
        {completedModules > 0 && (
          <section className="py-4 bg-panel border-b border-border">
            <Container>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted whitespace-nowrap">
                  Overall Progress: {completedModules}/{totalModules} modules
                </span>
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-sm font-medium text-accent">{overallProgress}%</span>
              </div>
            </Container>
          </section>
        )}

        {/* Difficulty Filter */}
        <section className="py-6 bg-background border-b border-border sticky top-16 z-30">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted mr-2">Filter by level:</span>
              <Button
                variant={selectedDifficulty === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedDifficulty('all')}
              >
                All Paths
              </Button>
              <Button
                variant={selectedDifficulty === 'beginner' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedDifficulty('beginner')}
              >
                Beginner
              </Button>
              <Button
                variant={selectedDifficulty === 'intermediate' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedDifficulty('intermediate')}
              >
                Intermediate
              </Button>
              <Button
                variant={selectedDifficulty === 'advanced' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedDifficulty('advanced')}
              >
                Advanced
              </Button>
              <Button
                variant={selectedDifficulty === 'expert' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedDifficulty('expert')}
              >
                Expert
              </Button>
            </div>
          </Container>
        </section>

        {/* Paths Content */}
        <section className="py-12">
          <Container>
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {filteredPaths.map((path) => (
                <PathCard
                  key={path.id}
                  path={path}
                  progress={progress}
                  onToggleModule={toggleModule}
                />
              ))}
            </motion.div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">Ready to Start Learning?</h2>
              <p className="text-muted mb-6">
                Choose a learning path that matches your experience level and career goals.
                Track your progress as you work through modules and build practical AI security skills.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="primary" href="/labs">
                  Practice in Labs
                </Button>
                <Button variant="secondary" href="/certifications">
                  View Certifications
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
