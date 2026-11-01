import { motion } from 'framer-motion';
import { BellRing, BadgeCheck, FileUp, Sparkles } from 'lucide-react';
import FeatureSlide, { DemoLine, DemoThinking, DemoWindow } from './FeatureSlide';

const easing = [0.22, 1, 0.36, 1];

/* ─────────────────────────── Slide 2: Legal Database ─────────────────────── */

function DatabaseDemo() {
  return (
    <DemoWindow title="jurista — statute search" footer="50,000+ sections indexed">
      <DemoLine className="rounded-lg bg-[var(--surface-ai)] px-3 py-2 text-sm ring-1 ring-[var(--border)]">
        <span className="text-[var(--text-secondary)]">Search: </span>
        <span className="font-medium">"Section 302 IPC"</span>
        <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-accent align-middle" />
      </DemoLine>
      <DemoLine delay={0.7} className="space-y-2">
        <p className="text-[11px] uppercase tracking-widest text-[var(--text-muted)]">Results</p>
        {[
          { id: '§ 302 IPC', label: 'Punishment for murder', sub: 'Dropped on 1 Jul 2024 → renumbered § 103 BNS' },
          { id: '§ 103 BNS', label: 'Punishment for murder', sub: 'Bharatiya Nyaya Sanhita, 2023 — in force' },
          { id: '§ 300 IPC', label: 'Culpable homicide amounting to murder', sub: 'Related provision' },
        ].map((result, i) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.25, duration: 0.4 }}
            className="rounded-lg bg-[var(--surface-ai)] p-2.5 ring-1 ring-[var(--border)]"
          >
            <p className="text-xs font-semibold text-accent">{result.id}</p>
            <p className="text-sm">{result.label}</p>
            <p className="text-[11px] text-[var(--text-muted)]">{result.sub}</p>
          </motion.div>
        ))}
      </DemoLine>
    </DemoWindow>
  );
}

/* ─────────────────────── Slide 3: Landmark Case Analysis ─────────────────── */

function CaseAnalysisDemo() {
  return (
    <DemoWindow title="jurista — case analysis" footer="Ratio decidendi extraction">
      <DemoThinking label="Extracting principles from precedents…" />
      <DemoLine delay={0.9} className="rounded-xl bg-[var(--surface-ai)] p-3.5 ring-1 ring-[var(--border)]">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <BadgeCheck className="h-4 w-4 text-success" />
          Donoghue v. Stevenson (1932)
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">Ratio:</strong> A manufacturer owes a duty
          of care to the ultimate consumer — the foundation of modern negligence law.
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {['Duty of care', 'Neighbor principle', 'Tort law'].map((chip) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.3 }}
              className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent ring-1 ring-accent/20"
            >
              {chip}
            </motion.span>
          ))}
        </div>
      </DemoLine>
    </DemoWindow>
  );
}

/* ─────────────────────── Slide 4: Real-Time Legal Updates ────────────────── */

function UpdatesDemo() {
  return (
    <DemoWindow title="jurista — live notifications" footer="Real-time regulatory search">
      <DemoThinking label="Syncing latest gazette notifications…" />
      <DemoLine delay={0.6} className="space-y-2">
        {[
          { time: '09:14', text: 'BNS § 111 modified — Finisar amendment notification', fresh: true },
          { time: 'Yesterday', text: 'New IT Rules draft published for consultation', fresh: true },
          { time: '2 days ago', text: 'Contract Act § 73 cross-links refreshed', fresh: false },
        ].map((update, i) => (
          <motion.div
            key={update.text}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 + i * 0.35, duration: 0.4 }}
            className="flex items-start gap-2.5 rounded-lg bg-[var(--surface-ai)] p-2.5 ring-1 ring-[var(--border)]"
          >
            <span
              className={`mt-1 grid h-5 w-5 place-items-center rounded-full ${
                update.fresh ? 'bg-success/10 text-success' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
              }`}
            >
              <BellRing className="h-3 w-3" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm">{update.text}</p>
              <p className="text-[11px] text-[var(--text-muted)]">
                {update.time} {update.fresh && '• new'}
              </p>
            </div>
          </motion.div>
        ))}
      </DemoLine>
      <DemoLine delay={2} className="rounded-lg bg-accent/5 p-2.5 ring-1 ring-accent/20">
        <p className="text-xs">
          <strong className="text-accent">Amendment Impact Analysis:</strong> 14 provisions you
          viewed are affected by this change.
        </p>
      </DemoLine>
    </DemoWindow>
  );
}

/* ─────────────────────── Slide 5: AI-Powered Chat Assistant ──────────────── */

function ChatAssistantDemo() {
  return (
    <DemoWindow title="jurista — chat" footer={
      <span className="inline-flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 text-accent" /> Powered by Gemini 2.5
      </span>
    }>
      <DemoLine className="flex justify-end">
        <span className="max-w-[80%] rounded-2xl rounded-br-md bg-navy px-3.5 py-2 text-sm text-white dark:bg-navy-light">
          Is bail a matter of right or discretion?
        </span>
      </DemoLine>
      <DemoThinking label="Jurista is reasoning…" />
      <DemoLine delay={0.8} className="rounded-2xl rounded-bl-md bg-[var(--surface-ai)] px-3.5 py-3 text-sm ring-1 ring-[var(--border)]">
        <span className="block leading-relaxed">
          Bail is primarily a <strong>statutory right</strong> under the CrPC for bailable
          offences, and a matter of judicial <strong>discretion</strong> in non-bailable cases,
          guided by the triple test…
        </span>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, duration: 0.4 }}
          className="mt-3 flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] pt-2.5"
        >
          {['CrPC §436', 'CrPC §437', 'Sanjay Chandra case'].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent ring-1 ring-accent/20"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </DemoLine>
    </DemoWindow>
  );
}

/* ──────────────────────── Slide 6: Document Analysis ─────────────────────── */

function DocumentAnalysisDemo() {
  return (
    <DemoWindow title="jurista — document vault" footer="PDF · TXT · DOC · DOCX up to 10 MB">
      {/* Drop zone with the file "dropping in" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative grid h-28 place-items-center rounded-xl border-2 border-dashed border-accent/35 bg-accent/[0.04]"
      >
        <motion.div
          initial={{ y: -48, opacity: 0, rotate: -8 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.55, ease: 'easeOut' }}
          className="flex items-center gap-2.5 rounded-lg bg-[var(--surface-ai)] px-4 py-2.5 shadow-card ring-1 ring-accent/25"
        >
          <FileUp className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">contract_draft.pdf</span>
        </motion.div>
      </motion.div>

      <DemoThinking label="Analyzing clauses…" />

      <DemoLine delay={1} className="space-y-1.5">
        {[
          { text: 'Termination clause → 30-day notice, auto-renewal flagged', tone: 'accent' },
          { text: 'Indemnity is one-sided → review recommended', tone: 'warn' },
          { text: 'Governing law: Indian courts ✓', tone: 'ok' },
        ].map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3 + i * 0.3, duration: 0.4 }}
            className="rounded-lg bg-[var(--surface-ai)] px-3 py-2 text-xs ring-1 ring-[var(--border)]"
          >
            {item.tone === 'warn' ? <strong className="text-accent">{item.text}</strong> : item.text}
          </motion.div>
        ))}
      </DemoLine>
    </DemoWindow>
  );
}

/* ─────────────────────── The five feature slides ─────────────────────────── */

export const FEATURE_SLIDES = [
  <FeatureSlide
    key="database"
    number="01"
    title="Comprehensive Legal Database"
    description="Access India's most extensive digital legal library — 50,000+ sections from the Constitution, IPC, CrPC, CPC, and the new BNS & BNSS, with full-text search across all acts."
    bullets={[
      'Full-text search across all acts',
      'Smart citation cross-linking between old and new codes',
      'Amendment history tracking in real time',
    ]}
    demo={<DatabaseDemo />}
    cta={{ label: 'Open the workspace', to: '/chat' }}
  />,
  <FeatureSlide
    key="cases"
    number="02"
    title="Landmark Case Analysis"
    description="Judgments from the Supreme Court and High Courts distilled into plain-language summaries — with AI-extracted principles you can verify against the original text."
    bullets={[
      'AI-generated case summaries',
      'Ratio decidendi & obiter extraction',
      'Precedent citation chains',
    ]}
    demo={<CaseAnalysisDemo />}
    cta={{ label: 'Try case analysis', to: '/chat' }}
  />,
  <FeatureSlide
    key="updates"
    number="03"
    title="Real-Time Legal Updates"
    description="Legislation doesn't stand still. Jurista tracks amendments and new judicial orders as they happen, and tells you how they affect what you've researched."
    bullets={[
      'Live gazette and judgment feed',
      'Amendment impact analysis',
      'IPC → BNS renumbering assistance',
    ]}
    demo={<UpdatesDemo />}
    cta={{ label: 'See live updates', to: '/chat' }}
  />,
  <FeatureSlide
    key="chat"
    number="04"
    title="AI-Powered Chat Assistant"
    description="Ask any question about Indian law and get a clear, conversational answer grounded in statute — not guesswork — with sources cited on every response."
    bullets={[
      'Conversational legal reasoning',
      'Source citation chips on every answer',
      'Optional live web-search fallback',
    ]}
    demo={<ChatAssistantDemo />}
    cta={{ label: 'Start chatting', to: '/chat' }}
  />,
  <FeatureSlide
    key="documents"
    number="05"
    title="Document Analysis"
    description="Drop in a brief, contract, or affidavit and get an instant summary with key clauses highlighted — all analyzed within your current conversation."
    bullets={[
      'Upload PDF, TXT, DOC & DOCX (up to 10 MB)',
      'Automatic document summaries',
      'Key clause highlighting with flags',
    ]}
    demo={<DocumentAnalysisDemo />}
    cta={{ label: 'Analyze a document', to: '/chat' }}
  />,
];

export default FEATURE_SLIDES;
