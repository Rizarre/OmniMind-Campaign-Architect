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
            <div className="container mx-auto p-12 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-muted-foreground">Analyzing campaign data...</span>
            </div>
        );
    }

    if (!brief) return <div>Failed to load brief</div>;

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <div className="mb-8 flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                    <Brain className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Campaign Brain</h1>
                    <p className="text-muted-foreground">Daily strategic command center & automated insights</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Strategic Brief */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 border-l-4 border-l-indigo-600 bg-white/50 backdrop-blur-sm shadow-md">
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-indigo-600" />
                            Daily Strategic Brief
                        </h2>
                        <ul className="space-y-4">
                            {brief.strategic_brief.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 mr-3">
                                        {idx + 1}
                                    </span>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Opportunities */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center text-green-700">
                            <TrendingUp className="h-5 w-5 mr-2" />
                            Strategic Opportunities
                        </h2>
                        <div className="space-y-4">
                            {brief.opportunities.map((opp: any, idx: number) => (
                                <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="bg-white text-green-700 border-green-200 capitalize">
                                            {opp.type}
                                        </Badge>
                                        <div className="text-xs font-bold text-green-600">Impact Score: {opp.impact_score}/10</div>
                                    </div>
                                    <p className="font-semibold text-green-900 mb-2">{opp.description}</p>
                                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                        Accept: {opp.action}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar: Risks & Shifts */}
                <div className="space-y-6">
                    {/* Risks */}
                    <Card className="p-6 border-red-100 bg-red-50/30">
                        <h2 className="text-lg font-bold mb-4 flex items-center text-red-700">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Active Risks
                        </h2>
                        <div className="space-y-3">
                            {brief.risks.map((risk: any, idx: number) => (
                                <div key={idx} className="p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{risk.type}</span>
                                        <Badge variant={risk.severity === 'high' ? 'destructive' : 'secondary'} className="text-[10px] h-5">
                                            {risk.severity} risk
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-medium mb-2">{risk.description}</p>
                                    <div className="text-xs text-muted-foreground bg-slate-50 p-2 rounded">
                                        <strong>Mitigation:</strong> {risk.mitigation}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Budget Reallocation */}
                    <Card className="p-6 bg-slate-50 border-slate-200">
                        <h2 className="text-lg font-bold mb-4 flex items-center text-slate-700">
                            <ArrowRightLeft className="h-5 w-5 mr-2" />
                            Budget Smart-Shifts
                        </h2>
                        <div className="space-y-3">
                            {brief.budget_reallocation.map((shift: any, idx: number) => (
                                <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <div className="font-medium text-red-500">{shift.from_segment}</div>
                                        <ArrowRightLeft className="h-4 w-4 text-slate-400" />
                                        <div className="font-medium text-green-600">{shift.to_segment}</div>
                                    </div>
                                    <div className="mb-2">
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                            Move {shift.amount_percent}% Budget
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground italic">"{shift.reason}"</p>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full border-slate-300">
                                Review All Shifts
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
