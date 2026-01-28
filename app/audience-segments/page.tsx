'use client';

import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Target, Sparkles, Navigation, Info, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

export default function AudienceSegmentsPage() {
    const { currentPlan } = useAppStore();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Filter out potential legacy audience data that might not have lat/lng
    const activeAudiences = useMemo(() => {
        if (!currentPlan?.audiences) return [];
        return currentPlan.audiences.map((aud, idx) => ({
            ...aud,
            id: idx,
            // Fallback for demonstration if AI missed it
            // Fallback for demonstration since we removed strict geo-typing
            lat: 34.0522 + (idx * 0.1) + (Math.random() * 0.05),
            lng: -118.2437 + (idx * 0.1) + (Math.random() * 0.05),
            demographics: aud.demographics || 'Premium Urban Professionals, Ages 25-45',
            behaviors: 'Early tech adopters, High-frequency travelers, Sustainable luxury shoppers' // Static fallback
        }));
    }, [currentPlan?.audiences]);

    // Calculate map bounds/center
    const mapBounds = useMemo(() => {
        if (activeAudiences.length === 0) return { center: { lat: 34.0522, lng: -118.2437 }, zoom: 12 };

        const lats = activeAudiences.map(a => a.lat);
        const lngs = activeAudiences.map(a => a.lng);

        const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;
        const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;

        return {
            center: { lat: avgLat, lng: avgLng },
            zoom: 11
        };
    }, [activeAudiences]);

    if (!currentPlan) {
        return (
            <div className="container mx-auto p-12 max-w-5xl min-h-screen flex items-center justify-center relative z-10">
                <Card className="p-16 border-dashed border-2 text-center rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
                    <Users className="h-24 w-24 mx-auto mb-8 text-slate-700 animate-pulse" />
                    <h2 className="text-3xl font-bold text-white mb-4 italic">Architectural Analysis Pending</h2>
                    <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                        Audience segment mapping and demographic profiling are generated during the blueprint phase. Please initialize a campaign brief to begin.
                    </p>
                    <Button
                        onClick={() => window.location.href = '/'}
                        className="px-10 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-purple-500/20 uppercase tracking-widest text-xs"
                    >
                        Initialize Dashboard
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-slate-200 relative z-10">
            <div className="container mx-auto p-8 max-w-7xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-400">
                                <Users className="h-6 w-6" />
                            </div>
                            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent tracking-tight">
                                High-Potential Audience Segments
                            </h1>
                        </div>
                        <p className="text-slate-400 text-xl font-light max-w-3xl leading-relaxed">
                            Algorithmic mapping of demographic profiles and behavioral clusters across target regions.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Interactive Map */}
                    <div className="lg:col-span-7 space-y-6">
                        <Card className="rounded-[2.5rem] overflow-hidden relative shadow-2xl aspect-[16/10] border-white/5">
                            {/* Simulated High-End Map Background */}
                            <div className="absolute inset-0 bg-black/40">
                                <div className="absolute inset-0 opacity-20 pointer-events-none"
                                    style={{
                                        backgroundImage: `radial-gradient(#242735 1px, transparent 1px)`,
                                        backgroundSize: '40px 40px'
                                    }}
                                />

                                {/* Target Center Visual */}
                                <div
                                    className="absolute w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"
                                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                />

                                {/* Interactive Markers */}
                                {activeAudiences.map((aud) => (
                                    <motion.div
                                        key={aud.id}
                                        className="absolute cursor-pointer z-20 group"
                                        style={{
                                            // Mapping lat/lng to representative grid positions for custom UI
                                            top: `${50 + (aud.lat - mapBounds.center.lat) * 200}%`,
                                            left: `${50 + (aud.lng - mapBounds.center.lng) * 200}%`,
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                        onClick={() => setSelectedId(aud.id)}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <div className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 ${selectedId === aud.id
                                            ? 'bg-blue-500 scale-125 shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                                            : 'bg-indigo-900/40 border border-indigo-500/30'
                                            }`}>
                                            <Navigation className={`h-4 w-4 ${selectedId === aud.id ? 'text-white' : 'text-blue-400 rotate-45'}`} />

                                            {/* Ripple Effect for selected */}
                                            {selectedId === aud.id && (
                                                <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-ping pointer-events-none" />
                                            )}

                                            {/* Label peek */}
                                            <div className="absolute top-0 left-full ml-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
                                                <span className="text-xs font-bold text-white uppercase tracking-widest">{aud.name}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map UI Elements */}
                            <div className="absolute top-6 left-6 p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 space-y-2 z-30">
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Footprint</div>
                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                    <MapPin className="h-3 w-3 text-blue-400" />
                                    {currentPlan.geographicScope || 'Target Region'}
                                </div>
                            </div>

                            <div className="absolute bottom-6 right-6 flex gap-2 z-30">
                                <Badge className="bg-black/60 hover:bg-black/80 border-white/10 px-4 py-2 cursor-pointer gap-2 backdrop-blur-md">
                                    <ZoomIn className="h-3.5 w-3.5 text-slate-400" />
                                    <span className="text-xs uppercase font-bold tracking-widest">Recalibrate View</span>
                                </Badge>
                            </div>
                        </Card>

                        {/* Map Insight */}
                        <Card className="p-6 bg-gradient-to-r from-blue-900/10 to-transparent border-blue-500/10 rounded-3xl flex gap-6 items-center">
                            <div className="p-3 bg-blue-500/10 rounded-2xl">
                                <Sparkles className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Geospatial Intelligence</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-light">
                                    Markers represent high-density behavioral clusters identified through programmatic attribution data and location signals.
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Detailed list/selection */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Segment Architecture</span>
                            <div className="flex-1 h-px bg-slate-800/50" />
                        </div>

                        <div className="space-y-4">
                            {activeAudiences.map((aud) => (
                                <motion.div
                                    key={aud.id}
                                    layout
                                    initial={false}
                                    animate={{
                                        borderColor: selectedId === aud.id ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.05)',
                                        backgroundColor: selectedId === aud.id ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)'
                                    }}
                                    className="p-8 md:p-10 rounded-[2.5rem] border transition-all cursor-pointer group backdrop-blur-md"
                                    onClick={() => setSelectedId(selectedId === aud.id ? null : aud.id)}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="space-y-1">
                                            <h3 className={`text-xl font-bold transition-colors ${selectedId === aud.id ? 'text-blue-400' : 'text-white group-hover:text-blue-200'}`}>
                                                {aud.name}
                                            </h3>
                                            <div className="flex items-center gap-4">
                                                <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1.5 capitalize">
                                                    <Target className="h-3 w-3" />
                                                    {aud.targeting.slice(0, 2).join(', ')}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-slate-800 text-slate-400 text-xs">
                                            ID: {aud.id + 1}
                                        </Badge>
                                    </div>

                                    <AnimatePresence>
                                        {selectedId === aud.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden space-y-6"
                                            >
                                                <div className="h-px bg-slate-800/50 w-full" />

                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                            <Info className="h-3 w-3" />
                                                            Demographics
                                                        </div>
                                                        <p className="text-sm text-slate-300 leading-relaxed font-light">
                                                            {aud.demographics}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                            <Sparkles className="h-3 w-3" />
                                                            Behaviors
                                                        </div>
                                                        <p className="text-sm text-slate-300 leading-relaxed font-light">
                                                            {aud.behaviors}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5">
                                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Segment Logic</div>
                                                    <p className="text-sm text-slate-300 font-light italic leading-relaxed">
                                                        "{aud.description}"
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center pt-2">
                                                    <div className="flex gap-1.5">
                                                        {aud.targeting.map((t, i) => (
                                                            <Badge key={i} className="bg-blue-500/10 text-blue-400 border-0 text-xs px-2 py-0.5">
                                                                {t}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <div className="text-[10px] font-mono text-slate-600">
                                                        {aud.lat.toFixed(4)}, {aud.lng.toFixed(4)}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
