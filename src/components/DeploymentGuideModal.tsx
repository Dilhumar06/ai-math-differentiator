import React from 'react';
import { X, Terminal, Server, Key, Cloud, ShieldCheck, Check } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiAvailable: boolean;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
  aiAvailable,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                System Guide
              </span>
              <h3 className="text-xl font-bold text-slate-950">
                Running &amp; Deploying AI Math Differentiator
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
          {/* AI Configuration Section */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-600" />
              <h4 className="font-bold text-amber-950 text-sm">
                AI Configuration Status: {aiAvailable ? 'Active & Ready' : 'Key Configuration Required for Live AI'}
              </h4>
            </div>
            <p className="text-xs text-slate-700">
              The application uses <strong>Google Gemini 3.8 Flash</strong> through a server-side proxy (<code className="font-mono bg-white px-1 py-0.5 rounded">server.ts</code>).
              API keys are never exposed in browser bundles.
            </p>
            <div className="p-3 bg-white rounded-xl border border-amber-200/70 text-xs space-y-1.5">
              <p className="font-semibold text-slate-900">Setting up the Gemini API Key:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>In AI Studio: Open the <strong>Settings &gt; Secrets</strong> tab.</li>
                <li>Add secret: <code className="font-mono bg-slate-100 text-purple-700 px-1 py-0.5 rounded">GEMINI_API_KEY</code> = your Gemini API Key.</li>
                <li>When running locally: create a <code className="font-mono bg-slate-100 text-slate-800 px-1 py-0.5 rounded">.env</code> file with <code className="font-mono bg-slate-100 text-slate-800 px-1 py-0.5 rounded">GEMINI_API_KEY=your_key_here</code>.</li>
              </ul>
              <p className="text-emerald-700 font-medium pt-1">
                ✓ Live AI is currently active! You can test differentiation immediately.
              </p>
            </div>
          </div>

          {/* How to Test AI Differentiation in the App */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
            <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
              <Check className="w-4 h-4 text-indigo-600" />
              <span>How to Test the AI Functionality</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 leading-relaxed">
              <li>
                <strong>Select a Difficulty Tier</strong> (e.g. <em>Basic</em>, <em>Standard</em>, or <em>Advanced</em>).
              </li>
              <li>
                <strong>Enter Your Own Problem</strong> into the text area (e.g., <code className="font-mono bg-white px-1.5 py-0.5 rounded text-indigo-800 border">3x + 7 = 22</code> or click one of the quick presets).
              </li>
              <li>
                Click <strong>"Differentiate My Problem"</strong>. The backend will invoke Gemini AI, adapt the problem specifically for that tier, and display the adaptation rationale and model metadata.
              </li>
              <li>
                Switch the level to <strong>Advanced</strong> and click <strong>"Differentiate My Problem"</strong> again to see the same problem transformed into a multi-step real-world application!
              </li>
              <li>
                Click <strong>"Generate New Task"</strong> to generate a brand new problem from scratch using the AI model.
              </li>
            </ol>
          </div>

          {/* Running Locally */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Running Locally in Development</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 overflow-x-auto shadow-inner">
              <div>
                <span className="text-slate-400"># 1. Install dependencies</span>
                <p className="text-emerald-400">npm install</p>
              </div>
              <div>
                <span className="text-slate-400"># 2. Launch full-stack dev server (Express + Vite) on port 3000</span>
                <p className="text-emerald-400">npm run dev</p>
              </div>
              <div>
                <span className="text-slate-400"># Open browser at:</span>
                <p className="text-blue-300">http://localhost:3000</p>
              </div>
            </div>
          </div>

          {/* Production Build & Deployment */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-600" />
              <span>Production Build &amp; Cloud Deployment</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 overflow-x-auto shadow-inner">
              <div>
                <span className="text-slate-400"># 1. Build frontend assets with Vite</span>
                <p className="text-emerald-400">npm run build</p>
              </div>
              <div>
                <span className="text-slate-400"># 2. Start full-stack Node server serving static dist and API</span>
                <p className="text-emerald-400">npm run start</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              The project is container-ready for Google Cloud Run, Vercel, or Docker with standard Node.js 22 runtime.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50/70 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
