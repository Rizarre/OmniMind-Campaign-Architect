'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Rocket, Loader2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { objectiveOptions, industryOptions } from '@/lib/mock-data';

export function CampaignInput() {
    const { setIsGenerating, setCampaignInput, setCurrentPlan, setError } = useAppStore();
    const [prompt, setPrompt] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [objective, setObjective] = useState('');
    const [industry, setIndustry] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a campaign goal');
            return;
        }

        setIsLoading(true);
        setIsGenerating(true);
        setError(null);

        const campaignData = {
            prompt,
            budget: budget ? parseFloat(budget) : undefined,
            location: location || undefined,
            objective: objective || undefined,
            industry: industry || undefined,
        };

        setCampaignInput(campaignData);

        try {
            const response = await fetch('/api/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate media plan');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let result = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    result += decoder.decode(value);
                }
            }

            // Parse the streamed result
            const lines = result.split('\n').filter(line => line.trim());
            const lastLine = lines[lines.length - 1];

            if (lastLine) {
                const data = JSON.parse(lastLine);
                const plan = data.object || data;

                // Calculate budget amounts
                const totalBudget = campaignData.budget || 3000;
                const planWithBudget = {
                    ...plan,
                    totalBudget,
                    funnel: plan.funnel.map((stage: any) => ({
                        ...stage,
                        budget_amount: (totalBudget * stage.budget_pct) / 100
                    }))
                };

                setCurrentPlan(planWithBudget);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to generate media plan. Please try again.');
        } finally {
            setIsLoading(false);
            setIsGenerating(false);
        }
    };

    return (
        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
            <div className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Campaign Builder
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Describe your campaign goal and let AI create a comprehensive media plan
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="prompt" className="text-sm font-medium">
                            Campaign Goal *
                        </Label>
                        <Textarea
                            id="prompt"
                            placeholder="Create a campaign for Mother's Day sales for a local flower shop in Seattle with $3,000 budget"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="mt-1.5 min-h-[100px] resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="budget" className="text-sm font-medium">
                                Budget ($)
                            </Label>
                            <Input
                                id="budget"
                                type="number"
                                placeholder="3000"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="mt-1.5"
                            />
                        </div>

                        <div>
                            <Label htmlFor="location" className="text-sm font-medium">
                                Location
                            </Label>
                            <Input
                                id="location"
                                placeholder="Seattle, WA"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1.5"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="objective" className="text-sm font-medium">
                                Objective
                            </Label>
                            <Select value={objective} onValueChange={setObjective}>
                                <SelectTrigger className="mt-1.5">
                                    <SelectValue placeholder="Select objective" />
                                </SelectTrigger>
                                <SelectContent>
                                    {objectiveOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="industry" className="text-sm font-medium">
                                Industry
                            </Label>
                            <Select value={industry} onValueChange={setIndustry}>
                                <SelectTrigger className="mt-1.5">
                                    <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {industryOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Generating Media Plan...
                            </>
                        ) : (
                            <>
                                <Rocket className="mr-2 h-5 w-5" />
                                Generate Media Plan
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
