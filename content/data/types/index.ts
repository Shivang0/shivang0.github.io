// Shared type definitions for AI Security Platform

// Base severity levels used across all data types
export type Severity = 'critical' | 'high' | 'medium' | 'low';

// Difficulty levels for learning content
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Lab types
export type LabType = 'ctf' | 'sandbox' | 'interactive' | 'workshop' | 'challenge';
export type LabEnvironment = 'web' | 'local' | 'cloud' | 'docker' | 'vm';

// Bug bounty platforms
export type BountyPlatform = 'hackerone' | 'bugcrowd' | 'intigriti' | 'synack' | 'direct' | 'huntr';
export type BountyStatus = 'active' | 'paused' | 'closed' | 'invite-only';

// Attack vectors
export type AttackVector =
  | 'prompt-injection'
  | 'jailbreaking'
  | 'data-extraction'
  | 'data-poisoning'
  | 'model-extraction'
  | 'adversarial-examples'
  | 'supply-chain'
  | 'privacy-inference'
  | 'evasion'
  | 'backdoor'
  | 'agent-attacks'
  | 'multimodal';

// Certification providers
export type CertProvider =
  | 'sans'
  | 'offensive-security'
  | 'ec-council'
  | 'comptia'
  | 'isaca'
  | 'isc2'
  | 'aws'
  | 'azure'
  | 'google'
  | 'practical-devsecops'
  | 'secops-group'
  | 'learn-prompting'
  | 'vendor-specific';

// Community resource types
export type CommunityType =
  | 'discord'
  | 'slack'
  | 'forum'
  | 'podcast'
  | 'newsletter'
  | 'conference'
  | 'meetup'
  | 'reddit'
  | 'twitter'
  | 'linkedin'
  | 'bootcamp'
  | 'professional-org'
  | 'youtube'
  | 'blog'
  | 'github'
  | 'training'
  | 'ctf'
  | 'research-group';

// Glossary categories
export type GlossaryCategory =
  | 'attacks'
  | 'defenses'
  | 'architecture'
  | 'compliance'
  | 'ml-concepts'
  | 'security-concepts'
  | 'prompt-injection'
  | 'jailbreaking'
  | 'rag-security'
  | 'agent-security'
  | 'named-attacks'
  | 'llm-architecture'
  | 'safety-alignment'
  | 'adversarial-ml'
  | 'frameworks'
  | 'tools'
  | 'governance'
  | 'llm-concepts';

// Cross-reference interface for linking between data types
export interface CrossReference {
  owaspLLM?: string[];      // ['LLM01', 'LLM02']
  mitreAtlas?: string;      // 'AML.T0051'
  cwe?: string[];           // ['CWE-77', 'CWE-94']
  relatedAttacks?: string[];
  relatedLabs?: string[];
  relatedTools?: string[];
  relatedIncidents?: string[];
}

// External link type
export interface ExternalLink {
  url: string;
  label: string;
  type?: 'documentation' | 'github' | 'website' | 'paper' | 'video' | 'official';
}

// Base item interface that many types extend
export interface BaseItem {
  id: string;
  title: string;
  description: string;
}

// Lab interface
export interface Lab extends BaseItem {
  provider: string;
  url: string;
  difficulty: Difficulty;
  type: LabType;
  environment: LabEnvironment;
  estimatedTime: string;
  categories: string[];
  owaspMapping: string[];
  mitreMapping?: string[];
  features: string[];
  githubUrl?: string;
  isFree: boolean;
  isActive: boolean;
  dateAdded: string;
}

// Bug bounty program interface
export interface BugBountyProgram extends BaseItem {
  company: string;
  platform: BountyPlatform;
  url: string;
  status: BountyStatus;
  maxReward: number;
  rewardRange: string;
  currency: string;
  scope: string[];
  aiSystemsInScope: string[];
  excludedVulnerabilities: string[];
  responseTime?: string;
  launched?: string;
  logoUrl?: string;
}

// Learning path module
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  resources: ExternalLink[];
  labs?: string[];
  certifications?: string[];
}

// Learning path interface
export interface LearningPath extends BaseItem {
  role: string;
  targetAudience: string;
  duration: string;
  difficulty: Difficulty;
  prerequisites: string[];
  modules: LearningModule[];
  skillsGained: string[];
  careerOutcomes: string[];
}

// Attack technique interface
export interface AttackTechnique extends BaseItem {
  vector: AttackVector;
  severity: Severity;
  difficulty: Difficulty;
  references: CrossReference;
  prerequisites: string[];
  attackSteps: string[];
  mitigations: string[];
  detectionMethods: string[];
  realWorldExamples?: {
    title: string;
    description: string;
    year: number;
    url?: string;
  }[];
  resources: ExternalLink[];
}

// Certification interface
export interface Certification extends BaseItem {
  abbreviation: string;
  provider: CertProvider;
  providerName: string;
  difficulty: Difficulty;
  cost: {
    exam: number;
    training?: number;
    currency: string;
  };
  duration: string;
  prerequisites: string[];
  domains: {
    name: string;
    weight?: string;
    topics: string[];
  }[];
  renewalPeriod?: string;
  aiRelevance: 'primary' | 'secondary' | 'foundational';
  url: string;
}

// Security incident interface
export interface SecurityIncident extends BaseItem {
  organization: string;
  date: string;
  severity: Severity;
  incidentType: string;
  attackVector?: string;
  impact: {
    financial?: string;
    users?: string;
    data?: string;
  };
  timeline: {
    date: string;
    event: string;
  }[];
  rootCause: string;
  lessonsLearned: string[];
  references: ExternalLink[];
}

// Community resource interface
export interface CommunityResource extends BaseItem {
  type: CommunityType;
  url: string;
  platform?: string;
  hosts?: string[];
  frequency?: string;
  memberCount?: string;
  topics: string[];
  featured?: boolean;
}

// OWASP LLM entry interface
export interface OWASPLLMEntry {
  id: string;
  rank: number;
  title: string;
  description: string;
  severity: Severity;
  overview: string;
  commonExamples: string[];
  affectedComponents: {
    component: string;
    description: string;
    riskLevel: Severity;
  }[];
  preventionStrategies: string[];
  detectionMethods: string[];
  mitigations: string[];
  references: CrossReference;
  resources: ExternalLink[];
  changesFrom2023?: {
    previousRank?: number;
    previousTitle?: string;
    changeType: 'new' | 'updated' | 'renamed' | 'merged' | 'unchanged';
    changeDescription?: string;
  };
}

// Glossary term interface
export interface GlossaryTerm extends BaseItem {
  term: string;
  slug: string;
  category: GlossaryCategory;
  extendedDescription?: string;
  examples?: string[];
  relatedTerms?: string[];
  aliases?: string[];
  acronymFor?: string;
  references?: CrossReference;
  learnMoreUrl?: string;
}

// Pentest scoping question interface
export interface PentestQuestion {
  id: string;
  question: string;
  purpose: string;
  phase: string;
  category: string;
  responseType: 'text' | 'yes-no' | 'select' | 'multiselect' | 'scale';
  options?: string[];
  importance: Severity;
  required: boolean;
  followUpQuestions?: string[];
  redFlags?: string[];
  aiSpecific: boolean;
}

// Tool interface (for expanded tools)
export interface SecurityTool extends BaseItem {
  category: string;
  url: string;
  githubUrl?: string;
  documentationUrl?: string;
  license: 'open-source' | 'commercial' | 'freemium' | 'enterprise';
  platforms: string[];
  language?: string;
  features: string[];
  useCases: string[];
  stars?: string;
  lastCommit?: string;
  integrations?: string[];
  references?: CrossReference;
  recommended?: boolean;
}

// Searchable item for global search
export interface SearchableItem {
  id: string;
  type: 'checklist' | 'tool' | 'prompt' | 'lab' | 'attack' | 'threat' | 'standard' | 'research' | 'glossary' | 'certification' | 'incident';
  title: string;
  description: string;
  url: string;
  category?: string;
  severity?: Severity;
  tags?: string[];
}
