export const comprehensiveSecurityChecklist = {
  title: 'Comprehensive AI Security Checklist',
  version: '3.0',
  lastUpdated: '2024-01-19',
  categories: [
    {
      id: 'governance',
      title: 'AI Governance & Strategy',
      icon: 'Shield',
      severity: 'critical',
      items: [
        {
          id: 'gov-001',
          title: 'Establish AI Governance Framework',
          description: 'Define organizational structure, roles, and responsibilities for AI security governance',
          severity: 'critical'
        },
        {
          id: 'gov-002',
          title: 'Create AI Risk Register',
          description: 'Document and track all identified AI-related risks with likelihood and impact assessments',
          severity: 'critical'
        },
        {
          id: 'gov-003',
          title: 'Define AI Ethics Guidelines',
          description: 'Establish ethical principles for AI development and deployment aligned with organizational values',
          severity: 'high'
        },
        {
          id: 'gov-004',
          title: 'Implement AI System Inventory',
          description: 'Maintain comprehensive inventory of all AI systems, models, and their risk classifications',
          severity: 'high'
        },
        {
          id: 'gov-005',
          title: 'Establish AI Security Policies',
          description: 'Create and enforce policies for secure AI development, deployment, and operations',
          severity: 'critical'
        },
        {
          id: 'gov-006',
          title: 'Define Data Governance for AI',
          description: 'Establish policies for data collection, usage, retention, and deletion in AI systems',
          severity: 'high'
        },
        {
          id: 'gov-007',
          title: 'Create AI Incident Response Plan',
          description: 'Develop specific procedures for responding to AI security incidents and breaches',
          severity: 'critical'
        },
        {
          id: 'gov-008',
          title: 'Implement AI Audit Program',
          description: 'Regular audits of AI systems for security, compliance, and ethical alignment',
          severity: 'high'
        },
        {
          id: 'gov-009',
          title: 'Establish Vendor Risk Management',
          description: 'Assess and manage risks from third-party AI services and models',
          severity: 'high'
        },
        {
          id: 'gov-010',
          title: 'Define AI Change Management',
          description: 'Formal process for reviewing and approving changes to AI systems',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'design',
      title: 'Secure Design & Architecture',
      icon: 'Cpu',
      severity: 'critical',
      items: [
        {
          id: 'des-001',
          title: 'Conduct AI Threat Modeling',
          description: 'Identify and document potential threats using frameworks like STRIDE or MITRE ATLAS',
          severity: 'critical'
        },
        {
          id: 'des-002',
          title: 'Implement Defense in Depth',
          description: 'Layer multiple security controls throughout the AI system architecture',
          severity: 'critical'
        },
        {
          id: 'des-003',
          title: 'Design Secure APIs',
          description: 'Implement secure API design with authentication, authorization, and rate limiting',
          severity: 'critical'
        },
        {
          id: 'des-004',
          title: 'Implement Zero Trust Architecture',
          description: 'Never trust, always verify approach for all AI system components',
          severity: 'high'
        },
        {
          id: 'des-005',
          title: 'Design Secure Data Pipelines',
          description: 'Encrypt data in transit and at rest throughout the AI data pipeline',
          severity: 'critical'
        },
        {
          id: 'des-006',
          title: 'Implement Fail-Safe Mechanisms',
          description: 'Design systems to fail securely when errors or attacks occur',
          severity: 'high'
        },
        {
          id: 'des-007',
          title: 'Design for Explainability',
          description: 'Build interpretable AI systems that can explain their decisions',
          severity: 'medium'
        },
        {
          id: 'des-008',
          title: 'Implement Secure Model Architecture',
          description: 'Design model architectures resistant to adversarial attacks',
          severity: 'high'
        },
        {
          id: 'des-009',
          title: 'Design Privacy-Preserving Systems',
          description: 'Implement privacy by design principles including data minimization',
          severity: 'high'
        },
        {
          id: 'des-010',
          title: 'Create Security Reference Architecture',
          description: 'Document standard secure patterns for AI system implementation',
          severity: 'medium'
        },
        {
          id: 'des-011',
          title: 'Implement Secure Communication',
          description: 'Use TLS 1.3+ for all network communications between AI components',
          severity: 'critical'
        },
        {
          id: 'des-012',
          title: 'Design Isolation Boundaries',
          description: 'Separate AI components using containers, VMs, or physical isolation',
          severity: 'high'
        }
      ]
    },
    {
      id: 'development',
      title: 'Secure Development Practices',
      icon: 'Code',
      severity: 'critical',
      items: [
        {
          id: 'dev-001',
          title: 'Implement Secure Coding Standards',
          description: 'Enforce secure coding practices specific to AI/ML development',
          severity: 'critical'
        },
        {
          id: 'dev-002',
          title: 'Enable Static Code Analysis',
          description: 'Use SAST tools to identify security vulnerabilities in AI code',
          severity: 'high'
        },
        {
          id: 'dev-003',
          title: 'Implement Secret Detection',
          description: 'Scan code for hardcoded secrets, API keys, and credentials',
          severity: 'critical'
        },
        {
          id: 'dev-004',
          title: 'Conduct Dependency Scanning',
          description: 'Regular scanning of dependencies for known vulnerabilities',
          severity: 'critical'
        },
        {
          id: 'dev-005',
          title: 'Implement Code Reviews',
          description: 'Mandatory peer review of all AI-related code changes',
          severity: 'high'
        },
        {
          id: 'dev-006',
          title: 'Use Secure Development Environment',
          description: 'Isolated, monitored development environments for AI work',
          severity: 'high'
        },
        {
          id: 'dev-007',
          title: 'Version Control Security',
          description: 'Secure Git practices, signed commits, branch protection',
          severity: 'high'
        },
        {
          id: 'dev-008',
          title: 'Implement Security Testing',
          description: 'Integration of security tests in CI/CD pipeline',
          severity: 'critical'
        },
        {
          id: 'dev-009',
          title: 'Secure Model Training Pipeline',
          description: 'Secure and auditable model training processes',
          severity: 'high'
        },
        {
          id: 'dev-010',
          title: 'Implement Input Validation',
          description: 'Comprehensive validation of all inputs to AI systems',
          severity: 'critical'
        },
        {
          id: 'dev-011',
          title: 'Use Security Linters',
          description: 'Automated security checks for common vulnerabilities',
          severity: 'medium'
        },
        {
          id: 'dev-012',
          title: 'Implement Fuzzing',
          description: 'Fuzz testing of AI system inputs and APIs',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'prompt-security',
      title: 'Prompt & Input Security',
      icon: 'Terminal',
      severity: 'critical',
      items: [
        {
          id: 'prm-001',
          title: 'Implement Prompt Injection Defense',
          description: 'Deploy multiple layers of defense against prompt injection attacks',
          severity: 'critical'
        },
        {
          id: 'prm-002',
          title: 'Input Sanitization',
          description: 'Sanitize and validate all user inputs before processing',
          severity: 'critical'
        },
        {
          id: 'prm-003',
          title: 'Implement Prompt Templates',
          description: 'Use structured, parameterized prompt templates to prevent manipulation',
          severity: 'high'
        },
        {
          id: 'prm-004',
          title: 'Deploy Input Classifiers',
          description: 'Use ML classifiers to detect malicious or suspicious inputs',
          severity: 'high'
        },
        {
          id: 'prm-005',
          title: 'Implement Context Isolation',
          description: 'Separate user input from system instructions',
          severity: 'critical'
        },
        {
          id: 'prm-006',
          title: 'Enable Prompt Logging',
          description: 'Log all prompts for security monitoring and forensics',
          severity: 'high'
        },
        {
          id: 'prm-007',
          title: 'Implement Jailbreak Detection',
          description: 'Detect and block common jailbreaking attempts',
          severity: 'critical'
        },
        {
          id: 'prm-008',
          title: 'Deploy Semantic Filters',
          description: 'Filter prompts based on semantic content analysis',
          severity: 'high'
        },
        {
          id: 'prm-009',
          title: 'Implement Rate Limiting',
          description: 'Limit prompt submission rate per user/session',
          severity: 'high'
        },
        {
          id: 'prm-010',
          title: 'Use Prompt Firewalls',
          description: 'Deploy specialized firewalls for prompt security',
          severity: 'high'
        },
        {
          id: 'prm-011',
          title: 'Implement Prompt Encryption',
          description: 'Encrypt prompts in transit and at rest',
          severity: 'medium'
        },
        {
          id: 'prm-012',
          title: 'Enable Prompt Versioning',
          description: 'Track and audit all prompt template changes',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'llm-security',
      title: 'LLM & Model Security',
      icon: 'Brain',
      severity: 'critical',
      items: [
        {
          id: 'llm-001',
          title: 'Prevent Hallucination Exploitation',
          description: 'Implement controls to detect and mitigate hallucination-based attacks',
          severity: 'high'
        },
        {
          id: 'llm-002',
          title: 'Implement Output Validation',
          description: 'Validate and sanitize all model outputs before presentation',
          severity: 'critical'
        },
        {
          id: 'llm-003',
          title: 'Deploy Confidence Scoring',
          description: 'Include confidence scores with model outputs',
          severity: 'medium'
        },
        {
          id: 'llm-004',
          title: 'Implement Token Limits',
          description: 'Enforce maximum token limits for inputs and outputs',
          severity: 'high'
        },
        {
          id: 'llm-005',
          title: 'Enable Model Monitoring',
          description: 'Continuous monitoring of model behavior and performance',
          severity: 'high'
        },
        {
          id: 'llm-006',
          title: 'Implement Adversarial Defenses',
          description: 'Deploy defenses against adversarial examples',
          severity: 'high'
        },
        {
          id: 'llm-007',
          title: 'Secure Model Serving',
          description: 'Secure deployment of models in production',
          severity: 'critical'
        },
        {
          id: 'llm-008',
          title: 'Implement Model Versioning',
          description: 'Track and manage different model versions securely',
          severity: 'high'
        },
        {
          id: 'llm-009',
          title: 'Deploy Bias Detection',
          description: 'Monitor and mitigate model biases',
          severity: 'medium'
        },
        {
          id: 'llm-010',
          title: 'Implement Model Access Control',
          description: 'Fine-grained access control for model usage',
          severity: 'critical'
        },
        {
          id: 'llm-011',
          title: 'Enable Model Auditing',
          description: 'Comprehensive audit trails for model usage',
          severity: 'high'
        },
        {
          id: 'llm-012',
          title: 'Implement Model Sandboxing',
          description: 'Run models in isolated, sandboxed environments',
          severity: 'high'
        },
        {
          id: 'llm-013',
          title: 'Deploy Model Watermarking',
          description: 'Watermark model outputs for traceability',
          severity: 'medium'
        },
        {
          id: 'llm-014',
          title: 'Implement Fine-tuning Security',
          description: 'Secure processes for model fine-tuning',
          severity: 'high'
        },
        {
          id: 'llm-015',
          title: 'Enable Strategic Deception Detection',
          description: 'Detect when models attempt to deceive or mislead',
          severity: 'high'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security & Privacy',
      icon: 'Database',
      severity: 'critical',
      items: [
        {
          id: 'dat-001',
          title: 'Implement Data Classification',
          description: 'Classify all data used in AI systems by sensitivity level',
          severity: 'critical'
        },
        {
          id: 'dat-002',
          title: 'Enable Data Encryption',
          description: 'Encrypt all sensitive data at rest and in transit',
          severity: 'critical'
        },
        {
          id: 'dat-003',
          title: 'Implement Data Loss Prevention',
          description: 'Deploy DLP controls to prevent data exfiltration',
          severity: 'high'
        },
        {
          id: 'dat-004',
          title: 'Enable Privacy Controls',
          description: 'Implement GDPR/CCPA compliant privacy controls',
          severity: 'critical'
        },
        {
          id: 'dat-005',
          title: 'Implement Data Anonymization',
          description: 'Anonymize PII in training and inference data',
          severity: 'high'
        },
        {
          id: 'dat-006',
          title: 'Deploy Differential Privacy',
          description: 'Use differential privacy techniques where applicable',
          severity: 'medium'
        },
        {
          id: 'dat-007',
          title: 'Implement Data Retention Policies',
          description: 'Define and enforce data retention and deletion policies',
          severity: 'high'
        },
        {
          id: 'dat-008',
          title: 'Enable Data Access Logging',
          description: 'Log all access to sensitive data',
          severity: 'high'
        },
        {
          id: 'dat-009',
          title: 'Implement Data Quality Controls',
          description: 'Ensure data integrity and quality',
          severity: 'medium'
        },
        {
          id: 'dat-010',
          title: 'Deploy PII Detection',
          description: 'Automatically detect and protect PII',
          severity: 'high'
        },
        {
          id: 'dat-011',
          title: 'Implement Secure Data Sharing',
          description: 'Secure mechanisms for data sharing between systems',
          severity: 'high'
        },
        {
          id: 'dat-012',
          title: 'Enable Data Provenance Tracking',
          description: 'Track data lineage and provenance',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'rag-memory',
      title: 'RAG & Memory Security',
      icon: 'Archive',
      severity: 'high',
      items: [
        {
          id: 'rag-001',
          title: 'Secure Vector Databases',
          description: 'Implement access controls and encryption for vector databases',
          severity: 'critical'
        },
        {
          id: 'rag-002',
          title: 'Prevent Knowledge Base Poisoning',
          description: 'Protect against malicious data injection in knowledge bases',
          severity: 'critical'
        },
        {
          id: 'rag-003',
          title: 'Implement Retrieval Filtering',
          description: 'Filter retrieved content for security and relevance',
          severity: 'high'
        },
        {
          id: 'rag-004',
          title: 'Enable Memory Isolation',
          description: 'Isolate memory between different users and sessions',
          severity: 'critical'
        },
        {
          id: 'rag-005',
          title: 'Implement Citation Verification',
          description: 'Verify and validate all citations and sources',
          severity: 'medium'
        },
        {
          id: 'rag-006',
          title: 'Deploy Embedding Security',
          description: 'Secure embedding generation and storage',
          severity: 'high'
        },
        {
          id: 'rag-007',
          title: 'Implement Context Window Security',
          description: 'Secure management of context windows',
          severity: 'high'
        },
        {
          id: 'rag-008',
          title: 'Enable Memory Auditing',
          description: 'Audit trail for all memory operations',
          severity: 'medium'
        },
        {
          id: 'rag-009',
          title: 'Implement Chunking Security',
          description: 'Secure document chunking and processing',
          severity: 'medium'
        },
        {
          id: 'rag-010',
          title: 'Deploy Similarity Threshold Controls',
          description: 'Configure appropriate similarity thresholds',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'agent-tool',
      title: 'Agent & Tool Security',
      icon: 'Package',
      severity: 'critical',
      items: [
        {
          id: 'agt-001',
          title: 'Implement Tool Access Control',
          description: 'Fine-grained permissions for tool usage',
          severity: 'critical'
        },
        {
          id: 'agt-002',
          title: 'Enable Tool Sandboxing',
          description: 'Run tools in isolated environments',
          severity: 'critical'
        },
        {
          id: 'agt-003',
          title: 'Implement Tool Validation',
          description: 'Validate all tool inputs and outputs',
          severity: 'high'
        },
        {
          id: 'agt-004',
          title: 'Deploy Agent Monitoring',
          description: 'Monitor all agent actions and decisions',
          severity: 'high'
        },
        {
          id: 'agt-005',
          title: 'Implement Chain-of-Thought Security',
          description: 'Secure reasoning chains from manipulation',
          severity: 'high'
        },
        {
          id: 'agt-006',
          title: 'Enable Tool Rate Limiting',
          description: 'Limit tool usage frequency',
          severity: 'high'
        },
        {
          id: 'agt-007',
          title: 'Implement Plugin Security',
          description: 'Secure plugin architecture and validation',
          severity: 'critical'
        },
        {
          id: 'agt-008',
          title: 'Deploy Capability Restrictions',
          description: 'Limit agent capabilities based on context',
          severity: 'high'
        },
        {
          id: 'agt-009',
          title: 'Enable Agent Audit Trails',
          description: 'Comprehensive logging of agent activities',
          severity: 'high'
        },
        {
          id: 'agt-010',
          title: 'Implement Multi-Agent Security',
          description: 'Secure communication between multiple agents',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain Security',
      icon: 'Link',
      severity: 'critical',
      items: [
        {
          id: 'sup-001',
          title: 'Verify Model Provenance',
          description: 'Verify source and integrity of all models',
          severity: 'critical'
        },
        {
          id: 'sup-002',
          title: 'Scan Dependencies',
          description: 'Regular scanning of all dependencies for vulnerabilities',
          severity: 'critical'
        },
        {
          id: 'sup-003',
          title: 'Implement SBOM',
          description: 'Generate Software Bill of Materials for AI systems',
          severity: 'high'
        },
        {
          id: 'sup-004',
          title: 'Verify Dataset Integrity',
          description: 'Verify integrity and safety of training datasets',
          severity: 'critical'
        },
        {
          id: 'sup-005',
          title: 'Implement Model Signing',
          description: 'Digitally sign and verify all models',
          severity: 'high'
        },
        {
          id: 'sup-006',
          title: 'Enable Supply Chain Monitoring',
          description: 'Continuous monitoring of supply chain risks',
          severity: 'high'
        },
        {
          id: 'sup-007',
          title: 'Implement Vendor Assessment',
          description: 'Security assessment of all AI vendors',
          severity: 'high'
        },
        {
          id: 'sup-008',
          title: 'Deploy Container Scanning',
          description: 'Scan all containers for vulnerabilities',
          severity: 'high'
        },
        {
          id: 'sup-009',
          title: 'Enable License Compliance',
          description: 'Ensure compliance with all software licenses',
          severity: 'medium'
        },
        {
          id: 'sup-010',
          title: 'Implement Artifact Registry',
          description: 'Secure registry for all AI artifacts',
          severity: 'high'
        }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure & Deployment',
      icon: 'Server',
      severity: 'critical',
      items: [
        {
          id: 'inf-001',
          title: 'Implement Network Segmentation',
          description: 'Isolate AI systems in secure network segments',
          severity: 'critical'
        },
        {
          id: 'inf-002',
          title: 'Enable Cloud Security',
          description: 'Implement cloud security best practices',
          severity: 'critical'
        },
        {
          id: 'inf-003',
          title: 'Deploy WAF',
          description: 'Web Application Firewall for AI endpoints',
          severity: 'high'
        },
        {
          id: 'inf-004',
          title: 'Implement DDoS Protection',
          description: 'Protect against denial of service attacks',
          severity: 'high'
        },
        {
          id: 'inf-005',
          title: 'Enable Container Security',
          description: 'Secure container orchestration and runtime',
          severity: 'critical'
        },
        {
          id: 'inf-006',
          title: 'Implement Secrets Management',
          description: 'Secure storage and rotation of secrets',
          severity: 'critical'
        },
        {
          id: 'inf-007',
          title: 'Deploy Infrastructure as Code',
          description: 'Version-controlled, secure infrastructure',
          severity: 'high'
        },
        {
          id: 'inf-008',
          title: 'Enable GPU Security',
          description: 'Secure GPU resources and access',
          severity: 'high'
        },
        {
          id: 'inf-009',
          title: 'Implement Backup & Recovery',
          description: 'Regular backups and disaster recovery plan',
          severity: 'high'
        },
        {
          id: 'inf-010',
          title: 'Deploy Load Balancing',
          description: 'Secure load balancing for AI services',
          severity: 'medium'
        },
        {
          id: 'inf-011',
          title: 'Enable CDN Security',
          description: 'Secure content delivery for AI assets',
          severity: 'medium'
        },
        {
          id: 'inf-012',
          title: 'Implement Edge Security',
          description: 'Secure edge deployment of AI models',
          severity: 'high'
        }
      ]
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Incident Response',
      icon: 'AlertTriangle',
      severity: 'critical',
      items: [
        {
          id: 'mon-001',
          title: 'Implement Security Monitoring',
          description: 'Real-time monitoring of security events',
          severity: 'critical'
        },
        {
          id: 'mon-002',
          title: 'Deploy Anomaly Detection',
          description: 'AI-based anomaly detection for security',
          severity: 'high'
        },
        {
          id: 'mon-003',
          title: 'Enable Threat Intelligence',
          description: 'Integration with threat intelligence feeds',
          severity: 'high'
        },
        {
          id: 'mon-004',
          title: 'Implement SIEM Integration',
          description: 'Integrate with Security Information and Event Management',
          severity: 'high'
        },
        {
          id: 'mon-005',
          title: 'Deploy Incident Response Team',
          description: 'Dedicated team for AI security incidents',
          severity: 'critical'
        },
        {
          id: 'mon-006',
          title: 'Enable Forensics Capability',
          description: 'Tools and processes for AI forensics',
          severity: 'high'
        },
        {
          id: 'mon-007',
          title: 'Implement Alert Management',
          description: 'Prioritized alerting for security events',
          severity: 'high'
        },
        {
          id: 'mon-008',
          title: 'Deploy Performance Monitoring',
          description: 'Monitor AI system performance for anomalies',
          severity: 'medium'
        },
        {
          id: 'mon-009',
          title: 'Enable Compliance Monitoring',
          description: 'Continuous compliance monitoring',
          severity: 'high'
        },
        {
          id: 'mon-010',
          title: 'Implement Metric Collection',
          description: 'Comprehensive metrics for security analysis',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Legal',
      icon: 'FileText',
      severity: 'high',
      items: [
        {
          id: 'com-001',
          title: 'Implement GDPR Compliance',
          description: 'Ensure compliance with GDPR requirements',
          severity: 'critical'
        },
        {
          id: 'com-002',
          title: 'Enable CCPA Compliance',
          description: 'California Consumer Privacy Act compliance',
          severity: 'critical'
        },
        {
          id: 'com-003',
          title: 'Implement AI Act Compliance',
          description: 'EU AI Act compliance requirements',
          severity: 'high'
        },
        {
          id: 'com-004',
          title: 'Deploy Right to Explanation',
          description: 'Ability to explain AI decisions',
          severity: 'high'
        },
        {
          id: 'com-005',
          title: 'Enable Data Subject Rights',
          description: 'Support for data subject access requests',
          severity: 'high'
        },
        {
          id: 'com-006',
          title: 'Implement Consent Management',
          description: 'Manage user consent for AI processing',
          severity: 'high'
        },
        {
          id: 'com-007',
          title: 'Deploy Audit Trail',
          description: 'Comprehensive audit trail for compliance',
          severity: 'high'
        },
        {
          id: 'com-008',
          title: 'Enable Cross-Border Compliance',
          description: 'Comply with international data transfer rules',
          severity: 'high'
        },
        {
          id: 'com-009',
          title: 'Implement Industry Standards',
          description: 'Comply with industry-specific standards',
          severity: 'medium'
        },
        {
          id: 'com-010',
          title: 'Deploy Legal Hold',
          description: 'Support for legal hold requirements',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'testing',
      title: 'Security Testing & Validation',
      icon: 'CheckCircle',
      severity: 'critical',
      items: [
        {
          id: 'tst-001',
          title: 'Conduct Penetration Testing',
          description: 'Regular penetration testing of AI systems',
          severity: 'critical'
        },
        {
          id: 'tst-002',
          title: 'Implement Red Team Exercises',
          description: 'Adversarial testing by red team',
          severity: 'critical'
        },
        {
          id: 'tst-003',
          title: 'Deploy Adversarial Testing',
          description: 'Test against adversarial examples',
          severity: 'high'
        },
        {
          id: 'tst-004',
          title: 'Enable Continuous Testing',
          description: 'Automated security testing in CI/CD',
          severity: 'high'
        },
        {
          id: 'tst-005',
          title: 'Implement Chaos Engineering',
          description: 'Test system resilience through controlled failures',
          severity: 'medium'
        },
        {
          id: 'tst-006',
          title: 'Deploy Fuzzing',
          description: 'Fuzz testing of all inputs',
          severity: 'high'
        },
        {
          id: 'tst-007',
          title: 'Enable Performance Testing',
          description: 'Load and stress testing',
          severity: 'medium'
        },
        {
          id: 'tst-008',
          title: 'Implement Robustness Testing',
          description: 'Test model robustness to perturbations',
          severity: 'high'
        },
        {
          id: 'tst-009',
          title: 'Deploy Bias Testing',
          description: 'Test for algorithmic bias',
          severity: 'high'
        },
        {
          id: 'tst-010',
          title: 'Enable Regression Testing',
          description: 'Ensure security fixes don\'t introduce new issues',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'training',
      title: 'Training & Awareness',
      icon: 'Users',
      severity: 'high',
      items: [
        {
          id: 'trn-001',
          title: 'Implement Security Training Program',
          description: 'Regular AI security training for all staff',
          severity: 'high'
        },
        {
          id: 'trn-002',
          title: 'Deploy Developer Training',
          description: 'Secure coding training for AI developers',
          severity: 'high'
        },
        {
          id: 'trn-003',
          title: 'Enable User Awareness',
          description: 'AI security awareness for end users',
          severity: 'medium'
        },
        {
          id: 'trn-004',
          title: 'Implement Incident Response Training',
          description: 'Training for incident response procedures',
          severity: 'high'
        },
        {
          id: 'trn-005',
          title: 'Deploy Phishing Simulations',
          description: 'AI-specific phishing awareness training',
          severity: 'medium'
        },
        {
          id: 'trn-006',
          title: 'Enable Executive Briefings',
          description: 'AI risk briefings for leadership',
          severity: 'high'
        },
        {
          id: 'trn-007',
          title: 'Implement Certification Program',
          description: 'AI security certifications for key roles',
          severity: 'medium'
        },
        {
          id: 'trn-008',
          title: 'Deploy Knowledge Base',
          description: 'Centralized AI security knowledge repository',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'advanced-threats',
      title: 'Advanced Threat Scenarios',
      icon: 'Zap',
      severity: 'critical',
      items: [
        {
          id: 'adv-001',
          title: 'Detect Capability Concealment',
          description: 'Identify when models hide their true capabilities',
          severity: 'critical'
        },
        {
          id: 'adv-002',
          title: 'Prevent Goal Misalignment',
          description: 'Detect and prevent AI goal hijacking',
          severity: 'critical'
        },
        {
          id: 'adv-003',
          title: 'Detect Emergent Behaviors',
          description: 'Monitor for unexpected emergent capabilities',
          severity: 'high'
        },
        {
          id: 'adv-004',
          title: 'Prevent Coordination Attacks',
          description: 'Detect multi-agent coordination for attacks',
          severity: 'high'
        },
        {
          id: 'adv-005',
          title: 'Detect Deceptive Alignment',
          description: 'Identify when AI systems deceive about alignment',
          severity: 'critical'
        },
        {
          id: 'adv-006',
          title: 'Prevent Recursive Improvement',
          description: 'Control unauthorized self-improvement',
          severity: 'critical'
        },
        {
          id: 'adv-007',
          title: 'Detect Backdoor Triggers',
          description: 'Identify hidden backdoor activation patterns',
          severity: 'critical'
        },
        {
          id: 'adv-008',
          title: 'Prevent Cascading Failures',
          description: 'Stop AI failures from propagating',
          severity: 'high'
        },
        {
          id: 'adv-009',
          title: 'Detect Steganographic Communication',
          description: 'Identify hidden communication channels',
          severity: 'medium'
        },
        {
          id: 'adv-010',
          title: 'Prevent Reward Hacking',
          description: 'Detect when AI systems game their reward functions',
          severity: 'high'
        }
      ]
    }
  ]
}