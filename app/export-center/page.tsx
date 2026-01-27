'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { Download, FileJson, FileText, FileImage, Sparkles, ShieldCheck, Share2 } from 'lucide-react';
import { exportAsJSON, downloadMarkdown, exportAsPDF } from '@/lib/export-utils';

export default function ExportCenter() {
    const { currentPlan, campaignInput } = useAppStore();

    const campaignName = campaignInput?.prompt?.slice(0, 50) || 'Campaign';

    const handleExportJSON = () => {
        if (currentPlan) {
            exportAsJSON(currentPlan, 'media-plan.json');
        }
    };

    const handleExportMarkdown = () => {
        if (currentPlan) {
            downloadMarkdown(currentPlan, campaignName);
        }
    };

    const handleExportPDF = () => {
        if (currentPlan) {
            exportAsPDF(currentPlan, campaignName);
        }
    };

    if (!currentPlan) {
        return (
            <div className="container mx-auto p-12 max-w-4xl min-h-[80vh] flex items-center justify-center">
                <Card className="p-16 bg-[#151725] border-slate-800 border-dashed border-2 rounded-[3rem] relative overflow-hidden group text-center max-w-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-[80px] rounded-full pointer-events-none" />
                    <Download className="h-20 w-20 mx-auto mb-8 text-slate-700 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white mb-4">Export Pipeline Clear</h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        Generate your media plan first to unlock high-fidelity exports for DSPs, clients, and internal documentation.
                    </p>
                    <Button
                        className="mt-10 h-12 px-8 bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20"
                        onClick={() => window.location.href = '/'}
                    >
                        Create Your First Plan
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F111A] text-slate-200">
            <div className="container mx-auto p-8 max-w-4xl space-y-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                            <span className="text-[10px] font-black text-green-400 uppercase tracking-[0.2em]">Ready for Deployment</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent inline-block">
                        Export Center
                    </h1>
                    <p className="text-slate-500 text-lg font-light">
                        Download your media plan in various high-fidelity formats.
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* JSON Export */}
                    <Card className="p-8 bg-[#151725] border-slate-800 shadow-2xl rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors" />
                        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                            <div className="flex gap-6">
                                <div className="p-5 bg-[#0F111A] rounded-2xl border border-slate-800">
                                    <FileJson className="h-8 w-8 text-blue-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">DSP-Ready JSON</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                        Export structured data for programmatic platforms like The Trade Desk, DV360, or Amazon DSP.
                                    </p>
                                </div>
                            </div>
                            <Button onClick={handleExportJSON} className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 gap-2 font-bold w-full md:w-auto">
                                <Download className="h-4 w-4" />
                                DOWNLOAD JSON
                            </Button>
                        </div>
                    </Card>

                    {/* Markdown Export */}
                    <Card className="p-8 bg-[#151725] border-slate-800 shadow-2xl rounded-[2rem] relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-600/10 transition-colors" />
                        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                            <div className="flex gap-6">
                                <div className="p-5 bg-[#0F111A] rounded-2xl border border-slate-800">
                                    <FileText className="h-8 w-8 text-purple-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">Media Plan Document</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                        A comprehensive markdown file perfect for Notion, Obsidian, or internal team documentation.
                                    </p>
                                </div>
                            </div>
                            <Button onClick={handleExportMarkdown} className="h-14 px-8 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-500/20 gap-2 font-bold w-full md:w-auto">
                                <Download className="h-4 w-4" />
                                DOWNLOAD .MD
                            </Button>
                        </div>
                    </Card>

                    {/* PDF Export */}
                    <Card className="p-8 bg-[#151725] border-slate-800 shadow-2xl rounded-[2rem] relative overflow-hidden group hover:border-green-500/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-green-600/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-green-600/10 transition-colors" />
                        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                            <div className="flex gap-6">
                                <div className="p-5 bg-[#0F111A] rounded-2xl border border-slate-800">
                                    <FileImage className="h-8 w-8 text-green-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">Executive PDF Portfolio</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                        A visual presentation-ready PDF for client reviews, stakeholder sign-offs, and final approval.
                                    </p>
                                </div>
                            </div>
                            <Button onClick={handleExportPDF} className="h-14 px-8 bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20 gap-2 font-bold w-full md:w-auto">
                                <Download className="h-4 w-4" />
                                DOWNLOAD .PDF
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
