import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Calculator, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { 
  UserProfile, 
  Journey, 
  RoadmapTask, 
  DocumentItem, 
  CostItem, 
  ApplicationItem 
} from '../../types';
import { 
  calculateJourneyProgress, 
  calculateDocumentStats, 
  calculateTotalCostsByCurrency 
} from '../../utils/ruleEngine';
import { STAGE_DEFINITIONS } from '../../data/regulatoryData';

interface Props {
  userProfile: UserProfile;
  activeJourney: Journey;
  tasks: RoadmapTask[];
  documents: DocumentItem[];
  costs: CostItem[];
  applications: ApplicationItem[];
  onNavigate: (view: string) => void;
  onUpdateTask: (task: RoadmapTask) => void;
  onOpenDisclaimerModal: () => void;
}

export const DashboardView: React.FC<Props> = ({
  userProfile,
  activeJourney,
  tasks,
  documents,
  costs,
  applications,
  onNavigate,
  onUpdateTask
}) => {
  // Compute metrics
  const progressStats = calculateJourneyProgress(tasks);
  const docStats = calculateDocumentStats(documents);
  const costTotals = calculateTotalCostsByCurrency(costs);

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Priority incomplete tasks (Next actions)
  const incompleteTasks = tasks.filter(t => t.status !== 'Completed' && t.status !== 'Not Applicable');
  const nextPriorityTask = incompleteTasks[0] || null;

  // Compute stage breakdown
  const stageSummary = STAGE_DEFINITIONS.map(stageDef => {
    const stageTasks = tasks.filter(t => t.stage === stageDef.id);
    const completed = stageTasks.filter(t => t.status === 'Completed').length;
    const total = stageTasks.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      ...stageDef,
      total,
      completed,
      percent
    };
  });

  return (
    <div id="dashboard-view-container" className="space-y-6">
      {/* Welcome & Route Header */}
      <div className="glass-panel p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 mb-1.5">
              <span>{greeting.toUpperCase()}, {userProfile.firstName.toUpperCase()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
              <span className="text-cyan-400 font-bold uppercase tracking-wider">ACTIVE FLIGHT PATH</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeJourney.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {activeJourney.pathwayVariant || 'Standard Registration Pathway'} • Target: {activeJourney.targetTimeline}
            </p>
          </div>

          {/* Route path chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-white/[0.03] p-3 rounded-xl border border-white/10">
            <span className="text-slate-300">{userProfile.educationCountry} (Trained)</span>
            <span className="text-cyan-500">→</span>
            {userProfile.currentPracticeCountry !== userProfile.educationCountry && (
              <>
                <span className="text-slate-300">{userProfile.currentPracticeCountry} (Practice)</span>
                <span className="text-cyan-500">→</span>
              </>
            )}
            <span className="text-cyan-300 font-bold glow-text">
              {activeJourney.destinationCountry} {activeJourney.destinationStateOrProvince ? `(${activeJourney.destinationStateOrProvince})` : ''} [DESTINATION]
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Card */}
        <div className="glass-panel p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">OVERALL PROGRESS</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,242,255,0.2)]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-white glow-text">{progressStats.overallPercentage}%</div>
            <div className="w-full bg-white/10 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,242,255,0.6)]" 
                style={{ width: `${progressStats.overallPercentage}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{progressStats.completedTasksCount} / {progressStats.totalApplicableTasksCount} Tasks</span>
            <button onClick={() => onNavigate('roadmap')} className="text-cyan-400 font-semibold hover:text-cyan-300 cursor-pointer">
              Roadmap →
            </button>
          </div>
        </div>

        {/* Documents Card */}
        <div className="glass-panel p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">DOCUMENTS READY</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-white">
              {docStats.readyOrAccepted} <span className="text-base text-slate-500 font-normal">/ {docStats.total}</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                style={{ width: `${docStats.percentage}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{docStats.inProgress} in progress</span>
            <button onClick={() => onNavigate('documents')} className="text-blue-400 font-semibold hover:text-blue-300 cursor-pointer">
              Doc Vault →
            </button>
          </div>
        </div>

        {/* Budget Card */}
        <div className="glass-panel p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">BUDGET LOGGED</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl font-extrabold text-white truncate">
              {costTotals.length > 0 ? (
                <span>{costTotals[0].currency} {costTotals[0].estimated.toLocaleString()}</span>
              ) : (
                <span>$0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {costs.filter(c => c.paymentStatus === 'Paid').length} paid • {costs.filter(c => c.paymentStatus === 'Planned').length} planned
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{costs.length} items tracked</span>
            <button onClick={() => onNavigate('costs')} className="text-amber-400 font-semibold hover:text-amber-300 cursor-pointer">
              Calculator →
            </button>
          </div>
        </div>

        {/* Applications Card */}
        <div className="glass-panel p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">APPLICATIONS</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-white">
              {applications.length}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {applications.filter(a => a.status === 'Action Required').length} action required
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Regulator submissions</span>
            <button onClick={() => onNavigate('applications')} className="text-purple-400 font-semibold hover:text-purple-300 cursor-pointer">
              Tracker →
            </button>
          </div>
        </div>
      </div>

      {/* Immediate Next Action Highlight Banner */}
      {nextPriorityTask && (
        <div className="relative rounded-2xl p-6 overflow-hidden border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-[#0B1528]/80 to-purple-950/30 backdrop-blur-xl shadow-[0_0_30px_rgba(0,242,255,0.1)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-mono font-bold text-[10px] uppercase px-2.5 py-0.5 rounded shadow-[0_0_8px_rgba(0,242,255,0.3)]">
                  NEXT ACTION ITEM
                </span>
                <span className="text-xs text-slate-400 font-mono capitalize">
                  STAGE: {nextPriorityTask.stage}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {nextPriorityTask.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">
                {nextPriorityTask.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onUpdateTask({ ...nextPriorityTask, status: 'Completed' });
                }}
                className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Completed</span>
              </button>
              <button
                onClick={() => onNavigate('roadmap')}
                className="px-3.5 py-2.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                View in Roadmap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Journey Stages Breakdown */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Registration Stages Breakdown</h2>
            <p className="text-xs text-slate-400">Track progress across key regulatory phases</p>
          </div>
          <button
            onClick={() => onNavigate('roadmap')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {stageSummary.map((st) => (
            <div 
              key={st.id} 
              className={`p-3 rounded-xl border text-center transition ${
                st.completed === st.total && st.total > 0
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                  : st.completed > 0
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-200'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
              }`}
            >
              <div className="text-[11px] font-bold truncate mb-1" title={st.title}>
                {st.title}
              </div>
              <div className="text-xs font-extrabold mb-1.5 text-white">
                {st.completed} / {st.total}
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full rounded-full shadow-[0_0_6px_rgba(0,242,255,0.6)]" 
                  style={{ width: `${st.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launchpad Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ask NursePath AI Box */}
        <div className="glass-panel p-6 flex flex-col justify-between space-y-4 relative overflow-hidden border-cyan-500/30 hover:border-cyan-500/50 transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">AI NAVIGATOR</span>
            </div>
            <h3 className="text-lg font-bold text-white">Ask NursePath Assistant</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have questions about NCLEX scheduling, English waivers, or transcript forms? Get instant answers grounded in official regulatory rules.
            </p>
          </div>
          <button
            onClick={() => onNavigate('assistant')}
            className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,255,0.3)] cursor-pointer"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Document Checklist Box */}
        <div className="glass-panel p-6 flex flex-col justify-between space-y-4 hover:border-white/20 transition">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">VERIFICATION</span>
            </div>
            <h3 className="text-lg font-bold text-white">Document Tracker</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track university transcripts, Good Standing certificates, and clinical practice hour letters needed for {activeJourney.destinationCountry}.
            </p>
          </div>
          <button
            onClick={() => onNavigate('documents')}
            className="w-full py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open Document Vault</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Official Links Vault Box */}
        <div className="glass-panel p-6 flex flex-col justify-between space-y-4 hover:border-white/20 transition">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">AUTHORITATIVE</span>
            </div>
            <h3 className="text-lg font-bold text-white">Official Regulator Vault</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access verified direct links to official health councils, evaluation portals, and immigration authorities verified for August 2026.
            </p>
          </div>
          <button
            onClick={() => onNavigate('vault')}
            className="w-full py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Browse Official Portals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

