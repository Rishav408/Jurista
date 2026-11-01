import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * SlideDeck — full-viewport scroll-snap slide container.
 *
 * Each child receives `index` and is expected to be a full-height snap
 * section. Tracks the active slide via IntersectionObserver and exposes
 * keyboard navigation (Arrow/Page keys) plus `activeIndex` to renderers.
 */
export function SlideDeck({ children, onActiveChange }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const scrollTo = useCallback((index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Track which slide is in view.
  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { root: containerRef.current, threshold: 0.55 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    onActiveChange?.(activeIndex);
  }, [activeIndex, onActiveChange]);

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e) => {
      // Don't hijack Space when an interactive element is focused — it should
      // activate that element, not advance the deck.
      const tag = document.activeElement?.tagName;
      if (e.key === ' ' && ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

      const keysNext = ['ArrowDown', 'PageDown', ' '];
      const keysPrev = ['ArrowUp', 'PageUp'];
      if (keysNext.includes(e.key)) {
        e.preventDefault();
        scrollTo(Math.min(activeIndex + 1, sectionRefs.current.length - 1));
      } else if (keysPrev.includes(e.key)) {
        e.preventDefault();
        scrollTo(Math.max(activeIndex - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollTo(sectionRefs.current.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, scrollTo]);

  const count = Array.isArray(children) ? children.length : 1;

  return (
    <div
      ref={containerRef}
      className="snap-container h-[100svh] overflow-y-auto overscroll-y-contain scrollbar-slim"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {Array.isArray(children)
        ? children.map((child, i) =>
            child ? (
              <section
                key={child.key ?? i}
                ref={(el) => (sectionRefs.current[i] = el)}
                data-index={i}
                className="h-[100svh] flex items-center justify-center"
                style={{ scrollSnapAlign: 'start' }}
                aria-label={`Slide ${i + 1} of ${count}`}
              >
                <div className="h-full w-full pt-20 pb-14">{child}</div>
              </section>
            ) : null
          )
        : (
            <section
              ref={(el) => (sectionRefs.current[0] = el)}
              data-index={0}
              className="h-[100svh] flex items-center justify-center"
              style={{ scrollSnapAlign: 'start' }}
            >
              {children}
            </section>
          )}
    </div>
  );
}

/** Extracts `index` from a React element to position it within the deck. */
export function useSnapStyles() {
  return {
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
  };
}

export default SlideDeck;
