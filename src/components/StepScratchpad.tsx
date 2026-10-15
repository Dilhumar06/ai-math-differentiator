import React, { useState } from 'react';
import { MathTask } from '../types/math';
import { Check, ArrowRight, Eye, ChevronRight } from 'lucide-react';

interface StepScratchpadProps {
  task: MathTask;
  onRevealFullSolution: () => void;
}

export const StepScratchpad: React.FC<StepScratchpadProps> = ({
  task,
  onRevealFullSolution,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [revealedSteps, setRevealedSteps] = useState<number[]>([0]);

  const handleRevealNext = () => {
    if (activeStepIndex + 1 < task.steps.length) {
      const nextIdx = activeStepIndex + 1;
      setActiveStepIndex(nextIdx);
      if (!revealedSteps.includes(nextIdx)) {
        setRevealedSteps([...revealedSteps, nextIdx]);
      }
    } else {
      onRevealFullSolution();
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-bold text-slate-800 text-sm block">
            Guided Scaffolding: Step-by-Step Pathway
          </span>
          <span className="text-slate-500">
            Unpack how to transform the equation one algebraic property at a time.
          </span>
        </div>
        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-full">
          Step {Math.min(activeStepIndex + 1, task.steps.length)} of {task.steps.length}
        </span>
      </div>

      {/* Step progression */}
      <div className="space-y-3">
        {task.steps.slice(0, activeStepIndex + 1).map((step, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-indigo-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {step.stepNumber}
                </span>
                {step.operationName}
              </span>
              <span className="text-[10px] text-slate-500 italic bg-slate-100 px-2 py-0.5 rounded-md">
                {step.propertyApplied}
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">{step.explanation}</p>

            <div className="pt-1 flex items-center gap-2">
              <span className="text-[11px] font-medium text-slate-500">Resulting Equation:</span>
              <span className="font-mono font-bold text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {step.intermediateEquation}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between pt-2 border-t border-indigo-100/80">
        <button
          onClick={onRevealFullSolution}
          className="text-slate-600 hover:text-slate-900 font-medium underline underline-offset-2 cursor-pointer flex items-center gap-1 text-[11px]"
        >
          <Eye className="w-3.5 h-3.5" />
          View Complete Solution &amp; Check
        </button>

        {activeStepIndex + 1 < task.steps.length ? (
          <button
            onClick={handleRevealNext}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium cursor-pointer transition shadow-2xs"
          >
            <span>Show Next Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> All steps unveiled
          </span>
        )}
      </div>
    </div>
  );
};
