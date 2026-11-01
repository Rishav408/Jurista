import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Check, Loader, Sparkles } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const easing = [0.22, 1, 0.36, 1];

const PHASES = [
  {
    id: 1,
    state: 'done',
    title: 'Foundation',
    summary: 'Core chat, basic RAG',
    details: [
      'Conversational legal chat powered by Gemini',
      'Statutory retrieval across IPC, CrPC & the Constitution',
      'Citation-based answers from day one',
    ],
  },
  {
    id: 2,
    state: 'done',
    title: 'Advanced RAG',
    summary: 'Hybrid search & citations',
    details: [
      'Intelligent search-decision engine with web fallback',
      'DuckDuckGo live legal search integration',
      'Source metadata and verification chips',
    ],
  },
  {
    id: 3,
    state: 'done',
    title: 'Workspace experience',
    summary: 'Threads, documents, transitions',
    details: [
      'Threaded conversations with local persistence',
      'Document upload & in-chat analysis (PDF/TXT/DOCX)',
      'IPC → BNS transitional mapping',
    ],
  },
  {
    id: 4,
    state: 'current',
    title: 'Refinement',
    summary: 'Better reasoning, cleaner UX',
    details: [
      'New React workspace (this release)',
      'Improved answer structuring and document scoping',
      'Performance and reliability hardening',
    ],
  },
  {
    id: 5,
    state: 'future',
    title: 'Specialized AI',
    summary: 'Fine-tuned legal reasoning',
    details: [
      'Fine-tuned model for Indian legal reasoning',
      'Multi-document comparison workflows',
      'Voice and vernacular-language research',
    ],
  },
  {
    id: 6,
    state: 'future',
    title: 'Public Platform',
    summary: 'Accounts & collaboration',
    details: [
      'User accounts and sync across devices',
      'Sharing and export of research threads',
      'Open APIs for educators and clinics',
    ],
  },
];

const STATE_STYLES = {
  done: {
    icon: <Check className="h-4 w-4" strokeWidth={3} />,
    ring: 'bg-success text-[var(--bg-primary)]',
    glow: '',
  },
  current: {
    icon: <Loader className="h-4 w-4" strokeWidth={2.5} />,
    ring: 'bg-accent text-white',
    glow: 'animate-pulse shadow-glow',
  },
  future: {
    icon: <Sparkles className="h-4 w-4" strokeWidth={2} />,
    ring: 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] ring-1 ring-[var(--border)]',
    glow: '',
  },
};

/** Horizontal roadmap timeline; click a node to expand details. */
export function Roadmap() {
  const [openId, setOpenId] = useState(4);

  return (
    <section className="overflow-hidden bg-[var(--bg-secondary)] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="label-caps">Roadmap</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Where Jurista has been — and where it's going
          </h2>
        </ScrollReveal>

        {/* Timeline track */}
        <div className="relative mt-16 pb-4">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-[3.25rem] rounded bg-[var(--border)] max-lg:hidden" aria-hidden />
          <div className="grid gap-4 md:grid-cols-3 md:gap-2 lg:grid-cols-6">
            {PHASES.map((phase, i) => {
              const style = STATE_STYLES[phase.state];
              const isOpen = openId === phase.id;
              return (
                <ScrollReveal key={phase.id} delay={0.06 * i}>
                  <div className="relative">
                    {/* Node */}
                    <div className="flex items-center gap-3 md:flex-col">
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${style.ring} ${style.glow}`}
                      >
                        {style.icon}
                      </span>
                      <span
                        className={`text-xs font-medium uppercase tracking-wider ${
                          phase.state === 'current' ? 'text-accent' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {phase.state === 'current' ? 'Now' : `Phase ${phase.id}`}
                      </span>
                    </div>
                    {/* Card */}
                    <button
                      onClick={() => setOpenId(isOpen ? null : phase.id)}
                      aria-expanded={isOpen}
                      className={`mt-3 w-full rounded-2xl border p-4 text-left transition-all md:mt-5 ${
                        isOpen
                          ? 'border-accent/40 bg-[var(--surface-ai)] shadow-lift'
                          : 'border-[var(--border)] bg-[var(--surface-ai)] shadow-card hover:border-accent/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold leading-tight">{phase.title}</h3>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">{phase.summary}</p>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: easing }}
                            className="overflow-hidden"
                          >
                            {phase.details.map((detail) => (
                              <li key={detail} className="pt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                                • {detail}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Roadmap;
