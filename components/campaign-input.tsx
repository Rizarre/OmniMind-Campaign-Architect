'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, FileText, Lightbulb, Target, Zap, MousePointer2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const CAMPAIGN_PRESETS = [
    "Create campaign for Mother's Day sales for local flower shop",
    "Launch new fitness app targeting millennials in urban areas",
    "Promote holiday travel packages for luxury resort",
    "Drive signups for B2B SaaS product launch in Fintech"
];

export function CampaignInput() {
    const {
        currentPlan,
        campaignInput,
        insights,
        setIsGenerating,
        setCampaignInput,
        setCurrentPlan,
        setError,
        updateBudget,
        updateDuration,
        setPrompt: setStorePrompt,
        fetchInsights
    } = useAppStore();

    const [prompt, setPrompt] = useState(campaignInput?.prompt || 'Launch new fitness app targeting millennials in urban areas with $50,000 budget for 30 days');
    const [budget, setBudget] = useState([campaignInput?.budget || 50000]);
    const [duration, setDuration] = useState([30]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFetchingTrends, setIsFetchingTrends] = useState(false);

    // Sync store prompt
    const handlePromptChange = (val: string) => {
        setPrompt(val);
        setStorePrompt(val);
    };

    // Sync local budget and duration with global plan if it exists
    useEffect(() => {
        if (currentPlan?.totalBudget && currentPlan.totalBudget !== budget[0]) {
            setBudget([currentPlan.totalBudget]);
        }
        if (currentPlan?.duration && currentPlan.duration !== duration[0]) {
            setDuration([currentPlan.duration]);
        }
    }, [currentPlan?.totalBudget, currentPlan?.duration]);

    // Unified extraction logic for budget and duration
    useEffect(() => {
        const extractBudget = (text: string) => {
            const dollarMatch = text.match(/\$\s?([0-9,]+)/);
            if (dollarMatch) return parseFloat(dollarMatch[1].replace(/,/g, ''));
            const budgetOfMatch = text.match(/budget\s+of\s+([0-9,]+)/i) || text.match(/([0-9,]+)\s+budget/i);
            if (budgetOfMatch) return parseFloat(budgetOfMatch[1].replace(/,/g, ''));
            const loneNumberMatch = text.match(/\b([1-9][0-9]{2,})\b/);
            if (loneNumberMatch) {
                const val = parseFloat(loneNumberMatch[1]);
                if (val > 1000) return val;
            }
            return null;
        };

        const extractedBudget = extractBudget(prompt);
        if (extractedBudget !== null && extractedBudget !== budget[0]) {
            setBudget([extractedBudget]);
            if (currentPlan) updateBudget(extractedBudget);
        }

        const extractDuration = (text: string) => {
            const dayMatch = text.match(/(\d+)\s*day/i) || text.match(/for\s+(\d+)\b/i);
            if (dayMatch) {
                const val = parseInt(dayMatch[1]);
                if (!isNaN(val) && val > 0 && val <= 180) return val;
            }
            return null;
        };

        const extractedDuration = extractDuration(prompt);
        if (extractedDuration !== null && extractedDuration !== duration[0]) {
            setDuration([extractedDuration]);
            if (currentPlan) updateDuration(extractedDuration);
        }
    }, [prompt]);

    const handleBudgetChange = (val: number[]) => {
        setBudget(val);
        if (currentPlan) {
            updateBudget(val[0]);
        }
        setCampaignInput({ ...campaignInput, prompt, budget: val[0] });
    };

    const handleDurationChange = (val: number[]) => {
        setDuration(val);
        if (currentPlan) {
            updateDuration(val[0]);
        }
    };

    const handleAISuggestion = async () => {
        setIsFetchingTrends(true);
        setShowSuggestions(true);
        await fetchInsights(prompt);
        setIsFetchingTrends(false);
    };

    const adoptSuggestion = (suggestion: string) => {
        const newPrompt = `${prompt}\n\nOptimization Insight: Consider aligning with ${suggestion} for increased relevance.`;
        handlePromptChange(newPrompt);
        setShowSuggestions(false);
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a campaign brief');
            return;
        }

        setIsLoading(true);
        setIsGenerating(true);
        setError(null);

        fetchInsights(prompt);

        const campaignData = {
            prompt,
            budget: budget[0],
            duration: duration[0]
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

            const lines = result.split('\n').filter(line => line.trim());
            let plan = null;
            for (let i = lines.length - 1; i >= 0; i--) {
                try {
                    const data = JSON.parse(lines[i]);
                    if (data && (data.object || data.funnel)) {
                        plan = data.object || data;
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }

            if (plan) {
                const totalBudget = campaignData.budget || 3000;
                const durationVal = duration[0] || 30;

                const planWithBudget = {
                    ...plan,
                    totalBudget,
                    duration: durationVal,
                    funnel: plan.funnel.map((stage: any) => ({
                        ...stage,
                        budget_amount: (totalBudget * stage.budget_pct) / 100
                    }))
                };

                setCurrentPlan(planWithBudget);
            } else {
                throw new Error("No valid plan data could be parsed from the response.");
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
        <Card className="p-12 text-slate-200 border-white/5 shadow-2xl rounded-[2.5rem] relative overflow-hidden group min-h-[660px]">
            {/* Background enhancement */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-purple-600/10 transition-colors duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors duration-1000" />

            <div className="space-y-12 relative z-10">
                {/* Section 1: Brief */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                            <FileText className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                                Campaign Brief
                            </h2>
                            <p className="text-xs text-slate-400 font-black tracking-[0.2em] uppercase">PHASE 01: ARCHITECTURAL INTENT</p>
                        </div>
                    </div>

                    <div className="relative group/input">
                        <Textarea
                            value={prompt}
                            onChange={(e) => handlePromptChange(e.target.value)}
                            className="min-h-[240px] bg-black/20 border-white/5 text-slate-100 placeholder:text-slate-700 resize-none text-lg p-8 rounded-[2rem] focus:border-blue-500/30 focus:ring-0 transition-all font-light leading-relaxed shadow-inner block w-full backdrop-blur-md"
                            placeholder="Describe your campaign goal, target audience, and key objectives..."
                        />

                        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
                            {showSuggestions && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="mb-2 w-72 bg-black/60 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-[40px] z-50"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Live Signals</span>
                                        <button onClick={() => setShowSuggestions(false)} className="text-slate-500 hover:text-white transition-colors">
                                            <Zap className="h-3 w-3" />
                                        </button>
                                    </div>

                                    {isFetchingTrends ? (
                                        <div className="flex items-center gap-2 py-4 justify-center">
                                            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                            <span className="text-xs text-slate-400">Analyzing trends...</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {insights?.trendingSearches.slice(0, 3).map((trend, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => adoptSuggestion(trend)}
                                                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 cursor-pointer transition-all group/item"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-slate-300 group-hover/item:text-blue-200 transition-colors uppercase tracking-tight">{trend}</span>
                                                        <MousePointer2 className="h-3 w-3 text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            <Badge
                                variant="secondary"
                                onClick={handleAISuggestion}
                                className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 gap-2 px-5 py-2.5 cursor-pointer transition-all backdrop-blur-md rounded-xl hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/10"
                            >
                                <Lightbulb className="h-4 w-4 text-yellow-400 animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-wider">Get AI Suggestions</span>
                            </Badge>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {CAMPAIGN_PRESETS.map((preset, i) => (
                            <button
                                key={i}
                                onClick={() => handlePromptChange(preset)}
                                className="text-xs bg-white/5 hover:bg-white/10 text-slate-400 hover:text-blue-200 px-4 py-2 rounded-xl transition-all border border-white/5 hover:border-blue-500/30 truncate max-w-[200px] text-left shadow-sm font-medium backdrop-blur-md"
                                title={preset}
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section 2: Generation */}
                <div>
                    <Button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className="w-full h-18 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-xl rounded-[1.5rem] shadow-2xl shadow-blue-500/20 transition-all active:scale-[0.97] border border-white/10 group/btn overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        {isLoading ? (
                            <div className="flex items-center gap-4 relative z-10">
                                <Loader2 className="h-7 w-7 animate-spin text-blue-200" />
                                <span className="tracking-tight">Initializing Engines...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 relative z-10">
                                <Sparkles className="h-7 w-7 fill-white/20 text-blue-200" />
                                <span className="tracking-tight uppercase">Generate Media Plan</span>
                            </div>
                        )}
                    </Button>
                </div>

                {/* Section 3: Parameters */}
                <div className="space-y-8 pt-6 border-t border-slate-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Campaign Parameters</span>
                        <div className="flex-1 h-px bg-slate-800/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    Investment
                                </div>
                                <span className="text-blue-400 font-mono text-2xl tracking-tighter">
                                    ${budget[0].toLocaleString()}
                                </span>
                            </div>
                            <Slider
                                value={budget}
                                min={1000}
                                max={100000}
                                step={1000}
                                onValueChange={handleBudgetChange}
                                className="py-2"
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                    Timeframe
                                </div>
                                <span className="text-purple-400 font-mono text-2xl tracking-tighter">
                                    {duration[0]}
                                    <span className="text-xs text-purple-400/60 font-sans tracking-normal ml-1">DAYS</span>
                                </span>
                            </div>
                            <Slider
                                value={duration}
                                min={7}
                                max={90}
                                step={1}
                                onValueChange={handleDurationChange}
                                className="py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 4: Projections */}
                <div className="space-y-6 pt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Calculated Impact</span>
                        <div className="flex-1 h-px bg-slate-800/50" />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-black/20 backdrop-blur-md p-5 rounded-[1.5rem] border border-white/5 text-center group/stat hover:border-white/10 transition-all hover:translate-y-[-2px]">
                            <div className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-black group-hover/stat:text-slate-300 transition-colors">Potential Reach</div>
                            <div className="text-2xl font-bold text-slate-300 tracking-tighter">
                                {Math.floor(budget[0] * 32 * (1 + duration[0] / 200)).toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-md p-5 rounded-[1.5rem] border border-white/5 text-center group/stat hover:border-blue-500/20 transition-all hover:translate-y-[-2px]">
                            <div className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-black group-hover/stat:text-blue-300 transition-colors">Visual Impressions</div>
                            <div className="text-2xl font-bold text-blue-400 tracking-tighter">
                                {Math.floor(budget[0] * 125 * (1 + duration[0] / 500)).toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-md p-5 rounded-[1.5rem] border border-white/5 text-center group/stat hover:border-purple-500/20 transition-all hover:translate-y-[-2px]">
                            <div className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-black group-hover/stat:text-purple-300 transition-colors">Traffic Clicks</div>
                            <div className="text-2xl font-bold text-purple-400 tracking-tighter">
                                {Math.floor((budget[0] / 3.5) * (1 + duration[0] / 300)).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
