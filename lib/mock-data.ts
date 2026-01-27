// Mock data for insights and real-time information

import { InsightData } from './types';

export const mockInsights: InsightData = {
    localEvents: [
        "Mother's Day Fair – May 10",
        "Seattle Spring Festival – May 15-17",
        "Local Business Expo – May 20"
    ],
    trendingSearches: [
        "same-day flower delivery",
        "roses near me",
        "mother's day gifts",
        "flower arrangements Seattle",
        "last minute gifts"
    ],
    avgCPM: {
        video: 12,
        display: 5,
        native: 8
    }
};

export const objectiveOptions = [
    { value: 'awareness', label: 'Awareness' },
    { value: 'sales', label: 'Sales' },
    { value: 'app_installs', label: 'App Installs' },
    { value: 'leads', label: 'Leads' }
];

export const industryOptions = [
    { value: 'retail', label: 'Retail' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'saas', label: 'SaaS' },
    { value: 'travel', label: 'Travel & Hospitality' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' }
];

export const tacticDescriptions: { [key: string]: string } = {
    'Geo-fencing': 'Target users within specific geographic boundaries for local relevance.',
    'Contextual targeting': 'Place ads on content related to your product or service.',
    'Day-parting': 'Show ads during specific times when your audience is most active.',
    'Retargeting': 'Re-engage users who have previously interacted with your brand.',
    'Lookalikes': 'Target new users similar to your best customers.'
};
