'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Brain,
    FlaskConical,
    Users,
    DollarSign,
    Target,
    TrendingUp,
    Download,
    Activity,
    Zap, // Added
    Sparkles // Added
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const navigation = [
    { name: 'Campaign Builder', href: '/', icon: Brain },
    { name: 'Campaign Brain', href: '/campaign-brief', icon: Zap }, // New
    { name: 'Creative Testing', href: '/creative-testing', icon: Sparkles }, // New
    { name: 'Targeting Tactics', href: '/targeting-tactics', icon: Target },
    { name: 'Audience Segments', href: '/audience-segments', icon: Users },
    { name: 'Ad Formats', href: '/ad-formats', icon: FlaskConical },
    { name: 'Budget Studio', href: '/budget-studio', icon: DollarSign },
    { name: 'Insights', href: '/insights', icon: TrendingUp },
    { name: 'Export Center', href: '/export-center', icon: Download },
];

export function Sidebar() {
    const pathname = usePathname();
    const { currentPlan, campaignInput } = useAppStore();

    return (
        <div className="flex h-screen w-64 flex-col border-r border-slate-800 bg-[#151725] text-slate-300">
            {/* Header */}
            <div className="border-b border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/20">
                        <img
                            src="/omnimind-logo.png"
                            alt="OmniMind Logo"
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        OmniMind
                    </h1>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Co-Pilot Engine</p>
            </div>

            {/* Campaign Summary */}
            {currentPlan && (
                <div className="border-b border-slate-800 p-4 bg-slate-900/30">
                    <div className="text-xs font-semibold text-slate-500 mb-2 tracking-wider">ACTIVE CAMPAIGN</div>
                    <div className="space-y-1">
                        {campaignInput?.objective && (
                            <div className="text-sm flex justify-between">
                                <span className="font-medium text-slate-400">Objective:</span>
                                <span className="capitalize text-slate-200">{campaignInput.objective}</span>
                            </div>
                        )}
                        {currentPlan.totalBudget && (
                            <div className="text-sm flex justify-between">
                                <span className="font-medium text-slate-400">Budget:</span>
                                <span className="text-green-400 font-semibold">
                                    ${currentPlan.totalBudget.toLocaleString()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                                'hover:bg-slate-800 hover:text-white',
                                isActive
                                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 shadow-sm border border-blue-500/20'
                                    : 'text-slate-400'
                            )}
                        >
                            <item.icon className={cn('h-5 w-5', isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300')} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-800 p-4">
                <div className="text-xs text-slate-600 text-center">
                    Powered by AI
                </div>
            </div>
        </div>
    );
}
