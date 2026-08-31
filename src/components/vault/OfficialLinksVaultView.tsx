import React, { useState } from 'react';
import { 
  ExternalLink, 
  Search, 
  ShieldCheck
} from 'lucide-react';
import { OFFICIAL_SOURCES } from '../../data/regulatoryData';

interface Props {
  onOpenDisclaimerModal: () => void;
}

export const OfficialLinksVaultView: React.FC<Props> = ({ onOpenDisclaimerModal }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSources = OFFICIAL_SOURCES.filter((src) => {
    if (selectedCountry !== 'all' && src.country !== selectedCountry) return false;
    if (selectedType !== 'all' && src.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = src.title.toLowerCase().includes(q);
      const matchOrg = src.organisation.toLowerCase().includes(q);
      const matchDesc = src.description.toLowerCase().includes(q);
      if (!matchTitle && !matchOrg && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div id="official-links-vault-view" className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 mb-1">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>AUTHORITATIVE SOURCE REPOSITORY</span>
          <span>•</span>
          <span className="text-cyan-400 font-bold">{OFFICIAL_SOURCES.length} OFFICIAL PORTALS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Official Links & Regulator Vault
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Direct verified links to official health councils, evaluation agencies, testing centers, and immigration portals
        </p>
      </div>

      {/* Safety Alert */}
      <div className="p-4 rounded-2xl glass-panel text-xs text-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            All sources are verified directly against primary official regulators as of August 2026.
          </span>
        </div>
        <button
          onClick={onOpenDisclaimerModal}
          className="text-xs font-bold text-cyan-400 hover:underline shrink-0 cursor-pointer"
        >
          View regulatory safety rules
        </button>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 sm:p-5 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by regulator, exam body, or topic (e.g. Pearson VUE, CRNA, CGFNS, NMC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="p-2.5 rounded-xl bg-[#0e131f] border border-white/10 text-xs font-medium text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Countries</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="USA">🇺🇸 United States</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="International">🌐 International</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2.5 rounded-xl bg-[#0e131f] border border-white/10 text-xs font-medium text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Source Types</option>
              <option value="Regulator">Regulators</option>
              <option value="Assessment Body">Assessment Bodies</option>
              <option value="Exam Provider">Exam Providers</option>
              <option value="Immigration">Immigration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="glass-panel p-5 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded">
                  {src.country} • {src.type}
                </span>
                <span className="text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                  Verified: {src.lastVerifiedDate}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                {src.title}
              </h3>
              <div className="text-xs font-medium text-slate-400">
                {src.organisation}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {src.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono truncate max-w-[200px]">
                {src.url}
              </span>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition flex items-center gap-1.5 shrink-0 shadow-[0_0_10px_rgba(0,242,255,0.3)] cursor-pointer"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

