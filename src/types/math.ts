export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced' | 'standard';

export interface StepExplanation {
  stepNumber: number;
  operationName: string;
  propertyApplied: string;
  intermediateEquation: string;
  explanation: string;
}

export interface VerificationProof {
  substitutedEquation: string;
  lhsEvaluation?: string;
  rhsValue?: string;
  conclusion: string;
}

export interface BasicActivity {
  level?: 'basic';
  title: string;
  equation: string;
  hints: string[];
  steps: StepExplanation[];
  verification: VerificationProof;
  differentiationRationale?: string;
}

export interface IntermediateActivity {
  level?: 'intermediate';
  title: string;
  equation: string; // The equation with parentheses e.g. -3(x + 2) + 16 = 25
  expansionStep: string; // e.g. -3x - 6 + 16 = 25
  simplifiedToOriginal: string; // e.g. -3x + 10 = 25
  hints: string[];
  steps: StepExplanation[];
  verification: VerificationProof;
  differentiationRationale?: string;
}

export interface AdvancedActivity {
  level?: 'advanced';
  title: string;
  wordProblem: string; // The real-world word problem statement
  targetEquation: string; // The expected equation e.g. -3x + 10 = 25
  equivalentForms?: string[]; // e.g. ["-3x + 10 = 25", "10 - 3x = 25", "25 = -3x + 10"]
  hints: string[];
  steps: StepExplanation[];
  verification: VerificationProof;
  differentiationRationale?: string;
}

export interface DifferentiationTriadResult {
  originalProblem: string;
  isSupportedTopic: boolean;
  topicExplanation?: string;
  conceptIdentified: string;
  commonAnswer: number;
  commonAnswerDisplay: string;
  commonVariable: string;
  basic: BasicActivity;
  intermediate: IntermediateActivity;
  advanced: AdvancedActivity;
  generatedBy: string;
  latencyMs: number;
}

export interface MathTask {
  id: string;
  difficulty: DifficultyLevel;
  title: string;
  equation: string;
  variable: string;
  correctAnswer: number;
  correctAnswerDisplay?: string;
  question: string;
  context?: string;
  equationType: string;
  hints: string[];
  steps: StepExplanation[];
  verification: VerificationProof;
  scaffoldingTips?: string;
  source?: 'ai-generated' | 'curriculum-bank';
  originalInput?: string;
  adaptationRationale?: string;
  aiModelUsed?: string;
  generationLatencyMs?: number;
}

export interface StudentProgress {
  totalAttempted: number;
  totalCorrect: number;
  streak: number;
  bestStreak: number;
  hintsUsedCount: number;
  byDifficulty: {
    basic: { solved: number; attempted: number };
    intermediate?: { solved: number; attempted: number };
    standard?: { solved: number; attempted: number };
    advanced: { solved: number; attempted: number };
  };
  unlockedBadges: string[];
}

export interface DiagnosticFeedback {
  isCorrect: boolean;
  userAnswer: number | string;
  message: string;
  misconceptionType?: 'sign_error' | 'operation_order' | 'arithmetic_slip' | 'incomplete_step' | 'none';
  suggestedAction?: string;
}
