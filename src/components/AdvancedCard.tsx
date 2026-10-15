import React, { useState } from 'react';
import { AdvancedActivity } from '../types/math';
import confetti from 'canvas-confetti';
import {
  Rocket,
  Lightbulb,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  HelpCircle
} from 'lucide-react';

interface AdvancedCardProps {
  activity: AdvancedActivity;
  commonAnswer: number;
  commonVariable: string;
  onSuccessSolve?: () => void;
  onUseHint?: () => void;
}

export const AdvancedCard: React.FC<AdvancedCardProps> = ({
  activity,
  commonAnswer,
  commonVariable,
  onSuccessSolve,
  onUseHint,
}) => {
  const [studentEquation, setStudentEquation] = useState<string>('');
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [revealedHintsCount, setRevealedHintsCount] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const [equationFeedback, setEquationFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isCheckingEq, setIsCheckingEq] = useState<boolean>(false);

  const handleRevealHint = () => {
    if (revealedHintsCount < activity.hints.length) {
      setRevealedHintsCount((prev) => prev + 1);
      if (onUseHint) onUseHint();
    }
  };

  // Check equation equivalence via server endpoint allowing equivalent rearrangements
  const handleCheckEquation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentEquation.trim() || isCheckingEq) return;

    setIsCheckingEq(true);
    try {
      const res = await fetch('/api/math/check-equation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentEquation: studentEquation.trim(),
          targetEquation: activity.targetEquation,
          equivalentForms: activity.equivalentForms || [],
          commonAnswer,
          commonVariable
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEquationFeedback({
          isCorrect: data.isEquivalent,
          message: data.message
        });
      } else {
        // Simple fallback check
        const clean = (s: string) => s.replace(/\s+/g, '').toLowerCase();
        const isMatch = clean(studentEquation) === clean(activity.targetEquation);
        setEquationFeedback({
          isCorrect: isMatch,
          message: isMatch
            ? 'Equation verified! Now solve for the variable below.'
            : 'Check your variables and numbers against the word problem description.'
        });
      }
    } catch {
      setEquationFeedback({
        isCorrect: false,
        message: 'Could not verify equation right now. Try reviewing the word problem statement.'
      });
    } finally {
      setIsCheckingEq(false);
    }
  };

  // Check numerical answer
  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(studentAnswer.trim());
    if (isNaN(val)) {
      setAnswerFeedback({ isCorrect: false, message: 'Please enter a valid number (e.g. -5).' });
      return;
    }

    if (Math.abs(val - commonAnswer) < 0.001) {
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
      setAnswerFeedback({
        isCorrect: true,
        message: `Superb! ${commonVariable} = ${studentAnswer} correctly solves the real-world scenario.`
      });
      if (onSuccessSolve) onSuccessSolve();
    } else {
      let msg = `Not quite. ${commonVariable} = ${val} does not satisfy the model.`;
      if (Math.abs(val + commonAnswer) < 0.001) {
        msg = `Check your signs! The magnitude is correct, but the sign is reversed.`;
      }
      setAnswerFeedback({ isCorrect: false, message: msg });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-purple-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
      <div>
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-600 to-violet-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-purple-100" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-90">
                Level 3: Advanced
              </span>
              <h3 className="text-sm font-bold">Real-World Problem Formulation</h3>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
            Mathematical Modeling
          </span>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 leading-relaxed">
            <strong className="block font-semibold mb-0.5">Pedagogical Goal:</strong>
            Formulate the algebraic equation from a context independently, then solve for the unknown! Target equation is hidden until requested.
          </div>

          {/* Word Problem Prompt */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Word Problem Scenario
            </span>
            <p className="text-slate-900 font-medium text-sm leading-relaxed">
              {activity.wordProblem}
            </p>
          </div>

          {/* Stage 1: Formulate Equation */}
          <form onSubmit={handleCheckEquation} className="p-3.5 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-purple-950">
                Stage 1: Formulate the Equation
              </label>
              <span className="text-[10px] text-slate-500">e.g. -3x + 10 = 25</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={studentEquation}
                onChange={(e) => {
                  setStudentEquation(e.target.value);
                  if (equationFeedback) setEquationFeedback(null);
                }}
                placeholder="Write your algebraic equation..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-mono font-medium text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs"
                disabled={isCheckingEq}
              />
              <button
                type="submit"
                disabled={isCheckingEq || !studentEquation.trim()}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                {isCheckingEq ? '...' : 'Check Eq'}
              </button>
            </div>

            {equationFeedback && (
              <div
                className={`p-2 rounded-lg text-[11px] flex items-start gap-1.5 border animate-in fade-in ${
                  equationFeedback.isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                    : 'bg-rose-50 text-rose-950 border-rose-200'
                }`}
              >
                {equationFeedback.isCorrect ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{equationFeedback.message}</span>
              </div>
            )}
          </form>

          {/* Stage 2: Numerical Answer */}
          <form onSubmit={handleCheckAnswer} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Stage 2: Solve for Unknown ({commonVariable})
              </label>
              <span className="text-[10px] text-slate-500">Value of {commonVariable}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-700 pl-1">{commonVariable} =</span>
              <input
                type="text"
                value={studentAnswer}
                onChange={(e) => {
                  setStudentAnswer(e.target.value);
                  if (answerFeedback) setAnswerFeedback(null);
                }}
                placeholder={`e.g. ${commonAnswer}`}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!studentAnswer.trim()}
                className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                Check Answer
              </button>
            </div>

            {answerFeedback && (
              <div
                className={`p-2 rounded-lg text-[11px] flex items-start gap-1.5 border animate-in fade-in ${
                  answerFeedback.isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                    : 'bg-rose-50 text-rose-950 border-rose-200'
                }`}
              >
                {answerFeedback.isCorrect ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{answerFeedback.message}</span>
              </div>
            )}
          </form>

          {/* Hints Section */}
          {revealedHintsCount > 0 && (
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2 animate-in fade-in">
              <span className="font-bold flex items-center gap-1.5 text-amber-900">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Formulation &amp; Solution Hints ({revealedHintsCount}/{activity.hints.length}):</span>
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

          {/* Full Solution (Reveals expected equation and proof only on request) */}
          {showSolution && (
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3 text-xs text-slate-800 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <span className="font-bold text-purple-950 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-700" />
                  <span>Target Equation &amp; Solution</span>
                </span>
                <span className="font-mono font-bold text-purple-900 bg-white px-2 py-0.5 rounded border border-purple-300 text-xs">
                  {commonVariable} = {commonAnswer}
                </span>
              </div>

              {/* Target Equation Callout */}
              <div className="p-2.5 rounded-xl bg-white border border-purple-200 text-[11px] space-y-1">
                <span className="font-semibold text-purple-950 block">Target Formulated Equation:</span>
                <div className="font-mono text-sm font-bold text-purple-900">
                  {activity.targetEquation}
                </div>
                {activity.equivalentForms && activity.equivalentForms.length > 1 && (
                  <p className="text-[10px] text-slate-500">
                    Acceptable equivalent forms: {activity.equivalentForms.join(', ')}
                  </p>
                )}
              </div>

              {/* Step Sequence */}
              <div className="space-y-2">
                {activity.steps.map((st, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-purple-950 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px]">
                          {st.stepNumber}
                        </span>
                        {st.operationName}
                      </span>
                      <span className="text-[10px] text-slate-500 italic bg-slate-100 px-1.5 py-0.5 rounded">
                        {st.propertyApplied}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{st.explanation}</p>
                    <div className="font-mono text-[11px] font-bold text-purple-800 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-purple-600" />
                      <span>{st.intermediateEquation}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification */}
              <div className="p-2.5 rounded-xl bg-white/90 border border-purple-200 text-[11px] space-y-1">
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  Verification Check:
                </span>
                <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-purple-950 block text-[10px]">
                  {activity.verification.substitutedEquation}
                </code>
                <p className="text-purple-800 text-[10px] font-medium">
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
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-purple-800 border border-purple-200 shadow-2xs transition cursor-pointer"
        >
          {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
        </button>
      </div>
    </div>
  );
};
