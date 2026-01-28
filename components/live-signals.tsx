'use client';

import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, MapPin, Search, TrendingUp, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LiveSignals() {
    const { insights, fetchInsights, campaignInput, isGenerating } = useAppStore();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        if (campaignInput?.prompt && !insights) {
            fetchInsights(campaignInput.prompt);
        }
    }, [campaignInput?.prompt, insights, fetchInsights]);

    const handleRefresh = async () => {
        if (campaignInput?.prompt) {
            setIsRefreshing(true);
            await fetchInsights(campaignInput.prompt);
            setIsRefreshing(false);
        }
    };

    if (!campaignInput || isGenerating) return null;

    return (
        <Card className="p-8 border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4">
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors group/refresh"
                >
                    <RefreshCcw className={`h-4 w-4 text-slate-500 group-hover/refresh:text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                    <Activity className="h-5 w-5 text-blue-400" />
                    <div className="absolute inset-0 bg-blue-400/20 blur-lg animate-pulse" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Real-Time Market Signals</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Local Context */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                        <MapPin className="h-3 w-3" />
                        Local Events
                    </div>
                    <div className="space-y-2">
                        {insights?.localEvents.map((event, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="text-sm text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/5"
                            >
                                {event}
                            </motion.div>
                        )) || [1, 2].map(i => <div key={i} className="h-8 bg-slate-800/20 animate-pulse rounded-xl" />)}
                    </div>
                </div>

                {/* Search Momentum */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                        <Search className="h-3 w-3" />
                        Search Trends
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {insights?.trendingSearches.map((term, i) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                            >
                                <Badge variant="secondary" className="bg-blue-500/5 text-blue-300 border-blue-500/10 hover:bg-blue-500/10 py-1.5 px-3">
                                    {term}
                                </Badge>
                            </motion.div>
                        )) || [1, 2, 3].map(i => <div key={i} className="h-6 w-20 bg-slate-800/20 animate-pulse rounded-full" />)}
                    </div>
                </div>

                {/* Financial Indices */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                        <TrendingUp className="h-3 w-3" />
                        Live CPM Estimates
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {insights ? (
                            Object.entries(insights.avgCPM).map(([type, value], i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={type}
                                    className="bg-black/40 p-3 rounded-xl border border-white/5"
                                >
                                    <div className="text-xs text-slate-400 uppercase font-black mb-1">{type}</div>
                                    <div className="text-sm font-bold text-green-400 font-mono">
                                        ${value.toFixed(2)}
                                    </div>
                                </motion.div>
                            ))
                        ) : [1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-800/20 animate-pulse rounded-xl" />)}
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-400 font-medium italic">
                <span>* Data synchronized with global DSP index & local event APIs</span>
                <span className="flex items-center gap-1 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    Live Connection
                </span>
            </div>
        </Card>
    );
}
