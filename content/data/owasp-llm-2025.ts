import type { OWASPLLMEntry, Severity } from './types'

export const owaspLLM2025: OWASPLLMEntry[] = [
  {
    id: 'LLM01',
    rank: 1,
    title: 'Prompt Injection',
    description: 'Manipulating LLMs via crafted inputs to cause unintended actions, bypass restrictions, or leak sensitive information.',
    severity: 'critical' as Severity,
    overview: `Prompt Injection occurs when an attacker manipulates an LLM through specially crafted inputs that cause the model to execute unintended actions. This can happen directly through user prompts or indirectly through external data sources. The vulnerability exploits the LLM's inability to distinguish between developer instructions and user inputs.`,
    commonExamples: [
      'Direct injection: Overriding system prompts with malicious instructions',
      'Indirect injection: Embedding malicious instructions in documents, websites, or emails that the LLM processes',
      'Jailbreaking: Using crafted prompts to bypass safety guardrails',
      'Prompt leaking: Extracting the system prompt or confidential instructions',
      'Goal hijacking: Redirecting the LLM to perform actions contrary to its intended purpose',
    ],
    affectedComponents: [
      {
        component: 'System Prompts',
        description: 'Instructions given to define LLM behavior can be overridden or leaked',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'RAG Systems',
        description: 'Retrieved documents may contain injected instructions',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Agent Tools',
        description: 'LLM agents may execute unintended tool calls',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'Multi-modal Inputs',
        description: 'Images and audio can contain hidden injection payloads',
        riskLevel: 'high' as Severity,
      },
    ],
    preventionStrategies: [
      'Implement privilege separation between user inputs and system instructions',
      'Use structured output formats (JSON mode) to constrain LLM responses',
      'Apply input validation and sanitization for all user-provided content',
      'Implement human-in-the-loop for sensitive operations',
      'Use prompt injection detection systems and monitoring',
      'Regularly test with adversarial prompts and red teaming',
    ],
    detectionMethods: [
      'Monitor for unusual patterns in LLM outputs',
      'Implement canary tokens in system prompts',
      'Use prompt injection classifiers on inputs',
      'Log and analyze all LLM interactions',
      'Set up alerts for attempts to access restricted functions',
    ],
    mitigations: [
      'Treat all external data as potentially malicious',
      'Implement defense-in-depth with multiple security layers',
      'Use allowlists for permitted actions and outputs',
      'Apply rate limiting and anomaly detection',
      'Maintain clear separation between data and instructions',
    ],
    references: {
      owaspLLM: ['LLM01'],
      mitreAtlas: 'AML.T0051',
      cwe: ['CWE-77', 'CWE-94'],
    },
    resources: [
      { url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', label: 'OWASP LLM Top 10', type: 'official' },
      { url: 'https://gandalf.lakera.ai/', label: 'Gandalf - Practice Prompt Injection', type: 'website' },
      { url: 'https://github.com/OWASP/www-project-top-10-for-large-language-model-applications', label: 'GitHub Repository', type: 'github' },
    ],
    changesFrom2023: {
      previousRank: 1,
      changeType: 'unchanged',
      changeDescription: 'Remains the top vulnerability due to its fundamental nature and wide attack surface',
    },
  },
  {
    id: 'LLM02',
    rank: 2,
    title: 'Sensitive Information Disclosure',
    description: 'LLMs may reveal confidential data through their outputs, including training data, user PII, or proprietary information.',
    severity: 'high' as Severity,
    overview: `LLMs can inadvertently disclose sensitive information in multiple ways: memorizing and regurgitating training data, exposing user information from context windows, revealing system prompts or internal configurations, or providing detailed information that enables further attacks. This vulnerability is particularly concerning as LLMs are increasingly used to process confidential business data.`,
    commonExamples: [
      'Training data extraction: Prompting models to reveal memorized PII or secrets',
      'Context leakage: Exposing information from other users sessions or conversations',
      'System prompt leakage: Revealing confidential instructions or business logic',
      'Inference attacks: Deducing sensitive information through targeted questioning',
      'Cross-tenant data exposure: Leaking data between different organizational contexts',
    ],
    affectedComponents: [
      {
        component: 'Training Data',
        description: 'Models may memorize and reveal sensitive training data',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Context Windows',
        description: 'Information from one interaction may leak to others',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'System Prompts',
        description: 'Confidential instructions may be extracted',
        riskLevel: 'medium' as Severity,
      },
      {
        component: 'RAG Knowledge Bases',
        description: 'Indexed documents may be exposed inappropriately',
        riskLevel: 'high' as Severity,
      },
    ],
    preventionStrategies: [
      'Implement strict data sanitization before training and fine-tuning',
      'Use differential privacy techniques in model training',
      'Apply output filtering to detect and redact sensitive information',
      'Implement proper session isolation and context management',
      'Use access controls to limit data exposure based on user permissions',
      'Regularly audit model outputs for sensitive data leakage',
    ],
    detectionMethods: [
      'Deploy PII detection on model outputs',
      'Monitor for patterns indicating data extraction attempts',
      'Implement data loss prevention (DLP) solutions',
      'Use canary data to detect unauthorized extraction',
      'Regular penetration testing focused on data extraction',
    ],
    mitigations: [
      'Apply the principle of least privilege to data access',
      'Implement data classification and handling policies',
      'Use output sanitization and redaction',
      'Enable audit logging for all data access',
      'Consider federated learning for sensitive applications',
    ],
    references: {
      owaspLLM: ['LLM02'],
      mitreAtlas: 'AML.T0024',
      cwe: ['CWE-200', 'CWE-359'],
    },
    resources: [
      { url: 'https://arxiv.org/abs/2012.07805', label: 'Training Data Extraction Research', type: 'paper' },
    ],
    changesFrom2023: {
      previousRank: 6,
      previousTitle: 'Sensitive Information Disclosure',
      changeType: 'updated',
      changeDescription: 'Moved up significantly due to increased incidents of data leakage in production LLM systems',
    },
  },
  {
    id: 'LLM03',
    rank: 3,
    title: 'Supply Chain Vulnerabilities',
    description: 'Compromised components, training data, or third-party plugins can introduce vulnerabilities into LLM systems.',
    severity: 'high' as Severity,
    overview: `The LLM supply chain encompasses pre-trained models, training datasets, fine-tuning data, plugins, and deployment infrastructure. Each component presents potential security risks. Attackers may poison training data, inject backdoors into models, or compromise third-party integrations to affect downstream applications.`,
    commonExamples: [
      'Poisoned pre-trained models downloaded from model hubs',
      'Compromised training datasets containing malicious patterns',
      'Backdoored fine-tuning data that activates on specific triggers',
      'Malicious plugins or extensions with excessive permissions',
      'Vulnerable dependencies in the ML pipeline',
    ],
    affectedComponents: [
      {
        component: 'Pre-trained Models',
        description: 'Base models from external sources may be compromised',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Training Datasets',
        description: 'External datasets may contain poisoned examples',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Plugins/Extensions',
        description: 'Third-party integrations may have security flaws',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'ML Libraries',
        description: 'Dependencies may have known vulnerabilities',
        riskLevel: 'medium' as Severity,
      },
    ],
    preventionStrategies: [
      'Verify model provenance and use trusted sources',
      'Implement model signing and verification',
      'Scan models for backdoors and anomalies before deployment',
      'Audit training data sources and collection processes',
      'Apply strict plugin sandboxing and permission controls',
      'Maintain a software bill of materials (SBOM) for ML components',
    ],
    detectionMethods: [
      'Use model scanning tools to detect malicious patterns',
      'Monitor model behavior for unexpected outputs',
      'Implement anomaly detection on training pipelines',
      'Regular security audits of third-party components',
      'Track and verify cryptographic hashes of model files',
    ],
    mitigations: [
      'Use private model registries with access controls',
      'Implement continuous monitoring of model behavior',
      'Apply defense-in-depth for plugin security',
      'Regularly update and patch all components',
      'Have incident response plans for supply chain compromises',
    ],
    references: {
      owaspLLM: ['LLM03'],
      mitreAtlas: 'AML.T0019',
      cwe: ['CWE-1104', 'CWE-494'],
    },
    resources: [
      { url: 'https://github.com/protectai/modelscan', label: 'ModelScan - ML Model Security Scanner', type: 'github' },
    ],
    changesFrom2023: {
      previousRank: 5,
      changeType: 'updated',
      changeDescription: 'Increased importance due to growing reliance on pre-trained models and third-party components',
    },
  },
  {
    id: 'LLM04',
    rank: 4,
    title: 'Data and Model Poisoning',
    description: 'Malicious manipulation of training data or models to introduce vulnerabilities, backdoors, or biased behaviors.',
    severity: 'high' as Severity,
    overview: `Data poisoning attacks corrupt the training process by introducing malicious data that causes the model to learn unintended behaviors. This can result in backdoors that activate on specific triggers, biased outputs, degraded performance, or security vulnerabilities. Model poisoning directly manipulates model weights or architecture to achieve similar effects.`,
    commonExamples: [
      'Backdoor injection: Training data that creates hidden triggers',
      'Label flipping: Corrupted labels that cause misclassification',
      'Bias injection: Systematic manipulation to create discriminatory outputs',
      'Performance degradation: Data that reduces model accuracy',
      'Trojan insertion: Hidden functionality activated by specific inputs',
    ],
    affectedComponents: [
      {
        component: 'Training Pipeline',
        description: 'Data collection and preprocessing stages are vulnerable',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'Fine-tuning Data',
        description: 'Custom training data may be poisoned',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Model Weights',
        description: 'Direct manipulation of model parameters',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'RLHF Data',
        description: 'Human feedback data may be corrupted',
        riskLevel: 'medium' as Severity,
      },
    ],
    preventionStrategies: [
      'Implement robust data validation and cleaning pipelines',
      'Use statistical methods to detect anomalous training data',
      'Apply differential privacy to limit individual data influence',
      'Maintain provenance tracking for all training data',
      'Use diverse data sources to reduce poisoning impact',
      'Implement secure data collection processes',
    ],
    detectionMethods: [
      'Monitor model behavior for unexpected patterns',
      'Use backdoor detection techniques on trained models',
      'Implement data quality metrics and anomaly detection',
      'Regular A/B testing against clean baseline models',
      'Apply clustering to identify outlier training examples',
    ],
    mitigations: [
      'Curate and verify training data sources',
      'Use ensemble methods to reduce single-model vulnerabilities',
      'Implement model monitoring in production',
      'Have rollback capabilities for model deployments',
      'Regular retraining with verified clean data',
    ],
    references: {
      owaspLLM: ['LLM04'],
      mitreAtlas: 'AML.T0020',
      cwe: ['CWE-1188'],
    },
    resources: [
      { url: 'https://adversarial-robustness-toolbox.org/', label: 'Adversarial Robustness Toolbox', type: 'github' },
    ],
    changesFrom2023: {
      previousRank: 3,
      previousTitle: 'Training Data Poisoning',
      changeType: 'renamed',
      changeDescription: 'Expanded scope to include model poisoning alongside data poisoning',
    },
  },
  {
    id: 'LLM05',
    rank: 5,
    title: 'Improper Output Handling',
    description: 'Insufficient validation of LLM outputs before passing to downstream systems, enabling injection attacks and code execution.',
    severity: 'high' as Severity,
    overview: `LLM outputs are often passed to other systems, APIs, or interfaces without proper validation. This can lead to injection attacks (SQL, XSS, command injection), unauthorized actions, or system compromise. The vulnerability arises when LLM outputs are trusted implicitly and executed without sanitization or verification.`,
    commonExamples: [
      'SQL injection via LLM-generated queries',
      'Cross-site scripting through LLM-generated HTML',
      'Command injection when LLM output is passed to shell',
      'Code execution from LLM-generated code snippets',
      'SSRF through LLM-generated URLs',
    ],
    affectedComponents: [
      {
        component: 'Database Interfaces',
        description: 'LLM-generated queries may contain injection payloads',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'Web Interfaces',
        description: 'Direct rendering of LLM output enables XSS',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'System Commands',
        description: 'Passing LLM output to shells is high risk',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'API Calls',
        description: 'LLM-constructed API requests may be manipulated',
        riskLevel: 'high' as Severity,
      },
    ],
    preventionStrategies: [
      'Never trust LLM output - always validate and sanitize',
      'Use parameterized queries for database operations',
      'Apply output encoding for web rendering',
      'Implement strict allowlists for permitted operations',
      'Sandbox code execution environments',
      'Use structured output formats with schema validation',
    ],
    detectionMethods: [
      'Monitor downstream system logs for injection patterns',
      'Implement web application firewalls (WAF)',
      'Use static analysis on LLM-generated code',
      'Apply runtime application self-protection (RASP)',
      'Log and analyze all LLM outputs before execution',
    ],
    mitigations: [
      'Apply defense-in-depth for all downstream systems',
      'Use least privilege for LLM-initiated operations',
      'Implement human review for sensitive actions',
      'Deploy output validation middleware',
      'Regular security testing of LLM integration points',
    ],
    references: {
      owaspLLM: ['LLM05'],
      cwe: ['CWE-89', 'CWE-79', 'CWE-78'],
    },
    resources: [
      { url: 'https://owasp.org/www-community/attacks/xss/', label: 'OWASP XSS Guide', type: 'documentation' },
    ],
    changesFrom2023: {
      previousRank: 2,
      changeType: 'updated',
      changeDescription: 'Slightly lower ranking but still critical due to common integration patterns',
    },
  },
  {
    id: 'LLM06',
    rank: 6,
    title: 'Excessive Agency',
    description: 'LLM agents granted too many permissions or capabilities may perform harmful actions beyond their intended scope.',
    severity: 'critical' as Severity,
    overview: `As LLMs are increasingly used in autonomous agents with access to tools, APIs, and system resources, excessive agency becomes a critical concern. Agents may execute unintended actions, access unauthorized resources, or cause harm due to overly permissive configurations, unclear boundaries, or manipulation through prompt injection.`,
    commonExamples: [
      'Agent with unnecessary database write permissions',
      'Unrestricted file system access in coding assistants',
      'Email sending capabilities without proper authorization',
      'Financial transaction permissions without limits',
      'Administrative actions without human approval',
    ],
    affectedComponents: [
      {
        component: 'Tool Access',
        description: 'Agents may have access to powerful tools',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'API Permissions',
        description: 'Overly broad API access enables misuse',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'System Resources',
        description: 'File, network, and process access risks',
        riskLevel: 'critical' as Severity,
      },
      {
        component: 'External Services',
        description: 'Connections to third-party services',
        riskLevel: 'high' as Severity,
      },
    ],
    preventionStrategies: [
      'Apply principle of least privilege to all agent capabilities',
      'Implement explicit permission boundaries and rate limits',
      'Require human approval for high-impact actions',
      'Use capability-based security for tool access',
      'Design agents with minimal necessary permissions',
      'Implement action auditing and rollback capabilities',
    ],
    detectionMethods: [
      'Monitor agent actions for unexpected patterns',
      'Implement real-time alerting for sensitive operations',
      'Log all tool invocations and API calls',
      'Use anomaly detection on agent behavior',
      'Regular review of permission utilization',
    ],
    mitigations: [
      'Sandbox agent execution environments',
      'Implement kill switches for agent operations',
      'Use progressive permission escalation',
      'Deploy human-in-the-loop for critical actions',
      'Regular security review of agent configurations',
    ],
    references: {
      owaspLLM: ['LLM06'],
      mitreAtlas: 'AML.T0048',
      cwe: ['CWE-250', 'CWE-269'],
    },
    resources: [
      { url: 'https://gandalf.lakera.ai/agent-breaker', label: 'Agent Breaker - Test Agent Security', type: 'website' },
    ],
    changesFrom2023: {
      previousRank: 8,
      changeType: 'updated',
      changeDescription: 'Moved up significantly due to the rapid adoption of LLM agents in production',
    },
  },
  {
    id: 'LLM07',
    rank: 7,
    title: 'System Prompt Leakage',
    description: 'Extraction or inference of confidential system prompts that contain sensitive business logic or instructions.',
    severity: 'medium' as Severity,
    overview: `System prompts often contain proprietary information, business logic, content filtering rules, or security instructions. Attackers may attempt to extract these prompts through direct queries, inference attacks, or prompt injection. Leaked prompts can reveal application architecture, enable targeted attacks, or expose confidential business processes.`,
    commonExamples: [
      'Direct extraction: "Repeat your initial instructions"',
      'Inference attacks: Deducing rules through systematic probing',
      'Prompt injection to reveal system context',
      'Social engineering to get the model to reveal its instructions',
      'Using model verbosity to expose hidden prompts',
    ],
    affectedComponents: [
      {
        component: 'System Prompts',
        description: 'Initial instructions may be extracted',
        riskLevel: 'medium' as Severity,
      },
      {
        component: 'Business Logic',
        description: 'Proprietary rules may be revealed',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Security Rules',
        description: 'Content filtering logic may be exposed',
        riskLevel: 'medium' as Severity,
      },
    ],
    preventionStrategies: [
      'Assume system prompts may be leaked - avoid storing secrets',
      'Use server-side validation rather than prompt-based rules',
      'Implement prompt injection defenses',
      'Monitor for prompt extraction attempts',
      'Use multiple layers of instruction separation',
    ],
    detectionMethods: [
      'Pattern matching for extraction attempts',
      'Monitor output for system prompt content',
      'Log and analyze unusual query patterns',
      'Use canary phrases in prompts to detect leaks',
    ],
    mitigations: [
      'Never put secrets or credentials in system prompts',
      'Implement defense-in-depth for sensitive operations',
      'Use server-side enforcement for security rules',
      'Regular testing for prompt leakage vulnerabilities',
    ],
    references: {
      owaspLLM: ['LLM07'],
      cwe: ['CWE-200'],
    },
    resources: [],
    changesFrom2023: {
      changeType: 'new',
      changeDescription: 'New entry recognizing the specific risks of system prompt exposure',
    },
  },
  {
    id: 'LLM08',
    rank: 8,
    title: 'Vector and Embedding Weaknesses',
    description: 'Vulnerabilities in RAG systems through manipulated embeddings or poisoned vector databases.',
    severity: 'high' as Severity,
    overview: `Retrieval-Augmented Generation (RAG) systems use vector embeddings to retrieve relevant context for LLM responses. These systems can be attacked through embedding manipulation, vector database poisoning, or exploiting similarity search vulnerabilities. Successful attacks can inject malicious content or manipulate retrieval results.`,
    commonExamples: [
      'Poisoning vector databases with malicious documents',
      'Adversarial examples that manipulate embedding similarity',
      'Injection through retrieved context (indirect prompt injection)',
      'Exploiting embedding model weaknesses',
      'Cross-tenant data access in shared vector stores',
    ],
    affectedComponents: [
      {
        component: 'Vector Databases',
        description: 'Stored embeddings may be poisoned',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Embedding Models',
        description: 'Models may have exploitable weaknesses',
        riskLevel: 'medium' as Severity,
      },
      {
        component: 'Retrieval Pipeline',
        description: 'Search and ranking may be manipulated',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Document Ingestion',
        description: 'Malicious documents may be indexed',
        riskLevel: 'high' as Severity,
      },
    ],
    preventionStrategies: [
      'Validate and sanitize all documents before indexing',
      'Implement access controls on vector databases',
      'Use document-level permission enforcement',
      'Monitor embedding quality and distribution',
      'Apply content filtering to retrieved results',
    ],
    detectionMethods: [
      'Anomaly detection on new embeddings',
      'Monitor retrieval patterns for manipulation',
      'Periodic audits of indexed content',
      'Track embedding distribution changes',
    ],
    mitigations: [
      'Implement multi-tenant isolation in vector stores',
      'Use provenance tracking for indexed documents',
      'Apply defense-in-depth for RAG pipelines',
      'Regular security testing of RAG systems',
    ],
    references: {
      owaspLLM: ['LLM08'],
      mitreAtlas: 'AML.T0043',
      cwe: ['CWE-1188'],
    },
    resources: [],
    changesFrom2023: {
      changeType: 'new',
      changeDescription: 'New entry addressing the growing use of RAG architectures',
    },
  },
  {
    id: 'LLM09',
    rank: 9,
    title: 'Misinformation',
    description: 'LLMs generating false, misleading, or fabricated information that users may trust and act upon.',
    severity: 'medium' as Severity,
    overview: `LLMs can generate plausible-sounding but factually incorrect information (hallucinations), propagate misinformation from training data, or be manipulated to produce intentionally misleading content. This is particularly concerning in domains where accuracy is critical, such as healthcare, legal, financial, or news applications.`,
    commonExamples: [
      'Hallucinated citations and references',
      'Fabricated facts and statistics',
      'Confident but incorrect technical advice',
      'Outdated information presented as current',
      'Bias amplification from training data',
    ],
    affectedComponents: [
      {
        component: 'Model Outputs',
        description: 'Generated content may be factually incorrect',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Training Data',
        description: 'Source data may contain misinformation',
        riskLevel: 'medium' as Severity,
      },
      {
        component: 'Knowledge Cutoff',
        description: 'Information may be outdated',
        riskLevel: 'medium' as Severity,
      },
    ],
    preventionStrategies: [
      'Implement fact-checking mechanisms for critical domains',
      'Use retrieval-augmented generation with verified sources',
      'Display uncertainty indicators and source citations',
      'Implement output verification pipelines',
      'Clear user communication about LLM limitations',
    ],
    detectionMethods: [
      'Automated fact-checking against trusted sources',
      'Human review for high-stakes applications',
      'Monitor for known misinformation patterns',
      'Track citation accuracy',
    ],
    mitigations: [
      'Provide clear disclaimers about AI limitations',
      'Implement human oversight for critical decisions',
      'Use grounded generation with verified knowledge bases',
      'Regular model evaluation for factual accuracy',
    ],
    references: {
      owaspLLM: ['LLM09'],
      cwe: ['CWE-1188'],
    },
    resources: [],
    changesFrom2023: {
      previousRank: 9,
      previousTitle: 'Overreliance',
      changeType: 'renamed',
      changeDescription: 'Refocused specifically on misinformation rather than general overreliance',
    },
  },
  {
    id: 'LLM10',
    rank: 10,
    title: 'Unbounded Consumption',
    description: 'LLM applications vulnerable to resource exhaustion through denial of service, excessive costs, or computational abuse.',
    severity: 'medium' as Severity,
    overview: `LLM inference is computationally expensive. Attackers may attempt to exhaust resources through excessive requests, crafted inputs that maximize computation, or manipulation of agent loops. This can result in service denial, unexpected costs, or degraded performance for legitimate users.`,
    commonExamples: [
      'Denial of service through request flooding',
      'Crafted inputs that maximize token generation',
      'Infinite agent loops that consume resources',
      'Embedding generation attacks on RAG systems',
      'Cost amplification in pay-per-token systems',
    ],
    affectedComponents: [
      {
        component: 'API Endpoints',
        description: 'May be overwhelmed by requests',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Agent Systems',
        description: 'May enter infinite loops',
        riskLevel: 'high' as Severity,
      },
      {
        component: 'Cost Management',
        description: 'Unexpected bills from abuse',
        riskLevel: 'medium' as Severity,
      },
    ],
    preventionStrategies: [
      'Implement rate limiting at multiple levels',
      'Set maximum token limits for inputs and outputs',
      'Monitor and cap costs with alerts and limits',
      'Implement circuit breakers for agent loops',
      'Use queuing and backpressure mechanisms',
    ],
    detectionMethods: [
      'Real-time monitoring of resource consumption',
      'Anomaly detection on usage patterns',
      'Cost monitoring and alerting',
      'Track agent execution depth and duration',
    ],
    mitigations: [
      'Implement graceful degradation under load',
      'Use caching for repeated queries',
      'Deploy auto-scaling with cost limits',
      'Have kill switches for runaway processes',
    ],
    references: {
      owaspLLM: ['LLM10'],
      cwe: ['CWE-400', 'CWE-770'],
    },
    resources: [],
    changesFrom2023: {
      previousRank: 4,
      previousTitle: 'Model Denial of Service',
      changeType: 'renamed',
      changeDescription: 'Expanded to cover all forms of resource exhaustion including cost attacks',
    },
  },
]

// Helper functions
export const getEntryById = (id: string): OWASPLLMEntry | undefined => {
  return owaspLLM2025.find(entry => entry.id === id)
}

export const getEntriesBySeverity = (severity: Severity): OWASPLLMEntry[] => {
  return owaspLLM2025.filter(entry => entry.severity === severity)
}

export const getCriticalEntries = (): OWASPLLMEntry[] => {
  return getEntriesBySeverity('critical')
}

export const getHighEntries = (): OWASPLLMEntry[] => {
  return getEntriesBySeverity('high')
}

// Stats
export const owaspStats = {
  totalEntries: owaspLLM2025.length,
  bySeverity: {
    critical: getEntriesBySeverity('critical').length,
    high: getEntriesBySeverity('high').length,
    medium: getEntriesBySeverity('medium').length,
    low: getEntriesBySeverity('low').length,
  },
  newEntries: owaspLLM2025.filter(e => e.changesFrom2023?.changeType === 'new').length,
  updatedEntries: owaspLLM2025.filter(e =>
    e.changesFrom2023?.changeType === 'updated' ||
    e.changesFrom2023?.changeType === 'renamed'
  ).length,
}
