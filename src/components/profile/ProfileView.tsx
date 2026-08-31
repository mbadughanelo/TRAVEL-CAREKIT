import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  Check, 
  AlertTriangle, 
  ChevronRight
} from 'lucide-react';
import { UserProfile, Journey } from '../../types';

interface Props {
  userProfile: UserProfile;
  journeys: Journey[];
  activeJourney: Journey | null;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  onSwitchJourney: (journeyId: string) => void;
  onStartNewJourney: () => void;
  onResetAllData: () => void;
}

export const ProfileView: React.FC<Props> = ({
  userProfile,
  journeys,
  activeJourney,
  onUpdateProfile,
  onSwitchJourney,
  onStartNewJourney,
  onResetAllData
}) => {
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [experience, setExperience] = useState(userProfile.experience);
  const [isPractising, setIsPractising] = useState(userProfile.currentlyPractisingClinically);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...userProfile,
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined,
      email: email.trim() || undefined,
      experience,
      currentlyPractisingClinically: isPractising,
      updatedAt: new Date().toISOString()
    };
    onUpdateProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div id="profile-view" className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono font-extrabold text-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.2)]">
            {userProfile.firstName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              {userProfile.firstName} {userProfile.lastName || ''}
            </h1>
            <p className="text-xs text-slate-400">
              Trained in {userProfile.educationCountry} • Practising in {userProfile.currentPracticeCountry}
            </p>
          </div>
        </div>

        <button
          onClick={onStartNewJourney}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Destination Journey</span>
        </button>
      </div>

      {/* 2 Column Layout: Profile Form & Multi-Journeys */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Edit Profile */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-base font-bold text-white">Professional Background Information</h2>
            {isSaved && (
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
                className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-0.5">Initial Education</span>
                <p className="font-bold text-white">{userProfile.educationCountry}</p>
                <p className="text-slate-400 text-[11px]">{userProfile.qualification} ({userProfile.yearQualified})</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-0.5">Current Practice</span>
                <p className="font-bold text-white">{userProfile.currentPracticeCountry}</p>
                <p className="text-slate-400 text-[11px]">{userProfile.experience} experience</p>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-2">Active Clinical Practice Status</label>
              <div className="flex gap-3">
                <label className={`flex-1 p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                  isPractising ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' : 'border-white/10 bg-white/[0.02] text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="practisingStatus"
                    checked={isPractising === true}
                    onChange={() => setIsPractising(true)}
                    className="accent-cyan-400"
                  />
                  <span>Currently Practising</span>
                </label>
                <label className={`flex-1 p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                  !isPractising ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' : 'border-white/10 bg-white/[0.02] text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="practisingStatus"
                    checked={isPractising === false}
                    onChange={() => setIsPractising(false)}
                    className="accent-amber-400"
                  />
                  <span>Career Break / Non-Clinical</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition shadow-[0_0_15px_rgba(0,242,255,0.4)] flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Multi-Journeys & Reset */}
        <div className="space-y-6">
          {/* Journeys List */}
          <div className="glass-panel p-6 space-y-4">
            <h2 className="text-base font-bold text-white">My Saved Destinations</h2>

            <div className="space-y-2.5">
              {journeys.map((j) => {
                const isActive = activeJourney?.id === j.id;
                return (
                  <div
                    key={j.id}
                    className={`p-3.5 rounded-xl border transition ${
                      isActive
                        ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_10px_rgba(0,242,255,0.15)]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white truncate max-w-[180px]">
                        {j.title}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-mono font-bold uppercase bg-cyan-500 text-slate-950 px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">
                      Target: {j.targetTimeline || '6–12 months'}
                    </p>

                    {!isActive && (
                      <button
                        onClick={() => onSwitchJourney(j.id)}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Switch to this journey</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset / Clear Data */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-rose-300 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Reset & Clear Local Data</span>
            </div>
            <p className="text-rose-200/80 leading-relaxed text-[11px]">
              This will remove all saved tasks, custom documents, and journey records from this device.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all NursePath data? This will restore the initial onboarding state.')) {
                  onResetAllData();
                }
              }}
              className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition cursor-pointer"
            >
              Reset All Local Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

