import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bot, BookOpen, FileSearch, MessageSquare } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

/** "Our Solution" — animated data-flow visualization. */
export function SolutionSection() {
  const reduceMotion = useReducedMotion();
  const stages = [
    {
      icon: MessageSquare,
      title: 'Your question',
      text: 'Typed in plain English — or upload a document directly.',
    },
    {
      icon: Bot,
      title: 'RAG engine',
      text: 'Gemini 2.5 + retrieval across statutes, precedents, and live web search fallback.',
    },
    {
      icon: BookOpen,
      title: 'Verified sources',
      text: 'Every claim pinned to the exact section or judgment it came from.',
    },
    {
      icon: FileSearch,
      title: 'Clear answer',
      text: 'A plain-language response with citation chips — ready to actually use.',
    },
  ];

  return (
    <section className="bg-[var(--bg-secondary)] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="label-caps">Our Solution</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            How AI + legal data becomes an accessible answer
          </h2>
        </ScrollReveal>

        {/* Flow visualization: connected stages */}
        <div className="mt-16 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-3">
          {stages.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="contents">
              <ScrollReveal delay={i * 0.15}>
                <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface-ai)] p-6 shadow-card">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{text}</p>
                </div>
              </ScrollReveal>
              {i < stages.length - 1 && (
                <motion.div
                  className="hidden justify-center lg:flex"
                  animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 1.6, repeat: Infinity, delay: i * 0.3 }
                  }
                  aria-hidden="true"
                >
                  <ArrowRight className="h-5 w-5 text-accent/60" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.5} className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            <strong>Grounded generation</strong> — the model answers only from retrieved material
            when statute matters, and says so when it's using general knowledge instead.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default SolutionSection;
