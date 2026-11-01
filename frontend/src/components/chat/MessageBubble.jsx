import { useState } from 'react';
import { Check, Copy, ThumbsDown, ThumbsUp, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatTime } from '../../lib/utils';
import JuristaMark from '../ui/JuristaMark';
import SourceChips from './SourceChips';

/** Chat message bubble. AI messages render markdown + sources + hover actions. */
export function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return isUser ? <UserBubble message={message} /> : <AIBubble message={message} />;
}

function UserBubble({ message }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] sm:max-w-[70%]">
        <div className="rounded-2xl rounded-br-md bg-[var(--surface-user)] px-4 py-3 shadow-card ring-1 ring-[var(--border)]">
          <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
            {message.content}
          </p>
        </div>
        <p className="mt-1 pr-1 text-right text-[11px] text-[var(--text-muted)]">
          You · {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}

function AIBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'up' | 'down' | null
  const metadata = message.metadata || {};

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; no-op
    }
  };

  return (
    <div className="group flex justify-start">
      <div className="max-w-[88%] sm:max-w-[80%]">
        <div className="flex items-center gap-2">
          <JuristaMark type="mono" className="h-6 w-6 rounded-full" />
          <p className="text-xs font-semibold text-accent">Jurista</p>
          {metadata.model && (
            <span className="rounded-full bg-[var(--bg-tertiary)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
              {metadata.model}
            </span>
          )}
          <span className="text-[11px] text-[var(--text-muted)]">
            {formatTime(message.timestamp)}
          </span>
        </div>

        <div className="mt-1.5 rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--surface-ai)] px-4 py-3 shadow-card">
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>

          {/* Search provenance badge */}
          {metadata.searchUsed !== undefined && <SearchBadge metadata={metadata} />}

          {/* Source citations */}
          {metadata.sources?.length > 0 && (
            <div className="mt-3 border-t border-[var(--border-subtle)] pt-3">
              <SourceChips sources={metadata.sources} />
            </div>
          )}
        </div>

        {/* Hover action row */}
        <div className="mt-1 flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
          <ActionButton onClick={copy} label={copied ? 'Copied' : 'Copy'}>
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          </ActionButton>
          <ActionButton
            onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
            label="Good response"
            active={feedback === 'up'}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </ActionButton>
          <ActionButton
            onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
            label="Needs work"
            active={feedback === 'down'}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

function SearchBadge({ metadata }) {
  const forced = metadata.searchReason === 'user_requested';
  const docContext = metadata.searchReason === 'document_context';

  if (metadata.searchUsed) {
    return (
      <div className="mt-3 text-xs">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${
            forced
              ? 'bg-accent/10 text-accent ring-1 ring-accent/20'
              : 'bg-success/10 text-success ring-1 ring-success/20'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {forced ? 'Forced web search' : 'Enhanced with web search'}
        </span>
        <span className="ml-2 text-[var(--text-muted)]">({metadata.searchReason})</span>
      </div>
    );
  }

  return (
    <div className="mt-3 text-xs">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/10 px-2.5 py-1 font-medium text-navy ring-1 ring-navy/20">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {docContext ? 'Answered from your document' : 'AI knowledge only'}
      </span>
      <span className="ml-2 text-[var(--text-muted)]">({metadata.searchReason})</span>
    </div>
  );
}

function ActionButton({ children, label, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`grid h-7 w-7 place-items-center rounded-md transition-colors hover:bg-[var(--bg-tertiary)] ${
        active ? 'text-accent' : 'text-[var(--text-muted)]'
      }`}
    >
      {children}
    </button>
  );
}

export default MessageBubble;
