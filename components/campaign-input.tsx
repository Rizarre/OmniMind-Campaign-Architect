'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, FileText, Lightbulb, Zap, MousePointer2, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const CAMPAIGN_PRESETS = [
    "Launch new fitness app for millennials",
    "Mother's Day sales for local florist",
    "Luxury travel packages for 2025",
    "B2B SaaS product launch in Fintech"
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

    const [prompt, setPrompt] = useState(campaignInput?.prompt || 'Launch new fitness app targeting millennials with $50,000 budget for 30 days');
    const [budget, setBudget] = useState([campaignInput?.budget || 50000]);
    const [duration, setDuration] = useState([30]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFetchingTrends, setIsFetchingTrends] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (campaignInput?.prompt) setPrompt(campaignInput.prompt);
        if (campaignInput?.budget) setBudget([campaignInput.budget]);
    }, []);

    const handlePromptChange = (val: string) => {
        setPrompt(val);
        setStorePrompt(val);
    };

    // Automatic extraction of budget and duration from prompt
    useEffect(() => {
        const extractBudget = (text: string) => {
            const dollarMatch = text.match(/\$\s?([0-9,]+)/);
            if (dollarMatch) return parseFloat(dollarMatch[1].replace(/,/g, ''));
            const budgetPattern = text.match(/budget\s+([0-9,]+)/i) ||
                text.match(/([0-9,]+)\s+budget/i) ||
                text.match(/investment\s+of\s+([0-9,]+)/i);
            if (budgetPattern) return parseFloat(budgetPattern[1].replace(/,/g, ''));
            const loneNumberMatch = text.match(/\b([1-9][0-9]{3,})\b/);
            if (loneNumberMatch) {
                return parseFloat(loneNumberMatch[1]);
            }
            return null;
        };

        const extractedBudget = extractBudget(prompt);
        if (extractedBudget !== null && extractedBudget !== budget[0]) {
            setBudget([extractedBudget]);
            if (currentPlan) updateBudget(extractedBudget);
        }

        const extractDuration = (text: string) => {
            const dayMatch = text.match(/(\d+)\s*day/i) ||
                text.match(/day\s*(\d+)/i) ||
                text.match(/for\s+(\d+)\b/i) ||
                text.match(/duration\s*of\s*(\d+)/i);
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

    useEffect(() => {
        if (currentPlan?.totalBudget && currentPlan.totalBudget !== budget[0]) {
            setBudget([currentPlan.totalBudget]);
        }
        if (currentPlan?.duration && currentPlan.duration !== duration[0]) {
            setDuration([currentPlan.duration]);
        }
    }, [currentPlan?.totalBudget, currentPlan?.duration]);

    const handleBudgetChange = (val: number[]) => {
        setBudget(val);
        if (currentPlan) updateBudget(val[0]);
    };

    const handleDurationChange = (val: number[]) => {
        setDuration(val);
        if (currentPlan) updateDuration(val[0]);
    };

    const handleAISuggestion = async () => {
        setShowSuggestions(true);
        setIsFetchingTrends(true);
        await fetchInsights(prompt);
        setIsFetchingTrends(false);
    };

    const adoptSuggestion = (suggestion: string) => {
        const newPrompt = `Focus on ${suggestion} for: ${prompt}`;
        setPrompt(newPrompt);
        setStorePrompt(newPrompt);
        setShowSuggestions(false);
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        setIsGenerating(true);
        setError(null);

        const campaignData = {
            prompt,
            budget: budget[0],
            duration: duration[0],
            timestamp: new Date().toISOString(),
        };

        setCampaignInput(campaignData);

        try {
            const response = await fetch('/api/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData),
            });

            if (!response.ok) throw new Error('Failed to generate media plan');

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
                    // Result can be deep in 'object' or top level
                    if (data && (data.object || data.funnel)) {
                        plan = data.object || data;
                        break;
                    }
                } catch (e) { continue; }
            }

            if (plan) {
                const planWithBudget = {
                    ...plan,
                    totalBudget: budget[0],
                    duration: duration[0],
                    funnel: plan.funnel.map((stage: any) => ({
                        ...stage,
                        budget_amount: (budget[0] * stage.budget_pct) / 100
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

    if (!mounted) return null;

    return (
        <div className="space-y-6">
            {/* Input Card */}
            <Card className="p-8 text-slate-200 border-white/5 bg-[#12141D]/40 backdrop-blur-3xl shadow-2xl rounded-[2rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors duration-1000" />

                <div className="space-y-6 relative z-10">
                    {/* Header Section - Stacked for better readability */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <FileText className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-white">Campaign Builder</h2>
                                <p className="text-xs text-slate-500 font-medium">Describe your marketing objective below</p>
                            </div>
                        </div>
                    </div>

                    {/* Textarea */}
                    <div className="relative">
                        <Textarea
                            value={prompt}
                            onChange={(e) => handlePromptChange(e.target.value)}
                            className="min-h-[160px] bg-black/40 border-white/5 text-slate-100 placeholder:text-slate-600 resize-none text-base p-5 rounded-2xl focus:border-blue-500/30 focus:ring-0 transition-all font-light leading-relaxed block w-full backdrop-blur-md"
                            placeholder="e.g., Launch a fitness app targeting millennials with $50,000 budget for 30 days..."
                        />

                        <AnimatePresence>
                            {showSuggestions && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute inset-x-4 bottom-20 bg-slate-900/95 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl z-50"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Market Insights</span>
                                        <button onClick={() => setShowSuggestions(false)} className="text-slate-500 hover:text-white p-1"><X className="h-4 w-4" /></button>
                                    </div>
                                    {isFetchingTrends ? (
                                        <div className="flex items-center gap-3 py-4 justify-center">
                                            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                                            <span className="text-sm text-slate-400">Analyzing trends...</span>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            {insights?.trendingSearches.slice(0, 4).map((trend, i) => (
                                                <button key={i} onClick={() => adoptSuggestion(trend)} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 transition-all text-xs text-left">
                                                    <span className="text-slate-300">{trend}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* AI Suggestion Button - Full width for visibility */}
                    <button
                        onClick={handleAISuggestion}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-white font-semibold text-sm rounded-xl border border-purple-500/30 transition-all group"
                    >
                        <Sparkles className="h-5 w-5 text-purple-400 group-hover:text-purple-300" />
                        <span>Get AI Suggestions for Your Campaign</span>
                    </button>

                    {/* Quick Presets */}
                    <div className="space-y-3">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Quick Templates</p>
                        <div className="flex flex-wrap gap-2">
                            {CAMPAIGN_PRESETS.map((p, i) => (
                                <button key={i} onClick={() => handlePromptChange(p)} className="text-[11px] bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/5 transition-all">
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button - Glowing */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                        <Button
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt.trim()}
                            className="relative w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg rounded-2xl shadow-2xl active:scale-[0.98] transition-all border border-white/20"
                        >
                            {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : <Sparkles className="mr-3 h-6 w-6" />}
                            {isLoading ? "Generating Strategy..." : "Generate Media Plan"}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Parameters Section - Two separate cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget Card */}
                <Card className="p-6 bg-gradient-to-br from-blue-600/15 to-blue-900/5 border-blue-400/30 rounded-2xl">
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-500/30 rounded-xl">
                                <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-blue-200">Total Investment</span>
                        </div>
                        <div className="text-4xl font-black text-white tracking-tight">
                            ${budget[0].toLocaleString()}
                        </div>
                        <Slider
                            value={budget}
                            min={1000}
                            max={100000}
                            step={1000}
                            onValueChange={handleBudgetChange}
                            className="py-3"
                        />
                        <div className="flex justify-between text-xs text-blue-300/70 font-semibold">
                            <span>$1,000</span>
                            <span>$100,000</span>
                        </div>
                    </div>
                </Card>

                {/* Duration Card */}
                <Card className="p-6 bg-gradient-to-br from-purple-600/15 to-purple-900/5 border-purple-400/30 rounded-2xl">
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-purple-500/30 rounded-xl">
                                <svg className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-purple-200">Campaign Duration</span>
                        </div>
                        <div className="text-4xl font-black text-white tracking-tight">
                            {duration[0]} <span className="text-lg font-semibold text-purple-300">days</span>
                        </div>
                        <Slider
                            value={duration}
                            min={7}
                            max={120}
                            step={1}
                            onValueChange={handleDurationChange}
                            className="py-3"
                        />
                        <div className="flex justify-between text-xs text-purple-300/70 font-semibold">
                            <span>7 days</span>
                            <span>120 days</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Projected Stats - More spacious */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
                <Card className="p-6 bg-gradient-to-br from-emerald-500/15 to-emerald-900/5 border-emerald-400/30 rounded-2xl text-center hover:scale-[1.02] transition-all">
                    <div className="text-sm font-bold text-emerald-300 uppercase tracking-wide mb-3">Est. Reach</div>
                    <div className="text-3xl font-black text-emerald-100 tracking-tight">{(budget[0] * 32).toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-400/60 mt-2 font-medium">unique users</div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-blue-500/15 to-blue-900/5 border-blue-400/30 rounded-2xl text-center hover:scale-[1.02] transition-all">
                    <div className="text-sm font-bold text-blue-300 uppercase tracking-wide mb-3">Impressions</div>
                    <div className="text-3xl font-black text-blue-100 tracking-tight">{(budget[0] * 125).toLocaleString()}</div>
                    <div className="text-[10px] text-blue-400/60 mt-2 font-medium">ad views</div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-500/15 to-purple-900/5 border-purple-400/30 rounded-2xl text-center hover:scale-[1.02] transition-all">
                    <div className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-3">Est. Clicks</div>
                    <div className="text-3xl font-black text-purple-100 tracking-tight">{Math.floor(budget[0] / 3.5).toLocaleString()}</div>
                    <div className="text-[10px] text-purple-400/60 mt-2 font-medium">interactions</div>
                </Card>
            </div>
        </div>
    );
}
