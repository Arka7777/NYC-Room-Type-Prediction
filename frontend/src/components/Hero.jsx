import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BOROUGHS } from "../data/neighbourhoods";
import BoroughLegend from "./BoroughLegend";

const STOPS_X = [60, 220, 400, 580, 740];

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-10 md:pt-24 md:pb-14">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-widest uppercase text-marigold-600 dark:text-marigold-400 mb-4"
        >
          Five boroughs · one classifier
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
        >
          Tell us where the listing is.
          <br />
          <span className="text-marigold-500">We'll tell you what it is.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 text-base md:text-lg text-ink-900/65 dark:text-paper-100/60 max-w-xl"
        >
          A random forest model trained on NYC Airbnb listings predicts
          whether a stay is an entire home, a private room, or a shared
          room — from its location, price, and booking activity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-6"
        >
          <BoroughLegend />
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={onStart}
          className="btn-primary mt-8"
        >
          Start a prediction
          <ArrowDown size={16} />
        </motion.button>
      </div>

      {/* Signature: an animated subway line running through borough "stations" */}
      <div className="max-w-6xl mx-auto px-6 mt-14 hidden sm:block">
        <svg
          viewBox="0 0 800 90"
          className="w-full h-auto"
          role="img"
          aria-label="Illustrative subway line connecting the five boroughs"
        >
          <motion.path
            d={`M ${STOPS_X[0]} 45 H ${STOPS_X[4]}`}
            stroke="#F2A93B"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
          />
          {BOROUGHS.map((b, i) => (
            <g key={b.name}>
              <motion.circle
                cx={STOPS_X[i]}
                cy={45}
                r={9}
                fill="currentColor"
                className="text-paper-50 dark:text-ink-950"
                stroke={b.color}
                strokeWidth="4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
              />
              <text
                x={STOPS_X[i]}
                y={75}
                textAnchor="middle"
                className="fill-ink-900/60 dark:fill-paper-100/55"
                style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {b.name === "Staten Island" ? "Staten Isl." : b.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
