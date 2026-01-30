'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BrainService } from '@/lib/brain-service';
import { Loader2, Brain, AlertTriangle, TrendingUp, ArrowRightLeft, Zap } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function CampaignBrief() {
    const { currentPlan } = useAppStore();
    const [brief, setBrief] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we'd check if a campaign exists first
        const fetchBrief = async () => {
            try {
                const data = await BrainService.getDailyBrief('mock-id');
                setBrief(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBrief();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-12 flex flex-col items-center justify-center h-[60vh]">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse"></div>
                    <Loader2 className="h-12 w-12 animate-spin text-indigo-500 relative z-10" />
                </div>
                <span className="mt-6 text-slate-300 font-bold tracking-widest uppercase text-sm animate-pulse">Synchronizing Neural Networks...</span>
            </div>
        );
    }

    if (!brief) return <div>Failed to load brief</div>;

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <div className="mb-8 flex items-center gap-4">
                <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                    <Brain className="h-10 w-10 text-indigo-400" />
                </div>
                <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Campaign Brain
                    </h1>
                    <p className="text-slate-400 font-medium">Daily strategic command center & automated insights</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Strategic Brief */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-8 md:p-10 border-white/5">
                        <h2 className="text-sm font-black mb-6 flex items-center text-white italic tracking-[0.2em] uppercase">
                            <Zap className="h-4 w-4 mr-2 text-yellow-400 fill-yellow-400/20" />
                            Command Intelligence Brief
                        </h2>
                        <ul className="space-y-4">
                            {brief.strategic_brief.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-black text-indigo-400 mr-4 border border-indigo-500/10 group-hover:scale-110 transition-transform">
                                        {idx + 1}
                                    </span>
                                    <span className="text-slate-300 text-sm leading-relaxed font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Opportunities */}
                    <Card className="p-8 md:p-10 border-white/5">
                        <h2 className="text-sm font-black mb-8 flex items-center text-emerald-400 italic tracking-[0.2em] uppercase">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Neural Growth Vectors
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {brief.opportunities.map((opp: any, idx: number) => (
                                <div key={idx} className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex flex-col hover:bg-emerald-500/10 transition-all border-b-2 border-b-emerald-500/30">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 capitalize font-black text-xs tracking-widest px-3 py-1">
                                            {opp.type}
                                        </Badge>
                                        <div className="text-xs font-black text-emerald-500/60 uppercase tracking-[0.2em] shrink-0">Impact Score {opp.impact_score}</div>
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-bold text-white mb-6 leading-tight text-lg">{opp.description}</p>
                                        <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-8">
                                            <p className="text-xs font-black text-emerald-500/80 uppercase tracking-[0.2em] mb-2 text-center border-b border-emerald-500/10 pb-2">Proposed Deployment</p>
                                            <p className="text-sm text-slate-300 font-bold leading-relaxed">{opp.action}</p>
                                        </div>
                                    </div>

                                    <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-600/20 py-6 text-xs tracking-widest uppercase">
                                        Execute Shift
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar: Risks & Shifts */}
                <div className="space-y-6">
                    {/* Risks */}
                    <Card className="p-6 border-rose-500/20 bg-rose-500/5 backdrop-blur-xl">
                        <h2 className="text-sm font-black mb-6 flex items-center text-rose-400 italic tracking-[0.2em] uppercase">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Active Risks
                        </h2>
                        <div className="space-y-4">
                            {brief.risks.map((risk: any, idx: number) => (
                                <div key={idx} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-black text-rose-500 uppercase tracking-[0.2em]">{risk.type}</span>
                                        <Badge variant={risk.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs px-2 py-0 h-5 font-bold">
                                            {risk.severity.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-bold text-white mb-3 leading-relaxed">{risk.description}</p>
                                    <div className="text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-white/5">
                                        <strong className="text-rose-400/80 uppercase text-xs tracking-widest block mb-1">Mitigation Strategy</strong>
                                        {risk.mitigation}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Budget Reallocation */}
                    <Card className="p-8 md:p-10 border-white/5">
                        <h2 className="text-sm font-black mb-6 flex items-center text-blue-400 italic tracking-[0.2em] uppercase">
                            <ArrowRightLeft className="h-5 w-5 mr-2" />
                            Budget Smart-Shifts
                        </h2>
                        <div className="space-y-4">
                            {brief.budget_reallocation.map((shift: any, idx: number) => (
                                <div key={idx} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 shadow-sm hover:border-blue-500/30 transition-all">
                                    <div className="flex items-center justify-between text-xs mb-3">
                                        <div className="font-bold text-rose-400 uppercase tracking-wider">{shift.from_segment}</div>
                                        <ArrowRightLeft className="h-4 w-4 text-slate-600" />
                                        <div className="font-bold text-emerald-400 uppercase tracking-wider">{shift.to_segment}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 font-black">
                                            MOVE {shift.amount_percent}% BUDGET
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-slate-400 italic leading-relaxed">"{shift.reason}"</p>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 font-bold py-5">
                                Review All Shifts
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
