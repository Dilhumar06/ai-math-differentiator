import React, { useState } from 'react';
import { DifficultyLevel } from '../types/math';
import { Sparkles, Wand2, Lightbulb, AlertCircle, ArrowRight } from 'lucide-react';

interface CustomProblemInputProps {
  currentDifficulty: DifficultyLevel;
  onDifferentiate: (inputProblem: string) => Promise<void>;
  isDifferentiating: boolean;
  errorMessage: string | null;
  onClearError: () => void;
}

export const CustomProblemInput: React.FC<CustomProblemInputProps> = ({
  currentDifficulty,
  onDifferentiate,
  isDifferentiating,
  errorMessage,
  onClearError,
}) => {
  const [problemText, setProblemText] = useState<string>('3x + 7 = 22');

  const presets = [
    { label: '3x + 7 = 22', text: '3x + 7 = 22', desc: 'Classic two-step' },
    { label: '4(x - 3) = 24', text: '4(x - 3) = 24', desc: 'Parentheses' },
    { label: '-5x + 12 = -18', text: '-5x + 12 = -18', desc: 'Negative numbers' },
    {
      label: 'Taxi fare problem',
      text: 'A taxi charges a $5.00 pickup fee plus $2.50 per mile. If the total fare was $25.00, how many miles were traveled?',
      desc: 'Word problem'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim() || isDifferentiating) return;
    onDifferentiate(problemText.trim());
  };

  const levelDescriptions = {
    basic: {
      tag: 'Basic Scaffolding Target',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'AI will simplify coefficients to clean positive integers, provide high scaffolding, and give direct hints.'
    },
    intermediate: {
      tag: 'Intermediate Curriculum Target',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      description: 'AI will create a grade-level algebraic version with formal properties of equality and optional hints.'
    },
    standard: {
      tag: 'Standard Curriculum Target',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      description: 'AI will create a grade-level algebraic version with formal properties of equality and optional hints.'
    },
    advanced: {
      tag: 'Advanced Modeling Target',
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      description: 'AI will transform your problem into a challenging multi-step or real-world application testing the same concept.'
    }
  }[currentDifficulty] || {
    tag: 'Algebraic Differentiation Target',
    color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    description: 'AI will adapt the problem based on the selected tier.'
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-lg mb-8 relative overflow-hidden">
      {/* Decorative accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
              Dynamic AI Differentiation
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${levelDescriptions.color}`}>
              {levelDescriptions.tag}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Differentiate Your Own Math Problem
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Type any two-step linear equation or word problem. The Gemini AI model will dynamically transform and scaffold it for the selected <strong>{currentDifficulty}</strong> tier.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="custom-problem-textarea"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
          >
            Enter Your Own Math Problem
          </label>
          <div className="relative">
            <textarea
              id="custom-problem-textarea"
              rows={3}
              value={problemText}
              onChange={(e) => {
                setProblemText(e.target.value);
                if (errorMessage) onClearError();
              }}
              placeholder="e.g. 3x + 5 = 26, or 2(x - 4) = 18, or 'A bike rental costs $15 flat plus $4 per hour. If John paid $35, how many hours did he rent?'"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition resize-none shadow-2xs leading-relaxed"
              disabled={isDifferentiating}
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Try an example:
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
              title={preset.desc}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Level Pedagogical Rule Notice */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
          <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-900 capitalize">{currentDifficulty} tier strategy:</strong>{' '}
            {levelDescriptions.description}
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block font-semibold">Differentiation Alert:</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isDifferentiating || !problemText.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className={`w-4 h-4 ${isDifferentiating ? 'animate-spin' : ''}`} />
            <span>
              {isDifferentiating
                ? `Calling Gemini AI to Differentiate (${currentDifficulty})...`
                : 'Differentiate My Problem'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
