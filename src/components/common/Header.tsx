import React from 'react';
import { 
  Compass, 
  Printer, 
  Sparkles, 
  ShieldAlert, 
  ChevronRight
} from 'lucide-react';
import { UserProfile, Journey } from '../../types';

interface Props {
  userProfile: UserProfile | null;
  activeJourney: Journey | null;
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenExportModal: () => void;
  onOpenDisclaimerModal: () => void;
  onStartOnboarding: () => void;
  onLoadDemo: () => void;
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<Props> = ({
  userProfile,
  activeJourney,
  activeView,
  onNavigate,
  onOpenExportModal,
  onOpenDisclaimerModal,
  onStartOnboarding,
  onLoadDemo,
}) => {
  return (
    <header id="main-app-header" className="sticky top-0 z-30 bg-[#030305]/80 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate(userProfile ? 'dashboard' : 'landing')} 
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(0,242,255,0.4)] group-hover:shadow-[0_0_20px_rgba(0,242,255,0.7)] transition-all">
              <Compass className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight uppercase">Nurse<span className="text-cyan-400 glow-text">Path</span></span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 px-1.5 py-0.5 rounded">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider hidden sm:block">
                GLOBAL REGULATORY INTELLIGENCE
              </p>
            </div>
          </button>

          {/* Active Journey Breadcrumb on Desktop */}
          {userProfile && activeJourney && (
            <div className="hidden lg:flex items-center gap-2 ml-6 pl-6 border-l border-white/10 text-xs">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-mono">ROUTE:</span>
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-1.5 font-medium text-cyan-300 hover:text-cyan-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-3 py-1 rounded-lg transition"
              >
                <span>{activeJourney.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ask AI quick pill */}
          {userProfile && (
            <button
              onClick={() => onNavigate('assistant')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeView === 'assistant'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                  : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Ask AI</span>
              <span className="sm:hidden">AI</span>
            </button>
          )}

          {/* Print / Export */}
          {userProfile && (
            <button
              onClick={onOpenExportModal}
              title="Print or Export summary"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline">Dossier</span>
            </button>
          )}

          {/* Disclaimer Button */}
          <button
            onClick={onOpenDisclaimerModal}
            title="View regulatory safety policy"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-amber-300/90 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Safety Rules</span>
          </button>

          {/* User profile / Demo action */}
          {!userProfile ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onLoadDemo}
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition hidden sm:inline cursor-pointer"
              >
                Sample Profile
              </button>
              <button
                onClick={onStartOnboarding}
                className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer"
              >
                <span>Build Roadmap</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeView === 'profile'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-[10px] font-bold shadow-[0_0_8px_rgba(0,242,255,0.6)]">
                {userProfile.firstName.charAt(0)}
              </div>
              <span className="hidden sm:inline">{userProfile.firstName}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

