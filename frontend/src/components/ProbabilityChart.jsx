import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { ROOM_TYPES } from "../data/neighbourhoods";

const BAR_COLORS = ["#F2A93B", "#3BA3F2", "#7ED957"];

export default function ProbabilityChart({ probabilities }) {
  const data = probabilities.map((p, i) => ({
    name: ROOM_TYPES[i]?.label || `Class ${i + 1}`,
    value: Math.round(p * 1000) / 10, // percentage, 1 decimal
  }));

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 28, left: 4, bottom: 4 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Probability"]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.08)",
              fontSize: 13,
            }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={26} isAnimationActive>
            {data.map((_, i) => (
              <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v) => `${v}%`}
              style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fill: "currentColor" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
