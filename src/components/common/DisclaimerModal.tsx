import React from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { REGULATORY_DISCLAIMER_TEXT } from '../../data/regulatoryData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#090D16] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/10 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Regulatory Safety & Informational Notice</h2>
            <p className="text-xs text-slate-400 font-mono">NURSEPATH OPERATING PRINCIPLES & GOVERNANCE</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 font-medium">
            {REGULATORY_DISCLAIMER_TEXT}
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              What NursePath Is:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs sm:text-sm">
              <li>A personal career planning, document tracking, and pathway organization system.</li>
              <li>A tool to help international nurses systematically understand complex regulatory stages and avoid redundant expenditures.</li>
              <li>A verified registry linking directly back to authoritative official regulators and exam bodies.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              What NursePath Is NOT:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs sm:text-sm">
              <li>NursePath is <strong>NOT</strong> an official regulator (such as NMC, State Boards, CRNA, CNO, BCCNM, or NMBA/Ahpra).</li>
              <li>NursePath is <strong>NOT</strong> an immigration adviser, law firm, recruitment agency, or visa sponsor.</li>
              <li>NursePath does <strong>NOT</strong> guarantee licensure eligibility, exam outcomes, or visa issuance.</li>
            </ul>
          </div>

          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10 text-xs text-slate-300">
            <p className="font-semibold text-white mb-1">Important Note on Jurisdictional Variations</p>
            <p>
              In countries such as the United States and Canada, nursing licensure is governed at the individual state and provincial level. Passing examinations like NCLEX-RN does not grant legal immigration status or work authorization in any country.
            </p>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-white/10 font-mono">
            Data version: 2026.8 • Last verified: August 2026 • Always confirm with official regulator links prior to transactions.
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};

