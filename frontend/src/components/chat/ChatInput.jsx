import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Globe, Paperclip, X } from 'lucide-react';
import { CHAT_MODEL_LABEL } from '../../lib/constants';
import { formatFileSize } from '../../lib/utils';
import { useChatContext } from '../../contexts/ChatContext';

const MAX_CHARS = 4000;

/** Auto-expanding composer with attach, web-search toggle, model badge. */
export function ChatInput() {
  const {
    sendMessage,
    isLoading,
    searchEnabled,
    toggleSearch,
    attachedDocument,
    uploadDocument,
    validateFile,
  } = useChatContext();

  const [value, setValue] = useState('');
  const [uploadState, setUploadState] = useState(null); // { kind:'error'|'ok', msg }
  const [fileInputKey, setFileInputKey] = useState(0);
  const textareaRef = useRef(null);
  const fileRef = useRef(null);

  // Auto-resize up to ~6 lines.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`; // 6 * 28px
  }, [value]);

  // Prefill from quick actions (sidebar "Quick Actions" chips).
  useEffect(() => {
    const onPrefill = (e) => {
      const prompt = e.detail || '';
      setValue(prompt);
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
        textareaRef.current.setSelectionRange(prompt.length, prompt.length);
      });
    };
    window.addEventListener('jurista:prefill-prompt', onPrefill);
    return () => window.removeEventListener('jurista:prefill-prompt', onPrefill);
  }, []);

  const submit = () => {
    const message = value.trim();
    if (!message || isLoading) return;
    setValue('');
    setUploadState(null);
    sendMessage(message);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setUploadState({ kind: 'error', msg: validationError });
      resetFileInput();
      return;
    }

    setUploadState({ kind: 'uploading', msg: 'Uploading and analyzing document…' });
    try {
      const result = await uploadDocument(file);
      setUploadState({
        kind: 'ok',
        msg: `${result.filename} attached · web search disabled while a document is attached`,
      });
      // Auto-clear the confirmation after a moment.
      setTimeout(() => setUploadState(null), 3500);
    } catch (error) {
      setUploadState({ kind: 'error', msg: error?.message || 'Upload failed. Please try again.' });
    } finally {
      resetFileInput();
    }
  };

  const resetFileInput = () => setFileInputKey((k) => k + 1);

  const disableSearchBecauseDoc = !!attachedDocument;
  const blocked = isLoading || !value.trim() || value.length > MAX_CHARS;

  return (
    <div className="pb-[calc(1rem+env(safe-area-inset-bottom))]">
      {/* Upload status strip */}
      {uploadState && (
        <p
          role={uploadState.kind === 'error' ? 'alert' : 'status'}
          className={`mb-2 rounded-lg px-3 py-2 text-xs ${
            uploadState.kind === 'error'
              ? 'border border-[var(--error)] bg-[var(--error-subtle)] text-[var(--error)]'
              : 'border border-success/30 bg-success/10 text-success'
          }`}
        >
          {uploadState.msg}
        </p>
      )}

      <div
        className={`rounded-2xl border bg-[var(--surface-ai)] shadow-card transition-colors focus-within:border-accent/50 ${
          attachedDocument ? 'border-accent/40' : 'border-[var(--border)]'
        }`}
      >
        {/* Document chip */}
        {attachedDocument && (
          <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-2.5 text-xs">
            <Paperclip className="h-3.5 w-3.5 text-accent" />
            <span className="max-w-[60%] truncate font-medium">{attachedDocument.filename}</span>
            {attachedDocument.characters && (
              <span className="text-[var(--text-muted)]">
                {formatFileSize(attachedDocument.characters)}
              </span>
            )}
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
              context active
            </span>
            <button
              onClick={() => {
                /* removal lives in the sidebar; here we just dispatch a helper */
                window.dispatchEvent(new Event('jurista:remove-document'));
              }}
              aria-label="Remove document from sidebar"
              className="ml-auto grid h-6 w-6 place-items-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--error)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask about Indian law…"
          aria-label="Chat message"
          maxLength={MAX_CHARS}
          className="block max-h-[168px] w-full resize-none bg-transparent px-4 py-3.5 text-[15px] leading-relaxed outline-none placeholder:text-[var(--text-muted)] scrollbar-slim"
        />

        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 pb-2.5">
          <button
            onClick={() => fileRef.current?.click()}
            title="Attach document (PDF, TXT, DOC, DOCX — 10 MB max)"
            aria-label="Attach document"
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-accent"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            ref={fileRef}
            key={fileInputKey}
            type="file"
            accept=".pdf,.txt,.doc,.docx,application/pdf,text/plain"
            className="hidden"
            onChange={onFileChange}
          />

          <button
            onClick={toggleSearch}
            disabled={disableSearchBecauseDoc}
            title={
              disableSearchBecauseDoc
                ? 'Web search is disabled while a document is attached'
                : searchEnabled
                  ? 'Web search enabled — click to disable'
                  : 'Enable live web search'
            }
            aria-pressed={searchEnabled}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors ${
              searchEnabled
                ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
            } ${disableSearchBecauseDoc ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <Globe className="h-3.5 w-3.5" />
            Web Search {searchEnabled && '· On'}
          </button>

          <span className="ml-auto hidden items-center gap-2 text-[11px] text-[var(--text-muted)] sm:flex">
            {value.length > MAX_CHARS - 200 && (
              <span className={`tabular-nums ${value.length >= MAX_CHARS ? 'text-[var(--error)]' : ''}`}>
                {value.length}/{MAX_CHARS}
              </span>
            )}
            <span className="rounded-full bg-[var(--bg-tertiary)] px-2.5 py-1 font-medium">
              {CHAT_MODEL_LABEL}
            </span>
          </span>

          <button
            onClick={submit}
            disabled={blocked}
            aria-label={isLoading ? 'Jurista is responding' : 'Send message'}
            className={`ml-2 grid h-9 w-9 place-items-center rounded-xl transition-all ${
              blocked
                ? 'cursor-not-allowed bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                : 'bg-gradient-to-r from-accent to-accent-deep text-white shadow-card hover:shadow-glow'
            }`}
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
            ) : (
              <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-[var(--text-muted)]">
        Press <kbd className="rounded border border-[var(--border)] px-1">Enter</kbd> to send ·{' '}
        <kbd className="rounded border border-[var(--border)] px-1">Shift + Enter</kbd> for a new
        line · Jurista can be wrong — verify citations
      </p>
    </div>
  );
}

export default ChatInput;
