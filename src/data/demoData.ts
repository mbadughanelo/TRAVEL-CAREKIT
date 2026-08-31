import { UserProfile, Journey, RoadmapTask, DocumentItem, CostItem, ApplicationItem } from '../types';

export const DEMO_USER_ID = 'demo-user-ada';
export const DEMO_JOURNEY_ID = 'demo-journey-ada-alberta';

export const DEMO_USER_PROFILE: UserProfile = {
  id: DEMO_USER_ID,
  firstName: 'Ada',
  lastName: 'Okonkwo',
  email: 'ada.demo@nursepath.org',
  educationCountry: 'Nigeria',
  qualification: 'Bachelor of Nursing / BSc Nursing',
  yearQualified: 2018,
  registrations: [
    {
      id: 'reg-demo-1',
      country: 'Nigeria',
      status: 'Active',
      yearRegistered: 2018
    },
    {
      id: 'reg-demo-2',
      country: 'United Kingdom',
      status: 'Active',
      yearRegistered: 2021
    }
  ],
  currentPracticeCountry: 'United Kingdom',
  experience: '5–10 years',
  experienceYearsNumeric: 8,
  currentlyPractisingClinically: true,
  helpTopics: [
    'Understanding registration',
    'Choosing state/province',
    'Exams',
    'Documents',
    'Costs'
  ],
  activeJourneyId: DEMO_JOURNEY_ID,
  isDemo: true,
  createdAt: '2026-06-15T09:00:00Z',
  updatedAt: '2026-08-31T15:30:00Z'
};

export const DEMO_JOURNEY: Journey = {
  id: DEMO_JOURNEY_ID,
  userId: DEMO_USER_ID,
  title: 'UK NHS RN to Alberta, Canada (CRNA)',
  destinationCountry: 'Canada',
  destinationStateOrProvince: 'Alberta',
  targetTimeline: '6–12 months',
  targetDate: '2027-01-31',
  pathwayVariant: 'CRNA Alberta Internationally Educated Nurse (IEN) Pathway',
  notes: 'Registered Nurse practising in the UK NHS since 2021. Exploring Alberta Health Services opportunities.',
  createdAt: '2026-06-15T09:00:00Z',
  updatedAt: '2026-08-31T15:30:00Z'
};

export const DEMO_ROADMAP_TASKS: RoadmapTask[] = [
  {
    id: `${DEMO_JOURNEY_ID}-task-1`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'research',
    title: 'Establish & confirm CRNA nursing competence assessment route',
    description: 'Explore the College of Registered Nurses of Alberta (CRNA) pathways. Determine whether you qualify for direct substantial equivalence, an approved credential review, or an alternate assessment.',
    status: 'Completed',
    isRequired: true,
    regulatorName: 'College of Registered Nurses of Alberta (CRNA)',
    officialSourceName: 'CRNA Internationally Educated Nurses Guide',
    officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    userNotes: 'Confirmed direct assessment pathway through CRNA College Connect since I hold active UK NMC and Nigerian registrations.',
    targetDate: '2026-07-01',
    order: 1
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-2`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'credentials',
    title: 'Create CRNA College Connect account and complete initial profile',
    description: 'Register with the CRNA online portal and begin your application for registration eligibility assessment.',
    status: 'Completed',
    isRequired: true,
    regulatorName: 'CRNA',
    officialSourceName: 'CRNA College Connect Portal',
    officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    userNotes: 'Account created. Initial profile submitted.',
    targetDate: '2026-07-15',
    order: 2
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-3`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'credentials',
    title: 'Submit nursing education & international registration verification',
    description: 'Submit verified transcripts and certificate of good standing from each jurisdiction where you are or have been registered.',
    status: 'Completed',
    isRequired: true,
    regulatorName: 'CRNA',
    officialSourceName: 'CRNA Registration Standards',
    officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    userNotes: 'NMC verification and Nigerian NMCN good standing documents received by CRNA.',
    targetDate: '2026-08-01',
    order: 3
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-4`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'credentials',
    title: 'Demonstrate currency of nursing practice (recent clinical hours)',
    description: 'Provide employer verification of nursing practice hours (minimum 1,125 hours in past 5 years or 450 in past 2 years).',
    status: 'Completed',
    isRequired: true,
    regulatorName: 'CRNA',
    officialSourceName: 'CRNA Currency of Practice Policy',
    officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    userNotes: 'NHS Trust HR submitted statement of service: 4,200+ clinical hours verified.',
    targetDate: '2026-08-15',
    order: 4
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-5`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'credentials',
    title: 'Verify English Language Proficiency requirements with CRNA',
    description: 'Confirm whether your education or practice exempts you, or provide IELTS Academic (Overall 7.0, L7.0, R6.5, W6.5, S7.0) / CELBAN.',
    status: 'Completed',
    isRequired: true,
    regulatorName: 'CRNA',
    officialSourceName: 'CRNA English Proficiency Standard',
    officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    userNotes: 'English competence verified via UK NHS continuous full-time clinical nursing practice letter.',
    targetDate: '2026-08-20',
    order: 5
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-6`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'exams',
    title: 'Pass the NCLEX-RN (if not previously taken)',
    description: 'If you have not already passed the NCLEX-RN, register via Pearson VUE upon receiving authorization from CRNA.',
    status: 'Action Required',
    isRequired: true,
    regulatorName: 'CRNA / NCSBN',
    officialSourceName: 'NCLEX Candidate Bulletin',
    officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
    lastVerifiedDate: 'August 2026',
    estimatedFee: 200,
    currency: 'USD',
    userNotes: 'ATT received from CRNA! Scheduled for Pearson VUE London test centre for next month.',
    targetDate: '2026-10-15',
    order: 6
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-7`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'application',
    title: 'Complete Alberta Jurisprudence & Practice learning modules',
    description: 'Complete required CRNA online modules on Alberta nursing legislation, standards of practice, and ethics.',
    status: 'Researching',
    isRequired: true,
    regulatorName: 'CRNA',
    officialSourceName: 'CRNA Jurisprudence',
    officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    targetDate: '2026-11-01',
    order: 7
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-8`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'application',
    title: 'Obtain Criminal Record Check with Vulnerable Sector Screening',
    description: 'Submit an approved criminal background screening report to CRNA.',
    status: 'Requested',
    isRequired: true,
    regulatorName: 'CRNA / UK DBS / Police Service',
    officialSourceName: 'CRNA Character Screening',
    officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    userNotes: 'UK ACRO Police Certificate requested. Nigerian police clearance on file.',
    targetDate: '2026-11-15',
    order: 8
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-9`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'licence',
    title: 'Obtain Professional Liability Protection (CNPS / Alberta)',
    description: 'Secure mandatory professional liability protection through the Canadian Nurses Protective Society (CNPS).',
    status: 'Not Started',
    isRequired: true,
    regulatorName: 'CNPS / CRNA',
    officialSourceName: 'Canadian Nurses Protective Society',
    officialSourceUrl: 'https://www.cnps.ca/',
    lastVerifiedDate: 'August 2026',
    targetDate: '2026-12-01',
    order: 9
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-10`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'licence',
    title: 'Submit final registration declarations and pay CRNA permit fee',
    description: 'Complete declarations regarding fitness to practise and pay for your annual Alberta RN practice permit.',
    status: 'Not Started',
    isRequired: true,
    regulatorName: 'CRNA',
    officialSourceName: 'CRNA Practice Permits',
    officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    targetDate: '2026-12-15',
    order: 10
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-11`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'employment',
    title: 'Apply for nursing opportunities with Alberta Health Services (AHS) / Covenant',
    description: 'Explore provincial RN vacancies across acute care, rural hospitals, and community care in Alberta.',
    status: 'Researching',
    isRequired: false,
    regulatorName: 'Alberta Health Services (AHS)',
    officialSourceName: 'AHS Careers Portal',
    officialSourceUrl: 'https://careers.albertahealthservices.ca/',
    lastVerifiedDate: 'August 2026',
    userNotes: 'Attended virtual AHS recruitment fair for medical-surgical and emergency nursing roles.',
    targetDate: '2026-12-30',
    order: 11
  },
  {
    id: `${DEMO_JOURNEY_ID}-task-12`,
    journeyId: DEMO_JOURNEY_ID,
    stage: 'relocation',
    title: 'Complete Canadian Work Permit / Alberta Advantage Immigration Program',
    description: 'Coordinate with employer for Labour Market Impact Assessment (LMIA) / LMIA-exempt work permit or provincial nomination.',
    status: 'Not Started',
    isRequired: true,
    regulatorName: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    officialSourceName: 'IRCC Work Permit Portal',
    officialSourceUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html',
    lastVerifiedDate: 'August 2026',
    targetDate: '2027-01-31',
    order: 12
  }
];

export const DEMO_DOCUMENTS: DocumentItem[] = [
  { id: `${DEMO_JOURNEY_ID}-doc-1`, journeyId: DEMO_JOURNEY_ID, name: 'Valid Nigerian Passport', category: 'Identity', description: 'Primary international identification document.', isApplicable: true, status: 'Accepted', expiryDate: '2030-05-14', notes: 'Verified and uploaded' },
  { id: `${DEMO_JOURNEY_ID}-doc-2`, journeyId: DEMO_JOURNEY_ID, name: 'UK Biometric Residence Permit (BRP)', category: 'Identity', description: 'Proof of current legal status in UK.', isApplicable: true, status: 'Accepted', notes: 'Valid through 2028' },
  { id: `${DEMO_JOURNEY_ID}-doc-3`, journeyId: DEMO_JOURNEY_ID, name: 'BSc Nursing Degree Certificate', category: 'Nursing Education', description: 'Primary nursing qualification from Nigeria.', isApplicable: true, status: 'Accepted', notes: 'Certified true copy' },
  { id: `${DEMO_JOURNEY_ID}-doc-4`, journeyId: DEMO_JOURNEY_ID, name: 'Official University Academic Transcripts', category: 'Nursing Education', description: 'Full breakdown of classroom and clinical hours.', isApplicable: true, status: 'Accepted', notes: 'Transmitted directly by University' },
  { id: `${DEMO_JOURNEY_ID}-doc-5`, journeyId: DEMO_JOURNEY_ID, name: 'UK NMC Verification of Registration & Good Standing', category: 'Nursing Registration', description: 'Direct verification from the NMC UK to CRNA.', isApplicable: true, status: 'Accepted', notes: 'Confirmed received by CRNA' },
  { id: `${DEMO_JOURNEY_ID}-doc-6`, journeyId: DEMO_JOURNEY_ID, name: 'Nigerian NMCN Letter of Good Standing', category: 'Nursing Registration', description: 'Verification of initial registration in Nigeria.', isApplicable: true, status: 'Accepted', notes: 'Sent by NMCN courier' },
  { id: `${DEMO_JOURNEY_ID}-doc-7`, journeyId: DEMO_JOURNEY_ID, name: 'NHS Hospital Employer Statement of Service', category: 'Employment', description: 'Detailed hours (4,200+ hrs) in medical-surgical acute care.', isApplicable: true, status: 'Accepted', notes: 'Signed by Lead Nurse Manager & HR' },
  { id: `${DEMO_JOURNEY_ID}-doc-8`, journeyId: DEMO_JOURNEY_ID, name: 'English Proficiency Practice Exemption Letter', category: 'English', description: 'Letter from UK NHS employer confirming daily practice in English.', isApplicable: true, status: 'Accepted', notes: 'Accepted by CRNA for English waiver' },
  { id: `${DEMO_JOURNEY_ID}-doc-9`, journeyId: DEMO_JOURNEY_ID, name: 'NCLEX-RN Authorization to Test (ATT)', category: 'Regulatory', description: 'Pearson VUE Authorization letter to take the exam.', isApplicable: true, status: 'Received', requestedDate: '2026-08-01', receivedDate: '2026-08-18', notes: 'ATT valid for 90 days' },
  { id: `${DEMO_JOURNEY_ID}-doc-10`, journeyId: DEMO_JOURNEY_ID, name: 'UK ACRO Police Certificate', category: 'Regulatory', description: 'Criminal record check for UK residency.', isApplicable: true, status: 'Requested', requestedDate: '2026-08-20', notes: 'Processing with ACRO' },
  { id: `${DEMO_JOURNEY_ID}-doc-11`, journeyId: DEMO_JOURNEY_ID, name: 'Nigerian Police Clearance Certificate', category: 'Regulatory', description: 'Criminal background screening from Nigeria.', isApplicable: true, status: 'Received', receivedDate: '2026-06-25' },
  { id: `${DEMO_JOURNEY_ID}-doc-12`, journeyId: DEMO_JOURNEY_ID, name: 'Alberta Jurisprudence Completion Certificate', category: 'Regulatory', description: 'CRNA module completion certificate.', isApplicable: true, status: 'Need to Request', notes: 'Pending module completion' },
  { id: `${DEMO_JOURNEY_ID}-doc-13`, journeyId: DEMO_JOURNEY_ID, name: 'CNPS Professional Liability Certificate', category: 'Regulatory', description: 'Proof of professional malpractice coverage.', isApplicable: true, status: 'Not Needed', notes: 'Will purchase upon permit issuance' },
  { id: `${DEMO_JOURNEY_ID}-doc-14`, journeyId: DEMO_JOURNEY_ID, name: 'Canadian Work Permit / Immigration Letter', category: 'Regulatory', description: 'IRCC approval or employer sponsorship letter.', isApplicable: true, status: 'Waiting', notes: 'In discussions with prospective employers' }
];

export const DEMO_COST_ITEMS: CostItem[] = [
  { id: `${DEMO_JOURNEY_ID}-cost-1`, journeyId: DEMO_JOURNEY_ID, item: 'CRNA College Connect Application Assessment Fee', category: 'Regulator Fees', estimatedCost: 450, currency: 'CAD', amountPaid: 450, paymentStatus: 'Paid', paymentDate: '2026-07-15', lastVerifiedDate: 'August 2026' },
  { id: `${DEMO_JOURNEY_ID}-cost-2`, journeyId: DEMO_JOURNEY_ID, item: 'UK NMC Verification of Registration Fee', category: 'Document Verification', estimatedCost: 34, currency: 'GBP', amountPaid: 34, paymentStatus: 'Paid', paymentDate: '2026-07-20', lastVerifiedDate: 'August 2026' },
  { id: `${DEMO_JOURNEY_ID}-cost-3`, journeyId: DEMO_JOURNEY_ID, item: 'Nigerian NMCN Letter of Good Standing & Courier', category: 'Document Verification', estimatedCost: 120000, currency: 'NGN', amountPaid: 120000, paymentStatus: 'Paid', paymentDate: '2026-07-05', lastVerifiedDate: 'August 2026' },
  { id: `${DEMO_JOURNEY_ID}-cost-4`, journeyId: DEMO_JOURNEY_ID, item: 'NCLEX-RN Registration Fee (Pearson VUE)', category: 'Examinations', estimatedCost: 200, currency: 'USD', amountPaid: 200, paymentStatus: 'Paid', paymentDate: '2026-08-18', lastVerifiedDate: 'August 2026' },
  { id: `${DEMO_JOURNEY_ID}-cost-5`, journeyId: DEMO_JOURNEY_ID, item: 'NCLEX International Scheduling Fee (London Center)', category: 'Examinations', estimatedCost: 150, currency: 'USD', amountPaid: 150, paymentStatus: 'Paid', paymentDate: '2026-08-18', lastVerifiedDate: 'August 2026' },
  { id: `${DEMO_JOURNEY_ID}-cost-6`, journeyId: DEMO_JOURNEY_ID, item: 'UK ACRO Police Certificate Fast Track', category: 'Police / Background Checks', estimatedCost: 65, currency: 'GBP', amountPaid: 65, paymentStatus: 'Paid', paymentDate: '2026-08-20', lastVerifiedDate: 'August 2026' },
  { id: `${DEMO_JOURNEY_ID}-cost-7`, journeyId: DEMO_JOURNEY_ID, item: 'Alberta Jurisprudence Online Module Fee', category: 'Examinations', estimatedCost: 100, currency: 'CAD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
  { id: `${DEMO_JOURNEY_ID}-cost-8`, journeyId: DEMO_JOURNEY_ID, item: 'CNPS Professional Liability Protection (Annual)', category: 'Registration', estimatedCost: 180, currency: 'CAD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
  { id: `${DEMO_JOURNEY_ID}-cost-9`, journeyId: DEMO_JOURNEY_ID, item: 'CRNA Annual RN Practice Permit Fee', category: 'Registration', estimatedCost: 550, currency: 'CAD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' }
];

export const DEMO_APPLICATIONS: ApplicationItem[] = [
  {
    id: `${DEMO_JOURNEY_ID}-app-1`,
    journeyId: DEMO_JOURNEY_ID,
    applicationType: 'Regulator Application',
    organisation: 'College of Registered Nurses of Alberta (CRNA)',
    country: 'Canada',
    stateOrProvince: 'Alberta',
    dateStarted: '2026-07-15',
    dateSubmitted: '2026-07-25',
    referenceNumber: 'CRNA-IEN-2026-8842',
    status: 'Waiting',
    nextAction: 'Complete NCLEX-RN and submit result',
    nextActionDate: '2026-10-20',
    notes: 'Assessment approved. Authorization to test issued. Awaiting exam pass outcome.',
    portalUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/'
  },
  {
    id: `${DEMO_JOURNEY_ID}-app-2`,
    journeyId: DEMO_JOURNEY_ID,
    applicationType: 'Exam Registration',
    organisation: 'Pearson VUE (NCLEX-RN)',
    country: 'Canada',
    stateOrProvince: 'Alberta',
    dateStarted: '2026-08-18',
    dateSubmitted: '2026-08-18',
    referenceNumber: 'PV-NCLEX-902188',
    status: 'Action Required',
    nextAction: 'Sit for NCLEX-RN exam in London test centre',
    nextActionDate: '2026-10-15',
    notes: 'Appointment confirmed for 15 October 2026 at Pearson Professional Centres London.',
    portalUrl: 'https://home.pearsonvue.com/ncsbn'
  }
];
