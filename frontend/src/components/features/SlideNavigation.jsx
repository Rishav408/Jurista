import { ChevronUp } from 'lucide-react';

/**
 * SlideNavigation — right-edge dot indicators + top progress bar +
 * "Slide X of N" chip. Fixed overlays; keyboard hints live in the deck.
 */
export function SlideNavigation({ count, activeIndex, onDotClick }) {
  const progress = count > 1 ? ((activeIndex + 1) / count) * 100 : 100;

  return (
    <>
      {/* Top progress bar — sits above the navbar (z-50) at the top edge */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-[var(--bg-tertiary)]" aria-hidden>
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Position chip — kept below the fixed navbar (80px unscrolled) */}
      <div className="fixed left-1/2 top-20 z-40 -translate-x-1/2">
        <span className="glass rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wider text-[var(--text-secondary)]">
          Slide {activeIndex + 1} <span className="text-[var(--text-muted)]">of {count}</span>
        </span>
      </div>

      {/* Dot rail — desktop */}
      <nav
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
        aria-label="Slide navigation"
      >
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === activeIndex}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'h-6 w-2.5 bg-accent shadow-glow'
                : 'h-2.5 w-2.5 bg-[var(--text-muted)] opacity-40 hover:bg-accent hover:opacity-100'
            }`}
          />
        ))}
      </nav>

      {/* Dot rail — mobile (horizontal, bottom) */}
      <nav
        className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 md:hidden"
        aria-label="Slide navigation"
      >
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === activeIndex}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? 'h-2.5 w-6 bg-accent' : 'h-2 w-2 bg-[var(--text-muted)] opacity-50'
            }`}
          />
        ))}
      </nav>

      {/* Back to top */}
      <button
        onClick={() => onDotClick(0)}
        aria-label="Back to first slide"
        className="glass fixed bottom-5 right-5 z-40 hidden h-10 w-10 place-items-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-accent md:grid"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  );
}

export default SlideNavigation;
