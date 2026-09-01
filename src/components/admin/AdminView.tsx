import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Save, 
  ExternalLink, 
  Check,
  RotateCcw
} from 'lucide-react';
import { COUNTRIES_DATA, OFFICIAL_SOURCES } from '../../data/regulatoryData';
import { StorageManager } from '../../utils/storage';

export const AdminView: React.FC = () => {
  const [sources, setSources] = useState(() => {
    const saved = StorageManager.getAdminRegulatorySources();
    return saved.length > 0 ? saved : OFFICIAL_SOURCES;
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const saved = StorageManager.getAdminRegulatorySources();
    if (saved.length > 0) {
      setSources(saved);
    }
  }, []);

  const handleUpdateVerificationDate = (id: string, newDate: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, lastVerifiedDate: newDate } : s));
    setHasUnsavedChanges(true);
  };

  const handleSaveAll = () => {
    StorageManager.saveAdminRegulatorySources(sources);
    setHasUnsavedChanges(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all regulatory sources to hardcoded system defaults?')) {
      setSources(OFFICIAL_SOURCES);
      StorageManager.saveAdminRegulatorySources(OFFICIAL_SOURCES);
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <div id="admin-view" className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 mb-1">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span>ADMIN DATA STUDIO</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">RULE ENGINE & SOURCE DIRECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Regulatory Data Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit regulatory rules, official URLs, and last verified dates with persistent storage
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetToDefaults}
            title="Reset to defaults"
            className="flex items-center gap-1.5 px-3 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs rounded-xl transition border border-white/10 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSaveAll}
            className={`flex items-center gap-2 px-5 py-2.5 font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer ${
              hasUnsavedChanges 
                ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(0,242,255,0.6)] animate-pulse' 
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,242,255,0.4)]'
            }`}
          >
            {saveSuccess ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4 text-slate-950" />}
            <span>{saveSuccess ? 'Changes Saved Permanently!' : hasUnsavedChanges ? 'Save Changes' : 'Save Regulatory Audit'}</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COUNTRIES_DATA.map((c) => (
          <div key={c.code} className="glass-panel p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{c.flag}</span>
              <span className="text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
            <h3 className="font-bold text-sm text-white">{c.name}</h3>
            <p className="text-xs text-slate-400">{c.regulatorName}</p>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-white/10 flex justify-between">
              <span>Status: Verified</span>
              <span className="font-mono font-semibold text-cyan-300">August 2026</span>
            </div>
          </div>
        ))}
      </div>

      {/* Official Sources Audit Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Authoritative Source Registry & Timestamps</h2>
            <p className="text-xs text-slate-400">Ensure all links point to verified primary official government/regulator domains</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.04] border-b border-white/10 text-slate-400 font-mono font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Jurisdiction & Title</th>
                <th className="p-4">Organisation</th>
                <th className="p-4">Official Portal URL</th>
                <th className="p-4">Last Verified Date</th>
                <th className="p-4 text-right">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {sources.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition">
                  <td className="p-4 font-bold text-white">
                    <div>{s.title}</div>
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase">{s.country} • {s.type}</span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">
                    {s.organisation}
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-400 max-w-xs truncate">
                    {s.url}
                  </td>
                  <td className="p-4">
                    <input
                      type="text"
                      value={s.lastVerifiedDate}
                      onChange={(e) => handleUpdateVerificationDate(s.id, e.target.value)}
                      className="p-1.5 border border-white/10 rounded text-xs bg-white/[0.04] w-32 font-mono font-semibold text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1 text-xs border border-white/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

