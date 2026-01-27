import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import { generateMediaPlanPrompt } from '@/lib/prompts';

// Define the schema for the media plan
const mediaPlanSchema = z.object({
    funnel: z.array(z.object({
        stage: z.string(),
        kpis: z.array(z.string()),
        budget_pct: z.number(),
        rationale: z.string()
    })),
    audiences: z.array(z.object({
        name: z.string(),
        targeting: z.array(z.string()),
        description: z.string(),
        demographics: z.string(),
        behaviors: z.string(),
        lat: z.number(),
        lng: z.number()
    })),
    formats: z.object({
        Awareness: z.array(z.string()),
        Consideration: z.array(z.string()),
        Conversion: z.array(z.string())
    }),
    tactics: z.array(z.object({
        name: z.string(),
        description: z.string(),
        metric_label: z.string(),
        metric_value: z.number()
    })),
    budget_split: z.object({
        Awareness: z.number(),
        Consideration: z.number(),
        Conversion: z.number()
    }),
    masterRationale: z.string()
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt, budget, location, objective, industry } = body;

        if (!prompt) {
            return new Response('Prompt is required', { status: 400 });
        }

        const systemPrompt = generateMediaPlanPrompt({
            prompt,
            budget,
            location,
            objective,
            industry
        });

        const result = await streamObject({
            model: openai('gpt-4o'),
            schema: mediaPlanSchema,
            prompt: systemPrompt,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Error generating media plan:', error);
        return new Response('Error generating media plan', { status: 500 });
    }
}
