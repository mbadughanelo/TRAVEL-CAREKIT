export type CountryCode = 'UK' | 'USA' | 'Canada' | 'Australia' | 'Other';

export type QualificationType = 
  | 'Diploma'
  | 'Associate Degree'
  | 'Bachelor of Nursing / BSc Nursing'
  | 'Master\'s entry nursing qualification'
  | 'Diploma in Nursing / Registered General Nurse (RGN)'
  | 'Associate Degree in Nursing (ADN)'
  | 'Master of Science in Nursing (MSN)'
  | 'Other';

export type ExperienceLevel = 
  | 'Less than 1 year'
  | '1–2 years'
  | '2–5 years'
  | '5–10 years'
  | '10+ years';

export type ExperienceTier = ExperienceLevel;

export type TimelineGoal = 
  | 'Within 6 months'
  | '6–12 months'
  | '12–24 months'
  | 'Just researching';

export type TimelineTier = TimelineGoal;

export type RoadmapStage = 
  | 'research'
  | 'credentials'
  | 'application'
  | 'exams'
  | 'licence'
  | 'employment'
  | 'relocation';

export type JourneyStage = RoadmapStage;

export type TaskStatus = 
  | 'Not Started'
  | 'Researching'
  | 'Requested'
  | 'Submitted'
  | 'Waiting'
  | 'Action Required'
  | 'Completed'
  | 'Not Applicable';

export type DocumentStatus = 
  | 'Not Needed'
  | 'Need to Request'
  | 'Requested'
  | 'Waiting'
  | 'Received'
  | 'Submitted'
  | 'Accepted'
  | 'Rejected / Action Required';

export type DocumentCategory = 
  | 'Identity'
  | 'Nursing Education'
  | 'Nursing Registration'
  | 'Employment'
  | 'English'
  | 'Regulatory';

export type CostCategory = 
  | 'Regulator Fees'
  | 'Credential Evaluation'
  | 'Examinations'
  | 'English Test'
  | 'English Language Test'
  | 'Document Verification'
  | 'Translation'
  | 'Police / Background Checks'
  | 'Travel'
  | 'Accommodation'
  | 'Visa / Immigration'
  | 'Medical'
  | 'Registration'
  | 'Other';

export type CurrencyCode = 'GBP' | 'USD' | 'CAD' | 'AUD' | 'EUR' | 'NGN' | string;

export type PaymentStatus = 'Planned' | 'Pending' | 'Budgeted' | 'Paid' | 'Deposit Paid' | 'Waived';

export type ApplicationType = 
  | 'Regulator Application'
  | 'Credential Evaluation'
  | 'Exam Registration'
  | 'Job Application'
  | 'Visa / Immigration'
  | 'Other';

export type ApplicationStatus = 
  | 'Not Started'
  | 'Draft'
  | 'Preparing'
  | 'Submitted'
  | 'Waiting'
  | 'Action Required'
  | 'Interview'
  | 'Approved'
  | 'Rejected'
  | 'Unsuccessful'
  | 'Completed';

export interface RegistrationRecord {
  id: string;
  country: string;
  stateOrProvince?: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Expired';
  registrationNumber?: string;
  yearRegistered?: number;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  educationCountry: string;
  qualification: QualificationType;
  yearQualified?: number;
  registrations: RegistrationRecord[];
  currentPracticeCountry: string;
  experience: ExperienceLevel;
  experienceYearsNumeric?: number;
  currentlyPractisingClinically: boolean;
  helpTopics: string[];
  activeJourneyId?: string;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Journey {
  id: string;
  userId: string;
  title: string;
  destinationCountry: CountryCode;
  destinationStateOrProvince?: string;
  targetTimeline: TimelineGoal;
  targetDate?: string;
  notes?: string;
  pathwayVariant?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapTask {
  id: string;
  journeyId: string;
  stage: RoadmapStage;
  title: string;
  description: string;
  status: TaskStatus;
  isRequired: boolean;
  regulatorName?: string;
  officialSourceName?: string;
  officialSourceUrl?: string;
  lastVerifiedDate: string;
  userNotes?: string;
  targetDate?: string;
  estimatedFee?: number;
  currency?: CurrencyCode;
  isCustom?: boolean;
  order: number;
  warningNote?: string;
}

export interface DocumentItem {
  id: string;
  journeyId: string;
  name: string;
  category: DocumentCategory;
  description: string;
  isApplicable: boolean;
  status: DocumentStatus;
  requestedDate?: string;
  receivedDate?: string;
  expiryDate?: string;
  notes?: string;
  issuingAuthority?: string;
  officialSourceUrl?: string;
  lastVerifiedDate?: string;
}

export interface CostItem {
  id: string;
  journeyId: string;
  item: string;
  category: CostCategory;
  estimatedCost: number;
  currency: string;
  amountPaid: number;
  paymentStatus: PaymentStatus;
  paymentDate?: string;
  notes?: string;
  isCustom?: boolean;
  officialSourceUrl?: string;
  lastVerifiedDate?: string;
}

export interface ApplicationItem {
  id: string;
  journeyId: string;
  applicationType: ApplicationType;
  organisation: string;
  country: string;
  stateOrProvince?: string;
  dateStarted: string;
  dateSubmitted?: string;
  referenceNumber?: string;
  status: ApplicationStatus;
  nextAction?: string;
  nextActionDate?: string;
  notes?: string;
  portalUrl?: string;
}

export interface RegulatoryRequirement {
  id: string;
  requirementName: string;
  country: CountryCode;
  stateOrProvince?: string;
  regulator: string;
  stage: RoadmapStage;
  description: string;
  estimatedFee?: number;
  currency?: CurrencyCode;
  officialSourceName: string;
  officialSourceUrl: string;
  lastVerifiedDate: string;
  notes: string;
  active: boolean;
  version: string;
  appliesToQualification?: QualificationType[];
  appliesToComparableCountries?: string[];
  warningMessage?: string;
}

export interface OfficialSource {
  id: string;
  organisation: string;
  title: string;
  pageTitle?: string;
  description: string;
  country: string;
  stateOrProvince?: string;
  type: string;
  sourceType?: string;
  url: string;
  lastVerifiedDate: string;
  isVerified: boolean;
}

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  tagline: string;
  regulator: string;
  regulatorName: string;
  regulatorShort: string;
  structure: string;
  overview: string;
  qualificationRule: string;
  englishRequirements: string;
  examRequirements: string;
  visaInformation: string;
  typicalTimeline: string;
  typicalCostRange: string;
  officialWebsite: string;
  mainExams: string[];
  englishPolicies: string[];
  keyWarnings: string[];
  statesOrProvincesSupported: { name: string; code: string; isDetailed: boolean }[];
  lastVerifiedDate: string;
}
