'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function CreativeTesting() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    // Form State
    const [conceptName, setConceptName] = useState('');
    const [script, setScript] = useState('');
    const [visualStyle, setVisualStyle] = useState('');
    const [audience, setAudience] = useState('');
    const [tone, setTone] = useState('');

    const handleAnalyze = async () => {
        if (!script || !conceptName) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/creative-analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    concept_name: conceptName,
                    script_content: script,
                    visual_style: visualStyle,
                    target_audience: audience,
                    tone: tone
                })
            });

            if (!response.ok) throw new Error('Analysis failed');
            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            // In a real app, show toast error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <div className="mb-8 flex items-center gap-4">
                <div className="p-4 bg-pink-500/10 rounded-2xl border border-pink-500/20 shadow-lg shadow-pink-500/10">
                    <Sparkles className="h-10 w-10 text-pink-400" />
                </div>
                <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Creative Testing Lab
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Pre-test your ad concepts with AI to predict performance and risks before production.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Column */}
                <div className="space-y-6">
                    <Card className="p-8 md:p-10 border-white/5 backdrop-blur-xl shadow-2xl">
                        <h2 className="text-xl font-bold mb-6 text-white">Concept Details</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-bold uppercase text-xs tracking-widest">Concept Name</Label>
                                    <Input
                                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-pink-500/50 transition-all"
                                        placeholder="e.g. 'Hero Video - Emotional Hook'"
                                        value={conceptName}
                                        onChange={(e) => setConceptName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-bold uppercase text-xs tracking-widest">Target Audience</Label>
                                    <Input
                                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-pink-500/50 transition-all"
                                        placeholder="e.g. Millennials, Parents"
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-300 font-bold uppercase text-xs tracking-widest">Visual Style</Label>
                                <Select value={visualStyle} onValueChange={setVisualStyle}>
                                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                                        <SelectValue placeholder="Select style..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        <SelectItem value="UGC / Authentic">UGC / Authentic</SelectItem>
                                        <SelectItem value="Cinematic / High Production">Cinematic / High Production</SelectItem>
                                        <SelectItem value="Animated / Motion Graphics">Animated / Motion Graphics</SelectItem>
                                        <SelectItem value="Minimalist / Text-Heavy">Minimalist / Text-Heavy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-300 font-bold uppercase text-xs tracking-widest">Tone</Label>
                                <Input
                                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-pink-500/50 transition-all"
                                    placeholder="e.g. Humorous, Urgent, Inspiring"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-300 font-bold uppercase text-xs tracking-widest">Script / Creative Content</Label>
                                <Textarea
                                    className="min-h-[200px] bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-pink-500/50 transition-all"
                                    placeholder="Describe the video script, ad copy, or scene breakdown here..."
                                    value={script}
                                    onChange={(e) => setScript(e.target.value)}
                                />
                            </div>

                            <Button
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black py-6 rounded-xl shadow-lg shadow-pink-500/20 transition-all active:scale-[0.98]"
                                size="lg"
                                onClick={handleAnalyze}
                                disabled={loading || !script}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analyzing Concept...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Predict Performance
                                    </>
                                )}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Output Column */}
                <div className="space-y-6">
                    {!result && !loading && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 p-12 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20 backdrop-blur-sm">
                            <Sparkles className="h-16 w-16 mb-6 opacity-20 text-pink-500" />
                            <p className="text-lg font-medium">Enter details to generate AI prediction</p>
                        </div>
                    )}

                    {result && (
                        <>
                            {/* Prediction Scores */}
                            <Card className="p-10 border-white/5 backdrop-blur-xl shadow-2xl">
                                <h2 className="text-xl font-black mb-8 flex items-center text-white italic tracking-tight">
                                    <TrendingUp className="h-6 w-6 mr-3 text-pink-500" />
                                    PROGNOSTIC ENGINE
                                </h2>

                                <div className="space-y-8">
                                    <div className="group">
                                        <div className="flex justify-between mb-3">
                                            <span className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">Engagement Potential</span>
                                            <span className="font-black text-pink-400 text-lg">{result.scores.engagement}<span className="text-xs text-slate-500">/100</span></span>
                                        </div>
                                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                            <div
                                                className="h-full bg-gradient-to-r from-pink-600 to-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-1000 ease-out"
                                                style={{ width: `${result.scores.engagement}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="flex justify-between mb-3">
                                            <span className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">Persuasion Score</span>
                                            <span className="font-black text-blue-400 text-lg">{result.scores.persuasion}<span className="text-xs text-slate-500">/100</span></span>
                                        </div>
                                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-1000 ease-out"
                                                style={{ width: `${result.scores.persuasion}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="flex justify-between mb-3">
                                            <span className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">Backlash Risk</span>
                                            <span className="font-black text-rose-500 text-lg">{result.scores.backlash_risk}<span className="text-xs text-slate-500">/100</span></span>
                                        </div>
                                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                            <div
                                                className="h-full bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all duration-1000 ease-out"
                                                style={{ width: `${result.scores.backlash_risk}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 p-5 bg-slate-900/80 rounded-2xl border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
                                    <p className="text-sm italic text-slate-300 leading-relaxed">"{result.prediction_summary}"</p>
                                </div>
                            </Card>

                            {/* Analysis Details */}
                            <Card className="p-8 md:p-10 border-white/5 backdrop-blur-xl">
                                <h3 className="text-xl font-bold mb-6 text-white">Detailed Analysis</h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="flex items-center text-emerald-400 font-bold mb-3 uppercase text-xs tracking-widest">
                                            <CheckCircle2 className="h-4 w-4 mr-2" /> Strengths
                                        </h4>
                                        <ul className="space-y-2">
                                            {result.analysis.strengths.map((s: string, i: number) => (
                                                <li key={i} className="flex items-start text-sm text-slate-300 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                                                    <span className="text-emerald-500 mr-2">•</span>
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="flex items-center text-amber-500 font-bold mb-3 uppercase text-xs tracking-widest">
                                            <AlertTriangle className="h-4 w-4 mr-2" /> Needs Improvement
                                        </h4>
                                        <ul className="space-y-2">
                                            {result.analysis.weaknesses.map((s: string, i: number) => (
                                                <li key={i} className="flex items-start text-sm text-slate-300 bg-amber-500/5 p-3 rounded-lg border border-amber-500/10">
                                                    <span className="text-amber-500 mr-2">•</span>
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-6 border-t border-slate-800">
                                        <h4 className="font-bold mb-4 text-white uppercase text-sm tracking-widest">Platform Fit</h4>
                                        <div className="grid grid-cols-4 gap-3 text-center text-xs">
                                            {Object.entries(result.platform_fit).map(([platform, score]) => (
                                                <div key={platform} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                                                    <span className="block font-black uppercase mb-1 text-slate-400">{platform}</span>
                                                    <span className={`text-sm font-black ${(score as number) > 7 ? 'text-emerald-400' : 'text-slate-400'}`}>
                                                        {score as number}/10
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
