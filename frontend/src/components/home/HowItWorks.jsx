import { motion } from 'framer-motion';
import { ClipboardList, MessageCircleQuestion, Search } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const STEPS = [
  {
    icon: MessageCircleQuestion,
    title: 'Ask your question',
    text: 'Type any legal question in plain English — no jargon required.',
  },
  {
    icon: Search,
    title: 'AI searches & reasons',
    text: 'Our RAG engine retrieves relevant statutes, precedents, and updates.',
  },
  {
    icon: ClipboardList,
    title: 'Get cited answers',
    text: 'Receive a clear answer with exact sections and case citations.',
  },
];

/** "How It Works" — 3 steps connected by an animated SVG path. */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="label-caps">How It Works</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            From question to citation in three steps
          </h2>
        </ScrollReveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Animated connector path (desktop only, behind the cards) */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-14 hidden h-2 w-full md:block"
            viewBox="0 -2 100 6"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d="M 16 1 C 40 -1, 60 3, 84 1"
              stroke="var(--accent)"
              strokeWidth="0.4"
              strokeDasharray="2 2"
              fill="none"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
            />
          </svg>

          {STEPS.map((step, i) => (
            <ScrollReveal key={step.title} delay={0.15 * i}>
              <div className="relative mx-auto max-w-sm text-center">
                <div className="relative z-10 mx-auto grid h-28 w-28 place-items-center rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-card">
                  <step.icon className="h-10 w-10 text-accent" strokeWidth={1.6} />
                  <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-accent-deep font-sans text-sm font-bold text-white shadow-glow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {step.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
