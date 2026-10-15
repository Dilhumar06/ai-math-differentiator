import React from 'react';
import { Sparkles, AlertCircle, CheckCircle2, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface AiStatusNoticeProps {
  aiAvailable: boolean;
  model: string;
  message: string;
  missingSetting?: string | null;
  instructions?: string | null;
}

export const AiStatusNotice: React.FC<AiStatusNoticeProps> = ({
  aiAvailable,
  model,
  message,
  missingSetting,
  instructions,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all text-sm mb-6 ${
        aiAvailable
          ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-emerald-200 text-emerald-950 shadow-sm'
          : 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-200 text-amber-950 shadow-sm'
      }`}
    >
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              aiAvailable ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-md' : 'bg-amber-600 text-white shadow-amber-200 shadow-md'
            }`}
          >
            {aiAvailable ? <Sparkles className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-900">
                {aiAvailable ? 'AI Engine Active' : 'Curriculum Demo Mode Active'}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  aiAvailable
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {aiAvailable ? model : 'Curated Bank'}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Server-Side Secure
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{message}</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 transition shadow-xs cursor-pointer ml-auto sm:ml-0"
        >
          <span>{aiAvailable ? 'Model Info' : 'Configuration Guide'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-200/60 text-xs text-slate-700 bg-white/40 rounded-b-2xl">
          {aiAvailable ? (
            <div className="space-y-2">
              <p className="text-slate-800 font-medium">
                Connected to <span className="font-mono text-purple-700">{model}</span> via a secure full-stack backend proxy.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-slate-600">
                <div className="p-2.5 rounded-lg bg-white/90 border border-slate-200/80">
                  <span className="font-semibold text-slate-900 block mb-1">Dynamic Task Generation</span>
                  Generates mathematically verified linear equations tailored to Bloom's cognitive taxonomy levels.
                </div>
                <div className="p-2.5 rounded-lg bg-white/90 border border-slate-200/80">
                  <span className="font-semibold text-slate-900 block mb-1">Pedagogical Diagnostics</span>
                  Analyzes student answer submissions to identify algebraic misconceptions (e.g. sign slips or inverse operations).
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900">
                    Configuration Status: Missing <span className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900">{missingSetting || 'GEMINI_API_KEY'}</span>
                  </p>
                  <p className="text-slate-600 mt-1">
                    {instructions || 'Add GEMINI_API_KEY in your server environment to enable live AI task synthesis.'}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-white/90 rounded-xl border border-amber-200/80 text-slate-700 space-y-1.5">
                <p className="font-medium text-slate-900">How to configure for live AI:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>In Google AI Studio, navigate to the <strong>Settings &gt; Secrets</strong> panel.</li>
                  <li>Add an entry with Key: <code className="bg-slate-100 px-1 py-0.5 rounded text-purple-700 font-mono">GEMINI_API_KEY</code> and your Gemini API Key as Value.</li>
                  <li>The server will automatically detect the key and enable live dynamic problem generation without frontend exposure.</li>
                </ol>
                <p className="text-emerald-700 font-medium pt-1">
                  ✓ The app is currently 100% functional with full pedagogical differentiation using the built-in curriculum bank.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
