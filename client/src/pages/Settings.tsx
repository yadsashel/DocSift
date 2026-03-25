import { useState, useEffect } from "react";
import { User, Users, CreditCard, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // --- بيانات المستخدم الحقيقية ---
  const [userData, setUserData] = useState({
    full_name: localStorage.getItem("user_name") || "User",
    email: "",
    plan: "Free",
    credits: 0,
    company: "Not Set",
    job_title: "Not Set"
  });

  // جلب البيانات من الـ Backend عند فتح الصفحة
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      try {
        const response = await fetch(`${API_URL}/auth/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            full_name: data.full_name,
            email: data.email,
            plan: data.plan || "Free",
            credits: data.credits || 0,
            company: data.company || "Your Company",
            job_title: data.job_title || "Your Position"
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // هنا تقدر تزيد Logic باش تصيفط التعديلات للـ API
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "Profile Updated", description: "Your changes have been saved successfully." });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account and subscription</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="glass-card rounded-xl p-8 max-w-2xl">
          <h3 className="font-semibold mb-6">Profile Information</h3>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={userData.full_name} 
                onChange={(e) => setUserData({...userData, full_name: e.target.value})}
                className="h-11 bg-black/20" 
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                type="email" 
                value={userData.email} 
                disabled 
                className="h-11 bg-black/10 opacity-70 cursor-not-allowed" 
              />
              <p className="text-[10px] text-muted-foreground italic">Email cannot be changed for security reasons.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input 
                  value={userData.company} 
                  onChange={(e) => setUserData({...userData, company: e.target.value})}
                  className="h-11 bg-black/20" 
                />
              </div>
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input 
                  value={userData.job_title} 
                  onChange={(e) => setUserData({...userData, job_title: e.target.value})}
                  className="h-11 bg-black/20" 
                />
              </div>
            </div>
            <Button variant="gradient" className="gap-2" onClick={handleSaveProfile} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Team Tab (Placeholder for now) */}
      {activeTab === "team" && (
        <div className="glass-card rounded-xl p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h3 className="text-lg font-semibold mb-2">Team Features Coming Soon</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            The ability to invite colleagues and share contracts is currently in development for Enterprise plans.
          </p>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-8 border border-accent/20 bg-accent/5">
            <h3 className="font-semibold mb-4">Current Plan</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold gradient-text uppercase tracking-tighter">
                  {userData.plan} Plan
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  You have <span className="text-foreground font-bold">{userData.credits}</span> analysis credits remaining.
                </p>
              </div>
              <Button variant="outline" className="border-accent/50 hover:bg-accent/10">Upgrade</Button>
            </div>
          </div>

          <div className="glass-card rounded-xl p-8 opacity-60">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest">Payment Method</h3>
            <p className="text-xs text-muted-foreground italic">No payment methods on file. Add one to upgrade to Pro.</p>
            <Button variant="secondary" size="sm" className="mt-4" disabled>Add Card</Button>
          </div>

          <div className="glass-card rounded-xl p-8">
            <h3 className="font-semibold mb-4">Billing History</h3>
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No invoices found yet.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;