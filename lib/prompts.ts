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

1. **Strategic Architecture Rationale**: Provide a high-level master rationale for why this specific plan was chosen (2-3 sentences).

2. **Funnel Strategy**: Break down the campaign into 3 stages (Awareness, Consideration, Conversion)
   - For each stage, define relevant KPIs
   - Allocate budget percentage (should total 100%)
   - Provide a 1-sentence strategic rationale for each stage.

3. **Audience Segments**: Identify 2-3 high-potential audience groups
   - Include specific targeting details (interests, behaviors, demographics)
   - Explain why each segment matters to THIS specific brief.
   - For each segment, provide demographic details (age, income, etc.) and behavioral profiles.
   - For each segment, provide a representative latitude (lat) and longitude (lng) coordinate that falls within the ${input.location || 'requested target region'}. If no specific location is provided, use logic based on the prompt's context. Always generate realistic, non-zero coordinates.

4. **Ad Formats**: Recommend optimal creative types for each funnel stage
   - Awareness: High-impact / Branding formats
   - Consideration: Engagement / Mid-funnel formats
   - Conversion: Performance / Action-oriented formats

5. **Targeting Tactics**: Suggest precisely 3 tactics from the following list: Precision Geo-Fencing, Dynamic Contextual Intelligence, Strategic Day-Parting.
   - For each, provide a tailored description for this campaign.
   - Include a 'metric_label' (e.g., "Min. Accuracy", "Page Relevance") and a 'metric_value' (number from 0-100).

6. **Budget Allocation**: Distribute the total budget across funnel stages based on the objective.

Return your response as a JSON object with this exact structure:
{
  "masterRationale": "Master strategic logic...",
  "funnel": [
    { "stage": "Awareness", "kpis": ["Reach", "Impact"], "budget_pct": 40, "rationale": "Strategic logic for awareness stage..." },
    { "stage": "Consideration", "kpis": ["CTR"], "budget_pct": 30, "rationale": "Strategic logic for consideration stage..." },
    { "stage": "Conversion", "kpis": ["ROAS"], "budget_pct": 30, "rationale": "Strategic logic for conversion stage..." }
  ],
  "audiences": [
    { 
      "name": "Segment Name", 
      "targeting": ["Detail 1", "Detail 2"], 
      "description": "Specific relevance to brief",
      "demographics": "Age 25-45, Urban dwellers...",
      "behaviors": "Frequent travelers, Tech enthusiasts...",
      "lat": 34.0522,
      "lng": -118.2437
    }
  ],
  "formats": {
    "Awareness": ["Video", "CTV"],
    "Consideration": ["Native", "Interstitials"],
    "Conversion": ["Display", "Search"]
  },
  "tactics": [
    { "name": "Precision Geo-Fencing", "description": "Tailored logic...", "metric_label": "Min. Accuracy", "metric_value": 98 }
  ],
  "budget_split": {
    "Awareness": 400,
    "Consideration": 300,
    "Conversion": 300
  }
}

Be specific and actionable. Use real marketing insights tailored ONLY to the user prompt. DO NOT use generic placeholders.`;
}

export function refineMediaPlanPrompt(currentPlan: string, refinement: string): string {
  return `You are an expert media strategist. Here is the current media plan:

${currentPlan}

The user wants to refine the plan with this instruction:
"${refinement}"

Update the media plan accordingly and return the complete updated JSON with the same structure. Make sure all changes are reflected and the plan remains coherent and strategic.`;
}
