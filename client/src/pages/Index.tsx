import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, FileSearch, BarChart3, Upload, Lock, Zap, CheckCircle, ArrowRight, Star, FileText, Eye, Brain, Users, Globe, Server, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroFloatingCards from "@/components/landing/HeroFloatingCards";
import teamMeeting from "@/assets/team-meeting.jpg";
import contractReview from "@/assets/contract-review.jpg";
import dataCenter from "@/assets/data-center.jpg";
import modernOffice from "@/assets/modern-office.jpg";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(210 40% 96%) 0%, hsl(210 60% 92%) 30%, hsl(200 70% 88%) 60%, hsl(199 60% 85%) 80%, hsl(var(--background)) 100%)" }}>
        {/* Mesh gradient orbs */}
        <div className="absolute top-10 right-[10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[hsl(216_72%_25%/0.08)] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-[30%] w-[350px] h-[350px] rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
        <div className="absolute top-[20%] left-[40%] w-[200px] h-[200px] rounded-full bg-[hsl(195_100%_42%/0.07)] blur-[60px] pointer-events-none" />

        {/* Floating icons */}
        <motion.div className="absolute top-32 right-[15%] hidden lg:block" animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="glass-card p-3 rounded-xl shadow-lg">
            <Shield className="h-6 w-6 text-accent" />
          </div>
        </motion.div>
        <motion.div className="absolute top-60 left-[10%] hidden lg:block" animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <div className="glass-card p-3 rounded-xl shadow-lg">
            <FileSearch className="h-6 w-6 text-accent" />
          </div>
        </motion.div>
        <motion.div className="absolute bottom-20 left-[20%] hidden lg:block" animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
          <div className="glass-card p-3 rounded-xl shadow-lg">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
        </motion.div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
              <Zap className="h-4 w-4" />
              AI-Powered Contract Intelligence
            </motion.div>

            <motion.h1 variants={fadeInUp} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Detect Contract{" "}
              <span className="gradient-text">Blind Spots</span>{" "}
              Before They Cost You Millions
            </motion.h1>

            <motion.p variants={fadeInUp} transition={{ duration: 0.6 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              DocSift uses advanced AI to scan, analyze, and audit every clause in your vendor contracts detecting hidden risks and ensuring full compliance in minutes, not months.
            </motion.p>

            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gradient" size="lg" className="text-base px-8 h-12" asChild>
                <Link to="/signup">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline-accent" size="lg" className="text-base px-8 h-12" asChild>
                <Link to="/contact">Book a Demo</Link>
              </Button>
            </motion.div>
          </motion.div>

          <HeroFloatingCards />
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
            Trusted by leading enterprises worldwide
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {["Deloitte", "McKinsey & Co", "Goldman Sachs", "JPMorgan Chase", "Accenture", "KPMG"].map(name => (
              <span key={name} className="text-lg font-bold text-muted-foreground/40 tracking-wide">{name}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center max-w-2xl mx-auto mb-16">
            <motion.p variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Features</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to <span className="gradient-text">Protect Your Business</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">Comprehensive contract intelligence that gives your legal and compliance teams superpowers.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileSearch, title: "Contract Analysis", desc: "AI scans every clause, identifying ambiguities, unfavorable terms, and missing provisions across thousands of pages." },
              { icon: Shield, title: "Risk Detection", desc: "Automatically detect hidden liabilities, auto-renewal traps, and non-standard indemnification clauses." },
              { icon: BarChart3, title: "Compliance Monitoring", desc: "Continuous monitoring against GDPR, CCPA, SOX, and industry-specific regulatory frameworks." },
              { icon: Eye, title: "Vendor Auditing", desc: "Score and rank vendor agreements, track SLA adherence, and flag deviations from your standard terms." },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="glass-card-hover rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center max-w-2xl mx-auto mb-16">
            <motion.p variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Three Simple Steps to <span className="gradient-text">Full Visibility</span></motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", icon: Upload, title: "Upload Your Contracts", desc: "Drag and drop PDFs, DOCX files, or connect your document management system. We support batch uploads of thousands of documents.", img: contractReview },
              { step: "02", icon: Brain, title: "AI Analyzes Every Clause", desc: "Our proprietary AI engine processes each document, cross-referencing against regulatory frameworks and your custom policies.", img: modernOffice },
              { step: "03", icon: CheckCircle, title: "Get Actionable Insights", desc: "Receive a detailed risk report with severity ratings, remediation suggestions, and compliance scores all in minutes.", img: teamMeeting },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="gradient-bg text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Step {item.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "10,000+", label: "Legal Rules" },
              { value: "99.7%", label: "Detection Accuracy" },
              { value: "100%", label: "Privacy Guaranteed" },
              { value: "<3min", label: "Avg. Analysis Time" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <p className="text-3xl md:text-4xl font-extrabold gradient-text mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SECURITY / API SECTION (Updated content, same design) ===== */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">REST API v1.0</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">Integrate Contract Intelligence into Your Workflow</motion.h2>
              <motion.p variants={fadeInUp} className="text-primary-foreground/70 mb-8 leading-relaxed">
                Connect DocSift to your CLM, ERP, or custom-built internal tools. Our robust API allows for batch processing and real-time risk webhooks.
              </motion.p>
              <motion.div variants={stagger} className="space-y-4 mb-8">
                {[
                  "Webhooks for instant risk alerts",
                  "JSON-structured audit reports",
                  "SOC 2 compliant data handling",
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-primary-foreground/80">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                  <Link to="/apidocs">Read API Docs</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl overflow-hidden glow">
                <img src={dataCenter} alt="Enterprise Security" className="w-full h-80 lg:h-96 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center max-w-2xl mx-auto mb-16">
            <motion.p variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold">Loved by Legal & Compliance Teams</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { quote: "DocSift reduced our contract review time by 85%. We caught a $4.2M liability clause that our team had missed across 3 review cycles.", name: "Sarah Chen", role: "General Counsel, TechForge Inc." },
              { quote: "The vendor compliance auditing alone saved us from two major regulatory penalties. It's now indispensable to our procurement workflow.", name: "Michael Torres", role: "VP of Compliance, Meridian Capital" },
              { quote: "We process over 10,000 vendor contracts annually. DocSift handles the entire pipeline with incredible accuracy and speed.", name: "Amanda Liu", role: "Head of Legal Ops, Vertex Global" },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeInUp} className="glass-card-hover rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-warning text-warning" />)}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PRICING (Updated with Real SaaS Logic, Design Unchanged) ===== */}
      <section id="pricing" className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center max-w-2xl mx-auto mb-16">
            <motion.p variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Pricing</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Plans That Scale With Your Business</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">Start free. Upgrade when you're ready.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: "$0", period: "/month", desc: "Explore neural auditing", features: ["10 Neural Credits/month", "Standard Risk Detection", "Email Support", "Manual PDF Uploads", "No API Access"], popular: false },
              { name: "Pro", price: "$49", period: "/month", desc: "For solo legal professionals", features: ["200 Neural Credits/month", "Advanced AI Analysis", "Priority Email Support", "API Access (Standard)", "90-Day Audit History", "Custom Risk Policies"], popular: true },
              { name: "Enterprise", price: "$199", period: "/month", desc: "For high-volume business", features: ["1500 Neural Credits/month", "Unlimited API Requests", "Dedicated Success Manager", "Custom Policy Training", "SSO & SCIM Security", "24/7 Phone Support"], popular: false },
            ].map((plan, i) => (
              <motion.div key={i} variants={fadeInUp} className={`rounded-2xl p-8 relative ${plan.popular ? "gradient-bg text-primary-foreground glow scale-[1.02]" : "glass-card-hover"}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warning text-warning-foreground text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-accent"}`} />
                      <span className={plan.popular ? "text-primary-foreground/80" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "secondary" : "gradient"} className="w-full" asChild>
                  <Link to={`/signup?plan=${plan.name.toLowerCase()}`}>Get Started</Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="section-padding">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">FAQ</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
            {[
              { q: "What are Neural Credits?", a: "One Neural Credit allows you to audit one document (up to 100 pages). Credits reset every month based on your selected plan." },
              { q: "How does the API Access work?", a: "Our REST API allows you to integrate DocSift's auditing engine directly into your software. Pro includes standard rate limits, while Enterprise is custom-tailored." },
              { q: "Is my data secure?", a: "Absolutely. DocSift is SOC 2 Type II certified, encrypts all data with AES-256, and never uses your documents to train our public models." },
              { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel or downgrade your plan at any time through your dashboard settings." },
              { q: "How long does it take to analyze a contract?", a: "Most contracts are fully analyzed in under 3 minutes. Batch processing of large document sets is available on Enterprise plans." },
            ].map((faq, i) => (
              <motion.details key={i} variants={fadeInUp} className="glass-card rounded-xl group">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-foreground font-medium list-none">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">{faq.a}</div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-padding gradient-bg text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-2xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">Ready to Eliminate Contract Blind Spots?</motion.h2>
            <motion.p variants={fadeInUp} className="text-primary-foreground/70 text-lg mb-8">Designed for High-Growth Legal Teams to protect their business. Start your free trial today no credit card required.</motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="secondary" size="lg" className="text-base px-8 h-12" asChild>
                <Link to="/signup">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;