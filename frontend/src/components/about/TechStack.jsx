import { Quote } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import Badge from '../ui/Badge';

const STACK = [
  { name: 'Gemini', role: 'Reasoning LLM' },
  { name: 'RAG Pipeline', role: 'Retrieval-augmented generation' },
  { name: 'DuckDuckGo', role: 'Live legal search fallback' },
  { name: 'Flask', role: 'Backend API' },
  { name: 'React + Vite', role: 'This frontend' },
  { name: 'Firebase', role: 'Hosting & delivery' },
];

/** Tech stack showcase with logo pills. */
export function TechStack() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl">
          <p className="label-caps">Under the hood</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Built with modern AI</h2>
        </ScrollReveal>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {STACK.map((item, i) => (
            <ScrollReveal key={item.name} delay={0.07 * i}>
              <div className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <p className="font-semibold">{item.name}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{item.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <figure className="mx-auto mt-12 max-w-2xl">
            <Quote className="mx-auto h-8 w-8 text-accent/30" aria-hidden />
            <blockquote className="mt-4 font-serif text-xl italic leading-relaxed sm:text-2xl">
              "We combine Google's Gemini with retrieval-augmented generation to deliver accurate,
              sourced legal answers — never unsourced guesses."
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-center">
              <Badge variant="accent" dot>
                Grounded in statute & case law
              </Badge>
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default TechStack;
