import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useThemeContext } from '../../contexts/ThemeContext';
import JuristaMark from '../ui/JuristaMark';

const NAV_LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

/** Shared navbar for all marketing pages (hidden on the chat workspace). */
export function Navbar() {
  const { isDark, toggle } = useThemeContext();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong border-b border-[var(--glass-border)] py-2 shadow-card'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="group flex items-center" aria-label="Jurista home">
          <JuristaMark
            type="logo"
            alt="Jurista"
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} className="group relative px-4 py-2 text-[15px]">
              {({ isActive }) => (
                <>
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive ? 'text-accent' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {label}
                  </span>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/10 ring-1 ring-accent/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : (
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-accent/60 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-9 w-9 place-items-center rounded-xl text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          >
            {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <Link
            to="/chat"
            className="group hidden items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white shadow-card transition-all hover:bg-accent-deep hover:shadow-lift md:inline-flex"
          >
            Try Jurista
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-xl text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-full z-40 bg-[var(--bg-primary)] md:hidden"
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{ open: { transition: { staggerChildren: 0.06 } } }}
              className="flex h-full flex-col px-6 py-8"
            >
              <motion.div
                variants={drawerItem}
                className="overflow-hidden"
              >
                <NavLink
                  to="/features"
                  className={({ isActive }) =>
                    `block border-b border-[var(--border-subtle)] py-4 font-serif text-2xl ${
                      isActive ? 'text-accent' : ''
                    }`
                  }
                >
                  Features
                </NavLink>
              </motion.div>
              <motion.div variants={drawerItem} className="overflow-hidden">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block border-b border-[var(--border-subtle)] py-4 font-serif text-2xl ${
                      isActive ? 'text-accent' : ''
                    }`
                  }
                >
                  About
                </NavLink>
              </motion.div>
              <motion.div variants={drawerItem} className="overflow-hidden">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block border-b border-[var(--border-subtle)] py-4 font-serif text-2xl ${
                      isActive ? 'text-accent' : ''
                    }`
                  }
                >
                  Contact
                </NavLink>
              </motion.div>
              <motion.div variants={drawerItem} className="mt-8 overflow-hidden">
                <Link
                  to="/chat"
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-medium text-white shadow-card"
                >
                  Try Jurista <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const drawerItem = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default Navbar;
