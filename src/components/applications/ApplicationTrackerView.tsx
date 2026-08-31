import React, { useState } from 'react';
import { 
  Send, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Clock
} from 'lucide-react';
import { 
  UserProfile, 
  Journey, 
  ApplicationItem, 
  ApplicationType, 
  ApplicationStatus 
} from '../../types';

interface Props {
  userProfile: UserProfile;
  activeJourney: Journey;
  applications: ApplicationItem[];
  onUpdateApplication: (app: ApplicationItem) => void;
  onAddApplication: (newApp: ApplicationItem) => void;
  onDeleteApplication: (appId: string) => void;
}

const APP_TYPES: ApplicationType[] = [
  'Regulator Application',
  'Credential Evaluation',
  'Exam Registration',
  'Job Application'
];

export const ApplicationTrackerView: React.FC<Props> = ({
  activeJourney,
  applications,
  onUpdateApplication,
  onAddApplication,
  onDeleteApplication
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newType, setNewType] = useState<ApplicationType>('Regulator Application');
  const [newOrg, setNewOrg] = useState('');
  const [newCountry, setNewCountry] = useState<string>(activeJourney.destinationCountry);
  const [newState, setNewState] = useState(activeJourney.destinationStateOrProvince || '');
  const [newRef, setNewRef] = useState('');
  const [newNextAction, setNewNextAction] = useState('');
  const [newNextActionDate, setNewNextActionDate] = useState('');
  const [newPortalUrl, setNewPortalUrl] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrg.trim()) return;

    const newApp: ApplicationItem = {
      id: `${activeJourney.id}-app-custom-${Date.now()}`,
      journeyId: activeJourney.id,
      applicationType: newType,
      organisation: newOrg.trim(),
      country: newCountry,
      stateOrProvince: newState.trim() || undefined,
      dateStarted: new Date().toISOString().split('T')[0],
      referenceNumber: newRef.trim() || undefined,
      status: 'Action Required',
      nextAction: newNextAction.trim() || undefined,
      nextActionDate: newNextActionDate || undefined,
      portalUrl: newPortalUrl.trim() || undefined,
      notes: newNotes.trim() || undefined
    };

    onAddApplication(newApp);
    setIsAddModalOpen(false);
    setNewOrg('');
    setNewRef('');
    setNewNextAction('');
    setNewNextActionDate('');
    setNewPortalUrl('');
    setNewNotes('');
  };

  return (
    <div id="application-tracker-view" className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 mb-1">
            <span>SUBMISSIONS & CASEWORK DOSSIER</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">{applications.length} SUBMISSIONS LOGGED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your submissions to regulatory bodies, evaluation agencies, and testing services
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Application</span>
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="glass-panel p-12 text-center text-slate-400 space-y-3">
            <Send className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="font-semibold text-sm">No applications recorded yet.</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              When you submit your application to bodies like NMC, CGFNS, CRNA, or Pearson VUE, log them here to track reference numbers and next action dates.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-2 text-xs text-cyan-400 font-bold hover:underline cursor-pointer"
            >
              + Add First Application
            </button>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="glass-panel p-6 space-y-4 transition hover:border-white/20"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-white/[0.04] border border-white/10 text-cyan-300 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                      {app.applicationType}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {app.country} {app.stateOrProvince ? `(${app.stateOrProvince})` : ''}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {app.organisation}
                  </h3>
                  {app.referenceNumber && (
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Ref / Application ID: <strong className="text-cyan-300">{app.referenceNumber}</strong>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <select
                    value={app.status}
                    onChange={(e) => onUpdateApplication({ ...app, status: e.target.value as ApplicationStatus })}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer ${
                      app.status === 'Approved'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : app.status === 'Action Required'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : app.status === 'Submitted' || app.status === 'Waiting'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                        : 'bg-[#090D16] text-slate-300 border-white/10'
                    }`}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Waiting">Waiting for Regulator</option>
                    <option value="Action Required">Action Required</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <button
                    onClick={() => onDeleteApplication(app.id)}
                    className="text-slate-500 hover:text-red-400 p-1.5 transition cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Next Action Box */}
              {(app.nextAction || app.nextActionDate) && (
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-300">Next Action: </span>
                      <span className="text-slate-400">{app.nextAction || 'Pending review'}</span>
                    </div>
                  </div>
                  {app.nextActionDate && (
                    <span className="text-slate-400 font-mono">
                      Target: <strong className="text-white">{app.nextActionDate}</strong>
                    </span>
                  )}
                </div>
              )}

              {/* Notes & Portal link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-slate-400">
                <p className="italic text-slate-400">
                  {app.notes ? `"${app.notes}"` : 'No additional notes'}
                </p>

                {app.portalUrl && (
                  <a
                    href={app.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Log in to portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090D16] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-4">Log New Application / Submission</h2>
            <form onSubmit={handleCreateApplication} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Application Type *</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ApplicationType)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-white"
                >
                  {APP_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Organisation / Board *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Texas Board of Nursing, CGFNS, CRNA, Pearson VUE"
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Country</label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">State / Province</label>
                  <input
                    type="text"
                    placeholder="Optional (e.g. Texas, Alberta)"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Reference Number / Casework ID</label>
                <input
                  type="text"
                  placeholder="e.g. CRNA-2026-9812, CGFNS-38291"
                  value={newRef}
                  onChange={(e) => setNewRef(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white font-mono text-xs focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Next Action</label>
                  <input
                    type="text"
                    placeholder="e.g. Submit IELTS, Schedule Exam"
                    value={newNextAction}
                    onChange={(e) => setNewNextAction(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Next Action Date</label>
                  <input
                    type="date"
                    value={newNextActionDate}
                    onChange={(e) => setNewNextActionDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Portal Login URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newPortalUrl}
                  onChange={(e) => setNewPortalUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Casework officer notes, required follow-up..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:bg-white/10 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

