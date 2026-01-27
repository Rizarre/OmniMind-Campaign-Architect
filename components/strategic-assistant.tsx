'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { Bot, X, ChevronRight, Lightbulb, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function StrategicAssistant() {
    const pathname = usePathname();
    const { currentPlan } = useAppStore();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Context-aware suggestions based on current page and state
    useEffect(() => {
        let newMessages: any[] = [];

        if (pathname === '/') {
            if (!currentPlan) {
                newMessages = [
                    {
                        id: 'welcome',
                        type: 'info',
                        content: "Welcome to OmniMind! I'm your strategic copilot. Start by entering your campaign goal in the prompt box to generate a comprehensive media plan."
                    }
                ];
            } else {
                newMessages = [
                    {
                        id: 'plan-generated',
                        type: 'success',
                        content: "Great start! I've generated a strategic media plan based on your goal. You can refine it here or use the sidebar to explore specific aspects like Audiences or Budget."
                    },
                    {
                        id: 'check-budget',
                        type: 'action',
                        content: "Tip: Visit the Budget Studio to fine-tune your allocation across funnel stages.",
                        action: '/budget-studio',
                        actionLabel: 'Go to Budget Studio'
                    }
                ];
            }
        } else if (pathname === '/budget-studio') {
            newMessages = [
                {
                    id: 'budget-intro',
                    type: 'info',
                    content: "This is the Budget Studio. Here you can dynamically adjust your total investment and how it validates against your strategic goals."
                },
                {
                    id: 'budget-tip',
                    type: 'tip',
                    content: "Try moving the sliders! You'll see immediate updates to the estimated impressions and conversion metrics."
                }
            ];
        } else if (pathname === '/audience-explorer') {
            newMessages = [
                {
                    id: 'audience-intro',
                    type: 'info',
                    content: "Explore your target segments here. I've identified key personas that align with your campaign objectives."
                }
            ];
        }

        setMessages(newMessages);
        if (!isOpen) {
            setUnreadCount(newMessages.length);
        }
    }, [pathname, currentPlan, isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
        setUnreadCount(0);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="pointer-events-auto"
                    >
                        <Card className="w-80 md:w-96 shadow-2xl border-2 border-primary/10 overflow-hidden bg-white/95 backdrop-blur-md dark:bg-slate-900/95">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Bot className="h-5 w-5" />
                                    <span className="font-semibold">Strategic Copilot</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-white hover:bg-white/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-4 max-h-[400px] overflow-y-auto space-y-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                                        <div className={cn(
                                            "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                            msg.type === 'tip' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                                        )}>
                                            {msg.type === 'tip' ? <Lightbulb className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg rounded-tl-none text-sm shadow-sm border border-slate-100 dark:border-slate-700">
                                                {msg.content}
                                            </div>
                                            {msg.action && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-full justify-between group"
                                                    asChild
                                                >
                                                    <a href={msg.action}>
                                                        {msg.actionLabel}
                                                        <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {messages.length === 0 && (
                                    <div className="text-center text-muted-foreground py-8 text-sm">
                                        Thinking of new strategies...
                                    </div>
                                )}
                            </div>
                            <div className="p-3 border-t bg-slate-50 dark:bg-slate-900">
                                <input
                                    type="text"
                                    placeholder="Ask for advice..."
                                    className="w-full text-sm bg-transparent border-none focus:outline-none px-2"
                                    disabled
                                />
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pointer-events-auto relative">
                {unreadCount > 0 && !isOpen && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-bounce z-10 shadow-lg border-2 border-white dark:border-slate-950">
                        {unreadCount}
                    </span>
                )}
                <Button
                    size="icon"
                    className={cn(
                        "h-14 w-14 rounded-full shadow-xl transition-all duration-300",
                        isOpen
                            ? "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-400"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
                    )}
                    onClick={isOpen ? () => setIsOpen(false) : handleOpen}
                >
                    {isOpen ? <ChevronRight className="h-6 w-6 rotate-90" /> : <Bot className="h-8 w-8 text-white" />}
                </Button>
            </div>
        </div>
    );
}
