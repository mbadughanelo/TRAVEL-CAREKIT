import React from 'react';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface Props {
  onExitDemo: () => void;
  onResetDemo: () => void;
}

export const DemoBanner: React.FC<Props> = ({ onExitDemo, onResetDemo }) => {
  return (
    <div id="demo-mode-banner" className="bg-[#030305]/95 border-b border-cyan-500/30 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <span className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          SIMULATION ACTIVE
        </span>
        <span className="text-slate-300 text-xs">
          Profile: <strong className="text-white">Ada</strong> (Nigeria RN → UK NMC → Canada / Alberta CRNA)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onResetDemo}
          title="Reset sample roadmap data"
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-cyan-300 border border-white/10 text-xs transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample</span>
        </button>
        <button
          onClick={onExitDemo}
          className="flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-[0_0_12px_rgba(0,242,255,0.4)] cursor-pointer"
        >
          <span>Start My Own Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

