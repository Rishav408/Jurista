import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Landmark, MessagesSquare, Database } from 'lucide-react';
import Button from '../ui/Button';
import ScrollReveal from '../ui/ScrollReveal';

/** Interactive feature cards with parallax follow + hover reveals. */
const FEATURES = [
  {
    icon: Database,
    title: 'Legal Database',
    text: '50,000+ sections across the Constitution, IPC, CrPC and more — indexed and cross-referenced.',
    cta: { label: 'Explore features', to: '/features' },
    reveal: (
      <div className="space-y-1.5">
        {['Constitution of India', 'Indian Penal Code', 'Code of Criminal Procedure'].map(
          (layer, i) => (
            <motion.div
              key={layer}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i }}
              className="rounded-lg bg-[var(--bg-tertiary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
              style={{ marginLeft: `${8 * i}px` }}
            >
              {layer}
            </motion.div>
          )
        )}
      </div>
    ),
  },
  {
    icon: Landmark,
    title: 'Case Analysis',
    text: 'Landmark judgments distilled into plain-language summaries with ratio decidendi extraction.',
    cta: { label: 'See how it works', to: '/features' },
    reveal: (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-xs">
        <p className="font-semibold text-[var(--text-primary)]">K.S. Puttaswamy v. Union of India</p>
        <p className="mt-1 text-[var(--text-secondary)]">
          Privacy declared a fundamental right under Article 21 — 9-judge bench, 2017.
        </p>
      </div>
    ),
  },
  {
    icon: MessagesSquare,
    title: 'AI Chat',
    text: 'Conversational research assistant with verifiable citations and real-time updates.',
    cta: { label: 'Try the workspace', to: '/chat' },
    reveal: (
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-accent"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
        <span className="ml-2 text-xs text-[var(--text-secondary)]">Jurista is answering…</span>
      </div>
    ),
  },
];

export function FeatureCards() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="bg-[var(--bg-secondary)] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="label-caps">Features</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Built for serious legal research
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Three pillars that make Jurista a genuine research companion.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={0.12 * i} className="h-full">
              <ParallaxCard
                feature={feature}
                expanded={expandedId === feature.title}
                onToggle={() =>
                  setExpandedId((cur) => (cur === feature.title ? null : feature.title))
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({ feature: { icon: Icon, title, text, cta, reveal }, expanded, onToggle }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Tap-to-expand keeps the reveal details accessible on touch screens,
  // where hover-driven expansion is unavailable.
  const handleCardClick = (e) => {
    if (e.target.closest('a, button')) return;
    onToggle?.();
  };

  return (
    <motion.div
      ref={ref}
      onClick={handleCardClick}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mx.set(0);
        my.set(0);
      }}
      style={
        reduceMotion
          ? undefined
          : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }
      }
      className="group flex h-full cursor-pointer flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-ai)] p-6 shadow-card transition-shadow hover:shadow-lift"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{text}</p>

      {/* Hover/tap reveal area */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          hovered || expanded ? 'mt-4 max-h-40 opacity-100' : 'mt-0 max-h-0 opacity-0'
        }`}
      >
        {reveal}
      </div>

      <Button to={cta.to} variant="ghost" size="sm" className="mt-4 justify-start px-0 hover:bg-transparent hover:text-accent" iconRight={ArrowFallback}>
        {cta.label}
      </Button>
    </motion.div>
  );
}

// Tiny arrow to avoid another lucide import churn in this file.
function ArrowFallback({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default FeatureCards;
