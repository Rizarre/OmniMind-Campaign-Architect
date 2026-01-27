// AI prompt templates for media plan generation

import { CampaignInput } from './types';

export function generateMediaPlanPrompt(input: CampaignInput): string {
    return `You are an expert media strategist. Generate a comprehensive programmatic advertising media plan based on the following campaign goal:

Campaign Goal: ${input.prompt}
${input.budget ? `Budget: $${input.budget}` : ''}
${input.location ? `Location: ${input.location}` : ''}
${input.objective ? `Objective: ${input.objective}` : ''}
${input.industry ? `Industry: ${input.industry}` : ''}

Create a detailed media plan with the following structure:

1. **Funnel Strategy**: Break down the campaign into 3 stages (Awareness, Consideration, Conversion)
   - For each stage, define relevant KPIs
   - Allocate budget percentage (should total 100%)

2. **Audience Segments**: Identify 2-4 high-potential audience groups
   - Include demographic and behavioral targeting details
   - Explain why each segment matters

3. **Ad Formats**: Recommend optimal creative types for each funnel stage
   - Match formats to audience behavior and funnel position

4. **Targeting Tactics**: Suggest 3-5 tactics from: geo-fencing, contextual targeting, day-parting, retargeting, lookalikes

5. **Budget Allocation**: Distribute the total budget across funnel stages

Return your response as a JSON object with this exact structure:
{
  "funnel": [
    { "stage": "Awareness", "kpis": ["Impressions", "Reach"], "budget_pct": 40 },
    { "stage": "Consideration", "kpis": ["CTR", "Engagement"], "budget_pct": 30 },
    { "stage": "Conversion", "kpis": ["CPA", "ROAS"], "budget_pct": 30 }
  ],
  "audiences": [
    { "name": "Segment Name", "targeting": ["demographic", "behavior"], "description": "Why this segment matters" }
  ],
  "formats": {
    "Awareness": ["Video", "High-impact Display"],
    "Consideration": ["Carousel", "Native"],
    "Conversion": ["Retargeting Display", "Search"]
  },
  "tactics": ["Geo-fencing", "Contextual Targeting", "Day-parting"],
  "budget_split": {
    "Awareness": 1200,
    "Consideration": 900,
    "Conversion": 900
  }
}

Be specific and actionable. Use real marketing insights.`;
}

export function refineMediaPlanPrompt(currentPlan: string, refinement: string): string {
    return `You are an expert media strategist. Here is the current media plan:

${currentPlan}

The user wants to refine the plan with this instruction:
"${refinement}"

Update the media plan accordingly and return the complete updated JSON with the same structure. Make sure all changes are reflected and the plan remains coherent and strategic.`;
}
