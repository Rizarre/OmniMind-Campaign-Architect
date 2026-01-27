'use client';

import { Card } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { Users, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AudienceExplorer() {
    const { currentPlan } = useAppStore();

    if (!currentPlan) {
        return (
            <div className="container mx-auto p-8 max-w-6xl">
                <h1 className="text-3xl font-bold mb-6">Audience Explorer</h1>
                <Card className="p-12 bg-white/60 backdrop-blur-sm border-dashed border-2">
                    <div className="text-center text-muted-foreground">
                        <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No audience segments to explore</p>
                        <p className="text-sm mt-2">Generate a media plan first to explore audience segments</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">Audience Explorer</h1>
            <p className="text-muted-foreground mb-8">
                Deep dive into your audience segments and targeting strategy
            </p>

            <div className="grid gap-6">
                {currentPlan.audiences.map((audience, idx) => (
                    <Card key={idx} className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2">{audience.name}</h3>

                                {audience.description && (
                                    <p className="text-muted-foreground mb-4">{audience.description}</p>
                                )}

                                <div className="mb-4">
                                    <div className="text-sm font-semibold text-muted-foreground mb-2">Targeting Criteria</div>
                                    <div className="flex flex-wrap gap-2">
                                        {audience.targeting.map((target, i) => (
                                            <Badge key={i} className="px-3 py-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
                                                <Target className="h-3 w-3 mr-1 inline" />
                                                {target}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {audience.estimatedReach && (
                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-200">
                                        <div className="text-sm font-semibold text-muted-foreground mb-1">Estimated Reach</div>
                                        <div className="text-2xl font-bold text-purple-600">
                                            {audience.estimatedReach.toLocaleString()} users
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
