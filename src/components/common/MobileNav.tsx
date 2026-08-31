import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  FileText, 
  Calculator, 
  MoreHorizontal,
  Send,
  Globe2,
  BookmarkCheck,
  Sparkles,
  UserCircle,
  Wrench,
  X
} from 'lucide-react';

interface Props {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const MobileNav: React.FC<Props> = ({ activeView, onNavigate }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: MapPin },
    { id: 'documents', label: 'Docs', icon: FileText },
    { id: 'costs', label: 'Costs', icon: Calculator },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  const moreItems = [
    { id: 'applications', label: 'Applications', icon: Send },
    { id: 'assistant', label: 'Ask NursePath AI', icon: Sparkles, badge: 'AI' },
    { id: 'navigator', label: 'Country Navigator', icon: Globe2 },
    { id: 'vault', label: 'Official Links Vault', icon: BookmarkCheck },
    { id: 'profile', label: 'Profile & Journeys', icon: UserCircle },
    { id: 'admin', label: 'Regulatory Database', icon: Wrench },
  ];

  const handleTabClick = (id: string) => {
    if (id === 'more') {
      setShowMoreMenu(true);
    } else {
      setShowMoreMenu(false);
      onNavigate(id);
    }
  };

  const handleMoreItemClick = (id: string) => {
    setShowMoreMenu(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Bottom Sticky Tab Bar */}
      <div id="mobile-bottom-navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#030305]/90 border-t border-white/[0.08] px-2 py-1.5 backdrop-blur-xl flex items-center justify-around">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === 'more' ? showMoreMenu : activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold transition cursor-pointer ${
                isActive
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* More Menu Drawer/Modal */}
      {showMoreMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end justify-center p-4">
          <div className="w-full max-w-md bg-[#090D16] rounded-2xl p-5 shadow-2xl border border-white/10 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base text-white">System Tools</h3>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMoreItemClick(item.id)}
                    className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(0,242,255,0.2)]'
                        : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

