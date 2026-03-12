import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail || "Something went wrong");
      }

      toast({ title: "OTP Sent!", description: "Check your email for the reset code." });
      // كاندوزوه لصفحة الـ Reset ونصيفطوا معاه الإيميل
      navigate("/reset-password", { state: { email } });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-float" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/"><img src={logo} alt="DocSift" className="h-10 mx-auto mb-6" /></Link>
          <h1 className="text-2xl font-bold mb-2">Reset password</h1>
          <p className="text-muted-foreground text-sm">Enter your email to receive a verification code</p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/10 bg-black/40 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-11 bg-black/20" />
            </div>
            <Button variant="gradient" className="w-full h-11 font-bold" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Send Reset Code"}
            </Button>
            <div className="text-center">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;