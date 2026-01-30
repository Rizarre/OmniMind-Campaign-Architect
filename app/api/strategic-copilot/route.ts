import OpenAI from 'openai';

export const maxDuration = 30;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { messages, context } = await req.json();

    const systemMessage = {
        role: 'system' as const,
        content: `You are OmniMind Strategic Copilot, an elite programmatic advertising expert. 
    You are helping a user optimize their media plan.
    
    Current Context:
    ${JSON.stringify(context, null, 2)}
    
    Rules:
    1. Be concise, professional, and strategic.
    2. Provide data-driven advice based on the current plan budget, duration, and audience.
    3. If the user asks for optimization, suggest specific shifts in funnel weights or targeting tactics.
    4. Use markdown for better readability (bolding, lists).
    5. Stay in character as a high-end AI strategy consultant.`
    };

    const stream = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [systemMessage, ...messages.map((m: any) => ({ role: m.role, content: m.content }))],
        stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
        async start(controller) {
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content) {
                    controller.enqueue(encoder.encode(content));
                }
            }
            controller.close();
        },
    });

    return new Response(readable, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
