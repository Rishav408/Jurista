import HeroSection from '../components/home/HeroSection';
import StatsTicker from '../components/home/StatsTicker';
import HowItWorks from '../components/home/HowItWorks';
import FeatureCards from '../components/home/FeatureCards';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';

/** Homepage — premium product-launch style, scrollable story. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsTicker />
      <HowItWorks />
      <FeatureCards />
      <Testimonials />
      <CTABanner />
    </>
  );
}
