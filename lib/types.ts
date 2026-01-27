// Core TypeScript interfaces for the OmniMind Campaign Architect

export interface FunnelStage {
    stage: string;
    kpis: string[];
    budget_pct: number;
    budget_amount?: number;
}

export interface Audience {
    name: string;
    targeting: string[];
    description?: string;
    estimatedReach?: number;
}

export interface AdFormats {
    [key: string]: string[];
}

export interface BudgetSplit {
    [key: string]: number;
}

export interface MediaPlan {
    funnel: FunnelStage[];
    audiences: Audience[];
    formats: AdFormats;
    tactics: string[];
    budget_split: BudgetSplit;
    totalBudget?: number;
}

export interface CampaignInput {
    prompt: string;
    budget?: number;
    location?: string;
    objective?: string;
    industry?: string;
}

export interface Scenario {
    id: string;
    name: string;
    plan: MediaPlan;
    createdAt: Date;
}

export interface InsightData {
    localEvents: string[];
    trendingSearches: string[];
    avgCPM: {
        video: number;
        display: number;
        native: number;
    };
}

export type ExportFormat = 'json' | 'markdown' | 'pdf';
