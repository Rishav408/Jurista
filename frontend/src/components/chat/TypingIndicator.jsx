import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JuristaMark from '../ui/JuristaMark';

/** "Jurista is thinking…" row with animated dots + elapsed seconds. */
export function TypingIndicator() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
      aria-live="polite"
      role="status"
    >
      <div className="max-w-[88%] sm:max-w-[80%]">
        <div className="flex items-center gap-2">
          <JuristaMark type="mono" className="h-6 w-6 rounded-full" />
          <p className="text-xs font-semibold text-accent">Jurista</p>
        </div>
        <div className="mt-1.5 flex items-center gap-2.5 rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--surface-ai)] px-4 py-3.5 shadow-card">
          <span className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.16 }}
              />
            ))}
          </span>
          <span className="text-sm text-[var(--text-secondary)]">
            Jurista is thinking… {elapsed > 3 && <span className="tabular-nums text-[var(--text-muted)]">{elapsed}s</span>}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default TypingIndicator;
