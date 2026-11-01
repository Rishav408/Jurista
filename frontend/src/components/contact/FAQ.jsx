import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const FAQS = [
  {
    q: 'Is Jurista really free to use?',
    a: 'Yes. The chat workspace, document analysis, and legal research features are free and require no account. We may introduce advanced features for teams later, but the core research experience stays free.',
  },
  {
    q: 'Do you store my conversations?',
    a: 'Your threads are stored locally in your own browser — nothing is kept on Jurista servers between sessions. Backend conversation memory exists only to maintain context within an active thread.',
  },
  {
    q: 'Can I rely on Jurista for legal advice?',
    a: 'Jurista is a research assistant, not a lawyer. It provides cited legal information for education and research. For any real legal matter, always consult a qualified advocate — the answers are best used as a starting point.',
  },
  {
    q: 'How accurate are the citations?',
    a: 'Every answer is grounded through retrieval over statutes and case law, and we show the exact sections used so you can verify them. If the model cannot ground an answer, it tells you so instead of inventing a source.',
  },
];

/** FAQ accordion — 4 common questions, animated open/close. */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="pt-2 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <ScrollReveal className="text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
        </ScrollReveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={faq.q} delay={0.06 * i}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen ? 'border-accent/35 bg-[var(--bg-secondary)]' : 'border-[var(--border)]'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
