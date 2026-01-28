import OpenAI from 'openai';
import { z } from 'zod';
import { generateMediaPlanPrompt } from '@/lib/prompts';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

        const stream = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert programmatic media strategist. Generate a JSON response that matches this exact schema:
${JSON.stringify(mediaPlanSchema.shape, null, 2)}
Respond ONLY with valid JSON, no markdown or explanation.`
                },
                { role: 'user', content: systemPrompt }
            ],
            response_format: { type: 'json_object' },
            stream: true,
        });

        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                let fullContent = '';
                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    fullContent += content;
                    controller.enqueue(encoder.encode(content));
                }
                // Send final parsed object
                try {
                    const parsed = JSON.parse(fullContent);
                    controller.enqueue(encoder.encode('\n' + JSON.stringify({ object: parsed })));
                } catch (e) {
                    // If parsing fails, send raw content
                }
                controller.close();
            },
        });

        return new Response(readable, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });
    } catch (error) {
        console.error('Error generating media plan:', error);
        return new Response('Error generating media plan', { status: 500 });
    }
}
