import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings2, 
  Heart, 
  Eye, 
  FileText,
  Copy,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [dataWidth, setDataWidth] = useState<number>(32);
  const [safeStrategy, setSafeStrategy] = useState<string>("LOVE_TOKEN");
  const [enableAudit, setEnableAudit] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <button 
                onClick={() => handleCopy(verilogCode)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
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
      </main>
    </div>
  );
}
