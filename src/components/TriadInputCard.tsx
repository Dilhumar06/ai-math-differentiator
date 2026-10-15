import React, { useState } from 'react';
import { Sparkles, Wand2, Lightbulb, AlertCircle, HelpCircle } from 'lucide-react';

interface TriadInputCardProps {
  onDifferentiate: (problem: string) => Promise<void>;
  isDifferentiating: boolean;
  errorMessage: string | null;
  onClearError: () => void;
}

export const TriadInputCard: React.FC<TriadInputCardProps> = ({
  onDifferentiate,
  isDifferentiating,
  errorMessage,
  onClearError,
}) => {
  const [problemText, setProblemText] = useState<string>('-3x + 10 = 25');

  const presets = [
    { label: '-3x + 10 = 25', text: '-3x + 10 = 25', desc: 'Sample with negative coefficient (x = -5)' },
    { label: '2x + 6 = 18', text: '2x + 6 = 18', desc: 'Positive integers (x = 6)' },
    { label: '4x - 12 = 20', text: '4x - 12 = 20', desc: 'Negative constant (x = 8)' },
    { label: '-5x + 15 = 40', text: '-5x + 15 = 40', desc: 'Negative coefficient (x = -5)' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim() || isDifferentiating) return;
    onDifferentiate(problemText.trim());
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-lg mb-8 relative overflow-hidden">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600"></div>

      <div className="mb-4">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
            1 Problem → 3 Differentiated Levels
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Educational Technology &amp; AI Framework
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Enter Your Own Math Problem
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Enter a two-step linear equation or algebraic word problem below. The AI will analyze the underlying mathematical concept and generate <strong>three simultaneous versions</strong> adapted for <em>Basic</em>, <em>Intermediate</em>, and <em>Advanced</em> tiers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            id="user-math-problem-input"
            rows={3}
            value={problemText}
            onChange={(e) => {
              setProblemText(e.target.value);
              if (errorMessage) onClearError();
            }}
            placeholder="Type any two-step linear equation (e.g., 3x + 15 = 45, 2(x - 5) = 14) or an algebraic word problem..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition resize-none shadow-2xs leading-relaxed"
            disabled={isDifferentiating}
          />
        </div>

        {/* Example Presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Try an example problem:
          </span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setProblemText(preset.text);
                if (errorMessage) onClearError();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/80 transition cursor-pointer text-xs font-mono"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block font-semibold">Differentiation Alert:</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Action Button: Differentiate into 3 Levels */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Supported domain: Two-step linear equations ($ax + b = c$, parentheses, and contextual modeling).</span>
          </div>

          <button
            type="submit"
            disabled={isDifferentiating || !problemText.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className={`w-4 h-4 ${isDifferentiating ? 'animate-spin' : ''}`} />
            <span>
              {isDifferentiating
                ? 'AI Generating 3 Adapted Levels...'
                : 'Differentiate into 3 Levels'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
