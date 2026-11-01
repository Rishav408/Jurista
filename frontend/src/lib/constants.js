/**
 * Jurista frontend configuration constants.
 *
 * The backend URL is resolved at load time: local dev talks to the Flask
 * dev server (or the Vite proxy), production talks to the Render backend.
 */

const RENDER_BACKEND_URL = 'https://nyayaai-backend-qwwx.onrender.com';

const isLocal =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const IS_LOCAL = isLocal;
export const BACKEND_BASE_URL = isLocal ? 'http://localhost:5000' : RENDER_BACKEND_URL;

export const API_CONFIG = {
  API_BASE_URL: `${BACKEND_BASE_URL}/api`,
  HEALTH_CHECK_URL: `${BACKEND_BASE_URL}/health`,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10 MB
  ALLOWED_FILE_TYPES: [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const STORAGE_KEYS = {
  threads: 'jurista_threads',
  activeThread: 'jurista_active_thread',
  theme: 'jurista_theme',
};

export const CHAT_MODEL_LABEL = 'Gemini 2.5 Flash';

/** Quick actions shown in the chat sidebar (pre-built prompt templates). */
export const QUICK_ACTIONS = [
  {
    id: 'explain-right',
    icon: 'ScrollText',
    label: 'Explain a legal right',
    prompt: 'Explain in simple terms what legal rights I have under',
  },
  {
    id: 'analyze-document',
    icon: 'FileSearch',
    label: 'Analyze a document',
    prompt: 'I have attached a legal document. Please analyze its key clauses and flag anything unusual.',
  },
  {
    id: 'search-case-law',
    icon: 'Landmark',
    label: 'Search case law',
    prompt: 'What are the leading Supreme Court cases on',
  },
  {
    id: 'compare-provisions',
    icon: 'Scale',
    label: 'Compare legal provisions',
    prompt: 'Compare the old IPC provisions with the corresponding sections of the new Bharatiya Nyaya Sanhita on',
  },
];

/** Suggestion cards on the chat welcome screen. */
export const CHAT_SUGGESTIONS = [
  { title: 'What is Article 21?', subtitle: 'Right to life & personal liberty' },
  { title: 'Explain the bail rules', subtitle: 'When and how bail can be granted' },
  { title: 'What changed from IPC to BNS?', subtitle: 'Key differences in the new criminal code' },
  { title: 'How do I file an FIR?', subtitle: 'Step-by-step process and your rights' },
];
