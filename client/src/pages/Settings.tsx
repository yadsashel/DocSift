import { useState } from "react";
import { User, Users, CreditCard, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const teamMembers = [
  { name: "Sarah Chen", email: "sarah@company.com", role: "Admin", joined: "Jan 2026" },
  { name: "Michael Torres", email: "michael@company.com", role: "Editor", joined: "Jan 2026" },
  { name: "Amanda Liu", email: "amanda@company.com", role: "Viewer", joined: "Feb 2026" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="glass-card rounded-xl p-8 max-w-2xl animate-fade-in">
          <h3 className="font-semibold mb-6">Profile Information</h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue="John" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue="Doe" className="h-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue="john@company.com" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input defaultValue="Acme Corporation" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input defaultValue="General Counsel" className="h-10" />
            </div>
            <Button variant="gradient" className="gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === "team" && (
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Team Members</h3>
            <Button variant="gradient" size="sm">Invite Member</Button>
          </div>
          <div className="space-y-3">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs bg-secondary px-2.5 py-1 rounded-full font-medium">{member.role}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block">{member.joined}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-card rounded-xl p-8">
            <h3 className="font-semibold mb-4">Current Plan</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold gradient-text">Professional</p>
                <p className="text-muted-foreground text-sm">$149/month · Billed monthly</p>
              </div>
              <Button variant="outline">Upgrade Plan</Button>
            </div>
          </div>
          <div className="glass-card rounded-xl p-8">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded bg-secondary flex items-center justify-center text-xs font-bold">VISA</div>
                <div>
                  <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </div>
          <div className="glass-card rounded-xl p-8">
            <h3 className="font-semibold mb-4">Billing History</h3>
            <div className="space-y-3">
              {[
                { date: "Feb 1, 2026", amount: "$149.00", status: "Paid" },
                { date: "Jan 1, 2026", amount: "$149.00", status: "Paid" },
                { date: "Dec 1, 2025", amount: "$149.00", status: "Paid" },
              ].map((invoice, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <span className="text-sm">{invoice.date}</span>
                  <span className="text-sm font-medium">{invoice.amount}</span>
                  <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">{invoice.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;