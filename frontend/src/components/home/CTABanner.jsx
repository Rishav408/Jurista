import { motion } from 'framer-motion';
import { ArrowRight, Lock, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import Button from '../ui/Button';
import ScrollReveal from '../ui/ScrollReveal';

const PERKS = [
  { icon: Zap, label: 'Instant answers' },
  { icon: Lock, label: 'Secure & private' },
  { icon: Smartphone, label: 'Any device' },
];

/** Full-width gradient CTA with floating glyph animation. */
export function CTABanner() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <ScrollReveal>
        <div className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#b45309] via-[#a34a04] to-[#b45309] px-6 py-16 text-center shadow-lift sm:px-12 sm:py-20">
          {/* Floating glyphs */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {['⚖', '§', '¶'].map((glyph, i) => (
              <motion.span
                key={glyph}
                className="absolute text-5xl text-white/10"
                style={{ left: `${12 + i * 34}%`, top: i % 2 ? '22%' : '58%' }}
                animate={{ y: [0, -16, 0], rotate: [0, i % 2 ? 8 : -8, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                {glyph}
              </motion.span>
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              Ready to transform your legal research?
            </h2>
            <p className="mt-4 text-lg text-white">
              No sign-up barriers. Ask your first legal question in seconds.
            </p>
            <div className="mt-8">
              <Button to="/chat" size="lg" variant="onAccent" iconRight={ArrowRight}>
                Start Free — No Account Needed
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white">
              {PERKS.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </li>
              ))}
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Verifiable citations
              </li>
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export default CTABanner;
