// Service to handle Campaign Brain logic (Data Aggregation & Strategy)

import { CampaignBrainOutputSchema } from './skills/campaign-brain/definition';
import { z } from 'zod';

type BrainOutput = z.infer<typeof CampaignBrainOutputSchema>;

// Mock data generator for the "Brain"
// In a real app, this would ingest data from APIs
export const BrainService = {
    async getDailyBrief(campaignId: string): Promise<BrainOutput> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            strategic_brief: [
                "Turnout among suburban women is dropping slightly; shift focus to healthcare messaging.",
                "Competitor 'Vertex' has started a heavy video push in Seattle.",
                "Mobile conversion rates are peaking between 8 PM and 11 PM."
            ],
            opportunities: [
                {
                    type: 'channel',
                    description: "TikTok engagement on 'authenticity' content is up 40%",
                    impact_score: 8,
                    action: "Shift 12% of Awareness budget to TikTok User-Generated Content"
                },
                {
                    type: 'audience',
                    description: "Gen Z segment showing high interest in sustainability angle",
                    impact_score: 7,
                    action: "Create dedicated ad group for Gen Z with 'Green' messaging"
                }
            ],
            risks: [
                {
                    type: 'fatigue',
                    description: "Main hero video frequency has crossed 4.2x/user",
                    severity: 'high',
                    mitigation: "Rotate in 2 new creative variations immediately"
                },
                {
                    type: 'competitor',
                    description: "Competitor bidding war on 'organic' keywords",
                    severity: 'medium',
                    mitigation: "Temporarily pause generic keyword bid increases"
                }
            ],
            budget_reallocation: [
                {
                    from_segment: "Desktop Display",
                    to_segment: "Mobile Video",
                    amount_percent: 12,
                    reason: "Mobile conversion efficiency is 2.5x higher this week"
                }
            ]
        };
    }
};
