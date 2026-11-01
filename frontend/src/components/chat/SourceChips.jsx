import { ExternalLink } from 'lucide-react';

/** Citation pills for web sources consulted by the AI. */
export function SourceChips({ sources = [] }) {
  if (!sources.length) return null;
  return (
    <>
      <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Sources consulted
      </span>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source, i) => (
          <a
            key={i}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            title={source.url}
            className="inline-flex max-w-[240px] items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent ring-1 ring-accent/20 transition-colors hover:bg-accent/20"
          >
            <ExternalLink className="h-3 w-3 shrink-0" />
            <span className="truncate">{source.title || source.url}</span>
          </a>
        ))}
      </div>
    </>
  );
}

export default SourceChips;
