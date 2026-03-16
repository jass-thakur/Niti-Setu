import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, Clock, Search } from "lucide-react";
import ProfileSummary from "@/components/ProfileSummary";
import SchemeCard, { SchemeData } from "@/components/SchemeCard";
import SchemeModal from "@/components/SchemeModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SchemesTicker from "@/components/SchemesTicker";
import chatWidget from "@/components/ChatWidget";
import { mockSchemes } from "@/data/mockData";

const metrics = [
  { icon: Search, label: "Schemes Analyzed", value: "3" },
  { icon: BarChart3, label: "Eligibility Checks", value: "124" },
  { icon: Clock, label: "Avg Response Time", value: "3.4s" },
];

const EligibilityDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = (location.state as { state: string; district: string; landSize: string; crop: string; category: string }) || {
    state: "Uttar Pradesh",
    district: "Lucknow",
    landSize: "1.5",
    crop: "Rice",
    category: "OBC",
  };

  const [selectedScheme, setSelectedScheme] = useState<SchemeData | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      <SchemesTicker />
      <Navbar />

      <div className="container py-12 flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">Eligibility Results</h1>
          <ProfileSummary
            state={profile.state}
            district={profile.district}
            landSize={profile.landSize}
            crop={profile.crop}
            category={profile.category}
          />
        </motion.div>

        <div>
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">Scheme Eligibility</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSchemes.map((scheme, i) => (
              <SchemeCard key={scheme.id} scheme={scheme} onViewDetails={setSelectedScheme} index={i} />
            ))}
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">Impact Metrics</h2>
          <div className="grid grid-cols-3 gap-4">
            {metrics.map(({ icon: Icon, label, value }) => (
              <div key={label} className="card-elevated rounded-xl p-5 text-center border border-border">
                <div className="w-10 h-10 mx-auto rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-2xl font-display font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <SchemeModal scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />
      <Footer />
    </div>
  );
};

export default EligibilityDashboard;
