'use client';

import { Card } from '@/components/ui/card';
import { Target } from 'lucide-react';

export default function TacticsBoard() {
    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">Tactics Board</h1>
            <p className="text-muted-foreground mb-8">
                Toggle and configure targeting tactics for your campaign
            </p>

            <Card className="p-12 bg-white/60 backdrop-blur-sm border-dashed border-2">
                <div className="text-center text-muted-foreground">
                    <Target className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">Tactics Board Coming Soon</p>
                    <p className="text-sm mt-2">Interactive targeting tactics configuration</p>
                </div>
            </Card>
        </div>
    );
}
