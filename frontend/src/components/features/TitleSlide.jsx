import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

/** Slide 1 — title slide with animated "scroll to explore" cue. */
export function TitleSlide() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-mesh-hero">
      <div className="grain absolute inset-0" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="label-caps"
        >
          Jurista Features
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8, ease: easing }}
          className="mt-4 max-w-3xl font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
        >
          Everything you need for{' '}
          <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
            Indian legal intelligence
          </span>
          .
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-5 max-w-xl text-lg text-[var(--text-secondary)]"
        >
          Scroll or use the ↑ ↓ arrows to explore each capability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-10"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="grid h-12 w-12 place-items-center rounded-full border border-accent/30 text-accent"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default TitleSlide;
