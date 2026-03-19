import { CheckCircle2, XCircle, FileText, Eye } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Interface representing the data structure for a government scheme.
 */
export interface SchemeData {
  id: string;
  name: string;
  category: string;
  eligible: boolean;
  benefit: string;
  reason: string;
  proof: string;
  description: string;
  eligibilityRule: string;
  proofText: string;
  documents: string[];
}

/**
 * Properties for the SchemeCard component.
 */
interface SchemeCardProps {
  scheme: SchemeData;
  onViewDetails: (scheme: SchemeData) => void;
  index: number;
}

/**
 * SchemeCard component displays a summary of a government scheme,
 * including eligibility status and key benefits.
 */
const SchemeCard = ({ scheme, onViewDetails, index }: SchemeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-elevated card-hover rounded-xl p-6 border border-border"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-foreground">{scheme.name}</h3>
        {scheme.eligible ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Eligible
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Not Eligible
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-sm text-muted-foreground">Benefit</span>
          <p className="font-semibold text-foreground">{scheme.benefit}</p>
        </div>

        <div>
          <span className="text-sm text-muted-foreground">
            {scheme.eligible ? "Explanation" : "Reason"}
          </span>
          <p className="text-sm text-foreground">{scheme.reason}</p>
        </div>

        <div className="bg-muted rounded-lg p-3 flex items-start gap-2">
          <FileText className="w-4 h-4 text-info mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground italic">{scheme.proof}</p>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(scheme)}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm transition-colors hover:bg-secondary/90"
      >
        <Eye className="w-4 h-4" />
        View Details
      </button>
    </motion.div>
  );
};

export default SchemeCard;
