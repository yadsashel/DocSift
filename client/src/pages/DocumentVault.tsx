import React, { useState, useEffect, useCallback } from "react";
import { FileText, Search, Filter, Download, X, Target, ChevronRight, Activity, Zap, Clock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useSearchParams, useNavigate } from "react-router-dom"; // زدنا useNavigate للحماية
import { motion, AnimatePresence } from "framer-motion";

// ✅ الرابط العالمي من ملف الـ .env
const API_URL = import.meta.env.VITE_API_URL;

const DocumentVault = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [exporting, setExporting] = useState(false);

  const COLORS = ['#6366f1', '#f59e0b', '#10b981'];

  // --- 🛠️ المصلّح (The Filtered Fetch) ---
  const fetchDocs = useCallback(async () => {
    // 1. جبد الـ user_id من الـ localStorage
    const userId = localStorage.getItem("user_id");

    // 2. حماية: إيلا ماكاينش ID، صيفطو لـ Login أو حبس الـ Loading
    if (!userId) {
      console.error("🔒 Access Denied: No user_id found.");
      setLoading(false);
      // navigate("/login"); // تقدر تفعل هادي إيلا بغيتي يخرج نيشان
      return;
    }

    try {
      setLoading(true);
      // 3. صيفط الـ user_id كـ Query Parameter للـ Backend
      const res = await fetch(`${API_URL}/files?user_id=${userId}`);
      
      if (!res.ok) throw new Error("Failed to sync with vault");
      
      const data = await res.json();
      setDocuments(data);
      
      // التعامل مع الـ Direct Link (إيلا جاي من Dashboard بـ ID معين)
      const targetId = searchParams.get("id");
      if (targetId) {
        const found = data.find((d: any) => d.id === targetId);
        if (found) setSelectedDoc(found);
      }
    } catch (e) {
      console.error("❌ Vault Sync Error:", e);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const handleExportAudit = async (fileId: string, fileName: string) => {
    setExporting(true);
    try {
      const response = await fetch(`${API_URL}/generate-report/${fileId}`);
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Neural_Audit_${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Export Error:", error);
    } finally {
      setExporting(false);
    }
  };

  const filtered = documents.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-background text-accent font-black tracking-[0.4em] animate-pulse uppercase text-[10px]">
      Decrypting Vault Assets...
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground p-4 md:p-8 max-w-[1600px] mx-auto overflow-x-hidden">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 blur-[100px]" />
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10 border-b border-border/40 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[9px] font-black uppercase tracking-[0.2em] mb-2">
            <Zap className="h-3 w-3 fill-current" /> Neural Artifacts
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            Document <span className="gradient-text">Vault</span>
          </h1>
          <p className="text-[10px] font-black text-muted-foreground opacity-60 uppercase tracking-[0.3em]">
            {documents.length} Verified Nodes
          </p>
        </div>
        <Button className="h-14 px-10 rounded-2xl font-black text-xs uppercase tracking-widest bg-accent hover:scale-105 transition-all shadow-2xl shadow-accent/20" onClick={() => navigate("/upload")}>
          Inject New Asset
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <input 
            placeholder="FILTER VAULT BY IDENTIFIER..." 
            className="w-full pl-12 h-14 bg-muted/20 border border-border/40 rounded-2xl text-[10px] font-black tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            value={search} 
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-card rounded-3xl border border-border/40 shadow-2xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/40 border-b border-border/20">
              <tr>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Asset Name</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest hidden md:table-cell">Health Status</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest hidden sm:table-cell">Temporal Stamp</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {filtered.length > 0 ? filtered.map(doc => (
                <tr key={doc.id} onClick={() => setSelectedDoc(doc)} className="group cursor-pointer hover:bg-accent/[0.03] transition-all">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-accent/5 rounded-xl group-hover:bg-accent group-hover:text-white transition-all group-hover:rotate-6">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase tracking-tight">{doc.name}</p>
                        <p className="text-[9px] text-muted-foreground font-mono opacity-50 uppercase tracking-tighter">{doc.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                       <div className={`h-1.5 w-1.5 rounded-full ${doc.risk_score > 40 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                       <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${doc.risk_score > 40 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                         {doc.risk_score > 40 ? 'ANOMALY DETECTED' : 'NEURAL VERIFIED'}
                       </span>
                    </div>
                  </td>
                  <td className="p-6 text-[10px] font-black text-muted-foreground hidden sm:table-cell uppercase tracking-tighter opacity-70">
                    {new Date(doc.created_at).toDateString()}
                  </td>
                  <td className="p-6 text-right">
                    <button className="bg-muted/50 p-2 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">
                    No encrypted assets found in your sector.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Sidebar / Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 backdrop-blur-md z-40" onClick={() => setSelectedDoc(null)} />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-background/95 border-l border-border/40 z-50 p-8 md:p-12 flex flex-col space-y-10 shadow-[ -20px_0_50px_rgba(0,0,0,0.2)] overflow-y-auto"
            >
              <button onClick={() => setSelectedDoc(null)} className="absolute top-8 right-8 p-3 hover:bg-muted rounded-2xl transition-all"><X className="h-6 w-6 text-muted-foreground" /></button>
              
              <div className="space-y-3">
                <div className="text-[10px] font-black text-accent uppercase tracking-[0.4em] flex items-center gap-3"><Activity className="h-4 w-4 animate-spin-slow" /> Neural Profile</div>
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{selectedDoc.name}</h2>
              </div>

              <div className="bg-muted/30 p-8 rounded-[40px] border border-border/40 relative group">
                <div className="h-[260px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Legal', value: selectedDoc.breakdown?.legal || 1 },
                          { name: 'Financial', value: selectedDoc.breakdown?.financial || 1 },
                          { name: 'Compliance', value: selectedDoc.breakdown?.compliance || 1 },
                        ]}
                        innerRadius={80} outerRadius={105} paddingAngle={8} dataKey="value" stroke="none"
                      >
                        {COLORS.map((c, i) => <Cell key={i} fill={c} cornerRadius={12} />)}
                      </Pie>
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const { name, value } = payload[0].payload;
                            return (
                              <div className="glass-card px-4 py-3 border border-border/50 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-xl">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/80">Segment</p>
                                <span className="text-sm font-black text-slate-900 uppercase">{name}: {value}%</span>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-5xl font-black tracking-tighter gradient-text">{selectedDoc.risk_score}</span>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Risk Index</span>
                  </div>
                </div>
              </div>

              {/* Anomaly Alerts */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-orange-500" /> Detected Anomalies</h3>
                <div className="space-y-2">
                    {selectedDoc.risk_score > 40 ? (
                        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 border-l-4 border-l-red-500">
                             <p className="text-[11px] font-bold text-red-500 uppercase tracking-tight leading-relaxed">
                               CRITICAL: This document contains non-standard liability clauses.
                             </p>
                        </div>
                    ) : (
                        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 border-l-4 border-l-emerald-500">
                             <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-tight leading-relaxed">
                               SECURE: Logical patterns align with standard frameworks.
                             </p>
                        </div>
                    )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-muted/30 border border-border/40">
                  <p className="text-[9px] font-black text-muted-foreground uppercase mb-2 tracking-widest">Health Index</p>
                  <p className="text-3xl font-black text-accent tracking-tighter">{100 - selectedDoc.risk_score}</p>
                </div>
                <div className="p-6 rounded-3xl bg-muted/30 border border-border/40">
                  <p className="text-[9px] font-black text-muted-foreground uppercase mb-2 tracking-widest">Compliance</p>
                  <p className="text-3xl font-black text-emerald-500 tracking-tighter">{selectedDoc.compliance_score}%</p>
                </div>
              </div>

              <Button 
                onClick={() => handleExportAudit(selectedDoc.id, selectedDoc.name)}
                disabled={exporting}
                className="mt-auto w-full h-16 md:py-8 rounded-2xl md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] bg-accent hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2"
              >
                {exporting ? (
                  <span className="animate-pulse">Synthesizing...</span>
                ) : (
                  <>
                    <Download className="h-5 w-5" /> <span>Generate Intelligence Audit</span>
                  </>
                )}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentVault;