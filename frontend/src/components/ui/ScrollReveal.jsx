/**
 * ScrollReveal — Framer Motion wrapper that fades content up on scroll.
 *
 *   <ScrollReveal delay={0.1}><Card …/></ScrollReveal>
 *
 * Respects prefers-reduced-motion (renders statically when reduced).
 */
import { motion, useReducedMotion } from 'framer-motion';

const easing = [0.22, 1, 0.36, 1];

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 28,
  once = true,
  amount = 0.2,
  className = '',
  as = 'div',
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} style={{ opacity: 1 }}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </MotionTag>
  );
}

export default ScrollReveal;
