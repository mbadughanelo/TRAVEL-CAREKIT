import { CountryInfo, OfficialSource, RoadmapStage } from '../types';

export interface StageDefinition {
  id: RoadmapStage;
  title: string;
  shortDesc: string;
  color: string;
  iconName: string;
}

export const STAGE_DEFINITIONS: StageDefinition[] = [
  {
    id: 'research',
    title: 'Stage 1: Research & Eligibility',
    shortDesc: 'Assess qualification equivalence, state/provincial rules, and self-check criteria',
    color: 'blue',
    iconName: 'Search'
  },
  {
    id: 'credentials',
    title: 'Stage 2: Primary Credentials & Verification',
    shortDesc: 'Transcripts, syllabus breakdown, Certificate of Good Standing, and English language evidence',
    color: 'purple',
    iconName: 'FileCheck'
  },
  {
    id: 'application',
    title: 'Stage 3: Board / Regulator Application',
    shortDesc: 'Official submission, FBI/police background clearance, health/character declarations',
    color: 'amber',
    iconName: 'Building2'
  },
  {
    id: 'exams',
    title: 'Stage 4: Competency & Registration Exams',
    shortDesc: 'NCLEX-RN, CBT, OSCE, or Provincial Jurisprudence Modules',
    color: 'emerald',
    iconName: 'GraduationCap'
  },
  {
    id: 'licence',
    title: 'Stage 5: Final Licencing & Registration PIN',
    shortDesc: 'Professional liability indemnity, in-person ID checks, and initial licence issuance',
    color: 'teal',
    iconName: 'Award'
  },
  {
    id: 'employment',
    title: 'Stage 6: Healthcare Employer Sponsorship',
    shortDesc: 'Interviews, hospital job offers, Certificate of Sponsorship (CoS), or provincial health match',
    color: 'indigo',
    iconName: 'Stethoscope'
  },
  {
    id: 'relocation',
    title: 'Stage 7: Immigration & Settlement',
    shortDesc: 'Work permits, Health and Care Worker visas, credential recognition, and clinical induction',
    color: 'cyan',
    iconName: 'Plane'
  }
];

export const COUNTRIES_DATA: CountryInfo[] = [
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    tagline: 'Centralised national registration through the Nursing and Midwifery Council (NMC).',
    regulator: 'Nursing and Midwifery Council (NMC)',
    regulatorName: 'Nursing and Midwifery Council (NMC)',
    regulatorShort: 'NMC',
    structure: 'National Centralised',
    overview: 'The NMC operates a single, unified register for nurses and midwives across England, Scotland, Wales, and Northern Ireland. Internationally educated nurses complete qualification assessment, English language verification, and the Test of Competence (CBT & OSCE).',
    qualificationRule: 'NMC recognizes diploma and bachelor-level pre-registration nursing qualifications that meet standard clinical hours (minimum 2,300 hours theoretical and 2,300 clinical practicum).',
    englishRequirements: 'IELTS Academic (Overall 7.0: L7.0, R7.0, S7.0, W6.5) or OET (Listening B, Reading B, Speaking B, Writing C+). Education in English or 12+ months post-registration clinical practice in qualifying English-speaking jurisdictions may be accepted.',
    examRequirements: 'Test of Competence: Part 1 CBT (Computer Based Test taken internationally via Pearson VUE) + Part 2 OSCE (Objective Structured Clinical Exam taken in-person at a UK test centre).',
    visaInformation: 'Health and Care Worker Visa (Skilled Worker route). Requires a job offer and Certificate of Sponsorship (CoS) from an approved NHS Trust or independent healthcare sponsor. Licensing is evaluated by the NMC, while visas are administered by UK Visas and Immigration (Gov.uk).',
    typicalTimeline: '6 to 12 months from initial application to UK OSCE',
    typicalCostRange: '£1,170 – £1,600 (Excl. flights/visa)',
    officialWebsite: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
    mainExams: ['Test of Competence: CBT (Computer Based Test)', 'Test of Competence: OSCE (Objective Structured Clinical Examination)'],
    englishPolicies: [
      'IELTS Academic: Listening 7.0, Reading 7.0, Speaking 7.0, Writing 6.5 (Overall 7.0)',
      'OET (Occupational English Test): Listening B (350+), Reading B (350+), Speaking B (350+), Writing C+ (300+)',
      'Qualifying pre-registration nursing education in English or 12+ months post-registration practice in an English-majority jurisdiction (subject to NMC criteria)'
    ],
    keyWarnings: [
      'Do not book CBT or OSCE until the NMC assesses your eligibility and issues your confirmation.',
      'The NMC accepts multiple English evidence routes in qualifying circumstances. Verify whether you already satisfy requirements before booking an exam.'
    ],
    statesOrProvincesSupported: [
      { name: 'National (England, Scotland, Wales, NI)', code: 'UK-NAT', isDetailed: true }
    ],
    lastVerifiedDate: 'August 2026'
  },
  {
    code: 'USA',
    name: 'United States',
    flag: '🇺🇸',
    tagline: 'State-regulated licensing. You must select your target State Board of Nursing before applying.',
    regulator: 'State Boards of Nursing (e.g. Texas BON, NYSED, California BRN, Florida BON)',
    regulatorName: 'State Boards of Nursing (50 autonomous state BONs)',
    regulatorShort: 'State BONs',
    structure: 'State-by-State Autonomy',
    overview: 'The United States has NO national RN licence. Each state or territorial Board of Nursing establishes independent requirements for education evaluation, criminal background checks, English competency, and NCLEX-RN eligibility.',
    qualificationRule: 'Requires substantial equivalence to a US Associate Degree (ADN) or Bachelor of Science in Nursing (BSN) with concurrent theory and clinical rotations across Adult Medical-Surgical, Maternal/Child, Pediatric, and Psychiatric nursing.',
    englishRequirements: 'Varies by State Board. Many require IELTS Academic (Overall 6.5, Speaking 7.0) or TOEFL iBT (Overall 83-84, Speaking 26), or exemption via English-language primary nursing training.',
    examRequirements: 'NCLEX-RN (National Council Licensure Examination for Registered Nurses) via Pearson VUE. Passing standard is universal across all US states.',
    visaInformation: 'Immigration is independent of licensing. Obtaining a state RN license does not confer work authorization. International nurses typically immigrate via EB-3 Green Card (Permanent Residency sponsored by hospital/agency) or VisaScreen (CGFNS) certification.',
    typicalTimeline: '9 to 18 months (Licensure + EB-3 Visa processing)',
    typicalCostRange: '$1,200 – $2,500 USD (Excl. immigration attorney / petition fees)',
    officialWebsite: 'https://www.ncsbn.org/nclex.page',
    mainExams: ['NCLEX-RN (National Council Licensure Examination for Registered Nurses)'],
    englishPolicies: [
      'Requirements vary by State Board (commonly IELTS Academic 6.5+ or TOEFL iBT 83-84+).',
      'Exemptions may apply based on initial country of nursing instruction or secondary education.'
    ],
    keyWarnings: [
      'Licensing is not immigration: Passing NCLEX-RN or obtaining a state nursing licence does not confer a visa or permission to work in the US.',
      'State requirements vary substantially. Do not apply for credential evaluation until you have confirmed your chosen State Board requirements.'
    ],
    statesOrProvincesSupported: [
      { name: 'Texas', code: 'TX', isDetailed: true },
      { name: 'New York', code: 'NY', isDetailed: true },
      { name: 'California', code: 'CA', isDetailed: true },
      { name: 'Florida', code: 'FL', isDetailed: true },
      { name: 'Other States (Generic Board Pathway)', code: 'OTHER_US', isDetailed: false }
    ],
    lastVerifiedDate: 'August 2026'
  },
  {
    code: 'Canada',
    name: 'Canada',
    flag: '🇨🇦',
    tagline: 'Provincial and territorial regulation. Select your target province to view accurate registration pathways.',
    regulator: 'Provincial Nursing Regulators (CRNA Alberta, CNO Ontario, BCCNM British Columbia, etc.)',
    regulatorName: 'Provincial Regulatory Colleges (e.g. CRNA, CNO, BCCNM)',
    regulatorShort: 'Provincial Colleges',
    structure: 'Provincial / Territorial Colleges',
    overview: 'Canada has NO universal Canadian RN registration. Each province has an independent college that evaluates internationally educated nurse substantial equivalence, registration examinations (NCLEX-RN or REx-PN), and jurisprudence.',
    qualificationRule: 'Substantial equivalence to Canadian baccalaureate nursing education. Alberta (CRNA) and British Columbia (BCCNM) offer direct substantial-equivalence pathways for internationally qualified nurses.',
    englishRequirements: 'IELTS Academic (Overall 7.0, L7.0, R6.5, W6.5, S7.0), CELBAN (Speaking 8, Listening 10, Reading 8, Writing 7), or approved educational/practice exemption.',
    examRequirements: 'NCLEX-RN (Universal entry exam in Canadian provinces except Quebec) + Provincial Jurisprudence Examination / Modules.',
    visaInformation: 'Work permits via provincial healthcare LMIA exemptions, provincial nominee programs (e.g. Alberta Advantage Immigrant Program - Dedicated Healthcare Pathway, BC PNP Healthcare), or Express Entry Federal Skilled Worker.',
    typicalTimeline: '4 to 12 months depending on province (Alberta offers fastest direct processing)',
    typicalCostRange: '$1,200 – $2,200 CAD (Excl. visa fees)',
    officialWebsite: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    mainExams: ['NCLEX-RN', 'Provincial Jurisprudence Examination / Modules'],
    englishPolicies: [
      'IELTS Academic starter benchmark (e.g. Overall 7.0 with specific module thresholds, or CELBAN).',
      'Many provinces accept qualification through nursing education taught in English or practice in English-speaking jurisdictions without re-testing.'
    ],
    keyWarnings: [
      'Alberta (CRNA) has multiple substantial equivalence pathways. NNAS is NOT automatically mandatory for every internationally educated nurse.',
      'British Columbia offers expedited pathways for nurses with registration/practice in the UK, Australia, and New Zealand.'
    ],
    statesOrProvincesSupported: [
      { name: 'Alberta (CRNA)', code: 'AB', isDetailed: true },
      { name: 'Ontario (CNO)', code: 'ON', isDetailed: true },
      { name: 'British Columbia (BCCNM)', code: 'BC', isDetailed: true },
      { name: 'Other Provinces (Generic Provincial Pathway)', code: 'OTHER_CA', isDetailed: false }
    ],
    lastVerifiedDate: 'August 2026'
  },
  {
    code: 'Australia',
    name: 'Australia',
    flag: '🇦🇺',
    tagline: 'National registration via NMBA & Ahpra, featuring Streamlined IQRN and Standard OBA routes.',
    regulator: 'Nursing and Midwifery Board of Australia (NMBA) administered by Ahpra',
    regulatorName: 'Nursing and Midwifery Board of Australia (NMBA / Ahpra)',
    regulatorShort: 'NMBA / Ahpra',
    structure: 'National Centralised Register',
    overview: 'Australia uses a national registration system managed by Ahpra on behalf of the NMBA. International nurses are routed through either the Streamlined Internationally Qualified Registered Nurse (IQRN) assessment or the Outcomes-Based Assessment (OBA) pathway.',
    qualificationRule: 'Requires Australian Bachelor of Nursing equivalent (AQF Level 7). Nurses with diploma qualifications or qualifications lacking concurrent clinical hours are routed to bridging or conversion.',
    englishRequirements: 'IELTS Academic (7.0 in all 4 bands: L7.0, R7.0, S7.0, W7.0), OET (Grade B in all 4 components), PTE Academic (65 in all components). Test result combination permitted across 2 sittings within 6 months.',
    examRequirements: 'Stream B: NCLEX-RN (MCQ test taken internationally) + Australian RN OSCE (Clinical simulation exam taken at Adelaide Health Simulation Centre, AUD $4,000). Stream A applicants are exempt from exams.',
    visaInformation: 'Employer-sponsored Temporary Skill Shortage (TSS subclass 482 / SID), Skilled Independent Visa (subclass 189), or Skilled Nominated Visa (subclass 190). Requires ANMAC migration skills assessment after or concurrent with Ahpra.',
    typicalTimeline: '6 to 14 months (Stream A: 3-5 months; Stream B with OSCE: 8-14 months)',
    typicalCostRange: 'AUD $1,500 (Stream A) to AUD $5,800+ (Stream B with OSCE)',
    officialWebsite: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
    mainExams: ['NCLEX-RN (MCQ Examination)', 'Australian RN OSCE (Objective Structured Clinical Examination)'],
    englishPolicies: [
      'IELTS Academic: Minimum overall 7.0 and minimum 7.0 in each of the 4 components.',
      'OET: Minimum score of B in each of the 4 components.',
      'PTE Academic: Minimum overall score of 65 and minimum 65 in each communicative skill.',
      'Primary language pathway (qualifying continuous education in recognised English-speaking countries).'
    ],
    keyWarnings: [
      'If you have 1,800+ hours of RN practice in an NMBA-approved comparable jurisdiction (e.g. UK, Ireland, USA, Canada-BC/ON, Singapore, Spain) since 2017, explore the Streamlined IQRN pathway before committing to the standard OBA process.',
      'Australian OSCE sits at AUD $4,000 per attempt. Verify your exact pathway and self-check outcome before making payments.'
    ],
    statesOrProvincesSupported: [
      { name: 'National (All States & Territories via Ahpra)', code: 'AU-NAT', isDetailed: true }
    ],
    lastVerifiedDate: 'August 2026'
  }
];

export const US_STATES_DATA = [
  {
    stateName: 'Texas',
    regulatorName: 'Texas Board of Nursing (BON)',
    ssnRule: 'Does NOT require US SSN to apply for exam or receive initial license approval.',
    evaluationService: 'CGFNS CES Course-by-Course, ERES, or Josef Silny.',
    englishRule: 'IELTS Academic (6.5 overall, 7.0 speaking) or TOEFL (83/26) unless educated in exempt English country.',
    officialUrl: 'https://www.bon.texas.gov/licensure_examination.asp',
    notes: 'Popular destination with massive hospital medical centers (Houston, Dallas) and dedicated nurse residency programs.'
  },
  {
    stateName: 'New York',
    regulatorName: 'New York State Education Department (NYSED)',
    ssnRule: 'Does NOT require US SSN to take NCLEX-RN; licensure packet can be endorsed later.',
    evaluationService: 'CGFNS CVS for New York State or direct institutional verification.',
    englishRule: 'Does not mandate an English test for initial examination eligibility if education is deemed equivalent.',
    officialUrl: 'https://www.op.nysed.gov/professions/registered-professional-nursing/license-requirements',
    notes: 'Often used by international nurses as an initial entry state to pass NCLEX-RN, then endorsed to target states.'
  },
  {
    stateName: 'California',
    regulatorName: 'California Board of Registered Nursing (BRN)',
    ssnRule: 'SSN or ITIN required before active license can be issued (can test with temporary tracking number in some cases).',
    evaluationService: 'Direct credential evaluation through California BRN transcript review.',
    englishRule: 'Strict concurrency rules for theoretical and clinical coursework in all 4 core nursing specialties.',
    officialUrl: 'https://www.rn.ca.gov/applicants/lic-exam.shtml',
    notes: 'Highest RN salary scales in the US, but has strict transcript concurrency evaluations for foreign grads.'
  },
  {
    stateName: 'Florida',
    regulatorName: 'Florida Board of Nursing',
    ssnRule: 'Social Security Number required for final licensure issuance; fingerprint screening mandatory.',
    evaluationService: 'Approved credential evaluators (CGFNS, Josef Silny, SpanTran, etc.).',
    englishRule: 'IELTS, TOEFL, or evidence of nursing instruction in English.',
    officialUrl: 'https://floridasnursing.gov/licensing/licensed-practical-nurse-registered-nurse-by-examination/',
    notes: 'Compact state license available once US permanent residency and primary state residence are established.'
  }
];

export const CANADA_PROVINCES_DATA = [
  {
    provinceName: 'Alberta',
    regulatorName: 'College of Registered Nurses of Alberta (CRNA)',
    pathwayModel: 'Direct Multiple Substantial Equivalence Routes (No mandatory NNAS delay for qualified applicants).',
    evaluationService: 'Direct CRNA assessment or approved evaluation services.',
    currencyRequirement: '1,125 hours in past 5 years or 450 hours in past 2 years.',
    jurisprudenceExam: 'Online learning modules completed through College Connect portal.',
    officialUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    notes: 'Fastest growing pathway for international nurses; direct Alberta Advantage Immigrant Program stream available.'
  },
  {
    provinceName: 'Ontario',
    regulatorName: 'College of Nurses of Ontario (CNO)',
    pathwayModel: 'Standard CNO IEN Evaluation + Transition to Practice (if assigned).',
    evaluationService: 'CNO credential assessment or NNAS.',
    currencyRequirement: 'Evidence of practice within past 3 years.',
    jurisprudenceExam: 'Online open-book CNO RN Jurisprudence Examination.',
    officialUrl: 'https://www.cno.org/en/become-a-nurse/registration-requirements/',
    notes: 'Largest healthcare system in Canada (Toronto, Ottawa). Transition to practice course (~7-14 weeks) may be needed.'
  },
  {
    provinceName: 'British Columbia',
    regulatorName: 'British Columbia College of Nurses and Midwives (BCCNM)',
    pathwayModel: 'Comparable Jurisdiction recognition for UK/AU/NZ and direct assessment.',
    evaluationService: 'BCCNM international assessment process.',
    currencyRequirement: 'Clinical practice currency in recent years.',
    jurisprudenceExam: 'Professional standards review.',
    officialUrl: 'https://www.bccnm.ca/RN/applications_registration/Pages/international_nurse.aspx',
    notes: 'Significant provincial bursaries and settlement incentives for nurses arriving in regional health authorities.'
  }
];

export const AUSTRALIA_STREAMS = [
  {
    stream: 'Stream A',
    title: 'Recognized Direct Qualifications',
    description: 'Qualifications substantially equivalent to an Australian Bachelor of Nursing with direct clinical comparability.',
    requirements: 'Qualifications from countries like UK, Ireland, NZ, Canada (BC/ON), USA (BSN). Direct registration without OSCE exam.'
  },
  {
    stream: 'Stream B',
    title: 'Outcomes-Based Assessment (OBA)',
    description: 'Qualifications meeting criteria but requiring Australian competency validation through testing.',
    requirements: 'Stage 1: NCLEX-RN (MCQ test) + Stage 2: Australian RN OSCE (Clinical exam in Adelaide, AUD $4,000).'
  },
  {
    stream: 'Stream C',
    title: 'Substantially Different Qualifications',
    description: 'Qualifications not meeting base AQF Level 7 requirements (e.g. diploma without degree conversion).',
    requirements: 'Requires completion of an NMBA-approved Australian Bachelor of Nursing conversion degree.'
  }
];

export const OFFICIAL_SOURCES: OfficialSource[] = [
  // UK
  {
    id: 'src-uk-nmc-home',
    organisation: 'Nursing and Midwifery Council (NMC)',
    title: 'Trained outside the UK — Registration Guidance',
    pageTitle: 'Trained outside the UK — Registration Guidance',
    description: 'Official step-by-step guidance for nurses and midwives trained outside the UK.',
    country: 'UK',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-uk-nmc-fees',
    organisation: 'Nursing and Midwifery Council (NMC)',
    title: 'Fee Schedule for Overseas Applications',
    pageTitle: 'Fee Schedule for Overseas Applications',
    description: 'Official schedule of application evaluation, CBT, OSCE, and initial registration fees.',
    country: 'UK',
    type: 'Fee Schedule',
    sourceType: 'Fee Schedule',
    url: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/costs-for-overseas-application/',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-uk-nmc-english',
    organisation: 'Nursing and Midwifery Council (NMC)',
    title: 'English Language Requirements & Evidence',
    pageTitle: 'English Language Requirements & Evidence',
    description: 'Official policy on accepted tests (IELTS, OET) and supporting professional evidence routes.',
    country: 'UK',
    type: 'English Policy',
    sourceType: 'English Policy',
    url: 'https://www.nmc.org.uk/registration/joining-the-register/english-language-requirements/',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-uk-pearson-toc',
    organisation: 'Pearson VUE / NMC Test of Competence',
    title: 'NMC Test of Competence (CBT) Booking Portal',
    pageTitle: 'NMC Test of Competence (CBT) Booking Portal',
    description: 'Official portal for scheduling the Computer Based Test (CBT) with Pearson VUE.',
    country: 'UK',
    type: 'Exam Provider',
    sourceType: 'Exam Provider',
    url: 'https://home.pearsonvue.com/nmc',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },

  // USA
  {
    id: 'src-us-ncsbn-nclex',
    organisation: 'National Council of State Boards of Nursing (NCSBN)',
    title: 'NCLEX-RN Candidate Information',
    pageTitle: 'NCLEX-RN Candidate Information',
    description: 'Official bulletin for the National Council Licensure Examination for Registered Nurses.',
    country: 'USA',
    type: 'Exam Provider',
    sourceType: 'Exam Provider',
    url: 'https://www.ncsbn.org/nclex.page',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-us-tx-bon',
    organisation: 'Texas Board of Nursing',
    title: 'International Endorsement & Examination Guidelines',
    pageTitle: 'International Endorsement & Examination Guidelines',
    description: 'Licensing requirements, recent education/practice rules, and jurisprudence exam for Texas.',
    country: 'USA',
    stateOrProvince: 'Texas',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://www.bon.texas.gov/licensure_examination.asp',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-us-ny-op',
    organisation: 'New York State Education Department — Office of the Professions',
    title: 'Registered Professional Nurse Licensure Guide',
    pageTitle: 'Registered Professional Nurse Licensure Guide',
    description: 'Requirements for foreign-educated nurses applying for initial RN licensure in New York.',
    country: 'USA',
    stateOrProvince: 'New York',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://www.op.nysed.gov/professions/registered-professional-nursing/license-requirements',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-us-ca-brn',
    organisation: 'California Board of Registered Nursing',
    title: 'International Educated Nurses Licensure Overview',
    pageTitle: 'International Educated Nurses Licensure Overview',
    description: 'Application process, detailed transcript breakdown, and educational evaluation rules for California.',
    country: 'USA',
    stateOrProvince: 'California',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://www.rn.ca.gov/applicants/lic-exam.shtml',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-us-fl-bon',
    organisation: 'Florida Board of Nursing',
    title: 'Licensure by Examination for Internationally Educated Nurses',
    pageTitle: 'Licensure by Examination for Internationally Educated Nurses',
    description: 'Requirements, credential evaluations, and background screening rules for Florida.',
    country: 'USA',
    stateOrProvince: 'Florida',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://floridasnursing.gov/licensing/licensed-practical-nurse-registered-nurse-by-examination/',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },

  // Canada
  {
    id: 'src-ca-ab-crna',
    organisation: 'College of Registered Nurses of Alberta (CRNA)',
    title: 'Internationally Educated Nurses (IEN) Registration Pathways',
    pageTitle: 'Internationally Educated Nurses (IEN) Registration Pathways',
    description: 'Substantial equivalence routes, direct assessment pathways, and English proficiency options.',
    country: 'Canada',
    stateOrProvince: 'Alberta',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-ca-on-cno',
    organisation: 'College of Nurses of Ontario (CNO)',
    title: 'Registration Requirements for Internationally Educated Nurses',
    pageTitle: 'Registration Requirements for Internationally Educated Nurses',
    description: 'Education assessment, evidence of practice, Transition to Practice, and jurisprudence in Ontario.',
    country: 'Canada',
    stateOrProvince: 'Ontario',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://www.cno.org/en/become-a-nurse/registration-requirements/',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-ca-bc-bccnm',
    organisation: 'British Columbia College of Nurses and Midwives (BCCNM)',
    title: 'IEN Registration Assessment & Comparable Jurisdiction Policy',
    pageTitle: 'IEN Registration Assessment & Comparable Jurisdiction Policy',
    description: 'Assessment process for international nurses and pathways for nurses with UK/AU/NZ practice history.',
    country: 'Canada',
    stateOrProvince: 'British Columbia',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://www.bccnm.ca/RN/applications_registration/Pages/international_nurse.aspx',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },

  // Australia
  {
    id: 'src-au-nmba-iqrn',
    organisation: 'Nursing and Midwifery Board of Australia (NMBA)',
    title: 'Internationally Qualified Nurses and Midwives (IQNM) Assessment',
    pageTitle: 'Internationally Qualified Nurses and Midwives (IQNM) Assessment',
    description: 'Self-check assessment, Streamlined IQRN criteria, and Outcomes-Based Assessment (OBA) framework.',
    country: 'Australia',
    type: 'Regulator',
    sourceType: 'Regulator',
    url: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-au-ahpra-fees',
    organisation: 'Australian Health Practitioner Regulation Agency (Ahpra)',
    title: 'Schedule of Fees for Nursing and Midwifery',
    pageTitle: 'Schedule of Fees for Nursing and Midwifery',
    description: 'Official schedule of application, OSCE assessment, and annual registration fees.',
    country: 'Australia',
    type: 'Fee Schedule',
    sourceType: 'Fee Schedule',
    url: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/Fees.aspx',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  },
  {
    id: 'src-au-nmba-english',
    organisation: 'Nursing and Midwifery Board of Australia (NMBA)',
    title: 'English Language Skills Registration Standard',
    pageTitle: 'English Language Skills Registration Standard',
    description: 'Accepted test scores (IELTS, OET, PTE, TOEFL) and primary language qualification pathways.',
    country: 'Australia',
    type: 'English Policy',
    sourceType: 'English Policy',
    url: 'https://www.nursingmidwiferyboard.gov.au/Registration-Standards/English-language-skills.aspx',
    lastVerifiedDate: 'August 2026',
    isVerified: true
  }
];

export const REGULATORY_DISCLAIMER_TEXT = 
  "NursePath provides career organisation and general informational guidance. Registration, licensing, immigration and employment requirements can change. Always verify requirements directly with the relevant official regulator before making payments, submitting documents or making immigration decisions.";
