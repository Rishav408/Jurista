import { motion } from 'framer-motion';
import { CHAT_SUGGESTIONS } from '../../lib/constants';
import JuristaMark from '../ui/JuristaMark';

/** Empty-thread welcome state with 2×2 clickable suggestion cards. */
export function WelcomeScreen({ onSuggestion, error }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="relative"
      >
        <div className="absolute -inset-6 rounded-full bg-accent/10 blur-2xl" aria-hidden />
        <JuristaMark
          type="mono"
          className="relative h-20 w-20 rounded-3xl shadow-glow"
        />
      </motion.div>

      <h1 className="mt-7 font-serif text-3xl font-bold sm:text-4xl">Welcome to Jurista</h1>
      <p className="mt-2 max-w-sm text-[var(--text-secondary)]">
        Your AI legal research assistant for Indian law.
      </p>

      <p className="mt-8 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
        Try asking
      </p>
      <div className="mt-3 grid w-full max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
        {CHAT_SUGGESTIONS.map((suggestion, i) => (
          <motion.button
            key={suggestion.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            onClick={() => onSuggestion(suggestion.title)}
            className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift"
          >
            <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-accent">
              → "{suggestion.title}"
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{suggestion.subtitle}</p>
          </motion.button>
        ))}
      </div>

      {error && (
        <p className="mt-8 max-w-md rounded-xl border border-[var(--error)] bg-[var(--error-subtle)] px-4 py-3 text-sm text-[var(--error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default WelcomeScreen;
