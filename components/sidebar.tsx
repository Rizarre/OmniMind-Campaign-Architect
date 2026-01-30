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
    Zap,
    Sparkles,
    Monitor
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
    const {
        currentPlan,
        campaignInput,
        isPresentationMode,
        togglePresentationMode
    } = useAppStore();

    return (
        <div className="flex h-screen w-64 flex-col border-r border-white/5 bg-[#0F111A]/40 backdrop-blur-2xl text-slate-300 relative z-50">
            {/* Header */}
            <div className="border-b border-white/5 p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/30 border border-blue-500/30">
                        <img
                            src="/omnimind-logo.png"
                            alt="OmniMind Logo"
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-xl font-black bg-gradient-to-br from-white via-blue-200 to-blue-400 bg-clip-text text-transparent italic tracking-tight">
                        OmniMind
                    </h1>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-[0.3em] font-black opacity-90">Co-Pilot Engine</p>
            </div>

            {/* Campaign Summary */}
            {currentPlan && (
                <div className="border-b border-white/5 p-4 bg-white/5 backdrop-blur-md">
                    <div className="text-xs font-black text-slate-400 mb-3 tracking-[0.15em] uppercase">Active Command</div>
                    <div className="space-y-2">
                        {campaignInput?.objective && (
                            <div className="text-xs flex flex-col gap-0.5">
                                <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">Objective</span>
                                <span className="capitalize text-slate-200 font-bold">{campaignInput.objective}</span>
                            </div>
                        )}
                        {currentPlan.totalBudget && (
                            <div className="text-xs flex flex-col gap-0.5">
                                <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">Budget</span>
                                <span className="text-emerald-400 font-black text-sm">
                                    ${currentPlan.totalBudget.toLocaleString()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto custom-scrollbar">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-black transition-all duration-300 group relative overflow-hidden',
                                isActive
                                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                                />
                            )}
                            <item.icon className={cn('h-5 w-5 transition-colors duration-300', isActive ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-300')} />
                            <span className="tracking-wide uppercase">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-white/5 p-4 bg-black/20 space-y-4">
                <button
                    onClick={togglePresentationMode}
                    className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 group",
                        isPresentationMode
                            ? "bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10"
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Monitor className={cn("h-4 w-4", isPresentationMode ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                        <span className="text-xs font-black uppercase tracking-widest">Presentation</span>
                    </div>
                    <div className={cn(
                        "w-8 h-4 rounded-full relative transition-colors duration-300",
                        isPresentationMode ? "bg-blue-500" : "bg-slate-700"
                    )}>
                        <div className={cn(
                            "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300",
                            isPresentationMode ? "left-4.5" : "left-0.5"
                        )} />
                    </div>
                </button>

                <div className="text-xs font-black text-slate-400 text-center uppercase tracking-widest flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isPresentationMode ? "Deck Optimized" : "System Online"}
                </div>
            </div>
        </div>
    );
}
