import { useMemo } from 'react';
import api from '../lib/api';
import { useThemeContext } from '../contexts/ThemeContext';
import { useThreads } from './useThreads';
import { useChat } from './useChat';
import { useConnection, CONNECTION_STATE } from './useConnection';

/**
 * Aggregates every piece of chat state the app needs. Mounted once by
 * ChatContext so pages and components consume a single, consistent source.
 */
export function useChatApp() {
  // Reuse the root theme instance so the chat workspace toggle and the
  // marketing navbar toggle control the same single source of truth.
  const theme = useThemeContext();
  const threadsApi = useThreads();
  const chatApi = useChat({
    activeThreadId: threadsApi.activeThreadId,
    pushUserMessage: threadsApi.pushUserMessage,
    appendMessages: threadsApi.appendMessages,
  });
  const connection = useConnection();

  const startNewThread = useMemo(
    () => (prompt) => {
      const thread = threadsApi.createThread('New Chat');
      chatApi.clearError();
      return thread;
    },
    [threadsApi, chatApi]
  );

  /** Delete a thread — also clears backend memory, mirroring legacy behavior. */
  const deleteThreadWithMemory = useMemo(
    () =>
      async (threadId) => {
        try {
          await api.clearMemory(threadId);
        } catch (error) {
          console.warn('Failed to clear backend memory:', error);
        }
        await threadsApi.deleteThread(threadId);
      },
    [threadsApi]
  );

  return { theme, ...threadsApi, ...chatApi, connection, startNewThread, deleteThreadWithMemory };
}

export { CONNECTION_STATE };
export default useChatApp;
