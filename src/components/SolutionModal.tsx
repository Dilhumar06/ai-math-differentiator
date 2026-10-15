import React from 'react';
import { MathTask } from '../types/math';
import { X, CheckCircle, ArrowRight, ShieldCheck, BookOpen, Lightbulb } from 'lucide-react';

interface SolutionModalProps {
  task: MathTask;
  isOpen: boolean;
  onClose: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({ task, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-purple-50/60 rounded-t-3xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                {task.difficulty} Tier Solution
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {task.equation}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-950">
              Full Step-by-Step Algebraic Solution
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center border border-slate-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-sm">
          {/* Question Recap & Context */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Problem Prompt
            </span>
            <p className="text-slate-800 font-medium text-base mb-2">{task.question}</p>
            {task.context && (
              <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/60">
                <strong className="text-indigo-700">Contextual Interpretation:</strong> {task.context}
              </p>
            )}
          </div>

          {/* Sequential Algebraic Steps */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Step-by-Step Isolation Process</span>
            </h4>
            <div className="space-y-3">
              {task.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-all shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="font-bold text-indigo-950 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                        {step.stepNumber}
                      </span>
                      {step.operationName}
                    </span>
                    <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 self-start sm:self-auto">
                      {step.propertyApplied}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-2.5 leading-relaxed">
                    {step.explanation}
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-xs sm:text-sm font-bold text-indigo-800 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{step.intermediateEquation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Answer Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-semibold text-emerald-700 tracking-wider block">
                Final Result
              </span>
              <span className="font-mono text-2xl font-extrabold text-emerald-950">
                {task.variable} = {task.correctAnswerDisplay || task.correctAnswer}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          {/* Verification / Proof Section */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <h4 className="font-bold text-indigo-950 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Mathematical Verification &amp; Check</span>
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700">
              <p>
                <strong>Substitute into original equation:</strong>{' '}
                <code className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-200 text-indigo-800 font-bold">
                  {task.verification.substitutedEquation}
                </code>
              </p>
              <p>
                <strong>Left-hand side evaluation:</strong>{' '}
                <code className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-200 text-slate-800">
                  {task.verification.lhsEvaluation}
                </code>
              </p>
              <p className="text-emerald-800 font-semibold pt-1">
                ✓ {task.verification.conclusion}
              </p>
            </div>
          </div>

          {/* Pedagogical Scaffolding Tip */}
          {task.scaffoldingTips && (
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Pedagogical Insight:</strong>
                <p className="text-slate-700">{task.scaffoldingTips}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50/70 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
