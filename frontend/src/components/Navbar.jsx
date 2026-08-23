import { Moon, Sun, TrainTrack } from "lucide-react";

export default function Navbar({ theme, toggleTheme }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-paper-50/70 dark:bg-ink-950/70 border-b border-black/[0.06] dark:border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid place-items-center w-9 h-9 rounded-lg bg-marigold-500 text-ink-950">
            <TrainTrack size={18} strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="font-display font-semibold text-sm tracking-tight">
              Room&nbsp;Type&nbsp;Line
            </p>
            <p className="text-[11px] text-ink-900/50 dark:text-paper-100/45 font-mono">
              NYC Airbnb classifier
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="grid place-items-center w-10 h-10 rounded-full border border-black/10 dark:border-white/10
            bg-white/50 dark:bg-white/[0.05] hover:bg-white/80 dark:hover:bg-white/[0.1] transition-colors"
        >
          {theme === "dark" ? (
            <Sun size={17} className="text-marigold-400" />
          ) : (
            <Moon size={17} className="text-ink-700" />
          )}
        </button>
      </div>
    </header>
  );
}
