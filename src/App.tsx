/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DifferentiationTriadResult, StudentProgress } from './types/math';
import { Header } from './components/Header';
import { AiStatusNotice } from './components/AiStatusNotice';
import { TriadInputCard } from './components/TriadInputCard';
import { DifferentiatedTriadView } from './components/DifferentiatedTriadView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { PedagogyModal } from './components/PedagogyModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'ai_math_differentiator_progress_v2';

const initialProgress: StudentProgress = {
  totalAttempted: 0,
  totalCorrect: 0,
  streak: 0,
  bestStreak: 0,
  hintsUsedCount: 0,
  byDifficulty: {
    basic: { solved: 0, attempted: 0 },
    intermediate: { solved: 0, attempted: 0 },
    advanced: { solved: 0, attempted: 0 }
  },
  unlockedBadges: []
};

export default function App() {
  const [triad, setTriad] = useState<DifferentiationTriadResult | null>(null);
  const [isDifferentiating, setIsDifferentiating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // AI Connection State
  const [aiStatus, setAiStatus] = useState<{
    aiAvailable: boolean;
    model: string;
    message: string;
    missingSetting?: string | null;
    instructions?: string | null;
  }>({
    aiAvailable: false,
    model: 'Gemini AI (3.5 / 3.8 Series)',
    message: 'Checking AI engine connection...',
    missingSetting: null,
    instructions: null
  });

  // Modals state
  const [isPedagogyOpen, setIsPedagogyOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Student learning progress (stored in localStorage)
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialProgress;
  });

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Check AI engine availability and fetch initial sample triad on mount
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/status');
        if (res.ok) {
          const data = await res.json();
          setAiStatus({
            aiAvailable: data.aiAvailable,
            model: data.model || 'Gemini AI',
            message: data.message,
            missingSetting: data.missingSetting,
            instructions: data.instructions
          });
        }
      } catch {
        setAiStatus({
          aiAvailable: false,
          model: 'Gemini AI',
          message: 'Running in curriculum demo mode.',
          missingSetting: 'GEMINI_API_KEY',
          instructions: 'Configure GEMINI_API_KEY in the Secrets panel to activate live AI.'
        });
      }

      // Fetch initial sample triad so the user immediately sees all 3 cards in action
      try {
        const sampleRes = await fetch('/api/math/sample-triad');
        if (sampleRes.ok) {
          const sampleData: DifferentiationTriadResult = await sampleRes.json();
          setTriad(sampleData);
        }
      } catch (err) {
        console.warn('Could not load initial sample triad:', err);
      }
    }
    init();
  }, []);

  // Main Handler: Differentiate into 3 Simultaneous Levels
  const handleDifferentiateTriad = async (inputProblem: string) => {
    setIsDifferentiating(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/math/differentiate-triad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputProblem })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || 'AI differentiation request failed. Please try again.');
        setIsDifferentiating(false);
        return;
      }

      // Topic validation check
      if (data.isSupportedTopic === false) {
        setErrorMessage(
          data.topicExplanation ||
            'This problem is outside the supported topic of two-step linear equations. Please enter an equation (e.g., 3x + 15 = 45) or a linear word problem.'
        );
        setIsDifferentiating(false);
        return;
      }

      setTriad(data);

      // Scroll smoothly to the 3 differentiated cards
      setTimeout(() => {
        const el = document.getElementById('differentiated-cards-container');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'Network communication error while contacting the AI differentiation engine.'
      );
    } finally {
      setIsDifferentiating(false);
    }
  };

  const handleSolveTier = (level: 'basic' | 'intermediate' | 'advanced') => {
    setProgress((prev) => {
      const newStreak = prev.streak + 1;
      const newBest = Math.max(newStreak, prev.bestStreak);

      return {
        ...prev,
        totalAttempted: prev.totalAttempted + 1,
        totalCorrect: prev.totalCorrect + 1,
        streak: newStreak,
        bestStreak: newBest,
        byDifficulty: {
          ...prev.byDifficulty,
          [level]: {
            solved: (prev.byDifficulty[level]?.solved || 0) + 1,
            attempted: (prev.byDifficulty[level]?.attempted || 0) + 1
          }
        }
      };
    });
  };

  const handleUseHintTier = () => {
    setProgress((prev) => ({
      ...prev,
      hintsUsedCount: prev.hintsUsedCount + 1
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all your equation stats and streak data?')) {
      setProgress(initialProgress);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <Header
        onOpenPedagogy={() => setIsPedagogyOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {/* Status Notice about Gemini Engine */}
        <AiStatusNotice
          aiAvailable={aiStatus.aiAvailable}
          model={aiStatus.model}
          message={aiStatus.message}
          missingSetting={aiStatus.missingSetting}
          instructions={aiStatus.instructions}
        />

        {/* Input Card: Enter Your Own Math Problem & Differentiate into 3 Levels */}
        <TriadInputCard
          onDifferentiate={handleDifferentiateTriad}
          isDifferentiating={isDifferentiating}
          errorMessage={errorMessage}
          onClearError={() => setErrorMessage(null)}
        />

        {/* The Results: Simultaneous Three-Card Differentiated View */}
        {triad && (
          <div id="differentiated-cards-container">
            <DifferentiatedTriadView
              triad={triad}
              onSolveTier={handleSolveTier}
              onUseHintTier={handleUseHintTier}
            />
          </div>
        )}

        {/* Student Analytics & Mastery Dashboard */}
        <ProgressDashboard
          progress={progress}
          onResetProgress={handleResetProgress}
        />
      </main>

      {/* Educational Pedagogy Framework Modal */}
      <PedagogyModal
        isOpen={isPedagogyOpen}
        onClose={() => setIsPedagogyOpen(false)}
      />

      {/* Running & Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        aiAvailable={aiStatus.aiAvailable}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
