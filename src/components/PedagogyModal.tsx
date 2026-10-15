import React from 'react';
import { X, GraduationCap, Brain, Layers, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface PedagogyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PedagogyModal: React.FC<PedagogyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-blue-50/70 via-indigo-50/60 to-purple-50/70 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                University Academic Documentation
              </span>
              <h3 className="text-xl font-bold text-slate-950">
                Pedagogical Framework &amp; AI Integration
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center border border-slate-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Assignment Purpose */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <span>Assignment Objective: AI-Powered Differentiated Learning</span>
            </h4>
            <p className="text-slate-600">
              The <strong>AI Math Differentiator</strong> application is engineered for the university
              <em>Educational Technology &amp; AI</em> curriculum. The platform addresses a classical hurdle in middle
              and early high school algebra: solving two-step linear equations ($ax + b = c$). Rather than offering a one-size-fits-all
              worksheet, the system dynamically tailors mathematical complexity, scaffolding, and pedagogical feedback across three
              distinct developmental stages.
            </p>
          </div>

          {/* Theoretical Foundations */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Grounded in Educational Theories</span>
            </h5>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-indigo-900 block mb-1">Vygotsky's Zone of Proximal Development (ZPD)</strong>
                Students operate in their optimal learning zone by receiving dynamic scaffolding (progressive hints, balance scales)
                that fades as mastery develops.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-indigo-900 block mb-1">Cognitive Load Theory (Sweller)</strong>
                Basic tier eliminates extraneous cognitive load (positive integers, explicit step labels), allowing working memory
                to focus entirely on mastering inverse operations.
              </div>
            </div>
          </div>

          {/* Differentiated Levels Matrix */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3">
              The Three Differentiation Dimensions
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-emerald-950 text-sm">1. Basic — Solve Original Equation</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-semibold">High Scaffolding</span>
                </div>
                <p className="text-slate-700 mb-1.5">
                  <strong>Activity:</strong> Retains the user's exact original equation (e.g. $-3x + 10 = 25$).
                </p>
                <p className="text-slate-600">
                  <strong>Pedagogical Goal:</strong> Procedural fluency through direct inverse operation prompts. The student isolates the variable term and determines the target answer ($x = -5$).
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-blue-950 text-sm">2. Intermediate — Equivalent with Parentheses</span>
                  <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 font-semibold">Algebraic Equivalence</span>
                </div>
                <p className="text-slate-700 mb-1.5">
                  <strong>Activity:</strong> Generates a more complex equation with parentheses (e.g. $-3(x + 2) + 16 = 25$) that simplifies directly to the original equation upon distribution.
                </p>
                <p className="text-slate-600">
                  <strong>Pedagogical Goal:</strong> Teaches algebraic equivalence and the distributive property. Yields the exact same final answer ($x = -5$).
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-purple-950 text-sm">3. Advanced — Real-World Problem Formulation</span>
                  <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-semibold">Mathematical Modeling</span>
                </div>
                <p className="text-slate-700 mb-1.5">
                  <strong>Activity:</strong> Translates the equation into an engaging real-world scenario where the target equation is initially hidden.
                </p>
                <p className="text-slate-600">
                  <strong>Pedagogical Goal:</strong> Dual-stage cognitive challenge: the student must first independently formulate the mathematical equation, then solve for the unknown ($x = -5$).
                </p>
              </div>
            </div>
          </div>

          {/* AI Architecture & Secure Integration */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <h4 className="font-bold text-indigo-950 text-sm mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>Full-Stack AI Architecture &amp; Prompt Engineering</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Server-Side Proxy:</strong> The client never directly calls the AI SDK; all requests route through the Express backend (<code className="font-mono bg-white px-1 py-0.5 rounded">server.ts</code>) using the official <code className="font-mono bg-white px-1 py-0.5 rounded">@google/genai</code> TypeScript SDK.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Dynamic User Problem Differentiation:</strong> Users can input any two-step equation or word problem via the "Enter Your Own Math Problem" interface. The AI dynamically adapts it to Basic (scaffolding &amp; positive integers), Standard (grade-level equality properties), or Advanced (real-world modeling application) with strict mathematical verification.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>JSON Schema Enforcement:</strong> Gemini AI uses strict typed schema validation (<code className="font-mono bg-white px-1 py-0.5 rounded">responseMimeType: "application/json"</code>) ensuring every generated equation has verified steps, equality proofs, pedagogical rationales, and progressive hints.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Misconception Diagnosis:</strong> Incorrect student responses are analyzed to distinguish sign errors (e.g., negative multiplication rules) from inverse operation slips, mimicking an experienced math tutor.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50/70 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
