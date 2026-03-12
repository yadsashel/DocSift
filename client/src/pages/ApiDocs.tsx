import { motion } from "framer-motion";
import { 
  Terminal, Code2, Cpu, Globe, Lock, CheckCircle, Copy, 
  ChevronRight, Zap, BookOpen, Key, Brain, Check, BarChart3, Layers, Webhook 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const ApiDocs = () => {
  // دالة باش تهبط لـ Section بـ Smooth Scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation - Fixed */}
          <aside className="lg:w-64 shrink-0 hidden lg:block">
            <div className="sticky top-40 space-y-8 border-l border-border/50 pl-6 font-sans">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Introduction</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li onClick={() => scrollToSection('getting-started')} className="hover:text-accent cursor-pointer transition-colors font-medium">Getting Started</li>
                  <li onClick={() => scrollToSection('authentication')} className="hover:text-accent cursor-pointer transition-colors">Authentication</li>
                  <li onClick={() => scrollToSection('rate-limits')} className="hover:text-accent cursor-pointer transition-colors">Rate Limits</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Endpoints</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li onClick={() => scrollToSection('neural-analysis')} className="hover:text-accent cursor-pointer transition-colors">Neural Analysis</li>
                  <li onClick={() => scrollToSection('risk-scoring')} className="hover:text-accent cursor-pointer transition-colors">Risk Scoring</li>
                  <li onClick={() => scrollToSection('batch-processing')} className="hover:text-accent cursor-pointer transition-colors">Batch Processing</li>
                  <li onClick={() => scrollToSection('webhooks')} className="hover:text-accent cursor-pointer transition-colors">Webhooks</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight" id="getting-started">API Documentation</h1>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Build next-gen legal tools using DocSift's intelligence. Our API delivers high-fidelity risk analysis in milliseconds.
              </p>

              {/* Authentication */}
              <section className="mb-24 scroll-mt-32" id="authentication">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-accent/20">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Authentication</h2>
                </div>
                <div className="glass-card p-8 rounded-3xl border border-border/50">
                  <p className="mb-6 text-muted-foreground">Include your key in the header of all requests:</p>
                  <div className="bg-slate-950 rounded-2xl p-6 font-mono text-sm text-slate-300 relative group overflow-x-auto border border-white/5">
                    <code>Authorization: Bearer ds_live_xxxxxxxxxxxx</code>
                  </div>
                </div>
              </section>

              {/* Rate Limits */}
              <section className="mb-24 scroll-mt-32" id="rate-limits">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Rate Limits</h2>
                </div>
                <p className="text-muted-foreground mb-4">Standard limits per plan:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-secondary/20">
                        <p className="text-xs font-bold text-accent uppercase tracking-tighter mb-1">Starter / Pro</p>
                        <p className="text-lg font-bold font-mono">100 req/min</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-secondary/20">
                        <p className="text-xs font-bold text-accent uppercase tracking-tighter mb-1">Enterprise</p>
                        <p className="text-lg font-bold font-mono">Unlimited*</p>
                    </div>
                </div>
              </section>

              {/* Neural Analysis */}
              <section className="mb-24 scroll-mt-32" id="neural-analysis">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Neural Analysis</h2>
                </div>
                <div className="bg-slate-950 rounded-2xl p-6 font-mono text-sm text-slate-300 shadow-xl overflow-x-auto border border-white/5 mb-6">
                  <p className="text-slate-500 mb-2">// POST /v1/audit/neural</p>
                  <pre className="text-xs text-blue-300">
{`{
  "document_url": "https://docs.com/contract.pdf",
  "deep_scan": true
}`}
                  </pre>
                </div>
              </section>

              {/* Risk Scoring */}
              <section className="mb-24 scroll-mt-32" id="risk-scoring">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Risk Scoring</h2>
                </div>
                <p className="text-muted-foreground">Detailed numerical analysis of contract liability exposure (0-100 scale).</p>
              </section>

              {/* Batch Processing */}
              <section className="mb-24 scroll-mt-32" id="batch-processing">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Layers className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Batch Processing</h2>
                </div>
                <p className="text-muted-foreground">Process up to 1,000 documents in a single asynchronous request.</p>
              </section>

              {/* Webhooks */}
              <section className="mb-24 scroll-mt-32" id="webhooks">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <Webhook className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Webhooks</h2>
                </div>
                <p className="text-muted-foreground">Receive real-time JSON updates to your server when a scan is completed.</p>
              </section>

            </motion.div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApiDocs;