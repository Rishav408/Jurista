import { Mail, MessageSquare, MapPin, Users, MailOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

/** Left column of the contact page: pitch + channels + response time. */
export function ContactInfo() {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="label-caps">Contact</p>
      <h1 className="mt-3 font-serif text-5xl font-bold leading-[1.05] sm:text-6xl">
        Let's
        <br />
        connect.
      </h1>
      <p className="mt-6 max-w-md leading-relaxed text-[var(--text-secondary)]">
        Have a question about how Jurista works, a partnership idea, or just want to say hello?
        We'd love to hear from you.
      </p>

      <div className="mt-10 space-y-4">
        <InfoRow
          icon={Mail}
          label="Email"
          value={
            <a href="mailto:hello@jurista.legal" className="text-accent hover:underline">
              hello@jurista.legal
            </a>
          }
        />
        <InfoRow
          icon={Users}
          label="Partnerships"
          value={
            <a href="mailto:partnerships@jurista.legal" className="text-accent hover:underline">
              partnerships@jurista.legal
            </a>
          }
        />
        <InfoRow
          icon={MessageSquare}
          label="Live chat"
          value={
            <Link to="/chat" className="text-accent hover:underline">
              Ask directly in the workspace →
            </Link>
          }
        />
        <InfoRow icon={MapPin} label="Based in" value="India 🇮🇳 — fully remote team" />
      </div>

      <div className="mt-10 inline-flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
        <MailOpen className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div>
          <p className="text-sm font-medium">Response time</p>
          <p className="text-sm text-[var(--text-secondary)]">Usually within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </p>
        <p className="mt-0.5 text-sm">{value}</p>
      </div>
    </div>
  );
}

export default ContactInfo;
