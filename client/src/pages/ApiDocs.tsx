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
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0 hidden lg:block">
            <div className="sticky top-40 space-y-8 border-l border-border/50 pl-6 font-sans">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Introduction</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li onClick={() => scrollToSection('getting-started')} className="hover:text-accent cursor-pointer transition-colors font-medium">Overview</li>
                  <li onClick={() => scrollToSection('authentication')} className="hover:text-accent cursor-pointer transition-colors">Authentication</li>
                  <li onClick={() => scrollToSection('rate-limits')} className="hover:text-accent cursor-pointer transition-colors">Rate Limits</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Endpoints</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li onClick={() => scrollToSection('neural-analysis')} className="hover:text-accent cursor-pointer transition-colors">Neural Analysis</li>
                  <li onClick={() => scrollToSection('risk-scoring')} className="hover:text-accent cursor-pointer transition-colors">Risk Scoring</li>
                  <li onClick={() => scrollToSection('privacy-headers')} className="hover:text-accent cursor-pointer transition-colors">Privacy Headers</li>
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
                Integrate DocSift's privacy-first NLP into your workflow. Our API provides local-host neural processing to ensure your legal documents never stay on third-party servers.
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
                  <p className="mb-6 text-muted-foreground">All requests to the DocSift API must include your API Key in the <code className="text-accent font-bold">Authorization</code> header:</p>
                  <div className="bg-slate-950 rounded-2xl p-6 font-mono text-sm text-slate-300 relative group overflow-x-auto border border-white/5">
                    <code>Authorization: Bearer ds_live_salhi_xxxxxxxxxxxx</code>
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
                <p className="text-muted-foreground mb-6">Initialize a deep audit of your legal contracts using local-first NLP engines.</p>
                <div className="bg-slate-950 rounded-2xl p-6 font-mono text-sm text-slate-300 shadow-xl overflow-x-auto border border-white/5 mb-6">
                  <p className="text-slate-500 mb-2">// POST https://client-chi-fawn.vercel.app/api/v1/audit/neural</p>
                  <pre className="text-xs text-blue-300">
{`{
  "document_url": "https://api.example.com/v1/assets/contract_sample.pdf",
  "analysis_mode": "privacy_first",
  "deep_scan": true
}`}
                  </pre>
                </div>
              </section>

              {/* Privacy Headers Section */}
              <section className="mb-24 scroll-mt-32" id="privacy-headers">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Privacy Headers</h2>
                </div>
                <p className="text-muted-foreground mb-4">DocSift supports strict data residency. Control where your metadata is stored:</p>
                <div className="bg-slate-950 rounded-2xl p-6 font-mono text-sm text-slate-300 border border-white/5">
                    <code>X-DocSift-Sovereignty: local-only</code>
                </div>
              </section>

              {/* Webhooks */}
              <section className="mb-24 scroll-mt-32" id="webhooks">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <Webhook className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Webhooks</h2>
                </div>
                <p className="text-muted-foreground mb-4">Receive real-time results once the neural engine completes its audit.</p>
                <div className="bg-slate-950 rounded-2xl p-6 font-mono text-sm text-slate-300 border border-white/5">
                  <p className="text-slate-500 mb-2">// Sample JSON Payload</p>
                  <pre className="text-xs text-green-300">
{`{
  "event": "audit.completed",
  "risk_score": 88,
  "vulnerabilities": ["indemnity_gap", "liability_limit_exceeded"],
  "processing_time": "420ms"
}`}
                  </pre>
                </div>
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