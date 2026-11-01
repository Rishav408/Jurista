import { motion } from 'framer-motion';

const easing = [0.22, 1, 0.36, 1];

/** About hero — editorial statement with accent-highlighted line. */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-mesh-hero pb-16 pt-24 sm:pb-20 sm:pt-32">
      <div className="grain absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-caps"
          >
            About Jurista
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: easing }}
            className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            We believe legal knowledge should be a{' '}
            <span className="relative inline-block text-accent">
              right
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: easing }}
                className="absolute inset-x-0 bottom-1 -z-10 h-3 origin-left bg-accent/15 sm:h-4"
                aria-hidden="true"
              />
            </span>
            , not a privilege.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            Jurista was born from a simple idea: what if anyone in India could understand the law
            that governs them? This is our answer — an AI research companion that reads the
            statutes so you don't have to, and always shows its sources.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
