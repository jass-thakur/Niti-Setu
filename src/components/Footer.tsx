import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 mt-auto">
      <div className="container overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6 col-span-1 md:col-span-1">
            <div 
              className="flex items-center gap-1 cursor-pointer w-fit" 
              onClick={() => navigate("/")}
            >
              <span className="font-display font-bold text-2xl text-gradient">Niti-Setu</span>
              <img src="/logo.png" alt="Niti-Setu Logo" className="w-10 h-10 object-contain" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Bridging the gap between farmers and government opportunities through AI-powered 
              eligibility assessment and localized guidance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/check")} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Check Eligibility
                </button>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Available Schemes
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Knowledge Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-foreground">Legal & Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Farmer Bill of Rights
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-foreground">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>support@nitisetu.gov.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>1800-SETU-2026</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Niti-Setu. Powering the Digital India Mission.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              Government Portals <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              Feedback <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
