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
    Download
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const navigation = [
    { name: 'Campaign Builder', href: '/', icon: Brain },
    { name: 'Scenario Lab', href: '/scenario-lab', icon: FlaskConical },
    { name: 'Audience Explorer', href: '/audience-explorer', icon: Users },
    { name: 'Budget Studio', href: '/budget-studio', icon: DollarSign },
    { name: 'Tactics Board', href: '/tactics-board', icon: Target },
    { name: 'Insights', href: '/insights', icon: TrendingUp },
    { name: 'Export Center', href: '/export-center', icon: Download },
];

export function Sidebar() {
    const pathname = usePathname();
    const { currentPlan, campaignInput } = useAppStore();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
            {/* Header */}
            <div className="border-b p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    OmniMind
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Campaign Architect</p>
            </div>

            {/* Campaign Summary */}
            {currentPlan && (
                <div className="border-b p-4 bg-white/50 dark:bg-slate-800/50">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">ACTIVE CAMPAIGN</div>
                    <div className="space-y-1">
                        {campaignInput?.objective && (
                            <div className="text-sm">
                                <span className="font-medium">Objective:</span>{' '}
                                <span className="capitalize">{campaignInput.objective}</span>
                            </div>
                        )}
                        {currentPlan.totalBudget && (
                            <div className="text-sm">
                                <span className="font-medium">Budget:</span>{' '}
                                <span className="text-green-600 dark:text-green-400 font-semibold">
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
                                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                                'hover:bg-white/80 dark:hover:bg-slate-800/80',
                                isActive
                                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-100 dark:ring-blue-900'
                                    : 'text-slate-700 dark:text-slate-300'
                            )}
                        >
                            <item.icon className={cn('h-5 w-5', isActive && 'text-blue-600 dark:text-blue-400')} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t p-4">
                <div className="text-xs text-muted-foreground text-center">
                    Powered by AI
                </div>
            </div>
        </div>
    );
}
