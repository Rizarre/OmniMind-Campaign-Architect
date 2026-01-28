'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { TrendingUp, Calendar, DollarSign, Search, Sparkles, MapPin, Activity, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Insights() {
    const { insights, campaignInput, isGenerating } = useAppStore();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
    };

    if (!campaignInput || isGenerating) {
        return (
            <div className="container mx-auto p-8 max-w-5xl min-h-screen flex items-center justify-center relative z-10">
                <Card className="p-16 border-dashed border-2 text-center rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
                    <Sparkles className="h-24 w-24 mx-auto mb-8 text-slate-700 animate-pulse" />
                    <h2 className="text-3xl font-bold text-white mb-4 italic">Analysis Engine Offline</h2>
                    <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                        Real-time market insights require a campaign brief to calibrate signals. Define your strategy in the Dashboard to activate telemetry.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                    >
                        Initialize Dashboard
                    </button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-slate-200 relative z-10">
            <div className="container mx-auto p-8 max-w-6xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent inline-block">
                                Market Intelligence
                            </h1>
                            <Badge className="bg-slate-900 border-slate-800 text-slate-400 text-xs tracking-widest font-black uppercase py-1 px-3">
                                Beta Telemetry
                            </Badge>
                        </div>
                        <p className="text-slate-500 text-lg font-light max-w-xl">
                            Streaming data filtered through the lens of: <span className="text-blue-400 font-medium italic">"{campaignInput.prompt.slice(0, 40)}..."</span>
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Local Events & Geo-Context */}
                    <motion.div variants={item}>
                        <Card className="p-10 border-white/5 shadow-2xl rounded-[2.5rem] relative overflow-hidden group h-full">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                    <Calendar className="h-6 w-6 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Temporal Signals</h3>
                            </div>

                            <div className="space-y-4">
                                {insights?.localEvents.map((event, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 10 }}
                                        className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 flex items-center justify-between group/event"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                            <p className="font-medium text-slate-200 group-hover/event:text-blue-200 transition-colors uppercase text-xs tracking-widest">{event}</p>
                                        </div>
                                    </motion.div>
                                )) || (
                                        <div className="py-12 text-center text-slate-600 italic text-sm">Synchronizing local registers...</div>
                                    )}
                            </div>

                            <div className="mt-8 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20 space-y-3">
                                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                                    <Sparkles className="h-4 w-4" />
                                    AI Recommendation
                                </div>
                                <p className="text-sm text-blue-200/70 leading-relaxed">
                                    Capture rising interest from these local events by activating geo-fencing clusters within 5km of the activity zones.
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Trending Search Momentum */}
                    <motion.div variants={item}>
                        <Card className="p-10 border-white/5 shadow-2xl rounded-[2.5rem] relative overflow-hidden group h-full">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[80px] rounded-full pointer-events-none" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                                    <Search className="h-6 w-6 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Search Momentum</h3>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {insights?.trendingSearches.map((search, idx) => (
                                    <Badge
                                        key={idx}
                                        className="px-5 py-2.5 text-sm bg-black/40 backdrop-blur-md text-slate-400 hover:text-purple-300 border-white/5 hover:border-purple-500/30 transition-all rounded-xl flex gap-2 items-center cursor-default shadow-sm"
                                    >
                                        <TrendingUp className="h-3.5 w-3.5 text-purple-500" />
                                        {search}
                                    </Badge>
                                )) || (
                                        <div className="w-full h-32 flex items-center justify-center text-slate-600 italic text-sm">Aggregating search indices...</div>
                                    )}
                            </div>

                            <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20 flex gap-4">
                                <Activity className="h-6 w-6 text-purple-400 shrink-0" />
                                <div className="space-y-1">
                                    <div className="text-purple-400 font-bold text-xs uppercase tracking-wider">Contextual Overdrive</div>
                                    <p className="text-sm text-purple-200/70 leading-relaxed font-light">
                                        Observed spike in intent-based queries. Redirect 8% of awareness budget toward native search placements.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* CPM Market Indices */}
                    <motion.div variants={item} className="lg:col-span-2">
                        <Card className="p-10 border-white/5 shadow-2xl rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/5 blur-[120px] rounded-full pointer-events-none" />

                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                                        <DollarSign className="h-6 w-6 text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Live CPM Estimator</h3>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 font-black tracking-widest uppercase">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Refreshed: Every 15m
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {insights ? (
                                    Object.entries(insights.avgCPM).map(([type, value], i) => (
                                        <div key={i} className="p-8 rounded-[2rem] bg-black/20 backdrop-blur-md border border-white/5 shadow-inner group/stat hover:border-white/10 transition-all">
                                            <div className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 group-hover/stat:text-slate-300 transition-colors">
                                                {type.replace('_', ' ')} unit
                                            </div>
                                            <div className={`text-4xl font-bold text-white tracking-tighter mb-2 font-mono`}>
                                                ${value.toFixed(2)}
                                            </div>
                                            <div className="text-xs text-slate-500 font-medium uppercase tracking-tighter">ESTIMATED PER 1K IMP.</div>
                                        </div>
                                    ))
                                ) : (
                                    [1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-900 animate-pulse rounded-[2rem]" />)
                                )}
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
