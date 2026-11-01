/** Small shared utilities. */

/** Format a timestamp as a short locale time, e.g. "2:30 PM". */
export function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

/** Relative date label for thread lists: Today / Yesterday / 3 days ago / Oct 12. */
export function getThreadDateLabel(thread) {
  const date = new Date(thread?.updatedAt || thread?.createdAt || 0);
  if (Number.isNaN(date.getTime())) return 'Recently';

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfThreadDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor((startOfToday - startOfThreadDay) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

/** Truncate text to a max length with an ellipsis. */
export function truncate(text, max = 40) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** Human readable file size, e.g. 2.4 MB. */
export function formatFileSize(bytes) {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Generate a thread id compatible with the legacy schema (t_<timestamp>). */
export function makeThreadId() {
  return `t_${Date.now()}`;
}

/** Auto-title a thread from its first user message. */
export function titleFromMessage(message) {
  return truncate(message.trim(), 40);
}

/** Clamp a number between min and max. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
