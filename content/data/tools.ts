export type ToolCategory =
  | 'red-teaming'
  | 'vulnerability-scanner'
  | 'llm-defense'
  | 'adversarial-testing'
  | 'evaluation'
  | 'fuzzing'
  | 'privacy'
  | 'model-security'
  | 'supply-chain'
  | 'monitoring'

export interface SecurityTool {
  id: string
  name: string
  description: string
  category: ToolCategory
  url: string
  github?: string
  stars?: string
  tags: string[]
  features: string[]
  maintainer?: string
}

export const toolCategories: { id: ToolCategory; label: string; description: string }[] = [
  {
    id: 'red-teaming',
    label: 'Red Teaming',
    description: 'Tools for offensive security testing of AI/ML systems'
  },
  {
    id: 'vulnerability-scanner',
    label: 'Vulnerability Scanners',
    description: 'Automated scanning tools for AI security vulnerabilities'
  },
  {
    id: 'llm-defense',
    label: 'LLM Defense',
    description: 'Defensive tools for protecting LLM applications'
  },
  {
    id: 'adversarial-testing',
    label: 'Adversarial Testing',
    description: 'Frameworks for adversarial attack simulation'
  },
  {
    id: 'evaluation',
    label: 'Evaluation & Benchmarking',
    description: 'Tools for evaluating AI safety and security'
  },
  {
    id: 'fuzzing',
    label: 'Fuzzing',
    description: 'Automated fuzzing tools for LLM testing'
  },
  {
    id: 'privacy',
    label: 'Privacy & Data Protection',
    description: 'Tools for PII detection and privacy-preserving ML'
  },
  {
    id: 'model-security',
    label: 'Model Security',
    description: 'Tools for securing ML model files and deployments'
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain Security',
    description: 'Tools for ML supply chain security'
  },
  {
    id: 'monitoring',
    label: 'Monitoring & Observability',
    description: 'Tools for monitoring AI system security'
  }
]

export const securityTools: SecurityTool[] = [
  // Red Teaming Tools
  {
    id: 'tool-001',
    name: 'Garak',
    description: 'LLM vulnerability scanner and red teaming framework from NVIDIA Research',
    category: 'red-teaming',
    url: 'https://github.com/leondz/garak',
    github: 'https://github.com/leondz/garak',
    stars: '2.8k',
    tags: ['LLM Testing', 'Red Team', 'Automation', 'NVIDIA'],
    features: [
      'Automated vulnerability scanning for LLMs',
      'Prompt injection detection',
      'Jailbreak testing',
      'Output validation checks',
      'Multiple model support'
    ],
    maintainer: 'NVIDIA Research'
  },
  {
    id: 'tool-002',
    name: 'PyRIT',
    description: 'Microsoft Python Risk Identification Tool for generative AI red teaming',
    category: 'red-teaming',
    url: 'https://github.com/Azure/PyRIT',
    github: 'https://github.com/Azure/PyRIT',
    stars: '1.5k',
    tags: ['Microsoft', 'Red Team', 'Python', 'Automation'],
    features: [
      'Automated red teaming orchestration',
      'Attack strategy library',
      'Multi-turn conversation attacks',
      'Extensible attack plugins',
      'Azure integration'
    ],
    maintainer: 'Microsoft'
  },
  {
    id: 'tool-003',
    name: 'PromptFoo',
    description: 'LLM evaluation and red teaming framework with security testing plugins',
    category: 'red-teaming',
    url: 'https://promptfoo.dev/',
    github: 'https://github.com/promptfoo/promptfoo',
    stars: '3.2k',
    tags: ['Evaluation', 'Red Team', 'CI/CD', 'Testing'],
    features: [
      'Prompt injection testing',
      'Jailbreak detection',
      'Custom test assertions',
      'CI/CD integration',
      'Multi-provider support'
    ]
  },
  {
    id: 'tool-004',
    name: 'AI Goat',
    description: 'Vulnerable LLM application for security training and testing',
    category: 'red-teaming',
    url: 'https://github.com/dhammon/ai-goat',
    github: 'https://github.com/dhammon/ai-goat',
    stars: '450',
    tags: ['Training', 'CTF', 'Vulnerable App', 'Learning'],
    features: [
      'Intentionally vulnerable LLM app',
      'OWASP LLM Top 10 vulnerabilities',
      'Hands-on learning environment',
      'Docker deployment'
    ]
  },
  {
    id: 'tool-005',
    name: 'Prompt Injection Playground',
    description: 'Interactive environment for testing prompt injection techniques',
    category: 'red-teaming',
    url: 'https://github.com/jthack/prompt-injection-playground',
    github: 'https://github.com/jthack/prompt-injection-playground',
    stars: '320',
    tags: ['Prompt Injection', 'Playground', 'Learning'],
    features: [
      'Interactive testing interface',
      'Multiple injection techniques',
      'Defense bypass testing',
      'Educational examples'
    ]
  },

  // Vulnerability Scanners
  {
    id: 'tool-006',
    name: 'Nuclei',
    description: 'Fast vulnerability scanner with AI/LLM security templates',
    category: 'vulnerability-scanner',
    url: 'https://nuclei.projectdiscovery.io/',
    github: 'https://github.com/projectdiscovery/nuclei',
    stars: '17.2k',
    tags: ['Templates', 'Automation', 'CI/CD'],
    features: [
      'AI/ML security templates',
      'Custom template creation',
      'CI/CD integration',
      'Fast parallel scanning',
      'Extensive template library'
    ],
    maintainer: 'ProjectDiscovery'
  },
  {
    id: 'tool-007',
    name: 'Semgrep',
    description: 'Static analysis tool with rules for AI/ML security vulnerabilities',
    category: 'vulnerability-scanner',
    url: 'https://semgrep.dev/',
    github: 'https://github.com/returntocorp/semgrep',
    stars: '9.8k',
    tags: ['SAST', 'Code Analysis', 'Custom Rules'],
    features: [
      'AI/ML security rules',
      'Custom rule creation',
      'IDE integration',
      'CI/CD pipelines',
      'Multi-language support'
    ]
  },
  {
    id: 'tool-008',
    name: 'Trivy',
    description: 'Container and IaC scanner for AI model deployments',
    category: 'vulnerability-scanner',
    url: 'https://trivy.dev/',
    github: 'https://github.com/aquasecurity/trivy',
    stars: '21.3k',
    tags: ['Container', 'Kubernetes', 'Supply Chain'],
    features: [
      'Container scanning',
      'ML model file scanning',
      'Kubernetes security',
      'SBOM generation',
      'Misconfiguration detection'
    ],
    maintainer: 'Aqua Security'
  },
  {
    id: 'tool-009',
    name: 'ModelScan',
    description: 'Security scanner for ML model files detecting malicious code',
    category: 'vulnerability-scanner',
    url: 'https://github.com/protectai/modelscan',
    github: 'https://github.com/protectai/modelscan',
    stars: '850',
    tags: ['Model Scanning', 'Malware Detection', 'CI/CD'],
    features: [
      'Pickle deserialization attack detection',
      'Multiple model format support',
      'CI/CD integration',
      'Malicious code detection'
    ],
    maintainer: 'Protect AI'
  },
  {
    id: 'tool-010',
    name: 'AIShield',
    description: 'Automated vulnerability assessment for ML models',
    category: 'vulnerability-scanner',
    url: 'https://www.boschaishield.com/',
    tags: ['Enterprise', 'Model Security', 'Automation'],
    features: [
      'Automated model assessment',
      'Vulnerability reporting',
      'Enterprise integration',
      'Compliance support'
    ],
    maintainer: 'Bosch'
  },

  // LLM Defense Tools
  {
    id: 'tool-011',
    name: 'LLM Guard',
    description: 'Security toolkit for LLM applications with input/output validation',
    category: 'llm-defense',
    url: 'https://llm-guard.com/',
    github: 'https://github.com/protectai/llm-guard',
    stars: '1.2k',
    tags: ['Input Validation', 'Output Filtering', 'PII Detection'],
    features: [
      'Prompt injection detection',
      'PII detection and redaction',
      'Toxicity filtering',
      'Output content moderation',
      'Easy integration'
    ],
    maintainer: 'Protect AI'
  },
  {
    id: 'tool-012',
    name: 'NeMo Guardrails',
    description: 'NVIDIA toolkit for building safe and controllable LLM applications',
    category: 'llm-defense',
    url: 'https://github.com/NVIDIA/NeMo-Guardrails',
    github: 'https://github.com/NVIDIA/NeMo-Guardrails',
    stars: '3.8k',
    tags: ['Safety Rails', 'NVIDIA', 'Enterprise', 'Colang'],
    features: [
      'Programmable guardrails',
      'Topic control',
      'Fact checking integration',
      'Custom actions',
      'Multi-model support'
    ],
    maintainer: 'NVIDIA'
  },
  {
    id: 'tool-013',
    name: 'Rebuff',
    description: 'Self-hardening prompt injection detection service',
    category: 'llm-defense',
    url: 'https://github.com/protectai/rebuff',
    github: 'https://github.com/protectai/rebuff',
    stars: '680',
    tags: ['Prompt Injection', 'Detection', 'API'],
    features: [
      'Multi-layer detection',
      'Heuristic analysis',
      'Vector database detection',
      'LLM-based detection',
      'Self-improving'
    ],
    maintainer: 'Protect AI'
  },
  {
    id: 'tool-014',
    name: 'Vigil',
    description: 'LLM prompt injection scanner and detection system',
    category: 'llm-defense',
    url: 'https://github.com/deadbits/vigil-llm',
    github: 'https://github.com/deadbits/vigil-llm',
    stars: '420',
    tags: ['Detection', 'Scanner', 'Monitoring'],
    features: [
      'Real-time scanning',
      'Multiple detection methods',
      'Logging and alerting',
      'API integration'
    ]
  },
  {
    id: 'tool-015',
    name: 'Guardrails AI',
    description: 'Framework for adding validation and structured outputs to LLMs',
    category: 'llm-defense',
    url: 'https://www.guardrailsai.com/',
    github: 'https://github.com/guardrails-ai/guardrails',
    stars: '3.5k',
    tags: ['Validation', 'Structured Output', 'Enterprise'],
    features: [
      'Output validation',
      'Structured data generation',
      'Retry logic',
      'Custom validators',
      'Enterprise support'
    ]
  },
  {
    id: 'tool-016',
    name: 'LangKit',
    description: 'WhyLabs toolkit for LLM monitoring and safety',
    category: 'llm-defense',
    url: 'https://github.com/whylabs/langkit',
    github: 'https://github.com/whylabs/langkit',
    stars: '380',
    tags: ['Monitoring', 'Safety', 'Metrics'],
    features: [
      'Text quality metrics',
      'Safety scoring',
      'PII detection',
      'Hallucination detection',
      'WhyLabs integration'
    ],
    maintainer: 'WhyLabs'
  },

  // Adversarial Testing
  {
    id: 'tool-017',
    name: 'Adversarial Robustness Toolbox',
    description: 'IBM library for adversarial ML attacks and defenses',
    category: 'adversarial-testing',
    url: 'https://adversarial-robustness-toolbox.org/',
    github: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox',
    stars: '4.5k',
    tags: ['IBM', 'Defense', 'Attack', 'Comprehensive'],
    features: [
      'Evasion attacks',
      'Poisoning attacks',
      'Extraction attacks',
      'Inference attacks',
      'Defense methods'
    ],
    maintainer: 'IBM'
  },
  {
    id: 'tool-018',
    name: 'TextAttack',
    description: 'Framework for adversarial attacks on NLP models',
    category: 'adversarial-testing',
    url: 'https://textattack.readthedocs.io/',
    github: 'https://github.com/QData/TextAttack',
    stars: '2.8k',
    tags: ['NLP', 'Adversarial', 'Research'],
    features: [
      'Text adversarial attacks',
      'Model augmentation',
      'Attack recipes',
      'Custom attack creation',
      'Benchmark datasets'
    ]
  },
  {
    id: 'tool-019',
    name: 'CleverHans',
    description: 'Library for adversarial example generation and robustness testing',
    category: 'adversarial-testing',
    url: 'https://github.com/cleverhans-lab/cleverhans',
    github: 'https://github.com/cleverhans-lab/cleverhans',
    stars: '6.1k',
    tags: ['TensorFlow', 'PyTorch', 'JAX'],
    features: [
      'Multi-framework support',
      'FGSM and PGD attacks',
      'Adversarial training',
      'Research focused'
    ]
  },
  {
    id: 'tool-020',
    name: 'Foolbox',
    description: 'Python toolbox for adversarial attacks with multiple backends',
    category: 'adversarial-testing',
    url: 'https://foolbox.jonasrauber.de/',
    github: 'https://github.com/bethgelab/foolbox',
    stars: '2.6k',
    tags: ['Multi-framework', 'Research', 'Benchmarking'],
    features: [
      'Framework agnostic',
      'Many attack methods',
      'Easy to use API',
      'Benchmarking support'
    ]
  },
  {
    id: 'tool-021',
    name: 'SecML',
    description: 'Machine learning security library for attack and defense',
    category: 'adversarial-testing',
    url: 'https://secml.gitlab.io/',
    github: 'https://gitlab.com/secml/secml',
    stars: '350',
    tags: ['Research', 'Attacks', 'Defenses'],
    features: [
      'Evasion attacks',
      'Poisoning attacks',
      'Defense evaluation',
      'Explanation methods'
    ]
  },

  // Evaluation & Benchmarking
  {
    id: 'tool-022',
    name: 'HarmBench',
    description: 'Benchmark for evaluating automated red teaming and LLM safety',
    category: 'evaluation',
    url: 'https://github.com/centerforaisafety/HarmBench',
    github: 'https://github.com/centerforaisafety/HarmBench',
    stars: '420',
    tags: ['Benchmark', 'Safety', 'Red Team'],
    features: [
      'Standardized evaluation',
      'Multiple attack methods',
      'Safety assessment',
      'Leaderboard'
    ],
    maintainer: 'Center for AI Safety'
  },
  {
    id: 'tool-023',
    name: 'TrustLLM',
    description: 'Comprehensive benchmark for LLM trustworthiness',
    category: 'evaluation',
    url: 'https://github.com/HowieHwong/TrustLLM',
    github: 'https://github.com/HowieHwong/TrustLLM',
    stars: '380',
    tags: ['Trustworthiness', 'Benchmark', 'Safety'],
    features: [
      'Multi-dimensional evaluation',
      'Truthfulness testing',
      'Safety assessment',
      'Fairness evaluation'
    ]
  },
  {
    id: 'tool-024',
    name: 'DecodingTrust',
    description: 'Comprehensive trustworthiness evaluation for GPT models',
    category: 'evaluation',
    url: 'https://github.com/AI-secure/DecodingTrust',
    github: 'https://github.com/AI-secure/DecodingTrust',
    stars: '320',
    tags: ['GPT', 'Trustworthiness', 'Comprehensive'],
    features: [
      'Toxicity evaluation',
      'Bias assessment',
      'Privacy testing',
      'Robustness evaluation'
    ]
  },
  {
    id: 'tool-025',
    name: 'Inspect AI',
    description: 'UK AI Safety Institute evaluation framework',
    category: 'evaluation',
    url: 'https://github.com/UKGovernmentBEIS/inspect_ai',
    github: 'https://github.com/UKGovernmentBEIS/inspect_ai',
    stars: '680',
    tags: ['Government', 'Safety', 'Evaluation'],
    features: [
      'Safety evaluations',
      'Custom benchmarks',
      'Multiple model support',
      'Extensible framework'
    ],
    maintainer: 'UK AI Safety Institute'
  },
  {
    id: 'tool-026',
    name: 'LM Evaluation Harness',
    description: 'Framework for evaluating language models including safety',
    category: 'evaluation',
    url: 'https://github.com/EleutherAI/lm-evaluation-harness',
    github: 'https://github.com/EleutherAI/lm-evaluation-harness',
    stars: '5.2k',
    tags: ['Evaluation', 'Benchmarking', 'Comprehensive'],
    features: [
      'Extensive task library',
      'Safety evaluations',
      'Custom task creation',
      'Multi-model support'
    ],
    maintainer: 'EleutherAI'
  },

  // Fuzzing Tools
  {
    id: 'tool-027',
    name: 'GPTFuzzer',
    description: 'Automated fuzzing framework for jailbreak testing',
    category: 'fuzzing',
    url: 'https://github.com/sherdencooper/GPTFuzz',
    github: 'https://github.com/sherdencooper/GPTFuzz',
    stars: '580',
    tags: ['Fuzzing', 'Jailbreak', 'Automation'],
    features: [
      'Automated jailbreak generation',
      'Mutation-based fuzzing',
      'Template evolution',
      'Success rate tracking'
    ]
  },
  {
    id: 'tool-028',
    name: 'FuzzLLM',
    description: 'Fuzzing framework for LLM-based applications',
    category: 'fuzzing',
    url: 'https://github.com/fuzzllm/fuzzllm',
    github: 'https://github.com/fuzzllm/fuzzllm',
    stars: '280',
    tags: ['Fuzzing', 'LLM', 'Security Testing'],
    features: [
      'Automated input generation',
      'Coverage-guided fuzzing',
      'Crash detection',
      'Report generation'
    ]
  },
  {
    id: 'tool-029',
    name: 'PromptBench',
    description: 'Benchmark for evaluating LLM robustness to adversarial prompts',
    category: 'fuzzing',
    url: 'https://github.com/microsoft/promptbench',
    github: 'https://github.com/microsoft/promptbench',
    stars: '1.8k',
    tags: ['Microsoft', 'Benchmark', 'Robustness'],
    features: [
      'Adversarial prompt generation',
      'Robustness evaluation',
      'Multiple attack types',
      'Comprehensive metrics'
    ],
    maintainer: 'Microsoft'
  },

  // Privacy & Data Protection
  {
    id: 'tool-030',
    name: 'Presidio',
    description: 'Microsoft data protection and PII detection for AI systems',
    category: 'privacy',
    url: 'https://microsoft.github.io/presidio/',
    github: 'https://github.com/microsoft/presidio',
    stars: '3.2k',
    tags: ['PII', 'Microsoft', 'Anonymization'],
    features: [
      'PII detection',
      'Data anonymization',
      'Custom recognizers',
      'Multiple languages',
      'API and SDK'
    ],
    maintainer: 'Microsoft'
  },
  {
    id: 'tool-031',
    name: 'Opacus',
    description: 'Differential privacy library for PyTorch training',
    category: 'privacy',
    url: 'https://opacus.ai/',
    github: 'https://github.com/pytorch/opacus',
    stars: '1.6k',
    tags: ['Differential Privacy', 'PyTorch', 'Meta'],
    features: [
      'DP-SGD training',
      'Privacy accounting',
      'Easy integration',
      'Performance optimized'
    ],
    maintainer: 'Meta'
  },
  {
    id: 'tool-032',
    name: 'TensorFlow Privacy',
    description: 'Privacy-preserving machine learning library',
    category: 'privacy',
    url: 'https://github.com/tensorflow/privacy',
    github: 'https://github.com/tensorflow/privacy',
    stars: '1.9k',
    tags: ['TensorFlow', 'Google', 'DP-SGD'],
    features: [
      'Differential privacy training',
      'Privacy analysis tools',
      'Membership inference defense',
      'TensorFlow integration'
    ],
    maintainer: 'Google'
  },
  {
    id: 'tool-033',
    name: 'Private AI',
    description: 'Enterprise PII detection and redaction API',
    category: 'privacy',
    url: 'https://www.private-ai.com/',
    tags: ['API', 'Enterprise', 'Compliance'],
    features: [
      'High accuracy PII detection',
      'Multiple data types',
      'Enterprise deployment',
      'Compliance support'
    ]
  },
  {
    id: 'tool-034',
    name: 'PII Catcher',
    description: 'Automated PII detection for databases and data pipelines',
    category: 'privacy',
    url: 'https://github.com/tokern/piicatcher',
    github: 'https://github.com/tokern/piicatcher',
    stars: '420',
    tags: ['Database', 'Scanning', 'Automation'],
    features: [
      'Database scanning',
      'Multiple database support',
      'CI/CD integration',
      'Custom rules'
    ]
  },

  // Model Security
  {
    id: 'tool-035',
    name: 'AI Verify',
    description: 'Singapore AI governance testing framework and toolkit',
    category: 'model-security',
    url: 'https://aiverifyfoundation.sg/',
    github: 'https://github.com/aiverify-foundation/aiverify',
    stars: '320',
    tags: ['Governance', 'Testing', 'Compliance'],
    features: [
      'AI model testing',
      'Governance checks',
      'Report generation',
      'Compliance mapping'
    ],
    maintainer: 'AI Verify Foundation'
  },
  {
    id: 'tool-036',
    name: 'MLflow',
    description: 'ML lifecycle platform with security and governance features',
    category: 'model-security',
    url: 'https://mlflow.org/',
    github: 'https://github.com/mlflow/mlflow',
    stars: '17.8k',
    tags: ['MLOps', 'Tracking', 'Deployment'],
    features: [
      'Model versioning',
      'Access control',
      'Audit logging',
      'Model registry',
      'Deployment security'
    ]
  },
  {
    id: 'tool-037',
    name: 'Weights & Biases',
    description: 'ML experiment tracking with security and collaboration features',
    category: 'model-security',
    url: 'https://wandb.ai/',
    github: 'https://github.com/wandb/wandb',
    stars: '8.4k',
    tags: ['Monitoring', 'Versioning', 'Collaboration'],
    features: [
      'Experiment tracking',
      'Model versioning',
      'Team collaboration',
      'Access controls',
      'Audit trails'
    ]
  },
  {
    id: 'tool-038',
    name: 'DVC',
    description: 'Version control for ML projects with security features',
    category: 'model-security',
    url: 'https://dvc.org/',
    github: 'https://github.com/iterative/dvc',
    stars: '12.8k',
    tags: ['Version Control', 'Data', 'Reproducibility'],
    features: [
      'Data versioning',
      'Model versioning',
      'Pipeline tracking',
      'Remote storage security'
    ]
  },

  // Supply Chain Security
  {
    id: 'tool-039',
    name: 'Sigstore',
    description: 'Signing and verification for ML model supply chain',
    category: 'supply-chain',
    url: 'https://www.sigstore.dev/',
    github: 'https://github.com/sigstore',
    stars: '2.1k',
    tags: ['Signing', 'SLSA', 'OpenSSF'],
    features: [
      'Keyless signing',
      'Signature verification',
      'Transparency log',
      'ML model signing support'
    ],
    maintainer: 'OpenSSF'
  },
  {
    id: 'tool-040',
    name: 'SLSA Framework',
    description: 'Supply chain security framework for ML artifacts',
    category: 'supply-chain',
    url: 'https://slsa.dev/',
    github: 'https://github.com/slsa-framework',
    stars: '1.5k',
    tags: ['Framework', 'Google', 'Standards'],
    features: [
      'Build integrity',
      'Source integrity',
      'Provenance generation',
      'Compliance levels'
    ],
    maintainer: 'Google'
  },
  {
    id: 'tool-041',
    name: 'In-toto',
    description: 'Software supply chain security framework',
    category: 'supply-chain',
    url: 'https://in-toto.io/',
    github: 'https://github.com/in-toto/in-toto',
    stars: '850',
    tags: ['Attestation', 'CNCF', 'Provenance'],
    features: [
      'Supply chain attestation',
      'Policy enforcement',
      'Multi-party verification',
      'ML pipeline support'
    ],
    maintainer: 'CNCF'
  },
  {
    id: 'tool-042',
    name: 'Syft',
    description: 'SBOM generation for ML containers and dependencies',
    category: 'supply-chain',
    url: 'https://github.com/anchore/syft',
    github: 'https://github.com/anchore/syft',
    stars: '5.7k',
    tags: ['SBOM', 'Container', 'Dependencies'],
    features: [
      'SBOM generation',
      'Multiple formats',
      'Container scanning',
      'Python dependency support'
    ],
    maintainer: 'Anchore'
  },
  {
    id: 'tool-043',
    name: 'SafeTensors',
    description: 'Safe serialization format for ML models preventing code execution',
    category: 'supply-chain',
    url: 'https://github.com/huggingface/safetensors',
    github: 'https://github.com/huggingface/safetensors',
    stars: '2.4k',
    tags: ['Serialization', 'Security', 'Hugging Face'],
    features: [
      'Secure tensor storage',
      'No code execution',
      'Fast loading',
      'Cross-framework support'
    ],
    maintainer: 'Hugging Face'
  },

  // Monitoring & Observability
  {
    id: 'tool-044',
    name: 'Langfuse',
    description: 'Open source LLM observability and security monitoring',
    category: 'monitoring',
    url: 'https://langfuse.com/',
    github: 'https://github.com/langfuse/langfuse',
    stars: '4.8k',
    tags: ['Monitoring', 'Tracing', 'Analytics'],
    features: [
      'LLM tracing',
      'Cost tracking',
      'Quality monitoring',
      'Security alerting',
      'Self-hosted option'
    ]
  },
  {
    id: 'tool-045',
    name: 'Arize AI',
    description: 'ML observability platform with security monitoring',
    category: 'monitoring',
    url: 'https://arize.com/',
    tags: ['Enterprise', 'Observability', 'ML Monitoring'],
    features: [
      'Model monitoring',
      'Drift detection',
      'Performance tracking',
      'Anomaly detection'
    ]
  },
  {
    id: 'tool-046',
    name: 'Evidently AI',
    description: 'Open source ML monitoring and testing platform',
    category: 'monitoring',
    url: 'https://www.evidentlyai.com/',
    github: 'https://github.com/evidentlyai/evidently',
    stars: '4.6k',
    tags: ['Monitoring', 'Testing', 'Open Source'],
    features: [
      'Data quality monitoring',
      'Model performance tracking',
      'Drift detection',
      'Report generation'
    ]
  },
  {
    id: 'tool-047',
    name: 'Fiddler AI',
    description: 'ML model performance and safety monitoring',
    category: 'monitoring',
    url: 'https://www.fiddler.ai/',
    tags: ['Enterprise', 'Explainability', 'Monitoring'],
    features: [
      'Model explainability',
      'Bias detection',
      'Performance monitoring',
      'Root cause analysis'
    ]
  },
  {
    id: 'tool-048',
    name: 'Deepchecks',
    description: 'Testing and monitoring for ML models and data',
    category: 'monitoring',
    url: 'https://deepchecks.com/',
    github: 'https://github.com/deepchecks/deepchecks',
    stars: '3.2k',
    tags: ['Testing', 'Monitoring', 'Validation'],
    features: [
      'Data validation',
      'Model validation',
      'CI/CD integration',
      'Custom checks'
    ]
  },

  // Additional Red Teaming Tools
  {
    id: 'tool-049',
    name: 'Counterfit',
    description: 'Microsoft tool for adversarial ML attack simulation',
    category: 'red-teaming',
    url: 'https://github.com/Azure/counterfit',
    github: 'https://github.com/Azure/counterfit',
    stars: '680',
    tags: ['Microsoft', 'Attack Simulation', 'CLI'],
    features: [
      'Attack simulation',
      'Multiple frameworks',
      'CLI interface',
      'Custom attacks'
    ],
    maintainer: 'Microsoft'
  },
  {
    id: 'tool-050',
    name: 'Caldera Adversary Emulation',
    description: 'MITRE adversary emulation platform with ML attack plugins',
    category: 'red-teaming',
    url: 'https://caldera.mitre.org/',
    github: 'https://github.com/mitre/caldera',
    stars: '5.2k',
    tags: ['MITRE', 'Emulation', 'Red Team'],
    features: [
      'Adversary emulation',
      'ML attack plugins',
      'Automated testing',
      'Reporting'
    ],
    maintainer: 'MITRE'
  },

  // Additional Tools (Phase 2)
  {
    id: 'tool-051',
    name: 'DeepTeam',
    description: 'Open-source LLM red teaming framework with guardrail testing capabilities',
    category: 'red-teaming',
    url: 'https://github.com/confident-ai/deepteam',
    github: 'https://github.com/confident-ai/deepteam',
    stars: '1.2k',
    tags: ['Red Team', 'Guardrails', 'Open Source', 'LLM'],
    features: [
      'Guardrail bypass testing',
      'Multi-turn attacks',
      'Jailbreak generation',
      'Safety evaluation'
    ],
    maintainer: 'Confident AI'
  },
  {
    id: 'tool-052',
    name: 'FuzzyAI',
    description: 'Automated fuzzing framework using genetic algorithms for AI model testing',
    category: 'fuzzing',
    url: 'https://github.com/cyberark/FuzzyAI',
    github: 'https://github.com/cyberark/FuzzyAI',
    stars: '850',
    tags: ['CyberArk', 'Fuzzing', 'Genetic Algorithms', 'Automated'],
    features: [
      'Genetic algorithm optimization',
      'Automated attack generation',
      'Multi-provider support',
      'Jailbreak detection'
    ],
    maintainer: 'CyberArk'
  },
  {
    id: 'tool-053',
    name: 'ARTKIT',
    description: 'Framework for multi-turn attacker-target simulations in LLM systems',
    category: 'adversarial-testing',
    url: 'https://github.com/bcgov/artkit',
    github: 'https://github.com/bcgov/artkit',
    stars: '420',
    tags: ['Multi-turn', 'Simulation', 'Attack Patterns', 'Open Source'],
    features: [
      'Multi-turn conversation testing',
      'Attacker persona simulation',
      'Target behavior analysis',
      'Attack chain tracking'
    ]
  },
  {
    id: 'tool-054',
    name: 'AutoRTAI',
    description: 'Agent-based automated red teaming at scale for AI systems',
    category: 'red-teaming',
    url: 'https://hiddenlayer.com/',
    tags: ['HiddenLayer', 'Agent-based', 'Scalable', 'Enterprise'],
    features: [
      'Autonomous agent attacks',
      'Scalable testing',
      'Continuous assessment',
      'Enterprise integration'
    ],
    maintainer: 'HiddenLayer'
  },
  {
    id: 'tool-055',
    name: 'Mindgard DAST-AI',
    description: 'Dynamic application security testing specialized for AI systems',
    category: 'vulnerability-scanner',
    url: 'https://mindgard.ai/',
    tags: ['DAST', 'Dynamic Testing', 'Enterprise', 'AI Security'],
    features: [
      'Runtime vulnerability detection',
      'AI-specific attack vectors',
      'Continuous monitoring',
      'Compliance reporting'
    ],
    maintainer: 'Mindgard'
  },
  {
    id: 'tool-056',
    name: 'Woodpecker',
    description: 'AI, Kubernetes, and API vulnerability testing platform',
    category: 'vulnerability-scanner',
    url: 'https://operant.ai/',
    tags: ['Operant AI', 'K8s', 'API', 'Infrastructure'],
    features: [
      'AI model scanning',
      'Kubernetes security',
      'API vulnerability testing',
      'Infrastructure assessment'
    ],
    maintainer: 'Operant AI'
  },
  {
    id: 'tool-057',
    name: 'Lakera Guard',
    description: 'Runtime protection layer for generative AI applications',
    category: 'llm-defense',
    url: 'https://www.lakera.ai/lakera-guard',
    tags: ['Lakera', 'Runtime Protection', 'Guardrails', 'Enterprise'],
    features: [
      'Prompt injection detection',
      'Real-time protection',
      'Low latency filtering',
      'Multi-language support'
    ],
    maintainer: 'Lakera'
  },
  {
    id: 'tool-058',
    name: 'JailbreakBench',
    description: 'Standardized benchmark for evaluating LLM jailbreak defenses',
    category: 'evaluation',
    url: 'https://jailbreakbench.github.io/',
    github: 'https://github.com/JailbreakBench/jailbreakbench',
    stars: '650',
    tags: ['NeurIPS 2024', 'Benchmark', 'Jailbreak', 'Evaluation'],
    features: [
      'Standardized jailbreak dataset',
      'Defense evaluation metrics',
      'Leaderboard ranking',
      'Reproducible testing'
    ]
  },
  {
    id: 'tool-059',
    name: 'HELM Safety',
    description: 'Stanford safety benchmark suite for holistic LLM evaluation',
    category: 'evaluation',
    url: 'https://crfm.stanford.edu/helm/',
    github: 'https://github.com/stanford-crfm/helm',
    stars: '1.9k',
    tags: ['Stanford', 'Benchmark', 'Safety', 'Holistic'],
    features: [
      'Comprehensive safety metrics',
      'Multiple risk categories',
      'Standardized evaluation',
      'Research-grade analysis'
    ],
    maintainer: 'Stanford CRFM'
  },
  {
    id: 'tool-060',
    name: 'OS-HARM',
    description: 'Safety benchmark for computer-use AI agents',
    category: 'evaluation',
    url: 'https://github.com/OSHarm-Benchmark/os-harm',
    github: 'https://github.com/OSHarm-Benchmark/os-harm',
    stars: '180',
    tags: ['Agent Safety', 'Computer Use', 'Benchmark', 'Research'],
    features: [
      'Computer use risk assessment',
      'Agent harm evaluation',
      'Autonomous action safety',
      'OS-level security testing'
    ]
  },
  {
    id: 'tool-061',
    name: 'OpenAI Evals',
    description: 'Framework for evaluating LLM behavior and capabilities',
    category: 'evaluation',
    url: 'https://github.com/openai/evals',
    github: 'https://github.com/openai/evals',
    stars: '14.5k',
    tags: ['OpenAI', 'Evaluation', 'Benchmarking', 'Open Source'],
    features: [
      'Custom eval creation',
      'Model comparison',
      'Capability assessment',
      'Safety benchmarks'
    ],
    maintainer: 'OpenAI'
  },
  {
    id: 'tool-062',
    name: 'BrokenHill',
    description: 'GCG-based jailbreak attack generator for LLM security testing',
    category: 'adversarial-testing',
    url: 'https://github.com/BishopFox/BrokenHill',
    github: 'https://github.com/BishopFox/BrokenHill',
    stars: '520',
    tags: ['Bishop Fox', 'GCG', 'Jailbreak', 'Adversarial'],
    features: [
      'GCG attack generation',
      'Gradient-based optimization',
      'Custom suffix creation',
      'Multi-model support'
    ],
    maintainer: 'Bishop Fox'
  },
  {
    id: 'tool-063',
    name: 'BurpGPT',
    description: 'LLM-integrated extension for Burp Suite web security testing',
    category: 'vulnerability-scanner',
    url: 'https://github.com/aress31/burpgpt',
    github: 'https://github.com/aress31/burpgpt',
    stars: '1.1k',
    tags: ['Burp Suite', 'Web Security', 'LLM Integration', 'Pentesting'],
    features: [
      'AI-assisted analysis',
      'Vulnerability detection',
      'Report generation',
      'Custom prompt support'
    ]
  },
  {
    id: 'tool-064',
    name: 'Crucible',
    description: 'AI/ML vulnerability practice platform by Dreadnode',
    category: 'red-teaming',
    url: 'https://crucible.dreadnode.io/',
    tags: ['Dreadnode', 'Practice', 'CTF', 'Learning'],
    features: [
      'Hands-on challenges',
      'Real vulnerability scenarios',
      'Progressive difficulty',
      'Community leaderboard'
    ],
    maintainer: 'Dreadnode'
  },
  {
    id: 'tool-065',
    name: 'Galah',
    description: 'LLM-powered web honeypot for threat intelligence gathering',
    category: 'monitoring',
    url: 'https://github.com/0x4D31/galah',
    github: 'https://github.com/0x4D31/galah',
    stars: '380',
    tags: ['Honeypot', 'Threat Intel', 'LLM-powered', 'Detection'],
    features: [
      'Dynamic response generation',
      'Attack pattern learning',
      'Threat intelligence',
      'Low maintenance operation'
    ]
  }
]

// Helper functions
export const getToolsByCategory = (category: ToolCategory): SecurityTool[] => {
  return securityTools.filter(t => t.category === category)
}

export const getToolById = (id: string): SecurityTool | undefined => {
  return securityTools.find(t => t.id === id)
}

export const searchTools = (query: string): SecurityTool[] => {
  const searchLower = query.toLowerCase()
  return securityTools.filter(tool =>
    tool.name.toLowerCase().includes(searchLower) ||
    tool.description.toLowerCase().includes(searchLower) ||
    tool.tags.some(t => t.toLowerCase().includes(searchLower))
  )
}

// Stats
export const toolStats = {
  totalTools: securityTools.length,
  byCategory: toolCategories.reduce((acc, cat) => {
    acc[cat.id] = getToolsByCategory(cat.id).length
    return acc
  }, {} as Record<ToolCategory, number>),
  withGithub: securityTools.filter(t => t.github).length,
  categories: toolCategories.length
}
