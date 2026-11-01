import { useCallback, useState } from 'react';
import SlideDeck from '../components/features/SlideDeck';
import SlideNavigation from '../components/features/SlideNavigation';
import TitleSlide from '../components/features/TitleSlide';
import { FEATURE_SLIDES } from '../components/features/FeatureSlides';
import CTASlide from '../components/features/CTASlide';

/**
 * Features page — PPT-style full-screen slide deck.
 * Scroll-snap + keyboard arrows + dot rail. Entered via the navbar.
 */
export default function FeaturesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index) => {
    // The deck renders root-level snap sections; pick by deck order.
    const deck = document.querySelector('.snap-container');
    const target = deck?.querySelectorAll(':scope > section')?.[index];
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const slides = [<TitleSlide key="title" />, ...FEATURE_SLIDES, <CTASlide key="cta" />];

  return (
    <div className="-mt-20">
      {/* Compensate PageLayout's pt-20 so the full-viewport deck sits flush with
          the screen; slide content clears the navbar via SlideDeck's pt-20. */}
      <SlideDeck onActiveChange={setActiveIndex}>{slides}</SlideDeck>
      <SlideNavigation count={slides.length} activeIndex={activeIndex} onDotClick={scrollTo} />
    </div>
  );
}
