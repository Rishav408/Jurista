import { createContext, useContext } from 'react';
import useChatApp, { CONNECTION_STATE } from '../hooks/useChatApp';

const ChatContext = createContext(null);

/**
 * Single source of truth for chat state: threads, messages, connection
 * status, document attachment, search toggle, and theme access.
 */
export function ChatProvider({ children }) {
  const value = useChatApp();
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within <ChatProvider>');
  return ctx;
}

export { CONNECTION_STATE };

export default ChatContext;
