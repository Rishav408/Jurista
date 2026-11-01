import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Moon, PanelLeftClose, PanelLeftOpen, Sun } from 'lucide-react';
import ChatSidebar from '../components/chat/ChatSidebar';
import JuristaMark from '../components/ui/JuristaMark';
import ChatArea from '../components/chat/ChatArea';
import { ChatProvider, useChatContext } from '../contexts/ChatContext';
import { useThemeContext } from '../contexts/ThemeContext';

/**
 * Chat page — Harvey-style full-screen legal workspace.
 * No shared navbar/footer. The provider is mounted here (not app-wide)
 * so connection polling only runs inside the workspace.
 */
export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatWorkspace />
    </ChatProvider>
  );
}

function ChatWorkspace() {
  const { attachedDocument, removeDocument, activeThread } = useChatContext();
  const { isDark, toggle } = useThemeContext();
  const threadTitle = activeThread?.messages?.length ? activeThread.title : 'New conversation';
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);

  // Chat input's X button removes the attached document via an event.
  useEffect(() => {
    const handler = () => removeDocument();
    window.addEventListener('jurista:remove-document', handler);
    return () => window.removeEventListener('jurista:remove-document', handler);
  }, [removeDocument]);

  // Keyboard shortcut: Ctrl/Cmd + B toggles the sidebar.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Keep the sidebar open when the viewport grows past desktop size.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(true);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="flex h-[100svh] overflow-hidden bg-[var(--bg-primary)]">
      {/* Desktop sidebar (animated) */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="hidden shrink-0 overflow-hidden lg:block"
      >
        <ChatSidebar onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Mobile overlay sidebar — always mounted, animated in/out by state */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none invisible'}`}
        aria-hidden={!sidebarOpen}
      >
        <motion.div
          initial={false}
          animate={{ opacity: sidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden
        />
        <motion.div
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="absolute inset-y-0 left-0"
        >
          <ChatSidebar onClose={() => setSidebarOpen(false)} />
        </motion.div>
      </div>

      {/* Main column */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* Slim workspace header */}
        <header className="flex h-12 items-center gap-3 border-b border-[var(--border)] px-4">
          {/* Sidebar toggle — always visible so a collapsed sidebar can always be reopened */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-[18px] w-[18px]" />
            ) : (
              <PanelLeftOpen className="h-[18px] w-[18px]" />
            )}
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-sm font-medium" title={threadTitle}>
              {threadTitle}
            </span>
          </div>

          {/* Theme toggle — keeps the workspace switchable without leaving the page */}
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            to="/"
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-accent"
          >
            <JuristaMark type="mono" className="h-4 w-4 rounded" />
            jurista.legal
          </Link>
        </header>

        <Suspense fallback={<div className="flex-1" />}>
          <ChatArea />
        </Suspense>
      </div>
    </div>
  );
}
