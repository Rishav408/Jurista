import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const TESTIMONIALS = [
  {
    quote:
      'Jurista has fundamentally changed how I prepare for moot court competitions. Research that took hours now takes minutes.',
    name: 'Law Student',
    org: 'NLU Delhi',
  },
  {
    quote:
      "The citation-first approach is what sets it apart. Every answer comes with the exact section or case — I can verify everything.",
    name: 'Young Advocate',
    org: 'Delhi High Court practice',
  },
  {
    quote:
      'I recommend it to my juniors. It makes navigating IPC and CrPC approachable even for first-year students.',
    name: 'Faculty Member',
    org: 'Law University',
  },
];

/** Auto-rotating testimonial carousel. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [paused, next]);

  const current = TESTIMONIALS[index];

  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal className="text-center">
          <p className="label-caps">Trusted by legal minds</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            What early users are saying
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="relative mt-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center shadow-card sm:p-12">
              <Quote className="mx-auto h-10 w-10 text-accent/30" aria-hidden />
              <div className="min-h-[230px] sm:min-h-[190px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <blockquote className="mt-6 font-serif text-xl italic leading-relaxed sm:text-2xl">
                      "{current.quote}"
                    </blockquote>
                    <footer className="mt-6">
                      <p className="font-semibold">{current.name}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{current.org}</p>
                    </footer>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:border-accent/40 hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 bg-accent' : 'w-2 bg-[var(--text-muted)] hover:bg-accent/50'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:border-accent/40 hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Testimonials;
