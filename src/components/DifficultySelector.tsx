import React from 'react';
import { DifficultyLevel } from '../types/math';
import { Sparkles, CheckCircle2, Shield, Compass, Rocket } from 'lucide-react';

interface DifficultySelectorProps {
  currentDifficulty: DifficultyLevel;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
  solvedCounts: Record<string, number | undefined>;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onSelectDifficulty,
  solvedCounts,
}) => {
  const cards: Array<{
    id: DifficultyLevel;
    title: string;
    subtitle: string;
    description: string;
    sampleEquation: string;
    scaffoldingLevel: string;
    targetLearner: string;
    accentColor: string;
    icon: React.ReactNode;
    features: string[];
  }> = [
    {
      id: 'basic',
      title: 'Basic',
      subtitle: 'Foundational Scaffolding',
      description: 'Simple equations, step-by-step guidance, and direct hints.',
      sampleEquation: '2x + 4 = 12',
      scaffoldingLevel: 'High Scaffolding',
      targetLearner: 'Building confidence & inverse operations',
      accentColor: 'emerald',
      icon: <Shield className="w-5 h-5 text-emerald-600" />,
      features: [
        'Positive integer coefficients',
        'Direct inverse-operation hints',
        'Visual balance scale breakdown'
      ]
    },
    {
      id: 'standard',
      title: 'Standard',
      subtitle: 'Grade-Level Application',
      description: 'Grade-level equations with optional hints and integer rules.',
      sampleEquation: '-3x + 8 = 26',
      scaffoldingLevel: 'Moderate Scaffolding',
      targetLearner: 'Independent algebraic problem-solving',
      accentColor: 'blue',
      icon: <Compass className="w-5 h-5 text-blue-600" />,
      features: [
        'Negative coefficients & integers',
        'Distributive property equations',
        'Equality property explanations'
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced',
      subtitle: 'Multi-Step & Real-World',
      description: 'Complex equations and real-world word problems requiring multiple steps.',
      sampleEquation: '0.15m + 35 = 56',
      scaffoldingLevel: 'Low Scaffolding / Strategic Hints',
      targetLearner: 'Mathematical modeling & critical thinking',
      accentColor: 'purple',
      icon: <Rocket className="w-5 h-5 text-purple-600" />,
      features: [
        'Real-world story modeling',
        'Decimals & fractional multipliers',
        'Complex multi-step reasoning'
      ]
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Select Difficulty Level</span>
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              Differentiated Instruction
            </span>
          </h2>
          <p className="text-xs text-slate-600">
            Choose your learning tier. The AI adapts equation complexity, problem context, and scaffolding to match.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const isSelected = currentDifficulty === card.id;

          let borderClass = 'border-slate-200 hover:border-slate-300 bg-white';
          let ringClass = '';
          let badgeClass = 'bg-slate-100 text-slate-700';

          if (isSelected) {
            if (card.id === 'basic') {
              borderClass = 'border-emerald-500 bg-gradient-to-b from-emerald-50/70 to-white shadow-md shadow-emerald-100/50';
              ringClass = 'ring-2 ring-emerald-400/40';
              badgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
            } else if (card.id === 'standard') {
              borderClass = 'border-blue-500 bg-gradient-to-b from-blue-50/70 to-white shadow-md shadow-blue-100/50';
              ringClass = 'ring-2 ring-blue-400/40';
              badgeClass = 'bg-blue-100 text-blue-800 border border-blue-300';
            } else {
              borderClass = 'border-purple-500 bg-gradient-to-b from-purple-50/70 to-white shadow-md shadow-purple-100/50';
              ringClass = 'ring-2 ring-purple-400/40';
              badgeClass = 'bg-purple-100 text-purple-800 border border-purple-300';
            }
          }

          return (
            <button
              key={card.id}
              onClick={() => onSelectDifficulty(card.id)}
              className={`text-left p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${borderClass} ${ringClass}`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-white shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Active Level
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500">{card.subtitle}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {card.description}
                </p>

                {/* Sample equation badge */}
                <div className="mb-3.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Example Structure
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-800">
                    {card.sampleEquation}
                  </span>
                </div>

                {/* Key Scaffolding Bullet points */}
                <ul className="space-y-1.5 mb-4 text-xs text-slate-600">
                  {card.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${badgeClass}`}>
                  {card.scaffoldingLevel}
                </span>
                <span className="text-slate-500 font-medium">
                  Solved: <strong className="text-slate-900">{solvedCounts[card.id] || 0}</strong>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
