// Utility functions for exporting media plans

import { MediaPlan } from './types';
import jsPDF from 'jspdf';

export function exportAsJSON(plan: MediaPlan, filename: string = 'media-plan.json') {
    const dataStr = JSON.stringify(plan, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}

export function exportAsMarkdown(plan: MediaPlan, campaignName: string = 'Campaign'): string {
    let markdown = `# ${campaignName} - Media Plan\n\n`;

    markdown += `## Campaign Overview\n\n`;
    markdown += `**Total Budget:** $${plan.totalBudget?.toLocaleString() || 'N/A'}\n\n`;

    markdown += `## Funnel Strategy\n\n`;
    plan.funnel.forEach(stage => {
        markdown += `### ${stage.stage}\n`;
        markdown += `- **KPIs:** ${stage.kpis.join(', ')}\n`;
        markdown += `- **Budget:** $${stage.budget_amount?.toLocaleString() || 'N/A'} (${stage.budget_pct}%)\n\n`;
    });

    markdown += `## Audience Segments\n\n`;
    plan.audiences.forEach((audience, idx) => {
        markdown += `### ${idx + 1}. ${audience.name}\n`;
        markdown += `- **Targeting:** ${audience.targeting.join(', ')}\n`;
        if (audience.description) {
            markdown += `- **Why:** ${audience.description}\n`;
        }
        markdown += `\n`;
    });

    markdown += `## Ad Formats by Funnel Stage\n\n`;
    Object.entries(plan.formats).forEach(([stage, formats]) => {
        markdown += `- **${stage}:** ${formats.join(', ')}\n`;
    });

    markdown += `\n## Targeting Tactics\n\n`;
    plan.tactics.forEach(tactic => {
        markdown += `- ${tactic}\n`;
    });

    markdown += `\n## Budget Allocation\n\n`;
    Object.entries(plan.budget_split).forEach(([stage, amount]) => {
        markdown += `- **${stage}:** $${amount.toLocaleString()}\n`;
    });

    return markdown;
}

export function downloadMarkdown(plan: MediaPlan, campaignName: string = 'Campaign') {
    const markdown = exportAsMarkdown(plan, campaignName);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${campaignName.toLowerCase().replace(/\s+/g, '-')}-media-plan.md`;
    link.click();

    URL.revokeObjectURL(url);
}

export function exportAsPDF(plan: MediaPlan, campaignName: string = 'Campaign') {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.text(`${campaignName} - Media Plan`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Budget
    doc.setFontSize(12);
    doc.text(`Total Budget: $${plan.totalBudget?.toLocaleString() || 'N/A'}`, 20, yPos);
    yPos += 15;

    // Funnel Strategy
    doc.setFontSize(16);
    doc.text('Funnel Strategy', 20, yPos);
    yPos += 10;

    doc.setFontSize(11);
    plan.funnel.forEach(stage => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${stage.stage}`, 20, yPos);
        doc.setFont('helvetica', 'normal');
        yPos += 6;
        doc.text(`KPIs: ${stage.kpis.join(', ')}`, 25, yPos);
        yPos += 6;
        doc.text(`Budget: $${stage.budget_amount?.toLocaleString() || 'N/A'} (${stage.budget_pct}%)`, 25, yPos);
        yPos += 10;
    });

    // Audiences
    yPos += 5;
    doc.setFontSize(16);
    doc.text('Audience Segments', 20, yPos);
    yPos += 10;

    doc.setFontSize(11);
    plan.audiences.forEach((audience, idx) => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFont('helvetica', 'bold');
        doc.text(`${idx + 1}. ${audience.name}`, 20, yPos);
        doc.setFont('helvetica', 'normal');
        yPos += 6;
        doc.text(`Targeting: ${audience.targeting.join(', ')}`, 25, yPos);
        yPos += 10;
    });

    // Ad Formats
    yPos += 5;
    doc.setFontSize(16);
    doc.text('Ad Formats', 20, yPos);
    yPos += 10;

    doc.setFontSize(11);
    Object.entries(plan.formats).forEach(([stage, formats]) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(`${stage}: ${formats.join(', ')}`, 20, yPos);
        yPos += 7;
    });

    // Tactics
    yPos += 5;
    doc.setFontSize(16);
    doc.text('Targeting Tactics', 20, yPos);
    yPos += 10;

    doc.setFontSize(11);
    plan.tactics.forEach(tactic => {
        doc.text(`• ${tactic}`, 20, yPos);
        yPos += 7;
    });

    doc.save(`${campaignName.toLowerCase().replace(/\s+/g, '-')}-media-plan.pdf`);
}
