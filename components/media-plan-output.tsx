'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { Target, Users, Zap, DollarSign, Sparkles } from 'lucide-react';

export function MediaPlanOutput() {
    const { currentPlan } = useAppStore();

    if (!currentPlan) {
        return (
            <Card className="p-12 bg-[#151725] border-slate-800 border-dashed border-2 rounded-3xl relative overflow-hidden group min-h-[660px] flex items-center justify-center transition-all hover:border-blue-500/20">
                {/* Visual Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="text-center relative z-10 space-y-8">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
                        <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 shadow-2xl relative z-10">
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
                        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold">System Warmup Ready</span>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Master Rationale */}
            {currentPlan.masterRationale && (
                <Card className="p-8 bg-[#151725] border-blue-500/20 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="flex gap-6 relative z-10">
                        <div className="p-4 bg-blue-500/10 rounded-2xl h-fit border border-blue-500/20">
                            <Sparkles className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white">Strategic Architecture Rationale</h3>
                            <p className="text-slate-400 leading-relaxed font-light italic">"{currentPlan.masterRationale}"</p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Funnel Timeline */}
            <Card className="p-6 bg-[#1E202E] border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white relative z-10">
                    <Zap className="h-5 w-5 text-blue-400" />
                    Phased Strategy: Multi-Funnel Alignment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {currentPlan.funnel.map((stage, idx) => (
                        <div
                            key={idx}
                            className="group relative p-5 rounded-xl border border-slate-700/50 bg-slate-900/50 hover:bg-slate-800/50 transition-all duration-300 hover:border-blue-500/30 flex flex-col"
                        >
                            <div className="absolute -top-3 left-4">
                                <Badge className="bg-blue-600 hover:bg-blue-500 text-white font-semibold border-0 px-3">
                                    {stage.stage}
                                </Badge>
                            </div>
                            <div className="mt-4 space-y-4 flex-1">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Primary KPIs</div>
                                    <div className="flex flex-wrap gap-2">
                                        {stage.kpis.map((kpi, i) => (
                                            <Badge key={i} variant="outline" className="text-[10px] border-slate-700 text-slate-400 bg-slate-900/50">
                                                {kpi}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {stage.rationale && (
                                    <div className="text-[11px] text-slate-500 italic leading-relaxed border-l border-blue-500/20 pl-3">
                                        {stage.rationale}
                                    </div>
                                )}

                                <div className="pt-2 border-t border-slate-700/50 mt-auto">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Allocation</div>
                                            <div className="text-2xl font-bold text-green-400">
                                                ${(stage.budget_amount || 0).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                                            {stage.budget_pct}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Audience segments (Existing but enhanced) */}
            <Card className="p-6 bg-[#1E202E] border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    <Users className="h-5 w-5 text-purple-400" />
                    High-Potential Audience Segments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPlan.audiences.map((audience, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-transparent hover:border-purple-500/30 transition-all group/aud"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-lg text-slate-200 group-hover/aud:text-white transition-colors">{audience.name}</h4>
                                <Badge variant="secondary" className="bg-purple-900/20 text-purple-300 border-0">
                                    Reach: {Math.floor((currentPlan.totalBudget || 0) * (0.8 + idx * 0.1) * 32).toLocaleString()}
                                </Badge>
                            </div>
                            {audience.description && (
                                <p className="text-sm text-slate-400 mb-4 leading-relaxed font-light">{audience.description}</p>
                            )}
                            <div className="flex flex-wrap gap-1.5">
                                {audience.targeting.map((target, i) => (
                                    <Badge key={i} variant="secondary" className="text-[10px] bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors border-slate-700">
                                        {target}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Ad Formats */}
            <Card className="p-6 bg-[#1E202E] border-slate-800 shadow-xl overflow-hidden">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    Activation: Optimal Creative Formats
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-[10px] text-slate-500 uppercase bg-slate-900/50 tracking-widest">
                            <tr>
                                <th className="px-6 py-4 rounded-l-lg">Deployment Tier</th>
                                <th className="px-6 py-4 rounded-r-lg">Recommended Ad Types</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(currentPlan.formats).map(([stage, formats], idx) => (
                                <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-200">{stage}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {formats.map((format, i) => (
                                                <Badge key={i} className="bg-green-900/10 text-green-400 border border-green-500/20 hover:bg-green-900/20 rounded-lg">
                                                    {format}
                                                </Badge>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Targeting Tactics */}
            <Card className="p-6 bg-[#1E202E] border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-400" />
                        Targeting Tactics & Contextual Levers
                    </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    {currentPlan.tactics.map((tactic, idx) => {
                        const isObject = typeof tactic === 'object' && tactic !== null;
                        const tacticName = isObject ? (tactic as any).name : tactic;
                        const tacticDesc = isObject ? (tactic as any).description : '';
                        const metricLabel = isObject ? (tactic as any).metric_label : '';
                        const metricValue = isObject ? (tactic as any).metric_value : '';

                        return (
                            <div key={idx} className="group/tactic relative">
                                <Badge
                                    className="px-5 py-2.5 text-xs font-bold bg-[#0F111A] border border-blue-500/20 text-blue-300 hover:border-blue-500/50 transition-all cursor-default rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center gap-2"
                                >
                                    <Zap className="h-3 w-3 text-yellow-500" />
                                    {tacticName}
                                </Badge>

                                {isObject && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl opacity-0 group-hover/tactic:opacity-100 transition-opacity pointer-events-none z-50">
                                        <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">{tacticDesc}</p>
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{metricLabel}</span>
                                            <span className="text-[10px] font-bold text-blue-400">{metricValue}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
