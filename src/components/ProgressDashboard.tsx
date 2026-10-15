import React from 'react';
import { StudentProgress } from '../types/math';
import { Award, Flame, CheckCircle2, Target, BarChart3, RotateCcw } from 'lucide-react';

interface ProgressDashboardProps {
  progress: StudentProgress;
  onResetProgress: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onResetProgress,
}) => {
  const accuracy =
    progress.totalAttempted > 0
      ? Math.round((progress.totalCorrect / progress.totalAttempted) * 100)
      : 0;

  const badges = [
    {
      id: 'first_solve',
      name: 'First Step',
      desc: 'Solved your first two-step equation',
      unlocked: progress.totalCorrect >= 1,
      icon: '🌱'
    },
    {
      id: 'basic_master',
      name: 'Foundation Master',
      desc: 'Solved 3 Basic equations',
      unlocked: progress.byDifficulty.basic.solved >= 3,
      icon: '🛡️'
    },
    {
      id: 'streak_3',
      name: 'On Fire',
      desc: 'Achieved a streak of 3 correct answers',
      unlocked: progress.bestStreak >= 3,
      icon: '🔥'
    },
    {
      id: 'intermediate_solver',
      name: 'Grade-Level Pro',
      desc: 'Conquered 3 Intermediate equations with equality properties',
      unlocked: (progress.byDifficulty.intermediate?.solved || 0) >= 3,
      icon: '🧭'
    },
    {
      id: 'advanced_scholar',
      name: 'Math Modeler',
      desc: 'Solved an Advanced multi-step word problem',
      unlocked: progress.byDifficulty.advanced.solved >= 1,
      icon: '🚀'
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-lg mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <span>Learning Mastery &amp; Analytics</span>
          </h3>
          <p className="text-xs text-slate-500">
            Real-time tracking of problem-solving fluency across differentiated difficulty tiers.
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100/70 hover:bg-slate-200/60 border border-slate-200 transition cursor-pointer self-start sm:self-auto"
          title="Reset practice statistics"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Stats</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Total Solved */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Solved</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {progress.totalCorrect}
          </div>
          <span className="text-[11px] text-slate-500">
            out of {progress.totalAttempted} attempts
          </span>
        </div>

        {/* Current Streak */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
          <div className="flex items-center justify-between text-amber-600 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {progress.streak}
          </div>
          <span className="text-[11px] text-slate-500">
            Best streak: {progress.bestStreak}
          </span>
        </div>

        {/* Accuracy */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Accuracy</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {accuracy}%
          </div>
          <span className="text-[11px] text-slate-500">
            Overall correctness
          </span>
        </div>

        {/* Hints Consulted */}
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
          <div className="flex items-center justify-between text-purple-600 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Hints Used</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {progress.hintsUsedCount}
          </div>
          <span className="text-[11px] text-slate-500">
            Scaffolding requests
          </span>
        </div>
      </div>

      {/* Tier Performance Breakdown */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Progress by Difficulty Tier
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Basic */}
          <div className="p-3 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-emerald-700">Basic Level</span>
              <span className="font-mono font-bold text-slate-800">
                {progress.byDifficulty.basic.solved} solved
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (progress.byDifficulty.basic.solved / 3) * 100)}%`
                }}
              ></div>
            </div>
          </div>

          {/* Intermediate */}
          <div className="p-3 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-blue-700">Intermediate Level</span>
              <span className="font-mono font-bold text-slate-800">
                {progress.byDifficulty.intermediate?.solved || 0} solved
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, ((progress.byDifficulty.intermediate?.solved || 0) / 3) * 100)}%`
                }}
              ></div>
            </div>
          </div>

          {/* Advanced */}
          <div className="p-3 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-purple-700">Advanced Level</span>
              <span className="font-mono font-bold text-slate-800">
                {progress.byDifficulty.advanced.solved} solved
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (progress.byDifficulty.advanced.solved / 2) * 100)}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Mastery Milestones
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-xl border transition-all text-center ${
                badge.unlocked
                  ? 'bg-gradient-to-b from-amber-50 to-white border-amber-300 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200/60 opacity-50 grayscale'
              }`}
            >
              <div className="text-2xl mb-1">{badge.icon}</div>
              <div className="font-bold text-xs text-slate-900 truncate">
                {badge.name}
              </div>
              <div className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                {badge.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
