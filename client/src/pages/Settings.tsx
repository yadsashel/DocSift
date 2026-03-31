import { useState, useEffect } from "react";
import { User, Users, CreditCard, Save, Loader2, Zap, Mail, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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

  // حالة الفريق (Team State)
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Yazide (You)", email: "admin@docsift.ai", role: "Owner" }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState("");

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

  const handleUpgrade = (planType: 'pro' | 'enterprise') => {
    const baseUrl = planType === 'pro' ? PRO_URL : ENTERPRISE_URL;
    const userId = localStorage.getItem("user_id");
    const checkoutUrl = `${baseUrl}?checkout[custom][user_id]=${userId}&embed=1`;
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
        toast({ title: "Profile Updated", description: "Your changes have been saved." });
      }
    } catch (error) { toast({ variant: "destructive", title: "Update Failed" }); }
    finally { setIsLoading(false); }
  };

  const addTeamMember = () => {
    if (userData.plan === 'starter') {
      toast({ title: "Upgrade Required", description: "Team features are only available for Pro & Enterprise plans.", variant: "destructive" });
      return;
    }
    if (!newMemberEmail.includes("@")) return;
    setTeamMembers([...teamMembers, { id: Date.now(), name: "Pending...", email: newMemberEmail, role: "Member" }]);
    setNewMemberEmail("");
    toast({ title: "Invitation Sent", description: `Invite sent to ${newMemberEmail}` });
  };

  const maxCredits = userData.plan === 'enterprise' ? 1500 : userData.plan === 'pro' ? 200 : 10;

  if (isFetching) return <div className="h-[60vh] flex items-center justify-center text-sm font-medium animate-pulse">Loading settings...</div>;

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your personal profile and organization node.</p>
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

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="glass-card rounded-xl p-6 border border-border/50 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Full Name</Label>
              <Input value={userData.full_name} onChange={(e) => setUserData({...userData, full_name: e.target.value})} className="bg-secondary/20 border-border/50 h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Email Address</Label>
              <Input value={userData.email} disabled className="bg-secondary/10 border-border/30 opacity-60 cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Company Name</Label>
              <Input value={userData.company} onChange={(e) => setUserData({...userData, company: e.target.value})} className="bg-secondary/20 border-border/50 h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Job Title</Label>
              <Input value={userData.job_title} onChange={(e) => setUserData({...userData, job_title: e.target.value})} className="bg-secondary/20 border-border/50 h-10" />
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground h-10 px-6 font-semibold gap-2" onClick={handleSaveProfile} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Changes
          </Button>
        </div>
      )}

      {/* Team Tab - WORKING SECTION */}
      {activeTab === "team" && (
        <div className="glass-card rounded-xl p-6 border border-border/50 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Team Members</h3>
            <Badge variant={userData.plan === 'starter' ? "outline" : "secondary"}>{userData.plan.toUpperCase()} Access</Badge>
          </div>
          
          <div className="flex gap-2">
            <Input 
              placeholder="Enter email to invite..." 
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className="bg-secondary/20 border-border/50" 
            />
            <Button onClick={addTeamMember} className="gap-2 shrink-0">
              <Plus className="h-4 w-4" /> Invite
            </Button>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-accent/20 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {member.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-none">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{member.role}</span>
                  {member.role !== "Owner" && <Trash2 className="h-4 w-4 text-destructive/50 hover:text-destructive cursor-pointer" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-6 border border-primary/20 bg-primary/5 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Current Plan</p>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter">{userData.plan}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Usage: <span className="text-foreground font-bold">{userData.credits}</span> / {maxCredits} Units
              </p>
            </div>
            {userData.plan === 'starter' && (
              <Button onClick={() => handleUpgrade('pro')} className="bg-primary text-white font-bold px-8 gap-2">
                Upgrade <Zap className="h-4 w-4 fill-current" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-6 border border-border/50 space-y-4">
              <h4 className="text-sm font-bold uppercase">Enterprise Node</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Unlock 1500 credits and dedicated team management for large organizations.</p>
              <Button onClick={() => handleUpgrade('enterprise')} variant="outline" className="w-full text-xs font-bold uppercase tracking-widest">Activate Enterprise</Button>
            </div>
            <div className="glass-card rounded-xl p-6 border border-border/50 flex flex-col items-center justify-center text-center opacity-50">
              <Mail className="h-6 w-6 mb-2 opacity-30" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Invoices & Billing History</p>
              <p className="text-[9px] text-muted-foreground italic">Syncing with payment gateway...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;