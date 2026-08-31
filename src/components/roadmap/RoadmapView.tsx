import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Search, 
  Plus, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  Printer,
  Info
} from 'lucide-react';
import { 
  UserProfile, 
  Journey, 
  RoadmapTask, 
  TaskStatus, 
  JourneyStage 
} from '../../types';
import { STAGE_DEFINITIONS } from '../../data/regulatoryData';

interface Props {
  userProfile: UserProfile;
  activeJourney: Journey;
  tasks: RoadmapTask[];
  onUpdateTask: (task: RoadmapTask) => void;
  onAddTask: (newTask: RoadmapTask) => void;
  onOpenExportModal: () => void;
}

export const RoadmapView: React.FC<Props> = ({
  activeJourney,
  tasks,
  onUpdateTask,
  onAddTask,
  onOpenExportModal
}) => {
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Add task modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStage, setNewStage] = useState<JourneyStage>('application');
  const [newRegulator, setNewRegulator] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (selectedStage !== 'all' && task.stage !== selectedStage) return false;
    if (selectedStatus !== 'all' && task.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description.toLowerCase().includes(q);
      const matchReg = task.regulatorName?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchReg) return false;
    }
    return true;
  });

  const handleToggleExpand = (id: string) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: RoadmapTask = {
      id: `${activeJourney.id}-task-custom-${Date.now()}`,
      journeyId: activeJourney.id,
      stage: newStage,
      title: newTitle.trim(),
      description: newDescription.trim() || 'Custom roadmap milestone added by user.',
      status: 'Not Started',
      isRequired: false,
      regulatorName: newRegulator.trim() || undefined,
      lastVerifiedDate: 'User Added',
      targetDate: newTargetDate || undefined,
      order: tasks.length + 1
    };

    onAddTask(newTask);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewRegulator('');
    setNewTargetDate('');
  };

  return (
    <div id="roadmap-view-container" className="space-y-6">
      {/* Header with Title & Action */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 mb-1">
            <span>DETERMINISTIC REGULATORY PATHWAY</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">{tasks.length} TOTAL MILESTONES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Personalized Nursing Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {activeJourney.title} — Verified against 2026 standards
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Task</span>
          </button>
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Print Roadmap</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks, exams, regulators (e.g. NCLEX, CRNA, IELTS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-xs font-medium text-slate-300 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="all">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="Researching">Researching</option>
              <option value="Requested">Requested</option>
              <option value="In Progress">In Progress</option>
              <option value="Action Required">Action Required</option>
              <option value="Completed">Completed</option>
              <option value="Waived / Not Applicable">Waived / N/A</option>
            </select>
          </div>
        </div>

        {/* Stage Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition cursor-pointer ${
              selectedStage === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,242,255,0.3)]'
                : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white border border-white/10'
            }`}
          >
            All Stages ({tasks.length})
          </button>
          {STAGE_DEFINITIONS.map((stage) => {
            const count = tasks.filter(t => t.stage === stage.id).length;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                  selectedStage === stage.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,242,255,0.3)]'
                    : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white border border-white/10'
                }`}
              >
                <span>{stage.title}</span>
                <span className="text-[10px] opacity-75 font-normal">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="glass-panel p-12 text-center text-slate-400">
            <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="font-semibold text-sm">No roadmap tasks match your filters.</p>
            <button
              onClick={() => {
                setSelectedStage('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-cyan-400 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isExpanded = expandedTaskId === task.id;
            const isCompleted = task.status === 'Completed';

            return (
              <div
                key={task.id}
                className={`glass-panel transition border ${
                  isCompleted 
                    ? 'border-cyan-500/30 bg-cyan-950/10' 
                    : task.status === 'Action Required'
                    ? 'border-amber-500/40 bg-amber-950/10'
                    : 'hover:border-white/20'
                }`}
              >
                {/* Main Task Summary Row */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Status Checkbox */}
                    <button
                      onClick={() => {
                        onUpdateTask({
                          ...task,
                          status: isCompleted ? 'Not Started' : 'Completed'
                        });
                      }}
                      title={isCompleted ? 'Mark Incomplete' : 'Mark Completed'}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition cursor-pointer ${
                        isCompleted
                          ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,242,255,0.5)]'
                          : 'border-2 border-white/20 hover:border-cyan-400 bg-white/[0.02] text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 font-mono">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
                          {task.stage}
                        </span>
                        {task.isRequired ? (
                          <span className="text-[10px] font-bold uppercase text-red-300 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/30">
                            Required
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/10">
                            Optional
                          </span>
                        )}
                        {task.regulatorName && (
                          <span className="text-[10px] font-medium text-cyan-300">
                            • {task.regulatorName}
                          </span>
                        )}
                      </div>

                      <h3 className={`text-sm sm:text-base font-bold ${
                        isCompleted ? 'text-slate-500 line-through' : 'text-white'
                      }`}>
                        {task.title}
                      </h3>
                      
                      <p className="text-xs text-slate-400 leading-relaxed max-w-3xl line-clamp-2">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  {/* Status Dropdown & Action */}
                  <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                    <select
                      value={task.status}
                      onChange={(e) => onUpdateTask({ ...task, status: e.target.value as TaskStatus })}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer ${
                        task.status === 'Completed'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : task.status === 'Action Required'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-[#090D16] text-slate-300 border-white/10'
                      }`}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="Researching">Researching</option>
                      <option value="Requested">Requested</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Action Required">Action Required</option>
                      <option value="Completed">Completed</option>
                      <option value="Waived / Not Applicable">Waived / N/A</option>
                    </select>

                    <button
                      onClick={() => handleToggleExpand(task.id)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                      title="View details & notes"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-white/10 bg-black/30 rounded-b-2xl space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Regulator Info */}
                      <div>
                        <span className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">
                          Official Authority
                        </span>
                        <p className="font-semibold text-white">
                          {task.regulatorName || 'Relevant Health Authority'}
                        </p>
                        {task.officialSourceUrl && (
                          <a
                            href={task.officialSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 font-semibold underline flex items-center gap-1 mt-1"
                          >
                            <span>{task.officialSourceName || 'Official Source Portal'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                          Verified: {task.lastVerifiedDate}
                        </span>
                      </div>

                      {/* Fees and Target Date */}
                      <div>
                        <span className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">
                          Estimated Regulatory Fee
                        </span>
                        <p className="font-semibold text-white">
                          {task.estimatedFee ? `${task.currency || 'USD'} ${task.estimatedFee}` : 'No direct fee / included'}
                        </p>

                        <div className="mt-2">
                          <span className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">
                            Target Completion Date
                          </span>
                          <input
                            type="date"
                            value={task.targetDate || ''}
                            onChange={(e) => onUpdateTask({ ...task, targetDate: e.target.value })}
                            className="p-1.5 bg-white/[0.04] border border-white/10 text-white rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      {/* Personal Notes */}
                      <div>
                        <span className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">
                          Personal Notes & Reference IDs
                        </span>
                        <textarea
                          rows={2}
                          placeholder="e.g. submitted on 12th, reference #CRNA-298..."
                          value={task.userNotes || ''}
                          onChange={(e) => onUpdateTask({ ...task, userNotes: e.target.value })}
                          className="w-full p-2 bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 rounded-lg text-xs focus:outline-none focus:border-cyan-500/50"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090D16] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Add Custom Roadmap Milestone</h2>
            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule meeting with hospital recruiter"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details and action items..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-white"
                  >
                    {STAGE_DEFINITIONS.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Target Date</label>
                  <input
                    type="date"
                    value={newTargetDate}
                    onChange={(e) => setNewTargetDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Regulator / Organisation (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. CRNA, NMC, Pearson VUE, Employer"
                  value={newRegulator}
                  onChange={(e) => setNewRegulator(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white"
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
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

