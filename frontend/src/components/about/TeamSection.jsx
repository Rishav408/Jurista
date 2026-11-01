import { Github, Mail } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import Badge from '../ui/Badge';
import JuristaMark from '../ui/JuristaMark';

/** Creator profile card + project stats. */
export function TeamSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="label-caps">The person behind it</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Built by a builder</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center shadow-card">
            <JuristaMark
              type="icon"
              alt="Jurista crest"
              className="mx-auto h-20 w-20 rounded-full shadow-glow"
            />
            <h3 className="mt-5 font-serif text-2xl font-bold">Rishav Singh</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Creator & maintainer of Jurista
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              Jurista started as a question during late-night case reading: why should legal
              research in India still be manual? It is being built in the open, one commit at a
              time.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="accent">Open project</Badge>
              <Badge variant="neutral">Gemini 2.5</Badge>
              <Badge variant="neutral">RAG architecture</Badge>
            </div>

            <div className="mt-7 flex items-center justify-center gap-3">
              <a
                href="https://github.com/Rishav408"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="mailto:hello@jurista.legal"
                aria-label="Email the creator"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                <Mail className="h-4 w-4" /> Say hello
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default TeamSection;
