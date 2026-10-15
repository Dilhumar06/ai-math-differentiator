import React from 'react';
import { GraduationCap, Brain, BookOpen, Layers, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenPedagogy: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPedagogy, onOpenGuide }) => {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  AI Math Differentiator
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  EdTech & AI
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Personalized Math Learning with AI
              </p>
            </div>
          </div>

          {/* Quick Academic Actions */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={onOpenPedagogy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100/80 hover:bg-slate-200/70 rounded-xl transition cursor-pointer border border-slate-200"
              title="Pedagogical Design & Assignment Methodology"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Pedagogical Framework</span>
            </button>

            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100/80 hover:bg-slate-200/70 rounded-xl transition cursor-pointer border border-slate-200"
              title="How this application implements differentiation"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Deployment & Guide</span>
            </button>
          </div>
        </div>

        {/* Brief Introduction */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <p>
            Welcome to personalized equation mastery. Practice two-step linear equations adapted to your readiness:
            from high-scaffolding fundamentals to multi-step real-world modeling.
          </p>
        </div>
      </div>
    </header>
  );
};
