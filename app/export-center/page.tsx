'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { Download, FileJson, FileText, FileImage } from 'lucide-react';
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
            <div className="container mx-auto p-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Export Center</h1>
                <Card className="p-12 bg-white/60 backdrop-blur-sm border-dashed border-2">
                    <div className="text-center text-muted-foreground">
                        <Download className="h-16 w-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No media plan to export</p>
                        <p className="text-sm mt-2">Generate a media plan first to export it</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">Export Center</h1>
            <p className="text-muted-foreground mb-8">
                Download your media plan in various formats
            </p>

            <div className="grid gap-6">
                {/* JSON Export */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileJson className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">DSP-Ready JSON</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Export as structured JSON for direct import into demand-side platforms
                                </p>
                                <Button onClick={handleExportJSON} className="bg-blue-600 hover:bg-blue-700">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export JSON
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Markdown Export */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <FileText className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Media Plan Document</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Export as Markdown for documentation and team collaboration
                                </p>
                                <Button onClick={handleExportMarkdown} className="bg-purple-600 hover:bg-purple-700">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Markdown
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* PDF Export */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <FileImage className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">PDF Presentation</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Export as PDF for client presentations and stakeholder reviews
                                </p>
                                <Button onClick={handleExportPDF} className="bg-green-600 hover:bg-green-700">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
