import React from "react";
import { motion } from "framer-motion";
import { 
  UploadCloud, ShieldCheck, BarChart3, FileSearch, 
  Zap, ArrowRight, Target, Cpu 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- IMPORT IMAGES FROM SRC/ASSETS ---
// تأكد أن السميات مطابقين لداكشي اللي عندك فالفولدر
import dashboardOverview from "@/assets/dashboard-overview.png";
import documentVault from "@/assets/document-vault.png";
import documentAnalysisDetail from "@/assets/document-analysis-detail.png";
import uploadTerminal from "@/assets/upload-terminal.png";
import apiManagement from "@/assets/api-management.png";
import userSettings from "@/assets/user-settings.png";
import teamMeeting from "@/assets/team-meeting.jpg";
import contractReview from "@/assets/contract-review.jpg";
import modernOffice from "@/assets/modern-office.jpg";

// Animations Logic
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const HowItWorks = () => {
  const navigate = useNavigate();

  const protocolSteps = [
    {
      icon: <UploadCloud className="h-8 w-8 text-accent" />,
      title: "Asset Injection",
      tag: "Step 01",
      description: "Securely upload your legal contracts into the Neural Vault. Our system immediately begins decryption and indexing.",
      img: uploadTerminal
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-accent" />,
      title: "Neural Verification",
      tag: "Step 02",
      description: "The AI engine scans for 'Anomalies'—detecting non-standard clauses or liability gaps using pattern recognition.",
      img: documentVault
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
      title: "Risk Quantification",
      tag: "Step 03",
      description: "We calculate a real-time Risk Index. Every segment of your document is cross-referenced with global standards.",
      img: dashboardOverview
    },
    {
      icon: <FileSearch className="h-8 w-8 text-accent" />,
      title: "Intelligence Audit",
      tag: "Step 04",
      description: "Synthesis of data into a professional Intelligence Audit—an actionable report detailing every critical risk factor.",
      img: apiManagement
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(210 40% 96%) 0%, hsl(var(--background)) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
              <Cpu className="h-4 w-4" /> Proprietary Neural Protocol v2.0
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 italic">
              How the <span className="gradient-text uppercase font-black tracking-tighter">Neural System</span> <br/> Processes Your Data
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ===== CORE ANALYSIS SECTION (The Circle Chart) ===== */}
      <section className="py-20 border-y border-border/50 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-4 rounded-[2.5rem] shadow-2xl border-accent/20 overflow-hidden bg-white/50 backdrop-blur-md">
                <img 
                  src={documentAnalysisDetail} 
                  alt="Neural Risk Core" 
                  className="w-full h-auto rounded-3xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-5 rounded-2xl shadow-xl">
                <Target className="h-6 w-6" />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">The Analysis Core</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">Real-time Risk Indexing</motion.h2>
              <motion.div variants={stagger} className="space-y-4">
                {["Compliance Indexing", "Anomaly Detection", "Health Score"].map((label, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-center justify-between p-5 rounded-2xl glass-card border-border/40">
                    <span className="font-bold text-foreground text-xs uppercase tracking-widest">{label}</span>
                    <span className="text-accent font-black tracking-tighter">Verified</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PROTOCOL STEPS WITH UI PREVIEWS ===== */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Operational <span className="gradient-text tracking-normal italic font-bold">Protocol</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {protocolSteps.map((step, i) => (
              <motion.div 
                key={i} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="glass-card-hover p-0 rounded-[3rem] overflow-hidden group border border-border/40"
              >
                <div className="h-64 overflow-hidden border-b border-border/40 relative">
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-accent/10 rounded-xl text-accent">{step.icon}</div>
                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">{step.tag}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="gradient-bg p-12 md:p-24 rounded-[4rem] text-primary-foreground shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-10 pointer-events-none" />
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 relative z-10 italic">Ready to deploy <br/> Intelligence?</h2>
             <Button variant="secondary" size="lg" className="h-16 px-12 rounded-2xl font-black uppercase tracking-[0.2em] relative z-10" asChild>
                <Link to="/signup">Access Terminal <ArrowRight className="ml-2 h-5 w-5" /></Link>
             </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;