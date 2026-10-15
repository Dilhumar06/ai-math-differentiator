import React from 'react';
import { Scale } from 'lucide-react';

interface BalanceScaleProps {
  equation: string;
  variable: string;
  isSolved: boolean;
  correctAnswer: number;
}

export const BalanceScale: React.FC<BalanceScaleProps> = ({
  equation,
  variable,
  isSolved,
  correctAnswer,
}) => {
  // Parse LHS and RHS from equation
  const parts = equation.split('=');
  const lhsRaw = parts[0]?.trim() || equation;
  const rhsRaw = parts[1]?.trim() || '?';

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-indigo-50/30 border border-slate-200/80 mb-6">
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
          <Scale className="w-4 h-4 text-indigo-600" />
          <span>Equation Balance Scale Concept</span>
        </div>
        <span className="text-slate-500 text-[11px]">
          Fundamental rule: Both pans must balance!
        </span>
      </div>

      {/* Visual Balance Model */}
      <div className="relative pt-2 pb-1">
        {/* Fulcrum and Beam */}
        <div className="max-w-md mx-auto relative">
          {/* Horizontal Beam */}
          <div className="h-2 bg-slate-300 rounded-full mx-auto relative shadow-xs flex items-center justify-between px-6">
            {/* Center Pivot */}
            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow-xs"></div>
          </div>

          {/* Scale Base / Triangle */}
          <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-slate-400 mx-auto -mt-0.5"></div>

          {/* Left Pan */}
          <div className="absolute -top-7 left-2 sm:left-4 flex flex-col items-center">
            <div className="w-24 sm:w-28 p-2 rounded-xl bg-white shadow-sm border border-indigo-200 text-center">
              <span className="text-[10px] uppercase font-semibold text-indigo-400 block">Left Side</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 break-words">
                {isSolved ? `${variable} (${correctAnswer})` : lhsRaw}
              </span>
            </div>
            <div className="w-0.5 h-6 bg-slate-400"></div>
            <div className="w-16 h-1 bg-slate-400 rounded-full"></div>
          </div>

          {/* Right Pan */}
          <div className="absolute -top-7 right-2 sm:right-4 flex flex-col items-center">
            <div className="w-24 sm:w-28 p-2 rounded-xl bg-white shadow-sm border border-purple-200 text-center">
              <span className="text-[10px] uppercase font-semibold text-purple-400 block">Right Side</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 break-words">
                {rhsRaw}
              </span>
            </div>
            <div className="w-0.5 h-6 bg-slate-400"></div>
            <div className="w-16 h-1 bg-slate-400 rounded-full"></div>
          </div>
        </div>

        {/* State note */}
        <div className="mt-6 text-center text-xs">
          {isSolved ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium border border-emerald-200">
              Balanced! Substituting {variable} = {correctAnswer} yields equality.
            </span>
          ) : (
            <span className="text-slate-500">
              Any operation applied to isolate <strong className="text-slate-700">{variable}</strong> on the left must be balanced on the right.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
