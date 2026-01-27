'use client';

import { useAppStore } from '@/lib/store';
import { Loader2, BrainCircuit, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function GlobalLoader() {
    const { isGenerating } = useAppStore();

    return (
        <AnimatePresence>
            {isGenerating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F111A]/80 backdrop-blur-sm"
                >
                    <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-[#1E202E] border border-blue-500/20 shadow-2xl relative overflow-hidden max-w-sm w-full text-center">
                        {/* Abstract Background Animation */}
                        <div className="absolute inset-0 z-0 opacity-30">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(59,130,246,0.5)_360deg)] animate-[spin_4s_linear_infinite]" />
                        </div>

                        <div className="relative z-10 bg-[#1E202E] p-1 rounded-full border border-blue-500/30 shadow-lg shadow-blue-500/20 w-16 h-16 overflow-hidden">
                            <img
                                src="/omnimind-logo.png"
                                alt="OmniMind Logo"
                                className="w-full h-full object-cover animate-pulse shadow-2xl"
                            />
                        </div>

                        <div className="space-y-2 relative z-10">
                            <h3 className="text-xl font-bold text-white tracking-wide">
                                Architecting Campaign
                            </h3>
                            <p className="text-sm text-slate-400">
                                Analyzing audience segments...
                            </p>
                        </div>

                        <div className="flex gap-1.5 relative z-10">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                className="w-2 h-2 rounded-full bg-blue-500"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                className="w-2 h-2 rounded-full bg-purple-500"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                className="w-2 h-2 rounded-full bg-pink-500"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
