import type { Difficulty, CertProvider } from './types'

export interface CertificationDomain {
  name: string
  weight?: string
  topics: string[]
}

export interface Certification {
  id: string
  title: string
  abbreviation: string
  description: string
  provider: CertProvider
  providerName: string
  difficulty: Difficulty
  cost: {
    exam: number
    training?: number
    currency: string
  }
  duration: string
  prerequisites: string[]
  domains: CertificationDomain[]
  renewalPeriod?: string
  aiRelevance: 'primary' | 'secondary' | 'foundational'
  aiTopics: string[]
  url: string
  examFormat: string
  passingScore?: string
}

export const certifications: Certification[] = [
  {
    id: 'cert-sans-giac-gpen',
    title: 'GIAC Penetration Tester',
    abbreviation: 'GPEN',
    description: 'Industry-leading certification for penetration testers covering network, web, and now AI/ML security testing methodologies.',
    provider: 'sans',
    providerName: 'SANS Institute',
    difficulty: 'advanced',
    cost: {
      exam: 949,
      training: 8525,
      currency: 'USD'
    },
    duration: '6 days training + self-study',
    prerequisites: [
      '2+ years penetration testing experience recommended',
      'Strong networking and scripting knowledge',
      'Familiarity with common attack tools'
    ],
    domains: [
      {
        name: 'Planning, Scoping, and Reconnaissance',
        weight: '20%',
        topics: ['Rules of engagement', 'OSINT techniques', 'Target profiling']
      },
      {
        name: 'Scanning and Exploitation',
        weight: '35%',
        topics: ['Vulnerability scanning', 'Exploit development', 'Password attacks']
      },
      {
        name: 'Post-Exploitation and Reporting',
        weight: '25%',
        topics: ['Privilege escalation', 'Persistence', 'Documentation']
      },
      {
        name: 'Web and Cloud Attacks',
        weight: '20%',
        topics: ['Web app testing', 'Cloud security', 'API testing']
      }
    ],
    renewalPeriod: '4 years',
    aiRelevance: 'secondary',
    aiTopics: [
      'API security testing for AI endpoints',
      'Web application attacks applicable to LLM interfaces',
      'Post-exploitation techniques for ML infrastructure'
    ],
    url: 'https://www.giac.org/certifications/penetration-tester-gpen/',
    examFormat: '82-115 questions, 3 hours, open book',
    passingScore: '75%'
  },
  {
    id: 'cert-offsec-oscp',
    title: 'Offensive Security Certified Professional',
    abbreviation: 'OSCP',
    description: 'Highly respected hands-on certification requiring successful penetration of multiple machines in a 24-hour practical exam.',
    provider: 'offensive-security',
    providerName: 'Offensive Security',
    difficulty: 'advanced',
    cost: {
      exam: 1749,
      training: 0,
      currency: 'USD'
    },
    duration: '90 days lab access + 24-hour exam',
    prerequisites: [
      'Strong Linux/networking fundamentals',
      'Basic scripting (Python, Bash)',
      'Persistence and problem-solving ability'
    ],
    domains: [
      {
        name: 'Information Gathering',
        topics: ['Active recon', 'Passive recon', 'Enumeration']
      },
      {
        name: 'Vulnerability Analysis',
        topics: ['Manual testing', 'Automated scanning', 'Vulnerability research']
      },
      {
        name: 'Exploitation',
        topics: ['Buffer overflows', 'Web attacks', 'Client-side attacks']
      },
      {
        name: 'Post-Exploitation',
        topics: ['Privilege escalation', 'Lateral movement', 'Persistence']
      },
      {
        name: 'Reporting',
        topics: ['Documentation', 'Evidence collection', 'Professional reports']
      }
    ],
    renewalPeriod: 'Never expires',
    aiRelevance: 'secondary',
    aiTopics: [
      'Practical exploitation skills transferable to AI systems',
      'Web application testing for AI interfaces',
      'Post-exploitation applicable to ML infrastructure'
    ],
    url: 'https://www.offsec.com/courses/pen-200/',
    examFormat: '24-hour practical exam + report',
    passingScore: '70 points'
  },
  {
    id: 'cert-comptia-secplus',
    title: 'CompTIA Security+',
    abbreviation: 'Security+',
    description: 'Foundational security certification covering essential security concepts, now including AI/ML security considerations.',
    provider: 'comptia',
    providerName: 'CompTIA',
    difficulty: 'intermediate',
    cost: {
      exam: 392,
      training: 500,
      currency: 'USD'
    },
    duration: '2-3 months self-study',
    prerequisites: [
      'CompTIA Network+ recommended',
      '2 years IT experience recommended',
      'Basic security concepts understanding'
    ],
    domains: [
      {
        name: 'Threats, Attacks, and Vulnerabilities',
        weight: '24%',
        topics: ['Malware', 'Social engineering', 'Application attacks', 'AI-based attacks']
      },
      {
        name: 'Architecture and Design',
        weight: '21%',
        topics: ['Secure design', 'Cloud security', 'Virtualization', 'AI system security']
      },
      {
        name: 'Implementation',
        weight: '25%',
        topics: ['Identity management', 'Cryptography', 'Network security']
      },
      {
        name: 'Operations and Incident Response',
        weight: '16%',
        topics: ['Security tools', 'Incident response', 'Forensics']
      },
      {
        name: 'Governance, Risk, and Compliance',
        weight: '14%',
        topics: ['Policies', 'Risk management', 'Compliance', 'AI governance']
      }
    ],
    renewalPeriod: '3 years',
    aiRelevance: 'foundational',
    aiTopics: [
      'AI-based threat recognition',
      'Emerging AI security risks',
      'AI governance and compliance basics'
    ],
    url: 'https://www.comptia.org/certifications/security',
    examFormat: '90 questions, 90 minutes',
    passingScore: '750/900'
  },
  {
    id: 'cert-isc2-cissp',
    title: 'Certified Information Systems Security Professional',
    abbreviation: 'CISSP',
    description: 'Gold standard management-level certification covering broad security domains including emerging AI security considerations.',
    provider: 'isc2',
    providerName: '(ISC)²',
    difficulty: 'expert',
    cost: {
      exam: 749,
      training: 3000,
      currency: 'USD'
    },
    duration: '3-6 months preparation',
    prerequisites: [
      '5 years cumulative paid work experience in 2+ domains',
      'Or 4 years with relevant degree',
      'Endorsement by (ISC)² member required'
    ],
    domains: [
      {
        name: 'Security and Risk Management',
        weight: '15%',
        topics: ['Risk assessment', 'Compliance', 'Security governance', 'AI ethics']
      },
      {
        name: 'Asset Security',
        weight: '10%',
        topics: ['Data classification', 'Privacy', 'Asset management']
      },
      {
        name: 'Security Architecture and Engineering',
        weight: '13%',
        topics: ['Secure design', 'Cryptography', 'Site security']
      },
      {
        name: 'Communication and Network Security',
        weight: '13%',
        topics: ['Network architecture', 'Secure protocols', 'Network attacks']
      },
      {
        name: 'Identity and Access Management',
        weight: '13%',
        topics: ['Authentication', 'Authorization', 'Identity management']
      },
      {
        name: 'Security Assessment and Testing',
        weight: '12%',
        topics: ['Vulnerability assessment', 'Penetration testing', 'Security audits']
      },
      {
        name: 'Security Operations',
        weight: '13%',
        topics: ['Incident response', 'Disaster recovery', 'Investigations']
      },
      {
        name: 'Software Development Security',
        weight: '11%',
        topics: ['SDLC', 'Application security', 'AI/ML security']
      }
    ],
    renewalPeriod: '3 years',
    aiRelevance: 'secondary',
    aiTopics: [
      'AI risk management frameworks',
      'Emerging technology governance',
      'AI in security operations',
      'ML pipeline security'
    ],
    url: 'https://www.isc2.org/certifications/cissp',
    examFormat: 'CAT format, 125-175 questions, 4 hours',
    passingScore: '700/1000'
  },
  {
    id: 'cert-aws-ml-specialty',
    title: 'AWS Certified Machine Learning - Specialty',
    abbreviation: 'AWS ML',
    description: 'Validates expertise in building, training, and deploying ML models on AWS with security best practices.',
    provider: 'aws',
    providerName: 'Amazon Web Services',
    difficulty: 'advanced',
    cost: {
      exam: 300,
      training: 0,
      currency: 'USD'
    },
    duration: '2-4 months preparation',
    prerequisites: [
      '2+ years hands-on AWS experience',
      'Experience with ML/deep learning workloads',
      'AWS Associate certification recommended'
    ],
    domains: [
      {
        name: 'Data Engineering',
        weight: '20%',
        topics: ['Data ingestion', 'Data transformation', 'Data pipeline security']
      },
      {
        name: 'Exploratory Data Analysis',
        weight: '24%',
        topics: ['Data visualization', 'Feature engineering', 'Data quality']
      },
      {
        name: 'Modeling',
        weight: '36%',
        topics: ['Model selection', 'Training', 'Hyperparameter tuning', 'Evaluation']
      },
      {
        name: 'ML Implementation and Operations',
        weight: '20%',
        topics: ['Deployment', 'Security', 'Monitoring', 'MLOps']
      }
    ],
    renewalPeriod: '3 years',
    aiRelevance: 'primary',
    aiTopics: [
      'SageMaker security configurations',
      'Model encryption and access control',
      'Secure ML pipelines',
      'VPC configurations for ML workloads',
      'Model monitoring for security'
    ],
    url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
    examFormat: '65 questions, 180 minutes',
    passingScore: '750/1000'
  },
  {
    id: 'cert-google-ml-engineer',
    title: 'Google Cloud Professional Machine Learning Engineer',
    abbreviation: 'GCP ML',
    description: 'Certifies ability to design, build, and productionize ML models using Google Cloud with security considerations.',
    provider: 'google',
    providerName: 'Google Cloud',
    difficulty: 'advanced',
    cost: {
      exam: 200,
      training: 0,
      currency: 'USD'
    },
    duration: '2-3 months preparation',
    prerequisites: [
      '3+ years industry experience',
      '1+ years on Google Cloud',
      'ML model design and implementation experience'
    ],
    domains: [
      {
        name: 'Architecting ML Solutions',
        weight: '25%',
        topics: ['Solution design', 'Data preparation', 'Model architecture']
      },
      {
        name: 'Data Preparation and Processing',
        weight: '20%',
        topics: ['Data engineering', 'Feature engineering', 'Data validation']
      },
      {
        name: 'Model Development',
        weight: '20%',
        topics: ['Model building', 'Training', 'Evaluation']
      },
      {
        name: 'ML Pipeline Automation',
        weight: '20%',
        topics: ['MLOps', 'CI/CD', 'Orchestration']
      },
      {
        name: 'Model Serving and Monitoring',
        weight: '15%',
        topics: ['Deployment', 'Monitoring', 'Model governance']
      }
    ],
    renewalPeriod: '2 years',
    aiRelevance: 'primary',
    aiTopics: [
      'Vertex AI security features',
      'IAM for ML resources',
      'Model serving security',
      'Data encryption in pipelines',
      'Explainability and model cards'
    ],
    url: 'https://cloud.google.com/certification/machine-learning-engineer',
    examFormat: '50-60 questions, 2 hours',
    passingScore: 'Not disclosed'
  },
  {
    id: 'cert-azure-ai-engineer',
    title: 'Microsoft Azure AI Engineer Associate',
    abbreviation: 'Azure AI',
    description: 'Validates skills in building, managing, and deploying AI solutions on Azure with responsible AI practices.',
    provider: 'azure',
    providerName: 'Microsoft Azure',
    difficulty: 'intermediate',
    cost: {
      exam: 165,
      training: 0,
      currency: 'USD'
    },
    duration: '1-2 months preparation',
    prerequisites: [
      'Experience with Azure services',
      'Python or C# programming skills',
      'Understanding of AI/ML concepts'
    ],
    domains: [
      {
        name: 'Plan and Manage Azure AI Solutions',
        weight: '25-30%',
        topics: ['Solution planning', 'Security configuration', 'Responsible AI']
      },
      {
        name: 'Implement AI Solutions',
        weight: '30-35%',
        topics: ['Azure AI services', 'Custom models', 'Integration']
      },
      {
        name: 'Generative AI Solutions',
        weight: '20-25%',
        topics: ['Azure OpenAI', 'Prompt engineering', 'RAG patterns']
      },
      {
        name: 'Optimize AI Solutions',
        weight: '15-20%',
        topics: ['Performance tuning', 'Cost optimization', 'Monitoring']
      }
    ],
    renewalPeriod: '1 year',
    aiRelevance: 'primary',
    aiTopics: [
      'Azure OpenAI security',
      'Content filtering configuration',
      'Responsible AI implementation',
      'Managed identity for AI services',
      'Network isolation for AI'
    ],
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/',
    examFormat: '40-60 questions, 100 minutes',
    passingScore: '700/1000'
  },
  {
    id: 'cert-ec-ceh',
    title: 'Certified Ethical Hacker',
    abbreviation: 'CEH',
    description: 'Covers ethical hacking methodologies including AI system vulnerabilities and AI-powered attack tools.',
    provider: 'ec-council',
    providerName: 'EC-Council',
    difficulty: 'intermediate',
    cost: {
      exam: 1199,
      training: 2000,
      currency: 'USD'
    },
    duration: '5-day course + self-study',
    prerequisites: [
      '2 years IT security experience or',
      'Official EC-Council training attendance'
    ],
    domains: [
      {
        name: 'Introduction and Reconnaissance',
        weight: '15%',
        topics: ['Ethical hacking overview', 'Footprinting', 'Scanning']
      },
      {
        name: 'Gaining Access',
        weight: '30%',
        topics: ['System hacking', 'Malware', 'Sniffing', 'Social engineering']
      },
      {
        name: 'Post-Attack',
        weight: '25%',
        topics: ['Session hijacking', 'Evading IDS/firewalls', 'Web server hacking']
      },
      {
        name: 'Web and Mobile',
        weight: '20%',
        topics: ['Web app hacking', 'SQL injection', 'Mobile platforms']
      },
      {
        name: 'Emerging Technologies',
        weight: '10%',
        topics: ['IoT', 'Cloud', 'AI/ML security']
      }
    ],
    renewalPeriod: '3 years',
    aiRelevance: 'secondary',
    aiTopics: [
      'AI-powered reconnaissance tools',
      'Machine learning for vulnerability detection',
      'AI system attack surfaces',
      'Adversarial machine learning basics'
    ],
    url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
    examFormat: '125 questions, 4 hours',
    passingScore: '70%'
  }
]

// Helper functions
export const getCertById = (id: string): Certification | undefined => {
  return certifications.find(cert => cert.id === id)
}

export const getCertsByDifficulty = (difficulty: Difficulty): Certification[] => {
  return certifications.filter(cert => cert.difficulty === difficulty)
}

export const getCertsByProvider = (provider: CertProvider): Certification[] => {
  return certifications.filter(cert => cert.provider === provider)
}

export const getCertsByAIRelevance = (relevance: 'primary' | 'secondary' | 'foundational'): Certification[] => {
  return certifications.filter(cert => cert.aiRelevance === relevance)
}

export const getCertsUnderCost = (maxCost: number): Certification[] => {
  return certifications.filter(cert => cert.cost.exam <= maxCost)
}

// Stats
export const certStats = {
  totalCerts: certifications.length,
  byDifficulty: {
    beginner: getCertsByDifficulty('beginner').length,
    intermediate: getCertsByDifficulty('intermediate').length,
    advanced: getCertsByDifficulty('advanced').length,
    expert: getCertsByDifficulty('expert').length,
  },
  byAIRelevance: {
    primary: getCertsByAIRelevance('primary').length,
    secondary: getCertsByAIRelevance('secondary').length,
    foundational: getCertsByAIRelevance('foundational').length,
  },
  avgExamCost: Math.round(certifications.reduce((sum, c) => sum + c.cost.exam, 0) / certifications.length),
  providers: [...new Set(certifications.map(c => c.providerName))].length
}
