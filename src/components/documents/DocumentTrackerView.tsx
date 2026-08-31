import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  UserProfile, 
  Journey, 
  DocumentItem, 
  DocumentCategory, 
  DocumentStatus 
} from '../../types';
import { calculateDocumentStats } from '../../utils/ruleEngine';

interface Props {
  userProfile: UserProfile;
  activeJourney: Journey;
  documents: DocumentItem[];
  onUpdateDocument: (doc: DocumentItem) => void;
  onAddDocument: (newDoc: DocumentItem) => void;
}

const CATEGORIES: DocumentCategory[] = [
  'Identity',
  'Nursing Education',
  'Nursing Registration',
  'Employment',
  'English',
  'Regulatory'
];

export const DocumentTrackerView: React.FC<Props> = ({
  activeJourney,
  documents,
  onUpdateDocument,
  onAddDocument
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);

  // Add custom doc state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<DocumentCategory>('Identity');
  const [newDocDescription, setNewDocDescription] = useState('');

  const stats = calculateDocumentStats(documents);

  // Filter documents
  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && doc.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchDesc = doc.description?.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    return true;
  });

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDoc: DocumentItem = {
      id: `${activeJourney.id}-doc-custom-${Date.now()}`,
      journeyId: activeJourney.id,
      name: newDocName.trim(),
      category: newDocCategory,
      description: newDocDescription.trim() || 'Custom user tracked document.',
      isApplicable: true,
      status: 'Need to Request'
    };

    onAddDocument(newDoc);
    setIsAddModalOpen(false);
    setNewDocName('');
    setNewDocDescription('');
  };

  return (
    <div id="document-tracker-view" className="space-y-6">
      {/* Header with Stats Banner */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 mb-1">
            <span>CREDENTIALS & COMPLIANCE VAULT</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">{documents.length} RECORDS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Document & Credentials Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track passports, transcripts, verifications of good standing, and employer statements
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Readiness Meter */}
          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10 text-center sm:text-left min-w-[200px]">
            <div className="flex items-center justify-between gap-3 mb-1.5 text-xs font-bold text-slate-300">
              <span className="font-mono text-[10px] uppercase">READINESS METER</span>
              <span className="text-cyan-400 glow-text">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,242,255,0.6)]"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              {stats.readyOrAccepted} of {stats.total} documents ready
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Document</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents by title or description (e.g. Transcript, Good Standing, IELTS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-xs font-medium text-slate-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Not Needed">Not Needed</option>
            <option value="Need to Request">Need to Request</option>
            <option value="Requested">Requested</option>
            <option value="Waiting">Waiting</option>
            <option value="Received">Received</option>
            <option value="Submitted">Submitted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected / Action Required">Rejected / Action Required</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white border border-white/10'
            }`}
          >
            All Categories ({documents.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = documents.filter(d => d.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                    : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white border border-white/10'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] opacity-75 font-normal">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-2 glass-panel p-12 text-center text-slate-400">
            <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="font-semibold text-sm">No documents found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-cyan-400 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isReady = doc.status === 'Accepted' || doc.status === 'Received';
            const isExpanded = expandedDocId === doc.id;

            return (
              <div
                key={doc.id}
                className={`glass-panel transition p-5 flex flex-col justify-between space-y-4 border ${
                  isReady
                    ? 'border-cyan-500/30 bg-cyan-950/10'
                    : doc.status === 'Rejected / Action Required'
                    ? 'border-red-500/40 bg-red-950/10'
                    : 'hover:border-white/20'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded inline-block mb-1">
                        {doc.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {doc.name}
                      </h3>
                    </div>

                    <select
                      value={doc.status}
                      onChange={(e) => onUpdateDocument({ ...doc, status: e.target.value as DocumentStatus })}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer shrink-0 ${
                        doc.status === 'Accepted' || doc.status === 'Received'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : doc.status === 'Requested' || doc.status === 'Waiting'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : doc.status === 'Rejected / Action Required'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : 'bg-[#090D16] text-slate-300 border-white/10'
                      }`}
                    >
                      <option value="Not Needed">Not Needed</option>
                      <option value="Need to Request">Need to Request</option>
                      <option value="Requested">Requested</option>
                      <option value="Waiting">Waiting</option>
                      <option value="Received">Received</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected / Action Required">Action Required / Rejected</option>
                    </select>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                {/* Footer and expand details */}
                <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono">
                      {doc.notes ? `Note: ${doc.notes}` : (doc.expiryDate ? `Expires: ${doc.expiryDate}` : 'No notes')}
                    </span>
                    <button
                      onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                      className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide' : 'Edit dates & notes'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pt-2 space-y-2 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] uppercase font-mono font-bold text-slate-400">Date Requested</label>
                          <input
                            type="date"
                            value={doc.requestedDate || ''}
                            onChange={(e) => onUpdateDocument({ ...doc, requestedDate: e.target.value })}
                            className="w-full p-1.5 border border-white/10 bg-white/[0.04] text-white rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-mono font-bold text-slate-400">Date Received</label>
                          <input
                            type="date"
                            value={doc.receivedDate || ''}
                            onChange={(e) => onUpdateDocument({ ...doc, receivedDate: e.target.value })}
                            className="w-full p-1.5 border border-white/10 bg-white/[0.04] text-white rounded text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-mono font-bold text-slate-400">Notes / Courier Tracking</label>
                        <input
                          type="text"
                          placeholder="e.g. DHL Waybill #9821873..."
                          value={doc.notes || ''}
                          onChange={(e) => onUpdateDocument({ ...doc, notes: e.target.value })}
                          className="w-full p-1.5 border border-white/10 bg-white/[0.04] text-white placeholder-slate-500 rounded text-xs focus:outline-none focus:border-cyan-500/50"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090D16] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Add Custom Document Item</h2>
            <form onSubmit={handleCreateDocument} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Document Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Certified Marriage Certificate, Specialty ICU Certificate"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value as DocumentCategory)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-white"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Purpose or issuance details..."
                  value={newDocDescription}
                  onChange={(e) => setNewDocDescription(e.target.value)}
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
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

