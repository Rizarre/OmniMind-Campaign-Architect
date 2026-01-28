'use client';

import { CampaignInput } from '@/components/campaign-input';
import { MediaPlanOutput } from '@/components/media-plan-output';
import { useAppStore } from '@/lib/store';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

import { motion } from 'framer-motion';

export default function Home() {
  const { error } = useAppStore();

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-6 mb-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/20 shrink-0">
            <img
              src="/omnimind-logo.png"
              alt="OmniMind Logo"
              className="object-cover"
            />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight py-2">
            OmniMind Campaign Architect
          </h1>
        </div>
        <p className="text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
          The industry's most advanced programmatic blueprint engine. Orchestrate precision-targeted campaigns with AI-driven strategy.
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <CampaignInput />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <MediaPlanOutput />
        </motion.div>
      </div>
    </div>
  );
}
