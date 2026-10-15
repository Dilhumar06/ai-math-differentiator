import React, { useState } from 'react';
import { BasicActivity } from '../types/math';
import confetti from 'canvas-confetti';
import {
  Shield,
  Lightbulb,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface BasicCardProps {
  activity: BasicActivity;
  commonAnswer: number;
  commonVariable: string;
  onSuccessSolve?: () => void;
  onUseHint?: () => void;
}

export const BasicCard: React.FC<BasicCardProps> = ({
  activity,
  commonAnswer,
  commonVariable,
  onSuccessSolve,
  onUseHint,
}) => {
  const [studentInput, setStudentInput] = useState<string>('');
  const [revealedHintsCount, setRevealedHintsCount] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const handleRevealHint = () => {
    if (revealedHintsCount < activity.hints.length) {
      setRevealedHintsCount((prev) => prev + 1);
      if (onUseHint) onUseHint();
    }
  };

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(studentInput.trim());
    if (isNaN(val)) {
      setFeedback({ isCorrect: false, message: 'Please enter a valid number (e.g. -5).' });
      return;
    }

    if (Math.abs(val - commonAnswer) < 0.001) {
      try {
        confetti({ particleCount: 40, spread: 45, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
      setFeedback({
        isCorrect: true,
        message: `Correct! ${commonVariable} = ${studentInput} solves the original equation.`
      });
      if (onSuccessSolve) onSuccessSolve();
    } else {
      let msg = `Not quite. ${commonVariable} = ${val} does not make both sides equal.`;
      if (Math.abs(val + commonAnswer) < 0.001) {
        msg = `Watch your signs! The magnitude is correct, but check the negative sign.`;
      }
      setFeedback({ isCorrect: false, message: msg });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
      <div>
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-90">
                Level 1: Basic
              </span>
              <h3 className="text-sm font-bold">Solve the Original Equation</h3>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
            High Scaffolding
          </span>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
            <strong className="block font-semibold mb-0.5">Pedagogical Goal:</strong>
            Master the standard inverse operations sequence directly on the original equation entered.
          </div>

          {/* Equation Display */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Original Equation to Solve
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900">
              {activity.equation}
            </div>
          </div>

          {/* Student Answer Input */}
          <form onSubmit={handleCheckAnswer} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Your Answer for {commonVariable}:
            </label>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-700 pl-1">{commonVariable} =</span>
              <input
                type="text"
                value={studentInput}
                onChange={(e) => {
                  setStudentInput(e.target.value);
                  if (feedback) setFeedback(null);
                }}
                placeholder={`e.g. ${commonAnswer}`}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!studentInput.trim()}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                Check Answer
              </button>
            </div>

            {feedback && (
              <div
                className={`p-2.5 rounded-xl text-xs flex items-start gap-2 border animate-in fade-in ${
                  feedback.isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                    : 'bg-rose-50 text-rose-950 border-rose-200'
                }`}
              >
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
            )}
          </form>

          {/* Hints Section */}
          {revealedHintsCount > 0 && (
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2 animate-in fade-in">
              <span className="font-bold flex items-center gap-1.5 text-amber-900">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Hints ({revealedHintsCount}/{activity.hints.length}):</span>
              </span>
              <div className="space-y-1.5">
                {activity.hints.slice(0, revealedHintsCount).map((hint, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-white border border-amber-200/60 flex items-start gap-1.5 text-[11px]"
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-[9px]">
                      {idx + 1}
                    </span>
                    <p className="text-slate-800 leading-snug">{hint}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solution Section (Hidden initially) */}
          {showSolution && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 text-xs text-slate-800 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Full Step-by-Step Solution</span>
                </span>
                <span className="font-mono font-bold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-300 text-xs">
                  {commonVariable} = {commonAnswer}
                </span>
              </div>

              <div className="space-y-2">
                {activity.steps.map((st, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-950 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                          {st.stepNumber}
                        </span>
                        {st.operationName}
                      </span>
                      <span className="text-[10px] text-slate-500 italic bg-slate-100 px-1.5 py-0.5 rounded">
                        {st.propertyApplied}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{st.explanation}</p>
                    <div className="font-mono text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-emerald-600" />
                      <span>{st.intermediateEquation}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-white/90 border border-emerald-200 text-[11px] space-y-1">
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verification Check:
                </span>
                <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-emerald-950 block text-[10px]">
                  {activity.verification.substitutedEquation}
                </code>
                <p className="text-emerald-800 text-[10px] font-medium">
                  ✓ {activity.verification.conclusion}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Buttons */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
        <button
          onClick={handleRevealHint}
          disabled={revealedHintsCount >= activity.hints.length}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
            revealedHintsCount >= activity.hints.length
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {revealedHintsCount === 0
              ? 'Get a Hint'
              : revealedHintsCount >= activity.hints.length
              ? 'All Hints Shown'
              : `Next Hint (${revealedHintsCount}/${activity.hints.length})`}
          </span>
        </button>

        <button
          onClick={() => setShowSolution(!showSolution)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-emerald-800 border border-emerald-200 shadow-2xs transition cursor-pointer"
        >
          {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
        </button>
      </div>
    </div>
  );
};
