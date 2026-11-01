import { useEffect, useRef } from 'react';
import { FileWarning } from 'lucide-react';
import { useChatContext } from '../../contexts/ChatContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';
import ChatInput from './ChatInput';
import { IS_LOCAL } from '../../lib/constants';

/** Main chat column: connection banner, messages, welcome state, composer. */
export function ChatArea() {
  const { activeThread, isLoading, error, connection } = useChatContext();
  const messages = activeThread?.messages || [];
  const scrollRef = useRef(null);
  const pinnedToBottom = useRef(true);

  // Stick to the bottom only when the user hasn't scrolled up.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const nearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 80;
      pinnedToBottom.current = nearBottom;
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-scroll on new content.
  useEffect(() => {
    const container = scrollRef.current;
    if (container && pinnedToBottom.current) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages.length, isLoading]);

  const offline = connection.status === 'offline';

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      {offline && <ColdStartBanner />}

      {/* Messages viewport */}
      <div ref={scrollRef} className="scrollbar-slim flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <WelcomeScreen error={error} onSuggestion={(text) => sendMessageSuggestion(text)} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6">
            {messages.map((message, i) => (
              <MessageBubble key={message.timestamp || i} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* In-conversation error banner — errors were previously silent after the
          first message; surface them above the composer */}
      {error && messages.length > 0 && (
        <div className="mx-auto w-full max-w-3xl px-4 pb-2 sm:px-6" role="alert">
          <div className="flex items-start justify-between gap-3 rounded-xl border border-[var(--error)] bg-[var(--error-subtle)] px-4 py-2.5 text-xs text-[var(--error)]">
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <ChatInput />
      </div>
    </div>
  );
}

/**
 * Sidebar picks a fresh thread before a send sometimes; forward suggestion
 * clicks through the same prefill channel used by quick actions.
 */
function sendMessageSuggestion(text) {
  window.dispatchEvent(new CustomEvent('jurista:prefill-prompt', { detail: text }));
  // Focus the composer after prefill.
  requestAnimationFrame(() => {
    document.querySelector('textarea[aria-label="Chat message"]')?.focus();
  });
}

/** Backend-down / cold-start notice (free tier Render wake-up). */
function ColdStartBanner() {
  return (
    <div className="flex items-start gap-3 border-b border-[var(--border)] bg-accent/[0.07] px-4 py-3 sm:px-6" role="status">
      <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <p className="text-xs leading-relaxed sm:text-[13px]">
        {IS_LOCAL
          ? '⚠️ Backend server is not responding. Make sure the Flask backend is running on localhost:5000.'
          : '⚠️ Backend server is waking up (free tier cold start). This usually takes 30–60 seconds — your messages will work right after.'}
      </p>
    </div>
  );
}

export default ChatArea;
