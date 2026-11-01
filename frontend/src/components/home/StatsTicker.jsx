import { AnimatedCounter } from '../ui/AnimatedCounter';

/** Scrolling/marquee stats strip with animated counters. */
const STATS = [
  { value: 50000, suffix: '+', label: 'Legal Sections' },
  { value: 10000, suffix: '+', label: 'Cases' },
  { value: 100, suffix: '+', label: 'Acts' },
  { value: 24, suffix: '/7', label: 'Real-time Updates' },
];

export function StatsTicker() {
  // Two copies for an infinite marquee on overflow; grid on desktop.
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {STATS.map(({ value, suffix, label }) => (
            <li key={label} className="flex flex-col items-center">
              <span className="font-serif text-4xl font-bold text-accent sm:text-5xl">
                <AnimatedCounter value={value} suffix={suffix} />
              </span>
              <span className="mt-1.5 text-[13px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default StatsTicker;
