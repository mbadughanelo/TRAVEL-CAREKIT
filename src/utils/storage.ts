import { 
  UserProfile, 
  Journey, 
  RoadmapTask, 
  DocumentItem, 
  CostItem, 
  ApplicationItem, 
  CountryCode 
} from '../types';
import { 
  DEMO_USER_PROFILE, 
  DEMO_JOURNEY, 
  DEMO_ROADMAP_TASKS, 
  DEMO_DOCUMENTS, 
  DEMO_COST_ITEMS, 
  DEMO_APPLICATIONS 
} from '../data/demoData';
import { generatePersonalizedPathway } from './ruleEngine';

const STORAGE_KEYS = {
  USER_PROFILE: 'nursepath_user_profile',
  JOURNEYS: 'nursepath_journeys',
  ROADMAP_TASKS: 'nursepath_roadmap_tasks',
  DOCUMENTS: 'nursepath_documents',
  COSTS: 'nursepath_costs',
  APPLICATIONS: 'nursepath_applications',
  IS_DEMO_MODE: 'nursepath_is_demo_mode',
  ADMIN_REGULATORY: 'nursepath_admin_regulatory'
};

export class StorageManager {
  // Check if demo mode active
  static isDemoMode(): boolean {
    return localStorage.getItem(STORAGE_KEYS.IS_DEMO_MODE) === 'true';
  }

  static setDemoMode(enable: boolean) {
    if (enable) {
      localStorage.setItem(STORAGE_KEYS.IS_DEMO_MODE, 'true');
      this.saveUserProfile(DEMO_USER_PROFILE);
      this.saveJourneys([DEMO_JOURNEY]);
      this.saveRoadmapTasks(DEMO_ROADMAP_TASKS);
      this.saveDocuments(DEMO_DOCUMENTS);
      this.saveCosts(DEMO_COST_ITEMS);
      this.saveApplications(DEMO_APPLICATIONS);
    } else {
      localStorage.removeItem(STORAGE_KEYS.IS_DEMO_MODE);
      // Clean up demo items if any
      this.clearAll();
    }
  }

  static getUserProfile(): UserProfile | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  static saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }

  static getJourneys(): Journey[] {
    const raw = localStorage.getItem(STORAGE_KEYS.JOURNEYS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static saveJourneys(journeys: Journey[]): void {
    localStorage.setItem(STORAGE_KEYS.JOURNEYS, JSON.stringify(journeys));
  }

  static getActiveJourney(): Journey | null {
    const profile = this.getUserProfile();
    const journeys = this.getJourneys();
    if (!profile || journeys.length === 0) return null;
    return journeys.find(j => j.id === profile.activeJourneyId) || journeys[0] || null;
  }

  static createNewJourney(
    profile: UserProfile, 
    destinationCountry: CountryCode, 
    destinationStateOrProvince?: string, 
    targetTimeline?: any
  ): { journey: Journey; tasks: RoadmapTask[]; documents: DocumentItem[]; costs: CostItem[] } {
    const newJourneyId = `journey-${Date.now()}`;
    const title = `${profile.educationCountry || 'International'} RN to ${destinationCountry}${destinationStateOrProvince ? ` (${destinationStateOrProvince})` : ''}`;
    
    const newJourney: Journey = {
      id: newJourneyId,
      userId: profile.id,
      title,
      destinationCountry,
      destinationStateOrProvince,
      targetTimeline: targetTimeline || '6–12 months',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const pathway = generatePersonalizedPathway(profile, newJourney);
    newJourney.pathwayVariant = pathway.pathwayVariant;

    // Save journey
    const existingJourneys = this.getJourneys();
    this.saveJourneys([...existingJourneys, newJourney]);

    // Update active journey in user profile
    const updatedProfile: UserProfile = {
      ...profile,
      activeJourneyId: newJourneyId,
      updatedAt: new Date().toISOString()
    };
    this.saveUserProfile(updatedProfile);

    // Save tasks, documents, costs
    const existingTasks = this.getRoadmapTasks().filter(t => t.journeyId !== newJourneyId);
    this.saveRoadmapTasks([...existingTasks, ...pathway.tasks]);

    const existingDocs = this.getDocuments().filter(d => d.journeyId !== newJourneyId);
    this.saveDocuments([...existingDocs, ...pathway.documents]);

    const existingCosts = this.getCosts().filter(c => c.journeyId !== newJourneyId);
    this.saveCosts([...existingCosts, ...pathway.costs]);

    return {
      journey: newJourney,
      tasks: pathway.tasks,
      documents: pathway.documents,
      costs: pathway.costs
    };
  }

  static switchActiveJourney(journeyId: string): void {
    const profile = this.getUserProfile();
    if (profile) {
      profile.activeJourneyId = journeyId;
      profile.updatedAt = new Date().toISOString();
      this.saveUserProfile(profile);
    }
  }

  static getRoadmapTasks(journeyId?: string): RoadmapTask[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ROADMAP_TASKS);
    if (!raw) return [];
    try {
      const all: RoadmapTask[] = JSON.parse(raw);
      if (journeyId) {
        return all.filter(t => t.journeyId === journeyId);
      }
      return all;
    } catch {
      return [];
    }
  }

  static saveRoadmapTasks(tasks: RoadmapTask[]): void {
    localStorage.setItem(STORAGE_KEYS.ROADMAP_TASKS, JSON.stringify(tasks));
  }

  static updateRoadmapTask(updatedTask: RoadmapTask): void {
    const tasks = this.getRoadmapTasks();
    const idx = tasks.findIndex(t => t.id === updatedTask.id);
    if (idx >= 0) {
      tasks[idx] = updatedTask;
      this.saveRoadmapTasks(tasks);
    }
  }

  static getDocuments(journeyId?: string): DocumentItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    if (!raw) return [];
    try {
      const all: DocumentItem[] = JSON.parse(raw);
      if (journeyId) {
        return all.filter(d => d.journeyId === journeyId);
      }
      return all;
    } catch {
      return [];
    }
  }

  static saveDocuments(docs: DocumentItem[]): void {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
  }

  static updateDocument(updatedDoc: DocumentItem): void {
    const docs = this.getDocuments();
    const idx = docs.findIndex(d => d.id === updatedDoc.id);
    if (idx >= 0) {
      docs[idx] = updatedDoc;
      this.saveDocuments(docs);
    }
  }

  static getCosts(journeyId?: string): CostItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.COSTS);
    if (!raw) return [];
    try {
      const all: CostItem[] = JSON.parse(raw);
      if (journeyId) {
        return all.filter(c => c.journeyId === journeyId);
      }
      return all;
    } catch {
      return [];
    }
  }

  static saveCosts(costs: CostItem[]): void {
    localStorage.setItem(STORAGE_KEYS.COSTS, JSON.stringify(costs));
  }

  static updateCost(updatedCost: CostItem): void {
    const costs = this.getCosts();
    const idx = costs.findIndex(c => c.id === updatedCost.id);
    if (idx >= 0) {
      costs[idx] = updatedCost;
      this.saveCosts(costs);
    }
  }

  static deleteCost(costId: string): void {
    const costs = this.getCosts().filter(c => c.id !== costId);
    this.saveCosts(costs);
  }

  static getApplications(journeyId?: string): ApplicationItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) return [];
    try {
      const all: ApplicationItem[] = JSON.parse(raw);
      if (journeyId) {
        return all.filter(a => a.journeyId === journeyId);
      }
      return all;
    } catch {
      return [];
    }
  }

  static saveApplications(apps: ApplicationItem[]): void {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  }

  static updateApplication(updatedApp: ApplicationItem): void {
    const apps = this.getApplications();
    const idx = apps.findIndex(a => a.id === updatedApp.id);
    if (idx >= 0) {
      apps[idx] = updatedApp;
      this.saveApplications(apps);
    }
  }

  static deleteApplication(appId: string): void {
    const apps = this.getApplications().filter(a => a.id !== appId);
    this.saveApplications(apps);
  }

  static clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.JOURNEYS);
    localStorage.removeItem(STORAGE_KEYS.ROADMAP_TASKS);
    localStorage.removeItem(STORAGE_KEYS.DOCUMENTS);
    localStorage.removeItem(STORAGE_KEYS.COSTS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.IS_DEMO_MODE);
  }
}
