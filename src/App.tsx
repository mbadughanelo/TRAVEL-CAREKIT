import React, { useState, useEffect } from 'react';
import { StorageManager } from './utils/storage';
import { 
  UserProfile, 
  Journey, 
  RoadmapTask, 
  DocumentItem, 
  CostItem, 
  ApplicationItem, 
  CountryCode, 
  TimelineTier 
} from './types';

// Components
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { RegulatoryBanner } from './components/common/RegulatoryBanner';
import { DemoBanner } from './components/common/DemoBanner';
import { DisclaimerModal } from './components/common/DisclaimerModal';
import { PrintExportModal } from './components/common/PrintExportModal';

import { LandingPage } from './components/landing/LandingPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { DashboardView } from './components/dashboard/DashboardView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { DocumentTrackerView } from './components/documents/DocumentTrackerView';
import { CostCalculatorView } from './components/costs/CostCalculatorView';
import { ApplicationTrackerView } from './components/applications/ApplicationTrackerView';
import { CountryNavigatorView } from './components/navigator/CountryNavigatorView';
import { OfficialLinksVaultView } from './components/vault/OfficialLinksVaultView';
import { AskNursePathView } from './components/assistant/AskNursePathView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminView } from './components/admin/AdminView';

export function App() {
  // State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [activeJourney, setActiveJourney] = useState<Journey | null>(null);
  const [tasks, setTasks] = useState<RoadmapTask[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [costs, setCosts] = useState<CostItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // View routing
  const [activeView, setActiveView] = useState<string>('landing');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Initialize from LocalStorage
  const loadLocalData = () => {
    const isDemo = StorageManager.isDemoMode();
    setIsDemoMode(isDemo);

    const profile = StorageManager.getUserProfile();
    const storedJourneys = StorageManager.getJourneys();
    const activeJ = StorageManager.getActiveJourney();

    setUserProfile(profile);
    setJourneys(storedJourneys);
    setActiveJourney(activeJ);

    if (activeJ) {
      setTasks(StorageManager.getRoadmapTasks(activeJ.id));
      setDocuments(StorageManager.getDocuments(activeJ.id));
      setCosts(StorageManager.getCosts(activeJ.id));
      setApplications(StorageManager.getApplications(activeJ.id));
      if (activeView === 'landing') {
        setActiveView('dashboard');
      }
    } else {
      setTasks([]);
      setDocuments([]);
      setCosts([]);
      setApplications([]);
    }
  };

  useEffect(() => {
    loadLocalData();
  }, []);

  // Demo mode handler
  const handleLoadDemo = () => {
    StorageManager.setDemoMode(true);
    loadLocalData();
    setIsOnboardingOpen(false);
    setActiveView('dashboard');
  };

  const handleExitDemo = () => {
    StorageManager.setDemoMode(false);
    loadLocalData();
    setIsOnboardingOpen(true);
  };

  const handleResetDemo = () => {
    StorageManager.setDemoMode(true);
    loadLocalData();
  };

  // Onboarding completion
  const handleOnboardingComplete = (
    profile: UserProfile,
    destinationCountry: CountryCode,
    destinationStateOrProvince?: string,
    timeline?: TimelineTier
  ) => {
    // Clear demo mode if it was active
    StorageManager.setDemoMode(false);

    // Save profile and generate journey
    StorageManager.saveUserProfile(profile);
    const result = StorageManager.createNewJourney(
      profile,
      destinationCountry,
      destinationStateOrProvince,
      timeline
    );

    setIsOnboardingOpen(false);
    loadLocalData();
    setActiveView('dashboard');
  };

  // Switch Active Journey
  const handleSwitchJourney = (journeyId: string) => {
    StorageManager.switchActiveJourney(journeyId);
    loadLocalData();
  };

  // Add new journey from Profile or Country Navigator
  const handleSelectDestinationFromNavigator = (country: CountryCode, stateOrProvince?: string) => {
    if (!userProfile) {
      setIsOnboardingOpen(true);
      return;
    }

    if (window.confirm(`Would you like to start a new destination roadmap for ${country}${stateOrProvince ? ` (${stateOrProvince})` : ''}? Your current journey will remain saved.`)) {
      StorageManager.createNewJourney(userProfile, country, stateOrProvince);
      loadLocalData();
      setActiveView('dashboard');
    }
  };

  // Task updater
  const handleUpdateTask = (task: RoadmapTask) => {
    StorageManager.updateRoadmapTask(task);
    setTasks(prev => prev.map(t => t.id === task.id ? task : t));
  };

  const handleAddTask = (newTask: RoadmapTask) => {
    const updated = [...tasks, newTask];
    StorageManager.saveRoadmapTasks(updated);
    setTasks(updated);
  };

  // Document updater
  const handleUpdateDocument = (doc: DocumentItem) => {
    StorageManager.updateDocument(doc);
    setDocuments(prev => prev.map(d => d.id === doc.id ? doc : d));
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    const updated = [...documents, newDoc];
    StorageManager.saveDocuments(updated);
    setDocuments(updated);
  };

  // Cost updater
  const handleUpdateCost = (cost: CostItem) => {
    StorageManager.updateCost(cost);
    setCosts(prev => prev.map(c => c.id === cost.id ? cost : c));
  };

  const handleAddCost = (newCost: CostItem) => {
    const updated = [...costs, newCost];
    StorageManager.saveCosts(updated);
    setCosts(updated);
  };

  const handleDeleteCost = (costId: string) => {
    StorageManager.deleteCost(costId);
    setCosts(prev => prev.filter(c => c.id !== costId));
  };

  // Application updater
  const handleUpdateApplication = (app: ApplicationItem) => {
    StorageManager.updateApplication(app);
    setApplications(prev => prev.map(a => a.id === app.id ? app : a));
  };

  const handleAddApplication = (newApp: ApplicationItem) => {
    const updated = [...applications, newApp];
    StorageManager.saveApplications(updated);
    setApplications(updated);
  };

  const handleDeleteApplication = (appId: string) => {
    StorageManager.deleteApplication(appId);
    setApplications(prev => prev.filter(a => a.id !== appId));
  };

  // Profile updater
  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    StorageManager.saveUserProfile(updatedProfile);
    setUserProfile(updatedProfile);
  };

  // Reset all
  const handleResetAllData = () => {
    StorageManager.clearAll();
    loadLocalData();
    setActiveView('landing');
  };

  // If user opened onboarding wizard
  if (isOnboardingOpen) {
    return (
      <div className="min-h-screen bg-[#030305] text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
        {/* Background ambient glows */}
        <div className="ambient-glow-container absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-900/15 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[100px]" />
          <div className="orbit-ring w-[800px] h-[800px] -top-40 -left-40" />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen justify-between">
          <RegulatoryBanner onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)} compact />
          <OnboardingWizard
            onComplete={handleOnboardingComplete}
            onCancel={() => setIsOnboardingOpen(false)}
          />
          <DisclaimerModal
            isOpen={isDisclaimerModalOpen}
            onClose={() => setIsDisclaimerModalOpen(false)}
          />
        </div>
      </div>
    );
  }

  // If user is on landing page without active profile
  if (activeView === 'landing' && !userProfile) {
    return (
      <div className="min-h-screen bg-[#030305] text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
        {/* Background ambient glows */}
        <div className="ambient-glow-container absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-900/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px]" />
          <div className="orbit-ring w-[800px] h-[800px] -top-40 -left-40" />
          <div className="orbit-ring w-[1200px] h-[1200px] -top-80 -left-80" />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen justify-between">
          <RegulatoryBanner onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)} compact />
          <Header
            userProfile={userProfile}
            activeJourney={activeJourney}
            activeView={activeView}
            onNavigate={(view) => setActiveView(view)}
            onOpenExportModal={() => setIsPrintModalOpen(true)}
            onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
            onStartOnboarding={() => setIsOnboardingOpen(true)}
            onLoadDemo={handleLoadDemo}
          />
          <LandingPage
            onStartOnboarding={() => setIsOnboardingOpen(true)}
            onExploreCountries={() => setActiveView('navigator')}
            onLoadDemo={handleLoadDemo}
            onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
          />
          <DisclaimerModal
            isOpen={isDisclaimerModalOpen}
            onClose={() => setIsDisclaimerModalOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] flex flex-col text-slate-100 relative overflow-x-hidden">
      {/* Background ambient cosmic glow & orbit rings */}
      <div className="ambient-glow-container fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-cyan-900/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full bg-purple-900/15 blur-[130px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-950/20 blur-[150px]" />
        <div className="orbit-ring w-[900px] h-[900px] -top-40 -left-40" />
        <div className="orbit-ring w-[1400px] h-[1400px] -top-80 -left-80" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Demo Banner */}
        {isDemoMode && (
          <DemoBanner
            onExitDemo={handleExitDemo}
            onResetDemo={handleResetDemo}
          />
        )}

        {/* Regulatory Top Alert */}
        <RegulatoryBanner
          onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
          compact
        />

        {/* Main Header */}
        <Header
          userProfile={userProfile}
          activeJourney={activeJourney}
          activeView={activeView}
          onNavigate={(view) => setActiveView(view)}
          onOpenExportModal={() => setIsPrintModalOpen(true)}
          onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
          onStartOnboarding={() => setIsOnboardingOpen(true)}
          onLoadDemo={handleLoadDemo}
        />

        {/* Main Content Area with Desktop Sidebar */}
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Sidebar */}
          <Sidebar
            userProfile={userProfile}
            activeJourney={activeJourney}
            activeView={activeView}
            onNavigate={(view) => setActiveView(view)}
            onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
          />

          {/* Dynamic Main View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto max-w-5xl">
          {activeView === 'dashboard' && userProfile && activeJourney && (
            <DashboardView
              userProfile={userProfile}
              activeJourney={activeJourney}
              tasks={tasks}
              documents={documents}
              costs={costs}
              applications={applications}
              onNavigate={(view) => setActiveView(view)}
              onUpdateTask={handleUpdateTask}
              onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
            />
          )}

          {activeView === 'roadmap' && userProfile && activeJourney && (
            <RoadmapView
              userProfile={userProfile}
              activeJourney={activeJourney}
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onAddTask={handleAddTask}
              onOpenExportModal={() => setIsPrintModalOpen(true)}
            />
          )}

          {activeView === 'documents' && userProfile && activeJourney && (
            <DocumentTrackerView
              userProfile={userProfile}
              activeJourney={activeJourney}
              documents={documents}
              onUpdateDocument={handleUpdateDocument}
              onAddDocument={handleAddDocument}
            />
          )}

          {activeView === 'costs' && userProfile && activeJourney && (
            <CostCalculatorView
              userProfile={userProfile}
              activeJourney={activeJourney}
              costs={costs}
              onUpdateCost={handleUpdateCost}
              onAddCost={handleAddCost}
              onDeleteCost={handleDeleteCost}
            />
          )}

          {activeView === 'applications' && userProfile && activeJourney && (
            <ApplicationTrackerView
              userProfile={userProfile}
              activeJourney={activeJourney}
              applications={applications}
              onUpdateApplication={handleUpdateApplication}
              onAddApplication={handleAddApplication}
              onDeleteApplication={handleDeleteApplication}
            />
          )}

          {activeView === 'navigator' && (
            <CountryNavigatorView
              onSelectDestination={handleSelectDestinationFromNavigator}
              activeDestinationCountry={activeJourney?.destinationCountry}
            />
          )}

          {activeView === 'vault' && (
            <OfficialLinksVaultView
              onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
            />
          )}

          {activeView === 'assistant' && userProfile && activeJourney && (
            <AskNursePathView
              userProfile={userProfile}
              activeJourney={activeJourney}
              tasks={tasks}
              documents={documents}
              costs={costs}
              onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
            />
          )}

          {activeView === 'profile' && userProfile && (
            <ProfileView
              userProfile={userProfile}
              journeys={journeys}
              activeJourney={activeJourney}
              onUpdateProfile={handleUpdateProfile}
              onSwitchJourney={handleSwitchJourney}
              onStartNewJourney={() => setIsOnboardingOpen(true)}
              onResetAllData={handleResetAllData}
            />
          )}

          {activeView === 'admin' && (
            <AdminView />
          )}

          {activeView === 'landing' && (
            <LandingPage
              onStartOnboarding={() => setIsOnboardingOpen(true)}
              onExploreCountries={() => setActiveView('navigator')}
              onLoadDemo={handleLoadDemo}
              onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
      />

      {/* Regulatory Safety Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={() => setIsDisclaimerModalOpen(false)}
      />

      {/* Print / Export Dossier Modal */}
      <PrintExportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        userProfile={userProfile}
        activeJourney={activeJourney}
        tasks={tasks}
        documents={documents}
        costs={costs}
      />
      </div>
    </div>
  );
}

export default App;
