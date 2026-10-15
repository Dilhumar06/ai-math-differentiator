import React from 'react';
import { DifferentiationTriadResult } from '../types/math';
import { BasicCard } from './BasicCard';
import { IntermediateCard } from './IntermediateCard';
import { AdvancedCard } from './AdvancedCard';
import { Layers, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

interface DifferentiatedTriadViewProps {
  triad: DifferentiationTriadResult;
  onSolveTier: (level: 'basic' | 'intermediate' | 'advanced') => void;
  onUseHintTier: () => void;
}

export const DifferentiatedTriadView: React.FC<DifferentiatedTriadViewProps> = ({
  triad,
  onSolveTier,
  onUseHintTier,
}) => {
  return (
    <div className="space-y-6 mb-12">
      {/* Triad Unified Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/90 border border-indigo-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
              <Layers className="w-3.5 h-3.5" />
              1 Equation → 3 Scaffolding Activities
            </span>
            <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
              Original: {triad.originalProblem}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Unified Answer: {triad.commonVariable} = {triad.commonAnswerDisplay || triad.commonAnswer}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            <strong className="text-slate-900">Underlying Concept:</strong>{' '}
            <span>{triad.conceptIdentified}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-indigo-900 bg-white/90 px-3 py-1.5 rounded-xl border border-indigo-200 self-start md:self-auto shrink-0 shadow-2xs">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>{triad.generatedBy}</span>
          <span className="text-slate-400">•</span>
          <span>{(triad.latencyMs / 1000).toFixed(1)}s</span>
        </div>
      </div>

      {/* The Three Simultaneous Cards: Basic, Intermediate, Advanced */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* CARD 1 — BASIC */}
        <BasicCard
          activity={triad.basic}
          commonAnswer={triad.commonAnswer}
          commonVariable={triad.commonVariable}
          onSuccessSolve={() => onSolveTier('basic')}
          onUseHint={onUseHintTier}
        />

        {/* CARD 2 — INTERMEDIATE */}
        <IntermediateCard
          activity={triad.intermediate}
          commonAnswer={triad.commonAnswer}
          commonVariable={triad.commonVariable}
          originalEquation={triad.originalProblem}
          onSuccessSolve={() => onSolveTier('intermediate')}
          onUseHint={onUseHintTier}
        />

        {/* CARD 3 — ADVANCED */}
        <AdvancedCard
          activity={triad.advanced}
          commonAnswer={triad.commonAnswer}
          commonVariable={triad.commonVariable}
          onSuccessSolve={() => onSolveTier('advanced')}
          onUseHint={onUseHintTier}
        />
      </div>
    </div>
  );
};
