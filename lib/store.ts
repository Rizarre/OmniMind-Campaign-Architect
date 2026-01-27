// Zustand store for global state management

import { create } from 'zustand';
import { MediaPlan, Scenario, CampaignInput } from './types';

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

    // Actions
    setCurrentPlan: (plan: MediaPlan) => void;
    setCampaignInput: (input: CampaignInput) => void;
    setIsGenerating: (loading: boolean) => void;
    setIsRefining: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Scenario actions
    addScenario: (scenario: Scenario) => void;
    setActiveScenario: (id: string) => void;
    deleteScenario: (id: string) => void;

    // Budget updates
    updateBudget: (newBudget: number) => void;
    updateFunnelWeights: (weights: { [key: string]: number }) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    currentPlan: null,
    campaignInput: null,
    scenarios: [],
    activeScenarioId: null,
    isGenerating: false,
    isRefining: false,
    error: null,

    setCurrentPlan: (plan) => set({ currentPlan: plan }),
    setCampaignInput: (input) => set({ campaignInput: input }),
    setIsGenerating: (loading) => set({ isGenerating: loading }),
    setIsRefining: (loading) => set({ isRefining: loading }),
    setError: (error) => set({ error }),

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
                totalBudget: newBudget
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
    })
}));
