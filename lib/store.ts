// Zustand store for global state management

import { create } from 'zustand';
import { MediaPlan, Scenario, CampaignInput, InsightData } from './types';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
    // Current campaign
    currentPlan: MediaPlan | null;
    campaignInput: CampaignInput | null;

    // Scenarios
    scenarios: Scenario[];
    activeScenarioId: string | null;

    // UI state
    isGenerating: boolean;
    isRefining: boolean;
    error: string | null;
    insights: InsightData | null;

    // Actions
    setCurrentPlan: (plan: MediaPlan) => void;
    setCampaignInput: (input: CampaignInput) => void;
    setIsGenerating: (loading: boolean) => void;
    setIsRefining: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPrompt: (prompt: string) => void;

    // Scenario actions
    addScenario: (scenario: Scenario) => void;
    setActiveScenario: (id: string) => void;
    deleteScenario: (id: string) => void;

    // Budget updates
    updateBudget: (newBudget: number) => void;
    updateDuration: (newDuration: number) => void;
    updateFunnelWeights: (weights: { [key: string]: number }) => void;
    fetchInsights: (query: string) => Promise<void>;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            currentPlan: null,
            campaignInput: null,
            scenarios: [],
            activeScenarioId: null,
            isGenerating: false,
            isRefining: false,
            error: null,
            insights: null,

            setCurrentPlan: (plan) => set({ currentPlan: plan }),
            setCampaignInput: (input) => set({ campaignInput: input }),
            setIsGenerating: (loading) => set({ isGenerating: loading }),
            setIsRefining: (loading) => set({ isRefining: loading }),
            setError: (error) => set({ error }),
            setPrompt: (prompt) => set((state) => ({
                campaignInput: state.campaignInput
                    ? { ...state.campaignInput, prompt }
                    : { prompt, budget: 50000 }
            })),

            addScenario: (scenario) => set((state) => ({
                scenarios: [...state.scenarios, scenario]
            })),

            setActiveScenario: (id) => set({ activeScenarioId: id }),

            deleteScenario: (id) => set((state) => ({
                scenarios: state.scenarios.filter(s => s.id !== id),
                activeScenarioId: state.activeScenarioId === id ? null : state.activeScenarioId
            })),

            updateBudget: (newBudget) => set((state) => {
                if (!state.currentPlan) return state;

                const newFormats = { ...state.currentPlan.formats };
                const awarenessFormats = new Set(newFormats['Awareness'] || []);

                if (newBudget >= 50000) {
                    awarenessFormats.add('Connected TV');
                    awarenessFormats.add('Programmatic Audio');
                } else {
                    awarenessFormats.delete('Connected TV');
                    awarenessFormats.delete('Programmatic Audio');
                }

                if (newBudget >= 30000) {
                    awarenessFormats.add('Digital OOH');
                } else {
                    awarenessFormats.delete('Digital OOH');
                }
                newFormats['Awareness'] = Array.from(awarenessFormats);

                let newTactics = [...state.currentPlan.tactics];
                const hasGeoFencing = newTactics.find(t => (typeof t === 'string' ? t : t.name) === 'Geo-fencing');

                if (newBudget >= 20000 && !hasGeoFencing) {
                    newTactics.push({
                        name: 'Geo-fencing',
                        description: 'Real-time location targeting to reach users near physical locations.',
                        metric_label: 'Visit Rate',
                        metric_value: 12
                    } as any);
                } else if (newBudget < 20000 && hasGeoFencing) {
                    newTactics = newTactics.filter(t => (typeof t === 'string' ? t : t.name) !== 'Geo-fencing');
                }

                const updatedFunnel = state.currentPlan.funnel.map(stage => ({
                    ...stage,
                    budget_amount: (newBudget * stage.budget_pct) / 100
                }));

                const updatedBudgetSplit: { [key: string]: number } = {};
                Object.keys(state.currentPlan.budget_split).forEach(key => {
                    const pct = state.currentPlan!.budget_split[key] / (state.currentPlan!.totalBudget || 1);
                    updatedBudgetSplit[key] = newBudget * pct;
                });

                return {
                    currentPlan: {
                        ...state.currentPlan,
                        funnel: updatedFunnel,
                        budget_split: updatedBudgetSplit,
                        formats: newFormats,
                        tactics: newTactics,
                        totalBudget: newBudget
                    }
                };
            }),

            updateDuration: (newDuration) => set((state) => {
                if (!state.currentPlan) return state;

                let funnel = state.currentPlan.funnel.map(f => ({ ...f }));
                const awarenessIdx = funnel.findIndex(f => f.stage === 'Awareness');
                const conversionIdx = funnel.findIndex(f => f.stage === 'Conversion');

                if (awarenessIdx !== -1 && conversionIdx !== -1) {
                    let shift = 0;
                    if (newDuration < 20) shift = 10;
                    else if (newDuration > 50) shift = -10;

                    if (shift !== 0) {
                        if (shift > 0) {
                            funnel[conversionIdx].budget_pct = Math.min(60, 30 + shift);
                            funnel[awarenessIdx].budget_pct = Math.max(10, 40 - shift);
                        } else {
                            funnel[awarenessIdx].budget_pct = Math.min(70, 40 - shift);
                            funnel[conversionIdx].budget_pct = Math.max(10, 30 + shift);
                        }
                        const used = funnel[awarenessIdx].budget_pct + funnel[conversionIdx].budget_pct;
                        const considerationIdx = funnel.findIndex(f => f.stage === 'Consideration');
                        if (considerationIdx !== -1) {
                            funnel[considerationIdx].budget_pct = 100 - used;
                        }
                    }
                }

                const totalBudget = state.currentPlan.totalBudget || 0;
                funnel = funnel.map(stage => ({
                    ...stage,
                    budget_amount: (totalBudget * stage.budget_pct) / 100
                }));

                let audiences = [...state.currentPlan.audiences];
                if (newDuration > 40) {
                    if (!audiences.find(a => a.name === 'Loyalty & Retention')) {
                        audiences.push({
                            name: 'Loyalty & Retention',
                            targeting: ['Past Purchasers', 'High LTV'],
                            description: 'Re-engaging existing customers for repeat purchase.'
                        });
                    }
                } else {
                    audiences = audiences.filter(a => a.name !== 'Loyalty & Retention');
                }

                let newTactics = [...state.currentPlan.tactics];
                const hasFlighting = newTactics.find(t => (typeof t === 'string' ? t : t.name) === 'Flighting Strategy');

                if (newDuration > 45) {
                    if (!hasFlighting) {
                        newTactics.push({
                            name: 'Flighting Strategy',
                            description: 'Strategic timing of ad delivery to maximize impact during peak periods.',
                            metric_label: 'Efficiency',
                            metric_value: 20
                        } as any);
                    }
                } else {
                    newTactics = newTactics.filter(t => (typeof t === 'string' ? t : t.name) !== 'Flighting Strategy');
                }

                const newFormats = { ...state.currentPlan.formats };
                return {
                    currentPlan: {
                        ...state.currentPlan,
                        funnel: funnel,
                        audiences: audiences,
                        tactics: newTactics,
                        formats: newFormats,
                        duration: newDuration
                    }
                };
            }),

            updateFunnelWeights: (weights) => set((state) => {
                if (!state.currentPlan) return state;

                const totalBudget = state.currentPlan.totalBudget || 0;
                const updatedFunnel = state.currentPlan.funnel.map(stage => {
                    const newPct = weights[stage.stage] || stage.budget_pct;
                    return {
                        ...stage,
                        budget_pct: newPct,
                        budget_amount: (totalBudget * newPct) / 100
                    };
                });

                const updatedBudgetSplit: { [key: string]: number } = {};
                updatedFunnel.forEach(stage => {
                    updatedBudgetSplit[stage.stage] = stage.budget_amount || 0;
                });

                return {
                    currentPlan: {
                        ...state.currentPlan,
                        funnel: updatedFunnel,
                        budget_split: updatedBudgetSplit
                    }
                };
            }),

            fetchInsights: async (query) => {
                await new Promise(resolve => setTimeout(resolve, 1500));
                const mockInsights: InsightData = {
                    localEvents: [
                        `Community Festival in ${query.includes('Seattle') ? 'Seattle' : 'Target Region'}`,
                        "Industry Tech Summit",
                        "Weekend Sports Marathon"
                    ],
                    trendingSearches: [
                        `${query.split(' ').slice(0, 2).join(' ')} comparison`,
                        "best price for advertising",
                        "programmatic trends 2026"
                    ],
                    avgCPM: {
                        video: 12.50 + Math.random() * 5,
                        display: 3.20 + Math.random() * 2,
                        native: 5.80 + Math.random() * 3
                    }
                };
                set({ insights: mockInsights });
            }
        }),
        {
            name: 'omni-mind-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
