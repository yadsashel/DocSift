import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

// ✅ 1. الرابط العالمي من الـ Environment Variables
const API_URL = import.meta.env.VITE_API_URL;

const passwordRules = [
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One special character", test: (p: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const ruleResults = useMemo(() => passwordRules.map(r => ({ ...r, passed: r.test(password) })), [password]);
  const allRulesPassed = ruleResults.every(r => r.passed);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isValid = name.trim() && email.trim() && allRulesPassed && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;

    setIsLoading(true);
    try {
      // ✅ 2. تحديث الرابط هنا لـ API_URL
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: name, email, password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || "Signup failed");

      toast({ title: "Check your inbox!", description: "A verification code has been sent." });
      navigate("/verify", { state: { email } });
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
          <Link to="/"><img src={logo} alt="DocSift" className="h-10 mx-auto mb-6" /></Link>
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        </div>
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5 border border-white/10 bg-black/40 backdrop-blur-md">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required className="h-11 bg-black/20" />
          </div>
          <div className="space-y-2">
            <Label>Work Email</Label>
            <Input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-11 bg-black/20" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="h-11 pr-10 bg-black/20" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
            </div>
            {password.length > 0 && (
              <div className="mt-2 space-y-1">
                {ruleResults.map((rule, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs ${rule.passed ? "text-green-400" : "text-muted-foreground"}`}>
                    {rule.passed ? <Check size={12}/> : <X size={12}/>} {rule.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="h-11 bg-black/20" />
          </div>
          <Button variant="gradient" className="w-full h-11 font-bold" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight className="ml-2 h-4" /></>}
          </Button>
          <p className="text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}