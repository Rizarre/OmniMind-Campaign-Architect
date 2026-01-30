import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { CreativeTestingSkill } from '@/lib/skills/creative-testing/definition';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const input = await req.json();

        // Validate input against basic constraints if needed, 
        // but the AI prompt handles the unstructured parts.

        // Generate the analysis
        const result = await generateObject({
            model: openai('gpt-4o'),
            schema: CreativeTestingSkill.schema,
            prompt: CreativeTestingSkill.generatePrompt(input),
        });

        return NextResponse.json(result.object);
    } catch (error) {
        console.error('Creative Analysis Error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze creative concept.' },
            { status: 500 }
        );
    }
}
