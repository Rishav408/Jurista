import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Paperclip } from 'lucide-react';

/**
 * Animated mock chat conversation used on the hero.
 * Loops: user question types out → thinking dots → assistant answer
 * streams in → citation chips pop → pause → restart.
 */
const DEMO = {
  question: "What are my rights if I'm arrested?",
  answer:
    'Under Article 22 of the Indian Constitution and Section 50 of CrPC, every arrested person must be told the grounds of arrest, has the right to consult a lawyer of their choice, and must be produced before a magistrate within 24 hours.',
  sources: ['Article 22', 'CrPC §50', 'CrPC §41D'],
};

const TYPE_SPEED_MS = 38;

export function LiveDemo() {
  const [typedQuestion, setTypedQuestion] = useState('');
  const [thinking, setThinking] = useState(false);
  const [streamedAnswer, setStreamedAnswer] = useState('');
  const [showSources, setShowSources] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const intervals = [];
    const timeouts = [];

    const run = () => {
      // 1. Type the user question
      let q = 0;
      const typeQ = setInterval(() => {
        if (cancelled) return clearInterval(typeQ);
        q += 1;
        setTypedQuestion(DEMO.question.slice(0, q));
        if (q >= DEMO.question.length) {
          clearInterval(typeQ);
          // 2. Thinking phase
          timeouts.push(setTimeout(() => setThinking(true), 350));
          // 3. Stream the answer
          timeouts.push(
            setTimeout(() => {
              if (cancelled) return;
              setThinking(false);
              let a = 0;
              const typeA = setInterval(() => {
                if (cancelled) return clearInterval(typeA);
                a += 3;
                setStreamedAnswer(DEMO.answer.slice(0, a));
                if (a >= DEMO.answer.length) {
                  clearInterval(typeA);
                  // 4. Citation chips
                  timeouts.push(setTimeout(() => setShowSources(true), 250));
                  // 5. Reset for the next loop
                  timeouts.push(
                    setTimeout(() => {
                      if (cancelled) return;
                      setTypedQuestion('');
                      setStreamedAnswer('');
                      setShowSources(false);
                      setCycle((c) => c + 1);
                    }, 4200)
                  );
                }
              }, 24);
              intervals.push(typeA);
            }, 1400)
          );
        }
      }, TYPE_SPEED_MS);
      intervals.push(typeQ);
    };

    run();
    return () => {
      cancelled = true;
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [cycle]);

  return (
    <div className="glass-strong relative rounded-2xl p-1 shadow-lift">
      {/* Browser-chrome strip */}
      <div className="flex items-center gap-1.5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-[var(--text-muted)]">jurista — live preview</span>
      </div>

      <div className="space-y-3 rounded-xl bg-[var(--bg-secondary)] p-4 sm:p-5">
        {/* User bubble */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-navy px-4 py-2.5 text-sm text-white shadow-card dark:bg-navy-light">
            {typedQuestion || '\u00A0'}
            {typedQuestion.length < DEMO.question.length && (
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-white/70 align-middle" />
            )}
          </div>
        </div>

        {/* Assistant bubble */}
        {(thinking || streamedAnswer) && (
          <div className="flex justify-start">
            <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--surface-ai)] px-4 py-3 text-sm shadow-card">
              {thinking ? (
                <span className="flex items-center gap-1.5 py-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                    />
                  ))}
                  <span className="ml-1 text-xs text-[var(--text-muted)]">Jurista is thinking…</span>
                </span>
              ) : (
                <>
                  <span className="whitespace-pre-wrap">{streamedAnswer}</span>
                  {streamedAnswer.length < DEMO.answer.length && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-accent align-middle" />
                  )}
                </>
              )}

              {showSources && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 border-t border-[var(--border-subtle)] pt-3"
                >
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                      <Paperclip className="h-3 w-3" /> Sources:
                    </span>
                    {DEMO.sources.map((source, i) => (
                      <motion.span
                        key={source}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.12 }}
                        className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent ring-1 ring-accent/20"
                      >
                        <BadgeCheck className="h-3 w-3" />
                        {source}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveDemo;
