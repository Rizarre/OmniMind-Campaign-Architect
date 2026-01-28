import { z } from 'zod';
import { SkillDefinition } from '../types';

export const CreativeTestingInputSchema = z.object({
    concept_name: z.string(),
    script_content: z.string(),
    visual_style: z.string(),
    target_audience: z.string(),
    tone: z.string()
});

export const CreativeTestingOutputSchema = z.object({
    scores: z.object({
        engagement: z.number().min(0).max(100),
        persuasion: z.number().min(0).max(100),
        brand_fit: z.number().min(0).max(100),
        backlash_risk: z.number().min(0).max(100)
    }),
    platform_fit: z.object({
        tiktok: z.number().min(0).max(10),
        instagram: z.number().min(0).max(10),
        youtube: z.number().min(0).max(10),
        linkedin: z.number().min(0).max(10)
    }),
    analysis: z.object({
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        improvement_suggestions: z.array(z.string())
    }),
    prediction_summary: z.string()
});

export const CreativeTestingSkill: SkillDefinition<z.infer<typeof CreativeTestingInputSchema>, z.infer<typeof CreativeTestingOutputSchema>> = {
    name: 'creative-testing',
    description: 'Predicts performance and risks of ad creative concepts before production',
    version: '1.0.0',
    schema: CreativeTestingOutputSchema,
    generatePrompt: (input) => `
You are an AI Creative Director and Data Analyst. Predict the performance of this ad concept.

Concept Name: ${input.concept_name}
Target Audience: ${input.target_audience}
Tone: ${input.tone}
Visual Style: ${input.visual_style}

Script/Content:
"${input.script_content}"

Analyze for:
1. Engagement Potential: Will they watch?
2. Persuasion Lift: Will they buy/act?
3. Backlash Risk: Is it tone-deaf?
4. Platform Fit: Where does this belong?

Provide concrete scores and specific improvement suggestions.
`
};
