import { useMemo, useState } from 'react';
import { FileText, Moon, PanelLeftClose, PlusCircle, Sun, X } from 'lucide-react';
import { useChatContext, CONNECTION_STATE } from '../../contexts/ChatContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import JuristaMark from '../ui/JuristaMark';
import ThreadItem from './ThreadItem';
import QuickActions from './QuickActions';
import { formatFileSize } from '../../lib/utils';
import { CHAT_MODEL_LABEL } from '../../lib/constants';

/**
 * Harvey-style command-center sidebar:
 * brand header → new conversation → quick actions → recent threads →
 * attached document → status footer. Collapsible on desktop, overlay on mobile.
 */
export function ChatSidebar({ onClose }) {
  const { isDark, toggle } = useThemeContext();
  const {
    threads,
    activeThreadId,
    setActiveThreadId,
    createThread,
    renameThread,
    deleteThreadWithMemory,
    attachedDocument,
    removeDocument,
    connection,
  } = useChatContext();

  const [query, setQuery] = useState('');

  const visibleThreads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter((thread) => {
      const body = (thread.messages || [])
        .map((m) => m.content || '')
        .join(' ')
        .toLowerCase();
      return (thread.title || '').toLowerCase().includes(q) || body.includes(q);
    });
  }, [threads, query]);

  const handleNew = () => {
    createThread('New Chat');
    onClose?.();
  };

  const handleSelect = (id) => {
    setActiveThreadId(id);
    onClose?.();
  };

  const connected = connection.status === CONNECTION_STATE.online;

  return (
    <aside className="flex h-full w-[280px] flex-col border-r border-[var(--border)] bg-[var(--sidebar)]">
      {/* Brand */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <JuristaMark type="mono" className="h-8 w-8 rounded-lg shadow-glow" />
          <div className="leading-tight">
            <p className="font-serif text-[15px] font-bold">Jurista</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
              Legal Workspace
            </p>
          </div>
        </div>
        <button
          onClick={() => onClose?.()}
          aria-label="Collapse sidebar"
          className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
        >
          <PanelLeftClose className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* New conversation */}
      <div className="px-3 pt-3">
        <button
          onClick={handleNew}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-deep px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:brightness-105 hover:shadow-glow"
        >
          <PlusCircle className="h-4 w-4" />
          New Conversation
        </button>
      </div>

      {/* Quick actions */}
      <div className="scrollbar-slim flex-1 overflow-y-auto px-3 pb-2 pt-5">
        <QuickActions
          onPick={(prompt) => {
            // Prefill flows through a custom event the chat input listens for.
            window.dispatchEvent(new CustomEvent('jurista:prefill-prompt', { detail: prompt }));
            onClose?.();
          }}
        />

        {/* Recent threads */}
        <div className="mt-6 flex items-center justify-between pr-1">
          <h3 className="label-caps text-[11px]">
            Recent Threads
            <span className="ml-2 normal-case tracking-normal text-[var(--text-muted)]">
              {threads.length} {threads.length === 1 ? 'chat' : 'chats'}
            </span>
          </h3>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chats…"
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-accent/50"
        />

        <ul className="mt-2.5 space-y-1">
          {visibleThreads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              active={thread.id === activeThreadId}
              onSelect={handleSelect}
              onRename={renameThread}
              onDelete={(id) => deleteThreadWithMemory(id)}
            />
          ))}
          {visibleThreads.length === 0 && (
            <li className="rounded-xl border border-dashed border-[var(--border)] p-3.5 text-center text-xs text-[var(--text-muted)]">
              {query ? 'No matching chats found' : 'No chats yet'}
            </li>
          )}
        </ul>

        {/* Attached document */}
        {attachedDocument && (
          <div className="mt-6">
            <h3 className="label-caps text-[11px]">Attached Document</h3>
            <div className="mt-2.5 flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/5 p-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/25">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium" title={attachedDocument.filename}>
                  📎 {attachedDocument.filename}
                </p>
                <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">
                  {attachedDocument.characters
                    ? `${attachedDocument.characters.toLocaleString('en-IN')} chars`
                    : 'Uploaded'}{' '}
                  {attachedDocument.truncated ? '• truncated' : ''}
                </p>
              </div>
              <button
                onClick={removeDocument}
                aria-label="Remove attached document"
                className="grid h-6 w-6 place-items-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--error)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status footer */}
      <div className="space-y-2.5 border-t border-[var(--border)] px-4 py-3.5">
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              connected ? 'bg-success' : connection.status === CONNECTION_STATE.checking ? 'bg-accent animate-pulse' : 'bg-[var(--error)]'
            }`}
          />
          <span className={connected ? 'text-success' : ''}>
            {connected ? `Connected · ${CHAT_MODEL_LABEL}` : connection.status === CONNECTION_STATE.checking ? 'Connecting…' : 'Offline'}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-[11px] font-semibold text-white dark:bg-navy-light">
            R
          </span>
          <div className="flex-1 leading-tight">
            <p className="text-xs font-medium">Rishav Singh</p>
            <p className="text-[10px] text-[var(--text-muted)]">Free Plan</p>
          </div>
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-7 w-7 place-items-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default ChatSidebar;
