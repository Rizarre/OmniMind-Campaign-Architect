import { z } from 'zod';
import { SkillDefinition } from '../types';
import { CampaignInput } from '@/lib/types';

export const MediaPlanningSchema = z.object({
    funnel: z.array(z.object({
        stage: z.string(),
        kpis: z.array(z.string()),
        budget_pct: z.number()
    })),
    audiences: z.array(z.object({
        name: z.string(),
        targeting: z.array(z.string()),
        description: z.string()
    })),
    formats: z.object({
        Awareness: z.array(z.string()),
        Consideration: z.array(z.string()),
        Conversion: z.array(z.string())
    }),
    tactics: z.array(z.string()),
    budget_split: z.object({
        Awareness: z.number(),
        Consideration: z.number(),
        Conversion: z.number()
    })
});

export const MediaPlanningSkill: SkillDefinition<CampaignInput, z.infer<typeof MediaPlanningSchema>> = {
    name: 'media-planning',
    description: 'Generates comprehensive programmatic media plans from campaign goals',
    version: '1.0.0',
    schema: MediaPlanningSchema,
    generatePrompt: (input: CampaignInput) => `
You are an expert media strategist. Generate a comprehensive programmatic advertising media plan...

Campaign Goal: ${input.prompt}
${input.budget ? `Budget: $${input.budget}` : ''}
${input.location ? `Location: ${input.location}` : ''}
${input.objective ? `Objective: ${input.objective}` : ''}
${input.industry ? `Industry: ${input.industry}` : ''}

Create a detailed media plan with the following structure:
1. Funnel Strategy (Awareness, Consideration, Conversion)
2. Audience Segments (High-potential groups)
3. Ad Formats (Optimal creative types)
4. Targeting Tactics (Geo-fencing, contextual, etc.)
5. Budget Allocation

Return strictly tailored strategies based on the specific industry and location provided.
`
};
