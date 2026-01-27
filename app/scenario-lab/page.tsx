'use client';

import { Card } from '@/components/ui/card';
import { FlaskConical } from 'lucide-react';

export default function ScenarioLab() {
    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">Scenario Lab</h1>
            <p className="text-muted-foreground mb-8">
                Compare alternate campaign strategies side-by-side
            </p>

            <Card className="p-12 bg-white/60 backdrop-blur-sm border-dashed border-2">
                <div className="text-center text-muted-foreground">
                    <FlaskConical className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">Scenario Lab Coming Soon</p>
                    <p className="text-sm mt-2">Save and compare multiple campaign variations</p>
                </div>
            </Card>
        </div>
    );
}
