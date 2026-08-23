import { BOROUGHS } from "../data/neighbourhoods";

export default function BoroughLegend({ active }) {
  return (
    <div className="flex flex-wrap gap-2">
      {BOROUGHS.map((b) => (
        <span
          key={b.name}
          className="chip border transition-all"
          style={{
            borderColor: active === b.name ? b.color : `${b.color}33`,
            backgroundColor: active === b.name ? `${b.color}1A` : "transparent",
            color: active === b.name ? b.color : "inherit",
            opacity: active && active !== b.name ? 0.45 : 1,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: b.color }}
          />
          {b.name}
        </span>
      ))}
    </div>
  );
}
