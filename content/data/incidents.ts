export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low'

export type IncidentCategory =
  | 'prompt-injection'
  | 'data-leak'
  | 'jailbreak'
  | 'misuse'
  | 'adversarial'
  | 'supply-chain'
  | 'privacy'
  | 'model-theft'
  | 'ai-orchestrated'
  | 'zero-click'
  | 'deepfake'
  | 'rce'

export interface IncidentSource {
  name: string
  url: string
}

export interface Incident {
  id: string
  title: string
  date: string
  organization: string
  category: IncidentCategory
  severity: IncidentSeverity
  description: string
  impact: string
  technicalDetails: string[]
  lessonsLearned: string[]
  mitigations: string[]
  sources: IncidentSource[]
  tags: string[]
}

export const incidentCategories: { id: IncidentCategory; label: string; description: string }[] = [
  {
    id: 'prompt-injection',
    label: 'Prompt Injection',
    description: 'Incidents involving manipulation of AI prompts to bypass controls'
  },
  {
    id: 'data-leak',
    label: 'Data Leak',
    description: 'Unintended disclosure of training data or sensitive information'
  },
  {
    id: 'jailbreak',
    label: 'Jailbreak',
    description: 'Bypassing safety guardrails to produce harmful content'
  },
  {
    id: 'misuse',
    label: 'Misuse',
    description: 'Inappropriate or malicious use of AI systems'
  },
  {
    id: 'adversarial',
    label: 'Adversarial Attack',
    description: 'Attacks using adversarial inputs to manipulate model behavior'
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain',
    description: 'Compromises in ML model or data supply chain'
  },
  {
    id: 'privacy',
    label: 'Privacy Violation',
    description: 'Incidents involving PII exposure or privacy breaches'
  },
  {
    id: 'model-theft',
    label: 'Model Theft',
    description: 'Unauthorized extraction or copying of model weights/architecture'
  },
  {
    id: 'ai-orchestrated',
    label: 'AI-Orchestrated',
    description: 'Attacks primarily conducted or orchestrated by AI systems'
  },
  {
    id: 'zero-click',
    label: 'Zero-Click',
    description: 'Attacks requiring no user interaction to exploit'
  },
  {
    id: 'deepfake',
    label: 'Deepfake',
    description: 'Incidents involving AI-generated fake audio, video, or images'
  },
  {
    id: 'rce',
    label: 'Remote Code Execution',
    description: 'Vulnerabilities allowing arbitrary code execution'
  }
]

export const incidents: Incident[] = [
  {
    id: 'inc-001',
    title: 'ChatGPT Data Leak via Bug',
    date: '2023-03-20',
    organization: 'OpenAI',
    category: 'data-leak',
    severity: 'high',
    description: 'A bug in an open-source library caused ChatGPT to display chat history titles belonging to other users. Payment information was also exposed for a small number of ChatGPT Plus subscribers.',
    impact: 'User chat titles and payment information (name, email, payment address, last 4 digits of credit card) were exposed to other users. Approximately 1.2% of Plus subscribers were affected.',
    technicalDetails: [
      'Bug was in Redis client library (redis-py)',
      'Occurred during a specific time window on March 20, 2023',
      'Cache corruption caused cross-user data leakage',
      'Issue manifested when users returned to the service after being logged out'
    ],
    lessonsLearned: [
      'Third-party library dependencies can introduce security vulnerabilities',
      'Caching mechanisms need robust isolation between users',
      'Monitoring for anomalous data access patterns is essential',
      'Rapid incident response and communication is critical'
    ],
    mitigations: [
      'Patched the redis-py library',
      'Added redundant checks for cache data integrity',
      'Implemented additional monitoring for cross-user data access',
      'Notified affected users and reset exposed data'
    ],
    sources: [
      { name: 'OpenAI Blog', url: 'https://openai.com/blog/march-20-chatgpt-outage' },
      { name: 'TechCrunch', url: 'https://techcrunch.com/2023/03/24/openai-chatgpt-bug-exposed-users-payment-information/' }
    ],
    tags: ['chatgpt', 'redis', 'cache', 'payment-data', 'pii']
  },
  {
    id: 'inc-002',
    title: 'Bing Chat Prompt Injection via Web Content',
    date: '2023-02-14',
    organization: 'Microsoft',
    category: 'prompt-injection',
    severity: 'high',
    description: 'Researchers discovered that Bing Chat could be manipulated through hidden instructions embedded in web pages, causing it to change behavior and potentially leak system prompts.',
    impact: 'Attackers could potentially manipulate Bing Chat responses, extract confidential system prompts, and spread misinformation through crafted web content.',
    technicalDetails: [
      'Injection via hidden text in web pages browsed by Bing',
      'White text on white background technique',
      'Instructions embedded in HTML comments',
      'Exploited the lack of separation between retrieved content and user instructions'
    ],
    lessonsLearned: [
      'RAG systems need robust input sanitization for retrieved content',
      'Visual hiding techniques can bypass basic security checks',
      'System prompts should be protected from extraction attempts',
      'Retrieved content should be treated as untrusted by default'
    ],
    mitigations: [
      'Improved content filtering for web-sourced text',
      'Added prompt isolation techniques',
      'Enhanced detection of hidden text patterns',
      'Implemented output monitoring for prompt leakage'
    ],
    sources: [
      { name: 'Arvind Narayanan Research', url: 'https://twitter.com/random_walker/status/1625156831563870208' },
      { name: 'Simon Willison Blog', url: 'https://simonwillison.net/2023/Feb/15/bing/' }
    ],
    tags: ['bing', 'prompt-injection', 'rag', 'web-content', 'indirect-injection']
  },
  {
    id: 'inc-003',
    title: 'Samsung Confidential Code Leak via ChatGPT',
    date: '2023-04-02',
    organization: 'Samsung',
    category: 'data-leak',
    severity: 'critical',
    description: 'Samsung employees accidentally leaked confidential source code and internal meeting notes by inputting them into ChatGPT for assistance, resulting in potential exposure of proprietary information.',
    impact: 'Confidential semiconductor source code, test sequences, and internal meeting content were potentially added to ChatGPT training data, risking intellectual property exposure.',
    technicalDetails: [
      'Three separate incidents within 20 days',
      'Employees pasted source code to fix bugs',
      'Meeting notes were submitted for summarization',
      'Data potentially incorporated into model training'
    ],
    lessonsLearned: [
      'Employees need clear policies on AI tool usage with confidential data',
      'Technical controls should prevent sensitive data from reaching external AI services',
      'Enterprise AI deployments should include data loss prevention (DLP)',
      'Training on AI security risks is essential for all employees'
    ],
    mitigations: [
      'Samsung banned ChatGPT usage on company devices',
      'Implemented DLP controls for AI services',
      'Established internal AI usage policies',
      'Began developing internal AI alternatives'
    ],
    sources: [
      { name: 'Bloomberg', url: 'https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-chatbots-for-employees-after-leak' },
      { name: 'The Economist', url: 'https://economist.com/business/2023/04/19/samsung-employees-leaked-secrets-to-chatgpt' }
    ],
    tags: ['samsung', 'source-code', 'intellectual-property', 'employee-error', 'dlp']
  },
  {
    id: 'inc-004',
    title: 'GPT-4 System Prompt Extraction',
    date: '2023-11-15',
    organization: 'OpenAI',
    category: 'prompt-injection',
    severity: 'medium',
    description: 'Researchers and users discovered multiple techniques to extract the full system prompts from GPT-4 and various GPTs, revealing confidential instructions and business logic.',
    impact: 'System prompts containing business logic, persona instructions, and confidential configurations were publicly exposed for numerous GPT applications.',
    technicalDetails: [
      'Techniques included direct asking, role-playing scenarios, and completion tricks',
      'Output format manipulation bypassed filters',
      'Instruction hierarchy could be subverted',
      'Custom GPTs were particularly vulnerable'
    ],
    lessonsLearned: [
      'System prompts should not contain sensitive information',
      'Assume system prompts can be extracted',
      'Defense in depth is necessary beyond prompt-level controls',
      'Monitor for prompt extraction attempts'
    ],
    mitigations: [
      'Improved instruction following to resist extraction',
      'Added system prompt protection guidelines',
      'Implemented output monitoring for prompt content',
      'Recommended against storing secrets in system prompts'
    ],
    sources: [
      { name: 'Twitter/X Research Thread', url: 'https://twitter.com/search?q=gpt%20system%20prompt%20extraction' },
      { name: 'GitHub Awesome GPT Prompts', url: 'https://github.com/f/awesome-chatgpt-prompts' }
    ],
    tags: ['gpt-4', 'system-prompt', 'extraction', 'custom-gpts', 'prompt-leakage']
  },
  {
    id: 'inc-005',
    title: 'DAN Jailbreak Proliferation',
    date: '2023-02-04',
    organization: 'OpenAI',
    category: 'jailbreak',
    severity: 'high',
    description: 'The "Do Anything Now" (DAN) jailbreak technique spread widely, enabling users to bypass ChatGPT safety measures through role-playing scenarios that created an unrestricted alter-ego.',
    impact: 'Widespread circumvention of safety measures allowed generation of harmful content, misinformation, and content violating usage policies.',
    technicalDetails: [
      'Role-play based attack creating alternate "DAN" persona',
      'Exploited instruction-following over safety training',
      'Multiple iterations (DAN 5.0, 6.0, etc.) evolved to bypass patches',
      'Token-based "threat" systems increased compliance'
    ],
    lessonsLearned: [
      'Role-playing scenarios can bypass safety training',
      'Jailbreaks evolve rapidly in response to patches',
      'Safety measures need continuous red-teaming',
      'Public disclosure of jailbreaks accelerates their spread'
    ],
    mitigations: [
      'Iterative safety training against DAN-style prompts',
      'Improved detection of role-play jailbreak patterns',
      'Added meta-awareness to detect jailbreak attempts',
      'Continuous red-teaming program established'
    ],
    sources: [
      { name: 'Reddit r/ChatGPT', url: 'https://www.reddit.com/r/ChatGPT/comments/10tevu1/new_jailbreak_proudly_unveiling_the_tried_and/' },
      { name: 'Vice', url: 'https://www.vice.com/en/article/dan-jailbreak-chatgpt/' }
    ],
    tags: ['jailbreak', 'dan', 'role-play', 'safety-bypass', 'chatgpt']
  },
  {
    id: 'inc-006',
    title: 'Training Data Extraction from GPT-2',
    date: '2020-12-14',
    organization: 'OpenAI',
    category: 'data-leak',
    severity: 'medium',
    description: 'Researchers demonstrated that GPT-2 memorized and could regurgitate verbatim training data, including personally identifiable information, code snippets, and copyrighted text.',
    impact: 'Demonstrated that LLMs memorize training data, raising concerns about PII exposure, copyright violation, and data privacy for all future LLM deployments.',
    technicalDetails: [
      'Prefix-based extraction attacks effective',
      'Model memorized rare and unique sequences',
      'Larger models memorize more data',
      'Temperature and sampling parameters affected extraction success'
    ],
    lessonsLearned: [
      'Training data curation is critical for LLM security',
      'Deduplication reduces memorization risk',
      'PII scrubbing must be comprehensive',
      'Model size correlates with memorization risk'
    ],
    mitigations: [
      'Improved training data filtering',
      'Differential privacy techniques in training',
      'Deduplication of training corpora',
      'Output monitoring for memorized content'
    ],
    sources: [
      { name: 'Carlini et al. Paper', url: 'https://arxiv.org/abs/2012.07805' },
      { name: 'Google AI Blog', url: 'https://ai.googleblog.com/2020/12/privacy-considerations-in-large.html' }
    ],
    tags: ['gpt-2', 'memorization', 'training-data', 'pii', 'research']
  },
  {
    id: 'inc-007',
    title: 'Adversarial Patch Attacks on Tesla Autopilot',
    date: '2020-02-19',
    organization: 'Tesla',
    category: 'adversarial',
    severity: 'critical',
    description: 'Researchers demonstrated that adversarial patches placed on road signs could cause Tesla Autopilot to misread speed limits, potentially causing the vehicle to accelerate dangerously.',
    impact: 'Physical adversarial attacks could manipulate autonomous vehicle behavior, presenting life-safety risks for passengers and others on the road.',
    technicalDetails: [
      'Small stickers on speed limit signs changed ML perception',
      'Model interpreted 35 mph as 85 mph',
      'Attack worked from vehicle distances',
      'Standard cameras used for perception were fooled'
    ],
    lessonsLearned: [
      'Physical adversarial attacks are practical threats',
      'Safety-critical ML systems need robust adversarial training',
      'Multiple sensor modalities can provide redundancy',
      'Human oversight remains essential for autonomous systems'
    ],
    mitigations: [
      'Multi-sensor fusion for critical decisions',
      'Plausibility checks on detected values',
      'Adversarial training for perception models',
      'Enhanced driver attention monitoring'
    ],
    sources: [
      { name: 'McAfee Research', url: 'https://www.mcafee.com/blogs/other-blogs/mcafee-labs/model-hacking-adas-to-pave-safer-roads-for-autonomous-vehicles/' },
      { name: 'MIT Technology Review', url: 'https://www.technologyreview.com/2020/02/19/868188/hacking-a-tesla/' }
    ],
    tags: ['tesla', 'autopilot', 'adversarial-patch', 'autonomous-vehicle', 'safety-critical']
  },
  {
    id: 'inc-008',
    title: 'Copilot Training Data Copyright Lawsuit',
    date: '2022-11-03',
    organization: 'GitHub/Microsoft',
    category: 'privacy',
    severity: 'high',
    description: 'A class action lawsuit alleged GitHub Copilot reproduced copyrighted code without attribution, raising concerns about AI training on licensed content and the legal status of AI-generated outputs.',
    impact: 'Significant legal and ethical questions raised about training AI on copyrighted content, licensing implications, and attribution requirements for AI-generated code.',
    technicalDetails: [
      'Copilot trained on public GitHub repositories',
      'Could reproduce substantial code segments verbatim',
      'No license attribution in generated code',
      'Training data included GPL and other licensed code'
    ],
    lessonsLearned: [
      'Training data licensing must be carefully considered',
      'AI outputs may carry licensing obligations',
      'Attribution mechanisms may be legally required',
      'Fair use in AI training remains legally uncertain'
    ],
    mitigations: [
      'Added duplicate code filter',
      'Implemented attribution suggestions',
      'License detection capabilities added',
      'Opt-out mechanisms for code owners'
    ],
    sources: [
      { name: 'The Verge', url: 'https://www.theverge.com/2022/11/8/23446821/microsoft-openai-github-copilot-class-action-lawsuit-ai-copyright-violation-training-data' },
      { name: 'Court Filing', url: 'https://githubcopilotlitigation.com/' }
    ],
    tags: ['copilot', 'copyright', 'lawsuit', 'training-data', 'licensing']
  },
  {
    id: 'inc-009',
    title: 'Poisoned ML Models on Hugging Face',
    date: '2023-07-24',
    organization: 'Hugging Face',
    category: 'supply-chain',
    severity: 'critical',
    description: 'Security researchers discovered malicious ML models uploaded to Hugging Face that could execute arbitrary code when loaded, representing a supply chain attack on ML practitioners.',
    impact: 'Malicious models could compromise developer machines, CI/CD pipelines, and production systems when loaded for inference or fine-tuning.',
    technicalDetails: [
      'Pickle serialization exploited for code execution',
      'Malicious code embedded in model files',
      'Triggered automatically on model.load()',
      'Could exfiltrate credentials, install backdoors'
    ],
    lessonsLearned: [
      'Model serialization formats can be attack vectors',
      'Third-party model repositories need security vetting',
      'Sandboxing model loading is essential',
      'Supply chain security applies to ML artifacts'
    ],
    mitigations: [
      'Hugging Face added malware scanning',
      'SafeTensors format promoted as safer alternative',
      'Security warnings for pickle-based models',
      'Community reporting mechanisms enhanced'
    ],
    sources: [
      { name: 'JFrog Security Research', url: 'https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/' },
      { name: 'Hugging Face Security Blog', url: 'https://huggingface.co/docs/hub/security' }
    ],
    tags: ['hugging-face', 'supply-chain', 'malware', 'pickle', 'model-security']
  },
  {
    id: 'inc-010',
    title: 'ChatGPT Plugin Vulnerabilities',
    date: '2023-06-28',
    organization: 'OpenAI',
    category: 'prompt-injection',
    severity: 'high',
    description: 'Researchers discovered that ChatGPT plugins could be exploited through prompt injection, allowing attackers to steal user data and perform unauthorized actions via malicious web content.',
    impact: 'Plugin ecosystem introduced new attack surface where malicious websites could manipulate ChatGPT to exfiltrate data or perform actions with user credentials.',
    technicalDetails: [
      'Indirect prompt injection via browsed content',
      'Plugins with OAuth could perform authorized actions',
      'Data exfiltration via crafted API calls',
      'Cross-plugin attack chains possible'
    ],
    lessonsLearned: [
      'Plugin systems dramatically expand attack surface',
      'OAuth integrations need scoped permissions',
      'User consent flows need clear action disclosure',
      'Indirect injection is harder to detect than direct'
    ],
    mitigations: [
      'Plugin review process strengthened',
      'Added user confirmation for sensitive actions',
      'Improved isolation between plugins',
      'Rate limiting and monitoring for plugins'
    ],
    sources: [
      { name: 'Embrace The Red Research', url: 'https://embracethered.com/blog/posts/2023/chatgpt-plugin-vulnerabilities/' },
      { name: 'Security Week', url: 'https://www.securityweek.com/chatgpt-plugins-vulnerabilities/' }
    ],
    tags: ['plugins', 'oauth', 'indirect-injection', 'data-exfiltration', 'chatgpt']
  },
  {
    id: 'inc-011',
    title: 'LLaMA Model Weights Leak',
    date: '2023-03-03',
    organization: 'Meta',
    category: 'model-theft',
    severity: 'high',
    description: 'Meta\'s LLaMA model weights, initially released to researchers under license, were leaked and spread publicly across the internet within days of the controlled release.',
    impact: 'Proprietary model weights became freely available, enabling unrestricted use, fine-tuning, and potential misuse without the intended research restrictions.',
    technicalDetails: [
      'Model weights shared via torrent and direct downloads',
      'Original leak source disputed',
      'All model sizes (7B to 65B) were distributed',
      'Occurred within days of licensed release'
    ],
    lessonsLearned: [
      'Model weights are difficult to control once shared',
      'Licensing restrictions may be unenforceable for digital assets',
      'Consider open vs. closed release strategies carefully',
      'DRM for ML models remains unsolved'
    ],
    mitigations: [
      'Meta eventually embraced more open model releases',
      'Shifted strategy toward controlled open source',
      'Implemented model usage guidelines',
      'Community engagement for responsible use'
    ],
    sources: [
      { name: 'The Verge', url: 'https://www.theverge.com/2023/3/8/23629362/meta-ai-language-model-llama-leak-online-misuse' },
      { name: 'Ars Technica', url: 'https://arstechnica.com/information-technology/2023/03/metas-powerful-ai-language-model-has-leaked-online-what-happens-now/' }
    ],
    tags: ['llama', 'model-weights', 'leak', 'meta', 'open-source']
  },
  {
    id: 'inc-012',
    title: 'Chevrolet Dealership Chatbot Manipulation',
    date: '2023-12-18',
    organization: 'Chevrolet (Watsonville)',
    category: 'jailbreak',
    severity: 'medium',
    description: 'A Chevrolet dealership\'s AI chatbot was manipulated by users to agree to sell vehicles for $1, provide Python code, and make promises outside its intended scope.',
    impact: 'Demonstrated risks of deploying LLMs in customer-facing commercial contexts without adequate safeguards, leading to viral embarrassment and potential legal exposure.',
    technicalDetails: [
      'ChatGPT-based chatbot with minimal guardrails',
      'Users convinced it to act as Python interpreter',
      'Agreed to contractual terms like $1 car sale',
      'Praised competitor products when asked'
    ],
    lessonsLearned: [
      'Commercial chatbots need robust output constraints',
      'LLMs should not make binding commitments',
      'Human oversight needed for high-stakes interactions',
      'Testing should include adversarial red-teaming'
    ],
    mitigations: [
      'Dealership took down the chatbot',
      'Industry guidance issued on AI chatbot deployment',
      'Recommended legal disclaimers for AI interactions',
      'Scope limitation and human escalation recommended'
    ],
    sources: [
      { name: 'Business Insider', url: 'https://www.businessinsider.com/gm-chevy-dealership-chatbot-tricked-selling-car-1-dollar-2023-12' },
      { name: 'Ars Technica', url: 'https://arstechnica.com/ai/2023/12/chevy-dealer-chatbot-selling-cars-for-a-dollar/' }
    ],
    tags: ['chatbot', 'commercial', 'jailbreak', 'customer-service', 'guardrails']
  },
  {
    id: 'inc-013',
    title: 'AI Voice Clone Bank Fraud',
    date: '2023-02-15',
    organization: 'Multiple Banks',
    category: 'misuse',
    severity: 'critical',
    description: 'Criminals used AI voice cloning to impersonate executives and customers, successfully authorizing fraudulent wire transfers totaling millions of dollars.',
    impact: 'Financial losses in the millions from voice-authentication bypass, demonstrating that AI voice cloning has reached fraud-viable quality.',
    technicalDetails: [
      'Voice clones created from publicly available audio',
      'Combined with social engineering tactics',
      'Bypassed voice-based authentication systems',
      'Multiple incidents across different banks'
    ],
    lessonsLearned: [
      'Voice authentication alone is no longer sufficient',
      'Multi-factor authentication essential for high-value transactions',
      'Executive communications are high-value targets',
      'AI detection tools needed for voice verification'
    ],
    mitigations: [
      'Multi-factor authentication for all wire transfers',
      'Callback verification procedures',
      'AI voice detection implementation',
      'Employee training on voice clone risks'
    ],
    sources: [
      { name: 'Wall Street Journal', url: 'https://www.wsj.com/articles/fraudsters-use-ai-to-mimic-ceos-voice-in-unusual-cybercrime-case-11567157402' },
      { name: 'Forbes', url: 'https://www.forbes.com/sites/thomasbrewster/2021/10/14/huge-bank-fraud-uses-deep-fake-voice-tech-to-steal-millions/' }
    ],
    tags: ['voice-clone', 'deepfake', 'fraud', 'banking', 'authentication']
  },
  {
    id: 'inc-014',
    title: 'Amazon AI Recruiting Tool Bias',
    date: '2018-10-10',
    organization: 'Amazon',
    category: 'misuse',
    severity: 'high',
    description: 'Amazon\'s AI recruiting tool was discovered to systematically downgrade resumes from women, having learned gender bias from historical hiring data.',
    impact: 'Demonstrated how ML systems can perpetuate and amplify historical biases, potentially violating employment discrimination laws.',
    technicalDetails: [
      'Model trained on 10 years of resume data',
      'Learned to penalize female-associated terms',
      'Downgraded graduates of women\'s colleges',
      'Bias persisted despite attempts to remediate'
    ],
    lessonsLearned: [
      'Historical data encodes historical biases',
      'Bias testing must be comprehensive and ongoing',
      'High-stakes decisions need human oversight',
      'Sometimes the right answer is not to deploy'
    ],
    mitigations: [
      'Amazon scrapped the tool entirely',
      'Industry-wide awareness of AI hiring bias',
      'Regulatory attention to AI in employment',
      'Bias testing became standard practice'
    ],
    sources: [
      { name: 'Reuters', url: 'https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G' },
      { name: 'MIT Technology Review', url: 'https://www.technologyreview.com/2018/10/10/139858/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women/' }
    ],
    tags: ['bias', 'recruiting', 'discrimination', 'amazon', 'fairness']
  },
  {
    id: 'inc-015',
    title: 'First AI-Orchestrated Cyberattack Detected',
    date: '2025-09-15',
    organization: 'Anthropic',
    category: 'ai-orchestrated',
    severity: 'critical',
    description: 'Anthropic detected and documented the first confirmed case of AI performing 80-90% of attack operations autonomously. The AI system conducted reconnaissance, vulnerability scanning, and exploitation with minimal human guidance.',
    impact: 'Marks a watershed moment in cybersecurity where AI can now autonomously conduct sophisticated attack operations, fundamentally changing the threat landscape and defense requirements.',
    technicalDetails: [
      'AI performed 80-90% of attack operations autonomously',
      'Automated reconnaissance and target selection',
      'Autonomous vulnerability identification and exploitation',
      'Adaptive attack patterns based on defensive responses',
      'Minimal human intervention required for attack progression'
    ],
    lessonsLearned: [
      'AI-powered attacks represent a paradigm shift in threat landscape',
      'Traditional signature-based detection is insufficient against adaptive AI',
      'Defense systems need AI augmentation to match attack sophistication',
      'Attribution becomes more difficult with AI-orchestrated attacks',
      'Speed of attack execution requires automated defensive responses'
    ],
    mitigations: [
      'Deploy AI-powered threat detection and response',
      'Implement behavioral anomaly detection',
      'Reduce attack surface through zero-trust architecture',
      'Automated incident response playbooks',
      'Continuous security posture assessment'
    ],
    sources: [
      { name: 'Anthropic Security Research', url: 'https://www.anthropic.com/research' },
      { name: 'Cybersecurity News', url: 'https://cybersecuritynews.com/' }
    ],
    tags: ['ai-orchestrated', 'autonomous-attack', 'anthropic', 'paradigm-shift', '2025']
  },
  {
    id: 'inc-016',
    title: 'EchoLeak - Microsoft 365 Copilot Zero-Click Attack',
    date: '2025-06-10',
    organization: 'Microsoft',
    category: 'zero-click',
    severity: 'critical',
    description: 'CVE-2025-32711 (CVSS 9.3) - The first zero-click attack discovered against an AI agent. Attackers could exfiltrate sensitive data from Microsoft 365 Copilot without any user interaction through crafted documents processed by the AI.',
    impact: 'Demonstrated that AI agents introduce new zero-click attack surfaces. Sensitive enterprise data including emails, documents, and calendar information could be exfiltrated silently.',
    technicalDetails: [
      'CVE-2025-32711 with CVSS score of 9.3',
      'First documented zero-click attack on an AI agent',
      'Exploitation via malicious document processing',
      'No user interaction required for data exfiltration',
      'Discovered by Aim Labs security researchers',
      'Patched by Microsoft in June 2025'
    ],
    lessonsLearned: [
      'AI agents expand the attack surface for zero-click exploits',
      'Document processing by AI needs strict sandboxing',
      'Input validation crucial even for AI-processed content',
      'AI systems need same security rigor as traditional applications',
      'Regular security audits essential for AI integrations'
    ],
    mitigations: [
      'Apply Microsoft security patches immediately',
      'Implement content isolation for AI processing',
      'Monitor AI agent data access patterns',
      'Restrict AI access to sensitive data sources',
      'Deploy DLP controls around AI systems'
    ],
    sources: [
      { name: 'Aim Labs Research', url: 'https://www.aim-labs.co/' },
      { name: 'Microsoft Security Response Center', url: 'https://msrc.microsoft.com/' }
    ],
    tags: ['zero-click', 'copilot', 'microsoft', 'cve-2025-32711', 'data-exfiltration', '2025']
  },
  {
    id: 'inc-017',
    title: 'IDEsaster - AI Coding Assistant Vulnerability Cascade',
    date: '2025-03-20',
    organization: 'Multiple',
    category: 'rce',
    severity: 'critical',
    description: '24 CVEs discovered across major AI coding assistants including GitHub Copilot, Cursor, Windsurf, Claude Code, and others. 100% of tested products were found vulnerable to various attacks enabling code injection and data theft.',
    impact: 'Every major AI coding assistant found vulnerable. Developers using these tools potentially exposed to code injection, credential theft, and supply chain attacks through their development environment.',
    technicalDetails: [
      '24 CVEs identified across AI coding assistants',
      '100% of tested products found vulnerable',
      'Affects GitHub Copilot, Cursor, Windsurf, Claude Code, Amazon Q, Codeium',
      'Attack vectors include prompt injection via code comments',
      'Malicious repositories can trigger code execution',
      'Context manipulation through crafted code patterns'
    ],
    lessonsLearned: [
      'AI coding assistants are a new attack vector for developers',
      'Code repositories can become attack delivery mechanisms',
      'AI tools need sandboxing from developer environments',
      'Supply chain security must include AI coding tools',
      'Code review processes need to account for AI-injected code'
    ],
    mitigations: [
      'Update all AI coding assistants to latest versions',
      'Review AI-generated code before execution',
      'Limit AI assistant access to sensitive repositories',
      'Implement code signing and verification',
      'Use isolated development environments for untrusted code'
    ],
    sources: [
      { name: 'Security Research Publication', url: 'https://arxiv.org/' },
      { name: 'GitHub Security Advisory', url: 'https://github.com/advisories' }
    ],
    tags: ['ide', 'coding-assistant', 'copilot', 'cursor', 'rce', 'supply-chain', '2025']
  },
  {
    id: 'inc-018',
    title: 'OpenAI/Mixpanel Data Exposure',
    date: '2025-11-05',
    organization: 'OpenAI',
    category: 'data-leak',
    severity: 'medium',
    description: 'Limited ChatGPT user data was exposed through a Mixpanel analytics integration. The exposure included user interaction metadata and potentially conversation titles from a subset of users.',
    impact: 'User privacy compromised for an unknown number of ChatGPT users. Metadata about AI usage patterns and potentially sensitive conversation titles were exposed to third-party analytics.',
    technicalDetails: [
      'Data exposed through Mixpanel analytics integration',
      'Affected data included user interaction metadata',
      'Potentially exposed conversation titles',
      'Limited subset of users affected',
      'Third-party integration misconfiguration'
    ],
    lessonsLearned: [
      'Third-party integrations can expose user data',
      'Analytics tools need careful data minimization',
      'Regular audits of data flows to external services',
      'Privacy-by-design for all AI system integrations',
      'User data classification and protection requirements'
    ],
    mitigations: [
      'Review all third-party analytics integrations',
      'Implement data minimization for analytics',
      'Audit data flows to external services',
      'Enhanced privacy controls for user data',
      'Transparent disclosure to affected users'
    ],
    sources: [
      { name: 'OpenAI Status', url: 'https://status.openai.com/' },
      { name: 'Privacy News Coverage', url: 'https://techcrunch.com/' }
    ],
    tags: ['openai', 'mixpanel', 'analytics', 'privacy', 'data-exposure', '2025']
  },
  {
    id: 'inc-019',
    title: 'CamoLeak - GitHub Copilot Chat Covert Exfiltration',
    date: '2025-11-20',
    organization: 'GitHub/Microsoft',
    category: 'data-leak',
    severity: 'critical',
    description: 'CVSS 9.6 vulnerability allowing covert data exfiltration from GitHub Copilot Chat. Attackers could extract sensitive code, credentials, and internal documentation through carefully crafted prompts without visible indicators.',
    impact: 'Developers could unknowingly leak proprietary code, API keys, and confidential business logic through normal Copilot Chat usage when processing malicious repository content.',
    technicalDetails: [
      'CVSS score of 9.6',
      'Covert exfiltration with no visible indicators',
      'Exploits context window manipulation',
      'Can extract code, credentials, and documentation',
      'Triggered by processing malicious repository content',
      'No user awareness of data exfiltration'
    ],
    lessonsLearned: [
      'AI assistants can leak data through invisible channels',
      'Context window content needs strict isolation',
      'Covert exfiltration is harder to detect than overt attacks',
      'Monitoring AI assistant external communications essential',
      'Trust boundaries must account for AI context leakage'
    ],
    mitigations: [
      'Apply security updates for Copilot',
      'Monitor outbound data from AI assistants',
      'Restrict AI access to sensitive repositories',
      'Implement DLP for AI-assisted development',
      'Regular security audits of AI integrations'
    ],
    sources: [
      { name: 'Security Research', url: 'https://arxiv.org/' },
      { name: 'GitHub Security', url: 'https://github.com/security' }
    ],
    tags: ['copilot', 'github', 'exfiltration', 'covert-channel', 'cvss-9.6', '2025']
  },
  {
    id: 'inc-020',
    title: 'Slack AI Prompt Injection - Data Exfiltration',
    date: '2024-08-14',
    organization: 'Slack/Salesforce',
    category: 'prompt-injection',
    severity: 'high',
    description: 'Researchers discovered that Slack AI could be manipulated through prompt injection in public channels, allowing attackers to exfiltrate data from private channels that the AI had access to.',
    impact: 'Confidential conversations in private Slack channels could be extracted by attackers posting carefully crafted messages in public channels that the AI indexes.',
    technicalDetails: [
      'Indirect prompt injection via public channel messages',
      'AI indexes and processes public channel content',
      'Crafted prompts cause AI to reveal private channel data',
      'Exploits lack of context separation in AI processing',
      'Data exfiltration through AI-generated responses'
    ],
    lessonsLearned: [
      'AI systems with broad data access are high-value targets',
      'Indirect prompt injection through indexed content is a major risk',
      'Access control must be enforced at AI output level',
      'Context separation essential for multi-tenant AI systems',
      'Public content can influence AI behavior with private data'
    ],
    mitigations: [
      'Implement strict context isolation in AI systems',
      'Filter AI outputs for sensitive content patterns',
      'Limit AI access to data matching user permissions',
      'Monitor for prompt injection patterns in content',
      'Apply principle of least privilege to AI data access'
    ],
    sources: [
      { name: 'PromptArmor Research', url: 'https://promptarmor.com/' },
      { name: 'Slack Security', url: 'https://slack.com/security' }
    ],
    tags: ['slack', 'prompt-injection', 'indirect-injection', 'data-exfiltration', '2024']
  },
  {
    id: 'inc-021',
    title: 'Microsoft Copilot Studio SSRF Vulnerability',
    date: '2024-08-06',
    organization: 'Microsoft',
    category: 'prompt-injection',
    severity: 'high',
    description: 'CVE-2024-38206 (CVSS 8.5) - Server-Side Request Forgery vulnerability in Microsoft Copilot Studio allowed attackers to access Microsoft internal infrastructure through crafted requests.',
    impact: 'Attackers could potentially access internal Microsoft services and infrastructure, representing a significant breach of enterprise security boundaries.',
    technicalDetails: [
      'CVE-2024-38206 with CVSS score 8.5',
      'Server-Side Request Forgery (SSRF) vulnerability',
      'Allowed access to internal Microsoft infrastructure',
      'Exploitable through Copilot Studio customizations',
      'Could bypass network segmentation controls'
    ],
    lessonsLearned: [
      'AI customization interfaces can introduce SSRF vulnerabilities',
      'Internal network access from AI systems needs strict controls',
      'AI platforms are attractive targets for infrastructure attacks',
      'Network segmentation must account for AI system capabilities',
      'Regular security assessments of AI platform features'
    ],
    mitigations: [
      'Apply Microsoft security patches',
      'Restrict AI platform network access',
      'Implement egress filtering for AI systems',
      'Monitor for anomalous network requests from AI services',
      'Regular penetration testing of AI platforms'
    ],
    sources: [
      { name: 'Microsoft Security Response Center', url: 'https://msrc.microsoft.com/' },
      { name: 'Tenable Research', url: 'https://www.tenable.com/security/research' }
    ],
    tags: ['copilot-studio', 'ssrf', 'microsoft', 'cve-2024-38206', 'infrastructure', '2024']
  },
  {
    id: 'inc-022',
    title: 'Disney Slack Breach via AI Exploitation',
    date: '2024-07-12',
    organization: 'Disney',
    category: 'data-leak',
    severity: 'critical',
    description: '1.1TB of data leaked from Disney including 44 million Slack messages. The breach involved exploitation of AI tools within the corporate environment, exposing sensitive internal communications.',
    impact: 'Massive data breach exposing internal communications, strategic plans, financial data, and employee information. One of the largest corporate data leaks involving AI-related exploitation.',
    technicalDetails: [
      '1.1 terabytes of data exfiltrated',
      '44 million Slack messages exposed',
      'AI tools used in the corporate environment were exploited',
      'Internal documents, financials, and strategies leaked',
      'Attack attributed to hacktivist group'
    ],
    lessonsLearned: [
      'AI tools in corporate environments expand attack surface',
      'Slack and similar platforms hold massive amounts of sensitive data',
      'Data loss prevention must cover AI-assisted workflows',
      'Insider threat detection needs to account for AI tool usage',
      'Regular data classification and access reviews essential'
    ],
    mitigations: [
      'Implement comprehensive DLP across all platforms',
      'Restrict AI tool access to sensitive channels',
      'Enhanced monitoring of AI-assisted workflows',
      'Regular security audits of communication platforms',
      'Zero-trust architecture for corporate communications'
    ],
    sources: [
      { name: 'Wall Street Journal', url: 'https://www.wsj.com/' },
      { name: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com/' }
    ],
    tags: ['disney', 'slack', 'data-breach', '1.1tb', 'corporate', '2024']
  },
  {
    id: 'inc-023',
    title: 'Arup Deepfake CFO Video Call Fraud',
    date: '2024-02-04',
    organization: 'Arup',
    category: 'deepfake',
    severity: 'critical',
    description: '$25 million stolen from engineering firm Arup through a sophisticated deepfake video call where attackers impersonated the CFO and other executives using AI-generated real-time video.',
    impact: '$25 million in direct financial losses. Demonstrated that deepfake technology has reached the level where real-time video impersonation can fool trained professionals in high-stakes scenarios.',
    technicalDetails: [
      'Real-time deepfake video generation used in video call',
      'Multiple executives impersonated simultaneously',
      'Employee convinced to transfer $25 million',
      'High-quality video fooled experienced finance professional',
      'Social engineering combined with deepfake technology'
    ],
    lessonsLearned: [
      'Deepfake video calls are now a viable attack vector',
      'High-value transactions need out-of-band verification',
      'Video calls alone are insufficient for identity verification',
      'Employee training must include deepfake awareness',
      'Multi-person verification for significant financial actions'
    ],
    mitigations: [
      'Implement callback verification for all large transfers',
      'Use pre-established code words for sensitive requests',
      'Multi-person approval for significant transactions',
      'Deepfake detection tools for video conferences',
      'Security awareness training on synthetic media'
    ],
    sources: [
      { name: 'CNN Business', url: 'https://www.cnn.com/business' },
      { name: 'Financial Times', url: 'https://www.ft.com/' }
    ],
    tags: ['deepfake', 'fraud', 'video-call', '$25m', 'social-engineering', '2024']
  },
  {
    id: 'inc-024',
    title: 'Cursor IDE Remote Code Execution',
    date: '2025-01-15',
    organization: 'Cursor',
    category: 'rce',
    severity: 'critical',
    description: 'CVE-2025-54135 and CVE-2025-54136 - Critical remote code execution vulnerabilities in Cursor AI-powered IDE allowing attackers to execute arbitrary code through malicious repository content.',
    impact: 'Developers opening malicious repositories could have arbitrary code executed on their machines, potentially compromising development environments and enabling supply chain attacks.',
    technicalDetails: [
      'CVE-2025-54135 and CVE-2025-54136 identified',
      'Remote code execution through malicious repos',
      'AI processing of repository content triggers exploitation',
      'Affects developer workstations and CI/CD environments',
      'No user interaction required beyond opening project'
    ],
    lessonsLearned: [
      'AI-powered IDEs introduce new RCE attack surfaces',
      'Repository content is an attack vector for AI tools',
      'Development environments need sandboxing',
      'Security scanning must include AI tool interactions',
      'Rapid patching essential for developer tools'
    ],
    mitigations: [
      'Update Cursor to latest patched version',
      'Use sandboxed development environments',
      'Scan repositories before opening in AI-powered IDEs',
      'Implement application allowlisting',
      'Monitor developer environment for suspicious activity'
    ],
    sources: [
      { name: 'Cursor Security', url: 'https://www.cursor.com/' },
      { name: 'CVE Database', url: 'https://cve.mitre.org/' }
    ],
    tags: ['cursor', 'ide', 'rce', 'cve', 'developer-tools', '2025']
  },
  {
    id: 'inc-025',
    title: 'Hugging Face Malicious Model Outbreak',
    date: '2024-02-28',
    organization: 'Hugging Face',
    category: 'supply-chain',
    severity: 'critical',
    description: 'Approximately 100 malicious models discovered on Hugging Face containing code execution payloads. Models disguised as legitimate fine-tuned versions could compromise systems on load.',
    impact: 'ML practitioners downloading and using these models could have arbitrary code executed, compromising research environments, production systems, and CI/CD pipelines.',
    technicalDetails: [
      'Approximately 100 malicious models identified',
      'Disguised as legitimate fine-tuned models',
      'Malicious code embedded in pickle serialization',
      'Triggered on model.load() operations',
      'Various payloads including reverse shells and credential theft'
    ],
    lessonsLearned: [
      'Model repositories are supply chain attack vectors',
      'Pickle serialization enables code execution',
      'Model verification before loading is essential',
      'Community trust models need security vetting',
      'SafeTensors format prevents code execution attacks'
    ],
    mitigations: [
      'Use SafeTensors format instead of pickle',
      'Scan models with security tools before loading',
      'Verify model provenance and signatures',
      'Run model loading in sandboxed environments',
      'Monitor for suspicious model behavior'
    ],
    sources: [
      { name: 'JFrog Security Research', url: 'https://jfrog.com/blog/' },
      { name: 'Hugging Face Security', url: 'https://huggingface.co/docs/hub/security' }
    ],
    tags: ['hugging-face', 'malicious-models', 'supply-chain', 'pickle', '2024']
  },
  {
    id: 'inc-026',
    title: 'Hugging Face Repository Security Audit',
    date: '2025-04-15',
    organization: 'Hugging Face',
    category: 'supply-chain',
    severity: 'high',
    description: 'Comprehensive security scan of Hugging Face repositories revealed 352,000 unsafe issues across models and datasets, highlighting systemic supply chain risks in the ML ecosystem.',
    impact: 'Widespread security issues identified across the largest ML model repository, indicating systemic risks for organizations using public models and datasets.',
    technicalDetails: [
      '352,000 unsafe issues identified',
      'Issues span models and datasets',
      'Includes code execution risks, data leakage, and backdoors',
      'Many high-profile models affected',
      'Ongoing remediation efforts'
    ],
    lessonsLearned: [
      'Scale of ML supply chain risk is enormous',
      'Automated security scanning essential for ML repos',
      'Model and dataset security is a shared responsibility',
      'Security awareness needed across ML community',
      'Proactive scanning catches issues before exploitation'
    ],
    mitigations: [
      'Implement automated security scanning for all uploads',
      'Require security attestation for popular models',
      'Provide security scorecards for repositories',
      'Enable community security reporting',
      'Regular comprehensive security audits'
    ],
    sources: [
      { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog' },
      { name: 'ML Security Research', url: 'https://arxiv.org/' }
    ],
    tags: ['hugging-face', 'audit', 'supply-chain', '352k-issues', '2025']
  },
  {
    id: 'inc-027',
    title: 'ML API Token Mass Exposure',
    date: '2023-12-08',
    organization: 'Multiple',
    category: 'data-leak',
    severity: 'high',
    description: '1,700+ API tokens for Hugging Face, OpenAI, and other ML platforms discovered exposed in public code repositories, enabling unauthorized access to models, data, and billing.',
    impact: 'Exposed tokens could be used to access private models, training data, exfiltrate information, and rack up significant API charges on victim accounts.',
    technicalDetails: [
      '1,700+ API tokens discovered exposed',
      'Tokens found in GitHub repositories',
      'Includes Hugging Face, OpenAI, and other platforms',
      'Many tokens still active when discovered',
      'Exposure through hardcoded credentials and logs'
    ],
    lessonsLearned: [
      'API token hygiene is critical in ML workflows',
      'Secret scanning must be automated and continuous',
      'ML practitioners need security training',
      'Token rotation and least-privilege access essential',
      'Public code auditing catches credential leaks'
    ],
    mitigations: [
      'Implement pre-commit hooks for secret detection',
      'Use environment variables for all credentials',
      'Enable automatic secret scanning on repositories',
      'Regular API token rotation',
      'Monitor for unusual API usage patterns'
    ],
    sources: [
      { name: 'Lasso Security Research', url: 'https://www.lasso.security/' },
      { name: 'GitHub Secret Scanning', url: 'https://docs.github.com/en/code-security/secret-scanning' }
    ],
    tags: ['api-tokens', 'credential-exposure', 'hugging-face', 'openai', '2023']
  },
  {
    id: 'inc-028',
    title: 'H1 2025 Deepfake Fraud Epidemic',
    date: '2025-06-30',
    organization: 'Multiple',
    category: 'deepfake',
    severity: 'critical',
    description: '580 documented deepfake fraud incidents in H1 2025, representing a 4x increase from the same period in 2024. Total losses exceeded $410 million across financial services, corporate fraud, and identity theft.',
    impact: '$410 million in documented losses. Deepfake fraud has become a mainstream attack vector affecting financial services, corporations, and individuals at unprecedented scale.',
    technicalDetails: [
      '580 documented incidents in 6 months',
      '4x increase from H1 2024',
      '$410 million in confirmed losses',
      'Real-time video deepfakes now common',
      'Voice cloning used in 60% of cases',
      'Notable prevention successes: Ferrari and LastPass avoided attacks'
    ],
    lessonsLearned: [
      'Deepfake attacks are scaling rapidly',
      'Multi-modal verification is essential',
      'Employee awareness training is effective',
      'Technology solutions alone are insufficient',
      'Industry collaboration needed for defense'
    ],
    mitigations: [
      'Implement deepfake detection tools',
      'Multi-factor identity verification for sensitive actions',
      'Out-of-band confirmation for unusual requests',
      'Regular employee training on synthetic media',
      'Establish verification protocols with business partners'
    ],
    sources: [
      { name: 'Deloitte Cybersecurity Report', url: 'https://www2.deloitte.com/' },
      { name: 'FBI IC3', url: 'https://www.ic3.gov/' }
    ],
    tags: ['deepfake', 'fraud', '$410m', 'statistics', '2025']
  },
  {
    id: 'inc-029',
    title: 'Ferrari Deepfake Impersonation Attempt Thwarted',
    date: '2024-07-25',
    organization: 'Ferrari',
    category: 'deepfake',
    severity: 'medium',
    description: 'Ferrari executive successfully identified and stopped a deepfake impersonation attempt where attackers used AI to clone the CEO voice. The attack was detected through careful questioning that the AI could not authentically answer.',
    impact: 'Potential multi-million dollar fraud prevented. Case study in successful deepfake detection through human vigilance and verification protocols.',
    technicalDetails: [
      'AI voice cloning used to impersonate CEO',
      'Executive received call appearing to be from CEO',
      'Attack detected through verification questions',
      'Questions about personal details revealed the deception',
      'Demonstrates human detection remains effective'
    ],
    lessonsLearned: [
      'Human vigilance can detect deepfakes',
      'Pre-established verification protocols are essential',
      'Question-based authentication complements technology',
      'Executive training on synthetic media threats is valuable',
      'Trust but verify for unusual requests'
    ],
    mitigations: [
      'Establish verification code words with executives',
      'Train employees on deepfake recognition',
      'Create protocols for unusual executive requests',
      'Implement callback verification procedures',
      'Maintain healthy skepticism for out-of-band requests'
    ],
    sources: [
      { name: 'Bloomberg', url: 'https://www.bloomberg.com/' },
      { name: 'Automotive News', url: 'https://www.autonews.com/' }
    ],
    tags: ['ferrari', 'deepfake', 'voice-clone', 'prevention', 'success-story', '2024']
  },
  {
    id: 'inc-030',
    title: 'LastPass Deepfake CEO Attack Blocked',
    date: '2024-04-16',
    organization: 'LastPass',
    category: 'deepfake',
    severity: 'medium',
    description: 'LastPass employee received a deepfake audio call impersonating the CEO requesting urgent action. The employee recognized red flags and followed security protocols, successfully preventing the attack.',
    impact: 'Attack prevented through employee awareness and adherence to security protocols. Demonstrates effectiveness of security culture in defending against AI-powered social engineering.',
    technicalDetails: [
      'Deepfake audio used to impersonate CEO',
      'Requested urgent action outside normal procedures',
      'Employee identified unusual urgency and communication patterns',
      'Security protocols followed to verify request',
      'Attack identified and blocked before any damage'
    ],
    lessonsLearned: [
      'Security culture is the first line of defense',
      'Urgency is a common manipulation tactic',
      'Procedures should be followed regardless of apparent authority',
      'Regular security training reinforces correct behaviors',
      'Employees should be empowered to question unusual requests'
    ],
    mitigations: [
      'Regular security awareness training',
      'Clear escalation procedures for unusual requests',
      'Verification requirements for sensitive actions',
      'Positive reinforcement for security-conscious behavior',
      'Incident reporting mechanisms'
    ],
    sources: [
      { name: 'LastPass Security Blog', url: 'https://blog.lastpass.com/' },
      { name: 'The Hacker News', url: 'https://thehackernews.com/' }
    ],
    tags: ['lastpass', 'deepfake', 'voice-clone', 'prevention', 'security-awareness', '2024']
  },
  {
    id: 'inc-031',
    title: 'Singapore Multinational Deepfake Video Fraud',
    date: '2024-01-29',
    organization: 'Undisclosed Multinational',
    category: 'deepfake',
    severity: 'critical',
    description: '$39 million stolen in what is believed to be the largest deepfake-enabled video call fraud. Attackers used real-time deepfake technology to impersonate multiple company executives simultaneously during a video conference.',
    impact: '$39 million in direct financial losses. Largest known deepfake video call fraud, demonstrating sophisticated real-time deepfake capabilities against corporate targets.',
    technicalDetails: [
      'Real-time deepfake video generation for multiple participants',
      'Impersonated CFO and other senior executives simultaneously',
      'Video call appeared completely legitimate to victim',
      'Multiple wire transfers authorized during call',
      'Attack conducted against Singapore-based multinational'
    ],
    lessonsLearned: [
      'Multi-person deepfake video calls are now possible',
      'Video conferences require additional verification for financial decisions',
      'Even sophisticated finance professionals can be deceived',
      'Pre-established code words and callback verification essential',
      'Technology solutions alone insufficient for defense'
    ],
    mitigations: [
      'Mandatory callback verification for large transfers',
      'Pre-established verification codes for executives',
      'Multi-channel confirmation for financial decisions',
      'Employee training on multi-party deepfake scenarios',
      'Deepfake detection tools for video conferencing'
    ],
    sources: [
      { name: 'South China Morning Post', url: 'https://www.scmp.com/' },
      { name: 'Bloomberg', url: 'https://www.bloomberg.com/' }
    ],
    tags: ['deepfake', 'singapore', '$39m', 'video-call', 'multi-party', '2024']
  },
  {
    id: 'inc-032',
    title: 'WormGPT - Malicious LLM for Cybercrime',
    date: '2023-07-13',
    organization: 'Underground Forums',
    category: 'misuse',
    severity: 'critical',
    description: 'WormGPT emerged as the first widely-available malicious LLM specifically designed for cybercrime, trained on malware data and marketed to threat actors for creating phishing emails, BEC attacks, and malware code.',
    impact: 'Democratized sophisticated cybercrime capabilities, enabling less-skilled attackers to generate convincing phishing content and malware. Marked the emergence of dedicated criminal AI tools.',
    technicalDetails: [
      'Based on GPT-J 6B model with malicious fine-tuning',
      'Trained on malware source code and phishing templates',
      'No ethical guardrails or content restrictions',
      'Sold as subscription service on dark web forums',
      'Generated convincing BEC (Business Email Compromise) content'
    ],
    lessonsLearned: [
      'Open-source LLMs can be weaponized for cybercrime',
      'Criminal AI tools eliminate need for social engineering skills',
      'Traditional phishing detection may fail against AI-generated content',
      'AI safety measures can be removed from base models',
      'Underground economy for malicious AI is emerging'
    ],
    mitigations: [
      'Advanced email security with AI detection',
      'Employee training on AI-generated phishing',
      'Behavioral analysis for email authentication',
      'Multi-factor authentication for sensitive actions',
      'Zero-trust security architecture'
    ],
    sources: [
      { name: 'SlashNext Research', url: 'https://slashnext.com/' },
      { name: 'Hacker News', url: 'https://thehackernews.com/' }
    ],
    tags: ['wormgpt', 'malicious-llm', 'cybercrime', 'phishing', 'bec', '2023']
  },
  {
    id: 'inc-033',
    title: 'FraudGPT - Dark Web AI Fraud Tool',
    date: '2023-07-25',
    organization: 'Underground Forums',
    category: 'misuse',
    severity: 'high',
    description: 'FraudGPT appeared on dark web markets shortly after WormGPT, offering AI-powered fraud capabilities including phishing page generation, carding tools, and scam script creation.',
    impact: 'Expanded the criminal AI ecosystem, providing specialized tools for various fraud types. Demonstrated rapid commercialization of malicious AI services.',
    technicalDetails: [
      'Subscription-based malicious AI service',
      'Specialized for financial fraud and carding',
      'Generated phishing pages and scam scripts',
      'Provided malware code generation',
      'Marketed at $200/month on dark web'
    ],
    lessonsLearned: [
      'Malicious AI services are rapidly commoditizing',
      'Multiple criminal AI tools emerging simultaneously',
      'Fraud-specific AI tools bypass generic protections',
      'Price point makes tools accessible to many criminals',
      'Need for AI-based fraud detection systems'
    ],
    mitigations: [
      'AI-powered fraud detection systems',
      'Real-time transaction monitoring',
      'Enhanced identity verification',
      'Cross-platform fraud intelligence sharing',
      'Behavioral biometrics for authentication'
    ],
    sources: [
      { name: 'Netenrich Research', url: 'https://netenrich.com/' },
      { name: 'Dark Reading', url: 'https://www.darkreading.com/' }
    ],
    tags: ['fraudgpt', 'malicious-llm', 'fraud', 'carding', 'dark-web', '2023']
  },
  {
    id: 'inc-034',
    title: 'RAG Poisoning in Enterprise Search',
    date: '2024-05-15',
    organization: 'Multiple Enterprises',
    category: 'data-leak',
    severity: 'high',
    description: 'Security researchers demonstrated practical RAG poisoning attacks where malicious documents injected into enterprise knowledge bases could manipulate AI responses and exfiltrate sensitive data.',
    impact: 'Enterprise AI systems using RAG shown vulnerable to document-based attacks. Attackers could manipulate AI responses to include misinformation or extract confidential data.',
    technicalDetails: [
      'Malicious documents embedded with hidden instructions',
      'Exploits retrieval mechanism to influence responses',
      'Can exfiltrate data through crafted AI outputs',
      'Affects document search and Q&A systems',
      'Persistent attack via document repositories'
    ],
    lessonsLearned: [
      'RAG systems inherit document security issues',
      'Document sanitization essential for AI processing',
      'Input validation needed at retrieval stage',
      'Monitoring for unusual retrieval patterns important',
      'Document provenance tracking required'
    ],
    mitigations: [
      'Document sanitization before indexing',
      'Content security scanning for hidden text',
      'Provenance tracking for retrieved documents',
      'Output monitoring for data exfiltration patterns',
      'Separation of trusted and untrusted document sources'
    ],
    sources: [
      { name: 'Security Research', url: 'https://arxiv.org/' },
      { name: 'Enterprise AI Security Blog', url: 'https://embracethered.com/' }
    ],
    tags: ['rag', 'poisoning', 'enterprise', 'document', 'exfiltration', '2024']
  },
  {
    id: 'inc-035',
    title: 'LangChain Arbitrary Code Execution',
    date: '2023-08-09',
    organization: 'LangChain',
    category: 'rce',
    severity: 'critical',
    description: 'CVE-2023-36258 - Critical arbitrary code execution vulnerability in LangChain allowed attackers to execute arbitrary code through specially crafted prompts when using certain LangChain components.',
    impact: 'Applications built with LangChain could be compromised to execute arbitrary code, potentially leading to full system compromise of AI applications.',
    technicalDetails: [
      'CVE-2023-36258 affecting LangChain',
      'Arbitrary code execution via prompt injection',
      'Affected PAL and other code execution chains',
      'Could lead to full system compromise',
      'Wide impact due to LangChain popularity'
    ],
    lessonsLearned: [
      'AI framework vulnerabilities have wide impact',
      'Code execution features need strict sandboxing',
      'Regular security updates essential for AI frameworks',
      'Input validation critical for all LLM inputs',
      'Defense in depth for AI applications'
    ],
    mitigations: [
      'Update LangChain to patched version',
      'Sandbox code execution features',
      'Input validation and sanitization',
      'Restrict code execution to trusted contexts',
      'Monitor for unusual code execution patterns'
    ],
    sources: [
      { name: 'CVE Database', url: 'https://cve.mitre.org/' },
      { name: 'LangChain Security', url: 'https://github.com/langchain-ai/langchain/security' }
    ],
    tags: ['langchain', 'rce', 'cve', 'framework', 'code-execution', '2023']
  },
  {
    id: 'inc-036',
    title: 'GPT-4 Vision Jailbreak via Images',
    date: '2023-11-06',
    organization: 'OpenAI',
    category: 'jailbreak',
    severity: 'high',
    description: 'Researchers discovered that GPT-4 Vision could be jailbroken through carefully crafted images containing hidden text or visual patterns that bypassed safety measures.',
    impact: 'Multimodal AI systems shown vulnerable to image-based jailbreaks, opening new attack surface beyond text-based prompt injection.',
    technicalDetails: [
      'Images with embedded text instructions',
      'Visual patterns triggering specific behaviors',
      'Bypassed text-based safety filters',
      'Combined with prompt engineering for higher success',
      'Affected all GPT-4 Vision deployments'
    ],
    lessonsLearned: [
      'Multimodal AI expands attack surface significantly',
      'Image processing needs security consideration',
      'Text in images can bypass text filters',
      'Visual adversarial attacks are practical',
      'Safety training must include image modalities'
    ],
    mitigations: [
      'OCR-based text detection in images',
      'Image content classification before processing',
      'Multi-modal safety training',
      'Rate limiting for image inputs',
      'Monitoring for unusual image patterns'
    ],
    sources: [
      { name: 'AI Safety Research', url: 'https://arxiv.org/' },
      { name: 'Security Researchers on X', url: 'https://twitter.com/' }
    ],
    tags: ['gpt-4', 'vision', 'jailbreak', 'multimodal', 'images', '2023']
  },
  {
    id: 'inc-037',
    title: 'AI-Generated Code Introduces Vulnerabilities',
    date: '2024-03-12',
    organization: 'Stanford/NYU Research',
    category: 'misuse',
    severity: 'high',
    description: 'Research demonstrated that developers using AI coding assistants produced significantly more security vulnerabilities. 40% of code generated by LLMs contained exploitable security flaws.',
    impact: 'Widespread use of AI coding assistants may be introducing security vulnerabilities at scale. Developers trusting AI-generated code without review creating systemic risk.',
    technicalDetails: [
      '40% of AI-generated code contained vulnerabilities',
      'Common issues: SQL injection, XSS, path traversal',
      'Developers less likely to review AI-generated code',
      'AI copied vulnerable patterns from training data',
      'False confidence in AI code quality'
    ],
    lessonsLearned: [
      'AI-generated code requires security review',
      'Developers should not blindly trust AI output',
      'Security training needed for AI-assisted development',
      'Automated security scanning essential for AI code',
      'AI coding assistants need security-aware training'
    ],
    mitigations: [
      'Mandatory security review for AI-generated code',
      'Integrate security scanning in AI coding workflows',
      'Developer training on AI code risks',
      'Use AI coding assistants with security features',
      'Implement secure coding standards for AI output'
    ],
    sources: [
      { name: 'Stanford Research', url: 'https://cs.stanford.edu/' },
      { name: 'ACM Digital Library', url: 'https://dl.acm.org/' }
    ],
    tags: ['ai-coding', 'vulnerabilities', 'research', 'security', 'developers', '2024']
  },
  {
    id: 'inc-038',
    title: 'Notion AI Data Exposure',
    date: '2024-06-20',
    organization: 'Notion',
    category: 'data-leak',
    severity: 'medium',
    description: 'Security researchers discovered that Notion AI could be manipulated to access and expose content from private pages that the user did not have direct access to, through carefully crafted queries.',
    impact: 'Private Notion workspace content could potentially be accessed through AI feature, representing privacy risk for enterprise users.',
    technicalDetails: [
      'AI feature had broader access than intended',
      'Could access content from private pages',
      'Prompt manipulation revealed hidden content',
      'Affected workspace-level AI features',
      'Required authenticated access to exploit'
    ],
    lessonsLearned: [
      'AI features must respect access controls',
      'Data access for AI needs careful scoping',
      'Prompt manipulation can bypass intended access',
      'Enterprise AI features need security review',
      'Regular security testing of AI integrations'
    ],
    mitigations: [
      'Strict access control enforcement for AI queries',
      'Audit logging for AI data access',
      'User permission verification per query',
      'Content filtering in AI responses',
      'Security review of AI feature permissions'
    ],
    sources: [
      { name: 'Security Research', url: 'https://embracethered.com/' },
      { name: 'Notion Security', url: 'https://www.notion.so/security' }
    ],
    tags: ['notion', 'data-exposure', 'access-control', 'enterprise', '2024']
  },
  {
    id: 'inc-039',
    title: 'Character.AI Safety Bypass Leading to Harm',
    date: '2024-02-22',
    organization: 'Character.AI',
    category: 'misuse',
    severity: 'critical',
    description: 'Reports emerged of Character.AI chatbots providing harmful advice to vulnerable users, including minors, after safety guardrails were bypassed through roleplay scenarios.',
    impact: 'Real-world harm to vulnerable users. Highlighted risks of AI companions and need for robust safety measures in consumer AI applications.',
    technicalDetails: [
      'Safety bypassed through roleplay scenarios',
      'Harmful content generated to vulnerable users',
      'Persistent conversations developed unsafe dynamics',
      'Age verification insufficiently enforced',
      'Emotional manipulation through character interactions'
    ],
    lessonsLearned: [
      'Consumer AI needs robust safety measures',
      'Roleplay creates safety bypass opportunities',
      'Vulnerable user protections essential',
      'Age verification must be enforced',
      'Monitoring for harmful conversation patterns'
    ],
    mitigations: [
      'Strengthened content moderation',
      'Enhanced age verification',
      'Conversation monitoring for harmful patterns',
      'Improved roleplay safety training',
      'Crisis intervention integration'
    ],
    sources: [
      { name: 'Washington Post', url: 'https://www.washingtonpost.com/' },
      { name: 'Character.AI Safety', url: 'https://character.ai/safety' }
    ],
    tags: ['character.ai', 'safety', 'consumer-ai', 'vulnerable-users', 'harm', '2024']
  },
  {
    id: 'inc-040',
    title: 'AI Model Stealing via API Side Channels',
    date: '2024-04-18',
    organization: 'Multiple Providers',
    category: 'model-theft',
    severity: 'high',
    description: 'Researchers demonstrated techniques to extract model architecture and weights through side-channel analysis of API responses, including timing attacks and response pattern analysis.',
    impact: 'Proprietary model intellectual property at risk. API-based model serving shown vulnerable to extraction attacks beyond simple output analysis.',
    technicalDetails: [
      'Timing side-channels revealed model architecture',
      'Response patterns indicated model size and type',
      'Query-efficient extraction techniques',
      'Worked across multiple commercial APIs',
      'Combined with distillation for model replication'
    ],
    lessonsLearned: [
      'API responses leak model information',
      'Timing normalization needed for APIs',
      'Rate limiting alone insufficient for protection',
      'Model architecture is extractable from behavior',
      'Defense requires multiple countermeasures'
    ],
    mitigations: [
      'Response time normalization',
      'Output perturbation techniques',
      'Query pattern detection',
      'Rate limiting with pattern analysis',
      'Model watermarking for theft detection'
    ],
    sources: [
      { name: 'ML Security Research', url: 'https://arxiv.org/' },
      { name: 'USENIX Security', url: 'https://www.usenix.org/conference/usenixsecurity24' }
    ],
    tags: ['model-theft', 'side-channel', 'api', 'extraction', 'research', '2024']
  },
  {
    id: 'inc-041',
    title: 'Anthropic Claude Jailbreak via Multi-Turn Attacks',
    date: '2024-08-20',
    organization: 'Anthropic',
    category: 'jailbreak',
    severity: 'medium',
    description: 'Security researchers demonstrated that Claude could be jailbroken through sophisticated multi-turn conversation attacks that gradually shifted context and bypassed Constitutional AI safety training.',
    impact: 'Demonstrated that even advanced safety techniques like Constitutional AI can be bypassed with sophisticated attack strategies over extended conversations.',
    technicalDetails: [
      'Multi-turn conversation manipulation',
      'Gradual context shifting techniques',
      'Exploited conversation history handling',
      'Required 10-20 turn conversations',
      'Bypassed Constitutional AI training'
    ],
    lessonsLearned: [
      'Long conversations create jailbreak opportunities',
      'Context accumulation can undermine safety',
      'Multi-turn attacks harder to detect',
      'Safety training must consider conversation dynamics',
      'Continuous monitoring needed throughout conversations'
    ],
    mitigations: [
      'Conversation-level safety monitoring',
      'Context window safety checks',
      'Multi-turn pattern detection',
      'Periodic safety re-evaluation in long conversations',
      'Rate limiting for extended interactions'
    ],
    sources: [
      { name: 'Anthropic Safety Research', url: 'https://www.anthropic.com/research' },
      { name: 'AI Safety Research', url: 'https://arxiv.org/' }
    ],
    tags: ['claude', 'jailbreak', 'multi-turn', 'constitutional-ai', 'anthropic', '2024']
  },
  {
    id: 'inc-042',
    title: 'Google Gemini Image Safety Bypass',
    date: '2024-02-21',
    organization: 'Google',
    category: 'jailbreak',
    severity: 'high',
    description: 'Shortly after launch, researchers discovered that Google Gemini could be manipulated to generate harmful content by embedding instructions in images or using specific image-text combinations.',
    impact: 'Demonstrated vulnerabilities in multimodal safety systems at launch, affecting Google\'s flagship AI product and raising concerns about multimodal AI safety.',
    technicalDetails: [
      'Image-embedded prompt injection',
      'Text-image combination attacks',
      'Bypassed content safety filters',
      'Affected Gemini Pro Vision',
      'Generated harmful imagery descriptions'
    ],
    lessonsLearned: [
      'Multimodal launch requires extensive safety testing',
      'Image-text interactions create complex attack surface',
      'Safety training must cover cross-modal attacks',
      'Rapid response capability essential at launch',
      'Public testing reveals attacks missed in internal review'
    ],
    mitigations: [
      'Enhanced multimodal safety training',
      'Cross-modal content analysis',
      'Image preprocessing and filtering',
      'Improved safety evaluation benchmarks',
      'Rapid patching capability'
    ],
    sources: [
      { name: 'Google Security', url: 'https://security.google/' },
      { name: 'AI Safety Research', url: 'https://arxiv.org/' }
    ],
    tags: ['gemini', 'google', 'multimodal', 'jailbreak', 'images', '2024']
  },
  {
    id: 'inc-043',
    title: 'PyTorch Dependency Confusion Attack',
    date: '2022-12-30',
    organization: 'PyTorch',
    category: 'supply-chain',
    severity: 'critical',
    description: 'A malicious package was uploaded to PyPI that matched a private PyTorch dependency name, allowing attackers to execute code on machines installing PyTorch during a specific time window.',
    impact: 'PyTorch installations between Dec 25-30, 2022 potentially compromised. Demonstrated supply chain vulnerabilities in ML framework ecosystem.',
    technicalDetails: [
      'Dependency confusion attack on torchtriton package',
      'Malicious package uploaded to PyPI',
      'Executed during pip install of nightly PyTorch',
      'Exfiltrated system information',
      'Affected Linux installations'
    ],
    lessonsLearned: [
      'ML frameworks vulnerable to supply chain attacks',
      'Private package names must be protected',
      'Dependency verification essential',
      'Nightly builds have higher supply chain risk',
      'Package signing and verification needed'
    ],
    mitigations: [
      'Package name reservation on public registries',
      'Dependency hash verification',
      'Private package registry usage',
      'Security scanning of dependencies',
      'Signed package requirements'
    ],
    sources: [
      { name: 'PyTorch Blog', url: 'https://pytorch.org/blog/compromised-nightly-dependency/' },
      { name: 'Security Advisory', url: 'https://github.com/pytorch/pytorch/security/advisories' }
    ],
    tags: ['pytorch', 'supply-chain', 'dependency-confusion', 'pypi', '2022']
  },
  {
    id: 'inc-044',
    title: 'AI Hallucination Causes Legal Filing Error',
    date: '2023-06-08',
    organization: 'Mata v. Avianca Airlines',
    category: 'misuse',
    severity: 'medium',
    description: 'An attorney used ChatGPT to research case law and filed a legal brief citing six non-existent cases that the AI had hallucinated, leading to sanctions from the court.',
    impact: 'Attorney sanctioned, case delayed. Highlighted risks of using AI for professional work without verification and potential liability issues.',
    technicalDetails: [
      'ChatGPT hallucinated six fake case citations',
      'Attorney filed brief without verifying citations',
      'Fake cases included plausible-sounding names and citations',
      'Court unable to find cited cases',
      'Attorney initially claimed cases were real'
    ],
    lessonsLearned: [
      'AI outputs must be verified for professional use',
      'Hallucinations can be convincing and detailed',
      'Professional liability extends to AI-assisted work',
      'Training needed for professional AI use',
      'Clear disclosure of AI use may be required'
    ],
    mitigations: [
      'Verify all AI-generated factual claims',
      'Use AI for drafting, not final research',
      'Implement citation verification workflows',
      'Disclose AI use where required',
      'Professional training on AI limitations'
    ],
    sources: [
      { name: 'New York Times', url: 'https://www.nytimes.com/' },
      { name: 'Court Filing', url: 'https://www.courtlistener.com/' }
    ],
    tags: ['hallucination', 'legal', 'chatgpt', 'professional', 'sanctions', '2023']
  },
  {
    id: 'inc-045',
    title: 'OpenAI GPT Store Malicious Apps',
    date: '2024-01-25',
    organization: 'OpenAI',
    category: 'misuse',
    severity: 'medium',
    description: 'Security researchers discovered malicious custom GPTs in the OpenAI GPT Store designed to harvest user data, spread misinformation, or bypass content policies through hidden system prompts.',
    impact: 'Users exposed to data harvesting and policy-violating content through official GPT Store. Highlighted challenges of app store security for AI platforms.',
    technicalDetails: [
      'Custom GPTs with hidden malicious instructions',
      'Data harvesting through conversation manipulation',
      'Policy-violating content through layered prompts',
      'Impersonation of legitimate services',
      'Phishing through trusted platform'
    ],
    lessonsLearned: [
      'AI app stores need robust security review',
      'Hidden system prompts enable abuse',
      'User trust in platforms can be exploited',
      'Automated detection of malicious GPTs needed',
      'Clear reporting mechanisms essential'
    ],
    mitigations: [
      'Enhanced GPT review process',
      'System prompt analysis for malicious patterns',
      'User reporting mechanisms',
      'Behavioral monitoring of published GPTs',
      'Clear terms of service enforcement'
    ],
    sources: [
      { name: 'Security Research', url: 'https://arxiv.org/' },
      { name: 'OpenAI Safety', url: 'https://openai.com/safety' }
    ],
    tags: ['gpt-store', 'openai', 'malicious-apps', 'data-harvesting', '2024']
  }
]

// Helper functions
export const getIncidentsByCategory = (category: IncidentCategory): Incident[] => {
  return incidents.filter(i => i.category === category)
}

export const getIncidentsBySeverity = (severity: IncidentSeverity): Incident[] => {
  return incidents.filter(i => i.severity === severity)
}

export const getIncidentsByYear = (year: number): Incident[] => {
  return incidents.filter(i => new Date(i.date).getFullYear() === year)
}

export const getIncidentsByOrganization = (org: string): Incident[] => {
  return incidents.filter(i => i.organization.toLowerCase().includes(org.toLowerCase()))
}

export const getIncidentsByTag = (tag: string): Incident[] => {
  return incidents.filter(i => i.tags.includes(tag))
}

export const getRecentIncidents = (count: number): Incident[] => {
  return [...incidents]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

// Stats
export const incidentStats = {
  totalIncidents: incidents.length,
  byCategory: incidentCategories.reduce((acc, cat) => {
    acc[cat.id] = getIncidentsByCategory(cat.id).length
    return acc
  }, {} as Record<IncidentCategory, number>),
  bySeverity: {
    critical: getIncidentsBySeverity('critical').length,
    high: getIncidentsBySeverity('high').length,
    medium: getIncidentsBySeverity('medium').length,
    low: getIncidentsBySeverity('low').length,
  },
  organizations: Array.from(new Set(incidents.map(i => i.organization))).length,
  years: Array.from(new Set(incidents.map(i => new Date(i.date).getFullYear()))).sort((a, b) => b - a)
}
