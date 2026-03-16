import { MapPin, Wheat, Ruler, Users } from "lucide-react";

interface ProfileSummaryProps {
  state: string;
  district: string;
  landSize: string;
  crop: string;
  category: string;
}

const ProfileSummary = ({ state, district, landSize, crop, category }: ProfileSummaryProps) => {
  const items = [
    { icon: MapPin, label: "Location", value: `${district}, ${state}` },
    { icon: Ruler, label: "Land Size", value: `${landSize} acres` },
    { icon: Wheat, label: "Crop", value: crop },
    { icon: Users, label: "Category", value: category },
  ];

  return (
    <div className="card-elevated rounded-xl p-6 border border-border">
      <h2 className="text-xl font-display font-semibold text-foreground mb-4">Farmer Profile</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-medium text-foreground text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSummary;
