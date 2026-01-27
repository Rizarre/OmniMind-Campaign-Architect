'use client';

import { Card } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export default function BudgetStudio() {
    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">Budget Studio</h1>
            <p className="text-muted-foreground mb-8">
                Fine-tune budget allocation across channels and funnel stages
            </p>

            <Card className="p-12 bg-white/60 backdrop-blur-sm border-dashed border-2">
                <div className="text-center text-muted-foreground">
                    <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">Budget Studio Coming Soon</p>
                    <p className="text-sm mt-2">Advanced budget allocation and efficiency scoring</p>
                </div>
            </Card>
        </div>
    );
}
