import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

/**
 * FeatureSlide — reusable template for the numbered feature slides.
 * Props:
 *   number, title, description, bullets, demo (ReactNode), cta
 */
export function FeatureSlide({ number, title, description, bullets = [], demo, cta }) {
  const [demoDone, setDemoDone] = useState(false);

  return (
    <div className="relative h-full overflow-hidden bg-[var(--bg-primary)]">
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-14 md:py-0">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Copy half */}
          <div className="order-2 md:order-1">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-5xl font-bold text-accent/25"
            >
              {number}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-1 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-lg text-base leading-relaxed text-[var(--text-secondary)]"
            >
              {description}
            </motion.p>

            <ul className="mt-6 space-y-3">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.12 }}
                  className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/25">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {bullet}
                </motion.li>
              ))}
            </ul>

            {cta && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8"
              >
                <Button to={cta.to} variant="outline" iconRight={ArrowRight}>
                  {cta.label}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Demo half */}
          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
              onViewportEnter={() => setDemoDone(true)}
            >
              {typeof demo === 'function' ? demo(demoDone) : demo}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Giant ghost number in the background */}
      <div
        className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[22rem] font-bold text-accent/[0.04] lg:block"
        aria-hidden="true"
      >
        {number}
      </div>
    </div>
  );
}

/** Slide-local helper for staggering demo lines. */
export function DemoLine({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Loading dots used inside demo windows ("extracting principles..."). */
export function DemoThinking({ label }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      {label && <span className="ml-1">{label}</span>}
    </div>
  );
}

/** Generic window chrome for demo mockups. */
export function DemoWindow({ title, children, footer }) {
  return (
    <div className="glass-strong overflow-hidden rounded-2xl shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-[var(--glass-border)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        {title && <span className="ml-2 text-[11px] text-[var(--text-muted)]">{title}</span>}
      </div>
      <div className="space-y-3 bg-[var(--bg-secondary)] p-4 sm:p-5">{children}</div>
      {footer && (
        <div className="border-t border-[var(--glass-border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-[11px] text-[var(--text-muted)]">
          {footer}
        </div>
      )}
    </div>
  );
}

export default FeatureSlide;
