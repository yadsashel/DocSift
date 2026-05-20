import { useState, useEffect } from "react";
import { User, Users, CreditCard, Save, Loader2, Zap, Mail, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Paddle TypeScript Definition
declare global {
  interface Window {
    Paddle?: any;
  }
}

const API_URL = import.meta.env.VITE_API_URL;
const PADDLE_TOKEN = import.meta.env.VITE_PUBLIC_PADDLE_CLIENT_TOKEN;

const PRO_PRICE_ID = import.meta.env.VITE_PADDLE_PRO_PRICE_ID;
const ENTERPRISE_PRICE_ID = import.meta.env.VITE_PADDLE_ENTERPRISE_PRICE_ID;

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
    id: "", 
    full_name: "",
    email: "",
    plan: "starter",
    credits: 0,
    company: "",
    job_title: ""
  });

  const [newMemberEmail, setNewMemberEmail] = useState("");

  useEffect(() => {
    if (window.Paddle) {
      window.Paddle.Setup({ 
        token: PADDLE_TOKEN 
      });
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setIsFetching(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/auth/user/${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          // ✅ تأكيد أخذ الـ ID من الـ Database أو الـ localStorage كإجراء احتياطي صلب
          setUserData({
            id: data.user_id || data.id || userId, 
            full_name: data.full_name || "New User",
            email: data.email || "",
            plan: data.plan || "starter",
            credits: data.credits || 0,
            company: data.company || "",
            job_title: data.job_title || ""
          });
        } else {
          // ⚠️ إيلا رجع 404 أو أي خطأ، ما نخليوش الـ ID خاوي باش الـ Payment يخدم بالـ Local ID
          setUserData(prev => ({ ...prev, id: userId }));
        }
      } catch (error) { 
        console.error("Sync Error", error); 
        setUserData(prev => ({ ...prev, id: userId }));
      } finally { 
        setIsFetching(false); 
      }
    };
    fetchUserData();
  }, []);

  const handleUpgrade = (planType: 'pro' | 'enterprise') => {
    const priceId = planType === 'pro' ? PRO_PRICE_ID : ENTERPRISE_PRICE_ID;
    
    // ✅ هنا الفيكس: إيلا لقى الـ state خاوية كيمشي يجرها ديريكت من الـ localStorage باش ما يبلوكيش الـ user
    const currentUserId = userData.id || localStorage.getItem("user_id");

    if (!currentUserId) {
        toast({ 
            title: "Security Sync Error", 
            description: "We couldn't verify your session. Please refresh.", 
            variant: "destructive" 
        });
        return;
    }

    if (window.Paddle) {
      window.Paddle.Checkout.open({
        settings: {
          displayMode: "overlay",
          theme: "dark",
          locale: "en",
        },
        items: [{ 
          priceId: priceId, 
          quantity: 1 
        }],
        customData: {
            userId: currentUserId // هكا Paddle غايعرف بالضبط شكون اللي خلص
        }
      });
    } else {
      toast({ 
        title: "Loading...", 
        description: "Paddle is initializing. Please wait.", 
        variant: "destructive" 
      });
    }
  };
  
  const handleSaveProfile = async () => {
    const userId = userData.id || localStorage.getItem("user_id");
    if (!userId) return;
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
        toast({ title: "Profile Updated", description: "Changes saved successfully." });
      }
    } catch (error) { 
        toast({ variant: "destructive", title: "Update Failed" }); 
    } finally { 
        setIsLoading(false); 
    }
  };

  const addTeamMember = () => {
    if (userData.plan === 'starter') {
      toast({ title: "Upgrade Required", description: "Team features need Pro/Enterprise.", variant: "destructive" });
      return;
    }
    if (!newMemberEmail.includes("@")) return;
    toast({ title: "Invite Sent", description: `Invitation to ${newMemberEmail}` });
    setNewMemberEmail("");
  };

  const maxCredits = userData.plan === 'enterprise' ? 1500 : userData.plan === 'pro' ? 200 : 10;

  if (isFetching) return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm font-medium">Verifying DocSift Environment...</p>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage profile & billing.</p>
      </div>

      <div className="flex gap-1 bg-secondary/50 p-1 rounded-xl w-fit border border-border/50">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="glass-card rounded-xl p-6 border border-border/50 space-y-6 bg-card/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Full Name</Label>
              <Input value={userData.full_name} onChange={(e) => setUserData({...userData, full_name: e.target.value})} className="bg-secondary/20 border-border/50 h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Email</Label>
              <Input value={userData.email} disabled className="bg-secondary/10 border-border/30 opacity-60 cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Company</Label>
              <Input value={userData.company} onChange={(e) => setUserData({...userData, company: e.target.value})} className="bg-secondary/20 border-border/50 h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Title</Label>
              <Input value={userData.job_title} onChange={(e) => setUserData({...userData, job_title: e.target.value})} className="bg-secondary/20 border-border/50 h-10" />
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground h-10 px-6 font-semibold gap-2" onClick={handleSaveProfile} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Changes
          </Button>
        </div>
      )}

      {activeTab === "team" && (
        <div className="glass-card rounded-xl p-6 border border-border/50 space-y-6 bg-card/50">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Team Management</h3>
            <Badge variant="secondary" className="uppercase tracking-widest text-[10px]">{userData.plan}</Badge>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Collaborator Email..." value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} className="bg-secondary/20" />
            <Button onClick={addTeamMember}>Invite</Button>
          </div>
          <div className="space-y-3 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">{userData.full_name} <span className="text-[10px] ml-2 text-primary font-black uppercase tracking-tighter">(You)</span></p>
                  <p className="text-xs text-muted-foreground">{userData.email}</p>
                </div>
              </div>
              <Badge className="bg-primary/20 text-primary border-none text-[9px] font-black uppercase tracking-widest">Owner</Badge>
            </div>
            
            {userData.plan === 'starter' && (
                <p className="text-[10px] text-center text-muted-foreground italic py-4">Upgrade to Pro to add more team members.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "billing" && (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-6 border border-primary/20 bg-primary/5 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold uppercase text-primary mb-1">Active Plan</p>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter">{userData.plan}</h3>
              <p className="text-sm text-muted-foreground">Credits: {userData.credits} / {maxCredits}</p>
            </div>
            {userData.plan === 'starter' && (
              <Button onClick={() => handleUpgrade('pro')} className="bg-primary text-white font-bold px-8 gap-2 shadow-lg">
                Upgrade <Zap className="h-4 w-4 fill-current" />
              </Button>
            )}
          </div> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-6 border border-border/50 space-y-4 bg-card/50">
              <h4 className="text-sm font-bold uppercase">Enterprise Tier</h4>
              <p className="text-xs text-muted-foreground">1500 credits & dedicated team governance.</p>
              <Button onClick={() => handleUpgrade('enterprise')} variant="outline" className="w-full">Activate</Button>
            </div>
            <div className="glass-card rounded-xl p-6 border border-border/50 flex flex-col items-center justify-center opacity-50 bg-secondary/5">
              <Mail className="h-6 w-6 mb-2 opacity-30" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Billing History</p>
              <p className="text-[9px] italic">Invoices will appear here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;