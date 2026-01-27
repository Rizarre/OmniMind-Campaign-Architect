import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import { refineMediaPlanPrompt } from '@/lib/prompts';

// Define the schema for the media plan
const mediaPlanSchema = z.object({
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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { currentPlan, refinement } = body;

        if (!currentPlan || !refinement) {
            return new Response('Current plan and refinement instruction are required', { status: 400 });
        }

        const systemPrompt = refineMediaPlanPrompt(
            JSON.stringify(currentPlan, null, 2),
            refinement
        );

        const result = await streamObject({
            model: openai('gpt-4o'),
            schema: mediaPlanSchema,
            prompt: systemPrompt,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Error refining media plan:', error);
        return new Response('Error refining media plan', { status: 500 });
    }
}
