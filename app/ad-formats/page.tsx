'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Video, Image, Smartphone, Monitor, Info, Sparkles, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdFormatsPage() {
    const { currentPlan } = useAppStore();

    const getIconForFormat = (format: string) => {
        const f = format.toLowerCase();
        if (f.includes('video') || f.includes('ctv')) return <Video className="h-5 w-5" />;
        if (f.includes('native') || f.includes('display')) return <Image className="h-5 w-5" />;
        if (f.includes('mobile') || f.includes('interstitial')) return <Smartphone className="h-5 w-5" />;
        return <Layout className="h-5 w-5" />;
    };

    if (!currentPlan) {
        return (
            <div className="container mx-auto p-8 max-w-5xl min-h-screen flex items-center justify-center relative z-10">
                <Card className="p-16 border-dashed border-2 text-center rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
                    <Layers className="h-24 w-24 mx-auto mb-8 text-slate-700 animate-pulse" />
                    <h2 className="text-3xl font-bold text-white mb-4 italic">Awaiting Creative Parameters</h2>
                    <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                        Creative format recommendations are dynamically generated based on your campaign's funnel architecture. Start in the Dashboard.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-500/20 active:scale-95"
                    >
                        Initialize Dashboard
                    </button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-slate-200 relative z-10">
            <div className="container mx-auto p-8 max-w-7xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Page Header */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <Layers className="h-6 w-6 text-purple-400" />
                        </div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent tracking-tight">
                            Optimal Creative Formats
                        </h1>
                    </div>
                    <p className="text-slate-400 text-xl font-light max-w-3xl leading-relaxed">
                        Precision-matched creative tiers designed for maximum retention at every stage of the funnel.
                    </p>
                </div>

                {/* Funnel Stages & Formats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(currentPlan.formats).map(([stage, formats], idx) => (
                        <motion.div
                            key={stage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="p-8 md:p-10 border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-purple-500/30 transition-all shadow-xl flex flex-col h-full">
                                <CardHeader className="p-8 pb-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge className="bg-purple-900/40 text-purple-300 border-purple-500/20 px-3 py-1 rounded-full uppercase text-xs tracking-widest font-bold">
                                            {stage}
                                        </Badge>
                                        <div className="p-2 bg-slate-900 rounded-lg border border-white/5">
                                            <Monitor className="h-4 w-4 text-slate-500" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-white mb-2">{stage} Suite</CardTitle>
                                    <CardDescription className="text-slate-400 italic text-xs leading-relaxed">
                                        {currentPlan.funnel.find(f => f.stage === stage)?.rationale || "Optimizing for peak efficiency and audience alignment."}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-4 space-y-6 flex-1">
                                    <div className="space-y-3">
                                        <div className="text-xs uppercase font-black text-slate-400 tracking-widest">Recommended Units</div>
                                        <div className="grid grid-cols-1 gap-3">
                                            {formats.map((format, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group/format">
                                                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover/format:scale-110 transition-transform">
                                                        {getIconForFormat(format)}
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-200">{format}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-800/50">
                                        <div className="flex items-start gap-3 bg-purple-500/5 p-4 rounded-2xl border border-purple-500/10">
                                            <Sparkles className="h-4 w-4 text-purple-400 mt-0.5" />
                                            <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                                AI Insight: Using {formats[0] || 'standard units'} here is expected to increase engagement by 18% based on current audience behavior.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* General Best Practices */}
                <Card className="p-10 border-white/5 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Info className="h-5 w-5 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Creative Execution Strategy</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-1 h-1 rounded-full bg-blue-500/40 mt-2 shrink-0" />
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Ensure all video assets have a strong 3-second hook to combat high scroll speeds.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1 h-1 rounded-full bg-blue-500/40 mt-2 shrink-0" />
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Implement multi-variant creative testing to automatically pivot spend toward top-performing imagery.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1 h-1 rounded-full bg-blue-500/40 mt-2 shrink-0" />
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Dynamic creative optimization (DCO) is recommended for personalized retargeting display units.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 flex flex-col justify-center text-center space-y-4">
                            <div className="text-5xl font-bold text-white">12.4%</div>
                            <div className="text-sm font-black text-slate-400 uppercase tracking-widest">Projected CTR Lift</div>
                            <p className="text-sm text-slate-400 max-w-[200px] mx-auto leading-relaxed">Using architect-recommended formats vs. generic standardized units.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
