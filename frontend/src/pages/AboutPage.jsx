import AboutHero from '../components/about/AboutHero';
import ProblemSection from '../components/about/ProblemSection';
import SolutionSection from '../components/about/SolutionSection';
import TechStack from '../components/about/TechStack';
import Roadmap from '../components/about/Roadmap';
import TeamSection from '../components/about/TeamSection';

/** About page — editorial magazine layout telling Jurista's story. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ProblemSection />
      <SolutionSection />
      <TechStack />
      <Roadmap />
      <TeamSection />
    </>
  );
}
