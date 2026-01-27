'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { Target, Users, Zap, DollarSign } from 'lucide-react';

export function MediaPlanOutput() {
    const { currentPlan } = useAppStore();

    if (!currentPlan) {
        return (
            <Card className="p-12 bg-white/60 backdrop-blur-sm border-dashed border-2 border-slate-300">
                <div className="text-center text-muted-foreground">
                    <Target className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">No media plan generated yet</p>
                    <p className="text-sm mt-2">Enter your campaign details and click "Generate Media Plan" to get started</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Funnel Timeline */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Funnel Strategy
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    {currentPlan.funnel.map((stage, idx) => (
                        <div
                            key={idx}
                            className="relative p-4 rounded-lg border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-shadow"
                        >
                            <div className="absolute -top-3 left-4">
                                <Badge className="bg-blue-600 text-white font-semibold">
                                    {stage.stage}
                                </Badge>
                            </div>
                            <div className="mt-4 space-y-3">
                                <div>
                                    <div className="text-xs font-semibold text-muted-foreground mb-1">KPIs</div>
                                    <div className="flex flex-wrap gap-1">
                                        {stage.kpis.map((kpi, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {kpi}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-muted-foreground mb-1">Budget</div>
                                    <div className="text-2xl font-bold text-green-600">
                                        ${stage.budget_amount?.toLocaleString() || 'N/A'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">{stage.budget_pct}% of total</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Audience Segments */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Audience Segments
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {currentPlan.audiences.map((audience, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-lg border border-slate-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow"
                        >
                            <h4 className="font-bold text-lg mb-2">{audience.name}</h4>
                            {audience.description && (
                                <p className="text-sm text-muted-foreground mb-3">{audience.description}</p>
                            )}
                            <div className="flex flex-wrap gap-1">
                                {audience.targeting.map((target, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                        {target}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Ad Formats */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Ad Formats by Funnel Stage
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-slate-200">
                                <th className="text-left py-3 px-4 font-semibold">Funnel Stage</th>
                                <th className="text-left py-3 px-4 font-semibold">Recommended Formats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(currentPlan.formats).map(([stage, formats], idx) => (
                                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-3 px-4 font-medium">{stage}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-wrap gap-2">
                                            {formats.map((format, i) => (
                                                <Badge key={i} className="bg-green-100 text-green-800 hover:bg-green-200">
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
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <h3 className="text-xl font-bold mb-4">Targeting Tactics</h3>
                <div className="flex flex-wrap gap-2">
                    {currentPlan.tactics.map((tactic, idx) => (
                        <Badge
                            key={idx}
                            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                        >
                            {tactic}
                        </Badge>
                    ))}
                </div>
            </Card>
        </div>
    );
}
