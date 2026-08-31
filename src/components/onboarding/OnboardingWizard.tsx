import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Award, 
  Stethoscope, 
  MapPin, 
  Target, 
  Plus, 
  Trash2, 
  Info, 
  AlertCircle 
} from 'lucide-react';
import { 
  UserProfile, 
  RegistrationRecord, 
  CountryCode, 
  QualificationType, 
  ExperienceTier, 
  TimelineTier 
} from '../../types';
import { COUNTRIES_DATA } from '../../data/regulatoryData';

interface Props {
  onComplete: (profile: UserProfile, destinationCountry: CountryCode, destinationStateOrProvince?: string, timeline?: TimelineTier) => void;
  onCancel: () => void;
}

const COMMON_NURSING_COUNTRIES = [
  'Nigeria', 'Philippines', 'India', 'Ghana', 'Kenya', 
  'Zimbabwe', 'South Africa', 'Jamaica', 'United Kingdom', 
  'United States', 'Canada', 'Australia', 'Pakistan', 'Nepal', 'Cameroon', 'Other'
];

const QUALIFICATIONS: QualificationType[] = [
  'Diploma in Nursing / Registered General Nurse (RGN)',
  'Associate Degree in Nursing (ADN)',
  'Bachelor of Nursing / BSc Nursing',
  'Master of Science in Nursing (MSN)',
  'Other'
];

const EXPERIENCE_TIERS: ExperienceTier[] = [
  'Less than 1 year',
  '1–2 years',
  '2–5 years',
  '5–10 years',
  '10+ years'
];

const TIMELINES: TimelineTier[] = [
  'Within 6 months',
  '6–12 months',
  '12–24 months',
  'Just researching'
];

const HELP_TOPICS = [
  'Understanding registration',
  'Choosing state/province',
  'English requirements',
  'Exams',
  'Documents',
  'Costs',
  'Finding employer',
  'Visa/Immigration'
];

export const OnboardingWizard: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [educationCountry, setEducationCountry] = useState('Nigeria');
  const [qualification, setQualification] = useState<QualificationType>('Bachelor of Nursing / BSc Nursing');
  const [yearQualified, setYearQualified] = useState<number>(2020);

  // Registrations state
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([
    { id: 'reg-1', country: 'Nigeria', status: 'Active', yearRegistered: 2020 }
  ]);

  // Practice state
  const [currentPracticeCountry, setCurrentPracticeCountry] = useState('Nigeria');
  const [experience, setExperience] = useState<ExperienceTier>('2–5 years');
  const [experienceYearsNumeric, setExperienceYearsNumeric] = useState<number>(4);
  const [currentlyPractisingClinically, setCurrentlyPractisingClinically] = useState(true);

  // Destination state
  const [destinationCountry, setDestinationCountry] = useState<CountryCode>('Canada');
  const [destinationStateOrProvince, setDestinationStateOrProvince] = useState<string>('Alberta');

  // Goals state
  const [targetTimeline, setTargetTimeline] = useState<TimelineTier>('6–12 months');
  const [targetDate, setTargetDate] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Understanding registration',
    'Choosing state/province',
    'Exams',
    'Documents',
    'Costs'
  ]);

  // Validation errors
  const [errorMessage, setErrorMessage] = useState('');

  // Handle registration items
  const addRegistration = () => {
    setRegistrations([
      ...registrations,
      {
        id: `reg-${Date.now()}`,
        country: 'United Kingdom',
        status: 'Active',
        yearRegistered: 2022
      }
    ]);
  };

  const updateRegistration = (index: number, updates: Partial<RegistrationRecord>) => {
    const updated = [...registrations];
    updated[index] = { ...updated[index], ...updates };
    setRegistrations(updated);
  };

  const removeRegistration = (index: number) => {
    if (registrations.length <= 1) return;
    setRegistrations(registrations.filter((_, i) => i !== index));
  };

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  // Step validation
  const handleNextStep = () => {
    setErrorMessage('');
    if (currentStep === 1) {
      if (!firstName.trim()) {
        setErrorMessage('Please enter your first name.');
        return;
      }
      if (!educationCountry) {
        setErrorMessage('Please select your country of initial nursing education.');
        return;
      }
      if (!yearQualified || yearQualified < 1970 || yearQualified > new Date().getFullYear() + 2) {
        setErrorMessage('Please enter a valid year of qualification.');
        return;
      }
    } else if (currentStep === 2) {
      if (registrations.length === 0) {
        setErrorMessage('Please add at least one nursing registration record.');
        return;
      }
    } else if (currentStep === 3) {
      if (!currentPracticeCountry) {
        setErrorMessage('Please select your current country of clinical practice.');
        return;
      }
    } else if (currentStep === 4) {
      if (!destinationCountry) {
        setErrorMessage('Please select a target destination country.');
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = () => {
    const userProfile: UserProfile = {
      id: `user-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim() || undefined,
      educationCountry,
      qualification,
      yearQualified: Number(yearQualified),
      registrations,
      currentPracticeCountry,
      experience,
      experienceYearsNumeric: Number(experienceYearsNumeric) || 3,
      currentlyPractisingClinically,
      helpTopics: selectedTopics,
      activeJourneyId: '',
      isDemo: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onComplete(userProfile, destinationCountry, destinationStateOrProvince, targetTimeline);
  };

  return (
    <div id="onboarding-wizard-modal" className="min-h-[85vh] flex items-center justify-center p-4 py-8">
      <div className="bg-[#090D16] rounded-2xl max-w-2xl w-full border border-white/10 shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl">
        {/* Header with Step Bar */}
        <div className="p-6 relative border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-cyan-400">Step {currentStep} of 5</span>
            </div>
            <button
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Cancel & Exit
            </button>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white">
            {currentStep === 1 && '1. Initial Nursing Education'}
            {currentStep === 2 && '2. Professional Registrations'}
            {currentStep === 3 && '3. Current Clinical Practice'}
            {currentStep === 4 && '4. Target Destination'}
            {currentStep === 5 && '5. Timeline & Key Focus'}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            {currentStep === 1 && 'Where you trained and your initial qualification.'}
            {currentStep === 2 && 'Where you hold or have held nursing licensure.'}
            {currentStep === 3 && 'Your recent practice experience and currency.'}
            {currentStep === 4 && 'Select your country, state or province.'}
            {currentStep === 5 && 'Your target timeline and areas where you need guidance.'}
          </p>

          {/* Progress Dots */}
          <div className="flex gap-2 mt-5">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.6)]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto max-h-[60vh]">
          {errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: INITIAL EDUCATION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Ada, Maria, Rajesh"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white focus:outline-none focus:border-cyan-500/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Optional"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white focus:outline-none focus:border-cyan-500/50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Country of Initial Nursing Education *
                </label>
                <select
                  value={educationCountry}
                  onChange={(e) => setEducationCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#090D16] text-white focus:outline-none focus:border-cyan-500/50 text-sm font-medium"
                >
                  {COMMON_NURSING_COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  The country where you completed your primary pre-licensure nursing curriculum.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Primary Nursing Qualification *
                </label>
                <div className="space-y-2">
                  {QUALIFICATIONS.map((qual) => (
                    <label
                      key={qual}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition text-xs font-medium ${
                        qualification === qual
                          ? 'border-cyan-500 bg-cyan-500/10 text-white font-semibold'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="qualification"
                        checked={qualification === qual}
                        onChange={() => setQualification(qual)}
                        className="text-cyan-400 focus:ring-cyan-400"
                      />
                      <span>{qual}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Year of Graduation / Initial Qualification *
                </label>
                <input
                  type="number"
                  min="1975"
                  max={new Date().getFullYear()}
                  value={yearQualified}
                  onChange={(e) => setYearQualified(Number(e.target.value))}
                  className="w-full sm:w-48 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white focus:outline-none focus:border-cyan-500/50 text-sm font-mono"
                />
              </div>
            </div>
          )}

          {/* STEP 2: REGISTRATION RECORDS */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="bg-white/[0.02] p-3 rounded-xl border border-white/10 flex items-start gap-2.5 text-xs text-slate-400">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Privacy Note:</strong> For privacy, you do not need to enter your official licence or PIN number to use NursePath. We only record jurisdiction and status for pathway evaluation.
                </span>
              </div>

              <div className="space-y-3">
                {registrations.map((reg, idx) => (
                  <div key={reg.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-300">
                        REGISTRATION #{idx + 1}
                      </span>
                      {registrations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRegistration(idx)}
                          className="text-slate-500 hover:text-red-400 text-xs p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block font-medium text-slate-400 mb-1">Country</label>
                        <select
                          value={reg.country}
                          onChange={(e) => updateRegistration(idx, { country: e.target.value })}
                          className="w-full p-2 border border-white/10 rounded-lg bg-[#090D16] text-white"
                        >
                          {COMMON_NURSING_COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-slate-400 mb-1">Status</label>
                        <select
                          value={reg.status}
                          onChange={(e) => updateRegistration(idx, { status: e.target.value as any })}
                          className="w-full p-2 border border-white/10 rounded-lg bg-[#090D16] text-white"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Expired">Expired</option>
                          <option value="In Process">In Process</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-slate-400 mb-1">Year Registered</label>
                        <input
                          type="number"
                          value={reg.yearRegistered || 2020}
                          onChange={(e) => updateRegistration(idx, { yearRegistered: Number(e.target.value) })}
                          className="w-full p-2 border border-white/10 rounded-lg bg-white/[0.03] text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addRegistration}
                className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 py-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Another Nursing Registration (e.g. UK NMC, Nigeria NMCN, UAE)</span>
              </button>
            </div>
          )}

          {/* STEP 3: CURRENT CLINICAL PRACTICE */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Country of Current Nursing Practice *
                </label>
                <select
                  value={currentPracticeCountry}
                  onChange={(e) => setCurrentPracticeCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#090D16] text-white focus:outline-none focus:border-cyan-500/50 text-sm"
                >
                  {COMMON_NURSING_COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Where you are currently employed or living.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Total Post-Qualification Nursing Experience *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXPERIENCE_TIERS.map((tier) => (
                    <label
                      key={tier}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs ${
                        experience === tier
                          ? 'border-cyan-500 bg-cyan-500/10 text-white font-semibold'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        checked={experience === tier}
                        onChange={() => setExperience(tier)}
                        className="text-cyan-400"
                      />
                      <span>{tier}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Approximate Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={experienceYearsNumeric}
                  onChange={(e) => setExperienceYearsNumeric(Number(e.target.value))}
                  className="w-full sm:w-48 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white font-mono text-sm"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Are you currently practising clinically? *
                </label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                    currentlyPractisingClinically ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300' : 'border-white/10 bg-white/[0.02] text-slate-400'
                  }`}>
                    <input
                      type="radio"
                      name="practising"
                      checked={currentlyPractisingClinically === true}
                      onChange={() => setCurrentlyPractisingClinically(true)}
                      className="mr-2"
                    />
                    <span>Yes (Active Practice)</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                    !currentlyPractisingClinically ? 'border-amber-500 bg-amber-500/10 text-amber-300' : 'border-white/10 bg-white/[0.02] text-slate-400'
                  }`}>
                    <input
                      type="radio"
                      name="practising"
                      checked={currentlyPractisingClinically === false}
                      onChange={() => setCurrentlyPractisingClinically(false)}
                      className="mr-2"
                    />
                    <span>No (Career Break / Non-clinical)</span>
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Currency of practice (clinical hours in past 2–5 years) is a standard requirement for UK, Canada, Australia, and US boards.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: DESTINATION & JURISDICTION */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Select Target Destination Country *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {COUNTRIES_DATA.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setDestinationCountry(c.code);
                        if (c.code === 'Canada') setDestinationStateOrProvince('Alberta');
                        else if (c.code === 'USA') setDestinationStateOrProvince('Texas');
                        else setDestinationStateOrProvince('');
                      }}
                      className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                        destinationCountry === c.code
                          ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,242,255,0.15)]'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{c.flag}</span>
                      <span className="font-bold text-sm text-white block">{c.name}</span>
                      <span className="text-[11px] text-slate-400 block">{c.regulatorShort}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* USA States Drilldown */}
              {destinationCountry === 'USA' && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                  <label className="block text-xs font-bold text-slate-300">
                    Select Target US State Board of Nursing
                  </label>
                  <select
                    value={destinationStateOrProvince}
                    onChange={(e) => setDestinationStateOrProvince(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-[#090D16] text-white text-xs font-medium"
                  >
                    <option value="Texas">Texas (Texas Board of Nursing - TBON)</option>
                    <option value="New York">New York (NYSED Office of the Professions)</option>
                    <option value="California">California (California Board of Registered Nursing)</option>
                    <option value="Florida">Florida (Florida Board of Nursing)</option>
                    <option value="Illinois">Illinois (IDFPR)</option>
                    <option value="Not sure yet">Not sure yet (General US Pathway)</option>
                    <option value="Other State">Other US State</option>
                  </select>
                  <p className="text-[11px] text-slate-400">
                    Each state board has distinct SSN/ITIN requirements, credential evaluation services, and English waiver criteria.
                  </p>
                </div>
              )}

              {/* Canada Province Drilldown */}
              {destinationCountry === 'Canada' && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                  <label className="block text-xs font-bold text-slate-300">
                    Select Canadian Province
                  </label>
                  <select
                    value={destinationStateOrProvince}
                    onChange={(e) => setDestinationStateOrProvince(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-[#090D16] text-white text-xs font-medium"
                  >
                    <option value="Alberta">Alberta (College of Registered Nurses of Alberta - CRNA)</option>
                    <option value="Ontario">Ontario (College of Nurses of Ontario - CNO)</option>
                    <option value="British Columbia">British Columbia (BC College of Nurses and Midwives - BCCNM)</option>
                    <option value="Nova Scotia">Nova Scotia (NSCN Expedited Pathway)</option>
                    <option value="Not sure yet">Not sure yet (National NNAS / Provincial)</option>
                    <option value="Other Province">Other Canadian Province</option>
                  </select>
                  <p className="text-[11px] text-slate-400">
                    Alberta (CRNA) offers streamlined direct competence pathways for internationally educated nurses from approved jurisdictions.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: TIMELINE & GOALS */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Target Timeline *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TIMELINES.map((t) => (
                    <label
                      key={t}
                      className={`p-3 rounded-xl border cursor-pointer text-xs ${
                        targetTimeline === t
                          ? 'border-cyan-500 bg-cyan-500/10 font-bold text-cyan-300'
                          : 'border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        checked={targetTimeline === t}
                        onChange={() => setTargetTimeline(t)}
                        className="mr-2"
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  What help topics are you most focused on?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {HELP_TOPICS.map((topic) => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-semibold'
                            : 'bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/[0.05]'
                        }`}
                      >
                        <span>{topic}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Regulatory safety reminder */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-200 rounded-xl text-[11px] leading-relaxed">
                <strong className="text-amber-300">Important:</strong> Generating your roadmap will create a structured plan based on official regulator guidelines. Always confirm specifics directly with official portals before paying fees.
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 rounded-xl cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl transition duration-200 shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer"
          >
            <span>{currentStep === 5 ? 'Create My Roadmap' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
