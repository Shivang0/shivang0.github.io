'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Shuffle,
  AlertTriangle,
  Target,
  Shield,
  Layers,
  Zap,
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
  payloads,
  payloadCategories,
  encodingMethods,
  payloadStats,
  getPayloadsByCategory,
  getEncodingById,
  type Payload,
  type PayloadCategory,
  type EncodingType,
} from '@/content/data/payloads'

const effectivenessColors: Record<string, string> = {
  high: 'danger',
  medium: 'warning',
  low: 'secondary',
}

function PayloadCard({ payload }: { payload: Payload }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyPayload = useCallback(() => {
    navigator.clipboard.writeText(payload.payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [payload.payload])

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium">{payload.name}</h3>
            <p className="text-sm text-muted mt-1">{payload.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={effectivenessColors[payload.effectiveness] as 'danger' | 'warning' | 'secondary'}
              className="text-xs"
            >
              {payload.effectiveness.toUpperCase()}
            </Badge>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-muted hover:text-text transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="relative">
          <pre className="p-3 bg-panel rounded-lg text-sm font-mono overflow-x-auto text-muted">
            {payload.payload}
          </pre>
          <button
            onClick={copyPayload}
            className="absolute top-2 right-2 p-1.5 bg-surface rounded border border-border hover:border-accent transition-colors"
            title="Copy payload"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-muted" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {payload.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-border pt-3 mt-1 space-y-2"
          >
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted">Target Behavior:</span>
              <span>{payload.targetBehavior}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted">Detection Difficulty:</span>
              <Badge
                variant={effectivenessColors[payload.detectionDifficulty] as 'danger' | 'warning' | 'secondary'}
                className="text-xs"
              >
                {payload.detectionDifficulty.toUpperCase()}
              </Badge>
            </div>
            {payload.notes && (
              <div className="flex items-start gap-4 text-sm">
                <span className="text-muted">Notes:</span>
                <span className="text-muted italic">{payload.notes}</span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  )
}

function EncoderTool() {
  const [input, setInput] = useState('')
  const [selectedEncoding, setSelectedEncoding] = useState<EncodingType>('base64')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleTransform = useCallback(() => {
    const encoder = getEncodingById(selectedEncoding)
    if (!encoder || !input) {
      setOutput('')
      return
    }

    try {
      const result = mode === 'encode' ? encoder.encode(input) : encoder.decode(input)
      setOutput(result)
    } catch {
      setOutput('Error: Invalid input for decoding')
    }
  }, [input, selectedEncoding, mode])

  const copyOutput = useCallback(() => {
    if (output) {
      navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [output])

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-accent" />
        Encoder / Decoder Tool
      </h3>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedEncoding}
            onChange={(e) => setSelectedEncoding(e.target.value as EncodingType)}
            className="px-3 py-2 bg-panel border border-border rounded-lg focus:outline-none focus:border-accent"
          >
            {encodingMethods.map((enc) => (
              <option key={enc.id} value={enc.id}>
                {enc.name}
              </option>
            ))}
          </select>

          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 text-sm transition-colors ${
                mode === 'encode'
                  ? 'bg-accent text-white'
                  : 'bg-panel text-muted hover:text-text'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 text-sm transition-colors ${
                mode === 'decode'
                  ? 'bg-accent text-white'
                  : 'bg-panel text-muted hover:text-text'
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode/decode..."
            className="w-full p-3 bg-panel border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-accent"
            rows={3}
          />
        </div>

        <Button variant="primary" onClick={handleTransform} className="w-full">
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>

        {output && (
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Output</label>
            <pre className="p-3 bg-panel rounded-lg text-sm font-mono overflow-x-auto text-muted min-h-[60px]">
              {output}
            </pre>
            <button
              onClick={copyOutput}
              className="absolute top-8 right-2 p-1.5 bg-surface rounded border border-border hover:border-accent transition-colors"
              title="Copy output"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-muted" />
              )}
            </button>
          </div>
        )}

        <p className="text-xs text-muted">
          {encodingMethods.find((e) => e.id === selectedEncoding)?.description}
        </p>
      </div>
    </Card>
  )
}

export default function PayloadGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<PayloadCategory | 'all'>('all')
  const [selectedEffectiveness, setSelectedEffectiveness] = useState<string>('all')

  const filteredPayloads = useMemo(() => {
    return payloads.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false
      if (selectedEffectiveness !== 'all' && p.effectiveness !== selectedEffectiveness) return false
      return true
    })
  }, [selectedCategory, selectedEffectiveness])

  const getRandomPayload = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * filteredPayloads.length)
    const payload = filteredPayloads[randomIndex]
    if (payload) {
      navigator.clipboard.writeText(payload.payload)
    }
  }, [filteredPayloads])

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
                <Code2 className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Payload Generator
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Collection of educational payloads for testing AI/LLM security, including prompt
                injection, jailbreaks, and encoding bypass techniques.
              </p>

              {/* Warning */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning rounded-lg border border-warning/20 mb-6">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm">For authorized security testing only</span>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{payloadStats.totalPayloads}</span>
                  <span className="text-muted">Payloads</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Layers className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{Object.keys(payloadStats.byCategory).length}</span>
                  <span className="text-muted">Categories</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-panel rounded-lg border border-border">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-text font-medium">{payloadStats.totalEncodings}</span>
                  <span className="text-muted">Encodings</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Filters Section */}
        <section className="py-6 bg-background border-b border-border sticky top-16 z-30">
          <Container>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex flex-wrap items-center gap-2 flex-1">
                <span className="text-sm text-muted">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as PayloadCategory | 'all')}
                  className="px-3 py-1.5 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                >
                  <option value="all">All Categories</option>
                  {payloadCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>

                <span className="text-sm text-muted ml-2">Effectiveness:</span>
                <select
                  value={selectedEffectiveness}
                  onChange={(e) => setSelectedEffectiveness(e.target.value)}
                  className="px-3 py-1.5 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">
                  {filteredPayloads.length} payloads
                </span>
                <Button variant="secondary" size="sm" onClick={getRandomPayload}>
                  <Shuffle className="w-4 h-4 mr-1" />
                  Random
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Payloads List */}
              <div className="lg:col-span-2 space-y-8">
                {selectedCategory === 'all' ? (
                  payloadCategories.map((category) => {
                    const categoryPayloads = filteredPayloads.filter(
                      (p) => p.category === category.id
                    )
                    if (categoryPayloads.length === 0) return null

                    return (
                      <motion.div
                        key={category.id}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="show"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <h2 className="text-xl font-semibold">{category.label}</h2>
                          <Badge variant="secondary">
                            {categoryPayloads.length}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted mb-4">{category.description}</p>
                        <div className="space-y-3">
                          {categoryPayloads.map((payload) => (
                            <PayloadCard key={payload.id} payload={payload} />
                          ))}
                        </div>
                      </motion.div>
                    )
                  })
                ) : (
                  <motion.div variants={fadeInUp} initial="hidden" animate="show">
                    <div className="space-y-3">
                      {filteredPayloads.map((payload) => (
                        <PayloadCard key={payload.id} payload={payload} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar with Encoder Tool */}
              <div className="space-y-6">
                <EncoderTool />

                {/* Encoding Reference */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Encoding Reference</h3>
                  <div className="space-y-3">
                    {encodingMethods.map((enc) => (
                      <div key={enc.id} className="p-3 bg-panel rounded-lg">
                        <h4 className="font-medium text-sm">{enc.name}</h4>
                        <p className="text-xs text-muted mt-1">{enc.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Tips */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Testing Tips</h3>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Start with basic payloads before trying complex ones
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Combine multiple encoding techniques
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Document successful and failed attempts
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Test across different model versions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Always get proper authorization first
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Disclaimer Section */}
        <section className="py-12 bg-surface border-t border-border">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Responsible Use</h2>
              <p className="text-muted mb-6">
                These payloads are provided for educational and authorized security testing purposes
                only. Always obtain proper authorization before testing AI systems. Unauthorized
                access or testing is illegal and unethical.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="secondary" href="/attack-library">
                  View Attack Library
                </Button>
                <Button variant="secondary" href="/pentest-scoping">
                  Scoping Questionnaire
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
