import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

// ✅ 1. الرابط العالمي
const API_URL = import.meta.env.VITE_API_URL;

export default function Verify() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return;

    setIsLoading(true);
    try {
      // ✅ 2. تحديث الرابط لـ API_URL
      const res = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: code }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || "Verification failed");

      toast({ title: "Account Verified!", description: "Log in to claim your credits." });
      navigate("/login"); 
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img src={logo} alt="DocSift" className="h-10 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Check your inbox</h1>
          <p className="text-muted-foreground text-sm">Enter the code sent to <span className="text-white font-medium">{email}</span></p>
        </div>
        <form onSubmit={handleVerify} className="glass-card rounded-2xl p-8 space-y-5 border border-white/10 bg-black/40 backdrop-blur-md">
          <div className="space-y-2">
            <Input 
              type="text" 
              placeholder="000000" 
              value={code} 
              onChange={e => setCode(e.target.value.replace(/\D/g, ""))} 
              className="h-14 text-center text-3xl tracking-[0.5rem] font-bold bg-black/20 border-white/10 text-white"
              maxLength={6}
              required
            />
          </div>
          <Button variant="gradient" className="w-full h-11 font-bold" type="submit" disabled={isLoading || code.length < 6}>
            {isLoading ? <Loader2 className="animate-spin" /> : <>Verify Account <ArrowRight className="ml-2 h-4" /></>}
          </Button>
          <p className="text-center text-sm text-muted-foreground">Wrong email? <Link to="/signup" className="text-accent hover:underline">Change it</Link></p>
        </form>
      </div>
    </div>
  );
}