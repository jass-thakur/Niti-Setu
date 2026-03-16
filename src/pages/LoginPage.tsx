import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, Sprout, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { MapPin, User, Calendar, LucideIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianStates } from "@/data/mockData";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Details
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Profile state for Step 3
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    state: "",
    category: "",
    landSize: ""
  });

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setStep(2);
      setIsSubmitting(false);
      toast({
        title: "OTP Sent",
        description: "A 4-digit code has been sent to your phone.",
      });
    }, 1000);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234") { 
      toast({
        title: "Invalid OTP",
        description: "The code you entered is incorrect. Use 1234 for testing.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setStep(3); // Move to Details
      setIsSubmitting(false);
      toast({
        title: "Verified!",
        description: "Please complete your farm profile.",
      });
    }, 800);
  };

  const handleCompleteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(phone, profile);
      navigate("/");
      toast({
        title: "Registration Complete",
        description: `Welcome to Niti-Setu, ${profile.name}!`,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Column: Branding (WOW factor) */}
      <div className="hidden md:flex flex-1 relative overflow-hidden bg-primary items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary-dark" />
        
        <div className="relative z-10 max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                <Sprout className="w-10 h-10 text-white" />
              </div>
              <span className="text-4xl font-display font-bold tracking-tight">Niti-Setu</span>
            </div>
            
            <h1 className="text-5xl font-display font-bold leading-tight mb-6">
              Empowering Every <span className="text-accent underline decoration-accent/30 underline-offset-8">Farmer</span> with Direct Knowledge.
            </h1>
            
            <p className="text-xl text-white/80 font-medium leading-relaxed mb-12">
              Join thousands of farmers across India in discovering government schemes, market insights, and agricultural support tailored for you.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <ShieldCheck className="w-6 h-6 text-accent mb-2" />
                <span className="text-sm font-bold block">Secure Access</span>
                <span className="text-[11px] text-white/50">Your data is safe with us.</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <Sprout className="w-6 h-6 text-accent mb-2" />
                <span className="text-sm font-bold block">Real-time Updates</span>
                <span className="text-[11px] text-white/50">Get instant scheme alerts.</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-dark/50 rounded-full blur-[120px]" />
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-[0.8] flex items-center justify-center p-6 sm:p-12 bg-background relative overflow-hidden">
        {/* Mobile Header */}
        <div className="absolute top-8 left-8 flex items-center gap-2 md:hidden">
          <Sprout className="w-6 h-6 text-primary" />
          <span className="text-xl font-display font-bold text-gradient">Niti-Setu</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Enter your phone number to access your dashboard</p>
          </div>

          <div className="bg-card glass-card p-8 rounded-3xl border border-border/50 shadow-xl shadow-black/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
            
            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-border pr-3">
                      <span className="text-sm font-bold text-foreground">+91</span>
                    </div>
                    <Input
                      type="tel"
                      placeholder="98765 43210"
                      className="pl-20 h-14 rounded-xl border-border bg-background focus-visible:ring-primary focus-visible:border-primary transition-all text-lg font-medium"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      required
                    />
                  </div>
                </div>

                <Button 
                  disabled={isSubmitting || phone.length < 10}
                  className="w-full h-14 rounded-xl text-lg font-bold bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all group/btn"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Get Security Code
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            ) : step === 2 ? (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter the 4-digit code sent to <span className="font-bold text-foreground">+91 {phone}</span>
                    </p>
                    <div className="flex justify-center gap-3">
                      <Input
                        type="text"
                        maxLength={4}
                        placeholder="····"
                        className="w-48 h-16 text-center text-3xl font-bold tracking-[1em] rounded-2xl border-border focus-visible:ring-primary"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        autoFocus
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-primary hover:underline block mx-auto py-2"
                  >
                    Change Number
                  </button>
                </div>

                <Button 
                  disabled={isSubmitting || otp.length < 4}
                  className="w-full h-14 rounded-xl text-lg font-bold bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all group/btn"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCompleteProfile} className="space-y-5">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          placeholder="Your Name" 
                          className="pl-9 h-11 rounded-lg border-border"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Age</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          type="number" 
                          placeholder="Years" 
                          className="pl-9 h-11 rounded-lg border-border"
                          value={profile.age}
                          onChange={(e) => setProfile({...profile, age: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Gender</label>
                      <Select value={profile.gender} onValueChange={(v) => setProfile({...profile, gender: v})} required>
                        <SelectTrigger className="h-11 rounded-lg border-border">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Land Size (Acres)</label>
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="e.g. 2.5" 
                        className="h-11 rounded-lg border-border"
                        value={profile.landSize}
                        onChange={(e) => setProfile({...profile, landSize: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">State</label>
                    <Select value={profile.state} onValueChange={(v) => setProfile({...profile, state: v})} required>
                      <SelectTrigger className="h-11 rounded-lg border-border">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border max-h-48">
                        {indianStates.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</label>
                    <Select value={profile.category} onValueChange={(v) => setProfile({...profile, category: v})} required>
                      <SelectTrigger className="h-11 rounded-lg border-border">
                        <SelectValue placeholder="Social Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl text-md font-bold bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all mt-2"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Complete My Profile"}
                </Button>
              </form>
            )}
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Register as a New Farmer</Link>
            </p>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified by Ministry of Agriculture
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
