// Core skill interfaces

import { z } from 'zod';

export interface SkillDefinition<TInput = any, TOutput = any> {
    name: string;
    description: string;
    version: string;
    schema: z.ZodSchema<TOutput>;
    generatePrompt: (input: TInput) => string;
}

export interface SkillResult<T> {
    success: boolean;
    data?: T;
    error?: string;
    metadata?: {
        model: string;
        timestamp: number;
        usage?: any;
    };
}
