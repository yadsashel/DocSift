import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, FileText, AlertTriangle, Clock, ExternalLink, Trash2, ArrowRight, Zap, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";
import { Link, useNavigate } from "react-router-dom";

// ✅ الرابط العالمي من ملف الـ .env
const API_URL = import.meta.env.VITE_API_URL;

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const Dashboard = () => {
  const [stats, setStats] = useState<any>({ 
    total_docs: 0, 
    risks_found: 0, 
    compliance_rate: 0, 
    recent_activity: [],
    credits: 0,
    plan: 'starter' // ✨ تمت إضافة نوع الخطة
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- 🛠️ حساب السقف بناءً على نوع الخطة ---
  const getMaxCredits = (plan: string) => {
    const p = plan?.toLowerCase();
    const baseCredits = 10; // الـ Free Trial اللي عند كلشي
    if (p === 'enterprise') return 1500 + baseCredits;
    if (p === 'pro') return 200 + baseCredits;
    return baseCredits;
  };

  const maxCredits = getMaxCredits(stats.plan);

  // --- 🛠️ جلب البيانات ---
  const fetchDashboardData = useCallback(async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/dashboard-stats?user_id=${userId}`);
      if (!response.ok) throw new Error("Sync Error");
      const data = await response.json();
      
      setStats({
        total_docs: data.total_docs || 0,
        risks_found: data.total_risks || 0,
        compliance_rate: data.compliance_rate || 0,
        recent_activity: data.recent_activity || [],
        credits: data.credits ?? 0,
        plan: data.plan || 'starter' // ✨ جلب الخطة من البايكيند
      });
    } catch (error) { 
      console.error("❌ Neural Link Error:", error); 
    } finally {
      setLoading(false); 
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleDelete = async (id: string) => {
    const userId = localStorage.getItem("user_id");
    if (!window.confirm("Purge this document from the vault?")) return;
    
    try {
      const response = await fetch(`${API_URL}/files/${id}?user_id=${userId}`, { 
        method: 'DELETE' 
      });
      
      if (response.ok) {
        fetchDashboardData();
      } else {
        alert("Action denied: Unauthorized purge request.");
      }
    } catch (error) { 
      console.error("Delete Error:", error); 
    }
  };

  const chartData = (stats.recent_activity || []).slice().reverse().map((file: any) => ({
    name: new Date(file.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    risk: file.risk_score || 0,
    compliance: file.compliance_score || 0
  }));

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-background text-accent font-bold tracking-[0.4em] animate-pulse uppercase text-[10px]">
      Syncing Neural Assets...
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20 overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-12 space-y-10">
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-border/50 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-2">
              <Zap className="h-3 w-3 fill-current" /> Intelligence System
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">System <span className="gradient-text">Overview</span></h1>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Active Plan: <span className="text-accent">{stats.plan}</span></p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <div className="flex flex-col gap-1.5 min-w-[220px]">
              <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border border-border/40 rounded-2xl backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Neural Credits</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black">{stats.credits}</span>
                    <span className="text-[10px] font-bold text-muted-foreground opacity-50">/ {maxCredits}</span>
                  </div>
                </div>
                <div className="p-2 bg-accent/10 rounded-xl ml-4">
                    <Zap className={`h-4 w-4 ${stats.credits > 0 ? 'text-accent animate-pulse' : 'text-muted-foreground'}`} />
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((stats.credits / maxCredits) * 100, 100)}%` }}
                  className={`h-full transition-all duration-1000 ${stats.credits <= (maxCredits * 0.1) ? 'bg-red-500' : 'bg-accent'}`}
                />
              </div>
            </div>

            <Link to="/documents" className="group flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              Access Vault <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Documents", val: stats.total_docs, icon: FileText, color: "text-blue-500" },
            { label: "Anomalies Found", val: stats.risks_found, icon: AlertTriangle, color: "text-orange-500" },
            { label: "Compliance Rate", val: `${stats.compliance_rate}%`, icon: Shield, color: "text-emerald-500" },
            { label: "Current Risk", val: stats.recent_activity[0]?.risk_score || 0, icon: Activity, color: "text-accent" },
          ].map((m, i) => (
            <motion.div key={i} variants={fadeInUp} className="glass-card p-6 rounded-3xl border border-border/40 hover:border-accent/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{m.label}</span>
                <div className={`p-2 rounded-xl bg-muted/50 ${m.color} group-hover:scale-110 transition-transform`}>
                   <m.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-3xl font-black tracking-tighter">{m.val}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-8 rounded-3xl border border-border/40">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-10 flex items-center gap-3">
              <span className="h-2 w-2 bg-accent rounded-full animate-ping" /> Risk Detection Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 10}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', background: 'hsl(var(--background))', fontSize: '10px' }} />
                <Bar dataKey="risk" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-border/40">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-10 flex items-center gap-3">
              <span className="h-2 w-2 bg-emerald-500 rounded-full" /> Compliance Evolution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 10}} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 10}} />
                <Tooltip contentStyle={{ borderRadius: '16px', background: 'hsl(var(--background))', fontSize: '10px' }} />
                <Area type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={3} fill="url(#chartGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-border/40 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-border/40 flex justify-between items-center bg-muted/30">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3"><Clock className="h-4 w-4 text-accent" /> Intelligence Activity Log</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black tracking-widest text-muted-foreground bg-muted/10">
                  <th className="p-6">Document</th>
                  <th className="p-6">Risk Score</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {stats.recent_activity.length > 0 ? stats.recent_activity.map((file: any) => (
                  <tr key={file.id} className="hover:bg-accent/5 transition-all group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5 text-accent" />
                        <div>
                          <p className="text-sm font-black uppercase">{file.name}</p>
                          <p className="text-[9px] text-muted-foreground uppercase">{new Date(file.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${file.risk_score > 50 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {file.risk_score}% Index
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => navigate(`/documents?id=${file.id}`)} className="p-2 hover:text-accent transition-colors"><ExternalLink className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(file.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="p-10 text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">
                      No neural activity recorded in your sector.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;