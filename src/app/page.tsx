'use client';

import React, { useState } from 'react';
import { ClaudeStyleChat } from '@/components/chat/ClaudeStyleChat';
import { VoiceOrbView } from '@/components/voice/VoiceOrbView';
import { LandingPage } from '@/components/landing/LandingPage';

type ViewMode = 'chat' | 'voice' | 'landing';

export default function SanskritTutorApp() {
  const [view, setView] = useState<ViewMode>('chat');

  return (
    <div className="min-h-screen bg-[#141413] text-[#ecebe8] flex flex-col font-sans selection:bg-[#d97757]/30 selection:text-white">
      {/* 1. Main Professional Claude-Style AI Chat Workspace */}
      {view === 'chat' && (
        <ClaudeStyleChat
          onOpenVoiceRoom={() => setView('voice')}
        />
      )}

      {/* 2. Full-Screen Live Voice Room with Animated Orb */}
      {view === 'voice' && (
        <VoiceOrbView
          onBackToChat={() => setView('chat')}
        />
      )}

      {/* 3. Optional Startup Landing Page */}
      {view === 'landing' && (
        <LandingPage
          onLaunchChat={() => setView('chat')}
          onLaunchVoice={() => setView('voice')}
        />
      )}
    </div>
  );
}
