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
  organizations: [...new Set(incidents.map(i => i.organization))].length,
  years: [...new Set(incidents.map(i => new Date(i.date).getFullYear()))].sort((a, b) => b - a)
}
