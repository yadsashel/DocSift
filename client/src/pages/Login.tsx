import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.detail === "Please verify your email first!") {
          toast({ title: "Verification Needed", description: "Redirecting..." });
          navigate("/verify", { state: { email } });
          return;
        }
        throw new Error(result.detail || "Login failed");
      }

      // حفظ بيانات الجلسة
      localStorage.setItem("token", result.token);
      localStorage.setItem("user_id", result.user_id);
      localStorage.setItem("user_name", result.full_name);
      
      toast({ title: "Welcome back!" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="DocSift" className="h-10 mx-auto mb-6 hover:opacity-80 transition-opacity" />
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground text-sm">Log in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5 border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="you@company.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="h-11 bg-black/20 border-white/10 focus:border-accent/50" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {/* 🔥 Forgot Password Link Added Here */}
              <Link 
                to="/forgot-password" 
                className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
            
            <div className="relative">
              <Input 
                id="password"
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="h-11 pr-10 bg-black/20 border-white/10 focus:border-accent/50" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          <Button 
            variant="gradient" 
            className="w-full h-11 font-bold shadow-lg shadow-accent/20" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="ml-2 h-4" /></>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}