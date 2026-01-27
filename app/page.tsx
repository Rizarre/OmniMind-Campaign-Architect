'use client';

import { CampaignInput } from '@/components/campaign-input';
import { MediaPlanOutput } from '@/components/media-plan-output';
import { useAppStore } from '@/lib/store';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const { error } = useAppStore();

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Welcome to OmniMind Campaign Architect
        </h1>
        <p className="text-lg text-muted-foreground">
          Transform your business goals into executable programmatic advertising blueprints
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CampaignInput />
        </div>
        <div className="lg:col-span-2">
          <MediaPlanOutput />
        </div>
      </div>
    </div>
  );
}
