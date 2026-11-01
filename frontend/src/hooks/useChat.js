import { useCallback, useMemo, useRef, useState } from 'react';
import api from '../lib/api';
import { API_CONFIG } from '../lib/constants';

/**
 * Chat send/receive logic ported from the legacy ChatInterface class.
 *
 * Message routing (mirrors main.js):
 *   - document attached  → /chat  with document text as `context`
 *   - web search enabled → /chat/force-search
 *   - otherwise          → /chat/intelligent
 */
export function useChat({ activeThreadId, pushUserMessage, appendMessages, clearStorageOnly = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [attachedDocument, setAttachedDocument] = useState(null); // { filename, text, characters }
  const inFlight = useRef(false);

  const sendMessage = useCallback(
    async (message) => {
      const trimmed = (message || '').trim();
      if (!trimmed || inFlight.current || !activeThreadId) return;

      inFlight.current = true;
      setIsLoading(true);
      setError(null);

      // Optimistically add the user message.
      pushUserMessage(activeThreadId, trimmed);

      try {
        let response;
        if (attachedDocument) {
          response = await api.sendMessage(trimmed, activeThreadId, attachedDocument.text);
        } else if (searchEnabled) {
          response = await api.forceSearchChat(trimmed, activeThreadId);
        } else {
          response = await api.intelligentChat(trimmed, activeThreadId);
        }

        const metadata = {
          model: response?.model,
          sessionId: response?.session_id,
          timestamp: response?.timestamp,
        };

        if (attachedDocument) {
          metadata.searchUsed = false;
          metadata.searchReason = 'document_context';
        }
        if (response?.search_decision) {
          metadata.searchUsed = response.search_used;
          metadata.searchReason = response.search_decision.reason;
          metadata.enhanced = response.enhanced;
          metadata.sources = response.sources || [];
          metadata.searchMethod = response.search_method;
        }

        appendMessages(activeThreadId, [
          {
            role: 'assistant',
            content: response?.response || '(empty response)',
            metadata,
            timestamp: response?.timestamp || new Date().toISOString(),
          },
        ]);
      } catch (err) {
        setError(friendlyError(err));
      } finally {
        inFlight.current = false;
        setIsLoading(false);
      }
    },
    [activeThreadId, attachedDocument, searchEnabled, pushUserMessage, appendMessages]
  );

  const toggleSearch = useCallback(() => {
    if (attachedDocument) return; // web search is disabled while a doc is attached
    setSearchEnabled((v) => !v);
  }, [attachedDocument]);

  const attachDocument = useCallback((doc) => {
    setAttachedDocument(doc);
    setSearchEnabled(false);
  }, []);

  const removeDocument = useCallback(() => {
    setAttachedDocument(null);
  }, []);

  const validateFile = useCallback((file) => {
    if (file.size > API_CONFIG.MAX_FILE_SIZE) {
      return 'File size must be less than 10MB';
    }
    if (!API_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Please upload PDF, TXT, DOC, or DOCX files only';
    }
    return null;
  }, []);

  const uploadDocument = useCallback(
    async (file) => {
      const validationError = validateFile(file);
      if (validationError) throw new Error(validationError);
      const result = await api.uploadDocument(file);
      attachDocument({
        filename: result.filename,
        text: result.text,
        characters: result.characters,
        truncated: result.truncated,
      });
      return result;
    },
    [attachDocument, validateFile]
  );

  /** Send on behalf of an empty thread that has just been created. */
  const sendMessageToThread = useMemo(() => sendMessage, [sendMessage]);

  return {
    sendMessage,
    sendMessageToThread,
    isLoading,
    error,
    setError,
    clearError: () => setError(null),
    searchEnabled,
    toggleSearch,
    attachedDocument,
    attachDocument,
    removeDocument,
    uploadDocument,
    validateFile,
  };
}

function friendlyError(error) {
  const message = error?.message || '';
  if (message.includes('Failed to fetch') || message.includes('Network')) {
    return 'Unable to connect to the server. Please make sure the backend is running.';
  }
  if (message.startsWith('HTTP')) {
    return 'Server error occurred. Please try again later.';
  }
  return message || 'An error occurred. Please try again.';
}

export default useChat;
