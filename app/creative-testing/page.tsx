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
            <div className="mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Sparkles className="h-8 w-8 text-pink-500" />
                    Creative Testing Lab
                </h1>
                <p className="text-muted-foreground mt-2">
                    Pre-test your ad concepts with AI to predict performance and risks before production.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Column */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-bold mb-4">Concept Details</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Concept Name</Label>
                                    <Input
                                        placeholder="e.g. 'Hero Video - Emotional Hook'"
                                        value={conceptName}
                                        onChange={(e) => setConceptName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Target Audience</Label>
                                    <Input
                                        placeholder="e.g. Millennials, Parents"
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Visual Style</Label>
                                <Select value={visualStyle} onValueChange={setVisualStyle}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select style..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UGC / Authentic">UGC / Authentic</SelectItem>
                                        <SelectItem value="Cinematic / High Production">Cinematic / High Production</SelectItem>
                                        <SelectItem value="Animated / Motion Graphics">Animated / Motion Graphics</SelectItem>
                                        <SelectItem value="Minimalist / Text-Heavy">Minimalist / Text-Heavy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Tone</Label>
                                <Input
                                    placeholder="e.g. Humorous, Urgent, Inspiring"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Script / Creative Content</Label>
                                <Textarea
                                    className="min-h-[200px]"
                                    placeholder="Describe the video script, ad copy, or scene breakdown here..."
                                    value={script}
                                    onChange={(e) => setScript(e.target.value)}
                                />
                            </div>

                            <Button
                                className="w-full bg-pink-600 hover:bg-pink-700"
                                size="lg"
                                onClick={handleAnalyze}
                                disabled={loading || !script}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing Concept...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
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
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-12 border-2 border-dashed rounded-xl">
                            <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                            <p>Enter details to generate AI prediction</p>
                        </div>
                    )}

                    {result && (
                        <>
                            {/* Prediction Scores */}
                            <Card className="p-6 bg-slate-900 text-white border-slate-800">
                                <h2 className="text-xl font-bold mb-6 flex items-center">
                                    <TrendingUp className="h-5 w-5 mr-3 text-pink-500" />
                                    Performance Prediction
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">Engagement Potential</span>
                                            <span className="font-bold text-pink-400">{result.scores.engagement}/100</span>
                                        </div>
                                        <Progress value={result.scores.engagement} className="h-2 bg-slate-700" indicatorClassName="bg-pink-500" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">Persuasion Score</span>
                                            <span className="font-bold text-blue-400">{result.scores.persuasion}/100</span>
                                        </div>
                                        <Progress value={result.scores.persuasion} className="h-2 bg-slate-700" indicatorClassName="bg-blue-500" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">Risk Assessment (Backlash)</span>
                                            <span className="font-bold text-red-400">{result.scores.backlash_risk}/100</span>
                                        </div>
                                        <Progress value={result.scores.backlash_risk} className="h-2 bg-slate-700" indicatorClassName="bg-red-500" />
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-slate-800 rounded-lg">
                                    <p className="italic text-slate-300">"{result.prediction_summary}"</p>
                                </div>
                            </Card>

                            {/* Analysis Details */}
                            <Card className="p-6">
                                <h3 className="text-lg font-bold mb-4">Detailed Analysis</h3>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="flex items-center text-green-700 font-bold mb-2">
                                            <CheckCircle2 className="h-4 w-4 mr-2" /> Strengths
                                        </h4>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            {result.analysis.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="flex items-center text-amber-600 font-bold mb-2">
                                            <AlertTriangle className="h-4 w-4 mr-2" /> Needs Improvement
                                        </h4>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            {result.analysis.weaknesses.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <h4 className="font-bold mb-2">Platform Fit</h4>
                                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                            {Object.entries(result.platform_fit).map(([platform, score]) => (
                                                <div key={platform} className="p-2 bg-slate-50 rounded">
                                                    <span className="block font-semibold capitalize mb-1">{platform}</span>
                                                    <span className={`font-bold ${(score as number) > 7 ? 'text-green-600' : 'text-slate-500'}`}>
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
