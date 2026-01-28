'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { Bot, X, Sparkles, Send, BrainCircuit, BarChart3, Target, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export function StrategicAssistant() {
    const pathname = usePathname();
    const { currentPlan, campaignInput } = useAppStore();
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "System online. I'm your Neural Strategic Copilot. How can I optimize your architectural intent today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: content.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/strategic-copilot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                    context: {
                        currentPlan,
                        campaignInput,
                        currentPage: pathname
                    }
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = '';

            const assistantMessage: Message = {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content: ''
            };

            setMessages(prev => [...prev, assistantMessage]);

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    assistantContent += decoder.decode(value);
                    setMessages(prev =>
                        prev.map(m =>
                            m.id === assistantMessage.id
                                ? { ...m, content: assistantContent }
                                : m
                        )
                    );
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: 'I encountered an issue processing your request. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, currentPlan, campaignInput, pathname, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleQuickAction = (action: string) => {
        sendMessage(action);
    };

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9, rotate: 2 }}
                        className="pointer-events-auto"
                    >
                        <Card className="w-80 md:w-[420px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-white/10 overflow-hidden bg-slate-950/90 backdrop-blur-2xl rounded-[2rem]">
                            {/* Header */}
                            <div className="p-5 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border-b border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <BrainCircuit className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <span className="font-black text-white text-sm tracking-widest uppercase block">Neural Copilot</span>
                                        <div className="flex items-center gap-1.5 font-bold">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] text-emerald-500/80 uppercase tracking-tighter">Analyzing Strategy</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-400 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Chat Area */}
                            <div
                                ref={scrollRef}
                                className="p-6 h-[450px] overflow-y-auto space-y-6 scrollbar-hide"
                            >
                                {messages.map((msg) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={msg.id}
                                        className={cn(
                                            "flex gap-4",
                                            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                        )}
                                    >
                                        <div className={cn(
                                            "h-8 w-8 rounded-xl flex items-center justify-center shrink-0 border",
                                            msg.role === 'assistant'
                                                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                                : "bg-slate-800 border-white/10 text-slate-400"
                                        )}>
                                            {msg.role === 'assistant' ? <Sparkles className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                                        </div>
                                        <div className={cn(
                                            "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg",
                                            msg.role === 'assistant'
                                                ? "bg-white/5 border border-white/5 text-slate-200 rounded-tl-none"
                                                : "bg-blue-600 text-white rounded-tr-none font-medium"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                    <div className="flex gap-4">
                                        <div className="h-8 w-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                            <Bot className="h-4 w-4 text-blue-400 animate-pulse" />
                                        </div>
                                        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                            <div className="w-1 h-1 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0s' }} />
                                            <div className="w-1 h-1 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            <div className="w-1 h-1 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Actions */}
                            {!isLoading && messages.length < 5 && (
                                <div className="px-6 pb-2 flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleQuickAction("Analyze ROI potential")}
                                        className="text-[10px] bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full transition-all flex items-center gap-2"
                                    >
                                        <BarChart3 className="h-3 w-3" />
                                        Analyze ROI
                                    </button>
                                    <button
                                        onClick={() => handleQuickAction("Optimize funnel weights")}
                                        className="text-[10px] bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 px-3 py-1.5 rounded-full transition-all flex items-center gap-2"
                                    >
                                        <Sparkles className="h-3 w-3" />
                                        Optimize Funnel
                                    </button>
                                    <button
                                        onClick={() => handleQuickAction("Targeting advice")}
                                        className="text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-400/20 px-3 py-1.5 rounded-full transition-all flex items-center gap-2"
                                    >
                                        <Target className="h-3 w-3" />
                                        Targeting Tips
                                    </button>
                                </div>
                            )}

                            {/* Input container */}
                            <form
                                onSubmit={handleSubmit}
                                className="p-6 pt-4 border-t border-white/5"
                            >
                                <div className="flex gap-2 bg-black/40 border border-white/10 p-2 rounded-2xl group-focus-within:border-blue-500/40 transition-all">
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Command Neural Intelligence..."
                                        className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm px-3 py-1"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={isLoading || !input.trim()}
                                        className="h-8 w-8 bg-blue-600 hover:bg-blue-500 rounded-xl"
                                    >
                                        {isLoading ? <Loader2 className="h-4 w-4 text-white animate-spin" /> : <Send className="h-4 w-4 text-white" />}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <div className="pointer-events-auto relative">
                <Button
                    size="icon"
                    className={cn(
                        "h-16 w-16 rounded-[1.5rem] shadow-2xl transition-all duration-500 group relative overflow-hidden",
                        isOpen
                            ? "bg-slate-800 text-slate-400 hover:rotate-90"
                            : "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 hover:scale-110 active:scale-95 border border-white/20 shadow-blue-500/20"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {isOpen ? (
                        <X className="h-7 w-7" />
                    ) : (
                        <div className="relative">
                            <BrainCircuit className="h-8 w-8 text-white relative z-10" />
                            <div className="absolute inset-0 bg-white blur-[15px] scale-150 opacity-20 animate-pulse" />
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
}
