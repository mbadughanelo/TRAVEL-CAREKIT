import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  FileText, 
  Calculator, 
  Send, 
  Globe2, 
  BookmarkCheck, 
  Sparkles, 
  UserCircle,
  ShieldCheck,
  Wrench
} from 'lucide-react';
import { UserProfile, Journey } from '../../types';

interface Props {
  userProfile: UserProfile | null;
  activeJourney: Journey | null;
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenDisclaimerModal: () => void;
}

export const Sidebar: React.FC<Props> = ({
  userProfile,
  activeJourney,
  activeView,
  onNavigate,
  onOpenDisclaimerModal
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'My Roadmap', icon: MapPin },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'costs', label: 'Cost Calculator', icon: Calculator },
    { id: 'applications', label: 'Applications', icon: Send },
    { id: 'navigator', label: 'Country Navigator', icon: Globe2 },
    { id: 'vault', label: 'Official Links', icon: BookmarkCheck },
    { id: 'assistant', label: 'Ask NursePath', icon: Sparkles, badge: 'AI' },
    { id: 'profile', label: 'Profile & Journeys', icon: UserCircle },
  ];

  return (
    <aside id="desktop-sidebar" className="hidden lg:flex flex-col w-64 bg-[#030305]/40 backdrop-blur-xl border-r border-white/[0.08] min-h-[calc(100vh-4rem)] p-4 shrink-0">
      {/* Current Journey Card */}
      {activeJourney && (
        <div className="mb-5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
            <span>TARGET DEST</span>
            <span className="text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.5 rounded text-[10px] font-bold">
              {activeJourney.destinationCountry}
            </span>
          </div>
          <p className="text-xs font-bold text-white truncate">
            {activeJourney.destinationStateOrProvince 
              ? `${activeJourney.destinationCountry} (${activeJourney.destinationStateOrProvince})`
              : activeJourney.destinationCountry}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
            {activeJourney.pathwayVariant || 'Standard Registration Pathway'}
          </p>
        </div>
      )}

      {/* Navigation List */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.15)] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
        {/* Admin toggle */}
        <button
          onClick={() => onNavigate('admin')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
            activeView === 'admin'
              ? 'bg-white/[0.1] text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 text-slate-400" />
          <span>Regulatory Database</span>
        </button>

        {/* Regulatory badge */}
        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Regulator-Direct Data</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Verified August 2026. Official links provided for all licensing stages.
          </p>
          <button
            onClick={onOpenDisclaimerModal}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold underline mt-1.5 inline-block cursor-pointer"
          >
            Safety notice & rules
          </button>
        </div>
      </div>
    </aside>
  );
};

