import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { REGULATORY_DISCLAIMER_TEXT } from '../../data/regulatoryData';

interface Props {
  onOpenDisclaimerModal?: () => void;
  compact?: boolean;
}

export const RegulatoryBanner: React.FC<Props> = ({ onOpenDisclaimerModal, compact = false }) => {
  if (compact) {
    return (
      <div id="regulatory-banner-compact" className="bg-[#030305]/90 border-b border-white/[0.06] text-slate-300 text-xs px-4 py-2 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2 max-w-4xl truncate">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="truncate text-slate-400 text-[11px] font-mono">
            <strong className="text-cyan-300">REGULATORY NOTICE:</strong> Always verify requirements directly with official regulators before making payments.
          </span>
        </div>
        {onOpenDisclaimerModal && (
          <button 
            onClick={onOpenDisclaimerModal}
            className="text-cyan-400 hover:text-cyan-300 font-medium underline text-[11px] shrink-0 ml-3 cursor-pointer"
          >
            Safety Terms
          </button>
        )}
      </div>
    );
  }

  return (
    <div id="regulatory-banner-full" className="bg-amber-950/20 border border-amber-500/30 text-amber-200 rounded-2xl p-4 my-4 flex items-start gap-3 backdrop-blur-md">
      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="text-xs sm:text-sm leading-relaxed flex-1">
        <p className="font-semibold text-amber-300 mb-1">
          Official Regulatory Verification Notice
        </p>
        <p className="text-amber-200/80">
          {REGULATORY_DISCLAIMER_TEXT}
        </p>
      </div>
      {onOpenDisclaimerModal && (
        <button
          onClick={onOpenDisclaimerModal}
          className="text-amber-300 hover:text-amber-100 text-xs font-semibold underline shrink-0 px-2 py-1 cursor-pointer"
        >
          Details
        </button>
      )}
    </div>
  );
};

