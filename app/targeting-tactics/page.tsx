'use client';

import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, MapPin, Search, Clock, Zap, ShieldCheck, Crosshair, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TargetingTacticsPage() {
    const { currentPlan } = useAppStore();

    const getIconForTactic = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('geo')) return MapPin;
        if (n.includes('contextual')) return Search;
        if (n.includes('day')) return Clock;
        return Target;
    };

    const getColorForTactic = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('geo')) return 'text-blue-400';
        if (n.includes('contextual')) return 'text-purple-400';
        if (n.includes('day')) return 'text-emerald-400';
        return 'text-slate-400';
    };

    const getBgForTactic = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('geo')) return 'bg-blue-400/10';
        if (n.includes('contextual')) return 'bg-purple-400/10';
        if (n.includes('day')) return 'bg-emerald-400/10';
        return 'bg-slate-400/10';
    };

    if (!currentPlan || !currentPlan.tactics) {
        return (
            <div className="container mx-auto p-8 max-w-5xl min-h-screen flex items-center justify-center relative z-10">
                <Card className="p-16 border-dashed border-2 text-center rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
                    <Crosshair className="h-24 w-24 mx-auto mb-8 text-slate-700 animate-pulse" />
                    <h2 className="text-3xl font-bold text-white mb-4 italic">Awaiting Strategic Mission</h2>
                    <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                        Tactical deployment parameters are generated alongside your media plan. Start in the Dashboard to define your target objective.
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
            <div className="container mx-auto p-6 md:p-8 max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Page Header */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Target className="h-6 w-6 text-blue-400" />
                        </div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent tracking-tight">
                            Targeting Tactics & Contextual Levers
                        </h1>
                    </div>
                    <p className="text-slate-400 text-xl font-light max-w-3xl leading-relaxed">
                        Advanced algorithmic levers designed to maximize inventory relevance and cost-efficiency.
                    </p>
                </div>

                {/* Main Tactics Grid */}
                <div className="grid grid-cols-1 gap-8">
                    {currentPlan.tactics.map((tacticOrString, idx) => {
                        const tactic = typeof tacticOrString === 'string'
                            ? { name: tacticOrString, description: 'Adaptive targeting lever for campaign optimization.', metric_label: 'Engagement', metric_value: 10 }
                            : tacticOrString;

                        const Icon = getIconForTactic(tactic.name);
                        const colorClass = getColorForTactic(tactic.name);
                        const bgClass = getBgForTactic(tactic.name);

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.15 }}
                            >
                                <Card className="p-8 md:p-10 border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-purple-500/30 transition-all shadow-xl flex flex-col h-full">
                                    <div className={`absolute top-0 right-0 w-64 h-64 ${bgClass} blur-[80px] rounded-full pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity`} />

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10 items-center">
                                        <div className="lg:col-span-3 space-y-6">
                                            <div className={`w-20 h-20 rounded-3xl ${bgClass} flex items-center justify-center border border-white/5 shadow-2xl`}>
                                                <Icon className={`h-10 w-10 ${colorClass}`} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Tactic Metric</div>
                                                <div className="space-y-1">
                                                    <div className="text-3xl font-bold font-mono text-white tracking-tighter">
                                                        {tactic.metric_value}%
                                                    </div>
                                                    <div className="text-sm font-medium text-slate-400">{tactic.metric_label}</div>
                                                </div>
                                            </div>
                                            <Badge className="bg-slate-900/80 text-blue-400 border border-blue-500/20 py-1.5 px-4 rounded-full w-fit">
                                                <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                                                Active Optimization
                                            </Badge>
                                        </div>

                                        <div className="lg:col-span-9 space-y-8">
                                            <div className="space-y-4">
                                                <h2 className="text-3xl font-bold text-white tracking-tight group-hover:translate-x-1 transition-transform inline-block">
                                                    {tactic.name}
                                                </h2>
                                                <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
                                                    {tactic.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10 w-fit">
                                                <Zap className="h-4 w-4 text-blue-400" />
                                                <p className="text-sm text-slate-300 font-medium">
                                                    Algorithmically synced with your latest campaign brief.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <Card className="p-10 bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 mt-12 backdrop-blur-md">
                    <div className="flex gap-6 items-center text-left">
                        <div className="p-4 bg-blue-500/20 rounded-2xl">
                            <Zap className="h-8 w-8 text-blue-400 fill-blue-400/20" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white">Advanced Algorithm Overrides</h3>
                            <p className="text-slate-400 text-sm max-w-md font-light">Targeting tactics are automatically refined every 24 hours based on cumulative attribution signals from our DSP federation.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div >
    );
}
