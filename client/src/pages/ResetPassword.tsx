import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Check, X, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: code, new_password: newPassword }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail || "Reset failed");
      }

      toast({ title: "Success!", description: "Password updated. You can now login." });
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
          <h1 className="text-2xl font-bold mb-2">Set new password</h1>
          <p className="text-muted-foreground text-sm">Enter the code sent to {email}</p>
        </div>

        <form onSubmit={handleReset} className="glass-card rounded-2xl p-8 space-y-5 border border-white/10 bg-black/40 backdrop-blur-md">
          <div className="space-y-2">
            <Label>Verification Code</Label>
            <Input type="text" maxLength={6} placeholder="000000" value={code} onChange={e => setCode(e.target.value)} required className="h-11 text-center tracking-widest text-xl font-bold" />
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="h-11 bg-black/20" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          <Button variant="gradient" className="w-full h-11 font-bold" type="submit" disabled={isLoading || code.length < 6}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Update Password"}
          </Button>
          
          <div className="text-center">
             <Link to="/forgot-password" size="sm" className="text-xs text-accent hover:underline inline-flex items-center gap-1">
                <ArrowLeft size={12}/> Resend code
             </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;