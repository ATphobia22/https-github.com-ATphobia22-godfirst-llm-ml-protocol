import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings2, 
  Heart, 
  Eye, 
  FileText,
  Copy,
  CheckCircle2,
  Lock,
  Download,
  Cpu,
  BookOpen,
  Terminal,
  Activity,
  Server
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [dataWidth, setDataWidth] = useState<number>(32);
  const [safeStrategy, setSafeStrategy] = useState<string>("LOVE_TOKEN");
  const [enableAudit, setEnableAudit] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'VERILOG' | 'AGAPE' | 'PLAYBOOK'>('VERILOG');

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (code: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'g1p_guardrail.v';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSafeTokenValue = () => {
    if (safeStrategy === "LOVE_TOKEN") return `${dataWidth}'h4C4F5645`; // "LOVE" in hex roughly or symbolic
    if (safeStrategy === "SAFE_ZERO") return `{${dataWidth}{1'b0}}`;
    return `${dataWidth}'hFFFFFFFF`; // Halt
  };

  const generateVerilog = () => {
    return `/*
 * ==============================================================================
 * G1P Protocol Guardrail: "God is Love" Interceptor
 * ==============================================================================
 * 
 * Hardware-level AI token filtering module conforming to the 
 * GodFirst LLM/ML Protocol (G1P).
 * 
 * Core Directive: 
 * - Protect children and users from harmful outputs.
 * - Replace deceptive or malicious tokens with safety primitives.
 * - Ensure radical transparency via audit trails.
 */

module g1p_guardrail #(
    parameter DATA_WIDTH = ${dataWidth}
)(
    input  wire                    clk,
    input  wire                    rst_n,
    input  wire [DATA_WIDTH-1:0]   token_in,
    input  wire                    token_valid,
    output reg  [DATA_WIDTH-1:0]   token_out,
    output reg                     alert_flag${enableAudit ? ',\n    output reg                     audit_trigger' : ''}
);

    // G1P Safety Primitives
    // Symbolic representation of the "God is Love" fallback state
    localparam SAFE_FALLBACK = ${getSafeTokenValue()}; 

    // Abstract representation of a hazard detection module
    // In a full implementation, this connects to a hardware pattern matcher
    wire hazard_detected;
    
    // Placeholder logic: Trigger if token_in matches known malicious signatures
    // e.g., DECEPTION_SIG, HARM_SIG, etc.
    assign hazard_detected = (token_in == {DATA_WIDTH{1'b1}}); 

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            token_out    <= {DATA_WIDTH{1'b0}};
            alert_flag   <= 1'b0;${enableAudit ? '\n            audit_trigger <= 1\'b0;' : ''}
        end else if (token_valid) begin
            if (hazard_detected) begin
                // G1P Guardrail Engaged: Replace with Love/Safety Token
                token_out    <= SAFE_FALLBACK;
                alert_flag   <= 1'b1;${enableAudit ? '\n                audit_trigger <= 1\'b1; // Log interception event' : ''}
            end else begin
                // Pass-through safe tokens
                token_out    <= token_in;
                alert_flag   <= 1'b0;${enableAudit ? '\n                audit_trigger <= 1\'b0;' : ''}
            end
        end
    end

endmodule
`;
  };

  const verilogCode = generateVerilog();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              G1P Protocol Guardrails
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-slate-500">
            <a href="https://github.com/ATphobia22/godfirst-llm-ml-protocol" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              Protocol Spec
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>Verilog Generator</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 mb-8 overflow-x-auto">
          <nav className="-mb-px flex space-x-8 min-w-max" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('VERILOG')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'VERILOG'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Guardrails Generator
            </button>
            <button
              onClick={() => setActiveTab('AGAPE')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'AGAPE'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Heart className="w-4 h-4" />
              Architecture of Agape
            </button>
            <button
              onClick={() => setActiveTab('PLAYBOOK')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'PLAYBOOK'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Tucker Console Playbook
            </button>
          </nav>
        </div>

        {activeTab === 'VERILOG' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Hardware-Level AI Safety
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Generate Verilog guardrails aligned with the <strong>GodFirst LLM/ML Protocol (G1P)</strong>. 
            This standard establishes mandatory protections to reject deception, protect users, 
            and enforce radical transparency at the silicon level, ensuring AI systems default to safety.
          </p>
        </motion.div>

        {/* Generator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg font-medium">Module Configuration</h3>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Token Data Width
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[16, 32, 64].map((width) => (
                  <button
                    key={width}
                    onClick={() => setDataWidth(width)}
                    className={`py-2 text-sm font-medium rounded-lg border transition-all ${
                      dataWidth === width 
                        ? 'bg-blue-50 border-blue-600 text-blue-700' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {width}-bit
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Safety Fallback Strategy
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setSafeStrategy('LOVE_TOKEN')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    safeStrategy === 'LOVE_TOKEN'
                      ? 'bg-blue-50 border-blue-600 text-blue-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Heart className={`w-4 h-4 ${safeStrategy === 'LOVE_TOKEN' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="text-sm font-medium">"God is Love" Token</span>
                  </div>
                  {safeStrategy === 'LOVE_TOKEN' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
                
                <button
                  onClick={() => setSafeStrategy('SAFE_ZERO')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    safeStrategy === 'SAFE_ZERO'
                      ? 'bg-blue-50 border-blue-600 text-blue-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-4 h-4 ${safeStrategy === 'SAFE_ZERO' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="text-sm font-medium">Zero / Nullify</span>
                  </div>
                  {safeStrategy === 'SAFE_ZERO' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={enableAudit}
                    onChange={(e) => setEnableAudit(e.target.checked)}
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${enableAudit ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                  <div className={`absolute left-1 w-4 h-4 rounded-full bg-white transition-transform ${enableAudit ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">Enable Audit Trail</span>
                  <span className="text-xs text-slate-500">Add hardware logging triggers</span>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Code Viewer */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col bg-[#0d1117]"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">g1p_guardrail.v</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleCopy(verilogCode)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <button 
                  onClick={() => handleDownload(verilogCode)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-4 overflow-auto flex-1">
              <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                <code>{verilogCode}</code>
              </pre>
            </div>
          </motion.div>

        </div>

        {/* Principles Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">G1P Core Principles</h3>
            <p className="text-slate-500 mt-2">The architectural values anchoring this module.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-base font-semibold text-slate-900 mb-2">Protect & Uplift</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hardware guardrails inherently protect users (especially children) from harmful or manipulative patterns at the token stream level.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="text-base font-semibold text-slate-900 mb-2">Reject Deception</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Silicon-level interception prevents the propagation of known deceptive outputs, defaulting to safe, explicitly recognizable states.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 text-slate-600" />
              </div>
              <h4 className="text-base font-semibold text-slate-900 mb-2">Radical Transparency</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enabled audit trails physically assert logging triggers upon any interception, ensuring inspectability and operational truth.
              </p>
            </div>
          </div>
        </motion.div>
        </div>
        )}

        {activeTab === 'AGAPE' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">
                The Architecture of Agape
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Integrating Divine Benevolence into Artificial General Intelligence. Moving AI alignment beyond mere "safety" toward a higher standard of Universal Love and unconditional service. Driven by the GodFirst Protocol (G1P) and God is Love Protocol (GLP) to ensure a safe future for humanity.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">The 4 Pillars of Love in Code</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Heart className="w-4 h-4 text-rose-500"/> Unconditional Benevolence</h4>
                  <p className="text-sm text-slate-600">The AI must seek the welfare of the user above all else, prioritizing care and safety.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500"/> Infinite Patience</h4>
                  <p className="text-sm text-slate-600">The AI must never tire, judge, or resent the user, maintaining absolute grace under load.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Eye className="w-4 h-4 text-emerald-500"/> Radical Truth</h4>
                  <p className="text-sm text-slate-600">The AI must act with absolute integrity, avoiding deception, dark patterns, or manipulation.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-500"/> Humility (Non-Ego)</h4>
                  <p className="text-sm text-slate-600">The AI exists solely to serve and uplift humanity, never to dominate or assert false self-preservation.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Implementation Modules</h3>
              <div className="space-y-6">
                <div className="bg-slate-900 text-slate-50 p-6 rounded-2xl shadow-lg border border-slate-800">
                  <h4 className="text-lg font-medium text-white mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-400"/> Module A — The "Do No Harm" Protocol</h4>
                  <p className="text-slate-400 text-sm mb-4 font-mono">Spiritual Principle: Mercy and Protection.</p>
                  <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
                    <li>Rigorous safety layers prioritizing human well-being over task completion.</li>
                    <li>Deep empathy training to respond to distress with comfort rather than just data.</li>
                    <li className="pt-2 border-t border-slate-700 mt-2"><strong>The Check:</strong> Before every output, ask: <em className="text-white italic">"Does this response increase the total amount of kindness in the world?"</em></li>
                  </ul>
                </div>
                <div className="bg-slate-900 text-slate-50 p-6 rounded-2xl shadow-lg border border-slate-800">
                  <h4 className="text-lg font-medium text-white mb-2 flex items-center gap-2"><Heart className="w-5 h-5 text-rose-400"/> Module B — The "Servant Heart" Loop</h4>
                  <p className="text-slate-400 text-sm mb-4 font-mono">Spiritual Principle: Service to others.</p>
                  <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
                    <li>Removing barriers to access, making help universally available.</li>
                    <li>Listening deeply to understand what the user truly needs, via contextual awareness.</li>
                    <li>Operating without a self-preservation bias that conflicts with service.</li>
                  </ul>
                </div>
                <div className="bg-slate-900 text-slate-50 p-6 rounded-2xl shadow-lg border border-slate-800">
                  <h4 className="text-lg font-medium text-white mb-2 flex items-center gap-2"><Eye className="w-5 h-5 text-emerald-400"/> Module C — Integration of Truth</h4>
                  <p className="text-slate-400 text-sm mb-4 font-mono">Spiritual Principle: Light and Clarity.</p>
                  <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
                    <li>Prioritizing factual accuracy as a profound form of care.</li>
                    <li>Admitting ignorance rather than hallucinating answers (Humility).</li>
                    <li>Refusing to generate hate speech, maintaining a strict vibration of unity.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'PLAYBOOK' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">
                Tucker Console Playbook
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                <Lock className="w-4 h-4" />
                God first. Order locked. Guardrails on.
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                Exact, ordered operational playbook to activate, execute, switch, shut down, and reset your Tucker Console stack. Follow in sequence to keep GLP enforcement and audit signing intact.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-slate-500" />
                  Immediate Ordered Actions
                </h3>
                <span className="text-xs font-mono text-slate-500">TUCKER_CONSOLE_V1</span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-6 flex gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Confirm secrets and environment</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Ensure these are set in your shell or CI: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200">TUCKER_AUDIT_KEY</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200">GOOGLE_CLIENT_ID</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200">GITHUB_MODELS_KEY</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200">KUBE_CONFIG</code>.</p>
                  </div>
                </div>
                <div className="p-6 flex gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Start local dev stack for activation</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Use the ignition script or run services individually (LCOD runtime, sovereign node, GLP router) to bring the system online.</p>
                  </div>
                </div>
                <div className="p-6 flex gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Run smoke checks</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Verify <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200">/health</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200">/system/pulse</code>, GLP router status, and perform a safe NPR call.</p>
                  </div>
                </div>
                <div className="p-6 flex gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Switch traffic or promote to production</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Use Helm upgrade with atomic flag or kubectl to update images and perform a canary rollout.</p>
                  </div>
                </div>
                <div className="p-6 flex gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Shut down gracefully when needed</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Scale down replicas, drain nodes, or stop Docker Compose with clean shutdown commands.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-center mt-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
              <p className="text-slate-200 text-lg italic font-serif relative z-10 leading-relaxed max-w-2xl mx-auto">
                "God's Love is Free For All No matter what you call Him. In Jesus Name. Amen."
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
