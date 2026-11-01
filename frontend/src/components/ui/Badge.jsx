/** Small pill badges. Variants: accent, success, navy, neutral, outline. */
const Badge = ({ variant = 'neutral', dot = false, className = '', children }) => {
  const variants = {
    accent: 'bg-accent/10 text-accent ring-1 ring-accent/20',
    success: 'bg-success/10 text-success ring-1 ring-success/20 dark:bg-success/15',
    navy: 'bg-navy/10 text-navy ring-1 ring-navy/20',
    neutral: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] ring-1 ring-[var(--border)]',
    outline: 'bg-transparent ring-1 ring-[var(--border)] text-[var(--text-secondary)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

export default Badge;
