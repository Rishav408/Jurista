import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { getThreadDateLabel } from '../../lib/utils';

/** Sidebar thread row — hover reveals rename/delete actions. */
export function ThreadItem({ thread, active, onSelect, onRename, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuUp, setMenuUp] = useState(false); // flip the menu when near the sidebar bottom
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState(thread.title);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  const messageCount = thread.messages?.length || 0;

  const toggleMenu = () => {
    // Flip upward when there's no room below — the sidebar clips overflow, so
    // opening near the bottom edge would otherwise cut the menu off.
    const rect = menuRef.current?.getBoundingClientRect();
    setMenuUp(!!rect && window.innerHeight - rect.bottom < 140);
    setMenuOpen((v) => !v);
  };

  // Close the row menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Focus the rename input when it appears.
  useEffect(() => {
    if (renaming) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [renaming]);

  const commitRename = () => {
    const title = draft.trim();
    if (title && title !== thread.title) onRename(thread.id, title);
    setRenaming(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onDelete(thread.id, thread.title);
  };

  return (
    <li
      className={`group relative flex cursor-pointer items-start gap-2.5 rounded-xl border p-2.5 transition-colors ${
        active
          ? 'border-accent/30 bg-accent/5'
          : 'border-transparent hover:bg-[var(--bg-tertiary)]'
      }`}
      onClick={() => !renaming && onSelect(thread.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !renaming) onSelect(thread.id);
      }}
    >
      <span
        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm ${
          messageCount > 0
            ? 'bg-[var(--bg-tertiary)]'
            : 'bg-accent/10 text-accent ring-1 ring-accent/20'
        }`}
        aria-hidden
      >
        {messageCount > 0 ? '💬' : '✦'}
      </span>

      <div className="min-w-0 flex-1">
        {renaming ? (
          <input
            ref={inputRef}
            value={draft}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitRename();
              if (e.key === 'Escape') setRenaming(false);
            }}
            className="w-full rounded-md border border-accent/50 bg-[var(--bg-primary)] px-1.5 py-0.5 text-sm outline-none"
          />
        ) : (
          <p className="truncate text-sm font-medium" title={thread.title}>
            {thread.title || 'Untitled chat'}
          </p>
        )}
        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <span>
            {messageCount} {messageCount === 1 ? 'message' : 'messages'}
          </span>
          <span aria-hidden>·</span>
          <span>{getThreadDateLabel(thread)}</span>
        </p>
      </div>

      {/* Row actions (hover) */}
      {!renaming && (
        <div ref={menuRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            aria-label={`Actions for "${thread.title}"`}
            className={`grid h-7 w-7 place-items-center rounded-md text-[var(--text-muted)] opacity-0 transition-opacity hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] focus:opacity-100 group-hover:opacity-100 ${
              menuOpen ? 'opacity-100' : ''
            }`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute right-0 z-30 w-36 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] py-1 shadow-lift ${
                menuUp ? 'bottom-8' : 'top-8'
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  setRenaming(true);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--bg-tertiary)]"
              >
                <Pencil className="h-3.5 w-3.5" /> Rename
              </button>
              <button
                onClick={handleDelete}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--error)] hover:bg-[var(--error-subtle)]"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default ThreadItem;
