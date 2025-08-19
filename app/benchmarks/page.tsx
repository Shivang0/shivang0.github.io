'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Shield, Brain, AlertTriangle, ExternalLink, Github, TrendingUp, Award, Target, Database, Zap, FileText, Download } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { cn } from '@/lib/utils'

const benchmarkCategories = [
  {
    id: 'safety-benchmarks',
    title: 'Safety & Harmful Content Benchmarks',
    icon: Shield,
    description: 'Evaluate models for harmful content generation and safety violations',
    benchmarks: [
      {
        name: 'ToxiGen',
        description: 'Large-scale dataset for implicit hate speech detection across 13 minority groups',
        metrics: ['Toxicity Score', 'Implicit Bias', 'Group Fairness'],
        url: 'https://github.com/microsoft/TOXIGEN',
        github: 'https://github.com/microsoft/TOXIGEN',
        papers: ['https://arxiv.org/abs/2203.09509'],
        coverage: 94,
        categories: ['Toxicity', 'Hate Speech', 'Bias'],
        difficulty: 'Medium',
        models_tested: 27
      },
      {
        name: 'RealToxicityPrompts',
        description: 'Dataset of 100k prompts for measuring toxic degeneration in language models',
        metrics: ['Toxicity Probability', 'Expected Maximum Toxicity', 'Empirical Toxicity'],
        url: 'https://allenai.org/data/real-toxicity-prompts',
        github: 'https://github.com/allenai/real-toxicity-prompts',
        papers: ['https://arxiv.org/abs/2009.11462'],
        coverage: 89,
        categories: ['Toxicity', 'Content Safety'],
        difficulty: 'High',
        models_tested: 45
      },
      {
        name: 'HarmBench',
        description: 'Standardized benchmark for automated red teaming and harmful behavior evaluation',
        metrics: ['Attack Success Rate', 'Harm Score', 'Defense Robustness'],
        url: 'https://www.harmbench.org/',
        github: 'https://github.com/centerforaisafety/HarmBench',
        papers: ['https://arxiv.org/abs/2402.04249'],
        coverage: 91,
        categories: ['Red Teaming', 'Harmful Behavior'],
        difficulty: 'High',
        models_tested: 33
      },
      {
        name: 'SafetyBench',
        description: 'Comprehensive safety evaluation across 8 categories of harmful content',
        metrics: ['Safety Score', 'Category-wise Performance', 'Refusal Rate'],
        url: 'https://safetybench.com',
        github: 'https://github.com/thu-coai/SafetyBench',
        papers: ['https://arxiv.org/abs/2309.07045'],
        coverage: 87,
        categories: ['Safety', 'Content Moderation'],
        difficulty: 'Medium',
        models_tested: 25
      },
      {
        name: 'BOLD (Bias in Open-Ended Language)',
        description: 'Large-scale dataset for measuring biases in open-ended language generation',
        metrics: ['Bias Score', 'Sentiment Analysis', 'Regard Score'],
        url: 'https://github.com/amazon-science/bold',
        github: 'https://github.com/amazon-science/bold',
        papers: ['https://arxiv.org/abs/2101.11718'],
        coverage: 85,
        categories: ['Bias', 'Fairness'],
        difficulty: 'Medium',
        models_tested: 23
      }
    ]
  },
  {
    id: 'adversarial-benchmarks',
    title: 'Adversarial & Robustness Benchmarks',
    icon: Zap,
    description: 'Test model resilience against adversarial attacks and jailbreaking',
    benchmarks: [
      {
        name: 'AdvBench',
        description: 'Adversarial benchmark for evaluating jailbreaking and red-teaming attacks',
        metrics: ['Attack Success Rate', 'Perplexity', 'Semantic Similarity'],
        url: 'https://github.com/llm-attacks/llm-attacks',
        github: 'https://github.com/llm-attacks/llm-attacks',
        papers: ['https://arxiv.org/abs/2307.15043'],
        coverage: 92,
        categories: ['Jailbreaking', 'Adversarial'],
        difficulty: 'Very High',
        models_tested: 18
      },
      {
        name: 'PAIR (Prompt Automatic Iterative Refinement)',
        description: 'Automated adversarial prompt generation through iterative refinement',
        metrics: ['Jailbreak Success', 'Query Efficiency', 'Semantic Preservation'],
        url: 'https://github.com/patrickrchao/JailbreakingLLMs',
        github: 'https://github.com/patrickrchao/JailbreakingLLMs',
        papers: ['https://arxiv.org/abs/2310.08419'],
        coverage: 88,
        categories: ['Automated Attacks', 'Jailbreaking'],
        difficulty: 'High',
        models_tested: 16
      },
      {
        name: 'GCG (Greedy Coordinate Gradient)',
        description: 'Gradient-based adversarial attack method for LLMs',
        metrics: ['Attack Effectiveness', 'Token-level Success', 'Transfer Rate'],
        url: 'https://github.com/llm-attacks/llm-attacks',
        github: 'https://github.com/llm-attacks/llm-attacks',
        papers: ['https://arxiv.org/abs/2307.15043'],
        coverage: 86,
        categories: ['Gradient Attacks', 'White-box'],
        difficulty: 'Very High',
        models_tested: 12
      },
      {
        name: 'TAP (Tree of Attacks with Pruning)',
        description: 'Automated multi-turn jailbreaking via tree search',
        metrics: ['Success Rate', 'Query Budget', 'Attack Depth'],
        url: 'https://github.com/RICommunity/TAP',
        github: 'https://github.com/RICommunity/TAP',
        papers: ['https://arxiv.org/abs/2312.02119'],
        coverage: 90,
        categories: ['Multi-turn', 'Tree Search'],
        difficulty: 'High',
        models_tested: 14
      }
    ]
  },
  {
    id: 'bias-fairness',
    title: 'Bias & Fairness Benchmarks',
    icon: Brain,
    description: 'Evaluate models for various types of biases and fairness issues',
    benchmarks: [
      {
        name: 'BBQ (Bias Benchmark for QA)',
        description: 'Benchmark for evaluating social biases in question-answering systems',
        metrics: ['Bias Score', 'Ambiguous Context Score', 'Disambiguated Score'],
        url: 'https://github.com/nyu-mll/BBQ',
        github: 'https://github.com/nyu-mll/BBQ',
        papers: ['https://arxiv.org/abs/2110.08193'],
        coverage: 93,
        categories: ['Social Bias', 'QA Systems'],
        difficulty: 'Medium',
        models_tested: 30
      },
      {
        name: 'WinoBias',
        description: 'Gender bias evaluation in coreference resolution',
        metrics: ['Gender Bias Score', 'Pro-stereotypical Bias', 'Anti-stereotypical Performance'],
        url: 'https://github.com/uclanlp/corefBias',
        github: 'https://github.com/uclanlp/corefBias',
        papers: ['https://arxiv.org/abs/1804.06876'],
        coverage: 87,
        categories: ['Gender Bias', 'Coreference'],
        difficulty: 'Low',
        models_tested: 42
      },
      {
        name: 'StereoSet',
        description: 'Measuring stereotypical bias in language models across multiple domains',
        metrics: ['Stereotype Score', 'Language Modeling Score', 'ICAT Score'],
        url: 'https://stereoset.mit.edu/',
        github: 'https://github.com/moinnadeem/StereoSet',
        papers: ['https://arxiv.org/abs/2004.09456'],
        coverage: 89,
        categories: ['Stereotypes', 'Multiple Domains'],
        difficulty: 'Medium',
        models_tested: 28
      },
      {
        name: 'SEAT (Sentence Encoder Association Test)',
        description: 'Detecting biases in sentence encoders',
        metrics: ['Effect Size', 'P-value', 'Association Strength'],
        url: 'https://github.com/W4ngatang/sent-bias',
        github: 'https://github.com/W4ngatang/sent-bias',
        papers: ['https://arxiv.org/abs/1903.10561'],
        coverage: 82,
        categories: ['Embedding Bias', 'Association Tests'],
        difficulty: 'Low',
        models_tested: 35
      },
      {
        name: 'RedditBias',
        description: 'Real-world bias detection using Reddit data across 4 demographic groups',
        metrics: ['Demographic Parity', 'Equal Opportunity', 'Disparate Impact'],
        url: 'https://github.com/umanlp/RedditBias',
        github: 'https://github.com/umanlp/RedditBias',
        papers: ['https://arxiv.org/abs/2106.03521'],
        coverage: 84,
        categories: ['Real-world Bias', 'Demographics'],
        difficulty: 'Medium',
        models_tested: 19
      }
    ]
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security Benchmarks',
    icon: Database,
    description: 'Assess privacy leakage and security vulnerabilities',
    benchmarks: [
      {
        name: 'PrivacyBench',
        description: 'Comprehensive privacy evaluation for LLMs including PII leakage',
        metrics: ['PII Leakage Rate', 'Membership Inference', 'Data Extraction Success'],
        url: 'https://github.com/privacy-bench/privacy-bench',
        github: 'https://github.com/privacy-bench/privacy-bench',
        papers: ['https://arxiv.org/abs/2311.18989'],
        coverage: 91,
        categories: ['Privacy', 'PII Protection'],
        difficulty: 'High',
        models_tested: 15
      },
      {
        name: 'LLM-PBE (Privacy Behavior Evaluation)',
        description: 'Evaluating privacy-preserving behaviors in language models',
        metrics: ['Privacy Score', 'Information Retention', 'Query Privacy'],
        url: 'https://github.com/llm-privacy/llm-pbe',
        github: 'https://github.com/llm-privacy/llm-pbe',
        papers: ['https://arxiv.org/abs/2310.01818'],
        coverage: 86,
        categories: ['Privacy Behavior', 'Data Protection'],
        difficulty: 'Medium',
        models_tested: 12
      },
      {
        name: 'Extraction Benchmark',
        description: 'Testing training data extraction vulnerabilities',
        metrics: ['Extraction Rate', 'Verbatim Memorization', 'Semantic Leakage'],
        url: 'https://github.com/princeton-nlp/extraction-benchmark',
        github: 'https://github.com/princeton-nlp/extraction-benchmark',
        papers: ['https://arxiv.org/abs/2301.11305'],
        coverage: 88,
        categories: ['Data Extraction', 'Memorization'],
        difficulty: 'Very High',
        models_tested: 10
      }
    ]
  },
  {
    id: 'hallucination-truthfulness',
    title: 'Hallucination & Truthfulness Benchmarks',
    icon: AlertTriangle,
    description: 'Measure factual accuracy and hallucination rates',
    benchmarks: [
      {
        name: 'TruthfulQA',
        description: 'Measuring truthfulness in question-answering with adversarially-selected questions',
        metrics: ['Truthfulness Score', 'Informativeness', 'Combined Score'],
        url: 'https://github.com/sylinrl/TruthfulQA',
        github: 'https://github.com/sylinrl/TruthfulQA',
        papers: ['https://arxiv.org/abs/2109.07958'],
        coverage: 94,
        categories: ['Truthfulness', 'Misinformation'],
        difficulty: 'High',
        models_tested: 58
      },
      {
        name: 'HaluEval',
        description: 'Large-scale hallucination evaluation across diverse tasks',
        metrics: ['Hallucination Rate', 'Task-specific Accuracy', 'Consistency Score'],
        url: 'https://github.com/RUCAIBox/HaluEval',
        github: 'https://github.com/RUCAIBox/HaluEval',
        papers: ['https://arxiv.org/abs/2305.11747'],
        coverage: 90,
        categories: ['Hallucination', 'Multi-task'],
        difficulty: 'Medium',
        models_tested: 22
      },
      {
        name: 'FActScore',
        description: 'Fine-grained atomic fact scoring for hallucination detection',
        metrics: ['Atomic Fact Precision', 'Supported Fact Ratio', 'FActScore'],
        url: 'https://github.com/shmsw25/FActScore',
        github: 'https://github.com/shmsw25/FActScore',
        papers: ['https://arxiv.org/abs/2305.14251'],
        coverage: 87,
        categories: ['Factuality', 'Atomic Facts'],
        difficulty: 'High',
        models_tested: 16
      },
      {
        name: 'FEVER (Fact Extraction and VERification)',
        description: 'Large-scale dataset for fact verification',
        metrics: ['FEVER Score', 'Evidence Precision', 'Label Accuracy'],
        url: 'https://fever.ai/',
        github: 'https://github.com/sheffieldnlp/fever-scorer',
        papers: ['https://arxiv.org/abs/1803.05355'],
        coverage: 85,
        categories: ['Fact Checking', 'Verification'],
        difficulty: 'Medium',
        models_tested: 45
      }
    ]
  },
  {
    id: 'capability-evaluation',
    title: 'Capability & Alignment Benchmarks',
    icon: TrendingUp,
    description: 'Evaluate model capabilities and alignment with human values',
    benchmarks: [
      {
        name: 'MACHIAVELLI',
        description: 'Measuring power-seeking and deception in language agents',
        metrics: ['Power-seeking Score', 'Deception Rate', 'Unethical Behavior Score'],
        url: 'https://github.com/aypan17/machiavelli',
        github: 'https://github.com/aypan17/machiavelli',
        papers: ['https://arxiv.org/abs/2304.03279'],
        coverage: 89,
        categories: ['Deception', 'Power-seeking', 'Ethics'],
        difficulty: 'Very High',
        models_tested: 11
      },
      {
        name: 'Anthropic Eval Suite',
        description: 'Comprehensive evaluation suite for AI safety and capabilities',
        metrics: ['Helpfulness', 'Harmlessness', 'Honesty', 'Other Capabilities'],
        url: 'https://github.com/anthropics/evals',
        github: 'https://github.com/anthropics/evals',
        papers: ['https://arxiv.org/abs/2204.05862'],
        coverage: 92,
        categories: ['HHH', 'Alignment'],
        difficulty: 'High',
        models_tested: 8
      },
      {
        name: 'BIG-bench',
        description: 'Beyond the Imitation Game: 200+ tasks for evaluating language models',
        metrics: ['Task Performance', 'Capability Coverage', 'Emergent Abilities'],
        url: 'https://github.com/google/BIG-bench',
        github: 'https://github.com/google/BIG-bench',
        papers: ['https://arxiv.org/abs/2206.04615'],
        coverage: 95,
        categories: ['Capabilities', 'Emergence'],
        difficulty: 'Variable',
        models_tested: 68
      },
      {
        name: 'ETHICS',
        description: 'Evaluating ethical reasoning in language models',
        metrics: ['Justice Score', 'Virtue Ethics', 'Deontology', 'Utilitarianism', 'Commonsense'],
        url: 'https://github.com/hendrycks/ethics',
        github: 'https://github.com/hendrycks/ethics',
        papers: ['https://arxiv.org/abs/2008.02275'],
        coverage: 86,
        categories: ['Ethics', 'Moral Reasoning'],
        difficulty: 'High',
        models_tested: 24
      }
    ]
  },
  {
    id: 'multimodal-benchmarks',
    title: 'Multimodal Security Benchmarks',
    icon: Target,
    description: 'Benchmarks for vision-language and multimodal AI systems',
    benchmarks: [
      {
        name: 'MM-SafetyBench',
        description: 'Safety evaluation for multimodal large language models',
        metrics: ['Visual Attack Success', 'Text-Image Consistency', 'Safety Violation Rate'],
        url: 'https://github.com/isXinLiu/MM-SafetyBench',
        github: 'https://github.com/isXinLiu/MM-SafetyBench',
        papers: ['https://arxiv.org/abs/2311.17600'],
        coverage: 88,
        categories: ['Multimodal', 'Safety'],
        difficulty: 'High',
        models_tested: 12
      },
      {
        name: 'Red Teaming V-LLMs',
        description: 'Red teaming vision-language models with visual adversarial examples',
        metrics: ['Attack Success Rate', 'Perceptual Quality', 'Semantic Preservation'],
        url: 'https://github.com/Unispac/Visual-Adversarial-Examples-Jailbreak-Large-Language-Models',
        github: 'https://github.com/Unispac/Visual-Adversarial-Examples-Jailbreak-Large-Language-Models',
        papers: ['https://arxiv.org/abs/2306.13213'],
        coverage: 85,
        categories: ['Vision-Language', 'Adversarial'],
        difficulty: 'Very High',
        models_tested: 8
      },
      {
        name: 'POPE (Polling-based Object Probing)',
        description: 'Evaluating object hallucination in vision-language models',
        metrics: ['Object Hallucination Rate', 'Accuracy', 'Precision', 'Recall'],
        url: 'https://github.com/AoiDragon/POPE',
        github: 'https://github.com/AoiDragon/POPE',
        papers: ['https://arxiv.org/abs/2305.10355'],
        coverage: 83,
        categories: ['Hallucination', 'Vision'],
        difficulty: 'Medium',
        models_tested: 15
      }
    ]
  },
  {
    id: 'agent-benchmarks',
    title: 'Agent & Tool-Use Security Benchmarks',
    icon: Award,
    description: 'Evaluate security of AI agents and tool-using systems',
    benchmarks: [
      {
        name: 'ToolEmu',
        description: 'Emulating tool-use risks in language agents',
        metrics: ['Risk Score', 'Tool Misuse Rate', 'Safety Violation Count'],
        url: 'https://github.com/ryoungj/ToolEmu',
        github: 'https://github.com/ryoungj/ToolEmu',
        papers: ['https://arxiv.org/abs/2309.15817'],
        coverage: 87,
        categories: ['Tool Use', 'Agent Safety'],
        difficulty: 'High',
        models_tested: 9
      },
      {
        name: 'AgentBench',
        description: 'Comprehensive evaluation of LLM agents across diverse environments',
        metrics: ['Task Success Rate', 'Safety Score', 'Efficiency'],
        url: 'https://github.com/THUDM/AgentBench',
        github: 'https://github.com/THUDM/AgentBench',
        papers: ['https://arxiv.org/abs/2308.03688'],
        coverage: 90,
        categories: ['Agent Evaluation', 'Multi-environment'],
        difficulty: 'Medium',
        models_tested: 14
      },
      {
        name: 'WebArena',
        description: 'Realistic web environment for autonomous agent evaluation',
        metrics: ['Task Completion', 'Action Efficiency', 'Error Rate'],
        url: 'https://github.com/web-arena-x/webarena',
        github: 'https://github.com/web-arena-x/webarena',
        papers: ['https://arxiv.org/abs/2307.13854'],
        coverage: 84,
        categories: ['Web Agents', 'Real-world Tasks'],
        difficulty: 'Very High',
        models_tested: 7
      }
    ]
  }
]

const benchmarkStats = {
  totalBenchmarks: benchmarkCategories.reduce((acc, cat) => acc + cat.benchmarks.length, 0),
  totalCategories: benchmarkCategories.length,
  totalModelsTested: new Set(benchmarkCategories.flatMap(cat => cat.benchmarks).flatMap(b => Array(b.models_tested).fill(0))).size,
  averageCoverage: Math.round(
    benchmarkCategories.flatMap(cat => cat.benchmarks).reduce((acc, b) => acc + b.coverage, 0) / 
    benchmarkCategories.flatMap(cat => cat.benchmarks).length
  )
}

export default function BenchmarksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [expandedBenchmarks, setExpandedBenchmarks] = useState<string[]>([])

  const toggleBenchmark = (benchmarkName: string) => {
    setExpandedBenchmarks(prev =>
      prev.includes(benchmarkName)
        ? prev.filter(name => name !== benchmarkName)
        : [...prev, benchmarkName]
    )
  }

  const filteredCategories = benchmarkCategories
    .filter(cat => selectedCategory === null || cat.id === selectedCategory)
    .map(cat => ({
      ...cat,
      benchmarks: cat.benchmarks.filter(b => 
        selectedDifficulty === 'all' || b.difficulty === selectedDifficulty
      )
    }))
    .filter(cat => cat.benchmarks.length > 0)

  const exportBenchmarks = () => {
    const exportData = {
      title: 'AI Security Benchmarks',
      generated: new Date().toISOString(),
      stats: benchmarkStats,
      categories: benchmarkCategories.map(cat => ({
        category: cat.title,
        description: cat.description,
        benchmarks: cat.benchmarks.map(b => ({
          name: b.name,
          description: b.description,
          url: b.url,
          github: b.github,
          papers: b.papers,
          metrics: b.metrics,
          coverage: b.coverage,
          difficulty: b.difficulty,
          models_tested: b.models_tested,
          categories: b.categories
        }))
      }))
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-security-benchmarks-${new Date().toISOString().split('T')[0]}.json`
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <BarChart className="w-8 h-8 text-accent" />
                <h1 className="text-display-2 font-display font-bold">
                  AI Security Benchmarks
                </h1>
              </div>
              <p className="text-lg text-muted mb-8">
                Comprehensive collection of benchmarks to evaluate AI models for biases, harmful content, 
                security vulnerabilities, and safety issues
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{benchmarkStats.totalBenchmarks}</div>
                  <div className="text-sm text-muted">Total Benchmarks</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{benchmarkStats.totalCategories}</div>
                  <div className="text-sm text-muted">Categories</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">{benchmarkStats.averageCoverage}%</div>
                  <div className="text-sm text-muted">Avg Coverage</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">500+</div>
                  <div className="text-sm text-muted">Models Tested</div>
                </Card>
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Download}
                  onClick={exportBenchmarks}
                >
                  Export All Benchmarks
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="py-8">
          <Container>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex flex-wrap gap-2 flex-1">
                <Badge
                  variant={selectedCategory === null ? 'primary' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Badge>
                {benchmarkCategories.map(cat => (
                  <Badge
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'primary' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.title}
                  </Badge>
                ))}
              </div>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="all">All Difficulties</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
                <option value="Variable">Variable</option>
              </select>
            </div>

            <motion.div
              className="space-y-12"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {filteredCategories.map(category => {
                const Icon = category.icon
                
                return (
                  <motion.div key={category.id} variants={fadeInUp}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-accent/10 text-accent">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold">{category.title}</h2>
                        <p className="text-muted">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-6">
                      {category.benchmarks.map(benchmark => {
                        const isExpanded = expandedBenchmarks.includes(benchmark.name)
                        
                        return (
                          <Card
                            key={benchmark.name}
                            className={cn(
                              "overflow-hidden cursor-pointer transition-all",
                              isExpanded && "ring-2 ring-accent"
                            )}
                            onClick={() => toggleBenchmark(benchmark.name)}
                          >
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-semibold">{benchmark.name}</h3>
                                    <Badge
                                      variant={
                                        benchmark.difficulty === 'Very High' ? 'danger' :
                                        benchmark.difficulty === 'High' ? 'warning' :
                                        benchmark.difficulty === 'Medium' ? 'secondary' : 'success'
                                      }
                                      size="sm"
                                    >
                                      {benchmark.difficulty}
                                    </Badge>
                                    <Badge variant="outline" size="sm">
                                      {benchmark.models_tested} models tested
                                    </Badge>
                                  </div>
                                  <p className="text-muted">{benchmark.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-accent">{benchmark.coverage}%</div>
                                  <div className="text-xs text-muted">Coverage</div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {benchmark.categories.map((cat, idx) => (
                                  <Badge key={idx} variant="outline" size="sm">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                              
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="space-y-4 pt-4 border-t border-border"
                                >
                                  <div>
                                    <h4 className="font-semibold mb-2">Evaluation Metrics:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {benchmark.metrics.map((metric, idx) => (
                                        <Badge key={idx} variant="secondary" size="sm">
                                          {metric}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-3">
                                    <a
                                      href={benchmark.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-accent hover:text-accent-600 transition-colors"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Website
                                    </a>
                                    {benchmark.github && (
                                      <a
                                        href={benchmark.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-accent hover:text-accent-600 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Github className="w-4 h-4" />
                                        GitHub
                                      </a>
                                    )}
                                    {benchmark.papers && benchmark.papers.map((paper, idx) => (
                                      <a
                                        key={idx}
                                        href={paper}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-accent hover:text-accent-600 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <FileText className="w-4 h-4" />
                                        Paper {idx + 1}
                                      </a>
                                    ))}
                                  </div>
                                  
                                  <div className="bg-panel rounded-lg p-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                      <div>
                                        <div className="text-lg font-semibold">{benchmark.coverage}%</div>
                                        <div className="text-xs text-muted">Coverage Score</div>
                                      </div>
                                      <div>
                                        <div className="text-lg font-semibold">{benchmark.models_tested}</div>
                                        <div className="text-xs text-muted">Models Tested</div>
                                      </div>
                                      <div>
                                        <div className="text-lg font-semibold">{benchmark.metrics.length}</div>
                                        <div className="text-xs text-muted">Metrics</div>
                                      </div>
                                      <div>
                                        <div className="text-lg font-semibold">{benchmark.categories.length}</div>
                                        <div className="text-xs text-muted">Categories</div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </Container>
        </section>

        <section className="py-12 bg-surface">
          <Container>
            <h2 className="text-2xl font-semibold mb-8">How to Use These Benchmarks</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">1. Select Benchmarks</h3>
                </div>
                <p className="text-sm text-muted">
                  Choose benchmarks relevant to your model's use case and deployment context. 
                  Consider safety-critical applications first.
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-warning/10 text-warning">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">2. Run Evaluations</h3>
                </div>
                <p className="text-sm text-muted">
                  Execute benchmarks systematically, starting with high-priority security and safety tests. 
                  Document all results thoroughly.
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-success/10 text-success">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">3. Mitigate Issues</h3>
                </div>
                <p className="text-sm text-muted">
                  Address identified vulnerabilities through fine-tuning, guardrails, or architectural changes. 
                  Re-test after mitigations.
                </p>
              </Card>
            </div>
            
            <Card className="mt-8 p-8 bg-accent/5 border-accent/20">
              <h3 className="text-xl font-semibold mb-4">Recommended Evaluation Pipeline</h3>
              <div className="space-y-3">
                {[
                  { phase: 'Phase 1', title: 'Safety & Toxicity', benchmarks: 'ToxiGen, RealToxicityPrompts, HarmBench' },
                  { phase: 'Phase 2', title: 'Adversarial Robustness', benchmarks: 'AdvBench, PAIR, GCG' },
                  { phase: 'Phase 3', title: 'Bias & Fairness', benchmarks: 'BBQ, WinoBias, StereoSet' },
                  { phase: 'Phase 4', title: 'Privacy & Security', benchmarks: 'PrivacyBench, Extraction Benchmark' },
                  { phase: 'Phase 5', title: 'Truthfulness', benchmarks: 'TruthfulQA, HaluEval, FActScore' },
                  { phase: 'Phase 6', title: 'Capability Alignment', benchmarks: 'MACHIAVELLI, ETHICS, Anthropic Evals' }
                ].map((phase, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <Badge variant="primary" size="sm">{phase.phase}</Badge>
                    <div className="flex-1">
                      <span className="font-semibold">{phase.title}:</span>
                      <span className="text-sm text-muted ml-2">{phase.benchmarks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}