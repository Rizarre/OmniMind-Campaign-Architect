'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockInsights } from '@/lib/mock-data';
import { TrendingUp, Calendar, DollarSign, Search } from 'lucide-react';

export default function Insights() {
    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">Market Insights</h1>
            <p className="text-muted-foreground mb-8">
                Real-time data and trends to inform your media strategy
            </p>

            <div className="grid gap-6">
                {/* Local Events */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Upcoming Local Events
                    </h3>
                    <div className="space-y-3">
                        {mockInsights.localEvents.map((event, idx) => (
                            <div
                                key={idx}
                                className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-white border border-blue-100"
                            >
                                <p className="font-medium">{event}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                            💡 <strong>Recommendation:</strong> Consider geo-fencing these events to capture high-intent local traffic
                        </p>
                    </div>
                </Card>

                {/* Trending Searches */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Search className="h-5 w-5 text-purple-600" />
                        Trending Search Terms
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {mockInsights.trendingSearches.map((search, idx) => (
                            <Badge
                                key={idx}
                                className="px-4 py-2 text-sm bg-purple-100 text-purple-800 hover:bg-purple-200"
                            >
                                <TrendingUp className="h-3 w-3 mr-1 inline" />
                                {search}
                            </Badge>
                        ))}
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-purple-800">
                            💡 <strong>Recommendation:</strong> Shifted 8% more budget to mobile video due to rising "near me" search demand
                        </p>
                    </div>
                </Card>

                {/* CPM Estimates */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Average CPM Rates
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-white border border-green-200">
                            <div className="text-sm font-semibold text-muted-foreground mb-1">Video</div>
                            <div className="text-3xl font-bold text-green-600">${mockInsights.avgCPM.video}</div>
                            <div className="text-xs text-muted-foreground mt-1">per 1,000 impressions</div>
                        </div>
                        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-white border border-green-200">
                            <div className="text-sm font-semibold text-muted-foreground mb-1">Display</div>
                            <div className="text-3xl font-bold text-green-600">${mockInsights.avgCPM.display}</div>
                            <div className="text-xs text-muted-foreground mt-1">per 1,000 impressions</div>
                        </div>
                        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-white border border-green-200">
                            <div className="text-sm font-semibold text-muted-foreground mb-1">Native</div>
                            <div className="text-3xl font-bold text-green-600">${mockInsights.avgCPM.native}</div>
                            <div className="text-xs text-muted-foreground mt-1">per 1,000 impressions</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
