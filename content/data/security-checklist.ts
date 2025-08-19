export const securityChecklist = {
  categories: [
    {
      id: 'governance',
      title: 'AI Governance & Strategy',
      icon: 'Shield',
      severity: 'critical',
      items: [
        {
          id: 'governance-1',
          title: 'Establish AI Governance Framework',
          description: 'Implement comprehensive AI governance policies covering development, deployment, and operational phases.',
          severity: 'critical'
        },
        {
          id: 'governance-2',
          title: 'Define AI Risk Assessment Process',
          description: 'Create risk-based approach for AI systems with clear severity classification and mitigation strategies.',
          severity: 'high'
        },
        {
          id: 'governance-3',
          title: 'Implement AI Ethics Guidelines',
          description: 'Establish ethical AI principles focusing on fairness, transparency, and accountability.',
          severity: 'high'
        },
        {
          id: 'governance-4',
          title: 'Document AI System Inventory',
          description: 'Maintain comprehensive inventory of all AI systems including models, data sources, and dependencies.',
          severity: 'medium'
        },
        {
          id: 'governance-5',
          title: 'Establish Human Oversight Requirements',
          description: 'Define human-in-the-loop (HITL) requirements for critical AI decisions and operations.',
          severity: 'high'
        },
        {
          id: 'governance-6',
          title: 'Create AI Incident Response Plan',
          description: 'Develop specific incident response procedures for AI-related security events and failures.',
          severity: 'critical'
        }
      ]
    },
    {
      id: 'secure-design',
      title: 'Secure Design & Architecture',
      icon: 'Lock',
      severity: 'critical',
      items: [
        {
          id: 'design-1',
          title: 'Implement Threat Modeling for AI Systems',
          description: 'Perform STRIDE/PASTA threat modeling specifically adapted for AI components and data flows.',
          severity: 'critical'
        },
        {
          id: 'design-2',
          title: 'Design with Security-by-Default',
          description: 'Ensure all AI components have secure defaults with principle of least privilege.',
          severity: 'high'
        },
        {
          id: 'design-3',
          title: 'Implement Zero-Trust Architecture',
          description: 'Apply zero-trust principles to AI system communications and component interactions.',
          severity: 'high'
        },
        {
          id: 'design-4',
          title: 'Design for Explainability',
          description: 'Architect AI systems with built-in explainability and interpretability features.',
          severity: 'medium'
        },
        {
          id: 'design-5',
          title: 'Implement Secure API Design',
          description: 'Design APIs with rate limiting, authentication, and input validation for AI services.',
          severity: 'critical'
        }
      ]
    },
    {
      id: 'secure-development',
      title: 'Secure Development',
      icon: 'Code',
      severity: 'high',
      items: [
        {
          id: 'dev-1',
          title: 'Secure Coding Standards for AI',
          description: 'Implement AI-specific secure coding standards including prompt validation and output sanitization.',
          severity: 'high'
        },
        {
          id: 'dev-2',
          title: 'Implement Input Validation',
          description: 'Validate and sanitize all inputs to AI models including prompts, files, and API calls.',
          severity: 'critical'
        },
        {
          id: 'dev-3',
          title: 'Secure Model Training Pipeline',
          description: 'Implement security controls throughout the model training pipeline including data validation.',
          severity: 'high'
        },
        {
          id: 'dev-4',
          title: 'Version Control for Models',
          description: 'Implement comprehensive version control for models, datasets, and configurations.',
          severity: 'medium'
        },
        {
          id: 'dev-5',
          title: 'Dependency Management',
          description: 'Maintain secure dependency management with regular vulnerability scanning.',
          severity: 'high'
        }
      ]
    },
    {
      id: 'runtime-security',
      title: 'Runtime Security & Operations',
      icon: 'Activity',
      severity: 'critical',
      items: [
        {
          id: 'runtime-1',
          title: 'Implement Runtime Protection',
          description: 'Deploy runtime application self-protection (RASP) for AI applications.',
          severity: 'high'
        },
        {
          id: 'runtime-2',
          title: 'Monitor Model Behavior',
          description: 'Continuously monitor model outputs for anomalies, drift, and potential attacks.',
          severity: 'critical'
        },
        {
          id: 'runtime-3',
          title: 'Implement Rate Limiting',
          description: 'Apply rate limiting to prevent abuse and resource exhaustion attacks.',
          severity: 'high'
        },
        {
          id: 'runtime-4',
          title: 'Secure Model Serving',
          description: 'Implement secure model serving infrastructure with encryption and access controls.',
          severity: 'high'
        },
        {
          id: 'runtime-5',
          title: 'Runtime Threat Detection',
          description: 'Deploy real-time threat detection for prompt injection and adversarial attacks.',
          severity: 'critical'
        }
      ]
    },
    {
      id: 'llm-security',
      title: 'LLM Security & Alignment',
      icon: 'Brain',
      severity: 'critical',
      items: [
        {
          id: 'llm-1',
          title: 'Prompt Injection Prevention',
          description: 'Implement robust defenses against prompt injection attacks including input sanitization.',
          severity: 'critical'
        },
        {
          id: 'llm-2',
          title: 'Jailbreak Detection',
          description: 'Deploy detection mechanisms for jailbreak attempts and model manipulation.',
          severity: 'critical'
        },
        {
          id: 'llm-3',
          title: 'Output Filtering',
          description: 'Implement content filtering for harmful, biased, or sensitive outputs.',
          severity: 'high'
        },
        {
          id: 'llm-4',
          title: 'Context Window Security',
          description: 'Secure context window management to prevent information leakage.',
          severity: 'high'
        },
        {
          id: 'llm-5',
          title: 'System Prompt Protection',
          description: 'Protect system prompts from extraction and manipulation attempts.',
          severity: 'critical'
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
          id: 'data-1',
          title: 'Training Data Security',
          description: 'Secure training data storage with encryption, access controls, and audit logging.',
          severity: 'critical'
        },
        {
          id: 'data-2',
          title: 'PII Detection and Protection',
          description: 'Implement automated PII detection and redaction in training and inference data.',
          severity: 'critical'
        },
        {
          id: 'data-3',
          title: 'Data Poisoning Prevention',
          description: 'Implement controls to detect and prevent data poisoning attacks.',
          severity: 'high'
        },
        {
          id: 'data-4',
          title: 'Differential Privacy',
          description: 'Apply differential privacy techniques where appropriate to protect individual privacy.',
          severity: 'medium'
        },
        {
          id: 'data-5',
          title: 'Data Retention Policies',
          description: 'Implement clear data retention and deletion policies for AI systems.',
          severity: 'high'
        }
      ]
    },
    {
      id: 'model-security',
      title: 'Model Security & Integrity',
      icon: 'Cpu',
      severity: 'high',
      items: [
        {
          id: 'model-1',
          title: 'Model Integrity Verification',
          description: 'Implement cryptographic signing and verification for model files.',
          severity: 'high'
        },
        {
          id: 'model-2',
          title: 'Adversarial Robustness',
          description: 'Test and harden models against adversarial examples and evasion attacks.',
          severity: 'high'
        },
        {
          id: 'model-3',
          title: 'Model Extraction Prevention',
          description: 'Implement defenses against model extraction and intellectual property theft.',
          severity: 'medium'
        },
        {
          id: 'model-4',
          title: 'Backdoor Detection',
          description: 'Scan models for potential backdoors and trojans.',
          severity: 'critical'
        },
        {
          id: 'model-5',
          title: 'Model Access Control',
          description: 'Implement fine-grained access controls for model usage and modification.',
          severity: 'high'
        }
      ]
    },
    {
      id: 'prompt-security',
      title: 'Advanced Prompt Security',
      icon: 'MessageSquare',
      severity: 'critical',
      items: [
        {
          id: 'prompt-1',
          title: 'Prompt Template Security',
          description: 'Secure prompt templates against manipulation and injection attacks.',
          severity: 'high'
        },
        {
          id: 'prompt-2',
          title: 'Dynamic Prompt Validation',
          description: 'Implement real-time validation of dynamically generated prompts.',
          severity: 'critical'
        },
        {
          id: 'prompt-3',
          title: 'Prompt Logging and Auditing',
          description: 'Maintain comprehensive logs of all prompts for security analysis.',
          severity: 'medium'
        },
        {
          id: 'prompt-4',
          title: 'Prompt Complexity Limits',
          description: 'Enforce limits on prompt complexity to prevent resource exhaustion.',
          severity: 'medium'
        },
        {
          id: 'prompt-5',
          title: 'Prompt Sanitization Pipeline',
          description: 'Implement multi-stage prompt sanitization and validation pipeline.',
          severity: 'critical'
        }
      ]
    },
    {
      id: 'rag-security',
      title: 'RAG & Memory Security',
      icon: 'Archive',
      severity: 'high',
      items: [
        {
          id: 'rag-1',
          title: 'Vector Database Security',
          description: 'Secure vector databases with encryption, access controls, and query validation.',
          severity: 'high'
        },
        {
          id: 'rag-2',
          title: 'Knowledge Base Isolation',
          description: 'Implement proper isolation between different knowledge bases and tenants.',
          severity: 'critical'
        },
        {
          id: 'rag-3',
          title: 'Retrieval Result Validation',
          description: 'Validate and sanitize retrieved content before using in prompts.',
          severity: 'high'
        },
        {
          id: 'rag-4',
          title: 'Memory Injection Prevention',
          description: 'Prevent malicious memory injection in conversational AI systems.',
          severity: 'critical'
        },
        {
          id: 'rag-5',
          title: 'Context Leakage Prevention',
          description: 'Implement controls to prevent context leakage between sessions.',
          severity: 'high'
        }
      ]
    },
    {
      id: 'agent-security',
      title: 'Agent & Tool Security',
      icon: 'Tool',
      severity: 'critical',
      items: [
        {
          id: 'agent-1',
          title: 'Tool Execution Sandboxing',
          description: 'Run agent tools in isolated sandboxes with limited permissions.',
          severity: 'critical'
        },
        {
          id: 'agent-2',
          title: 'Tool Authentication',
          description: 'Implement strong authentication for all tool and API access.',
          severity: 'high'
        },
        {
          id: 'agent-3',
          title: 'Action Validation',
          description: 'Validate all agent actions before execution with policy enforcement.',
          severity: 'critical'
        },
        {
          id: 'agent-4',
          title: 'Tool Chain Security',
          description: 'Secure the entire tool chain from selection to execution.',
          severity: 'high'
        },
        {
          id: 'agent-5',
          title: 'Agent Loop Detection',
          description: 'Implement detection and prevention of infinite loops in agent execution.',
          severity: 'medium'
        }
      ]
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain & Dependencies',
      icon: 'Package',
      severity: 'high',
      items: [
        {
          id: 'supply-1',
          title: 'Model Supply Chain Security',
          description: 'Verify the integrity and provenance of all models and components.',
          severity: 'high'
        },
        {
          id: 'supply-2',
          title: 'Dependency Vulnerability Scanning',
          description: 'Regularly scan all dependencies for known vulnerabilities.',
          severity: 'critical'
        },
        {
          id: 'supply-3',
          title: 'Third-Party Model Assessment',
          description: 'Assess security of third-party models before integration.',
          severity: 'high'
        },
        {
          id: 'supply-4',
          title: 'License Compliance',
          description: 'Ensure compliance with all model and data licenses.',
          severity: 'medium'
        },
        {
          id: 'supply-5',
          title: 'Supply Chain Monitoring',
          description: 'Continuously monitor supply chain for security incidents.',
          severity: 'high'
        }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure & Deployment',
      icon: 'Server',
      severity: 'high',
      items: [
        {
          id: 'infra-1',
          title: 'Secure Infrastructure Configuration',
          description: 'Harden infrastructure with security best practices and CIS benchmarks.',
          severity: 'high'
        },
        {
          id: 'infra-2',
          title: 'Container Security',
          description: 'Implement container security scanning and runtime protection.',
          severity: 'high'
        },
        {
          id: 'infra-3',
          title: 'Network Segmentation',
          description: 'Implement proper network segmentation for AI workloads.',
          severity: 'high'
        },
        {
          id: 'infra-4',
          title: 'GPU Security',
          description: 'Secure GPU resources and prevent side-channel attacks.',
          severity: 'medium'
        },
        {
          id: 'infra-5',
          title: 'Edge Deployment Security',
          description: 'Secure edge deployments with encryption and tamper detection.',
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
          id: 'monitor-1',
          title: 'AI-Specific Security Monitoring',
          description: 'Implement monitoring for AI-specific threats and anomalies.',
          severity: 'critical'
        },
        {
          id: 'monitor-2',
          title: 'Model Performance Monitoring',
          description: 'Monitor model performance for degradation and potential attacks.',
          severity: 'high'
        },
        {
          id: 'monitor-3',
          title: 'Incident Response Procedures',
          description: 'Develop AI-specific incident response procedures and playbooks.',
          severity: 'critical'
        },
        {
          id: 'monitor-4',
          title: 'Forensics Capabilities',
          description: 'Implement forensics capabilities for AI security incidents.',
          severity: 'medium'
        },
        {
          id: 'monitor-5',
          title: 'Alert Correlation',
          description: 'Correlate alerts across AI systems for threat detection.',
          severity: 'high'
        }
      ]
    },
    {
      id: 'privacy-compliance',
      title: 'Privacy & Compliance',
      icon: 'FileText',
      severity: 'critical',
      items: [
        {
          id: 'privacy-1',
          title: 'GDPR Compliance',
          description: 'Ensure AI systems comply with GDPR including right to explanation.',
          severity: 'critical'
        },
        {
          id: 'privacy-2',
          title: 'Data Subject Rights',
          description: 'Implement mechanisms for data subject rights including deletion.',
          severity: 'high'
        },
        {
          id: 'privacy-3',
          title: 'Privacy Impact Assessment',
          description: 'Conduct privacy impact assessments for AI systems.',
          severity: 'high'
        },
        {
          id: 'privacy-4',
          title: 'Consent Management',
          description: 'Implement proper consent management for AI data processing.',
          severity: 'high'
        },
        {
          id: 'privacy-5',
          title: 'Cross-Border Data Transfer',
          description: 'Ensure compliance with cross-border data transfer regulations.',
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
          id: 'threat-1',
          title: 'Multi-Modal Attack Prevention',
          description: 'Defend against attacks combining text, image, and audio inputs.',
          severity: 'high'
        },
        {
          id: 'threat-2',
          title: 'Indirect Prompt Injection Defense',
          description: 'Protect against indirect prompt injection via external content.',
          severity: 'critical'
        },
        {
          id: 'threat-3',
          title: 'Model Inversion Prevention',
          description: 'Prevent attackers from reconstructing training data.',
          severity: 'medium'
        },
        {
          id: 'threat-4',
          title: 'Membership Inference Defense',
          description: 'Protect against membership inference attacks.',
          severity: 'medium'
        },
        {
          id: 'threat-5',
          title: 'Federated Learning Security',
          description: 'Secure federated learning implementations against poisoning.',
          severity: 'high'
        }
      ]
    }
  ]
}