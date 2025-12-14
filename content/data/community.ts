export type ResourceType =
  | 'discord'
  | 'slack'
  | 'forum'
  | 'newsletter'
  | 'podcast'
  | 'youtube'
  | 'blog'
  | 'twitter'
  | 'github'
  | 'conference'
  | 'meetup'
  | 'research-group'
  | 'ctf'
  | 'training'
  | 'reddit'
  | 'bootcamp'
  | 'professional-org'

export type ResourceFocus =
  | 'ai-security'
  | 'ml-security'
  | 'llm-security'
  | 'adversarial-ml'
  | 'red-teaming'
  | 'general-security'
  | 'research'
  | 'policy'

export interface CommunityResource {
  id: string
  name: string
  type: ResourceType
  focus: ResourceFocus[]
  description: string
  url: string
  memberCount?: string
  frequency?: string
  free: boolean
  highlights: string[]
  tags: string[]
}

export const resourceTypes: { id: ResourceType; label: string; icon: string }[] = [
  { id: 'discord', label: 'Discord', icon: 'MessageCircle' },
  { id: 'slack', label: 'Slack', icon: 'Hash' },
  { id: 'forum', label: 'Forum', icon: 'MessageSquare' },
  { id: 'newsletter', label: 'Newsletter', icon: 'Mail' },
  { id: 'podcast', label: 'Podcast', icon: 'Headphones' },
  { id: 'youtube', label: 'YouTube', icon: 'Youtube' },
  { id: 'blog', label: 'Blog', icon: 'FileText' },
  { id: 'twitter', label: 'Twitter/X', icon: 'Twitter' },
  { id: 'github', label: 'GitHub', icon: 'Github' },
  { id: 'conference', label: 'Conference', icon: 'Calendar' },
  { id: 'meetup', label: 'Meetup', icon: 'Users' },
  { id: 'research-group', label: 'Research Group', icon: 'Microscope' },
  { id: 'ctf', label: 'CTF', icon: 'Flag' },
  { id: 'training', label: 'Training', icon: 'GraduationCap' },
  { id: 'reddit', label: 'Reddit', icon: 'MessageSquare' },
  { id: 'bootcamp', label: 'Bootcamp', icon: 'BookOpen' },
  { id: 'professional-org', label: 'Professional Org', icon: 'Building' }
]

export const resourceFocuses: { id: ResourceFocus; label: string }[] = [
  { id: 'ai-security', label: 'AI Security' },
  { id: 'ml-security', label: 'ML Security' },
  { id: 'llm-security', label: 'LLM Security' },
  { id: 'adversarial-ml', label: 'Adversarial ML' },
  { id: 'red-teaming', label: 'Red Teaming' },
  { id: 'general-security', label: 'General Security' },
  { id: 'research', label: 'Research' },
  { id: 'policy', label: 'Policy & Governance' }
]

export const communityResources: CommunityResource[] = [
  // Discord Communities
  {
    id: 'comm-001',
    name: 'OWASP Slack',
    type: 'slack',
    focus: ['ai-security', 'general-security'],
    description: 'Official OWASP community Slack with dedicated channels for AI security, LLM security, and machine learning security discussions.',
    url: 'https://owasp.org/slack/invite',
    memberCount: '50,000+',
    free: true,
    highlights: [
      '#ml-security channel for AI/ML discussions',
      'Access to OWASP project contributors',
      'Chapter and project announcements',
      'Active vulnerability discussions'
    ],
    tags: ['owasp', 'official', 'active', 'global']
  },
  {
    id: 'comm-002',
    name: 'AI Village Discord',
    type: 'discord',
    focus: ['ai-security', 'adversarial-ml', 'red-teaming'],
    description: 'Community behind DEF CON AI Village, focused on AI security research, adversarial machine learning, and AI red teaming.',
    url: 'https://discord.gg/aivillage',
    memberCount: '10,000+',
    free: true,
    highlights: [
      'DEF CON AI Village community',
      'AI red team discussions',
      'Research paper discussions',
      'CTF announcements'
    ],
    tags: ['defcon', 'research', 'red-team', 'hacking']
  },
  {
    id: 'comm-003',
    name: 'MLSecOps Community',
    type: 'slack',
    focus: ['ml-security', 'ai-security'],
    description: 'Community focused on the intersection of machine learning and security operations, discussing secure ML pipelines and ML security automation.',
    url: 'https://mlsecops.com/community',
    memberCount: '5,000+',
    free: true,
    highlights: [
      'MLOps security best practices',
      'Tool recommendations',
      'Career discussions',
      'Vendor-neutral discussions'
    ],
    tags: ['mlops', 'devsecops', 'automation', 'pipelines']
  },
  {
    id: 'comm-004',
    name: 'Hugging Face Discord',
    type: 'discord',
    focus: ['ml-security', 'research'],
    description: 'Official Hugging Face community with channels for model security, safety research, and responsible AI development.',
    url: 'https://discord.gg/huggingface',
    memberCount: '100,000+',
    free: true,
    highlights: [
      'Direct access to HF team',
      'Model safety discussions',
      'Research collaboration',
      'Tool support'
    ],
    tags: ['huggingface', 'models', 'official', 'research']
  },

  // Newsletters
  {
    id: 'comm-005',
    name: 'AI Security Newsletter',
    type: 'newsletter',
    focus: ['ai-security', 'llm-security'],
    description: 'Weekly newsletter covering the latest AI security research, vulnerabilities, tools, and industry developments.',
    url: 'https://aisecurity.substack.com',
    frequency: 'Weekly',
    free: true,
    highlights: [
      'Curated research papers',
      'Tool releases and updates',
      'Industry incident coverage',
      'Career opportunities'
    ],
    tags: ['weekly', 'curated', 'news', 'research']
  },
  {
    id: 'comm-006',
    name: 'The AI Security Brief',
    type: 'newsletter',
    focus: ['ai-security', 'policy'],
    description: 'Monthly deep-dive newsletter on AI security policy, regulations, and enterprise security considerations.',
    url: 'https://aisecuritybrief.com',
    frequency: 'Monthly',
    free: true,
    highlights: [
      'Policy analysis',
      'Regulatory updates',
      'Enterprise case studies',
      'Expert interviews'
    ],
    tags: ['policy', 'enterprise', 'monthly', 'deep-dive']
  },
  {
    id: 'comm-007',
    name: 'TLDR AI',
    type: 'newsletter',
    focus: ['ai-security', 'research'],
    description: 'Daily newsletter covering AI news with regular security-related content and research highlights.',
    url: 'https://tldr.tech/ai',
    frequency: 'Daily',
    free: true,
    highlights: [
      'Daily AI news digest',
      'Research paper summaries',
      'Industry updates',
      'Tool announcements'
    ],
    tags: ['daily', 'news', 'research', 'comprehensive']
  },

  // Podcasts
  {
    id: 'comm-008',
    name: 'Adversarial Learning',
    type: 'podcast',
    focus: ['adversarial-ml', 'ai-security', 'research'],
    description: 'Podcast focused on adversarial machine learning, AI security research, and interviews with leading researchers.',
    url: 'https://adversariallearning.com',
    frequency: 'Bi-weekly',
    free: true,
    highlights: [
      'Research deep dives',
      'Expert interviews',
      'Paper discussions',
      'Industry perspectives'
    ],
    tags: ['research', 'interviews', 'technical', 'deep-dive']
  },
  {
    id: 'comm-009',
    name: 'Risky Business',
    type: 'podcast',
    focus: ['general-security', 'ai-security'],
    description: 'Premier security podcast that regularly covers AI security topics, enterprise security, and industry news.',
    url: 'https://risky.biz',
    frequency: 'Weekly',
    free: true,
    highlights: [
      'Industry news coverage',
      'Sponsor deep dives',
      'Expert analysis',
      'Weekly AI segment'
    ],
    tags: ['news', 'enterprise', 'weekly', 'comprehensive']
  },
  {
    id: 'comm-010',
    name: 'Practical AI',
    type: 'podcast',
    focus: ['ai-security', 'ml-security'],
    description: 'Podcast making AI practical and accessible, with regular episodes on AI safety and security considerations.',
    url: 'https://changelog.com/practicalai',
    frequency: 'Weekly',
    free: true,
    highlights: [
      'Practical applications',
      'Safety discussions',
      'Tool reviews',
      'Expert guests'
    ],
    tags: ['practical', 'accessible', 'weekly', 'applications']
  },

  // YouTube Channels
  {
    id: 'comm-011',
    name: 'AI Explained',
    type: 'youtube',
    focus: ['ai-security', 'research'],
    description: 'YouTube channel covering AI developments, including safety research, capability evaluations, and security considerations.',
    url: 'https://youtube.com/@aiexplained-official',
    free: true,
    highlights: [
      'Research explanations',
      'Capability analysis',
      'Safety discussions',
      'Weekly updates'
    ],
    tags: ['educational', 'research', 'analysis', 'weekly']
  },
  {
    id: 'comm-012',
    name: 'LiveOverflow',
    type: 'youtube',
    focus: ['general-security', 'ai-security'],
    description: 'Security-focused YouTube channel with growing coverage of AI security, CTFs, and hacking techniques.',
    url: 'https://youtube.com/@LiveOverflow',
    free: true,
    highlights: [
      'CTF walkthroughs',
      'Security research',
      'Educational content',
      'Tool tutorials'
    ],
    tags: ['ctf', 'educational', 'hacking', 'tutorials']
  },

  // Blogs
  {
    id: 'comm-013',
    name: 'Simon Willison\'s Blog',
    type: 'blog',
    focus: ['llm-security', 'ai-security'],
    description: 'Blog by Simon Willison covering LLM developments, prompt injection research, and AI security considerations.',
    url: 'https://simonwillison.net',
    free: true,
    highlights: [
      'Prompt injection research',
      'LLM security analysis',
      'Tool development',
      'Industry commentary'
    ],
    tags: ['llm', 'research', 'prompt-injection', 'technical']
  },
  {
    id: 'comm-014',
    name: 'Embrace The Red',
    type: 'blog',
    focus: ['llm-security', 'red-teaming'],
    description: 'Security research blog focused on AI red teaming, LLM vulnerabilities, and adversarial testing techniques.',
    url: 'https://embracethered.com/blog',
    free: true,
    highlights: [
      'Original research',
      'Vulnerability disclosures',
      'Attack techniques',
      'Red team methodologies'
    ],
    tags: ['red-team', 'research', 'vulnerabilities', 'original']
  },
  {
    id: 'comm-015',
    name: 'Trail of Bits Blog',
    type: 'blog',
    focus: ['ml-security', 'ai-security', 'research'],
    description: 'Security research firm blog with detailed posts on ML security, model security assessments, and tool releases.',
    url: 'https://blog.trailofbits.com',
    free: true,
    highlights: [
      'Research publications',
      'Tool releases',
      'Assessment methodologies',
      'Technical deep dives'
    ],
    tags: ['professional', 'research', 'tools', 'deep-dive']
  },

  // Conferences
  {
    id: 'comm-016',
    name: 'DEF CON AI Village',
    type: 'conference',
    focus: ['ai-security', 'adversarial-ml', 'red-teaming'],
    description: 'Annual village at DEF CON dedicated to AI security, featuring talks, workshops, and the AI red team challenge.',
    url: 'https://aivillage.org',
    frequency: 'Annual (August)',
    free: true,
    highlights: [
      'AI red team challenges',
      'Research presentations',
      'Hands-on workshops',
      'CTF competitions'
    ],
    tags: ['defcon', 'annual', 'ctf', 'workshops']
  },
  {
    id: 'comm-017',
    name: 'NeurIPS ML Safety Workshop',
    type: 'conference',
    focus: ['ml-security', 'research', 'adversarial-ml'],
    description: 'Annual workshop at NeurIPS focusing on machine learning safety, security, and robustness research.',
    url: 'https://neurips.cc',
    frequency: 'Annual (December)',
    free: false,
    highlights: [
      'Cutting-edge research',
      'Paper presentations',
      'Panel discussions',
      'Networking'
    ],
    tags: ['academic', 'research', 'annual', 'prestigious']
  },
  {
    id: 'comm-018',
    name: 'RSA Conference AI Track',
    type: 'conference',
    focus: ['ai-security', 'policy', 'general-security'],
    description: 'AI security track at RSA Conference covering enterprise AI security, governance, and emerging threats.',
    url: 'https://rsaconference.com',
    frequency: 'Annual (April)',
    free: false,
    highlights: [
      'Enterprise focus',
      'Vendor presentations',
      'Policy discussions',
      'Networking'
    ],
    tags: ['enterprise', 'annual', 'vendor', 'policy']
  },

  // Research Groups
  {
    id: 'comm-019',
    name: 'MITRE ATLAS',
    type: 'research-group',
    focus: ['adversarial-ml', 'ai-security'],
    description: 'MITRE\'s Adversarial Threat Landscape for AI Systems - framework and community for AI security threats.',
    url: 'https://atlas.mitre.org',
    free: true,
    highlights: [
      'ATT&CK for AI systems',
      'Case study database',
      'Technique taxonomy',
      'Community contributions'
    ],
    tags: ['framework', 'taxonomy', 'mitre', 'official']
  },
  {
    id: 'comm-020',
    name: 'Microsoft AI Red Team',
    type: 'research-group',
    focus: ['ai-security', 'red-teaming'],
    description: 'Microsoft\'s AI red team sharing research, tools, and methodologies for AI security testing.',
    url: 'https://www.microsoft.com/en-us/security/blog/ai-red-team/',
    free: true,
    highlights: [
      'PyRIT tool',
      'Red team guides',
      'Research publications',
      'Best practices'
    ],
    tags: ['microsoft', 'tools', 'methodologies', 'official']
  },
  {
    id: 'comm-021',
    name: 'Anthropic Research',
    type: 'research-group',
    focus: ['ai-security', 'research'],
    description: 'Anthropic\'s research publications on AI safety, constitutional AI, and language model security.',
    url: 'https://www.anthropic.com/research',
    free: true,
    highlights: [
      'Safety research',
      'Constitutional AI',
      'Interpretability',
      'Red teaming findings'
    ],
    tags: ['anthropic', 'safety', 'research', 'official']
  },

  // CTFs
  {
    id: 'comm-022',
    name: 'AI CTF',
    type: 'ctf',
    focus: ['ai-security', 'adversarial-ml'],
    description: 'Capture the flag competitions focused on AI/ML security challenges, prompt injection, and adversarial attacks.',
    url: 'https://aictf.org',
    free: true,
    highlights: [
      'ML-specific challenges',
      'Prompt injection CTFs',
      'Regular competitions',
      'Learning resources'
    ],
    tags: ['competition', 'learning', 'hands-on', 'challenges']
  },
  {
    id: 'comm-023',
    name: 'Gandalf by Lakera',
    type: 'ctf',
    focus: ['llm-security', 'red-teaming'],
    description: 'Progressive prompt injection challenge where players try to extract secrets from an LLM with increasing defenses.',
    url: 'https://gandalf.lakera.ai',
    free: true,
    highlights: [
      'Progressive difficulty',
      'Prompt injection practice',
      'Immediate feedback',
      'Leaderboard'
    ],
    tags: ['prompt-injection', 'learning', 'gamified', 'beginner-friendly']
  },
  {
    id: 'comm-024',
    name: 'HackAPrompt',
    type: 'ctf',
    focus: ['llm-security', 'adversarial-ml'],
    description: 'Competition and platform for prompt hacking challenges, testing skills in prompt injection and jailbreaking.',
    url: 'https://hackaprompt.com',
    free: true,
    highlights: [
      'Multiple LLM targets',
      'Research output',
      'Community rankings',
      'Learning resources'
    ],
    tags: ['competition', 'research', 'prompt-hacking', 'jailbreaking']
  },

  // Training
  {
    id: 'comm-025',
    name: 'SANS SEC595: AI Security',
    type: 'training',
    focus: ['ai-security', 'ml-security'],
    description: 'SANS course on Applied Data Science and AI/Machine Learning for Cybersecurity Professionals.',
    url: 'https://www.sans.org/cyber-security-courses/applied-data-science-machine-learning/',
    free: false,
    highlights: [
      'Hands-on labs',
      'GIAC certification path',
      'Expert instructors',
      'Industry recognized'
    ],
    tags: ['professional', 'certification', 'hands-on', 'comprehensive']
  },
  {
    id: 'comm-026',
    name: 'Coursera AI Security Specialization',
    type: 'training',
    focus: ['ai-security', 'ml-security'],
    description: 'Online specialization covering AI security fundamentals, adversarial ML, and secure AI development.',
    url: 'https://coursera.org/specializations/ai-security',
    free: false,
    highlights: [
      'Self-paced learning',
      'University instructors',
      'Practical projects',
      'Certificate'
    ],
    tags: ['online', 'self-paced', 'certificate', 'academic']
  },

  // GitHub Organizations
  {
    id: 'comm-027',
    name: 'Adversarial Robustness Toolbox (ART)',
    type: 'github',
    focus: ['adversarial-ml', 'ml-security'],
    description: 'IBM\'s Python library for machine learning security, providing tools for adversarial attacks and defenses.',
    url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox',
    free: true,
    highlights: [
      'Attack implementations',
      'Defense methods',
      'Evaluation tools',
      'Active development'
    ],
    tags: ['tools', 'python', 'ibm', 'comprehensive']
  },
  {
    id: 'comm-028',
    name: 'OWASP LLM Top 10',
    type: 'github',
    focus: ['llm-security', 'ai-security'],
    description: 'OWASP project documenting the top 10 security risks for LLM applications.',
    url: 'https://github.com/OWASP/www-project-top-10-for-large-language-model-applications',
    free: true,
    highlights: [
      'Risk documentation',
      'Mitigation guidance',
      'Community driven',
      'Regular updates'
    ],
    tags: ['owasp', 'documentation', 'risks', 'llm']
  },

  // Twitter/X Accounts
  {
    id: 'comm-029',
    name: 'AI Security Weekly',
    type: 'twitter',
    focus: ['ai-security', 'llm-security'],
    description: 'Curated AI security content, research highlights, and industry updates on Twitter/X.',
    url: 'https://twitter.com/aisecurityweekly',
    free: true,
    highlights: [
      'Daily updates',
      'Research curation',
      'News aggregation',
      'Thread summaries'
    ],
    tags: ['news', 'curation', 'daily', 'updates']
  },
  {
    id: 'comm-030',
    name: 'LLM Security Research',
    type: 'twitter',
    focus: ['llm-security', 'research'],
    description: 'Account dedicated to sharing LLM security research, papers, and vulnerability findings.',
    url: 'https://twitter.com/llmsecurity',
    free: true,
    highlights: [
      'Paper summaries',
      'Vulnerability alerts',
      'Tool announcements',
      'Research highlights'
    ],
    tags: ['research', 'papers', 'vulnerabilities', 'technical']
  },

  // Additional Discord Communities
  {
    id: 'comm-031',
    name: 'Anthropic Discord',
    type: 'discord',
    focus: ['ai-security', 'research'],
    description: 'Official Anthropic community Discord for Claude users and AI safety researchers.',
    url: 'https://discord.gg/anthropic',
    memberCount: '50,000+',
    free: true,
    highlights: [
      'Direct community engagement',
      'Safety research discussions',
      'Claude best practices',
      'Feature announcements'
    ],
    tags: ['anthropic', 'claude', 'official', 'safety']
  },
  {
    id: 'comm-032',
    name: 'OpenAI Discord',
    type: 'discord',
    focus: ['ai-security', 'llm-security'],
    description: 'Official OpenAI community Discord for GPT users, researchers, and developers.',
    url: 'https://discord.gg/openai',
    memberCount: '100,000+',
    free: true,
    highlights: [
      'API discussions',
      'Safety guidelines',
      'Community projects',
      'Official updates'
    ],
    tags: ['openai', 'gpt', 'official', 'developers']
  },
  {
    id: 'comm-033',
    name: 'Adversary Village Discord',
    type: 'discord',
    focus: ['red-teaming', 'general-security'],
    description: 'DEF CON Adversary Village community focused on red teaming and adversary simulation.',
    url: 'https://discord.gg/adversaryvillage',
    memberCount: '5,000+',
    free: true,
    highlights: [
      'Red team methodologies',
      'Adversary simulation',
      'DEF CON coordination',
      'Purple team discussions'
    ],
    tags: ['defcon', 'red-team', 'adversary', 'simulation']
  },
  {
    id: 'comm-034',
    name: 'NahamSec Discord',
    type: 'discord',
    focus: ['general-security', 'red-teaming'],
    description: 'Bug bounty and security research community with growing AI security discussions.',
    url: 'https://discord.gg/nahamsec',
    memberCount: '30,000+',
    free: true,
    highlights: [
      'Bug bounty tips',
      'Tool discussions',
      'Mentorship',
      'AI vulnerability hunting'
    ],
    tags: ['bug-bounty', 'mentorship', 'community', 'hunting']
  },
  {
    id: 'comm-035',
    name: 'Hack The Box Discord',
    type: 'discord',
    focus: ['general-security', 'ai-security'],
    description: 'Official Hack The Box community with AI security challenges and training paths.',
    url: 'https://discord.gg/hackthebox',
    memberCount: '200,000+',
    free: true,
    highlights: [
      'CTF coordination',
      'AI challenge help',
      'Career advice',
      'Tool support'
    ],
    tags: ['htb', 'ctf', 'training', 'community']
  },

  // Reddit Communities
  {
    id: 'comm-036',
    name: 'r/MachineLearning',
    type: 'reddit',
    focus: ['ml-security', 'research'],
    description: 'Largest ML subreddit with regular discussions on adversarial ML and model security.',
    url: 'https://reddit.com/r/MachineLearning',
    memberCount: '3M+',
    free: true,
    highlights: [
      'Research paper discussions',
      'Industry news',
      'Career advice',
      'Tool recommendations'
    ],
    tags: ['reddit', 'research', 'news', 'community']
  },
  {
    id: 'comm-037',
    name: 'r/netsec',
    type: 'reddit',
    focus: ['general-security', 'ai-security'],
    description: 'Technical security subreddit with increasing coverage of AI security topics.',
    url: 'https://reddit.com/r/netsec',
    memberCount: '600K+',
    free: true,
    highlights: [
      'Vulnerability discussions',
      'Tool releases',
      'Research papers',
      'Industry news'
    ],
    tags: ['reddit', 'technical', 'vulnerabilities', 'news']
  },
  {
    id: 'comm-038',
    name: 'r/LocalLLaMA',
    type: 'reddit',
    focus: ['llm-security', 'ml-security'],
    description: 'Community focused on local LLM deployment with security and privacy discussions.',
    url: 'https://reddit.com/r/LocalLLaMA',
    memberCount: '500K+',
    free: true,
    highlights: [
      'Model security',
      'Privacy considerations',
      'Deployment advice',
      'Tool recommendations'
    ],
    tags: ['reddit', 'local-llm', 'privacy', 'deployment']
  },
  {
    id: 'comm-039',
    name: 'r/ControlProblem',
    type: 'reddit',
    focus: ['ai-security', 'research', 'policy'],
    description: 'AI alignment and control problem discussions with security implications.',
    url: 'https://reddit.com/r/ControlProblem',
    memberCount: '50K+',
    free: true,
    highlights: [
      'Alignment research',
      'Safety discussions',
      'Research papers',
      'Policy implications'
    ],
    tags: ['reddit', 'alignment', 'safety', 'research']
  },
  {
    id: 'comm-040',
    name: 'r/cybersecurity',
    type: 'reddit',
    focus: ['general-security', 'ai-security'],
    description: 'General cybersecurity subreddit with AI security career and news discussions.',
    url: 'https://reddit.com/r/cybersecurity',
    memberCount: '800K+',
    free: true,
    highlights: [
      'Career advice',
      'Certification discussions',
      'Industry news',
      'AI security questions'
    ],
    tags: ['reddit', 'career', 'news', 'community']
  },

  // Updated Conferences 2025-2026
  {
    id: 'comm-044',
    name: 'DEF CON 33 - AI Village',
    type: 'conference',
    focus: ['ai-security', 'red-teaming', 'adversarial-ml'],
    description: 'DEF CON 33 AI Village featuring AI red team challenges, talks, and workshops. August 7-10, 2025.',
    url: 'https://aivillage.org',
    frequency: 'August 7-10, 2025',
    free: true,
    highlights: [
      'AI red team challenge 2025',
      'GenAI security talks',
      'Hands-on workshops',
      'Networking opportunities'
    ],
    tags: ['defcon', '2025', 'red-team', 'village']
  },
  {
    id: 'comm-045',
    name: 'Black Hat USA 2025',
    type: 'conference',
    focus: ['general-security', 'ai-security'],
    description: 'Premier security conference with extensive AI security research track. August 2025.',
    url: 'https://blackhat.com',
    frequency: 'August 2025',
    free: false,
    highlights: [
      'AI security research',
      'Arsenal tools',
      'Training courses',
      'Vendor briefings'
    ],
    tags: ['blackhat', '2025', 'professional', 'research']
  },
  {
    id: 'comm-046',
    name: 'RSA Conference 2025',
    type: 'conference',
    focus: ['ai-security', 'policy', 'general-security'],
    description: 'Enterprise security conference with AI security track. April 28 - May 1, 2025.',
    url: 'https://rsaconference.com',
    frequency: 'April 28 - May 1, 2025',
    free: false,
    highlights: [
      'AI security summit',
      'Enterprise focus',
      'Policy discussions',
      'Vendor expo'
    ],
    tags: ['rsa', '2025', 'enterprise', 'policy']
  },
  {
    id: 'comm-047',
    name: 'CAMLIS 2025',
    type: 'conference',
    focus: ['adversarial-ml', 'ml-security', 'research'],
    description: 'Conference on Applied Machine Learning for Information Security. October 22-24, 2025.',
    url: 'https://camlis.org',
    frequency: 'October 22-24, 2025',
    free: false,
    highlights: [
      'Academic research',
      'Applied ML security',
      'Paper presentations',
      'Industry collaboration'
    ],
    tags: ['camlis', '2025', 'academic', 'research']
  },
  {
    id: 'comm-048',
    name: 'OWASP Global AppSec 2025',
    type: 'conference',
    focus: ['ai-security', 'llm-security', 'general-security'],
    description: 'OWASP flagship conference with LLM security track. November 6-7, 2025.',
    url: 'https://owasp.org/events',
    frequency: 'November 6-7, 2025',
    free: false,
    highlights: [
      'LLM Top 10 updates',
      'Application security',
      'Community networking',
      'Training sessions'
    ],
    tags: ['owasp', '2025', 'appsec', 'llm']
  },
  {
    id: 'comm-049',
    name: 'Agentic AI Security Summit Europe',
    type: 'conference',
    focus: ['ai-security', 'llm-security'],
    description: 'Focused summit on agent security and autonomous AI systems. December 10, 2025.',
    url: 'https://agenticsecurity.org',
    frequency: 'December 10, 2025',
    free: false,
    highlights: [
      'Agent security focus',
      'European perspective',
      'Industry leaders',
      'Emerging threats'
    ],
    tags: ['agents', '2025', 'europe', 'summit']
  },

  // Bootcamps & Intensive Training
  {
    id: 'comm-050',
    name: 'Berkeley AI Red-Teaming Bootcamp',
    type: 'bootcamp',
    focus: ['ai-security', 'red-teaming'],
    description: 'Intensive bootcamp at UC Berkeley focusing on AI red teaming. July 27 - August 1, 2025.',
    url: 'https://security.berkeley.edu',
    frequency: 'July 27 - Aug 1, 2025',
    free: false,
    highlights: [
      'Academic rigor',
      'Hands-on labs',
      'Expert instructors',
      'Certification'
    ],
    tags: ['berkeley', 'bootcamp', 'academic', 'intensive']
  },
  {
    id: 'comm-051',
    name: 'Hack The Box AI Red Teamer Path',
    type: 'training',
    focus: ['ai-security', 'red-teaming'],
    description: 'HTB learning path focused on AI system red teaming with hands-on labs.',
    url: 'https://hackthebox.com/ai-red-teamer',
    free: false,
    highlights: [
      'Progressive difficulty',
      'Real-world scenarios',
      'AI-specific challenges',
      'Certificate'
    ],
    tags: ['htb', 'path', 'hands-on', 'red-team']
  },
  {
    id: 'comm-052',
    name: 'Learn Prompting AIRTP+ Masterclass',
    type: 'training',
    focus: ['llm-security', 'red-teaming'],
    description: 'AI Red Teaming Professional+ certification course covering advanced prompt security.',
    url: 'https://learnprompting.org/certification',
    free: false,
    highlights: [
      'Professional certification',
      'Prompt engineering',
      'Red team techniques',
      'Industry recognized'
    ],
    tags: ['certification', 'prompting', 'professional', 'advanced']
  },

  // Professional Organizations
  {
    id: 'comm-053',
    name: 'CSA AI Safety Initiative',
    type: 'professional-org',
    focus: ['ai-security', 'policy'],
    description: 'Cloud Security Alliance AI Safety Initiative with 1,500+ expert members.',
    url: 'https://cloudsecurityalliance.org/research/ai-safety/',
    memberCount: '1,500+',
    free: true,
    highlights: [
      'AI governance frameworks',
      'Working groups',
      'Industry standards',
      'Expert network'
    ],
    tags: ['csa', 'governance', 'standards', 'professional']
  },
  {
    id: 'comm-054',
    name: 'Center for AI Safety (CAIS)',
    type: 'professional-org',
    focus: ['ai-security', 'research', 'policy'],
    description: 'Research organization focused on reducing societal-scale risks from AI.',
    url: 'https://safe.ai',
    free: true,
    highlights: [
      'Safety research',
      'Policy advocacy',
      'Grants and fellowships',
      'Research publications'
    ],
    tags: ['research', 'safety', 'policy', 'advocacy']
  },
  {
    id: 'comm-055',
    name: 'Future of Life Institute',
    type: 'professional-org',
    focus: ['ai-security', 'policy'],
    description: 'Organization working on AI safety policy and existential risk mitigation.',
    url: 'https://futureoflife.org',
    free: true,
    highlights: [
      'Policy development',
      'AI safety initiatives',
      'Grant programs',
      'Public advocacy'
    ],
    tags: ['policy', 'safety', 'advocacy', 'grants']
  },
  {
    id: 'comm-056',
    name: 'Partnership on AI',
    type: 'professional-org',
    focus: ['ai-security', 'policy', 'research'],
    description: 'Multi-stakeholder organization developing AI best practices and guidelines.',
    url: 'https://partnershiponai.org',
    memberCount: '100+ orgs',
    free: true,
    highlights: [
      'Best practices',
      'Multi-stakeholder',
      'Industry guidance',
      'Research initiatives'
    ],
    tags: ['partnership', 'guidelines', 'multi-stakeholder', 'industry']
  },

  // Additional Twitter/X Researchers
  {
    id: 'comm-057',
    name: '@simonwillison - Simon Willison',
    type: 'twitter',
    focus: ['llm-security', 'research'],
    description: 'Prolific LLM researcher and blogger covering prompt injection and AI security.',
    url: 'https://twitter.com/simonwillison',
    free: true,
    highlights: [
      'Original research',
      'Prompt injection expertise',
      'Tool development',
      'Industry commentary'
    ],
    tags: ['researcher', 'prompt-injection', 'influential', 'technical']
  },
  {
    id: 'comm-058',
    name: '@JohannRehberger - Johann Rehberger',
    type: 'twitter',
    focus: ['llm-security', 'red-teaming'],
    description: 'Embrace The Red author, LLM vulnerability researcher and red teamer.',
    url: 'https://twitter.com/JohannRehberger',
    free: true,
    highlights: [
      'Vulnerability research',
      'Red team insights',
      'Original discoveries',
      'Security analysis'
    ],
    tags: ['researcher', 'red-team', 'vulnerabilities', 'expert']
  },
  {
    id: 'comm-059',
    name: '@josephthacker - Joseph Thacker',
    type: 'twitter',
    focus: ['ai-security', 'red-teaming'],
    description: 'AI security researcher sharing bug bounty and AI vulnerability findings.',
    url: 'https://twitter.com/josephthacker',
    free: true,
    highlights: [
      'Bug bounty tips',
      'AI vulnerabilities',
      'Practical security',
      'Industry insights'
    ],
    tags: ['bug-bounty', 'researcher', 'practical', 'vulnerabilities']
  },
  {
    id: 'comm-060',
    name: '@ArvindNarayanan - Arvind Narayanan',
    type: 'twitter',
    focus: ['ai-security', 'policy', 'research'],
    description: 'Princeton professor and AI Snake Oil author covering AI limitations and risks.',
    url: 'https://twitter.com/random_walker',
    free: true,
    highlights: [
      'Academic perspective',
      'AI limitations',
      'Policy commentary',
      'Critical analysis'
    ],
    tags: ['academic', 'policy', 'critical', 'influential']
  }
]

// Helper functions
export const getResourcesByType = (type: ResourceType): CommunityResource[] => {
  return communityResources.filter(r => r.type === type)
}

export const getResourcesByFocus = (focus: ResourceFocus): CommunityResource[] => {
  return communityResources.filter(r => r.focus.includes(focus))
}

export const getFreeResources = (): CommunityResource[] => {
  return communityResources.filter(r => r.free)
}

export const getResourcesByTag = (tag: string): CommunityResource[] => {
  return communityResources.filter(r => r.tags.includes(tag))
}

export const searchResources = (query: string): CommunityResource[] => {
  const lowerQuery = query.toLowerCase()
  return communityResources.filter(r =>
    r.name.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.tags.some(t => t.toLowerCase().includes(lowerQuery))
  )
}

// Stats
export const communityStats = {
  totalResources: communityResources.length,
  byType: resourceTypes.reduce((acc, type) => {
    acc[type.id] = getResourcesByType(type.id).length
    return acc
  }, {} as Record<ResourceType, number>),
  byFocus: resourceFocuses.reduce((acc, focus) => {
    acc[focus.id] = getResourcesByFocus(focus.id).length
    return acc
  }, {} as Record<ResourceFocus, number>),
  freeResources: getFreeResources().length,
  paidResources: communityResources.length - getFreeResources().length
}
