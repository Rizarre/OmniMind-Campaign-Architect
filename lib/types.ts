// Core TypeScript interfaces for the OmniMind Campaign Architect

export interface FunnelStage {
    stage: string;
    kpis: string[];
    budget_pct: number;
    budget_amount?: number;
    rationale?: string;
}

export interface Audience {
    name: string;
    targeting: string[];
    description?: string;
    estimatedReach?: number;
    demographics: string;
    behaviors: string;
    lat: number;
    lng: number;
}

export interface AdFormats {
    [key: string]: string[];
}

export interface BudgetSplit {
    [key: string]: number;
}

export interface Tactic {
    name: string;
    description: string;
    metric_label: string;
    metric_value: number;
}

export interface MediaPlan {
    funnel: FunnelStage[];
    audiences: Audience[];
    formats: AdFormats;
    tactics: Tactic[];
    budget_split: BudgetSplit;
    totalBudget?: number;
    duration?: number;
    masterRationale?: string;
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
