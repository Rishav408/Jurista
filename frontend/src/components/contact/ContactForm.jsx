import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, Send } from 'lucide-react';

const SUBJECTS = ['General Inquiry', 'Bug Report', 'Partnership', 'Feature Request'];

const easing = [0.22, 1, 0.36, 1];

/** Contact form with inline validation, subject dropdown, and success state. */
export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the subject dropdown on outside click or Escape — a custom select
  // must not trap the user (WCAG 2.1).
  useEffect(() => {
    if (!dropdownOpen) return;
    const handlePointer = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [dropdownOpen]);

  const setField = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.message.trim().length < 20) next.message = 'Please write at least 20 characters so we can help.';
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    // Placeholder submit — wire to a backend endpoint or Formspree later.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('success');
    setValues({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-ai)] p-6 shadow-card sm:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: easing }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <div className="relative">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
                className="grid h-20 w-20 place-items-center rounded-full bg-success/10 text-success ring-1 ring-success/25"
              >
                <CheckCircle2 className="h-10 w-10" />
              </motion.span>
              <motion.span
                className="absolute inset-0 rounded-full ring-2 ring-success/40"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.55, opacity: 0 }}
                transition={{ duration: 1.1, delay: 0.4, repeat: 2 }}
                aria-hidden
              />
            </div>
            <h3 className="mt-6 font-serif text-2xl font-bold">Message sent</h3>
            <p className="mt-2 max-w-xs text-sm text-[var(--text-secondary)]">
              Thanks for reaching out — we usually respond within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-5"
          >
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="Adv. Ananya Deshmukh"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={`w-full rounded-xl border bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-accent focus:ring-2 focus:ring-accent/25 ${
                  errors.name ? 'border-[var(--error)]' : 'border-[var(--border)]'
                }`}
              />
              <FieldError id="contact-name-error" error={errors.name} />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className={`w-full rounded-xl border bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-accent focus:ring-2 focus:ring-accent/25 ${
                  errors.email ? 'border-[var(--error)]' : 'border-[var(--border)]'
                }`}
              />
              <FieldError id="contact-email-error" error={errors.email} />
            </div>

            {/* Subject dropdown */}
            <div>
              <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium">
                Subject
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  id="contact-subject"
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/25"
                >
                  {values.subject}
                  <ChevronDown
                    className={`h-4 w-4 text-[var(--text-muted)] transition-transform ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      role="listbox"
                      aria-labelledby="contact-subject"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute inset-x-0 top-full z-20 mt-1.5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] py-1 shadow-lift"
                    >
                      {SUBJECTS.map((subject) => (
                        <li key={subject}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={subject === values.subject}
                            onClick={() => {
                              setField('subject', subject);
                              setDropdownOpen(false);
                            }}
                            className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent/10 ${
                              subject === values.subject ? 'font-medium text-accent' : ''
                            }`}
                          >
                            {subject}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={values.message}
                onChange={(e) => setField('message', e.target.value)}
                placeholder="Tell us what's on your mind…"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`w-full resize-none rounded-xl border bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-accent focus:ring-2 focus:ring-accent/25 ${
                  errors.message ? 'border-[var(--error)]' : 'border-[var(--border)]'
                }`}
              />
              <FieldError id="contact-message-error" error={errors.message} />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-medium text-white shadow-card transition-all hover:bg-accent-deep hover:shadow-lift disabled:opacity-60 sm:w-auto"
            >
              {status === 'submitting' ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ id, error }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-xs text-[var(--error)]"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default ContactForm;
