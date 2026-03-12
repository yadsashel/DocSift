import { motion } from "framer-motion";
import { Shield, FileText, TrendingUp, Users, BarChart3, CheckCircle } from "lucide-react";

const HeroFloatingCards = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto h-[340px] md:h-[400px] mt-12 md:mt-16">
      {/* Central Analytics Card */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass-card rounded-2xl p-6 w-[280px] md:w-[320px] z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-foreground">Risk Analytics</span>
          <span className="text-xs text-muted-foreground">Monthly</span>
        </div>
        <div className="flex items-end gap-1.5 h-24 mb-3">
          {[35, 52, 40, 65, 48, 72, 58, 80, 68, 90, 75, 95].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm gradient-bg opacity-70" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="text-xs font-medium text-accent">+24.5% detection rate</span>
        </div>
      </motion.div>

      {/* Top-left: Total Contracts */}
      <motion.div
        className="absolute left-[2%] md:left-[8%] top-[5%] glass-card rounded-xl p-4 z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{ duration: 0.6, delay: 0.6, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Contracts</p>
            <p className="text-lg font-bold text-foreground">24,891</p>
          </div>
        </div>
      </motion.div>

      {/* Top-right: Compliance Rate */}
      <motion.div
        className="absolute right-[2%] md:right-[8%] top-[0%] glass-card rounded-xl p-4 z-20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{ duration: 0.6, delay: 0.8, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Compliance Rate</p>
            <p className="text-lg font-bold text-foreground">99.7%</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom-left: Active Users */}
      <motion.div
        className="absolute left-[5%] md:left-[12%] bottom-[5%] glass-card rounded-xl p-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ duration: 0.6, delay: 1, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Active Teams</p>
            <p className="text-lg font-bold text-foreground">500+</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom-right: Risks Detected */}
      <motion.div
        className="absolute right-[3%] md:right-[10%] bottom-[10%] glass-card rounded-xl p-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -12, 0] }}
        transition={{ duration: 0.6, delay: 1.2, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
            <Shield className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Risks Detected</p>
            <p className="text-lg font-bold text-foreground">12,403</p>
          </div>
        </div>
      </motion.div>

      {/* Mini floating badge - Analysis Time */}
      <motion.div
        className="absolute left-[30%] md:left-[28%] top-[2%] glass-card rounded-full px-4 py-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ duration: 0.5, delay: 1.4, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-foreground">&lt;3 min avg</span>
        </div>
      </motion.div>

      {/* Decorative blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-[20%] w-32 h-32 rounded-full bg-accent/8 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-[25%] w-40 h-40 rounded-full bg-accent/6 blur-2xl pointer-events-none" />
    </div>
  );
};

export default HeroFloatingCards;
