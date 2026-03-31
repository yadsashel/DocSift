import { useState, useEffect } from "react";
import { User, Users, CreditCard, Save, Loader2, Zap, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;
const PRO_URL = import.meta.env.VITE_LEMON_SQUEEZY_PRO_URL;
const ENTERPRISE_URL = import.meta.env.VITE_LEMON_SQUEEZY_ENTERPRISE_URL;

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    plan: "starter",
    credits: 0,
    company: "",
    job_title: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;
      try {
        const response = await fetch(`${API_URL}/auth/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            full_name: data.full_name || "",
            email: data.email || "",
            plan: data.plan || "starter",
            credits: data.credits || 0,
            company: data.company || "",
            job_title: data.job_title || ""
          });
        }
      } catch (error) { console.error("Sync Error", error); }
      finally { setIsFetching(false); }
    };
    fetchUserData();
  }, []);

  // دالة التعامل مع الترقية (Upgrade) باستخدام الـ Overlay
  const handleUpgrade = (planType: 'pro' | 'enterprise') => {
    const baseUrl = planType === 'pro' ? PRO_URL : ENTERPRISE_URL;
    const userId = localStorage.getItem("user_id");

    if (!baseUrl) {
      toast({ variant: "destructive", title: "Config Missing", description: "Checkout URL not found in environment." });
      return;
    }

    // تمرير الـ User ID كـ Parameter باش الـ Webhook يعرف شكون خلص
    const checkoutUrl = `${baseUrl}?checkout[custom][user_id]=${userId}&embed=1`;

    // استخدام الـ Lemon Squeezy Script لفتح الـ Overlay
    if (window.LemonSqueezy) {
      window.LemonSqueezy.Url.Open(checkoutUrl);
    } else {
      window.open(checkoutUrl, "_blank");
    }
  };

  const handleSaveProfile = async () => {
    const userId = localStorage.getItem("user_id");
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/user/${userId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: userData.full_name,
          company: userData.company,
          job_title: userData.job_title
        }),
      });
      if (response.ok) {
        localStorage.setItem("user_name", userData.full_name);
        toast({ title: "Neural Link Synced", description: "Identity updated successfully." });
      }
    } catch (error) { toast({ variant: "destructive", title: "Update Failed" }); }
    finally { setIsLoading(false); }
  };

  const maxCredits = userData.plan === 'enterprise' ? 1500 : userData.plan === 'pro' ? 200 : 10;

  if (isFetching) return (
    <div className="h-[60vh] flex items-center justify-center text-[10px] font-black tracking-[0.4em] text-accent animate-pulse uppercase">
      Initialising Neural Identity...
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">System <span className="gradient-text">Settings</span></h1>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-2 flex items-center gap-2">
          <span className="h-2 w-2 bg-accent rounded-full animate-ping" /> Connection: Secure Neural Node
        </p>
      </header>

      <div className="flex gap-2 bg-muted/20 p-1.5 rounded-2xl w-fit border border-border/40 backdrop-blur-md">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? "bg-accent text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "text-muted-foreground hover:text-white"}`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="glass-card rounded-3xl p-10 border border-border/40 relative overflow-hidden group">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-3 text-accent">
            <User className="h-4 w-4" /> Identity Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {[
              { label: "Full Name", key: "full_name", type: "text" },
              { label: "Email Address", key: "email", type: "email", disabled: true },
              { label: "Company", key: "company", type: "text" },
              { label: "Position", key: "job_title", type: "text" },
            ].map((field) => (
              <div key={field.key} className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">{field.label}</Label>
                <Input 
                  type={field.type}
                  value={userData[field.key as keyof typeof userData]} 
                  disabled={field.disabled}
                  onChange={(e) => setUserData({...userData, [field.key]: e.target.value})}
                  className={`bg-background/40 border-border/60 h-14 rounded-2xl font-bold focus:border-accent transition-all ${field.disabled ? 'opacity-40 cursor-not-allowed' : ''}`} 
                />
              </div>
            ))}
          </div>
          <Button className="bg-accent hover:bg-accent/80 text-white rounded-2xl px-12 h-14 gap-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105" onClick={handleSaveProfile} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} Save Changes
          </Button>
        </div>
      )}

      {activeTab === "billing" && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <div className="glass-card rounded-[2.5rem] p-12 border-2 border-accent/30 bg-accent/5 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-1.5 bg-accent text-white rounded-full w-fit">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Tier</span>
                </div>
                <h3 className="text-6xl font-black uppercase tracking-tighter italic gradient-text">{userData.plan}</h3>
                <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.2em]">
                  Credit Balance: <span className="text-foreground">{userData.credits}</span> / {maxCredits} Units
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                {userData.plan === 'starter' ? (
                  <Button onClick={() => handleUpgrade('pro')} className="bg-white text-black hover:bg-white/90 rounded-2xl px-12 h-16 text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                    Upgrade to Pro <Sparkles className="ml-2 h-4 w-4 fill-black" />
                  </Button>
                ) : (
                  <div className="text-[10px] font-black uppercase tracking-widest text-accent border border-accent/20 p-4 rounded-2xl bg-accent/10">
                    Maximum Tier Active
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-[2rem] p-10 border border-border/40 group hover:border-accent/40 transition-all">
                <h4 className="text-xs font-black uppercase tracking-widest mb-4">Enterprise Access</h4>
                <p className="text-[11px] text-muted-foreground font-bold uppercase leading-relaxed mb-8">Scale your neural processing to 1500 units with high-priority support.</p>
                <Button onClick={() => handleUpgrade('enterprise')} variant="outline" className="w-full h-14 border-border/60 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-accent group-hover:text-white transition-all">
                    Activate Enterprise
                </Button>
            </div>
            <div className="glass-card rounded-[2rem] p-10 border border-border/40 opacity-50 flex flex-col items-center justify-center text-center">
                <ExternalLink className="h-8 w-8 mb-4 opacity-20" />
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Billing Portal</h4>
                <p className="text-[9px] font-bold uppercase tracking-widest">Manage Subscriptions & Invoices (Coming Soon)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;