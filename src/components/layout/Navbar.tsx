'use client';

import React from 'react';
import { 
  Home, MessageSquare, Mic, BookOpen, Layers, 
  Activity, ScrollText, Binary, TrendingUp, Settings 
} from 'lucide-react';

export type NavTab = 
  | 'home' 
  | 'chat' 
  | 'live_voice' 
  | 'curriculum' 
  | 'review' 
  | 'pronunciation' 
  | 'library' 
  | 'grammar' 
  | 'progress' 
  | 'settings';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  reviewCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  reviewCount,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'गृहम् (Home)', icon: <Home className="w-4 h-4" /> },
    { id: 'chat', label: 'सम्भाषणम् (Chat)', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'live_voice', label: 'ध्वनिः (Live Voice)', icon: <Mic className="w-4 h-4" /> },
    { id: 'curriculum', label: 'मार्गः (Path)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'review', label: 'समीक्षा (Review)', icon: <Layers className="w-4 h-4" />, badge: reviewCount },
    { id: 'pronunciation', label: 'उच्चारणम् (Pronounce)', icon: <Activity className="w-4 h-4" /> },
    { id: 'library', label: 'पुस्तकालयः (Library)', icon: <ScrollText className="w-4 h-4" /> },
    { id: 'grammar', label: 'व्याकरणम् (Grammar)', icon: <Binary className="w-4 h-4" /> },
    { id: 'progress', label: 'प्रगतिः (Progress)', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'settings', label: 'विन्यासाः (Settings)', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="border-b border-stone-800 bg-stone-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Brand / Logo */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-stone-950 font-serif font-bold text-lg shadow-md group-hover:scale-105 transition">
            ॐ
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-stone-100 text-base tracking-wide">
                संस्कृत-गुरुः
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-sm bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Sarvam AI
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-sans tracking-wide">
              Voice-First Conversational Tutor
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition relative whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-amber-600 text-stone-950 font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Horizontal Scrollable Tab Bar */}
      <div className="lg:hidden flex items-center gap-1.5 px-3 py-2 border-t border-stone-800/80 overflow-x-auto scrollbar-none bg-stone-950/70">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold shrink-0 transition whitespace-nowrap ${
              activeTab === item.id
                ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                : 'text-stone-400 bg-stone-900/60 border border-stone-800 hover:text-stone-200'
            }`}
          >
            {item.icon}
            <span>{item.label.split(' ')[0]}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-0.5 px-1 py-0.2 text-[9px] rounded-full bg-stone-950 text-amber-400 font-bold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
};
