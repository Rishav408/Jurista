import { AlertTriangle, Gavel, Scale } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';

const STATS = [
  { icon: Scale, value: 70, suffix: '%', label: 'of Indians lack basic legal awareness' },
  { icon: Gavel, value: 3, suffix: '+ yrs', label: 'average duration of a court case' },
  { icon: AlertTriangle, value: 15000000, suffix: '+', label: 'pending court cases' },
];

/** "The Problem We Solve" — editorial split layout with stat cards. */
export function ProblemSection() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        {/* Editorial sidebar heading */}
        <ScrollReveal>
          <div className="lg:sticky lg:top-32">
            <p className="label-caps">The Problem</p>
            <h2 className="mt-4 font-serif text-5xl font-bold leading-[1.05]">
              The
              <br />
              Problem
              <br />
              We Solve
            </h2>
            <div className="mt-6 h-px w-24 bg-accent/60" />
          </div>
        </ScrollReveal>

        {/* Narrative + stats */}
        <div>
          <ScrollReveal>
            <p className="font-serif text-2xl leading-snug sm:text-3xl">
              India has <strong className="text-accent">1,500+ central acts</strong>,{' '}
              <strong className="text-accent">40,000+ state laws</strong>, and millions of case
              precedents. Yet most citizens, students, and even lawyers struggle to navigate this
              labyrinth.
            </p>
            <p className="mt-6 leading-relaxed text-[var(--text-secondary)]">
              Legal knowledge in India is abundant but inaccessible. It lives in dense
              commentaries, paywalled databases, and thousands of pages written for specialists —
              not for the student preparing for an exam, the tenant fighting an eviction, or the
              small business owner drafting a contract by flashlight.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STATS.map(({ icon: Icon, value, suffix, label }, i) => (
              <ScrollReveal key={label} delay={0.1 * i}>
                <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 shadow-card">
                  <Icon className="h-5 w-5 text-accent" />
                  <p className="mt-3 font-serif text-3xl font-bold text-accent">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </p>
                  <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
