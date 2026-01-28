'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, PieChart as PieIcon, TrendingUp, AlertCircle, Target, Wallet, Clock, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function BudgetStudio() {
    const { currentPlan, updateBudget, updateDuration, updateFunnelWeights } = useAppStore();
    const [localBudget, setLocalBudget] = useState<number>(0);
    const [localDuration, setLocalDuration] = useState<number>(30);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (currentPlan) {
            if (currentPlan.totalBudget) setLocalBudget(currentPlan.totalBudget);
            if (currentPlan.duration) setLocalDuration(currentPlan.duration);
        }
    }, [currentPlan]);

    // Derived state for the chart
    const chartData = currentPlan?.funnel.map((stage) => ({
        name: stage.stage,
        value: stage.budget_amount || 0,
        pct: stage.budget_pct,
    })) || [];

    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

    const handleBudgetChange = (value: number[]) => {
        const newBudget = value[0];
        setLocalBudget(newBudget);
        updateBudget(newBudget);
    };

    const handleDurationChange = (value: number[]) => {
        const newDuration = value[0];
        setLocalDuration(newDuration);
        updateDuration(newDuration);
    };

    const handleFunnelChange = (stageName: string, newPct: number[]) => {
        updateFunnelWeights({ [stageName]: newPct[0] });
    };

    if (!isMounted) return null;

    if (!currentPlan) {
        return (
            <div className="container mx-auto p-8 max-w-6xl min-h-screen flex items-center justify-center relative z-10">
                <Card className="p-12 border border-white/5 text-center max-w-lg w-full shadow-2xl rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors duration-1000" />
                    <Wallet className="h-20 w-20 mx-auto mb-6 text-slate-700 group-hover:text-blue-500/50 transition-colors duration-500" />
                    <h2 className="text-2xl font-bold text-white mb-2">No Active Media Plan</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Start by generating a campaign strategy in the Dashboard to unlock the Budget Studio.
                    </p>
                    <Button
                        className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20"
                        onClick={() => window.location.href = '/'}
                    >
                        Go to Dashboard
                    </Button>
                </Card>
            </div>
        );
    }

    const totalAllocatedPct = currentPlan.funnel.reduce((acc, stage) => acc + stage.budget_pct, 0);
    const isAllocationValid = Math.abs(totalAllocatedPct - 100) < 0.1;

    return (
        <div className="min-h-screen bg-transparent text-slate-200 relative z-10">
            <div className="container mx-auto p-6 md:p-8 max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent inline-block">
                            Budget Studio
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl font-light">
                            Orchestrate your investment strategy with real-time impact analysis.
                        </p>
                    </div>
                    <Badge variant="outline" className="w-fit border-blue-500/30 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm">
                        <Sparkles className="h-3.5 w-3.5 mr-2" />
                        AI Optimized
                    </Badge>
                </div>

                {/* Top Controls: Budget & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total Investment */}
                    <Card className="border-white/5 shadow-xl rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[50px] rounded-full group-hover:bg-green-500/10 transition-colors duration-500" />
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-3 text-xl text-white">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <DollarSign className="h-5 w-5 text-green-400" />
                                </div>
                                Total Investment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4 relative z-10">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-3xl font-bold font-mono text-white">
                                    ${localBudget.toLocaleString()}
                                </div>
                                <div className="text-sm font-medium text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                                    USD
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Slider
                                    value={[localBudget]}
                                    min={1000}
                                    max={100000}
                                    step={1000}
                                    onValueChange={handleBudgetChange}
                                    className="w-full py-2"
                                />
                                <div className="flex justify-between text-xs text-slate-500 font-medium tracking-wide">
                                    <span>$1k</span>
                                    <span>$50k</span>
                                    <span>$100k+</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Campaign Duration */}
                    <Card className="border-white/5 shadow-xl rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full group-hover:bg-purple-500/10 transition-colors duration-500" />
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-3 text-xl text-white">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <Clock className="h-5 w-5 text-purple-400" />
                                </div>
                                Campaign Duration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4 relative z-10">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-3xl font-bold font-mono text-white">
                                    {localDuration} <span className="text-lg text-slate-500 font-sans font-normal">days</span>
                                </div>
                                <div className="text-sm font-medium text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                                    {localDuration < 14 ? 'Sprint' : localDuration > 60 ? 'Marathon' : 'Standard'}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Slider
                                    value={[localDuration]}
                                    min={7}
                                    max={90}
                                    step={1}
                                    onValueChange={handleDurationChange}
                                    className="w-full py-2"
                                />
                                <div className="flex justify-between text-xs text-slate-500 font-medium tracking-wide">
                                    <span>1 wk</span>
                                    <span>1 mo</span>
                                    <span>3 mo</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Allocation Controls */}
                    <Card className="lg:col-span-2 border-white/5 shadow-xl rounded-2xl relative overflow-hidden">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="flex items-center gap-3 text-white">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-blue-400" />
                                    </div>
                                    Funnel Allocation
                                </CardTitle>
                                {!isAllocationValid ? (
                                    <Badge variant="destructive" className="animate-pulse bg-red-500/10 text-red-400 border-red-500/20">
                                        Total: {totalAllocatedPct}% (Fix)
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-green-400 border-green-500/20 bg-green-500/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2 animate-pulse" />
                                        Optimized
                                    </Badge>
                                )}
                            </div>
                            <CardDescription className="text-slate-400">
                                Fine-tune the percentage of budget dedicated to each stage of the user journey.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {currentPlan.funnel.map((stage, idx) => (
                                <div key={stage.stage} className="p-5 rounded-xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/10 transition-all duration-300 group">
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="space-y-1">
                                            <div className="font-semibold text-lg text-white flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ color: COLORS[idx % COLORS.length], backgroundColor: COLORS[idx % COLORS.length] }} />
                                                {stage.stage}
                                            </div>
                                            <div className="text-sm text-slate-500 flex flex-wrap gap-2 pl-6">
                                                {stage.kpis.slice(0, 3).map(kpi => (
                                                    <span key={kpi} className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
                                                        {kpi}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold font-mono text-slate-200 group-hover:text-white transition-colors">
                                                ${Math.floor(stage.budget_amount || 0).toLocaleString()}
                                            </div>
                                            <div className="text-sm text-slate-500 font-medium">
                                                {stage.budget_pct}%
                                            </div>
                                        </div>
                                    </div>
                                    <Slider
                                        value={[stage.budget_pct]}
                                        min={0}
                                        max={100}
                                        step={1}
                                        onValueChange={(val) => handleFunnelChange(stage.stage, val)}
                                        className="py-2"
                                    />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="bg-slate-900/30 border-t border-slate-800 p-4">
                            <div className="flex gap-2 items-center text-sm text-slate-400">
                                <AlertCircle className="h-4 w-4 text-blue-400" />
                                Tip: Shorten duration to shift focus towards Conversion.
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Analytical Visualization */}
                    <div className="space-y-6">
                        <Card className="border-white/5 shadow-xl rounded-2xl overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base text-white">
                                    <PieIcon className="h-5 w-5 text-slate-400" />
                                    Allocation Mix
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-[280px] flex items-center justify-center relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={85}
                                            paddingAngle={6}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Budget']}
                                            contentStyle={{
                                                backgroundColor: '#1E202E',
                                                borderColor: '#334155',
                                                borderRadius: '12px',
                                                color: '#f1f5f9',
                                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                                            }}
                                            itemStyle={{ color: '#cbd5e1' }}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            iconType="circle"
                                            formatter={(value) => <span className="text-slate-400 text-sm ml-1">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                                    <div className="text-center">
                                        <span className="text-xs uppercase tracking-widest text-slate-400">Total</span>
                                        <div className="font-bold text-white text-lg">
                                            ${(localBudget / 1000).toFixed(1)}k
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-indigo-900 to-blue-900 border border-indigo-700/50 shadow-xl rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Target className="h-5 w-5 text-indigo-300" />
                                    Projected Impact
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl backdrop-blur-md border border-white/5">
                                    <span className="text-sm font-medium text-indigo-200">Est. Reach</span>
                                    <span className="font-bold text-lg text-white">
                                        {Math.floor(localBudget * 32 * (1 + localDuration / 200)).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl backdrop-blur-md border border-white/5">
                                    <span className="text-sm font-medium text-indigo-200">Est. Clicks</span>
                                    <span className="font-bold text-lg text-white">
                                        {Math.floor((localBudget / 3.5) * (1 + localDuration / 300)).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-white/10">
                                    <span className="text-sm font-bold text-white">Est. Conversions</span>
                                    <span className="font-bold text-2xl text-white">
                                        {Math.floor((localBudget * 0.042) * (1 + localDuration / 400)).toLocaleString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
