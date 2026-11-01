import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import LiveDemo from './LiveDemo';

/** Hero: mesh gradient background, word-by-word headline, CTAs, live demo card. */
export function HeroSection() {
  return (
    <section className="grain relative overflow-hidden bg-mesh-hero pb-20 pt-16 sm:pb-24 sm:pt-24">
      {/* Floating translucent scale icons */}
      <FloatingIcons />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-caps"
          >
            <Sparkles className="mr-1.5 inline h-4 w-4 -translate-y-0.5" />
            AI-Powered Indian Legal Intelligence
          </motion.p>

          <h1 className="mt-5 font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <WordReveal text="Navigate Indian Law" className="block" />
            <WordReveal
              text="with Confidence."
              className="mt-1 block bg-gradient-to-r from-accent via-accent-light to-accent-hover bg-clip-text text-transparent"
              offset={4}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            Jurista brings together 50,000+ legal sections, landmark cases, and real-time updates
            with AI that understands Indian law.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button to="/chat" size="lg" iconRight={ArrowRight}>
              Start Research
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconRight={ChevronDown}
              onClick={() =>
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See How It Works
            </Button>
          </motion.div>
        </div>

        {/* Live demo card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <LiveDemo />
        </motion.div>
      </div>
    </section>
  );
}

/** Splits on words; each word fades in with staggered delay. */
function WordReveal({ text, className = '', offset = 0 }) {
  return (
    <span className={`word-reveal ${className}`} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          style={{ animationDelay: `${(offset + i) * 0.35}s` }}
          aria-hidden
        >
          {word}
          {i < text.split(' ').length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}

/** Slow-drifting ⚖ glyphs on the hero background. */
function FloatingIcons() {
  const icons = [
    { size: 40, top: '12%', left: '8%', delay: 0, duration: 11 },
    { size: 28, top: '60%', left: '16%', delay: 2, duration: 13 },
    { size: 34, top: '18%', right: '10%', delay: 1, duration: 12 },
    { size: 26, top: '68%', right: '18%', delay: 3, duration: 10 },
    { size: 30, top: '40%', left: '2.5%', delay: 4, duration: 14 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden select-none overflow-hidden md:block" aria-hidden>
      {icons.map((icon, i) => (
        <motion.span
          key={i}
          className="absolute text-accent/10"
          style={{ top: icon.top, left: icon.left, right: icon.right, fontSize: icon.size }}
          animate={{ y: [0, -18, 0], rotate: [0, i % 2 ? 6 : -6, 0] }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ⚖
        </motion.span>
      ))}
    </div>
  );
}

export default HeroSection;
