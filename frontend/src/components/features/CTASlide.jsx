import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Button from '../ui/Button';

const easing = [0.22, 1, 0.36, 1];

/** Slide 7 — closing call-to-action. */
export function CTASlide() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="label-caps"
        >
          Your research journey starts here
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: easing }}
          className="mt-4 max-w-2xl font-serif text-4xl font-bold sm:text-5xl lg:text-6xl"
        >
          Ready to experience it?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="mt-4 max-w-md text-[var(--text-secondary)]"
        >
          No account needed. Completely free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button to="/chat" size="lg" iconRight={ArrowUp} className="[&>svg]:rotate-90">
            Start Using Jurista
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconRight={ArrowUp}
            onClick={() =>
              document
                .querySelectorAll('section')
                .item(0)
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Back to Top
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default CTASlide;
