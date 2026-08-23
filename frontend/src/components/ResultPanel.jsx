import { motion, AnimatePresence } from "framer-motion";
import { Home, DoorOpen, Users, ChevronRight } from "lucide-react";
import ProbabilityChart from "./ProbabilityChart";
import ConfidenceGauge from "./ConfidenceGauge";

const ICONS = {
  "Entire home/apt": Home,
  "Private room": DoorOpen,
  "Shared room": Users,
};

export default function ResultPanel({ result, lastInput }) {
  if (!result) return null;

  const { predicted_room_type: predicted, probabilities } = result;
  const Icon = ICONS[predicted] || Home;
  const maxProb = Math.max(...probabilities);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={predicted + maxProb}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="glass-panel p-6 md:p-8"
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-marigold-600 dark:text-marigold-400 mb-3">
              Prediction result
            </p>
            <div className="flex items-center gap-4">
              <div className="grid place-items-center w-14 h-14 rounded-2xl bg-marigold-500/15 text-marigold-500 shrink-0">
                <Icon size={28} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight">
                  {predicted}
                </h3>
                {lastInput && (
                  <p className="text-sm text-ink-900/55 dark:text-paper-100/50 mt-1 flex items-center gap-1">
                    {lastInput.neighbourhood}
                    <ChevronRight size={12} />
                    {lastInput.neighbourhood_group}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink-900/70 dark:text-paper-100/65 max-w-md">
              The model is <strong>{Math.round(maxProb * 100)}% confident</strong>{" "}
              this listing is a <strong>{predicted.toLowerCase()}</strong>, based
              on its price, location, and booking history relative to the
              listings it was trained on.
            </p>
          </div>

          <ConfidenceGauge confidence={maxProb} />
        </div>

        <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
          <p className="text-sm font-medium mb-3">Full probability distribution</p>
          <ProbabilityChart probabilities={probabilities} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
