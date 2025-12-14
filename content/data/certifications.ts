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
  },
  // GIAC/SANS AI Security Certifications
  {
    id: 'cert-sans-gmle',
    title: 'GIAC Machine Learning Engineer',
    abbreviation: 'GMLE',
    description: 'Validates expertise in applying machine learning to cybersecurity, including anomaly detection, deep learning, and Python-based ML security solutions.',
    provider: 'sans',
    providerName: 'SANS Institute',
    difficulty: 'advanced',
    cost: {
      exam: 979,
      training: 8116,
      currency: 'USD'
    },
    duration: '6 days training + self-study',
    prerequisites: [
      'Intermediate Python programming',
      'Basic mathematics (linear algebra, statistics)',
      'Familiarity with cybersecurity concepts'
    ],
    domains: [
      {
        name: 'ML Fundamentals for Security',
        weight: '25%',
        topics: ['Supervised learning', 'Unsupervised learning', 'Feature engineering']
      },
      {
        name: 'Anomaly Detection',
        weight: '25%',
        topics: ['Statistical methods', 'ML-based detection', 'Time series analysis']
      },
      {
        name: 'Deep Learning',
        weight: '25%',
        topics: ['Neural networks', 'CNNs', 'RNNs', 'Transfer learning']
      },
      {
        name: 'Applied ML Security',
        weight: '25%',
        topics: ['Malware classification', 'Threat detection', 'Model deployment']
      }
    ],
    renewalPeriod: '4 years',
    aiRelevance: 'primary',
    aiTopics: [
      'ML for cybersecurity applications',
      'Anomaly detection systems',
      'Deep learning for threat detection',
      'Python ML security tools',
      'CyberLive hands-on practical testing'
    ],
    url: 'https://www.giac.org/certifications/machine-learning-engineer-gmle',
    examFormat: '82 questions, 3 hours, open book',
    passingScore: '65%'
  },
  {
    id: 'cert-sans-goaa',
    title: 'GIAC Offensive AI Analyst',
    abbreviation: 'GOAA',
    description: 'Focuses on offensive AI techniques including AI-driven reconnaissance, deepfake phishing, AI malware, and guardrail bypass methods.',
    provider: 'sans',
    providerName: 'SANS Institute',
    difficulty: 'advanced',
    cost: {
      exam: 979,
      training: 5000,
      currency: 'USD'
    },
    duration: '3 days training + self-study',
    prerequisites: [
      'Security testing experience',
      'Understanding of AI/ML concepts',
      'Familiarity with red team operations'
    ],
    domains: [
      {
        name: 'AI-Driven Reconnaissance',
        weight: '25%',
        topics: ['OSINT automation', 'AI target profiling', 'Social media analysis']
      },
      {
        name: 'Deepfake and Social Engineering',
        weight: '25%',
        topics: ['Voice cloning', 'Video deepfakes', 'AI-powered phishing']
      },
      {
        name: 'AI Malware and Evasion',
        weight: '25%',
        topics: ['AI-generated malware', 'Evasion techniques', 'Adversarial samples']
      },
      {
        name: 'Guardrail Bypass',
        weight: '25%',
        topics: ['Jailbreaking', 'Prompt injection', 'Safety mechanism bypass']
      }
    ],
    renewalPeriod: '4 years',
    aiRelevance: 'primary',
    aiTopics: [
      'AI-driven reconnaissance automation',
      'Deepfake creation and detection',
      'AI-powered phishing campaigns',
      'LLM guardrail bypass techniques',
      'Offensive AI tooling'
    ],
    url: 'https://www.sans.org/cyber-security-courses/sec535/',
    examFormat: 'Certification launching 2026',
    passingScore: 'TBD'
  },
  {
    id: 'cert-sans-genai-security',
    title: 'GenAI Security',
    abbreviation: 'SEC545',
    description: 'Covers LLM fundamentals, prompt injection attacks, RAG security, and AI agent security for practitioners building or defending AI systems.',
    provider: 'sans',
    providerName: 'SANS Institute',
    difficulty: 'intermediate',
    cost: {
      exam: 0,
      training: 6000,
      currency: 'USD'
    },
    duration: '3 days training',
    prerequisites: [
      'Basic understanding of LLMs',
      'General security knowledge',
      'Programming familiarity helpful'
    ],
    domains: [
      {
        name: 'LLM Fundamentals',
        weight: '25%',
        topics: ['Transformer architecture', 'Tokenization', 'Inference']
      },
      {
        name: 'Prompt Injection',
        weight: '30%',
        topics: ['Direct injection', 'Indirect injection', 'Defense strategies']
      },
      {
        name: 'RAG Security',
        weight: '25%',
        topics: ['Vector database security', 'Embedding attacks', 'Retrieval poisoning']
      },
      {
        name: 'AI Agent Security',
        weight: '20%',
        topics: ['Tool security', 'Agent orchestration', 'Memory protection']
      }
    ],
    aiRelevance: 'primary',
    aiTopics: [
      'LLM architecture and vulnerabilities',
      'Prompt injection attack and defense',
      'RAG system security',
      'AI agent security patterns',
      'OWASP LLM Top 10'
    ],
    url: 'https://www.sans.org/cyber-security-courses/sec545/',
    examFormat: 'No certification exam - training only',
    passingScore: 'N/A'
  },
  {
    id: 'cert-sans-sec598',
    title: 'Security Automation with GenAI',
    abbreviation: 'SEC598',
    description: 'Advanced course on using generative AI for security automation including detection-as-code, agentic automation, and AI-powered red/blue team operations.',
    provider: 'sans',
    providerName: 'SANS Institute',
    difficulty: 'advanced',
    cost: {
      exam: 0,
      training: 9000,
      currency: 'USD'
    },
    duration: '6 days training',
    prerequisites: [
      'Experience with security operations',
      'Programming skills (Python preferred)',
      'Familiarity with AI/ML concepts'
    ],
    domains: [
      {
        name: 'Detection-as-Code',
        weight: '25%',
        topics: ['AI-generated detection rules', 'SIGMA/YARA automation', 'Rule optimization']
      },
      {
        name: 'Agentic Automation',
        weight: '25%',
        topics: ['AI agents for SOC', 'Automated triage', 'Response automation']
      },
      {
        name: 'Red Team AI',
        weight: '25%',
        topics: ['AI attack simulation', 'Automated penetration testing', 'Social engineering']
      },
      {
        name: 'Blue Team AI',
        weight: '25%',
        topics: ['AI-powered defense', 'Threat hunting', 'Incident response']
      }
    ],
    aiRelevance: 'primary',
    aiTopics: [
      'Detection-as-code with AI',
      'Agentic security automation',
      'AI-powered red teaming',
      'Blue team AI applications',
      'Security workflow automation'
    ],
    url: 'https://www.sans.org/cyber-security-courses/sec598/',
    examFormat: 'No certification exam - training only',
    passingScore: 'N/A'
  },
  // CompTIA AI Security
  {
    id: 'cert-comptia-secai',
    title: 'CompTIA SecAI+',
    abbreviation: 'SecAI+',
    description: 'Upcoming certification covering AI security concepts, securing AI systems, AI-assisted security operations, and AI governance. Launching February 2026.',
    provider: 'comptia',
    providerName: 'CompTIA',
    difficulty: 'intermediate',
    cost: {
      exam: 450,
      training: 500,
      currency: 'USD'
    },
    duration: '2-3 months preparation',
    prerequisites: [
      '3-4 years IT experience',
      '2+ years cybersecurity experience',
      'Security+ or equivalent recommended'
    ],
    domains: [
      {
        name: 'Basic AI Concepts',
        weight: '17%',
        topics: ['AI/ML fundamentals', 'LLM architecture', 'AI terminology']
      },
      {
        name: 'Securing AI Systems',
        weight: '40%',
        topics: ['AI threat landscape', 'Prompt injection', 'Model security', 'Data protection']
      },
      {
        name: 'AI-Assisted Security Ops',
        weight: '24%',
        topics: ['AI for detection', 'Automated response', 'AI SOC tools']
      },
      {
        name: 'AI Governance',
        weight: '19%',
        topics: ['AI policies', 'Risk management', 'Compliance', 'Ethics']
      }
    ],
    aiRelevance: 'primary',
    aiTopics: [
      'Comprehensive AI security coverage',
      'Securing AI systems end-to-end',
      'AI-assisted security operations',
      'AI governance and compliance',
      'Industry-standard AI security certification'
    ],
    url: 'https://www.comptia.org/certifications/secai',
    examFormat: 'TBD - Launching February 17, 2026',
    passingScore: 'TBD'
  },
  {
    id: 'cert-comptia-ai-essentials',
    title: 'CompTIA AI Essentials',
    abbreviation: 'AI Essentials',
    description: 'Entry-level certification covering GenAI fundamentals, effective prompting techniques, and avoiding hallucinations. Ideal starting point for AI literacy.',
    provider: 'comptia',
    providerName: 'CompTIA',
    difficulty: 'beginner',
    cost: {
      exam: 99,
      training: 0,
      currency: 'USD'
    },
    duration: '2-3 hours',
    prerequisites: [
      'No formal prerequisites',
      'Basic computer literacy',
      'Interest in AI technology'
    ],
    domains: [
      {
        name: 'GenAI Fundamentals',
        weight: '40%',
        topics: ['What is AI', 'Types of AI', 'How LLMs work']
      },
      {
        name: 'Prompting Techniques',
        weight: '35%',
        topics: ['Effective prompts', 'Prompt engineering basics', 'Best practices']
      },
      {
        name: 'AI Limitations',
        weight: '25%',
        topics: ['Hallucinations', 'Bias', 'Ethical considerations']
      }
    ],
    aiRelevance: 'foundational',
    aiTopics: [
      'GenAI fundamentals',
      'Prompt engineering basics',
      'Understanding hallucinations',
      'AI ethics and bias',
      'Practical AI usage'
    ],
    url: 'https://www.comptia.org/certifications/ai-essentials',
    examFormat: 'Online assessment, ~2 hours',
    passingScore: 'Pass/Fail'
  },
  // ISC2 AI Certificate
  {
    id: 'cert-isc2-ai-strategy',
    title: 'ISC2 Building AI Strategy Certificate',
    abbreviation: 'ISC2 AI',
    description: 'Certificate program covering AI strategy for cybersecurity, global AI regulations, and AI-enhanced GRC. Launched July 2025.',
    provider: 'isc2',
    providerName: '(ISC)²',
    difficulty: 'intermediate',
    cost: {
      exam: 640,
      training: 0,
      currency: 'USD'
    },
    duration: '16 hours across 6 courses',
    prerequisites: [
      'Cybersecurity background recommended',
      'No formal requirements',
      'ISC2 membership discount available'
    ],
    domains: [
      {
        name: 'AI for Cybersecurity',
        weight: '30%',
        topics: ['AI in security operations', 'Threat detection', 'Automation']
      },
      {
        name: 'Global AI Regulations',
        weight: '35%',
        topics: ['EU AI Act', 'Regional regulations', 'Compliance requirements']
      },
      {
        name: 'AI-Enhanced GRC',
        weight: '35%',
        topics: ['AI governance', 'Risk management', 'Compliance automation']
      }
    ],
    aiRelevance: 'primary',
    aiTopics: [
      'AI strategy development',
      'Global AI regulations',
      'AI-enhanced GRC',
      'AI in security operations',
      'Strategic AI implementation'
    ],
    url: 'https://www.isc2.org/professional-development/certificates',
    examFormat: 'Online courses with assessments',
    passingScore: 'Course completion required'
  },
  // ISACA AI Security
  {
    id: 'cert-isaca-aaism',
    title: 'ISACA Advanced in AI Security Management',
    abbreviation: 'AAISM',
    description: 'Advanced credential for AI security governance, requiring active CISM or CISSP. Covers AI governance, secure AI development, and AI risk management. Launched August 2025.',
    provider: 'isaca',
    providerName: 'ISACA',
    difficulty: 'expert',
    cost: {
      exam: 575,
      training: 0,
      currency: 'USD'
    },
    duration: '3-6 months preparation',
    prerequisites: [
      'Active CISM or CISSP certification required',
      'Experience with AI/ML systems',
      'Security management background'
    ],
    domains: [
      {
        name: 'AI Governance',
        weight: '35%',
        topics: ['AI policies', 'Oversight frameworks', 'Board-level reporting']
      },
      {
        name: 'Secure AI Development',
        weight: '35%',
        topics: ['Secure SDLC for AI', 'Model security', 'Data protection']
      },
      {
        name: 'AI Risk Management',
        weight: '30%',
        topics: ['AI risk assessment', 'Threat modeling', 'Incident response']
      }
    ],
    renewalPeriod: '10 CPE hours annually (AI-focused)',
    aiRelevance: 'primary',
    aiTopics: [
      'AI governance frameworks',
      'Secure AI development lifecycle',
      'AI risk management',
      'AI security management',
      'Enterprise AI security strategy'
    ],
    url: 'https://www.isaca.org/credentialing/aaism',
    examFormat: '90 proctored questions',
    passingScore: 'Scaled scoring'
  },
  // Practical Hands-On Certifications
  {
    id: 'cert-pds-caisp',
    title: 'Certified AI Security Professional',
    abbreviation: 'CAISP',
    description: 'Hands-on practical certification covering OWASP LLM Top 10, MITRE ATLAS, RAG security, and adversarial AI through a 6-hour lab exam.',
    provider: 'practical-devsecops',
    providerName: 'Practical DevSecOps',
    difficulty: 'advanced',
    cost: {
      exam: 999,
      training: 530,
      currency: 'USD'
    },
    duration: '6-hour practical exam',
    prerequisites: [
      'Understanding of LLM security concepts',
      'Familiarity with OWASP LLM Top 10',
      'Basic Python skills'
    ],
    domains: [
      {
        name: 'OWASP LLM Top 10',
        weight: '30%',
        topics: ['Prompt injection', 'Data leakage', 'Supply chain', 'Excessive agency']
      },
      {
        name: 'MITRE ATLAS',
        weight: '25%',
        topics: ['Adversarial ML tactics', 'Technique mapping', 'Threat modeling']
      },
      {
        name: 'RAG Security',
        weight: '25%',
        topics: ['Vector database attacks', 'Embedding security', 'Retrieval poisoning']
      },
      {
        name: 'Adversarial AI',
        weight: '20%',
        topics: ['Evasion attacks', 'Model extraction', 'Poisoning attacks']
      }
    ],
    renewalPeriod: 'Lifetime (no renewal)',
    aiRelevance: 'primary',
    aiTopics: [
      'OWASP LLM Top 10 practical application',
      'MITRE ATLAS framework',
      'RAG system security testing',
      'Adversarial AI attacks and defenses',
      '6-hour hands-on practical exam'
    ],
    url: 'https://www.practical-devsecops.com/certified-ai-security-professional/',
    examFormat: '6-hour practical lab, 5 challenges',
    passingScore: '80%'
  },
  {
    id: 'cert-secops-caimlpen',
    title: 'Certified AI/ML Pentester',
    abbreviation: 'C-AI/MLPen',
    description: 'Practical certification focused on AI/ML penetration testing including prompt injection, system prompt leakage, model theft, and supply chain attacks.',
    provider: 'secops-group',
    providerName: 'SecOps Group',
    difficulty: 'advanced',
    cost: {
      exam: 315,
      training: 0,
      currency: 'USD'
    },
    duration: '4hr 15min practical exam',
    prerequisites: [
      '1+ year penetration testing experience',
      'OWASP LLM Top 10 knowledge',
      'Understanding of ML systems'
    ],
    domains: [
      {
        name: 'Prompt Injection Testing',
        weight: '30%',
        topics: ['Direct injection', 'Indirect injection', 'Jailbreaking']
      },
      {
        name: 'System Prompt Leakage',
        weight: '25%',
        topics: ['Extraction techniques', 'Confidential data exposure', 'Prompt analysis']
      },
      {
        name: 'Model Security',
        weight: '25%',
        topics: ['Model theft', 'Weight extraction', 'API abuse']
      },
      {
        name: 'Supply Chain',
        weight: '20%',
        topics: ['Malicious models', 'Dependency attacks', 'Poisoned datasets']
      }
    ],
    renewalPeriod: '3 years',
    aiRelevance: 'primary',
    aiTopics: [
      'AI/ML penetration testing',
      'Prompt injection exploitation',
      'System prompt extraction',
      'Model theft techniques',
      'AI supply chain security'
    ],
    url: 'https://pentestingexams.com/product/certified-ai-ml-pentester/',
    examFormat: '4hr 15min practical, 8 AI model challenges',
    passingScore: '70%'
  },
  // AWS AI Certifications
  {
    id: 'cert-aws-ai-practitioner',
    title: 'AWS Certified AI Practitioner',
    abbreviation: 'AWS AI',
    description: 'Entry-level certification covering AI/ML fundamentals on AWS including responsible AI and basic security considerations.',
    provider: 'aws',
    providerName: 'Amazon Web Services',
    difficulty: 'beginner',
    cost: {
      exam: 100,
      training: 0,
      currency: 'USD'
    },
    duration: '1-2 months preparation',
    prerequisites: [
      'Basic AWS knowledge',
      'No prior AI/ML experience required',
      'General technology understanding'
    ],
    domains: [
      {
        name: 'AI/ML Fundamentals',
        weight: '30%',
        topics: ['AI concepts', 'ML types', 'Use cases']
      },
      {
        name: 'AWS AI Services',
        weight: '40%',
        topics: ['Amazon Bedrock', 'SageMaker basics', 'AI service selection']
      },
      {
        name: 'Responsible AI',
        weight: '30%',
        topics: ['Ethics', 'Bias', 'Security basics', 'Governance']
      }
    ],
    renewalPeriod: '3 years',
    aiRelevance: 'foundational',
    aiTopics: [
      'AWS AI/ML fundamentals',
      'Amazon Bedrock overview',
      'Responsible AI practices',
      'Basic AI security awareness',
      'AI service selection'
    ],
    url: 'https://aws.amazon.com/certification/certified-ai-practitioner/',
    examFormat: '65 questions, 90 minutes',
    passingScore: '700/1000'
  },
  {
    id: 'cert-aws-security-specialty',
    title: 'AWS Security Specialty',
    abbreviation: 'AWS Security',
    description: 'Advanced security certification updated December 2025 with expanded GenAI security coverage including Amazon Bedrock and SageMaker security.',
    provider: 'aws',
    providerName: 'Amazon Web Services',
    difficulty: 'advanced',
    cost: {
      exam: 300,
      training: 0,
      currency: 'USD'
    },
    duration: '3-4 months preparation',
    prerequisites: [
      '5+ years IT security experience',
      '2+ years securing AWS workloads',
      'AWS Associate certification recommended'
    ],
    domains: [
      {
        name: 'Threat Detection and Incident Response',
        weight: '14%',
        topics: ['GuardDuty', 'Security Hub', 'Incident response']
      },
      {
        name: 'Security Logging and Monitoring',
        weight: '18%',
        topics: ['CloudTrail', 'CloudWatch', 'SIEM integration']
      },
      {
        name: 'Infrastructure Security',
        weight: '20%',
        topics: ['VPC security', 'Network controls', 'Edge protection']
      },
      {
        name: 'Identity and Access Management',
        weight: '16%',
        topics: ['IAM', 'Organizations', 'Identity federation']
      },
      {
        name: 'Data Protection',
        weight: '18%',
        topics: ['Encryption', 'Key management', 'Data classification']
      },
      {
        name: 'Management and Security Governance',
        weight: '14%',
        topics: ['Compliance', 'GenAI security', 'Bedrock security', 'SageMaker security']
      }
    ],
    renewalPeriod: '3 years',
    aiRelevance: 'secondary',
    aiTopics: [
      'Amazon Bedrock security',
      'SageMaker security configurations',
      'GenAI workload protection',
      'AI/ML data security',
      'Updated December 2025 with GenAI focus'
    ],
    url: 'https://aws.amazon.com/certification/certified-security-specialty/',
    examFormat: '65 questions, 170 minutes',
    passingScore: '750/1000'
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
  providers: Array.from(new Set(certifications.map(c => c.providerName))).length
}
