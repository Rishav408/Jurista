import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';
import { makeThreadId, titleFromMessage } from '../lib/utils';

/**
 * Thread CRUD over localStorage, preserving the legacy storage schema:
 *   jurista_threads: [{ id, title, messages: [{role, content, timestamp, metadata}], createdAt, updatedAt }]
 *
 * Includes migration from the pre-rebrand `nyaya_*` keys.
 */
export function useThreads() {
  const [threads, setThreads] = useState(() => loadThreads());
  const [activeThreadId, setActiveThreadId] = useState(
    () => localStorage.getItem(STORAGE_KEYS.activeThread) || null
  );

  // ── Migration from legacy storage (runs once at mount) ────────────────────
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.threads) && localStorage.getItem('nyaya_threads')) {
        localStorage.setItem(STORAGE_KEYS.threads, localStorage.getItem('nyaya_threads'));
      }
      if (
        !localStorage.getItem(STORAGE_KEYS.activeThread) &&
        localStorage.getItem('nyaya_active_thread')
      ) {
        localStorage.setItem(
          STORAGE_KEYS.activeThread,
          localStorage.getItem('nyaya_active_thread')
        );
      }
      setThreads(loadThreads());
      setActiveThreadId(localStorage.getItem(STORAGE_KEYS.activeThread));
    } catch (error) {
      console.warn('Storage migration notice:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Guarantee at least one thread exists.
  useEffect(() => {
    if (threads.length === 0) {
      createThread('New Chat', { skipActiveGuard: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads.length]);

  /** Recompute active thread fallback if the id points nowhere. */
  useEffect(() => {
    if (threads.length > 0 && !threads.some((t) => t.id === activeThreadId)) {
      setActiveThreadId(threads[0].id);
    }
  }, [threads, activeThreadId]);

  const persist = useCallback((nextThreads) => {
    setThreads(nextThreads);
    try {
      localStorage.setItem(STORAGE_KEYS.threads, JSON.stringify(nextThreads));
    } catch (error) {
      console.error('Failed to save threads:', error);
    }
  }, []);

  const createThread = useCallback(
    (title = 'New Chat', { skipActiveGuard = false } = {}) => {
      const thread = {
        id: makeThreadId(),
        title: title || 'New Chat',
        messages: [],
        createdAt: new Date().toISOString(),
      };
      setThreads((prev) => {
        const next = [thread, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.threads, JSON.stringify(next));
        } catch (error) {
          console.error('Failed to save threads:', error);
        }
        return next;
      });
      setActiveThreadId(thread.id);
      localStorage.setItem(STORAGE_KEYS.activeThread, thread.id);
      return thread;
    },
    []
  );

  const deleteThread = useCallback(
    async (threadId) => {
      persist(loadThreads().filter((t) => t.id !== threadId));
      if (threadId === activeThreadId) {
        const remaining = loadThreads();
        if (remaining.length > 0) {
          setActiveThreadId(remaining[0].id);
          localStorage.setItem(STORAGE_KEYS.activeThread, remaining[0].id);
        } else {
          localStorage.removeItem(STORAGE_KEYS.activeThread);
          createThread('New Chat');
        }
      }
    },
    [activeThreadId, createThread, persist]
  );

  const clearAllThreads = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.threads, JSON.stringify([]));
      localStorage.removeItem(STORAGE_KEYS.activeThread);
    } catch (error) {
      console.error('Failed to clear threads:', error);
    }
    setThreads([]);
    setActiveThreadId(null);
    createThread('New Chat');
  }, [createThread]);

  const renameThread = useCallback(
    (threadId, title) => {
      persist(
        loadThreads().map((t) => (t.id === threadId ? { ...t, title } : t))
      );
    },
    [persist]
  );

  /** Append messages to a thread and auto-title from its first user message. */
  const appendMessages = useCallback(
    (threadId, messages) => {
      persist(
        loadThreads().map((t) => {
          if (t.id !== threadId) return t;
          const wasEmpty = t.messages.length === 0;
          return {
            ...t,
            title: wasEmpty ? titleFromMessage(messages[0]?.content || '') : t.title,
            messages: [...t.messages, ...messages],
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    [persist]
  );

  /** Optimistic push of just the user message (before the AI responds). */
  const pushUserMessage = useCallback(
    (threadId, content) => appendMessages(threadId, [
      { role: 'user', content, timestamp: new Date().toISOString() },
    ]),
    [appendMessages]
  );

  /** Update thread title manually. */
  const getThread = useCallback(
    (threadId) => loadThreads().find((t) => t.id === threadId) || null,
    []
  );

  const activeThread = threads.find((t) => t.id === activeThreadId) || null;

  /** Newest-first ordering, matching legacy behavior. */
  const sortedThreads = [...threads].sort(
    (a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)
  );

  return {
    threads: sortedThreads,
    activeThread,
    activeThreadId,
    setActiveThreadId,
    createThread,
    deleteThread,
    clearAllThreads,
    renameThread,
    appendMessages,
    pushUserMessage,
    getThread,
  };
}

function loadThreads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.threads) || '[]');
  } catch (error) {
    console.error('Failed to load threads:', error);
    return [];
  }
}

export default useThreads;
