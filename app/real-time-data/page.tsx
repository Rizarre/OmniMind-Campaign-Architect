'use client';

import { useAppStore } from '@/lib/store';
import { LiveSignals } from '@/components/live-signals';
import { Card } from '@/components/ui/card';
import { Activity, Info, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RealTimeDataPage() {
    const { campaignInput, isGenerating } = useAppStore();

    return (
        <div className="min-h-screen bg-[#0F111A] text-slate-200">
            <div className="container mx-auto p-6 md:p-8 max-w-7xl space-y-10 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Activity className="h-6 w-6 text-blue-400" />
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Live Signal Intelligence
                            </h1>
                        </motion.div>
                        <p className="text-slate-400 text-lg max-w-3xl font-light leading-relaxed">
                            Synchronizing your campaign strategy with real-time market indices, local events, and trending search momentum.
                        </p>
                    </div>
                </div>

                {!campaignInput ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Card className="p-12 bg-[#151725] border border-slate-800 text-center rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
                            <div className="relative z-10 space-y-6">
                                <div className="p-6 bg-slate-900/50 rounded-full w-fit mx-auto border border-slate-800">
                                    <AlertTriangle className="h-12 w-12 text-slate-600" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white">No Active Intent Detected</h2>
                                    <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                                        Please define your campaign brief in the Dashboard to begin receiving real-time signal integration.
                                    </p>
                                </div>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <LiveSignals />
                        </motion.div>

                        {/* Additional Page Content: Contextual Reasoning */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-8 bg-[#151725] border-slate-800 rounded-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                        <Info className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-bold text-white">Signal-to-Strategy Mapping</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                                            Our AI automatically correlates these real-time signals with your media plan. When a high-impact local event is detected, your funnel weights automatically tilt toward Awareness to capture the surge in local attention.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 bg-[#151725] border-slate-800 rounded-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors" />
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                                        <TrendingUp className="h-5 w-5 text-purple-400" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-bold text-white">CPM Volatility Index</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                                            The live CPM estimates are derived from a composite index of 15+ global DSPs. We refresh these every 15 minutes to ensure your budget studio remaining accurate to current market conditions.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
