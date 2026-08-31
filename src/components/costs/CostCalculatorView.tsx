import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Info
} from 'lucide-react';
import { 
  UserProfile, 
  Journey, 
  CostItem, 
  CostCategory, 
  PaymentStatus 
} from '../../types';
import { calculateTotalCostsByCurrency } from '../../utils/ruleEngine';

interface Props {
  userProfile: UserProfile;
  activeJourney: Journey;
  costs: CostItem[];
  onUpdateCost: (cost: CostItem) => void;
  onAddCost: (newCost: CostItem) => void;
  onDeleteCost: (costId: string) => void;
}

const COST_CATEGORIES: CostCategory[] = [
  'Regulator Fees',
  'Credential Evaluation',
  'Examinations',
  'English Language Test',
  'Police / Background Checks',
  'Document Verification',
  'Registration'
];

const CURRENCIES = ['USD', 'CAD', 'GBP', 'AUD', 'EUR', 'NGN', 'INR', 'PHP'];

export const CostCalculatorView: React.FC<Props> = ({
  activeJourney,
  costs,
  onUpdateCost,
  onAddCost,
  onDeleteCost
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Add custom cost modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState<CostCategory>('Regulator Fees');
  const [newCostAmount, setNewCostAmount] = useState<number>(100);
  const [newCurrency, setNewCurrency] = useState('USD');
  const [newNotes, setNewNotes] = useState('');

  const currencyTotals = calculateTotalCostsByCurrency(costs);

  // Filter cost items
  const filteredCosts = costs.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && c.paymentStatus !== selectedStatus) return false;
    return true;
  });

  const handleCreateCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim() || newCostAmount <= 0) return;

    const newCost: CostItem = {
      id: `${activeJourney.id}-cost-custom-${Date.now()}`,
      journeyId: activeJourney.id,
      item: newItem.trim(),
      category: newCategory,
      estimatedCost: Number(newCostAmount),
      currency: newCurrency,
      amountPaid: 0,
      paymentStatus: 'Planned',
      notes: newNotes.trim() || undefined,
      lastVerifiedDate: 'User Added'
    };

    onAddCost(newCost);
    setIsAddModalOpen(false);
    setNewItem('');
    setNewCostAmount(100);
    setNewNotes('');
  };

  return (
    <div id="cost-calculator-view" className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 mb-1">
            <span>FINANCIAL & REGULATORY PROJECTIONS</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">{costs.length} BUDGET ITEMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cost & Fee Estimator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official regulator fees, exam costs, police screenings, and courier budgets
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Expense</span>
        </button>
      </div>

      {/* Multicurrency Totals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currencyTotals.map((tot) => (
          <div key={tot.currency} className="glass-panel p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                {tot.currency} Total Budget
              </span>
              <span className="text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                {tot.currency}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-extrabold text-white glow-text">
                {tot.currency} {tot.estimated.toLocaleString()}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Paid: {tot.currency} {tot.paid.toLocaleString()}</span>
                <span className="font-semibold text-cyan-400">
                  Remaining: {tot.currency} {tot.remaining.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full shadow-[0_0_6px_rgba(0,242,255,0.8)]"
                style={{
                  width: `${tot.estimated > 0 ? Math.min(100, Math.round((tot.paid / tot.estimated) * 100)) : 0}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer Box */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-amber-300">Official Fee Notice:</strong> Estimated fees reflect official rates published by bodies such as NMC, CRNA, CNO, TBON, Pearson VUE, and Ahpra as of August 2026. Fees are charged in the regulator's local currency and may vary based on international credit card conversion rates, VAT/taxes, or regional test center surcharges.
        </p>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-xs font-medium text-slate-300 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Categories</option>
            {COST_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-xs font-medium text-slate-300 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Payment Statuses</option>
            <option value="Planned">Planned</option>
            <option value="Budgeted">Budgeted</option>
            <option value="Paid">Paid</option>
            <option value="Waived">Waived</option>
          </select>
        </div>

        <span className="text-xs font-mono text-slate-400 font-medium">
          SHOWING {filteredCosts.length} ITEMS
        </span>
      </div>

      {/* Costs Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.04] border-b border-white/10 text-slate-400 font-mono font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Expense Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Estimated Cost</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filteredCosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No budget items match your selected filters.
                  </td>
                </tr>
              ) : (
                filteredCosts.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition">
                    <td className="p-4 font-bold text-white max-w-xs">
                      <div>{c.item}</div>
                      {c.notes && (
                        <div className="text-[11px] font-normal text-slate-400 mt-0.5">{c.notes}</div>
                      )}
                    </td>
                    <td className="p-4 text-slate-400">
                      <span className="bg-white/[0.04] border border-white/10 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                        {c.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-200 font-mono">
                      {c.currency} {c.estimatedCost.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 font-mono">
                        <span className="text-slate-400 font-semibold">{c.currency}</span>
                        <input
                          type="number"
                          value={c.amountPaid}
                          onChange={(e) => onUpdateCost({
                            ...c,
                            amountPaid: Number(e.target.value),
                            paymentStatus: Number(e.target.value) >= c.estimatedCost ? 'Paid' : 'Planned'
                          })}
                          className="w-20 p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-white font-medium text-xs text-right focus:outline-none focus:border-cyan-500/50"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <select
                        value={c.paymentStatus}
                        onChange={(e) => {
                          const newStatus = e.target.value as PaymentStatus;
                          onUpdateCost({
                            ...c,
                            paymentStatus: newStatus,
                            amountPaid: newStatus === 'Paid' ? (c.amountPaid || c.estimatedCost) : (newStatus === 'Planned' ? 0 : c.amountPaid),
                            paymentDate: newStatus === 'Paid' ? new Date().toISOString().split('T')[0] : c.paymentDate
                          });
                        }}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                          c.paymentStatus === 'Paid'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : c.paymentStatus === 'Budgeted'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : c.paymentStatus === 'Waived'
                            ? 'bg-white/[0.04] text-slate-400 border-white/10'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        <option value="Planned">Planned</option>
                        <option value="Budgeted">Budgeted</option>
                        <option value="Paid">Paid</option>
                        <option value="Waived">Waived</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDeleteCost(c.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition cursor-pointer"
                        title="Delete cost item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Custom Cost Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090D16] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Add Custom Expense Item</h2>
            <form onSubmit={handleCreateCost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Expense Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flight ticket to London OSCE Centre, NCLEX Prep Course"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as CostCategory)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-white"
                >
                  {COST_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Amount *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newCostAmount}
                    onChange={(e) => setNewCostAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Currency</label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#090D16] text-white"
                  >
                    {CURRENCIES.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. paid on credit card, refundable if cancelled"
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
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

