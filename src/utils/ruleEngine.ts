import { 
  UserProfile, 
  Journey, 
  RoadmapTask, 
  DocumentItem, 
  CostItem, 
  CountryCode, 
  RoadmapStage,
  DocumentCategory,
  CostCategory
} from '../types';

export interface PathwayGenerationResult {
  tasks: RoadmapTask[];
  documents: DocumentItem[];
  costs: CostItem[];
  pathwayVariant: string;
  specialNotices: string[];
}

export function generatePersonalizedPathway(
  profile: Partial<UserProfile>,
  journey: Partial<Journey>
): PathwayGenerationResult {
  const destination = journey.destinationCountry || 'UK';
  const stateOrProvince = journey.destinationStateOrProvince || '';
  const currentPractice = profile.currentPracticeCountry || '';
  const registrations = profile.registrations || [];
  const experience = profile.experience || '1–2 years';
  const experienceYears = profile.experienceYearsNumeric ?? (
    experience === 'Less than 1 year' ? 0.5 :
    experience === '1–2 years' ? 2 :
    experience === '2–5 years' ? 4 :
    experience === '5–10 years' ? 7 : 12
  );

  const isPractisingInUK = currentPractice.toLowerCase().includes('united kingdom') || currentPractice.toLowerCase().includes('uk');
  const isRegisteredInUK = registrations.some(r => r.country.toLowerCase().includes('united kingdom') || r.country.toLowerCase().includes('uk'));
  const isPractisingInUS = currentPractice.toLowerCase().includes('united states') || currentPractice.toLowerCase().includes('usa') || currentPractice.toLowerCase().includes('us');
  const isPractisingInAU = currentPractice.toLowerCase().includes('australia') || currentPractice.toLowerCase().includes('au');
  const isPractisingInNZ = currentPractice.toLowerCase().includes('new zealand') || currentPractice.toLowerCase().includes('nz');
  const isPractisingInIreland = currentPractice.toLowerCase().includes('ireland');
  const isPractisingInSingapore = currentPractice.toLowerCase().includes('singapore');
  const isPractisingInSpain = currentPractice.toLowerCase().includes('spain');

  let tasks: RoadmapTask[] = [];
  let documents: DocumentItem[] = [];
  let costs: CostItem[] = [];
  let pathwayVariant = 'Standard Pathway';
  const specialNotices: string[] = [];

  const jId = journey.id || 'journey-current';

  // 1. UNITED KINGDOM (NMC)
  if (destination === 'UK') {
    pathwayVariant = 'NMC International Overseas Registration Pathway';
    specialNotices.push(
      'Requirements depend on your individual NMC assessment. Do not assume CBT or OSCE is automatically mandatory before the NMC completes your evaluation.',
      'The NMC accepts multiple English evidence routes in qualifying circumstances. Verify your personal eligibility before booking an examination.'
    );

    tasks = [
      {
        id: `${jId}-task-1`,
        journeyId: jId,
        stage: 'research',
        title: 'Review NMC overseas registration criteria & eligibility',
        description: 'Review the NMC guidance for nurses trained outside the UK/EU. Confirm your nursing qualification is recognized and meets initial eligibility standards.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'Nursing and Midwifery Council (NMC)',
        officialSourceName: 'NMC Overseas Guidance',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
        lastVerifiedDate: 'August 2026',
        order: 1
      },
      {
        id: `${jId}-task-2`,
        journeyId: jId,
        stage: 'credentials',
        title: 'Submit NMC qualification evaluation & initial fee',
        description: 'Set up your NMC Online account and submit your qualification for formal overseas assessment.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'Nursing and Midwifery Council (NMC)',
        officialSourceName: 'NMC Fee Schedule',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/costs-for-overseas-application/',
        lastVerifiedDate: 'August 2026',
        estimatedFee: 140,
        currency: 'GBP',
        order: 2
      },
      {
        id: `${jId}-task-3`,
        journeyId: jId,
        stage: 'credentials',
        title: 'Gather primary nursing qualification transcripts and verification',
        description: 'Obtain certified transcripts and curriculum breakdown directly from your nursing education institution.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC',
        officialSourceName: 'NMC Evidence Guidelines',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
        lastVerifiedDate: 'August 2026',
        order: 3
      },
      {
        id: `${jId}-task-4`,
        journeyId: jId,
        stage: 'credentials',
        title: 'Request Certificate of Current Professional Status (Good Standing)',
        description: 'Contact your current/initial nursing licensing council (e.g. NMCN, State Board) to send formal verification of registration directly to the NMC.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'Current Nursing Board / NMC',
        officialSourceName: 'NMC Registration Verification',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
        lastVerifiedDate: 'August 2026',
        order: 4
      },
      {
        id: `${jId}-task-5`,
        journeyId: jId,
        stage: 'credentials',
        title: 'Provide English language evidence (Test or Qualifying Practice/Education)',
        description: 'Submit proof of English proficiency: IELTS Academic (Overall 7.0, L7, R7, S7, W6.5) or OET (Listening B, Reading B, Speaking B, Writing C+), or qualifying practice/education route.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC',
        officialSourceName: 'NMC English Language Policy',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/english-language-requirements/',
        lastVerifiedDate: 'August 2026',
        warningNote: 'Check whether your education or practice already meets the NMC criteria before paying for an English exam.',
        order: 5
      },
      {
        id: `${jId}-task-6`,
        journeyId: jId,
        stage: 'exams',
        title: 'Take Test of Competence Part 1: Computer Based Test (CBT)',
        description: 'Once authorized by the NMC, schedule and complete the CBT (RN adult/speciality) at a Pearson VUE test center.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC / Pearson VUE',
        officialSourceName: 'Pearson VUE NMC Portal',
        officialSourceUrl: 'https://home.pearsonvue.com/nmc',
        lastVerifiedDate: 'August 2026',
        estimatedFee: 83,
        currency: 'GBP',
        order: 6
      },
      {
        id: `${jId}-task-7`,
        journeyId: jId,
        stage: 'exams',
        title: 'Take Test of Competence Part 2: OSCE (Clinical Exam in the UK)',
        description: 'Complete the Objective Structured Clinical Examination (OSCE) at an approved UK university test centre.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC Approved Test Centres',
        officialSourceName: 'NMC OSCE Guidance',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/costs-for-overseas-application/',
        lastVerifiedDate: 'August 2026',
        estimatedFee: 794,
        currency: 'GBP',
        warningNote: 'First attempt is £794; reduced resit is £397 if required.',
        order: 7
      },
      {
        id: `${jId}-task-8`,
        journeyId: jId,
        stage: 'application',
        title: 'Submit health declaration from registered medical practitioner',
        description: 'Obtain medical fitness confirmation and complete the NMC health declaration.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC',
        officialSourceName: 'NMC Health & Character',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
        lastVerifiedDate: 'August 2026',
        order: 8
      },
      {
        id: `${jId}-task-9`,
        journeyId: jId,
        stage: 'application',
        title: 'Complete NMC character declaration & police clearance checks',
        description: 'Provide police clearance certificates for all countries where you have lived for 12 months or more in the last 10 years.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC',
        officialSourceName: 'NMC Health & Character Guidance',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
        lastVerifiedDate: 'August 2026',
        order: 9
      },
      {
        id: `${jId}-task-10`,
        journeyId: jId,
        stage: 'licence',
        title: 'Complete in-person identity verification in the UK',
        description: 'Present original identity and passport documents during your OSCE test or at the NMC office.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC',
        officialSourceName: 'NMC ID Verification',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
        lastVerifiedDate: 'August 2026',
        order: 10
      },
      {
        id: `${jId}-task-11`,
        journeyId: jId,
        stage: 'licence',
        title: 'Confirm Professional Indemnity Arrangement declaration',
        description: 'Confirm that you will hold appropriate professional indemnity cover before practising as a registered nurse in the UK.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC',
        officialSourceName: 'NMC Indemnity Policy',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/',
        lastVerifiedDate: 'August 2026',
        order: 11
      },
      {
        id: `${jId}-task-12`,
        journeyId: jId,
        stage: 'licence',
        title: 'Pay NMC initial registration fee & obtain PIN',
        description: 'Pay the mandatory NMC registration fee to have your name entered onto the permanent register and receive your NMC PIN.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'NMC',
        officialSourceName: 'NMC Fee Schedule',
        officialSourceUrl: 'https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/costs-for-overseas-application/',
        lastVerifiedDate: 'August 2026',
        estimatedFee: 153,
        currency: 'GBP',
        order: 12
      },
      {
        id: `${jId}-task-13`,
        journeyId: jId,
        stage: 'employment',
        title: 'Secure NHS or Independent Healthcare Employer Sponsorship (CoS)',
        description: 'Interview with UK healthcare employers and receive your Certificate of Sponsorship for the Health and Care Worker Visa.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'UK Home Office / Employer',
        officialSourceName: 'UK Visas and Immigration (Gov.uk)',
        officialSourceUrl: 'https://www.gov.uk/health-care-worker-visa',
        lastVerifiedDate: 'August 2026',
        order: 13
      },
      {
        id: `${jId}-task-14`,
        journeyId: jId,
        stage: 'relocation',
        title: 'Apply for UK Health and Care Worker Visa',
        description: 'Submit your biometrics, TB test (if applicable), and visa application to travel to the UK.',
        status: 'Not Started',
        isRequired: true,
        regulatorName: 'UK Home Office',
        officialSourceName: 'Gov.uk Visa Guidance',
        officialSourceUrl: 'https://www.gov.uk/health-care-worker-visa',
        lastVerifiedDate: 'August 2026',
        order: 14
      }
    ];

    documents = [
      { id: `${jId}-doc-1`, journeyId: jId, name: 'Valid International Passport', category: 'Identity', description: 'Primary ID for NMC application and test booking.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-2`, journeyId: jId, name: 'Certified Nursing Degree/Diploma Certificate', category: 'Nursing Education', description: 'Primary nursing qualification certificate.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-3`, journeyId: jId, name: 'Official Academic Transcripts & Syllabus breakdown', category: 'Nursing Education', description: 'Detailed hours of theory and clinical practicum.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-4`, journeyId: jId, name: 'Certificate of Good Standing (CCPS)', category: 'Nursing Registration', description: 'Sent directly by your nursing board to the NMC.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-5`, journeyId: jId, name: 'English Language Test Certificate or Exemption Proof', category: 'English', description: 'IELTS/OET or qualifying institutional evidence.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-6`, journeyId: jId, name: 'Police Clearance Certificate(s)', category: 'Regulatory', description: 'Clearance from all countries resided in for 12+ months.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-7`, journeyId: jId, name: 'Medical Health Declaration Form', category: 'Regulatory', description: 'Signed by an authorized medical practitioner.', isApplicable: true, status: 'Need to Request' }
    ];

    costs = [
      { id: `${jId}-cost-1`, journeyId: jId, item: 'NMC Qualification Evaluation Fee', category: 'Regulator Fees', estimatedCost: 140, currency: 'GBP', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-2`, journeyId: jId, item: 'Test of Competence: CBT (Pearson VUE)', category: 'Examinations', estimatedCost: 83, currency: 'GBP', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-3`, journeyId: jId, item: 'Test of Competence: OSCE (First Attempt)', category: 'Examinations', estimatedCost: 794, currency: 'GBP', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-4`, journeyId: jId, item: 'NMC Initial Registration Fee', category: 'Registration', estimatedCost: 153, currency: 'GBP', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-5`, journeyId: jId, item: 'English Proficiency Exam (IELTS/OET - If required)', category: 'English Test', estimatedCost: 200, currency: 'GBP', amountPaid: 0, paymentStatus: 'Planned', notes: 'Verify if exempt before paying' }
    ];
  }

  // 2. CANADA (ALBERTA, ONTARIO, BC, OR OTHER)
  else if (destination === 'Canada') {
    const isAlberta = stateOrProvince.toLowerCase().includes('alberta') || stateOrProvince === 'AB';
    const isOntario = stateOrProvince.toLowerCase().includes('ontario') || stateOrProvince === 'ON';
    const isBC = stateOrProvince.toLowerCase().includes('british columbia') || stateOrProvince === 'BC';

    if (isAlberta) {
      pathwayVariant = 'CRNA Alberta Internationally Educated Nurse (IEN) Pathway';
      specialNotices.push(
        'Alberta has multiple substantial-equivalence assessment pathways. NNAS is NOT automatically required for every internationally educated applicant. Check which CRNA pathway applies before paying for an assessment.',
        'English competence may also be demonstrated through qualifying education or practice pathways. Check whether you already satisfy the requirement before paying for an English test.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Establish & confirm CRNA nursing competence assessment route',
          description: 'Explore the College of Registered Nurses of Alberta (CRNA) pathways. Determine whether you qualify for direct substantial equivalence, an approved credential review, or an alternate assessment.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'College of Registered Nurses of Alberta (CRNA)',
          officialSourceName: 'CRNA Internationally Educated Nurses Guide',
          officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
          lastVerifiedDate: 'August 2026',
          warningNote: 'CRNA provides multiple routes; NNAS is not mandatory for all applicants.',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Create CRNA College Connect account and complete initial profile',
          description: 'Register with the CRNA online portal and begin your application for registration eligibility assessment.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CRNA',
          officialSourceName: 'CRNA College Connect Portal',
          officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Submit nursing education & international registration verification',
          description: 'Submit verified transcripts and certificate of good standing from each jurisdiction where you are or have been registered.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CRNA',
          officialSourceName: 'CRNA Registration Standards',
          officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
          lastVerifiedDate: 'August 2026',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Demonstrate currency of nursing practice (recent clinical hours)',
          description: 'Provide employer verification of nursing practice hours (minimum 1,125 hours in past 5 years or 450 in past 2 years).',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CRNA',
          officialSourceName: 'CRNA Currency of Practice Policy',
          officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
          lastVerifiedDate: 'August 2026',
          order: 4
        },
        {
          id: `${jId}-task-5`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Verify English Language Proficiency requirements with CRNA',
          description: 'Confirm whether your education or practice exempts you, or provide IELTS Academic (Overall 7.0, L7.0, R6.5, W6.5, S7.0) / CELBAN.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CRNA',
          officialSourceName: 'CRNA English Proficiency Standard',
          officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
          lastVerifiedDate: 'August 2026',
          warningNote: 'Check education/practice exemptions before booking an English test.',
          order: 5
        },
        {
          id: `${jId}-task-6`,
          journeyId: jId,
          stage: 'exams',
          title: 'Pass the NCLEX-RN (if not previously taken)',
          description: 'If you have not already passed the NCLEX-RN, register via Pearson VUE upon receiving authorization from CRNA.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CRNA / NCSBN',
          officialSourceName: 'NCLEX Candidate Bulletin',
          officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 200,
          currency: 'USD',
          order: 6
        },
        {
          id: `${jId}-task-7`,
          journeyId: jId,
          stage: 'application',
          title: 'Complete Alberta Jurisprudence & Practice learning modules',
          description: 'Complete required CRNA online modules on Alberta nursing legislation, standards of practice, and ethics.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CRNA',
          officialSourceName: 'CRNA Jurisprudence',
          officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
          lastVerifiedDate: 'August 2026',
          order: 7
        },
        {
          id: `${jId}-task-8`,
          journeyId: jId,
          stage: 'application',
          title: 'Obtain Criminal Record Check with Vulnerable Sector Screening',
          description: 'Submit an approved criminal background screening report to CRNA.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CRNA / Police Service',
          officialSourceName: 'CRNA Character Screening',
          officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
          lastVerifiedDate: 'August 2026',
          order: 8
        },
        {
          id: `${jId}-task-9`,
          journeyId: jId,
          stage: 'licence',
          title: 'Obtain Professional Liability Protection (CNPS / Alberta)',
          description: 'Secure mandatory professional liability protection through the Canadian Nurses Protective Society (CNPS).',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CNPS / CRNA',
          officialSourceName: 'Canadian Nurses Protective Society',
          officialSourceUrl: 'https://www.cnps.ca/',
          lastVerifiedDate: 'August 2026',
          order: 9
        },
        {
          id: `${jId}-task-10`,
          journeyId: jId,
          stage: 'licence',
          title: 'Submit final registration declarations and pay CRNA permit fee',
          description: 'Complete declarations regarding fitness to practise and pay for your annual Alberta RN practice permit.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CRNA',
          officialSourceName: 'CRNA Practice Permits',
          officialSourceUrl: 'https://www.nurses.ab.ca/become-a-nurse/internationally-educated-nurses/',
          lastVerifiedDate: 'August 2026',
          order: 10
        },
        {
          id: `${jId}-task-11`,
          journeyId: jId,
          stage: 'employment',
          title: 'Apply for nursing opportunities with Alberta Health Services (AHS) / Covenant',
          description: 'Explore provincial RN vacancies across acute care, rural hospitals, and community care in Alberta.',
          status: 'Not Started',
          isRequired: false,
          regulatorName: 'Alberta Health Services (AHS)',
          officialSourceName: 'AHS Careers Portal',
          officialSourceUrl: 'https://careers.albertahealthservices.ca/',
          lastVerifiedDate: 'August 2026',
          order: 11
        },
        {
          id: `${jId}-task-12`,
          journeyId: jId,
          stage: 'relocation',
          title: 'Complete Canadian Work Permit / Alberta Advantage Immigration Program',
          description: 'Coordinate with employer for Labour Market Impact Assessment (LMIA) / LMIA-exempt work permit or provincial nomination.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Immigration, Refugees and Citizenship Canada (IRCC)',
          officialSourceName: 'IRCC Work Permit Portal',
          officialSourceUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html',
          lastVerifiedDate: 'August 2026',
          order: 12
        }
      ];
    } else if (isOntario) {
      pathwayVariant = 'CNO Ontario Internationally Educated Nurse Pathway';
      specialNotices.push(
        'Some internationally educated applicants may need a CNO-approved Transition to Practice course (approx. 7–14 weeks) depending on how they meet registration requirements.',
        'Passing the CNO jurisprudence examination is a mandatory requirement before final RN registration.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Review College of Nurses of Ontario (CNO) IEN Requirements',
          description: 'Understand CNO assessment requirements including education equivalence, evidence of practice, and jurisprudence.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'College of Nurses of Ontario (CNO)',
          officialSourceName: 'CNO Registration Guide',
          officialSourceUrl: 'https://www.cno.org/en/become-a-nurse/registration-requirements/',
          lastVerifiedDate: 'August 2026',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Create Maintain Your Membership (MYO) CNO portal application',
          description: 'Submit initial application details and pay the CNO evaluation fee.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CNO',
          officialSourceName: 'CNO Online Portal',
          officialSourceUrl: 'https://www.cno.org/en/become-a-nurse/registration-requirements/',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Submit nursing education and registration verification to CNO',
          description: 'Coordinate with your international school and regulatory bodies to submit official documentation.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CNO',
          officialSourceName: 'CNO Evidence Requirements',
          officialSourceUrl: 'https://www.cno.org/en/become-a-nurse/registration-requirements/',
          lastVerifiedDate: 'August 2026',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'exams',
          title: 'Pass the NCLEX-RN for Ontario',
          description: 'Complete the NCLEX-RN exam with Pearson VUE upon authorization from the CNO.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CNO / NCSBN',
          officialSourceName: 'NCSBN NCLEX Portal',
          officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 200,
          currency: 'USD',
          order: 4
        },
        {
          id: `${jId}-task-5`,
          journeyId: jId,
          stage: 'exams',
          title: 'Complete CNO RN Jurisprudence Examination',
          description: 'Complete the open-book online Ontario Jurisprudence examination covering provincial nursing legislation and standards.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CNO',
          officialSourceName: 'CNO Jurisprudence Guidelines',
          officialSourceUrl: 'https://www.cno.org/en/become-a-nurse/registration-requirements/',
          lastVerifiedDate: 'August 2026',
          order: 5
        },
        {
          id: `${jId}-task-6`,
          journeyId: jId,
          stage: 'application',
          title: 'Complete Transition to Practice course (if determined necessary by CNO)',
          description: 'Complete a CNO-approved Transition to Practice course (informational estimate ~7–14 weeks) if required by your assessment.',
          status: 'Not Started',
          isRequired: false,
          regulatorName: 'CNO Approved Providers',
          officialSourceName: 'CNO Transition to Practice',
          officialSourceUrl: 'https://www.cno.org/en/become-a-nurse/registration-requirements/',
          lastVerifiedDate: 'August 2026',
          warningNote: 'Informational estimate ~7-14 weeks; verify if required for your specific file.',
          order: 6
        },
        {
          id: `${jId}-task-7`,
          journeyId: jId,
          stage: 'licence',
          title: 'Provide evidence of Canadian work authorization & pay registration fee',
          description: 'Show legal authorization to practice in Canada and pay annual CNO RN membership dues.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CNO',
          officialSourceName: 'CNO Membership Fees',
          officialSourceUrl: 'https://www.cno.org/en/become-a-nurse/registration-requirements/',
          lastVerifiedDate: 'August 2026',
          order: 7
        }
      ];
    } else if (isBC) {
      pathwayVariant = 'BCCNM British Columbia Internationally Educated Nurse Pathway';
      const hasComparableHistory = isPractisingInUK || isRegisteredInUK || isPractisingInAU || isPractisingInNZ;

      if (hasComparableHistory) {
        specialNotices.push(
          'Your current registration or practice history (UK, Australia, New Zealand) may affect your BC assessment pathway. Check BCCNM\'s current internationally educated nurse pathway before beginning the generic assessment process.'
        );
      } else {
        specialNotices.push(
          'BCCNM evaluates IENs through credential assessment, English proficiency, and nursing competency assessments where applicable.'
        );
      }

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Review BCCNM IEN application pathways & comparable jurisdiction policies',
          description: 'Assess whether your UK/Australia/NZ or other overseas credentials qualify for expedited review or standard assessment.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'British Columbia College of Nurses and Midwives (BCCNM)',
          officialSourceName: 'BCCNM International Nurse Portal',
          officialSourceUrl: 'https://www.bccnm.ca/RN/applications_registration/Pages/international_nurse.aspx',
          lastVerifiedDate: 'August 2026',
          warningNote: hasComparableHistory ? 'Check BCCNM policy for UK/AU/NZ registered nurses.' : undefined,
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Submit BCCNM application & identity/education verification',
          description: 'Create your BCCNM account and submit required educational and professional documentation.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'BCCNM',
          officialSourceName: 'BCCNM Applications',
          officialSourceUrl: 'https://www.bccnm.ca/RN/applications_registration/Pages/international_nurse.aspx',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Demonstrate English language competence (IELTS Overall 7.0 / CELBAN / Education route)',
          description: 'Submit proof of English proficiency: IELTS Academic (Overall 7.0, R6.5, L7.0, W6.5, S7.0) or qualifying education/practice.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'BCCNM',
          officialSourceName: 'BCCNM English Language Standard',
          officialSourceUrl: 'https://www.bccnm.ca/RN/applications_registration/Pages/international_nurse.aspx',
          lastVerifiedDate: 'August 2026',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'exams',
          title: 'Complete NCLEX-RN and BCCNM Competency Assessment (if assigned)',
          description: 'Take the NCLEX-RN registration examination and any required clinical competency assessment.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'BCCNM / NCSBN',
          officialSourceName: 'BCCNM Examinations',
          officialSourceUrl: 'https://www.bccnm.ca/RN/applications_registration/Pages/international_nurse.aspx',
          lastVerifiedDate: 'August 2026',
          order: 4
        },
        {
          id: `${jId}-task-5`,
          journeyId: jId,
          stage: 'licence',
          title: 'Complete BC Criminal Record Check & finalize BCCNM Practising RN licence',
          description: 'Submit British Columbia Criminal Record Review Act check and pay initial practising registration fees.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'BCCNM',
          officialSourceName: 'BCCNM Registration Guidelines',
          officialSourceUrl: 'https://www.bccnm.ca/RN/applications_registration/Pages/international_nurse.aspx',
          lastVerifiedDate: 'August 2026',
          order: 5
        }
      ];
    } else {
      // Generic Canadian Province
      pathwayVariant = 'Generic Canadian Provincial Nursing Pathway';
      specialNotices.push(
        'Detailed NursePath provincial guidance is currently optimized for Alberta, Ontario, and British Columbia. For other provinces, verify requirements directly with your provincial nursing college.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Confirm target Provincial Nursing College international requirements',
          description: 'Contact the provincial regulator for your chosen province to confirm their specific substantial-equivalence assessment process.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Provincial Nursing Regulator',
          officialSourceName: 'Canadian Provincial Nursing Regulatory Bodies',
          officialSourceUrl: '',
          lastVerifiedDate: 'August 2026',
          warningNote: 'Check the regulator for the latest provincial requirements.',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Submit credentials evaluation to designated assessment body',
          description: 'Submit your transcripts and international nursing registration documents.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Provincial Regulator / Assessment Body',
          officialSourceName: 'Official link pending verification',
          officialSourceUrl: '',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'exams',
          title: 'Pass NCLEX-RN and provincial jurisprudence examination',
          description: 'Complete registration testing as mandated by the provincial regulatory body.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Provincial Regulator',
          officialSourceName: 'Official link pending verification',
          officialSourceUrl: '',
          lastVerifiedDate: 'August 2026',
          order: 3
        }
      ];
    }

    documents = [
      { id: `${jId}-doc-1`, journeyId: jId, name: 'Valid International Passport', category: 'Identity', description: 'Government-issued photo identification.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-2`, journeyId: jId, name: 'Nursing Degree Certificate & Official Transcripts', category: 'Nursing Education', description: 'Issued directly by the educational institution.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-3`, journeyId: jId, name: 'Detailed Course Breakdown / Clinical Hours Syllabus', category: 'Nursing Education', description: 'Curriculum outlining theory and clinical practicum hours.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-4`, journeyId: jId, name: 'Verification of Nursing Registration / Good Standing', category: 'Nursing Registration', description: 'From all current and previous licensing bodies.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-5`, journeyId: jId, name: 'Employer Clinical Practice Hours Verification', category: 'Employment', description: 'Verification of clinical nursing hours within past 5 years.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-6`, journeyId: jId, name: 'English Language Competence Evidence (if applicable)', category: 'English', description: 'IELTS Academic, CELBAN, or approved education route.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-7`, journeyId: jId, name: 'Criminal Record Check with Vulnerable Sector Screening', category: 'Regulatory', description: 'Official police check for healthcare licensing.', isApplicable: true, status: 'Need to Request' }
    ];

    costs = [
      { id: `${jId}-cost-1`, journeyId: jId, item: 'Provincial College Assessment / Application Fee', category: 'Regulator Fees', estimatedCost: 450, currency: 'CAD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-2`, journeyId: jId, item: 'NCLEX-RN Registration (Pearson VUE)', category: 'Examinations', estimatedCost: 200, currency: 'USD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-3`, journeyId: jId, item: 'Provincial Jurisprudence Examination', category: 'Examinations', estimatedCost: 100, currency: 'CAD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-4`, journeyId: jId, item: 'Professional Liability Protection (CNPS)', category: 'Registration', estimatedCost: 180, currency: 'CAD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-5`, journeyId: jId, item: 'Annual Provincial RN Practice Permit', category: 'Registration', estimatedCost: 550, currency: 'CAD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' }
    ];
  }

  // 3. UNITED STATES (TEXAS, NY, CA, FL, OR OTHER)
  else if (destination === 'USA') {
    const isTexas = stateOrProvince.toLowerCase().includes('texas') || stateOrProvince === 'TX';
    const isNY = stateOrProvince.toLowerCase().includes('new york') || stateOrProvince === 'NY';
    const isCA = stateOrProvince.toLowerCase().includes('california') || stateOrProvince === 'CA';
    const isFL = stateOrProvince.toLowerCase().includes('florida') || stateOrProvince === 'FL';

    specialNotices.push(
      'Licensing is not immigration: Passing NCLEX-RN or obtaining a state nursing licence does not automatically give permission to live or work in the United States. Professional licensing and immigration/work authorisation are separate processes.',
      'The USA does NOT have one national RN licence. Licensure is strictly controlled by individual state nursing regulatory bodies.'
    );

    if (isTexas) {
      pathwayVariant = 'Texas Board of Nursing (BON) Licensure by Examination / Endorsement';
      specialNotices.push(
        'Texas has specific recent education/practice eligibility rules for internationally educated examination applicants. Verify these directly before applying.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Review Texas Board of Nursing (BON) internationally educated rules',
          description: 'Review Texas BON eligibility guidelines, recent practice/education currency rules, and required documentation.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Texas Board of Nursing',
          officialSourceName: 'Texas BON Licensure Examination Guide',
          officialSourceUrl: 'https://www.bon.texas.gov/licensure_examination.asp',
          lastVerifiedDate: 'August 2026',
          warningNote: 'Texas requires specific recent education/practice verification.',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Apply for International Credential Evaluation Service (CES)',
          description: 'Order a Course-by-Course Credential Evaluation Service (CES) report from CGFNS, ERES, or other Texas BON approved evaluators.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Approved Credential Evaluator / Texas BON',
          officialSourceName: 'Texas BON Credential Evaluation Policy',
          officialSourceUrl: 'https://www.bon.texas.gov/licensure_examination.asp',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'application',
          title: 'Submit Texas Board of Nursing Application & fee ($75)',
          description: 'Complete the online application for Texas RN licensure via the Texas Nurse Portal and pay the application fee.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Texas Board of Nursing',
          officialSourceName: 'Texas Nurse Portal',
          officialSourceUrl: 'https://www.bon.texas.gov/licensure_examination.asp',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 75,
          currency: 'USD',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'application',
          title: 'Complete FBI & Texas DPS Fingerprint Criminal Background Check',
          description: 'Submit electronic fingerprints via IdentoGO (or hard fingerprint card if out of country).',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Texas BON / IdentoGO',
          officialSourceName: 'Texas BON Background Checks',
          officialSourceUrl: 'https://www.bon.texas.gov/licensure_examination.asp',
          lastVerifiedDate: 'August 2026',
          order: 4
        },
        {
          id: `${jId}-task-5`,
          journeyId: jId,
          stage: 'exams',
          title: 'Pass Texas Nursing Jurisprudence Examination (NJE)',
          description: 'Take the Texas online 50-question open-book Nursing Jurisprudence Exam on Texas nursing practice acts and Board rules.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Texas Board of Nursing',
          officialSourceName: 'Texas NJE Portal',
          officialSourceUrl: 'https://www.bon.texas.gov/licensure_examination.asp',
          lastVerifiedDate: 'August 2026',
          order: 5
        },
        {
          id: `${jId}-task-6`,
          journeyId: jId,
          stage: 'exams',
          title: 'Register with Pearson VUE & receive Authorization to Test (ATT)',
          description: 'Register for the NCLEX-RN ($200 + $150 international scheduling if outside US) and await Board ATT approval.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Pearson VUE / NCSBN',
          officialSourceName: 'NCLEX Candidate Services',
          officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 350,
          currency: 'USD',
          order: 6
        },
        {
          id: `${jId}-task-7`,
          journeyId: jId,
          stage: 'exams',
          title: 'Take NCLEX-RN and receive Texas RN license outcome',
          description: 'Sit for the NCLEX-RN exam. Upon passing and verification of all requirements, Texas BON issues your RN license number.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Texas Board of Nursing',
          officialSourceName: 'Texas BON Licensure',
          officialSourceUrl: 'https://www.bon.texas.gov/licensure_examination.asp',
          lastVerifiedDate: 'August 2026',
          order: 7
        },
        {
          id: `${jId}-task-8`,
          journeyId: jId,
          stage: 'employment',
          title: 'Obtain US Healthcare Sponsorship & VisaScreen Certificate',
          description: 'Secure hospital employer sponsorship (EB-3 immigrant visa or qualifying status) and obtain CGFNS VisaScreen certification.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CGFNS / US Healthcare Employer',
          officialSourceName: 'CGFNS VisaScreen Portal',
          officialSourceUrl: 'https://www.cgfns.org/services/certification/visascreen-visa-credentials-assessment/',
          lastVerifiedDate: 'August 2026',
          order: 8
        }
      ];
    } else if (isNY) {
      pathwayVariant = 'New York State Education Department (NYSED) RN Pathway';

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Review NYSED Office of the Professions Foreign RN criteria',
          description: 'Examine New York requirements for foreign nursing graduates (Form 1, Form 2, Form 3, and approved credential paths).',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'NYSED Office of the Professions',
          officialSourceName: 'NYSED Registered Professional Nursing Guide',
          officialSourceUrl: 'https://www.op.nysed.gov/professions/registered-professional-nursing/license-requirements',
          lastVerifiedDate: 'August 2026',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Submit Foreign Nursing Education Verification (Form 2 / CGFNS CVS)',
          description: 'Have your nursing school send official transcripts directly to NYSED or utilize an approved verification route.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'NYSED',
          officialSourceName: 'NYSED Education Verification',
          officialSourceUrl: 'https://www.op.nysed.gov/professions/registered-professional-nursing/license-requirements',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Complete NY State required coursework (Child Abuse & Infection Control)',
          description: 'Complete approved online coursework in New York Child Abuse Reporting and Infection Control barrier precautions.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'NYSED Approved Course Providers',
          officialSourceName: 'NYSED Mandated Training',
          officialSourceUrl: 'https://www.op.nysed.gov/professions/registered-professional-nursing/license-requirements',
          lastVerifiedDate: 'August 2026',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'application',
          title: 'Submit NYSED Application for Licensure (Form 1) & fee ($143)',
          description: 'Submit your formal NY application for RN licensure and pay the $143 fee.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'NYSED',
          officialSourceName: 'NYSED Fee Schedule',
          officialSourceUrl: 'https://www.op.nysed.gov/professions/registered-professional-nursing/license-requirements',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 143,
          currency: 'USD',
          order: 4
        },
        {
          id: `${jId}-task-5`,
          journeyId: jId,
          stage: 'exams',
          title: 'Take NCLEX-RN and receive New York RN Licensure',
          description: 'Register with Pearson VUE upon NYSED authorization and pass the NCLEX-RN.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Pearson VUE / NYSED',
          officialSourceName: 'NCLEX Portal',
          officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 200,
          currency: 'USD',
          order: 5
        }
      ];
    } else if (isCA) {
      pathwayVariant = 'California Board of Registered Nursing (BRN) International Pathway';
      specialNotices.push(
        'California performs detailed education review. Do not assume eligibility based solely on holding another nursing licence.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Review California BRN international education breakdown requirements',
          description: 'California BRN requires detailed breakdown of theory and clinical hours across medical-surgical, obstetrics, pediatrics, and psychiatric nursing.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'California Board of Registered Nursing (BRN)',
          officialSourceName: 'California BRN International Graduate Guide',
          officialSourceUrl: 'https://www.rn.ca.gov/applicants/lic-exam.shtml',
          lastVerifiedDate: 'August 2026',
          warningNote: 'Do not assume eligibility solely on holding an active license elsewhere.',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'application',
          title: 'Submit California BRN International Graduate Application ($750)',
          description: 'Submit your online application via the California BreEZe portal and pay the examination application fee.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'California BRN',
          officialSourceName: 'California BreEZe Portal',
          officialSourceUrl: 'https://www.rn.ca.gov/applicants/lic-exam.shtml',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 750,
          currency: 'USD',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Submit official certified transcripts & detailed course syllabus',
          description: 'Must be sent directly by your university registrar to the California BRN.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'California BRN',
          officialSourceName: 'California BRN Transcript Guidelines',
          officialSourceUrl: 'https://www.rn.ca.gov/applicants/lic-exam.shtml',
          lastVerifiedDate: 'August 2026',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'exams',
          title: 'Pass NCLEX-RN and receive California RN registration',
          description: 'Complete NCLEX-RN once California BRN evaluates and approves your educational equivalency.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'California BRN / Pearson VUE',
          officialSourceName: 'NCLEX Portal',
          officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 200,
          currency: 'USD',
          order: 4
        }
      ];
    } else if (isFL) {
      pathwayVariant = 'Florida Board of Nursing (FBON) RN Licensure by Examination Pathway';
      specialNotices.push(
        'Florida Board of Nursing requires electronic Livescan fingerprint background screening via an FDLE approved vendor with Florida ORI number (EDOH4420Z).',
        'Florida accepts credential evaluation reports from approved agencies including Josef Silny & Associates, CGFNS CES, SpanTran, and IERF.',
        'A US Social Security Number is required for final Florida license activation; examination approval (ATT) can be issued prior to having an SSN.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Review Florida Board of Nursing (FBON) Foreign Educated Requirements',
          description: 'Review Florida MQA guidelines for internationally educated registered nurse applicants, approved credential evaluators, and English proficiency standards.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Florida Board of Nursing',
          officialSourceName: 'Florida Board of Nursing Examination Guide',
          officialSourceUrl: 'https://floridasnursing.gov/licensing/licensed-practical-nurse-registered-nurse-by-examination/',
          lastVerifiedDate: 'August 2026',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Submit Foreign Credential Evaluation Report to Florida BON',
          description: 'Order a course-by-course credentials evaluation from an FBON-approved agency: Josef Silny & Associates, CGFNS CES, SpanTran, or IERF.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Approved Evaluator / Florida BON',
          officialSourceName: 'Florida Approved Credential Evaluation Services',
          officialSourceUrl: 'https://floridasnursing.gov/licensing/licensed-practical-nurse-registered-nurse-by-examination/',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Provide English Language Proficiency Evidence',
          description: 'Submit passing score for IELTS Academic (6.5 overall, 7.0 speaking), TOEFL iBT (83 total, 26 speaking), or proof of nursing education completed in English.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Florida Board of Nursing',
          officialSourceName: 'Florida BON English Requirements',
          officialSourceUrl: 'https://floridasnursing.gov/licensing/licensed-practical-nurse-registered-nurse-by-examination/',
          lastVerifiedDate: 'August 2026',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'application',
          title: 'Submit Florida BON Online Licensure Application via MQA Portal ($110)',
          description: 'Submit your formal Florida RN Licensure by Examination application through the Florida Department of Health MQA Online Services portal.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Florida Board of Nursing (MQA)',
          officialSourceName: 'Florida MQA Online Services',
          officialSourceUrl: 'https://floridasnursing.gov/licensing/licensed-practical-nurse-registered-nurse-by-examination/',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 110,
          currency: 'USD',
          order: 4
        },
        {
          id: `${jId}-task-5`,
          journeyId: jId,
          stage: 'application',
          title: 'Complete Florida Electronic Livescan Fingerprinting (ORI # EDOH4420Z)',
          description: 'Submit electronic fingerprints through a Florida Department of Law Enforcement (FDLE) approved Livescan vendor using Florida Board ORI code EDOH4420Z.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'FDLE / Florida BON',
          officialSourceName: 'Florida Background Screening Portal',
          officialSourceUrl: 'https://floridasnursing.gov/licensing/licensed-practical-nurse-registered-nurse-by-examination/',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 85,
          currency: 'USD',
          order: 5
        },
        {
          id: `${jId}-task-6`,
          journeyId: jId,
          stage: 'exams',
          title: 'Register with Pearson VUE for NCLEX-RN & receive Florida ATT ($200)',
          description: 'Register with Pearson VUE for the NCLEX-RN ($200 fee) and receive your Authorization to Test (ATT) from the Florida Board of Nursing.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Pearson VUE / NCSBN',
          officialSourceName: 'NCSBN NCLEX Portal',
          officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 200,
          currency: 'USD',
          order: 6
        },
        {
          id: `${jId}-task-7`,
          journeyId: jId,
          stage: 'licence',
          title: 'Pass NCLEX-RN and submit SSN for Florida RN License Activation',
          description: 'Sit for and pass the NCLEX-RN examination. Provide your US Social Security Number (SSN) to Florida BON for final issuance of your permanent Florida RN License.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Florida Board of Nursing',
          officialSourceName: 'Florida BON License Portal',
          officialSourceUrl: 'https://floridasnursing.gov/licensing/licensed-practical-nurse-registered-nurse-by-examination/',
          lastVerifiedDate: 'August 2026',
          order: 7
        },
        {
          id: `${jId}-task-8`,
          journeyId: jId,
          stage: 'employment',
          title: 'Obtain US Healthcare Hospital Sponsorship & CGFNS VisaScreen',
          description: 'Secure hospital employer sponsorship in Florida (EB-3 visa or relevant work visa) and complete CGFNS VisaScreen certification for US immigration.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'CGFNS / Florida Healthcare Employer',
          officialSourceName: 'CGFNS VisaScreen Portal',
          officialSourceUrl: 'https://www.cgfns.org/services/certification/visascreen-visa-credentials-assessment/',
          lastVerifiedDate: 'August 2026',
          order: 8
        }
      ];
    } else {
      // Other US State (Generic)
      pathwayVariant = 'Generic US State Board of Nursing Pathway';
      specialNotices.push(
        'Detailed NursePath state guidance is not available for this state yet. Follow the general US Board pathway and verify specific requirements directly with your state Board of Nursing.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Identify target State Board of Nursing foreign nurse criteria',
          description: 'Visit the official website of your target State Board of Nursing to determine accepted credential evaluators and English requirements.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Target State Board of Nursing',
          officialSourceName: 'State Board of Nursing Portal',
          officialSourceUrl: '',
          lastVerifiedDate: 'August 2026',
          warningNote: 'Check the regulator for the latest state requirements.',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Obtain Credential Evaluation (e.g. CGFNS CES / ERES / Josef Silny)',
          description: 'Order course-by-course evaluation according to your target Board specifications.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Approved Credential Evaluator',
          officialSourceName: 'Official link pending verification',
          officialSourceUrl: '',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'application',
          title: 'Submit State Board application & fingerprint background screening',
          description: 'File initial licensure application and submit background check materials.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'State Board of Nursing',
          officialSourceName: 'Official link pending verification',
          officialSourceUrl: '',
          lastVerifiedDate: 'August 2026',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'exams',
          title: 'Take NCLEX-RN Examination with Pearson VUE',
          description: 'Register with Pearson VUE, receive Authorization to Test (ATT), and pass the NCLEX-RN.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Pearson VUE / NCSBN',
          officialSourceName: 'NCSBN NCLEX Portal',
          officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 200,
          currency: 'USD',
          order: 4
        }
      ];
    }

    documents = [
      { id: `${jId}-doc-1`, journeyId: jId, name: 'Valid International Passport', category: 'Identity', description: 'Primary identification.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-2`, journeyId: jId, name: 'Official Nursing Transcripts & Degree Certificate', category: 'Nursing Education', description: 'Sent directly from nursing institution.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-3`, journeyId: jId, name: 'Foreign Credential Evaluation Report (CES)', category: 'Regulatory', description: 'From CGFNS, Josef Silny, SpanTran, or Board-approved agency.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-4`, journeyId: jId, name: 'Verification of Professional Licensure (Good Standing)', category: 'Nursing Registration', description: 'Direct verification from all licensing boards.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-5`, journeyId: jId, name: 'Fingerprint Screening Card / Electronic LiveScan', category: 'Regulatory', description: 'FBI and state criminal background check.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-6`, journeyId: jId, name: 'English Competency Test Score (if required)', category: 'English', description: 'IELTS / TOEFL score report.', isApplicable: true, status: 'Need to Request' }
    ];

    costs = [
      { id: `${jId}-cost-1`, journeyId: jId, item: 'Credential Evaluation Service (CES / Josef Silny)', category: 'Credential Evaluation', estimatedCost: 385, currency: 'USD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-2`, journeyId: jId, item: 'State Board of Nursing Application Fee', category: 'Regulator Fees', estimatedCost: isTexas ? 75 : isNY ? 143 : isCA ? 750 : isFL ? 110 : 150, currency: 'USD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-3`, journeyId: jId, item: 'NCLEX-RN Registration (Pearson VUE)', category: 'Examinations', estimatedCost: 200, currency: 'USD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-4`, journeyId: jId, item: 'NCLEX International Scheduling Surcharge (if tested outside US)', category: 'Examinations', estimatedCost: 150, currency: 'USD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-5`, journeyId: jId, item: 'FBI / State Fingerprint Background Screening', category: 'Police / Background Checks', estimatedCost: isFL ? 85 : 65, currency: 'USD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' }
    ];
  }

  // 4. AUSTRALIA (NMBA / Ahpra)
  else if (destination === 'Australia') {
    const isComparableCountry = (country: string) => {
      const c = (country || '').toLowerCase();
      return (
        c.includes('united kingdom') || c.includes('uk') ||
        c.includes('ireland') ||
        c.includes('united states') || c.includes('usa') || c.includes('us') ||
        c.includes('singapore') ||
        c.includes('spain') ||
        c.includes('new zealand') || c.includes('nz') ||
        c.includes('british columbia') || c.includes('ontario') || c.includes('canada')
      );
    };

    // Official Ahpra streamlined route requires at least 1,800 RN practice hours in an approved comparable jurisdiction since January 2017
    const hasComparableReg = registrations.some(r => isComparableCountry(r.country) && (r.status === 'Active' || r.status === 'Pending'));
    const isPracticeInComparable = isComparableCountry(currentPractice);
    const hasSufficientPracticeHours = experienceYears >= 1 && (profile.currentlyPractisingClinically !== false);
    
    // Candidate qualifies for potential streamlined assessment if they hold registration AND have completed 1,800+ practice hours in an approved comparable jurisdiction
    const qualifiesStreamlined = (hasComparableReg || isPracticeInComparable) && isPracticeInComparable && hasSufficientPracticeHours;

    if (qualifiesStreamlined) {
      pathwayVariant = 'Pathway A — Potential Streamlined IQRN Assessment (NMBA)';
      specialNotices.push(
        'Potential streamlined pathway identified: Your clinical practice history indicates you may meet the NMBA streamlined IQRN standard (requiring at least 1,800 RN practice hours in an approved comparable jurisdiction since January 2017). This is an advisory assessment, not a formal determination.',
        'Official approved comparable jurisdictions: UK, Ireland, USA, Canada (BC/Ontario), Singapore, Spain, and New Zealand. Always complete the official Ahpra Self-Check to confirm your stream.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Complete Ahpra Self-Check & review Streamlined IQRN criteria',
          description: 'Access the NMBA Self-Check online tool. Enter your qualification and practice details in approved comparable jurisdictions to confirm your designated stream.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Nursing and Midwifery Board of Australia (NMBA) / Ahpra',
          officialSourceName: 'Ahpra IQNM Assessment Portal',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
          lastVerifiedDate: 'August 2026',
          warningNote: 'Check Streamlined criteria (1,800+ practice hours since Jan 2017) before initiating Outcomes-Based Assessment.',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Gather proof of 1,800+ hours RN practice in comparable jurisdiction since Jan 2017',
          description: 'Obtain official Statement of Service letters from healthcare employers in an approved comparable jurisdiction confirming at least 1,800 clinical RN hours completed since January 2017.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Ahpra / NMBA',
          officialSourceName: 'NMBA Recency of Practice Standard',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Provide English language evidence (IELTS 7.0 all bands / OET B / PTE Overall 65: L66, R66, S66, W56)',
          description: 'Demonstrate English competency via IELTS Academic (7.0 all components), OET (B all components), PTE Academic (Overall 65: Listening 66, Reading 66, Speaking 66, Writing 56 - updated April 2026 NMBA standard), or qualifying primary language pathway.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'NMBA',
          officialSourceName: 'NMBA English Language Skills Standard',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-Standards/English-language-skills.aspx',
          lastVerifiedDate: 'August 2026',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'application',
          title: 'Complete Ahpra Orientation Part 1 (Online Learning)',
          description: 'Complete the online introductory orientation module on the Australian healthcare system and nursing practice.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Ahpra',
          officialSourceName: 'Ahpra Orientation Portal',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
          lastVerifiedDate: 'August 2026',
          order: 4
        },
        {
          id: `${jId}-task-5`,
          journeyId: jId,
          stage: 'application',
          title: 'Submit formal application for Australian RN Registration to Ahpra',
          description: 'Submit certified identity, fitness, and practice documents along with the Ahpra application fee.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Ahpra',
          officialSourceName: 'Ahpra Schedule of Fees',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/Fees.aspx',
          lastVerifiedDate: 'August 2026',
          order: 5
        },
        {
          id: `${jId}-task-6`,
          journeyId: jId,
          stage: 'licence',
          title: 'Complete in-person Identity Verification in Australia',
          description: 'Present original identity documents at an Ahpra office within Australia to finalize your registration.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Ahpra',
          officialSourceName: 'Ahpra Identity Requirements',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
          lastVerifiedDate: 'August 2026',
          order: 6
        }
      ];
    } else {
      pathwayVariant = 'Pathway B — Outcomes-Based Assessment (OBA) Route (NMBA)';
      specialNotices.push(
        'Standard Outcomes-Based Assessment (OBA) involves two parts: NCLEX-RN (MCQ) and the Australian RN OSCE clinical exam in Adelaide (AUD $4,000 per sitting). Always verify before payment.'
      );

      tasks = [
        {
          id: `${jId}-task-1`,
          journeyId: jId,
          stage: 'research',
          title: 'Complete Ahpra Self-Check & pay Stage 1 Assessment Fee',
          description: 'Complete the online Self-Check to obtain your portfolio ID and pay the non-refundable IQNM assessment fee.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'NMBA / Ahpra',
          officialSourceName: 'Ahpra Self-Check',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
          lastVerifiedDate: 'August 2026',
          order: 1
        },
        {
          id: `${jId}-task-2`,
          journeyId: jId,
          stage: 'application',
          title: 'Complete Ahpra Orientation Part 1 (Online Learning)',
          description: 'Complete the mandatory online orientation module on Australian nursing governance and cultural safety.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Ahpra',
          officialSourceName: 'Ahpra Orientation Guidance',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
          lastVerifiedDate: 'August 2026',
          order: 2
        },
        {
          id: `${jId}-task-3`,
          journeyId: jId,
          stage: 'exams',
          title: 'Pass the NCLEX-RN (Multiple Choice Question Exam)',
          description: 'Register with Pearson VUE upon authorization from Ahpra and pass the NCLEX-RN.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Ahpra / Pearson VUE',
          officialSourceName: 'NCSBN NCLEX Portal',
          officialSourceUrl: 'https://www.ncsbn.org/nclex.page',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 350,
          currency: 'USD',
          order: 3
        },
        {
          id: `${jId}-task-4`,
          journeyId: jId,
          stage: 'exams',
          title: 'Pass Australian RN OSCE (Objective Structured Clinical Exam) in Adelaide',
          description: 'Register and sit for the clinical OSCE at the Ahpra National Simulation Centre in Adelaide, Australia.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Ahpra / NMBA',
          officialSourceName: 'Ahpra Schedule of Fees',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/Fees.aspx',
          lastVerifiedDate: 'August 2026',
          estimatedFee: 4000,
          currency: 'AUD',
          warningNote: 'Australian RN OSCE is AUD $4,000 per attempt.',
          order: 4
        },
        {
          id: `${jId}-task-5`,
          journeyId: jId,
          stage: 'credentials',
          title: 'Demonstrate NMBA English Language Standard (IELTS 7.0 / OET B / PTE Overall 65: L66, R66, S66, W56)',
          description: 'Provide valid English language test results: IELTS Academic (7.0 all bands), OET (B all components), PTE Academic (Overall 65 with min 66 in Listening, Reading, Speaking, and 56 in Writing - updated April 2026 NMBA standard), or approved educational evidence.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'NMBA',
          officialSourceName: 'NMBA English Standard',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-Standards/English-language-skills.aspx',
          lastVerifiedDate: 'August 2026',
          order: 5
        },
        {
          id: `${jId}-task-6`,
          journeyId: jId,
          stage: 'licence',
          title: 'Submit registration application & present in-person identity verification in Australia',
          description: 'Complete registration application with Ahpra and present identity documentation in person.',
          status: 'Not Started',
          isRequired: true,
          regulatorName: 'Ahpra',
          officialSourceName: 'Ahpra Registration Standards',
          officialSourceUrl: 'https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx',
          lastVerifiedDate: 'August 2026',
          order: 6
        }
      ];
    }

    documents = [
      { id: `${jId}-doc-1`, journeyId: jId, name: 'Valid International Passport', category: 'Identity', description: 'Primary ID for Ahpra and exam booking.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-2`, journeyId: jId, name: 'Nursing Degree Certificate & Full Academic Transcripts', category: 'Nursing Education', description: 'Certified copies of qualification transcripts.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-3`, journeyId: jId, name: 'Certificate of Registration Status / Good Standing', category: 'Nursing Registration', description: 'Sent directly from licensing authority to Ahpra.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-4`, journeyId: jId, name: 'Statements of Service (Clinical Practice Hours)', category: 'Employment', description: 'Employer letter detailing RN hours and clinical scope.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-5`, journeyId: jId, name: 'English Test Score (IELTS / OET / PTE)', category: 'English', description: 'Meeting NMBA English registration standard.', isApplicable: true, status: 'Need to Request' },
      { id: `${jId}-doc-6`, journeyId: jId, name: 'International Criminal History Check (Fit2Work)', category: 'Regulatory', description: 'Ahpra-approved vendor background report.', isApplicable: true, status: 'Need to Request' }
    ];

    costs = [
      { id: `${jId}-cost-1`, journeyId: jId, item: 'Ahpra IQNM Assessment / Self-Check Fee', category: 'Regulator Fees', estimatedCost: 640, currency: 'AUD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-2`, journeyId: jId, item: 'NCLEX-RN Exam Fee (Pearson VUE)', category: 'Examinations', estimatedCost: 200, currency: 'USD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-3`, journeyId: jId, item: 'Australian RN OSCE Clinical Examination (if OBA route)', category: 'Examinations', estimatedCost: 4000, currency: 'AUD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026', notes: 'Verify if exempt under Streamlined IQRN' },
      { id: `${jId}-cost-4`, journeyId: jId, item: 'Fit2Work International Criminal History Check', category: 'Police / Background Checks', estimatedCost: 175, currency: 'AUD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' },
      { id: `${jId}-cost-5`, journeyId: jId, item: 'Ahpra Initial Registration Fee', category: 'Registration', estimatedCost: 185, currency: 'AUD', amountPaid: 0, paymentStatus: 'Planned', lastVerifiedDate: 'August 2026' }
    ];
  }

  return {
    tasks,
    documents,
    costs,
    pathwayVariant,
    specialNotices
  };
}

export function calculateJourneyProgress(tasks: RoadmapTask[]): {
  overallPercentage: number;
  completedTasksCount: number;
  totalApplicableTasksCount: number;
  stageProgress: Record<RoadmapStage, { completed: number; total: number; percentage: number }>;
} {
  const applicableTasks = tasks.filter(t => t.status !== 'Not Applicable');
  const total = applicableTasks.length;
  const completed = applicableTasks.filter(t => t.status === 'Completed').length;
  const overallPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stages: RoadmapStage[] = ['research', 'credentials', 'application', 'exams', 'licence', 'employment', 'relocation'];
  const stageProgress = {} as Record<RoadmapStage, { completed: number; total: number; percentage: number }>;

  for (const s of stages) {
    const sTasks = applicableTasks.filter(t => t.stage === s);
    const sCompleted = sTasks.filter(t => t.status === 'Completed').length;
    stageProgress[s] = {
      completed: sCompleted,
      total: sTasks.length,
      percentage: sTasks.length > 0 ? Math.round((sCompleted / sTasks.length) * 100) : 0
    };
  }

  return {
    overallPercentage,
    completedTasksCount: completed,
    totalApplicableTasksCount: total,
    stageProgress
  };
}

export function calculateTotalCostsByCurrency(costs: CostItem[]): {
  currency: string;
  estimated: number;
  paid: number;
  remaining: number;
}[] {
  const summaryMap: Record<string, { estimated: number; paid: number; remaining: number }> = {};

  for (const c of costs) {
    const curr = c.currency || 'USD';
    if (!summaryMap[curr]) {
      summaryMap[curr] = { estimated: 0, paid: 0, remaining: 0 };
    }
    summaryMap[curr].estimated += c.estimatedCost || 0;
    summaryMap[curr].paid += c.amountPaid || 0;
    const rem = Math.max(0, (c.estimatedCost || 0) - (c.amountPaid || 0));
    summaryMap[curr].remaining += rem;
  }

  return Object.entries(summaryMap).map(([currency, data]) => ({
    currency,
    estimated: data.estimated,
    paid: data.paid,
    remaining: data.remaining
  }));
}

export function calculateDocumentStats(documents: DocumentItem[]): {
  total: number;
  readyOrAccepted: number;
  inProgress: number;
  needingAction: number;
  percentage: number;
} {
  const applicable = documents.filter(d => d.isApplicable && d.status !== 'Not Needed');
  const total = applicable.length;
  const readyOrAccepted = applicable.filter(d => d.status === 'Accepted' || d.status === 'Received' || d.status === 'Submitted').length;
  const inProgress = applicable.filter(d => d.status === 'Requested' || d.status === 'Waiting').length;
  const needingAction = applicable.filter(d => d.status === 'Need to Request' || d.status === 'Rejected / Action Required').length;
  const percentage = total > 0 ? Math.round((readyOrAccepted / total) * 100) : 0;

  return {
    total,
    readyOrAccepted,
    inProgress,
    needingAction,
    percentage
  };
}

