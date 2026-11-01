/**
 * Jurista API client.
 *
 * Ported from the legacy `main.js` APIClient class with identical request
 * shapes, retry behavior, and response unwrapping ({ success, data } envelopes).
 */
import { API_CONFIG } from './constants';

class APIClient {
  constructor() {
    this.baseURL = API_CONFIG.API_BASE_URL;
    this.healthURL = API_CONFIG.HEALTH_CHECK_URL;
  }

  /** GET /health — resolves to a boolean. */
  async checkHealth() {
    try {
      const response = await fetch(this.healthURL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /** POST /api/chat — plain chat, optionally with document context. */
  async sendMessage(query, sessionId = null, context = null) {
    return this.makeRequest('/chat', { query, session_id: sessionId, context });
  }

  /** POST /api/chat/intelligent — auto-decides whether to search the web. */
  async intelligentChat(query, sessionId = null, context = null) {
    return this.makeRequest('/chat/intelligent', { query, session_id: sessionId, context });
  }

  /** POST /api/chat/force-search — always performs a live web search. */
  async forceSearchChat(query, sessionId = null, context = null) {
    return this.makeRequest('/chat/force-search', { query, session_id: sessionId, context });
  }

  /** POST /api/search — standalone search endpoint. */
  async search(query, searchType = 'synthesized', maxResults = null, context = null) {
    return this.makeRequest('/search', {
      query,
      search_type: searchType,
      max_results: maxResults,
      context,
    });
  }

  /** POST /api/chat/memory — clear backend conversation memory. */
  async clearMemory(sessionId = null) {
    return this.makeRequest('/chat/memory', { action: 'clear', session_id: sessionId });
  }

  /** POST /api/chat/memory — fetch backend chat history. */
  async getMemoryHistory(sessionId = null) {
    return this.makeRequest('/chat/memory', { action: 'get_history', session_id: sessionId });
  }

  /** POST /api/chat/upload — multipart upload; returns { filename, text, ... }. */
  async uploadDocument(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/chat/upload`, {
      method: 'POST',
      body: formData,
      mode: 'cors',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Upload failed');
    }
    return data.data; // { filename, text, characters, truncated, meta }
  }

  /** Core POST helper with retry on network/5xx errors. */
  async makeRequest(endpoint, payload, retries = API_CONFIG.RETRY_ATTEMPTS) {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'API request failed');
      }
      return data.data;
    } catch (error) {
      if (retries > 0 && this.isRetryableError(error)) {
        await this.delay(API_CONFIG.RETRY_DELAY);
        return this.makeRequest(endpoint, payload, retries - 1);
      }
      throw error;
    }
  }

  isRetryableError(error) {
    if (error?.name === 'TypeError') return true; // network failure
    const match = /HTTP (\d{3})/.exec(error?.message || '');
    return match ? Number(match[1]) >= 500 : false;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton — every consumer shares one client.
export const api = new APIClient();
export default api;
