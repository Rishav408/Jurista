import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import PageLayout from './components/layout/PageLayout';

// Code-split every page for faster first paint.
const HomePage = lazy(() => import('./pages/HomePage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));

const pageFade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export default function App() {
  const location = useLocation();

  // Scroll to top on navigation (except hash links).
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location.pathname]);

  // Sync the <title> per route for SEO/back-button clarity.
  useEffect(() => {
    const titles = {
      '/': 'Jurista — AI-Powered Indian Legal Intelligence',
      '/features': 'Features — Jurista',
      '/about': 'About — Jurista',
      '/contact': 'Contact — Jurista',
      '/chat': 'Legal Workspace — Jurista',
    };
    document.title = titles[location.pathname] || titles['/'];
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Marketing pages share the navbar/footer layout */}
          <Route element={<PageLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div {...pageFade}>
                    <HomePage />
                  </motion.div>
                </Suspense>
              }
            />
            <Route
              path="/features"
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div {...pageFade}>
                    <FeaturesPage />
                  </motion.div>
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div {...pageFade}>
                    <AboutPage />
                  </motion.div>
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div {...pageFade}>
                    <ContactPage />
                  </motion.div>
                </Suspense>
              }
            />
          </Route>

          {/* Chat: full-screen workspace, no shared chrome */}
          <Route
            path="/chat"
            element={
              <Suspense fallback={<PageLoader full />}>
                <ChatPage />
              </Suspense>
            }
          />

          <Route path="*" element={<PageLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

function PageLoader({ full = false }) {
  return (
    <div
      className={`grid place-items-center bg-[var(--bg-primary)] ${
        full ? 'h-screen w-screen' : 'h-[70vh]'
      }`}
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-accent/25 border-t-accent" />
        <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Jurista</span>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <p className="font-serif text-7xl text-accent">404</p>
        <h1 className="mt-4 font-serif text-2xl">Page not found</h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          The page you're looking for doesn't exist or has moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-deep"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
