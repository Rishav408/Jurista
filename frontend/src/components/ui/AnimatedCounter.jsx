/** Animated stat counter — counts up when scrolled into view. */
import { useEffect, useRef, useState } from 'react';

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
  className = '',
  format = 'grouped', // 'grouped' | 'plain' | 'compact'
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const rafRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const animate = () => {
      if (started.current) return;
      started.current = true;

      if (prefersReducedMotion()) {
        setDisplay(value);
        return;
      }

      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && animate(),
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {renderNumber(display, format)}
      {suffix}
    </span>
  );
}

function renderNumber(n, format) {
  if (format === 'compact') {
    return n >= 1000 ? `${Math.round(n / 1000)}K` : String(n);
  }
  if (format === 'grouped') return n.toLocaleString('en-IN');
  return String(n);
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default AnimatedCounter;
