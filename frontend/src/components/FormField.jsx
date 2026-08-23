export default function FormField({
  label,
  name,
  icon: Icon,
  hint,
  error,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-sm font-medium text-ink-900/85 dark:text-paper-100/85"
      >
        {Icon && <Icon size={14} className="text-marigold-500" />}
        {label}
      </label>
      {children}
      <div className="min-h-[16px] px-0.5">
        {error ? (
          <p className="text-xs text-transit-red">{error}</p>
        ) : hint ? (
          <p className="text-xs text-ink-900/40 dark:text-paper-100/35">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
