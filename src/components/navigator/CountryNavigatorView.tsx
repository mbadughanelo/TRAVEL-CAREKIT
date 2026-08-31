import React, { useState } from 'react';
import { 
  Globe2, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Award,
  FileText
} from 'lucide-react';
import { 
  COUNTRIES_DATA, 
  US_STATES_DATA, 
  CANADA_PROVINCES_DATA, 
  AUSTRALIA_STREAMS 
} from '../../data/regulatoryData';
import { CountryCode } from '../../types';

interface Props {
  onSelectDestination: (country: CountryCode, stateOrProvince?: string) => void;
  activeDestinationCountry?: CountryCode;
}

export const CountryNavigatorView: React.FC<Props> = ({
  onSelectDestination,
  activeDestinationCountry = 'Canada'
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>(activeDestinationCountry);
  const [activeTab, setActiveTab] = useState<'overview' | 'states' | 'comparison'>('overview');

  const currentCountry = COUNTRIES_DATA.find(c => c.code === selectedCountryCode) || COUNTRIES_DATA[0];

  return (
    <div id="country-navigator-view" className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 mb-1">
            <span>GLOBAL NURSING REGULATION DIRECTORY</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">VERIFIED 2026 STANDARDS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Country & Jurisdiction Navigator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Detailed regulatory criteria, exam formats, language waivers, and state/provincial differences
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-white/[0.04] border border-white/10 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg transition cursor-pointer ${
              activeTab === 'overview' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Country Details
          </button>
          <button
            onClick={() => setActiveTab('states')}
            className={`px-3.5 py-2 rounded-lg transition cursor-pointer ${
              activeTab === 'states' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            States & Provinces
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3.5 py-2 rounded-lg transition cursor-pointer ${
              activeTab === 'comparison' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Comparison Matrix
          </button>
        </div>
      </div>

      {/* Country Select Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {COUNTRIES_DATA.map((country) => {
          const isSelected = selectedCountryCode === country.code;
          return (
            <button
              key={country.code}
              onClick={() => setSelectedCountryCode(country.code)}
              className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(0,242,255,0.15)] text-white'
                  : 'glass-panel text-slate-300 hover:border-white/20'
              }`}
            >
              <span className="text-2xl">{country.flag}</span>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">{country.name}</h4>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}>
                  {country.regulatorShort}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Country Card */}
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentCountry.flag}</span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentCountry.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    {currentCountry.structure} • Regulator: <strong className="text-slate-200">{currentCountry.regulatorName}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={currentCountry.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Official Regulator Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onSelectDestination(currentCountry.code)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-[0_0_15px_rgba(0,242,255,0.4)] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Set as Active Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Grid of Key Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Qualification Standards */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Qualification & Education Standard</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {currentCountry.qualificationRule}
                </p>
              </div>

              {/* English Language Requirements */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>English Language Proficiency Standards</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {currentCountry.englishRequirements}
                </p>
              </div>

              {/* Mandatory Examinations */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Competence Examinations</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {currentCountry.examRequirements}
                </p>
              </div>

              {/* Immigration & Visa Relationship */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Globe2 className="w-4 h-4 text-purple-400" />
                  <span>Immigration & Work Visa Link</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {currentCountry.visaInformation}
                </p>
              </div>
            </div>

            {/* Estimated Total Timeline and Cost */}
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="font-bold text-cyan-300">Average Registration Timeline: </span>
                <span className="text-slate-200">{currentCountry.typicalTimeline}</span>
              </div>
              <div>
                <span className="font-bold text-cyan-300">Typical Regulatory & Exam Budget: </span>
                <span className="text-slate-200">{currentCountry.typicalCostRange}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATES & PROVINCES */}
      {activeTab === 'states' && (
        <div className="space-y-6">
          {selectedCountryCode === 'USA' && (
            <div className="space-y-4">
              <div className="glass-panel p-4 text-xs text-slate-400">
                <strong className="text-white">US State Autonomy:</strong> In the United States, each state Board of Nursing (BON) regulates its own licensing standards, SSN/ITIN requirements, English test waivers, and evaluation agencies.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {US_STATES_DATA.map((state) => (
                  <div key={state.stateName} className="glass-panel p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-base text-white">{state.stateName}</h3>
                        <span className="text-xs text-slate-400 font-medium">{state.regulatorName}</span>
                      </div>
                      <a
                        href={state.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-white/10">
                      <div><strong className="text-slate-300">SSN Requirement:</strong> {state.ssnRule}</div>
                      <div><strong className="text-slate-300">Evaluation:</strong> {state.evaluationService}</div>
                      <div><strong className="text-slate-300">English Rule:</strong> {state.englishRule}</div>
                      <div className="text-[11px] text-slate-500 italic mt-1">{state.notes}</div>
                    </div>

                    <button
                      onClick={() => onSelectDestination('USA', state.stateName)}
                      className="w-full py-2 bg-white/[0.04] hover:bg-cyan-500 hover:text-slate-950 border border-white/10 text-cyan-300 font-semibold text-xs rounded-xl transition cursor-pointer"
                    >
                      Build Roadmap for {state.stateName}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCountryCode === 'Canada' && (
            <div className="space-y-4">
              <div className="glass-panel p-4 text-xs text-slate-400">
                <strong className="text-white">Canadian Provincial Colleges:</strong> Nursing is regulated at the provincial level. Provinces like Alberta (CRNA) offer expedited pathways, while Ontario (CNO) and BC (BCCNM) have distinct evaluation tracks.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CANADA_PROVINCES_DATA.map((prov) => (
                  <div key={prov.provinceName} className="glass-panel p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-base text-white">{prov.provinceName}</h3>
                        <span className="text-xs text-slate-400 font-medium">{prov.regulatorName}</span>
                      </div>
                      <a
                        href={prov.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-white/10">
                      <div><strong className="text-slate-300">Pathway Model:</strong> {prov.pathwayModel}</div>
                      <div><strong className="text-slate-300">Assessment:</strong> {prov.evaluationService}</div>
                      <div><strong className="text-slate-300">Currency Hours:</strong> {prov.currencyRequirement}</div>
                      <div><strong className="text-slate-300">Jurisprudence:</strong> {prov.jurisprudenceExam}</div>
                      <div className="text-[11px] text-slate-500 italic mt-1">{prov.notes}</div>
                    </div>

                    <button
                      onClick={() => onSelectDestination('Canada', prov.provinceName)}
                      className="w-full py-2 bg-white/[0.04] hover:bg-cyan-500 hover:text-slate-950 border border-white/10 text-cyan-300 font-semibold text-xs rounded-xl transition cursor-pointer"
                    >
                      Build Roadmap for {prov.provinceName}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCountryCode === 'Australia' && (
            <div className="space-y-4">
              <div className="glass-panel p-4 text-xs text-slate-400">
                <strong className="text-white">Australian National Regulation:</strong> Regulated nationally by Ahpra and the NMBA. Overseas nurses follow either Stream A (Direct qualifications), Stream B (Outcome-Based Assessment: NCLEX + OSCE), or Stream C (Upgrade required).
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {AUSTRALIA_STREAMS.map((st) => (
                  <div key={st.stream} className="glass-panel p-5 space-y-2.5">
                    <span className="text-xs font-mono font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                      {st.stream}
                    </span>
                    <h3 className="font-bold text-sm text-white">{st.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{st.description}</p>
                    <div className="text-xs text-slate-300 font-medium pt-2 border-t border-white/10">
                      <strong className="text-cyan-400">Requirements:</strong> {st.requirements}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCountryCode === 'UK' && (
            <div className="glass-panel p-6 space-y-3 text-xs">
              <h3 className="text-base font-bold text-white">United Kingdom National NMC Structure</h3>
              <p className="text-slate-400 leading-relaxed">
                The UK operates a single national regulatory register through the Nursing and Midwifery Council (NMC). Registration applies universally across England, Scotland, Wales, and Northern Ireland.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div><strong className="text-slate-300">Standard Overseas Route:</strong> NMC Test of Competence (CBT online + in-person OSCE in UK).</div>
                <div><strong className="text-slate-300">English Proficiency:</strong> IELTS Academic (7.0, 6.5 writing) or OET (Grade B, C+ writing) or verified UK/exempt practice.</div>
                <div><strong className="text-slate-300">Registration Fee:</strong> £153 evaluation + £153 final registration.</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SIDE-BY-SIDE COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="glass-panel overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Global Registration Comparison Matrix</h2>
            <p className="text-xs text-slate-400">Compare key requirements, exams, and structures across all 4 major destinations</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] border-b border-white/10 text-slate-400 uppercase font-mono font-bold text-[10px]">
                <tr>
                  <th className="p-4">Criteria</th>
                  <th className="p-4">🇬🇧 United Kingdom</th>
                  <th className="p-4">🇺🇸 United States</th>
                  <th className="p-4">🇨🇦 Canada</th>
                  <th className="p-4">🇦🇺 Australia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-slate-300">
                <tr>
                  <td className="p-4 font-bold bg-white/[0.02] text-white">Regulator Model</td>
                  <td className="p-4">National (NMC)</td>
                  <td className="p-4">State-by-State (50 BONs)</td>
                  <td className="p-4">Provincial (Colleges)</td>
                  <td className="p-4">National (NMBA / Ahpra)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-white/[0.02] text-white">Primary Exam</td>
                  <td className="p-4">CBT + OSCE</td>
                  <td className="p-4">NCLEX-RN</td>
                  <td className="p-4">NCLEX-RN (+ Jurisprudence)</td>
                  <td className="p-4">NCLEX-RN + OSCE (Stream B)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-white/[0.02] text-white">Accepted English Tests</td>
                  <td className="p-4">IELTS (7.0), OET (B)</td>
                  <td className="p-4">IELTS, TOEFL, PTE (varies)</td>
                  <td className="p-4">IELTS, CELBAN, PTE, OET</td>
                  <td className="p-4">IELTS (7.0), OET (B), PTE (65)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-white/[0.02] text-white">Degree vs Diploma</td>
                  <td className="p-4">Diploma / BSc accepted</td>
                  <td className="p-4">Diploma / ADN / BSN accepted</td>
                  <td className="p-4">Substantial Equivalence</td>
                  <td className="p-4">Bachelor equivalent required</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-white/[0.02] text-white">Visa Independence</td>
                  <td className="p-4">Employer visa sponsorship</td>
                  <td className="p-4">EB-3 / H-1B (Independent)</td>
                  <td className="p-4">Work Permit / Express Entry</td>
                  <td className="p-4">TSS 482 / PR 189/190</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

