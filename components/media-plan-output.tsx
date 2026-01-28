'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { Target, Users, Zap, DollarSign, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function MediaPlanOutput() {
    const { currentPlan, isPresentationMode } = useAppStore();

    if (!currentPlan) {
        return (
            <Card className="p-12 border-white/5 border-dashed border-2 rounded-3xl relative overflow-hidden group min-h-[660px] flex items-center justify-center transition-all hover:border-blue-500/20">
                {/* Visual Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="text-center relative z-10 space-y-8">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
                        <div className="p-8 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 shadow-2xl relative z-10">
                            <Target className="h-16 w-16 mx-auto text-blue-400" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-white tracking-tight">Media Blueprint Shell</h3>
                        <p className="text-blue-200/40 max-w-sm mx-auto text-lg font-light leading-relaxed">
                            Your architectural plan will materialize here once the AI has analyzed your brief.
                        </p>
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-6">
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                            ))}
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">System Warmup Ready</span>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <div className={cn("space-y-8", isPresentationMode ? "presentation-mode" : "")}>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Benchmarking Terminal */}
                <Card className={cn(
                    "md:col-span-2 lg:col-span-3 p-6 border-white/5 bg-gradient-to-r from-blue-900/10 to-indigo-900/10 rounded-2xl flex items-center justify-between group relative overflow-hidden",
                    isPresentationMode ? "border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] py-8" : ""
                )}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="flex items-center gap-5 relative z-10">
                        <div className={cn(
                            "p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 transition-transform duration-500",
                            isPresentationMode ? "scale-110" : ""
                        )}>
                            <Activity className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-2">Market Performance Index</div>
                            <div className={cn("font-bold text-slate-200 transition-all", isPresentationMode ? "text-xl" : "text-sm")}>
                                Outperforming Benchmarks by <span className="text-emerald-400">14.2%</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                                <div className="h-full bg-blue-500 w-1/3 opacity-20" />
                                <div className="h-full bg-blue-500 w-1/3 opacity-50" />
                                <div className="h-full bg-blue-500 w-1/4 animate-pulseShadow" />
                            </div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter italic">Alpha Efficiency</span>
                        </div>
                    </div>
                </Card>

                {/* ROI Card */}
                <Card className={cn(
                    "p-6 border-emerald-500/10 bg-emerald-500/5 rounded-2xl flex flex-col justify-center relative overflow-hidden",
                    isPresentationMode ? "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] py-8" : ""
                )}>
                    <div className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest mb-2">Projected ROI</div>
                    <div className={cn("font-black text-white italic tracking-tighter transition-all", isPresentationMode ? "text-4xl" : "text-2xl")}>
                        4.8x <span className="text-xs text-emerald-400 font-bold ml-1">↑ 12%</span>
                    </div>
                </Card>
            </div>

            {/* Context & Rationale */}
            {(currentPlan.geographicScope || currentPlan.flightDate) && (
                <Card className={cn(
                    "p-6 border-white/10 shadow-xl overflow-hidden relative group transition-all",
                    isPresentationMode ? "border-blue-500/30 bg-blue-500/[0.02]" : ""
                )}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors" />
                    <div className="flex gap-5 relative z-10">
                        <div className="p-3 bg-blue-500/10 rounded-xl h-fit border border-blue-500/20">
                            <ShieldCheck className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Deployment Context</h3>
                                <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest font-bold">Neural Environmental Parameters</p>
                            </div>
                            <div className="flex gap-3">
                                {currentPlan.geographicScope && (
                                    <Badge className="bg-slate-800 text-blue-300 border-slate-700 px-3 py-1 font-mono text-[10px]">
                                        GEO: {currentPlan.geographicScope}
                                    </Badge>
                                )}
                                {currentPlan.flightDate && (
                                    <Badge className="bg-slate-800 text-emerald-300 border-slate-700 px-3 py-1 font-mono text-[10px]">
                                        FLIGHT: {currentPlan.flightDate}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Funnel Timeline - Full Width */}
            <Card className={cn(
                "p-8 border-white/5 shadow-2xl overflow-hidden relative transition-all duration-700",
                isPresentationMode ? "border-blue-500/30 bg-white/[0.01] rounded-[2.5rem]" : ""
            )}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="flex justify-between items-center mb-10 relative z-10">
                    <h3 className={cn("font-bold flex items-center gap-3 text-white transition-all", isPresentationMode ? "text-3xl" : "text-xl")}>
                        <Zap className="h-6 w-6 text-blue-400" />
                        Phased Multi-Funnel Alignment
                    </h3>
                    {isPresentationMode && <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full">CORE STRATEGY FRAMEWORK</Badge>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {currentPlan.funnel.map((stage, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className={cn(
                                "group relative p-6 rounded-2xl border transition-all duration-500 flex flex-col min-h-[240px]",
                                isPresentationMode
                                    ? "bg-white/[0.03] border-white/10 hover:border-blue-500/40 p-8"
                                    : "border-white/5 bg-black/40 hover:bg-black/60"
                            )}
                        >
                            <div className="absolute -top-3 left-6">
                                <Badge className={cn("font-black border-0 px-4 py-1 shadow-lg transition-all", isPresentationMode ? "bg-blue-500 scale-110" : "bg-blue-600 group-hover:bg-blue-400")}>
                                    {stage.stage}
                                </Badge>
                            </div>

                            <div className="mt-6 space-y-6 flex-1 flex flex-col">
                                <div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Priority KPIs</div>
                                    <div className="flex flex-wrap gap-2">
                                        {stage.kpis.map((kpi, i) => (
                                            <Badge key={i} variant="outline" className="text-[10px] font-bold border-white/5 text-slate-300 bg-white/5 px-2.5 py-1">
                                                {kpi}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {stage.rationale && (
                                    <div className="text-sm text-slate-300 italic leading-relaxed font-medium border-l-2 border-blue-500/30 pl-4 py-1">
                                        {stage.rationale}
                                    </div>
                                )}

                                <div className="pt-6 border-t border-white/5 mt-auto">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest leading-none">Investment</div>
                                            <div className={cn("font-black text-emerald-400 tracking-tighter transition-all", isPresentationMode ? "text-3xl" : "text-xl")}>
                                                ${(stage.budget_amount || 0).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-black text-slate-300 bg-white/5 border border-white/5 px-3 py-1 rounded-lg">
                                            {stage.budget_pct}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Audience & Ad Formats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Audiences */}
                <Card className={cn(
                    "p-8 border-white/5 shadow-2xl relative overflow-hidden transition-all duration-700",
                    isPresentationMode ? "border-purple-500/20 bg-white/[0.01]" : ""
                )}>
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                        <Users className="h-6 w-6 text-purple-400" />
                        High-Potential Segments
                    </h3>
                    <div className="space-y-6">
                        {currentPlan.audiences.map((audience, idx) => (
                            <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-black/20 hover:border-purple-500/30 transition-all group/aud relative overflow-hidden">
                                <div className="absolute inset-0 bg-purple-500/[0.01] group-hover:bg-purple-500/5 transition-colors" />
                                <div className="flex justify-between items-start mb-3 relative z-10">
                                    <h4 className="font-bold text-slate-200 group-hover/aud:text-white transition-colors uppercase tracking-wide">{audience.name}</h4>
                                    <div className="text-[10px] font-black text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">
                                        REACH: {Math.floor((currentPlan.totalBudget || 0) * (0.8 + idx * 0.1) * 32).toLocaleString()}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed relative z-10">{audience.description}</p>
                                <div className="flex flex-wrap gap-1.5 relative z-10">
                                    {audience.targeting.map((target, i) => (
                                        <Badge key={i} className="text-[9px] font-bold bg-white/5 text-slate-400 border-white/5 px-2 py-0.5 rounded-md group-hover/aud:border-purple-500/20 transition-all">
                                            {target}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Ad Formats */}
                <Card className={cn(
                    "p-8 border-white/5 shadow-2xl overflow-hidden transition-all duration-700",
                    isPresentationMode ? "border-green-500/20 bg-white/[0.01]" : ""
                )}>
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                        <DollarSign className="h-6 w-6 text-green-400" />
                        Asset Tiering Strategy
                    </h3>
                    <div className="space-y-4">
                        {Object.entries(currentPlan.formats).map(([stage, formats], idx) => (
                            <div key={idx} className="flex flex-col gap-3 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-green-500/20 transition-all">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stage}</div>
                                <div className="flex flex-wrap gap-2">
                                    {formats.map((format, i) => (
                                        <Badge key={i} className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold px-3 py-1.5 rounded-lg">
                                            {format}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Targeting Tactics - Horizontal List */}
            <Card className={cn(
                "p-8 border-white/5 shadow-2xl transition-all duration-700",
                isPresentationMode ? "border-blue-500/20 bg-white/[0.01]" : ""
            )}>
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                    <Target className="h-6 w-6 text-blue-400" />
                    Targeting Mechanics & Bidding Levers
                </h3>
                <div className="flex flex-wrap gap-4">
                    {currentPlan.tactics.map((tactic, idx) => {
                        const tacticLabel = typeof tactic === 'string' ? tactic : (tactic as any).name;
                        return (
                            <Badge
                                key={idx}
                                className="px-6 py-3 text-xs font-black bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 hover:border-blue-500/50 transition-all cursor-default rounded-2xl shadow-xl flex items-center gap-3 group/tactic"
                            >
                                <div className="w-2 h-2 rounded-full bg-blue-500/40 group-hover/tactic:bg-blue-400 group-hover/tactic:animate-pulse transition-all" />
                                {tacticLabel}
                            </Badge>
                        );
                    })}
                </div>
            </Card>

            {/* Dynamic Creative Forecast - High Impact Bottom Slide */}
            <Card className={cn(
                "p-10 border-indigo-500/20 bg-indigo-500/5 shadow-2xl relative overflow-hidden group transition-all duration-1000",
                isPresentationMode ? "border-indigo-500/40 bg-indigo-500/[0.04] rounded-[3rem] py-16" : ""
            )}>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-indigo-600/20 transition-colors duration-[2000ms]" />

                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                    <div className="flex-1 space-y-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
                                    <Sparkles className="h-7 w-7 text-indigo-400" />
                                </div>
                                <h3 className={cn("font-black text-white tracking-tight transition-all", isPresentationMode ? "text-4xl" : "text-2xl")}>
                                    Neural Content Synthesis
                                </h3>
                            </div>
                            <p className={cn("font-light leading-relaxed transition-all", isPresentationMode ? "text-xl text-slate-300" : "text-sm text-slate-400")}>
                                Generating adaptive creative variants for the <span className="text-indigo-400 font-bold">{currentPlan.funnel[0]?.stage}</span> phase.
                                The AI predicts a <span className="text-emerald-400 font-black">+22% efficiency lift</span> relative to static broad-market assets.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-black/60 p-5 rounded-2xl border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-3 leading-none">Primary Neural Hook</span>
                                <span className="text-sm text-white/90 italic font-semibold leading-relaxed">"The future of sustainable coffee is here."</span>
                            </div>
                            <div className="bg-black/60 p-5 rounded-2xl border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-3 leading-none">Artistic Direction</span>
                                <span className="text-sm text-white/90 italic font-semibold leading-relaxed">Minimalist, earth-toned gradients with kinetic typography.</span>
                            </div>
                        </div>
                    </div>

                    <div className={cn(
                        "w-full aspect-video bg-slate-950 rounded-[2.5rem] border border-white/10 flex items-center justify-center relative overflow-hidden transition-all duration-700",
                        isPresentationMode ? "lg:w-[450px] shadow-[0_0_60px_rgba(99,102,241,0.2)]" : "lg:w-80"
                    )}>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-black pointer-events-none" />
                        <div className="text-center space-y-4 relative z-10 p-6">
                            <Activity className="h-12 w-12 text-indigo-500 opacity-40 mx-auto animate-pulse" />
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Synthesizing Asset</span>
                                <div className="h-0.5 w-16 bg-slate-800 mx-auto rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-1/2 animate-[progress_2s_infinite]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
