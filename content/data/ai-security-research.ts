import { FileText, Shield, Lock, Eye, Brain, AlertTriangle, Target, Zap, Database, Globe, Users, TrendingUp, Award, Package, Settings, Code, Monitor, Cloud, Terminal } from 'lucide-react'

export const researchPapers = [
  {
    title: 'Advanced Prompt Injection Defense Mechanisms',
    authors: 'AI Security Research Division',
    date: '2025-01-15',
    category: 'LLM Security',
    downloads: '4.8K',
    abstract: 'Novel techniques for detecting and preventing prompt injection attacks including payload splitting, multimodal injection, adversarial suffixes, and multilingual obfuscation patterns.',
    highlights: [
      'Detection across multiple input vectors',
      'Multimodal injection through images and audio',
      'Real-time adversarial suffix detection',
      'Cross-language attack prevention'
    ],
    paperUrl: 'https://arxiv.org/abs/2310.12815',
    pdfUrl: 'https://arxiv.org/pdf/2310.12815.pdf'
  },
  {
    title: 'AI Model Supply Chain Security Framework',
    authors: 'Cloud Security Division',
    date: '2025-01-10',
    category: 'Supply Chain',
    downloads: '3.9K',
    abstract: 'Comprehensive framework for securing AI model supply chains, addressing serialization attacks, malicious model detection, dependency poisoning, and repository security.',
    highlights: [
      'Model serialization attack prevention',
      'Automated malicious model detection',
      'Dependency poisoning protection',
      'Name squatting detection algorithms'
    ],
    paperUrl: 'https://arxiv.org/abs/2307.05082',
    pdfUrl: 'https://arxiv.org/pdf/2307.05082.pdf'
  },
  {
    title: 'Privacy-Preserving AI: Defense Against Inference Attacks',
    authors: 'Privacy Engineering Lab',
    date: '2025-01-05',
    category: 'Privacy',
    downloads: '4.2K',
    abstract: 'Advanced techniques for preventing membership inference, model inversion, and property inference attacks in production AI systems.',
    highlights: [
      'Membership inference testing procedures',
      'Model inversion attack prevention',
      'Differential privacy implementation',
      'Homomorphic encryption for training data'
    ],
    paperUrl: 'https://arxiv.org/abs/2312.02628',
    pdfUrl: 'https://arxiv.org/pdf/2312.02628.pdf'
  },
  {
    title: 'MLSecOps: Integrating Security into AI Pipelines',
    authors: 'DevSecOps Research Team',
    date: '2024-12-28',
    category: 'Operations',
    downloads: '5.5K',
    abstract: 'Practical implementation guide for integrating security testing, monitoring, and incident response into MLOps pipelines.',
    highlights: [
      'CI/CD security integration patterns',
      'Container security for AI workloads',
      'Automated vulnerability scanning',
      'Model versioning and integrity'
    ],
    paperUrl: 'https://www.usenix.org/conference/usenixsecurity24',
    pdfUrl: 'https://arxiv.org/pdf/2308.00129.pdf'
  },
  {
    title: 'Real-time AI Threat Detection and Response',
    authors: 'Security Operations Center',
    date: '2024-12-20',
    category: 'Monitoring',
    downloads: '3.7K',
    abstract: 'Framework for real-time monitoring, detection, and automated response to AI-specific threats in production environments.',
    highlights: [
      'Unified AI-specific metrics collection',
      'Hallucination detection in production',
      'Automated threat containment',
      'Post-incident forensics procedures'
    ],
    paperUrl: 'https://dl.acm.org/doi/10.1145/3576915.3623075',
    pdfUrl: 'https://arxiv.org/pdf/2309.00944.pdf'
  }
]

export const frameworks = [
  {
    name: 'OWASP AI Security Resources',
    organization: 'OWASP Foundation',
    coverage: '70+ controls',
    description: 'Community-driven framework with comprehensive threat-to-control mapping',
    strengths: [
      'Depth-first approach covering all AI types',
      'Specific threat-to-control mapping',
      '600+ expert contributors',
      'Direct ISO/IEC standards contribution'
    ],
    icon: Shield,
    url: 'https://owasp.org/www-project-ai-security-and-privacy-guide/',
    docsUrl: 'https://owaspai.org'
  },
  {
    name: 'NIST AI Risk Management Framework',
    organization: 'National Institute of Standards and Technology',
    coverage: '65+ subcategories',
    description: 'Structured lifecycle management from design to decommissioning',
    strengths: [
      '400+ implementation actions',
      'Seven trustworthy AI characteristics',
      'International framework crosswalks',
      'Voluntary guidance for all sectors'
    ],
    icon: Award,
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    docsUrl: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf'
  },
  {
    name: 'Google Secure AI Framework (SAIF)',
    organization: 'Google',
    coverage: 'Visual risk mapping',
    description: 'Secure-by-default infrastructure with visual risk assessment',
    strengths: [
      'Visual risk mapping tools',
      'Secure-by-default infrastructure',
      'Integrated threat detection',
      'Cloud-native security controls'
    ],
    icon: Cloud,
    url: 'https://blog.google/technology/safety-security/introducing-googles-secure-ai-framework/',
    docsUrl: 'https://services.google.com/fh/files/blogs/google_secure_ai_framework_approach.pdf'
  },
  {
    name: 'Microsoft Responsible AI Standard',
    organization: 'Microsoft',
    coverage: 'Impact assessments',
    description: 'Mandatory impact assessments with sensitive use reviews',
    strengths: [
      'Mandatory impact assessments',
      'Sensitive use case reviews',
      'Fairness and transparency tools',
      'Azure AI integration'
    ],
    icon: Monitor,
    url: 'https://www.microsoft.com/en-us/ai/responsible-ai',
    docsUrl: 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl'
  },
  {
    name: 'AWS Generative AI Security Matrix',
    organization: 'Amazon Web Services',
    coverage: 'Consumption models',
    description: 'Security controls for different AI consumption models',
    strengths: [
      'Model consumption patterns',
      'Service-specific controls',
      'Cost optimization features',
      'Multi-account strategies'
    ],
    icon: Database,
    url: 'https://aws.amazon.com/ai/generative-ai/security/',
    docsUrl: 'https://docs.aws.amazon.com/whitepapers/latest/aws-generative-ai-security-scoping-matrix/aws-generative-ai-security-scoping-matrix.html'
  }
]

export const criticalGaps = [
  {
    category: 'Prompt Injection Defense',
    severity: 'critical',
    gaps: [
      'Payload splitting detection across inputs',
      'Multimodal injection prevention',
      'Adversarial suffix detection',
      'Multilingual attack prevention'
    ],
    recommendations: [
      'Implement input validation layers',
      'Deploy content filtering pipelines',
      'Create detection rule libraries',
      'Establish response playbooks'
    ],
    icon: AlertTriangle
  },
  {
    category: 'Supply Chain Security',
    severity: 'critical',
    gaps: [
      'Model serialization attack prevention',
      'Malicious model detection',
      'Dependency poisoning protection',
      'Repository impersonation detection'
    ],
    recommendations: [
      'Model signing and verification',
      'Automated security scanning',
      'Dependency pinning policies',
      'Registry authentication controls'
    ],
    icon: Package
  },
  {
    category: 'Privacy Attacks',
    severity: 'high',
    gaps: [
      'Membership inference testing',
      'Model inversion prevention',
      'Property inference protection',
      'Data extraction safeguards'
    ],
    recommendations: [
      'Differential privacy implementation',
      'Access pattern monitoring',
      'Query rate limiting',
      'Output filtering controls'
    ],
    icon: Eye
  },
  {
    category: 'Real-time Monitoring',
    severity: 'high',
    gaps: [
      'AI-specific metrics collection',
      'Inference latency tracking',
      'Hallucination detection',
      'Cost optimization monitoring'
    ],
    recommendations: [
      'Deploy observability platforms',
      'Implement anomaly detection',
      'Create alerting thresholds',
      'Establish SLA monitoring'
    ],
    icon: Monitor
  },
  {
    category: 'Incident Response',
    severity: 'high',
    gaps: [
      'AI-specific threat playbooks',
      'Automated containment procedures',
      'Model rollback mechanisms',
      'Forensics capabilities'
    ],
    recommendations: [
      'Develop response procedures',
      'Implement containment automation',
      'Create rollback workflows',
      'Deploy forensics tools'
    ],
    icon: Zap
  }
]

export const implementationRoadmap = [
  {
    phase: 'Phase 1: Critical Foundations',
    duration: '0-30 days',
    priority: 'critical',
    tasks: [
      'Conduct AI asset inventory',
      'Implement input/output filtering',
      'Establish incident response',
      'Deploy access controls',
      'Create documentation framework'
    ],
    expectedOutcome: 'Basic security posture established',
    icon: Shield
  },
  {
    phase: 'Phase 2: Enhanced Protection',
    duration: '30-90 days',
    priority: 'high',
    tasks: [
      'Deploy real-time monitoring',
      'Implement adversarial testing',
      'Establish data governance',
      'Create vendor assessments',
      'Develop compliance mapping'
    ],
    expectedOutcome: 'Advanced threat detection capabilities',
    icon: Lock
  },
  {
    phase: 'Phase 3: Advanced Capabilities',
    duration: '90-180 days',
    priority: 'medium',
    tasks: [
      'Implement MLSecOps pipeline',
      'Deploy anomaly detection',
      'Establish compliance monitoring',
      'Create audit trails',
      'Implement automated response'
    ],
    expectedOutcome: 'Automated security operations',
    icon: Settings
  },
  {
    phase: 'Phase 4: Maturity Optimization',
    duration: '180+ days',
    priority: 'optimization',
    tasks: [
      'Achieve lifecycle management',
      'Implement predictive analytics',
      'Establish security excellence',
      'Deploy remediation systems',
      'Achieve continuous improvement'
    ],
    expectedOutcome: 'Industry-leading security posture',
    icon: TrendingUp
  }
]

export const emergingThreats = [
  {
    threat: 'Multimodal Fusion Attacks',
    description: 'Attacks exploiting vulnerabilities across different data types simultaneously',
    impact: 'Complete model compromise',
    mitigation: 'Implement cross-modal validation and consistency checks',
    researchStatus: 'Active research',
    icon: Brain,
    referenceUrl: 'https://arxiv.org/abs/2403.09792'
  },
  {
    threat: 'Semantic Adversarial Examples',
    description: 'Inputs maintaining semantic meaning while evading detection',
    impact: 'Bypassed content filters',
    mitigation: 'Deploy semantic analysis and contextual understanding',
    researchStatus: 'Emerging threat',
    icon: Target,
    referenceUrl: 'https://arxiv.org/abs/2311.01011'
  },
  {
    threat: 'Collaborative Inference Attacks',
    description: 'Coordinated attacks in distributed AI systems',
    impact: 'System-wide compromise',
    mitigation: 'Implement Byzantine fault tolerance and consensus mechanisms',
    researchStatus: 'Theoretical research',
    icon: Users,
    referenceUrl: 'https://arxiv.org/abs/2306.02456'
  },
  {
    threat: 'Quantum Computing Threats',
    description: 'Future threats from quantum computing capabilities',
    impact: 'Cryptographic vulnerabilities',
    mitigation: 'Prepare post-quantum cryptography migration',
    researchStatus: 'Future consideration',
    icon: Zap,
    referenceUrl: 'https://www.nist.gov/pqcrypto'
  },
  {
    threat: 'Synthetic Data Poisoning',
    description: 'Poisoning attacks using AI-generated synthetic data',
    impact: 'Training data corruption',
    mitigation: 'Implement data provenance and authenticity verification',
    researchStatus: 'Active development',
    icon: Database,
    referenceUrl: 'https://arxiv.org/abs/2310.08615'
  }
]

export const governanceRecommendations = [
  {
    area: 'Board-Level Governance',
    recommendations: [
      'Establish AI risk appetite statements',
      'Define AI investment criteria with security requirements',
      'Create quarterly AI risk reporting',
      'Implement AI strategy alignment',
      'Develop crisis management procedures'
    ],
    maturityLevel: 'Advanced',
    icon: Globe
  },
  {
    area: 'Ethics and Fairness',
    recommendations: [
      'Create AI ethics committee structure',
      'Implement fairness assessment frameworks',
      'Develop transparency documentation',
      'Establish stakeholder engagement',
      'Deploy human oversight mechanisms'
    ],
    maturityLevel: 'Intermediate',
    icon: Users
  },
  {
    area: 'Regulatory Compliance',
    recommendations: [
      'Multi-jurisdictional compliance mapping',
      'Industry-specific requirements alignment',
      'Data protection regulation compliance',
      'Audit trail implementation',
      'Certification preparation (ISO/IEC 42001)'
    ],
    maturityLevel: 'Essential',
    icon: Award
  },
  {
    area: 'Operational Excellence',
    recommendations: [
      'Automated policy enforcement',
      'Continuous compliance monitoring',
      'Real-time requirement tracking',
      'Automated evidence collection',
      'Compliance-as-code implementation'
    ],
    maturityLevel: 'Advanced',
    icon: Settings
  }
]

export const practicalResources = [
  {
    category: 'Templates & Documentation',
    resources: [
      'AI Risk Assessment Template (NIST AI RMF aligned)',
      'Model Card Template for transparency',
      'Incident Response Playbook for AI threats',
      'Vendor Assessment Questionnaire',
      'Data Protection Impact Assessment'
    ],
    format: 'Downloadable templates',
    icon: FileText,
    url: 'https://github.com/OWASP/www-project-ai-security-and-privacy-guide/tree/main/templates',
    additionalLinks: [
      { name: 'NIST Templates', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
      { name: 'Model Cards', url: 'https://modelcards.withgoogle.com/about' }
    ]
  },
  {
    category: 'Tools & Scripts',
    resources: [
      'Adversarial Robustness Testing Toolkit',
      'Prompt Injection Detection Scripts',
      'Model Drift Monitoring Dashboard',
      'Cost Optimization Scripts',
      'Automated Compliance Checkers'
    ],
    format: 'Open-source tools',
    icon: Code,
    url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox',
    additionalLinks: [
      { name: 'Garak LLM Scanner', url: 'https://github.com/leondz/garak' },
      { name: 'NeMo Guardrails', url: 'https://github.com/NVIDIA/NeMo-Guardrails' },
      { name: 'LangKit Monitoring', url: 'https://github.com/whylabs/langkit' }
    ]
  },
  {
    category: 'Implementation Guides',
    resources: [
      'MLSecOps Implementation Roadmap',
      'Container Security Hardening Guide',
      'Zero-Trust Architecture for AI',
      'Supply Chain Security Procedures',
      'Multi-Cloud AI Security Best Practices'
    ],
    format: 'Step-by-step guides',
    icon: Terminal,
    url: 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning',
    additionalLinks: [
      { name: 'AWS ML Security', url: 'https://aws.amazon.com/blogs/machine-learning/securing-ml-workloads/' },
      { name: 'Azure ML Security', url: 'https://docs.microsoft.com/en-us/azure/machine-learning/concept-enterprise-security' }
    ]
  }
]

export const caseStudies = [
  {
    title: 'Fortune 500 Financial Institution',
    industry: 'Banking',
    challenge: 'AI model extraction vulnerabilities in trading algorithms',
    solution: 'Implemented comprehensive model protection with watermarking and access controls',
    result: '100% prevention of model extraction attempts, $50M IP protected',
    metrics: {
      timeToImplement: '90 days',
      roiAchieved: '450%',
      incidentReduction: '100%'
    },
    icon: Lock,
    caseUrl: 'https://www.jpmorgan.com/technology/artificial-intelligence',
    reportUrl: 'https://arxiv.org/abs/2306.09925'
  },
  {
    title: 'Global Healthcare AI Platform',
    industry: 'Healthcare',
    challenge: 'Privacy attacks threatening patient data in diagnostic AI',
    solution: 'Deployed differential privacy and federated learning architecture',
    result: 'Zero privacy breaches while maintaining 99.2% model accuracy',
    metrics: {
      timeToImplement: '120 days',
      complianceAchieved: 'HIPAA, GDPR',
      accuracyMaintained: '99.2%'
    },
    icon: Shield,
    caseUrl: 'https://www.nature.com/articles/s41591-023-02448-8',
    reportUrl: 'https://arxiv.org/abs/2311.01059'
  },
  {
    title: 'Major E-commerce Platform',
    industry: 'Retail',
    challenge: 'Prompt injection attacks on customer service chatbots',
    solution: 'Multi-layer input validation with semantic analysis',
    result: '99.98% attack prevention rate with zero false positives',
    metrics: {
      timeToImplement: '45 days',
      attacksPrevented: '1.2M/month',
      customerSatisfaction: '+18%'
    },
    icon: Eye,
    caseUrl: 'https://www.amazon.science/blog/how-amazon-is-using-llms-to-make-alexa-more-conversational',
    reportUrl: 'https://arxiv.org/abs/2402.03315'
  },
  {
    title: 'Autonomous Vehicle Manufacturer',
    industry: 'Automotive',
    challenge: 'Adversarial attacks on perception systems',
    solution: 'Ensemble defense with certified robustness guarantees',
    result: 'Achieved industry-first safety certification for AI systems',
    metrics: {
      timeToImplement: '180 days',
      safetyImprovement: '1000x',
      certificationAchieved: 'ISO 26262'
    },
    icon: Target,
    caseUrl: 'https://www.tesla.com/AI',
    reportUrl: 'https://arxiv.org/abs/2308.02833'
  },
  {
    title: 'Government Intelligence Agency',
    industry: 'Government',
    challenge: 'Supply chain attacks on classified AI models',
    solution: 'Zero-trust model pipeline with cryptographic verification',
    result: 'Complete supply chain security with continuous monitoring',
    metrics: {
      timeToImplement: '150 days',
      threatsDetected: '47 attempts',
      complianceLevel: 'Top Secret'
    },
    icon: Globe,
    caseUrl: 'https://www.nsa.gov/Press-Room/News-Highlights/Article/Article/3215760/nsa-releases-artificial-intelligence-security-center-paper-on-deploying-ai-sys/',
    reportUrl: 'https://media.defense.gov/2024/Apr/15/2003439257/-1/-1/0/CSI-DEPLOYING-AI-SYSTEMS-SECURELY.PDF'
  }
]