import React from 'react';
import { 
  MapPin, 
  FileCheck, 
  Calculator, 
  Globe2, 
  Send, 
  Sparkles, 
  BookmarkCheck, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { COUNTRIES_DATA } from '../../data/regulatoryData';

interface Props {
  onStartOnboarding: () => void;
  onExploreCountries: () => void;
  onLoadDemo: () => void;
  onOpenDisclaimerModal: () => void;
}

export const LandingPage: React.FC<Props> = ({
  onStartOnboarding,
  onExploreCountries,
  onLoadDemo,
  onOpenDisclaimerModal
}) => {
  return (
    <div id="landing-page-view" className="min-h-screen bg-[#030305] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Ambient background glow elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="orbit-ring w-[600px] h-[600px] -top-32 -left-32 animate-spin" style={{ animationDuration: '80s' }} />
        <div className="orbit-ring w-[800px] h-[800px] top-1/3 -right-64 animate-spin" style={{ animationDuration: '120s', animationDirection: 'reverse' }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Regulatory badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold shadow-[0_0_15px_rgba(0,242,255,0.2)]">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>VERIFIED 2026 REGULATORY DATA & DETERMINISTIC PATHWAYS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Your international nursing career, <span className="text-cyan-400 glow-text">mapped clearly.</span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
              Stop guessing your international nursing pathway. Plan it. Track it. Achieve it.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Understand your registration pathway, track your documents, estimate your costs and organise your journey — all in one place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={onStartOnboarding}
                className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm sm:text-base rounded-xl transition duration-200 shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Build My Nursing Roadmap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={onExploreCountries}
                className="w-full sm:w-auto px-6 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm sm:text-base rounded-xl border border-white/10 hover:border-cyan-500/40 transition duration-200 shadow-xs cursor-pointer backdrop-blur-md"
              >
                Explore Countries
              </button>
              <button
                onClick={onLoadDemo}
                className="w-full sm:w-auto px-5 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold text-sm rounded-xl border border-cyan-500/30 transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Try Demo Profile (Ada)</span>
              </button>
            </div>

            {/* Route Visualizer preview */}
            <div className="pt-8">
              <div className="inline-flex items-center gap-2 sm:gap-4 p-3 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg">
                  <span>🇳🇬 Nigeria</span>
                </span>
                <span className="text-cyan-400">→</span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg">
                  <span>🇬🇧 United Kingdom</span>
                </span>
                <span className="text-cyan-400">→</span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-lg font-bold shadow-[0_0_10px_rgba(0,242,255,0.2)]">
                  <span>🇨🇦 Canada (Alberta CRNA)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How NursePath Works */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How NursePath Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A three-step deterministic guide built specifically for internationally educated healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-7 space-y-4 relative">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-lg flex items-center justify-center">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Tell us your nursing background</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Where you completed your initial nursing education, which qualifications you hold, where you are registered, and your current clinical practice history.
            </p>
          </div>

          <div className="glass-panel p-7 space-y-4 relative">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-lg flex items-center justify-center">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Choose your destination</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Select the country, state, or province where you want to practise. Our engine applies exact regulatory rules without guesswork.
            </p>
          </div>

          <div className="glass-panel p-7 space-y-4 relative">
            <div className="w-12 h-12 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)]">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Follow your personalized roadmap</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Track mandatory credential assessments, exams (NCLEX, CBT, OSCE), English waivers, documents, and budget in one verified workspace.
            </p>
          </div>
        </div>
      </section>

      {/* Currently Supported Countries */}
      <section className="py-16 border-y border-white/10 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400">Coverage</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Currently Supported Destinations
            </h2>
            <p className="text-sm text-slate-400">
              Each destination model is backed by verified regulatory data and official links.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COUNTRIES_DATA.map((country) => (
              <div 
                key={country.code}
                className="p-6 rounded-2xl glass-panel hover:border-cyan-500/40 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-3">{country.flag}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{country.name}</h3>
                  <div className="text-[11px] font-mono font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded inline-block mb-3">
                    {country.structure}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {country.tagline}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono font-medium">
                  Regulator: {country.regulatorShort}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Engineered for International Nurses
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A comprehensive suite of career management tools designed to eliminate regulatory confusion and prevent expensive mistakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Personalised Roadmap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step-by-step regulatory milestones dynamically customized to your training country, registration records, and target state/province.
            </p>
          </div>

          <div className="p-6 glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Document Tracker</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track passports, academic transcripts, good standing verifications, and clinical statements with clear status indicators.
            </p>
          </div>

          <div className="p-6 glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Cost Calculator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent budgeting for evaluation fees, exams (CBT, OSCE, NCLEX), police checks, and registration without false currency conversions.
            </p>
          </div>

          <div className="p-6 glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">State & Province Navigator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare US State Boards (Texas, NY, California, Florida) and Canadian Provincial Colleges (Alberta CRNA, Ontario CNO, BC BCCNM).
            </p>
          </div>

          <div className="p-6 glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Application Tracker</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Organize multiple submissions to credential evaluators, regulators, Pearson VUE test centers, and prospective employers.
            </p>
          </div>

          <div className="p-6 glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Official Links Vault</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct access to authoritative regulator portals and fee schedules. Never rely on unverified hearsay or outdated forum posts.
            </p>
          </div>
        </div>
      </section>

      {/* Regulatory Safety & Disclaimer Card */}
      <section className="py-12 border-t border-white/10 relative z-10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 mb-1">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Important Regulatory Safety Rule</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            NursePath provides career organisation and general informational guidance. Registration, licensing, immigration and employment requirements can change. Always verify requirements directly with the relevant official regulator before making payments, submitting documents or making immigration decisions.
          </p>
          <button
            onClick={onOpenDisclaimerModal}
            className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
          >
            Read Full Regulatory Safety Policy →
          </button>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 sm:py-20 border-t border-white/10 text-white text-center relative z-10 bg-[#030305]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to plan your international nursing journey?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Get your structured roadmap in less than 2 minutes. Free and personalized to your qualifications.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartOnboarding}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm sm:text-base rounded-xl transition duration-200 shadow-[0_0_20px_rgba(0,242,255,0.4)] cursor-pointer"
            >
              Start My Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

