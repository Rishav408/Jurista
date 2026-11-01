import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube } from 'lucide-react';
import JuristaMark from '../ui/JuristaMark';

const PRODUCT_LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/chat', label: 'AI Chat' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  { to: '/contact', label: 'Privacy Policy' },
  { to: '/contact', label: 'Terms of Service' },
  { to: '/contact', label: 'Disclaimer' },
];

/** Shared footer for all marketing pages (hidden on the chat workspace). */
export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <JuristaMark type="logo" alt="Jurista" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              AI-powered legal research assistant for Indian law. Simplifying access to legal
              knowledge with intelligent search, case analysis, and real-time updates.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon href="https://github.com" label="GitHub">
                <Github className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter / X">
                <Twitter className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://youtube.com" label="YouTube">
                <Youtube className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Product */}
          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          {/* Legal */}
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Jurista. All rights reserved.</p>
          <p>AI-powered legal intelligence for India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="label-caps text-xs">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map(({ to, label }) => (
          <li key={label}>
            <Link
              to={to}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-accent"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
    >
      {children}
    </a>
  );
}

export default Footer;
