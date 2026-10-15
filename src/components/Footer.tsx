import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/70 py-8 text-center text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p className="font-semibold text-slate-800 tracking-tight text-sm">
          Educational Technology &amp; AI | AI-Powered Differentiated Learning
        </p>
        <p className="text-slate-500 max-w-md mx-auto text-xs leading-relaxed">
          Designed for personalized middle and high school algebraic equation mastery with adaptive scaffolding and cognitive load optimization.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            Full-Stack Backend Proxy
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            Gemini 3.8 Flash SDK Integration
          </span>
        </div>
      </div>
    </footer>
  );
};
