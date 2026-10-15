import React, { useState, useEffect } from 'react';
import { MathTask, DifficultyLevel, DiagnosticFeedback } from '../types/math';
import { BalanceScale } from './BalanceScale';
import { StepScratchpad } from './StepScratchpad';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  HelpCircle,
  Eye,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Lightbulb,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';

interface TaskCardProps {
  task: MathTask;
  isLoadingTask: boolean;
  onGenerateNewTask: () => void;
  onAnswerCorrect: (task: MathTask) => void;
  onAnswerIncorrect: (task: MathTask) => void;
  onUseHint: () => void;
  onOpenSolutionModal: () => void;
  currentDifficulty: DifficultyLevel;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isLoadingTask,
  onGenerateNewTask,
  onAnswerCorrect,
  onAnswerIncorrect,
  onUseHint,
  onOpenSolutionModal,
  currentDifficulty,
}) => {
  const [studentInput, setStudentInput] = useState<string>('');
  const [feedback, setFeedback] = useState<DiagnosticFeedback | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [revealedHintCount, setRevealedHintCount] = useState<number>(0);
  const [showStepScratchpad, setShowStepScratchpad] = useState<boolean>(false);
  const [showBalanceScale, setShowBalanceScale] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Reset local state when a new task is received
  useEffect(() => {
    setStudentInput('');
    setFeedback(null);
    setRevealedHintCount(0);
    setShowStepScratchpad(false);
  }, [task.id]);

  // Audio read-aloud for accessibility
  const handleToggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToRead = `${task.question}. The equation is: ${task.equation}.`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Helper to parse input values including fractions like "7/2"
  const parseStudentAnswer = (input: string): number | null => {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Fraction format: e.g. "7/2" or "-7/2"
    if (trimmed.includes('/')) {
      const parts = trimmed.split('/');
      if (parts.length === 2) {
        const num = parseFloat(parts[0]);
        const den = parseFloat(parts[1]);
        if (!isNaN(num) && !isNaN(den) && den !== 0) {
          return num / den;
        }
      }
    }

    const val = parseFloat(trimmed);
    return isNaN(val) ? null : val;
  };

  const handleCheckAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!studentInput.trim()) return;

    setIsEvaluating(true);
    const parsed = parseStudentAnswer(studentInput);

    if (parsed === null) {
      setFeedback({
        isCorrect: false,
        userAnswer: studentInput,
        message: 'Please enter a valid numeric number (e.g., 4, -6, or 7/2).',
        misconceptionType: 'none',
        suggestedAction: 'Type a number in the box.'
      });
      setIsEvaluating(false);
      return;
    }

    const isMatch = Math.abs(parsed - task.correctAnswer) < 0.001;

    if (isMatch) {
      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
        });
      } catch {
        // ignore if canvas not supported
      }

      setFeedback({
        isCorrect: true,
        userAnswer: parsed,
        message: `Brilliant! ${task.variable} = ${studentInput} is mathematically correct!`,
        misconceptionType: 'none',
        suggestedAction: 'Check the verification proof below or tackle the next equation.'
      });
      onAnswerCorrect(task);
      setIsEvaluating(false);
    } else {
      onAnswerIncorrect(task);
      // Call backend diagnostic endpoint for intelligent pedagogical diagnosis
      try {
        const res = await fetch('/api/math/diagnose', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            equation: task.equation,
            studentAnswer: parsed,
            correctAnswer: task.correctAnswer,
            variable: task.variable,
            difficulty: task.difficulty
          })
        });

        if (res.ok) {
          const diagData: DiagnosticFeedback = await res.json();
          setFeedback(diagData);
        } else {
          fallbackDiagnostic(parsed);
        }
      } catch {
        fallbackDiagnostic(parsed);
      } finally {
        setIsEvaluating(false);
      }
    }
  };

  const fallbackDiagnostic = (parsed: number) => {
    let msg = `Not quite. ${task.variable} = ${parsed} doesn't balance the equation.`;
    let action = 'Use the "Get a Hint" button to verify your first operation.';
    let type: DiagnosticFeedback['misconceptionType'] = 'arithmetic_slip';

    if (Math.abs(parsed + task.correctAnswer) < 0.001) {
      type = 'sign_error';
      msg = `Sign Alert: You found ${parsed}, but the sign is reversed.`;
      action = 'Check if you divided by a negative coefficient or flipped an addition.';
    }

    setFeedback({
      isCorrect: false,
      userAnswer: parsed,
      message: msg,
      misconceptionType: type,
      suggestedAction: action
    });
  };

  const handleRevealHint = () => {
    if (revealedHintCount < task.hints.length) {
      setRevealedHintCount((prev) => prev + 1);
      onUseHint();
    }
  };

  const difficultyColors = {
    basic: {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      border: 'border-emerald-200',
      highlight: 'text-emerald-700'
    },
    intermediate: {
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      border: 'border-blue-200',
      highlight: 'text-blue-700'
    },
    standard: {
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      border: 'border-blue-200',
      highlight: 'text-blue-700'
    },
    advanced: {
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
      border: 'border-purple-200',
      highlight: 'text-purple-700'
    }
  }[currentDifficulty] || {
    badge: 'bg-slate-100 text-slate-800 border-slate-200',
    border: 'border-slate-200',
    highlight: 'text-slate-700'
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8 transition-all">
      {/* Top Banner with Task Title & Generation Info */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-indigo-50/20 to-purple-50/30 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${difficultyColors.badge}`}
          >
            {task.difficulty} Tier
          </span>
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Equation Type: <strong className="text-slate-700">{task.equationType.replace('_', ' ')}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                {task.source === 'ai-generated' ? 'AI Synthesized' : 'Curriculum Validated'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Read aloud button */}
          {'speechSynthesis' in window && (
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-xl border transition cursor-pointer text-xs flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-purple-100 text-purple-700 border-purple-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={isSpeaking ? 'Stop speech' : 'Read problem aloud'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Mute' : 'Listen'}</span>
            </button>
          )}

          {/* Generate New Task button */}
          <button
            onClick={onGenerateNewTask}
            disabled={isLoadingTask}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white text-xs font-semibold shadow-sm transition cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTask ? 'animate-spin' : ''}`} />
            <span>{isLoadingTask ? 'Generating with AI...' : 'Generate New Task'}</span>
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* If this problem was differentiated from user input, show pedagogical rationale banner */}
        {task.originalInput && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-blue-50/90 border border-indigo-200/90 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                Differentiated from Your Input
              </span>
              {task.aiModelUsed && (
                <span className="text-[11px] font-mono font-medium text-indigo-700 bg-white/90 px-2 py-0.5 rounded-md border border-indigo-200">
                  Model: {task.aiModelUsed} {task.generationLatencyMs ? `(${(task.generationLatencyMs / 1000).toFixed(1)}s)` : ''}
                </span>
              )}
            </div>

            <div className="text-xs space-y-1.5">
              <p className="text-slate-700">
                <strong className="text-slate-900">Original Input Problem:</strong>{' '}
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-100 font-semibold text-indigo-900">
                  {task.originalInput}
                </span>
              </p>
              {task.adaptationRationale && (
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-indigo-950">AI Adaptation Rationale ({task.difficulty} tier):</strong>{' '}
                  <span className="italic">{task.adaptationRationale}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* The Question Prompt */}
        <div className="mb-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Question Prompt
          </span>
          <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed">
            {task.question}
          </p>

          {/* Context story for standard / advanced word problems */}
          {task.context && (
            <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 flex items-start gap-2">
              <Compass className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">Real-World Scenario:</strong>{' '}
                <span>{task.context}</span>
              </div>
            </div>
          )}
        </div>

        {/* The Equation Display Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/50 via-indigo-50/40 to-purple-50/50 border border-indigo-100 text-center mb-6 shadow-inner">
          <span className="text-[11px] font-semibold text-indigo-500 uppercase tracking-wider block mb-1">
            Target Equation
          </span>
          <div className="font-mono text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-wide">
            {task.equation}
          </div>
          <span className="text-xs text-slate-500 mt-2 block">
            Isolate variable <strong className="text-indigo-700 font-mono">{task.variable}</strong> using properties of equality.
          </span>
        </div>

        {/* Toggleable Visual Balance Scale */}
        <div className="mb-4 flex items-center justify-between text-xs">
          <button
            onClick={() => setShowBalanceScale(!showBalanceScale)}
            className="text-slate-600 hover:text-indigo-600 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{showBalanceScale ? 'Hide Balance Visualizer' : 'Show Balance Visualizer'}</span>
          </button>

          <button
            onClick={() => setShowStepScratchpad(!showStepScratchpad)}
            className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{showStepScratchpad ? 'Hide Step-by-Step Mode' : 'Guided Step-by-Step Mode'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {showBalanceScale && (
          <BalanceScale
            equation={task.equation}
            variable={task.variable}
            isSolved={feedback?.isCorrect || false}
            correctAnswer={task.correctAnswer}
          />
        )}

        {/* Step-by-Step Guided Scratchpad */}
        {showStepScratchpad && (
          <div className="mb-6">
            <StepScratchpad
              task={task}
              onRevealFullSolution={onOpenSolutionModal}
            />
          </div>
        )}

        {/* Answer Input Section */}
        <form onSubmit={handleCheckAnswer} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="font-mono font-bold text-slate-700 text-lg sm:text-xl pl-1">
                {task.variable} =
              </span>
              <input
                type="text"
                value={studentInput}
                onChange={(e) => {
                  setStudentInput(e.target.value);
                  if (feedback) setFeedback(null);
                }}
                placeholder="Enter value (e.g. 5, -3, or 7/2)"
                disabled={isEvaluating}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono font-bold text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-2xs"
                autoComplete="off"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isEvaluating || !studentInput.trim()}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEvaluating ? 'Evaluating...' : 'Check Answer'}
              </button>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 text-[10px] font-mono text-slate-700">Enter</kbd> to submit</span>
            <span>Supports integers, decimals, and fractions (e.g. 3.5 or 7/2)</span>
          </div>
        </form>

        {/* Immediate Feedback Box */}
        {feedback && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border mb-6 animate-in fade-in duration-200 ${
              feedback.isCorrect
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  feedback.isCorrect ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-xs' : 'bg-rose-600 text-white shadow-rose-200 shadow-xs'
                }`}
              >
                {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1 text-sm">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <strong className="font-bold text-base">
                    {feedback.isCorrect ? 'Correct!' : 'Review Your Thinking'}
                  </strong>
                  {feedback.misconceptionType && feedback.misconceptionType !== 'none' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-800 font-semibold">
                      Diagnostic: {feedback.misconceptionType.replace('_', ' ')}
                    </span>
                  )}
                </div>
                <p className="text-slate-800 leading-relaxed mb-2">{feedback.message}</p>
                {feedback.suggestedAction && (
                  <p className="text-xs text-slate-600 bg-white/70 p-2 rounded-lg border border-slate-200/60 inline-block">
                    <strong>Next Step:</strong> {feedback.suggestedAction}
                  </p>
                )}

                {/* Verification check on correct answer */}
                {feedback.isCorrect && (
                  <div className="mt-3 pt-3 border-t border-emerald-200/70 text-xs text-emerald-900 space-y-1">
                    <p className="font-semibold">Verification check:</p>
                    <code className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-200 inline-block">
                      {task.verification.substitutedEquation}
                    </code>
                    <p className="text-slate-600">{task.verification.conclusion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scaffolding Action Buttons: Hint & Solution */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRevealHint}
              disabled={revealedHintCount >= task.hints.length}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                revealedHintCount >= task.hints.length
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200 shadow-2xs'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>
                {revealedHintCount === 0
                  ? 'Get a Hint'
                  : revealedHintCount >= task.hints.length
                  ? 'All Hints Revealed'
                  : `Next Hint (${revealedHintCount}/${task.hints.length})`}
              </span>
            </button>

            <button
              onClick={onOpenSolutionModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 shadow-2xs transition cursor-pointer"
            >
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Show Full Solution</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 text-right sm:text-left">
            Scaffolding tier:{' '}
            <strong className="text-slate-800 capitalize">{task.difficulty}</strong>
          </div>
        </div>

        {/* Revealed Hints Box */}
        {revealedHintCount > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs text-amber-950 animate-in fade-in duration-150">
            <span className="font-bold flex items-center gap-1.5 text-amber-900 text-sm">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Progressive Scaffolding Hints:</span>
            </span>
            <div className="space-y-2 mt-1">
              {task.hints.slice(0, revealedHintCount).map((hint, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-amber-200/70 flex items-start gap-2 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">{hint}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
