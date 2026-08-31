import React, { useState } from 'react';
import { X, Printer, FileText, CheckCircle2 } from 'lucide-react';
import { UserProfile, Journey, RoadmapTask, DocumentItem, CostItem } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  activeJourney: Journey | null;
  tasks: RoadmapTask[];
  documents: DocumentItem[];
  costs: CostItem[];
}

export const PrintExportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userProfile,
  activeJourney,
  tasks,
  documents,
  costs
}) => {
  const [exportType, setExportType] = useState<'all' | 'roadmap' | 'documents' | 'costs'>('all');

  if (!isOpen || !userProfile || !activeJourney) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="print-modal" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#090D16] rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-white/10 relative my-6 max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between pb-4 border-b border-white/10 print:hidden">
          <div>
            <h2 className="text-xl font-bold text-white">Print & Export Journey Dossier</h2>
            <p className="text-xs text-slate-400 font-mono">
              OFFICIAL VERIFICATION SUMMARY FOR {userProfile.firstName.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>

        {/* Export selector */}
        <div className="flex gap-2 my-4 print:hidden">
          {[
            { id: 'all', label: 'Complete Dossier' },
            { id: 'roadmap', label: 'Roadmap Only' },
            { id: 'documents', label: 'Document Checklist' },
            { id: 'costs', label: 'Budget Summary' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setExportType(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                exportType === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Print Preview Canvas */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-200 border border-white/10 p-5 rounded-2xl bg-black/40 print:p-0 print:border-none print:bg-white print:text-black text-xs sm:text-sm">
          {/* Header */}
          <div className="border-b border-white/10 print:border-slate-300 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-extrabold text-white print:text-black">NursePath International Career Plan</h1>
                <p className="text-xs text-slate-400 print:text-slate-600">Generated for {userProfile.firstName} {userProfile.lastName || ''}</p>
              </div>
              <div className="text-right text-[11px] text-slate-400 print:text-slate-600 font-mono">
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p className="font-semibold text-cyan-400 print:text-emerald-700">Verified: August 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs bg-white/[0.03] print:bg-slate-50 p-3 rounded-xl border border-white/10 print:border-slate-200">
              <div>
                <span className="text-slate-400 print:text-slate-500 block text-[10px] uppercase font-bold">Origin & Education</span>
                <span className="font-semibold text-white print:text-black">{userProfile.educationCountry} ({userProfile.qualification})</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-500 block text-[10px] uppercase font-bold">Current Practice</span>
                <span className="font-semibold text-white print:text-black">{userProfile.currentPracticeCountry} ({userProfile.experience})</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-500 block text-[10px] uppercase font-bold">Target Destination</span>
                <span className="font-semibold text-cyan-400 print:text-emerald-700">
                  {activeJourney.destinationCountry} {activeJourney.destinationStateOrProvince ? `— ${activeJourney.destinationStateOrProvince}` : ''}
                </span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-500 block text-[10px] uppercase font-bold">Target Date</span>
                <span className="font-semibold text-white print:text-black">{activeJourney.targetDate || activeJourney.targetTimeline}</span>
              </div>
            </div>
          </div>

          {/* Roadmap Tasks */}
          {(exportType === 'all' || exportType === 'roadmap') && (
            <div>
              <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400 print:text-emerald-700" />
                Roadmap Tasks & Regulatory Steps
              </h3>
              <div className="space-y-2">
                {tasks.map((task, idx) => (
                  <div key={task.id} className="p-3 bg-white/[0.03] print:bg-white rounded-xl border border-white/10 print:border-slate-200 text-xs">
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-white print:text-black">
                        {idx + 1}. {task.title}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ml-2 ${
                        task.status === 'Completed' ? 'bg-cyan-500/20 text-cyan-300 print:bg-emerald-100 print:text-emerald-800' :
                        task.status === 'Action Required' ? 'bg-amber-500/20 text-amber-300 print:bg-amber-100 print:text-amber-800' :
                        'bg-white/10 text-slate-300 print:bg-slate-100 print:text-slate-700'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-slate-300 print:text-slate-600 mt-1 text-[11px]">{task.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-slate-400 print:text-slate-500 font-mono">
                      {task.regulatorName && <span>Regulator: {task.regulatorName}</span>}
                      {task.estimatedFee && <span>Est. Fee: {task.currency} {task.estimatedFee}</span>}
                      {task.targetDate && <span>Due: {task.targetDate}</span>}
                      <span>Verified: {task.lastVerifiedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Checklist */}
          {(exportType === 'all' || exportType === 'documents') && (
            <div>
              <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 print:text-emerald-700" />
                Required Document Tracker
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-2.5 bg-white/[0.03] print:bg-white rounded-xl border border-white/10 print:border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-white print:text-black">{doc.name}</p>
                      <span className="text-[10px] text-slate-400 print:text-slate-500">{doc.category}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      doc.status === 'Accepted' || doc.status === 'Received'
                        ? 'bg-cyan-500/20 text-cyan-300 print:bg-emerald-100 print:text-emerald-800'
                        : 'bg-white/10 text-slate-400 print:bg-slate-100 print:text-slate-600'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost Items */}
          {(exportType === 'all' || exportType === 'costs') && (
            <div>
              <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider mb-3">
                Estimated International Nursing Budget
              </h3>
              <div className="bg-white/[0.02] print:bg-white rounded-xl border border-white/10 print:border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.05] print:bg-slate-100 text-slate-300 print:text-slate-700 text-[10px] uppercase font-mono">
                    <tr>
                      <th className="p-2.5">Item</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Estimated</th>
                      <th className="p-2.5">Paid</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 print:divide-slate-100">
                    {costs.map((c) => (
                      <tr key={c.id}>
                        <td className="p-2.5 font-medium text-white print:text-black">{c.item}</td>
                        <td className="p-2.5 text-slate-400 print:text-slate-600">{c.category}</td>
                        <td className="p-2.5 font-semibold text-cyan-300 print:text-black">{c.currency} {c.estimatedCost}</td>
                        <td className="p-2.5 text-slate-300 print:text-black">{c.currency} {c.amountPaid}</td>
                        <td className="p-2.5">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            c.paymentStatus === 'Paid' ? 'bg-cyan-500/20 text-cyan-300 print:bg-emerald-100 print:text-emerald-800' : 'bg-white/10 text-slate-400 print:bg-slate-100 print:text-slate-600'
                          }`}>
                            {c.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Safety Disclaimer Footer in Print */}
          <div className="pt-4 border-t border-white/10 print:border-slate-200 text-[10px] text-slate-400 print:text-slate-500 leading-tight">
            <p className="font-semibold text-white print:text-slate-700 mb-0.5">Regulatory Safety Disclaimer:</p>
            <p>
              NursePath provides career organisation and general informational guidance. Registration, licensing, immigration and employment requirements can change. Always verify requirements directly with the official regulator prior to payments or travel decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

