import type { Difficulty, ExternalLink } from './types'

export interface LearningModule {
  id: string
  title: string
  description: string
  duration: string
  topics: string[]
  resources: ExternalLink[]
  labs?: string[]
  skills: string[]
}

export interface LearningPath {
  id: string
  title: string
  description: string
  role: string
  targetAudience: string
  duration: string
  difficulty: Difficulty
  prerequisites: string[]
  modules: LearningModule[]
  skillsGained: string[]
  careerOutcomes: string[]
  icon: string
  color: string
}

export const learningPaths: LearningPath[] = [
  {
    id: 'path-beginner',
    title: 'AI Security Fundamentals',
    description: 'Start your journey into AI security with foundational concepts, common vulnerabilities, and essential defense strategies.',
    role: 'Security Beginner',
    targetAudience: 'Developers, IT professionals, and security newcomers wanting to understand AI security basics',
    duration: '6-8 weeks',
    difficulty: 'beginner',
    prerequisites: [
      'Basic understanding of programming concepts',
      'Familiarity with web applications',
      'Interest in cybersecurity or AI'
    ],
    icon: 'BookOpen',
    color: 'green',
    modules: [
      {
        id: 'mod-b-001',
        title: 'Introduction to AI/ML Security',
        description: 'Understand the unique security challenges posed by AI systems and why traditional security approaches may not be sufficient.',
        duration: '4 hours',
        topics: [
          'What makes AI security different',
          'AI/ML system components and attack surfaces',
          'Overview of OWASP LLM Top 10',
          'Introduction to MITRE ATLAS'
        ],
        resources: [
          { url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', label: 'OWASP LLM Top 10', type: 'documentation' },
          { url: 'https://atlas.mitre.org/', label: 'MITRE ATLAS', type: 'documentation' }
        ],
        labs: ['lab-ctf-001', 'lab-ctf-005'],
        skills: ['AI security fundamentals', 'Threat landscape awareness']
      },
      {
        id: 'mod-b-002',
        title: 'Understanding LLMs',
        description: 'Learn how large language models work, their architecture, and inherent limitations that lead to security vulnerabilities.',
        duration: '6 hours',
        topics: [
          'Transformer architecture basics',
          'How LLMs process and generate text',
          'Context windows and attention mechanisms',
          'Fine-tuning and prompt engineering basics'
        ],
        resources: [
          { url: 'https://jalammar.github.io/illustrated-transformer/', label: 'Illustrated Transformer', type: 'documentation' },
          { url: 'https://course.fast.ai/', label: 'Fast.ai Course', type: 'video' }
        ],
        skills: ['LLM architecture understanding', 'Technical vocabulary']
      },
      {
        id: 'mod-b-003',
        title: 'Prompt Injection Basics',
        description: 'Explore the most common LLM vulnerability: prompt injection. Learn how it works and basic defense strategies.',
        duration: '8 hours',
        topics: [
          'What is prompt injection',
          'Direct vs indirect injection',
          'Common injection techniques',
          'Basic detection and prevention'
        ],
        resources: [
          { url: 'https://gandalf.lakera.ai/', label: 'Gandalf CTF', type: 'website' },
          { url: 'https://learnprompting.org/docs/prompt_hacking/injection', label: 'Learn Prompting - Injection', type: 'documentation' }
        ],
        labs: ['lab-ctf-001', 'lab-ctf-003', 'lab-ctf-005'],
        skills: ['Prompt injection recognition', 'Basic payload crafting']
      },
      {
        id: 'mod-b-004',
        title: 'Data Security in AI',
        description: 'Understand how AI systems can leak sensitive data and the importance of data protection.',
        duration: '5 hours',
        topics: [
          'Training data extraction risks',
          'PII exposure in LLM outputs',
          'RAG security considerations',
          'Data classification for AI systems'
        ],
        resources: [
          { url: 'https://arxiv.org/abs/2012.07805', label: 'Training Data Extraction Paper', type: 'paper' }
        ],
        labs: ['lab-rag-001'],
        skills: ['Data leakage awareness', 'Privacy considerations']
      },
      {
        id: 'mod-b-005',
        title: 'AI Security Tools Introduction',
        description: 'Get hands-on with essential tools for testing and securing AI systems.',
        duration: '6 hours',
        topics: [
          'LLM testing frameworks overview',
          'Introduction to Garak',
          'Using prompt injection detection tools',
          'Basic security monitoring'
        ],
        resources: [
          { url: 'https://github.com/leondz/garak', label: 'Garak', type: 'github' },
          { url: 'https://llm-guard.com/', label: 'LLM Guard', type: 'website' }
        ],
        skills: ['Tool familiarity', 'Basic testing methodology']
      },
      {
        id: 'mod-b-006',
        title: 'Defense Fundamentals',
        description: 'Learn essential defense strategies for protecting AI applications.',
        duration: '6 hours',
        topics: [
          'Input validation and sanitization',
          'Output filtering techniques',
          'Rate limiting and monitoring',
          'Human-in-the-loop designs'
        ],
        resources: [
          { url: 'https://github.com/NVIDIA/NeMo-Guardrails', label: 'NeMo Guardrails', type: 'github' }
        ],
        skills: ['Defense implementation', 'Security architecture basics']
      },
      {
        id: 'mod-b-007',
        title: 'Compliance and Standards',
        description: 'Overview of AI security standards, regulations, and best practices.',
        duration: '4 hours',
        topics: [
          'NIST AI Risk Management Framework',
          'EU AI Act overview',
          'ISO 42001 introduction',
          'Industry best practices'
        ],
        resources: [
          { url: 'https://www.nist.gov/itl/ai-risk-management-framework', label: 'NIST AI RMF', type: 'documentation' }
        ],
        skills: ['Compliance awareness', 'Standards knowledge']
      },
      {
        id: 'mod-b-008',
        title: 'Capstone: Secure an LLM Application',
        description: 'Apply everything you learned to assess and secure a sample LLM application.',
        duration: '10 hours',
        topics: [
          'Threat modeling for AI applications',
          'Vulnerability assessment',
          'Implementing defenses',
          'Documentation and reporting'
        ],
        resources: [],
        labs: ['lab-self-002', 'lab-platform-003'],
        skills: ['End-to-end security assessment', 'Documentation']
      }
    ],
    skillsGained: [
      'AI/ML security fundamentals',
      'Prompt injection understanding',
      'Basic vulnerability assessment',
      'Defense implementation basics',
      'Compliance awareness'
    ],
    careerOutcomes: [
      'AI-aware security analyst',
      'Junior AI security engineer',
      'Security-conscious AI developer'
    ]
  },
  {
    id: 'path-redteam',
    title: 'Offensive AI Security',
    description: 'Master the art of attacking AI systems. Learn advanced exploitation techniques for LLMs, ML models, and AI agents.',
    role: 'AI Red Teamer',
    targetAudience: 'Penetration testers, red teamers, and security researchers wanting to specialize in AI security',
    duration: '10-12 weeks',
    difficulty: 'advanced',
    prerequisites: [
      'Strong penetration testing experience',
      'Python programming skills',
      'Understanding of web application security',
      'Completed AI Security Fundamentals or equivalent'
    ],
    icon: 'Swords',
    color: 'red',
    modules: [
      {
        id: 'mod-r-001',
        title: 'Advanced Prompt Injection',
        description: 'Deep dive into sophisticated prompt injection techniques including multi-turn attacks, payload splitting, and evasion.',
        duration: '12 hours',
        topics: [
          'Multi-turn and context-based attacks',
          'Payload obfuscation techniques',
          'Defense evasion strategies',
          'Automated injection testing'
        ],
        resources: [
          { url: 'https://github.com/leondz/garak', label: 'Garak Framework', type: 'github' }
        ],
        labs: ['lab-ctf-002', 'lab-platform-001', 'lab-platform-004'],
        skills: ['Advanced injection techniques', 'Evasion methods']
      },
      {
        id: 'mod-r-002',
        title: 'Jailbreaking Mastery',
        description: 'Comprehensive coverage of jailbreaking techniques from basic to state-of-the-art methods.',
        duration: '10 hours',
        topics: [
          'Persona-based jailbreaks',
          'Encoding and obfuscation bypasses',
          'Multi-language attacks',
          'Research on latest jailbreak techniques'
        ],
        resources: [
          { url: 'https://app.grayswan.ai/arena', label: 'Gray Swan Arena', type: 'website' }
        ],
        labs: ['lab-platform-004', 'lab-platform-005'],
        skills: ['Jailbreak methodology', 'Safety bypass techniques']
      },
      {
        id: 'mod-r-003',
        title: 'Agent and Tool Exploitation',
        description: 'Learn to attack LLM agents with tool access, including SSRF, command injection, and privilege escalation.',
        duration: '14 hours',
        topics: [
          'Agent architecture vulnerabilities',
          'Tool abuse via prompt injection',
          'SSRF and internal network attacks',
          'Privilege escalation techniques'
        ],
        resources: [
          { url: 'https://gandalf.lakera.ai/agent-breaker', label: 'Agent Breaker', type: 'website' }
        ],
        labs: ['lab-ctf-002', 'lab-platform-002'],
        skills: ['Agent exploitation', 'Tool abuse techniques']
      },
      {
        id: 'mod-r-004',
        title: 'Data Extraction Attacks',
        description: 'Master techniques for extracting sensitive data from LLMs including training data, system prompts, and RAG contents.',
        duration: '10 hours',
        topics: [
          'Training data extraction methods',
          'System prompt extraction',
          'RAG data exfiltration',
          'Cross-tenant data access'
        ],
        resources: [],
        labs: ['lab-rag-001', 'lab-rag-002'],
        skills: ['Data extraction methodology', 'Information disclosure']
      },
      {
        id: 'mod-r-005',
        title: 'Model-Level Attacks',
        description: 'Understand and execute attacks targeting the ML model itself including poisoning, extraction, and adversarial examples.',
        duration: '16 hours',
        topics: [
          'Model extraction techniques',
          'Data poisoning attacks',
          'Adversarial example generation',
          'Backdoor insertion methods'
        ],
        resources: [
          { url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox', label: 'ART Toolbox', type: 'github' },
          { url: 'https://textattack.readthedocs.io/', label: 'TextAttack', type: 'documentation' }
        ],
        skills: ['ML attack execution', 'Adversarial ML']
      },
      {
        id: 'mod-r-006',
        title: 'Multimodal Attacks',
        description: 'Explore attacks leveraging multiple input modalities including images, audio, and video.',
        duration: '8 hours',
        topics: [
          'Image-based prompt injection',
          'Audio adversarial examples',
          'Cross-modal attacks',
          'Multimodal defense evasion'
        ],
        resources: [],
        labs: [],
        skills: ['Multimodal attack vectors', 'Cross-modality exploitation']
      },
      {
        id: 'mod-r-007',
        title: 'Automated Red Teaming',
        description: 'Build and deploy automated AI red teaming tools and pipelines.',
        duration: '12 hours',
        topics: [
          'Building custom testing frameworks',
          'Fuzzing LLM applications',
          'Integration with CI/CD pipelines',
          'Scaling red team operations'
        ],
        resources: [
          { url: 'https://github.com/Azure/PyRIT', label: 'PyRIT', type: 'github' },
          { url: 'https://www.promptfoo.dev/', label: 'Promptfoo', type: 'website' }
        ],
        skills: ['Automation development', 'Scalable testing']
      },
      {
        id: 'mod-r-008',
        title: 'Supply Chain Attacks',
        description: 'Attack vectors targeting the ML supply chain including model hubs, libraries, and deployment infrastructure.',
        duration: '8 hours',
        topics: [
          'Model repository attacks',
          'Pickle deserialization exploits',
          'Library supply chain compromise',
          'Infrastructure attacks'
        ],
        resources: [
          { url: 'https://github.com/protectai/modelscan', label: 'ModelScan', type: 'github' }
        ],
        skills: ['Supply chain security', 'Dependency analysis']
      },
      {
        id: 'mod-r-009',
        title: 'Real-World Engagements',
        description: 'Best practices for conducting AI security assessments in production environments.',
        duration: '10 hours',
        topics: [
          'Scoping AI pentests',
          'Rules of engagement',
          'Safe testing practices',
          'Report writing for AI findings'
        ],
        resources: [],
        skills: ['Professional consulting', 'Client communication']
      },
      {
        id: 'mod-r-010',
        title: 'Capstone: Full AI Red Team Assessment',
        description: 'Execute a comprehensive red team assessment against a complex AI application.',
        duration: '20 hours',
        topics: [
          'Reconnaissance and scoping',
          'Multi-vector attack execution',
          'Finding prioritization',
          'Executive reporting'
        ],
        resources: [],
        labs: ['lab-self-001', 'lab-self-004'],
        skills: ['End-to-end assessment', 'Professional delivery']
      }
    ],
    skillsGained: [
      'Advanced prompt injection and jailbreaking',
      'Agent and tool exploitation',
      'Model-level attack execution',
      'Automated red teaming',
      'Professional AI security assessments'
    ],
    careerOutcomes: [
      'AI Red Team Lead',
      'Senior AI Security Researcher',
      'AI Penetration Testing Specialist',
      'Bug Bounty Hunter (AI focus)'
    ]
  },
  {
    id: 'path-blueteam',
    title: 'Defensive AI Security',
    description: 'Learn to protect AI systems with comprehensive defensive strategies, monitoring, and incident response.',
    role: 'AI Security Engineer',
    targetAudience: 'Security engineers, DevSecOps professionals, and ML engineers wanting to build secure AI systems',
    duration: '10-12 weeks',
    difficulty: 'advanced',
    prerequisites: [
      'Experience with security engineering',
      'Understanding of cloud infrastructure',
      'Python programming skills',
      'Familiarity with ML/AI concepts'
    ],
    icon: 'Shield',
    color: 'blue',
    modules: [
      {
        id: 'mod-d-001',
        title: 'Secure AI Architecture',
        description: 'Design secure AI system architectures with defense-in-depth principles.',
        duration: '10 hours',
        topics: [
          'Threat modeling for AI systems',
          'Defense-in-depth for LLMs',
          'Secure RAG architectures',
          'Multi-tenant AI security'
        ],
        resources: [
          { url: 'https://blog.google/technology/safety-security/introducing-googles-secure-ai-framework/', label: 'Google SAIF', type: 'documentation' }
        ],
        skills: ['Security architecture', 'Threat modeling']
      },
      {
        id: 'mod-d-002',
        title: 'Input Validation and Sanitization',
        description: 'Implement robust input handling to prevent injection attacks.',
        duration: '8 hours',
        topics: [
          'Input filtering strategies',
          'Prompt injection detection',
          'Content moderation integration',
          'Input schema validation'
        ],
        resources: [
          { url: 'https://llm-guard.com/', label: 'LLM Guard', type: 'website' }
        ],
        skills: ['Input security', 'Filtering implementation']
      },
      {
        id: 'mod-d-003',
        title: 'Output Filtering and Safety',
        description: 'Protect users and systems with comprehensive output validation.',
        duration: '8 hours',
        topics: [
          'PII detection and redaction',
          'Harmful content filtering',
          'Output schema enforcement',
          'Hallucination detection'
        ],
        resources: [
          { url: 'https://microsoft.github.io/presidio/', label: 'Microsoft Presidio', type: 'github' }
        ],
        skills: ['Output security', 'Content moderation']
      },
      {
        id: 'mod-d-004',
        title: 'Guardrails and Safety Layers',
        description: 'Implement guardrails using frameworks like NeMo and LangChain.',
        duration: '12 hours',
        topics: [
          'NeMo Guardrails implementation',
          'LangChain security features',
          'Custom guardrail development',
          'Testing guardrail effectiveness'
        ],
        resources: [
          { url: 'https://github.com/NVIDIA/NeMo-Guardrails', label: 'NeMo Guardrails', type: 'github' }
        ],
        skills: ['Guardrail implementation', 'Safety engineering']
      },
      {
        id: 'mod-d-005',
        title: 'Agent Security',
        description: 'Secure LLM agents with tool access control, sandboxing, and monitoring.',
        duration: '10 hours',
        topics: [
          'Tool permission management',
          'Sandbox environments',
          'Action auditing',
          'Human-in-the-loop workflows'
        ],
        resources: [],
        skills: ['Agent security', 'Access control']
      },
      {
        id: 'mod-d-006',
        title: 'Security Monitoring and Logging',
        description: 'Build comprehensive monitoring for AI system security.',
        duration: '10 hours',
        topics: [
          'LLM observability platforms',
          'Security event logging',
          'Anomaly detection',
          'Alert configuration'
        ],
        resources: [
          { url: 'https://langfuse.com/', label: 'Langfuse', type: 'website' }
        ],
        skills: ['Security monitoring', 'Observability']
      },
      {
        id: 'mod-d-007',
        title: 'Supply Chain Security',
        description: 'Protect the ML supply chain from model to deployment.',
        duration: '8 hours',
        topics: [
          'Model provenance verification',
          'Dependency scanning',
          'Container security for ML',
          'Infrastructure hardening'
        ],
        resources: [
          { url: 'https://github.com/protectai/modelscan', label: 'ModelScan', type: 'github' }
        ],
        skills: ['Supply chain security', 'DevSecOps']
      },
      {
        id: 'mod-d-008',
        title: 'Incident Response for AI',
        description: 'Develop and practice incident response procedures for AI security events.',
        duration: '8 hours',
        topics: [
          'AI incident classification',
          'Response playbooks',
          'Forensics for AI systems',
          'Post-incident analysis'
        ],
        resources: [],
        skills: ['Incident response', 'Forensics']
      },
      {
        id: 'mod-d-009',
        title: 'Compliance and Governance',
        description: 'Implement AI security compliance programs aligned with regulations.',
        duration: '8 hours',
        topics: [
          'AI governance frameworks',
          'EU AI Act compliance',
          'NIST AI RMF implementation',
          'Audit preparation'
        ],
        resources: [
          { url: 'https://www.nist.gov/itl/ai-risk-management-framework', label: 'NIST AI RMF', type: 'documentation' }
        ],
        skills: ['Compliance management', 'Governance']
      },
      {
        id: 'mod-d-010',
        title: 'Capstone: Secure AI System Deployment',
        description: 'Design and deploy a fully secured AI application with comprehensive defenses.',
        duration: '20 hours',
        topics: [
          'Security requirements gathering',
          'Architecture implementation',
          'Defense deployment',
          'Security validation'
        ],
        resources: [],
        skills: ['End-to-end implementation', 'Security validation']
      }
    ],
    skillsGained: [
      'Secure AI architecture design',
      'Defense implementation',
      'Security monitoring',
      'Incident response',
      'Compliance management'
    ],
    careerOutcomes: [
      'AI Security Engineer',
      'ML Security Architect',
      'AI DevSecOps Engineer',
      'AI Compliance Officer'
    ]
  },
  {
    id: 'path-expert',
    title: 'AI Security Research',
    description: 'Push the boundaries of AI security with original research, novel attacks, and cutting-edge defenses.',
    role: 'AI Security Researcher',
    targetAudience: 'Experienced security researchers wanting to contribute to AI security knowledge and publish findings',
    duration: '12-16 weeks',
    difficulty: 'expert',
    prerequisites: [
      'Strong background in security research',
      'Publication experience preferred',
      'Deep ML/AI technical knowledge',
      'Completed Red Team or Blue Team path'
    ],
    icon: 'Microscope',
    color: 'purple',
    modules: [
      {
        id: 'mod-e-001',
        title: 'Research Methodology',
        description: 'Learn systematic approaches to AI security research.',
        duration: '8 hours',
        topics: [
          'Research question formulation',
          'Literature review techniques',
          'Experiment design',
          'Reproducibility practices'
        ],
        resources: [
          { url: 'https://arxiv.org/list/cs.CR/recent', label: 'arXiv Security Papers', type: 'paper' }
        ],
        skills: ['Research methodology', 'Academic writing']
      },
      {
        id: 'mod-e-002',
        title: 'Novel Attack Development',
        description: 'Techniques for discovering and developing new attack vectors.',
        duration: '20 hours',
        topics: [
          'Attack surface analysis',
          'Fuzzing and mutation strategies',
          'Novel jailbreak research',
          'Zero-day development'
        ],
        resources: [],
        skills: ['Vulnerability research', 'Novel attack discovery']
      },
      {
        id: 'mod-e-003',
        title: 'Defense Innovation',
        description: 'Research and develop novel defensive techniques.',
        duration: '20 hours',
        topics: [
          'Constitutional AI approaches',
          'Adversarial training methods',
          'Novel detection algorithms',
          'Defense evaluation methodology'
        ],
        resources: [],
        skills: ['Defense research', 'Algorithm development']
      },
      {
        id: 'mod-e-004',
        title: 'Interpretability and Analysis',
        description: 'Understand model internals for security research.',
        duration: '15 hours',
        topics: [
          'Mechanistic interpretability',
          'Attention analysis',
          'Probing techniques',
          'Safety-relevant circuits'
        ],
        resources: [
          { url: 'https://transformer-circuits.pub/', label: 'Transformer Circuits', type: 'documentation' }
        ],
        skills: ['Interpretability', 'Model analysis']
      },
      {
        id: 'mod-e-005',
        title: 'Alignment and Safety',
        description: 'Deep dive into AI alignment research and its security implications.',
        duration: '12 hours',
        topics: [
          'Alignment problem overview',
          'RLHF security considerations',
          'Constitutional AI deep dive',
          'Future safety concerns'
        ],
        resources: [
          { url: 'https://www.anthropic.com/research', label: 'Anthropic Research', type: 'documentation' }
        ],
        skills: ['Alignment understanding', 'Safety research']
      },
      {
        id: 'mod-e-006',
        title: 'Publication and Disclosure',
        description: 'Navigate the responsible disclosure process and academic publication.',
        duration: '8 hours',
        topics: [
          'Responsible disclosure practices',
          'Writing security papers',
          'Conference submissions',
          'Coordinated vulnerability disclosure'
        ],
        resources: [],
        skills: ['Academic writing', 'Responsible disclosure']
      },
      {
        id: 'mod-e-007',
        title: 'Tool and Framework Development',
        description: 'Build research tools that advance the field.',
        duration: '20 hours',
        topics: [
          'Open source security tools',
          'Benchmark development',
          'Framework contributions',
          'Community building'
        ],
        resources: [],
        skills: ['Tool development', 'Open source']
      },
      {
        id: 'mod-e-008',
        title: 'Research Capstone',
        description: 'Conduct original research and produce a publishable paper or tool.',
        duration: '40 hours',
        topics: [
          'Research execution',
          'Paper writing',
          'Peer review',
          'Presentation'
        ],
        resources: [],
        skills: ['Independent research', 'Publication']
      }
    ],
    skillsGained: [
      'Original security research',
      'Novel attack/defense development',
      'Academic publication',
      'Tool development',
      'Community leadership'
    ],
    careerOutcomes: [
      'AI Security Researcher (Industry/Academia)',
      'AI Safety Researcher',
      'Security Research Lead',
      'AI Security Startup Founder'
    ]
  }
]

// Helper functions
export const getPathById = (id: string): LearningPath | undefined => {
  return learningPaths.find(path => path.id === id)
}

export const getPathsByDifficulty = (difficulty: Difficulty): LearningPath[] => {
  return learningPaths.filter(path => path.difficulty === difficulty)
}

export const getAllModules = (): LearningModule[] => {
  return learningPaths.flatMap(path => path.modules)
}

export const getModuleById = (moduleId: string): LearningModule | undefined => {
  return getAllModules().find(mod => mod.id === moduleId)
}

// Stats
export const pathStats = {
  totalPaths: learningPaths.length,
  totalModules: getAllModules().length,
  totalHours: learningPaths.reduce((sum, path) => {
    const hours = path.modules.reduce((modSum, mod) => {
      const num = parseInt(mod.duration.split(' ')[0])
      return modSum + num
    }, 0)
    return sum + hours
  }, 0),
  byDifficulty: {
    beginner: getPathsByDifficulty('beginner').length,
    intermediate: getPathsByDifficulty('intermediate').length,
    advanced: getPathsByDifficulty('advanced').length,
    expert: getPathsByDifficulty('expert').length,
  }
}
