'use client';

import { CampaignInput } from '@/components/campaign-input';
import { MediaPlanOutput } from '@/components/media-plan-output';
import { useAppStore } from '@/lib/store';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { error, currentPlan, isPresentationMode } = useAppStore();

  return (
    <div className={cn(
      "container mx-auto p-8 max-w-7xl transition-all duration-700 ease-in-out relative",
      isPresentationMode ? "scale-[1.01] bg-white/[0.01] rounded-[4rem] shadow-[0_0_120px_rgba(59,130,246,0.1)] py-20" : ""
    )}>
      {/* Presentation Mode Decorative Elements */}
      <AnimatePresence mode="wait">
        {isPresentationMode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-8 right-12 z-50 flex items-center gap-4 pointer-events-none"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-1">Presentation Active</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          y: isPresentationMode ? 0 : 0,
          opacity: 1
        }}
        className={cn("mb-16 transition-all duration-700 ease-in-out", isPresentationMode ? "text-center flex flex-col items-center" : "")}
      >
        <div className={cn("flex items-center gap-6 mb-6", isPresentationMode ? "flex-col" : "flex-row")}>
          <motion.div
            layoutId="logo-container"
            className={cn(
              "relative rounded-3xl overflow-hidden shadow-2xl border transition-all duration-700 shrink-0",
              isPresentationMode ? "w-32 h-32 border-blue-500/50 shadow-blue-500/40 scale-110 mb-6" : "w-16 h-16 border-blue-500/20 shadow-blue-500/20"
            )}
          >
            <img
              src="/omnimind-logo.png"
              alt="OmniMind Logo"
              className="object-cover"
            />
          </motion.div>
          <motion.h1
            layoutId="title"
            className={cn(
              "font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight py-2 transition-all duration-700 ease-in-out",
              isPresentationMode ? "text-8xl mb-4" : "text-5xl"
            )}
          >
            {isPresentationMode ? "Strategic Blueprint" : "OmniMind Campaign Architect"}
          </motion.h1>
        </div>
        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          className={cn(
            "text-slate-500 font-light max-w-2xl leading-relaxed transition-all duration-700 ease-in-out",
            isPresentationMode ? "text-2xl text-slate-300" : "text-xl"
          )}
        >
          {isPresentationMode
            ? "Unified executive summary of neural targeting and cross-funnel investment tiers."
            : "The industry's most advanced programmatic blueprint engine. Orchestrate precision-targeted campaigns with AI-driven strategy."
          }
        </motion.p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Alert variant="destructive" className="mb-8 border-red-500/20 bg-red-500/5 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="text-base font-medium">{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Dynamic Layout: Switch based on Presentation Mode and Plan Status */}
      <motion.div
        layout
        className={cn(
          "grid gap-12 items-start",
          isPresentationMode
            ? "grid-cols-1 max-w-5xl mx-auto"
            : (currentPlan ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1 lg:grid-cols-2")
        )}
      >
        {/* Campaign Input / Brief Reference */}
        <AnimatePresence mode="popLayout">
          {!isPresentationMode && (
            <motion.div
              layout
              key="campaign-input"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              className={cn(
                currentPlan ? "lg:col-span-4" : ""
              )}
            >
              <CampaignInput />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Media Plan Output / Results */}
        <motion.div
          layout
          key="media-plan-output"
          className={cn(
            isPresentationMode ? "w-full" : (currentPlan ? "lg:col-span-8" : "w-full")
          )}
        >
          <AnimatePresence mode="wait">
            {isPresentationMode && (
              <motion.div
                key="presentation-indicators"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-16 flex items-center justify-center gap-10 py-10 border-y border-white/5"
              >
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</span>
                  <span className="text-emerald-400 font-bold bg-emerald-400/10 px-5 py-2 rounded-full text-xs border border-emerald-400/20">Active Alignment</span>
                </div>
                <div className="w-px h-12 bg-white/5" />
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Intelligence</span>
                  <span className="text-blue-400 font-bold bg-blue-400/10 px-5 py-2 rounded-full text-xs border border-blue-500/20">Neural Engine v4.0</span>
                </div>
                <div className="w-px h-12 bg-white/5" />
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Validation</span>
                  <span className="text-purple-400 font-bold bg-purple-400/10 px-5 py-2 rounded-full text-xs border border-purple-400/20">Heuristic Verified</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <MediaPlanOutput />
        </motion.div>
      </motion.div>
    </div>
  );
}
