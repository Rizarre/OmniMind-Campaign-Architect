import { z } from 'zod';
import { SkillDefinition } from '../types';

export const CampaignBrainInputSchema = z.object({
    currentPlan: z.any(), // Weak type for now, but represents the full media plan
    marketData: z.object({
        polling: z.array(z.any()),
        socialSentiment: z.any(),
        competitorSpend: z.any()
    }).optional()
});

export const CampaignBrainOutputSchema = z.object({
    strategic_brief: z.array(z.string()),
    opportunities: z.array(z.object({
        type: z.enum(['audience', 'budget', 'creative', 'channel']),
        description: z.string(),
        impact_score: z.number().min(1).max(10),
        action: z.string()
    })),
    risks: z.array(z.object({
        type: z.enum(['fatigue', 'competitor', 'brand_safety']),
        description: z.string(),
        severity: z.enum(['low', 'medium', 'high']),
        mitigation: z.string()
    })),
    budget_reallocation: z.array(z.object({
        from_segment: z.string(),
        to_segment: z.string(),
        amount_percent: z.number(),
        reason: z.string()
    }))
});

export const CampaignBrainSkill: SkillDefinition<z.infer<typeof CampaignBrainInputSchema>, z.infer<typeof CampaignBrainOutputSchema>> = {
    name: 'campaign-brain',
    description: 'Analyzes campaign data to provide strategic insights and optimizations',
    version: '1.0.0',
    schema: CampaignBrainOutputSchema,
    generatePrompt: (input) => `
You are the "Campaign Brain" - a strategic command center for a major advertising campaign.
Analyze the current situation and provide a daily strategic brief.

Current Plan Context:
${JSON.stringify(input.currentPlan, null, 2)}

Task:
1. Identify immediate strategic opportunities (e.g., under-served audiences, channel efficiency).
2. Flag risks like message fatigue or competitor moves.
3. Recommend budget shifts to maximize impact.
4. Provide a punchy, actionable daily brief.

Output strictly in the requested JSON format.
`
};
