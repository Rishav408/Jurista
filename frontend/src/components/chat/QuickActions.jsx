import { FileSearch, Landmark, Scale, ScrollText } from 'lucide-react';
import { QUICK_ACTIONS } from '../../lib/constants';

const ICONS = {
  ScrollText,
  FileSearch,
  Landmark,
  Scale,
};

/** Sidebar "Quick Actions" — pre-built prompt templates as chips. */
export function QuickActions({ onPick }) {
  return (
    <div>
      <h3 className="label-caps text-[11px]">Quick Actions</h3>
      <ul className="mt-2.5 space-y-1">
        {QUICK_ACTIONS.map(({ id, icon, label, prompt }) => {
          const Icon = ICONS[icon] || ScrollText;
          return (
            <li key={id}>
              <button
                onClick={() => onPick(prompt)}
                title={prompt}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} />
                <span className="truncate">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuickActions;
