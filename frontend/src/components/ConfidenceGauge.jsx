import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function ConfidenceGauge({ confidence }) {
  const pct = Math.round(confidence * 100);
  const data = [{ name: "confidence", value: pct, fill: "#F2A93B" }];

  const color = pct >= 70 ? "#7ED957" : pct >= 45 ? "#F2A93B" : "#F25C54";

  return (
    <div className="relative w-40 h-40 mx-auto">
      <RadialBarChart
        width={160}
        height={160}
        cx={80}
        cy={80}
        innerRadius={58}
        outerRadius={74}
        barSize={12}
        data={[{ ...data[0], fill: color }]}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background={{ fill: "rgba(128,128,128,0.15)" }}
          dataKey="value"
          cornerRadius={20}
          isAnimationActive
        />
      </RadialBarChart>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="font-display font-bold text-2xl leading-none">{pct}%</p>
          <p className="text-[10px] uppercase tracking-widest text-ink-900/45 dark:text-paper-100/40 mt-1">
            confidence
          </p>
        </div>
      </div>
    </div>
  );
}
