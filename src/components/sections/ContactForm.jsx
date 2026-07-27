import { useState, useRef, useEffect } from 'react';
import {
  trackFormStart,
  trackFormFieldComplete,
  trackFormSubmit,
  trackFormAbandon,
} from '../../lib/analytics';

const COOLDOWN_MS = 60_000; // 60 seconds between submissions

const fieldClass =
  "font-sans text-[15px] px-4 py-3.5 rounded-[10px] bg-surface text-ink " +
  "border border-hairline placeholder:text-faint " +
  "focus:outline-none focus:border-clay " +
  "focus-visible:ring-2 focus-visible:ring-clay/40 focus-visible:ring-offset-0 " +
  "transition-colors duration-200";

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.12em] text-faint";

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | ratelimited
  const lastSubmitRef = useRef(0);

  // ── Funnel tracking state ──
  // Only field NAMES, lengths and filled/empty flags are ever sent. The
  // values themselves (name, email, message) are PII and never leave here.
  const startedAtRef = useRef(0);
  const hasStartedRef = useRef(false);
  const hasReportedOutcomeRef = useRef(false);
  const lastFieldRef = useRef('');
  const formRef = useRef(null);

  const handleFocus = (e) => {
    lastFieldRef.current = e.target.name;
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    startedAtRef.current = Date.now();
    trackFormStart();
  };

  // Fired per field on blur — this is what shows you which field people stall
  // on (almost always the free-text "Project" box).
  const handleBlur = (e) => {
    trackFormFieldComplete(e.target.name, e.target.value.trim().length > 0);
  };

  // Someone typed into the form and left without ever submitting. Reported on
  // page hide because that is the only event mobile Safari reliably fires.
  useEffect(() => {
    const reportAbandon = () => {
      if (!hasStartedRef.current || hasReportedOutcomeRef.current) return;
      hasReportedOutcomeRef.current = true; // report at most once
      const fieldsFilled = ['name', 'email', 'message'].filter(
        (field) => formRef.current?.elements[field]?.value.trim()
      ).length;
      trackFormAbandon(lastFieldRef.current || 'none', fieldsFilled);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') reportAbandon();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', reportAbandon);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', reportAbandon);
    };
  }, []);

  // When rate-limited, re-enable the form automatically once the cooldown
  // has passed instead of leaving the button disabled indefinitely.
  useEffect(() => {
    if (status !== 'ratelimited') return undefined;
    const remaining = Math.max(0, COOLDOWN_MS - (Date.now() - lastSubmitRef.current));
    const timer = setTimeout(() => setStatus('idle'), remaining);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Seconds from first field focus to this submit attempt.
  const secondsToComplete = () =>
    startedAtRef.current ? (Date.now() - startedAtRef.current) / 1000 : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    hasReportedOutcomeRef.current = true;

    // Honeypot: if filled, silently pretend success
    if (honeypot) {
      // Tracked as 'spam' so bot traffic never inflates the conversion count.
      trackFormSubmit('spam', secondsToComplete(), form.message.length);
      setStatus('success');
      return;
    }

    // Rate limit: block if submitted within cooldown
    const now = Date.now();
    if (now - lastSubmitRef.current < COOLDOWN_MS) {
      trackFormSubmit('ratelimited', secondsToComplete(), form.message.length);
      setStatus('ratelimited');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'e0c8a5f3-d3aa-4bd3-a3d1-d57dcd4391b8',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Message LENGTH only — never the text itself.
        trackFormSubmit('success', secondsToComplete(), form.message.length);
        lastSubmitRef.current = Date.now();
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        trackFormSubmit('error', secondsToComplete(), form.message.length);
        setStatus('error');
      }
    } catch {
      trackFormSubmit('error', secondsToComplete(), form.message.length);
      setStatus('error');
    }
  };

  return (
    // data-clarity-mask: belt-and-braces on top of Clarity's default masking,
    // so a session replay can never show someone's name, email or message.
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      data-clarity-mask="true"
      className="flex flex-col gap-4"
    >
      {/* Honeypot: invisible to humans, bots auto-fill it */}
      <input
        type="text"
        name="phone"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            name="name"
            required
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="cf-message">Project</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="What are you building, and what do you need?"
          value={form.message}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'ratelimited'}
        className="self-start rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-paper
          hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/60 focus-visible:ring-offset-2
          transition-opacity duration-200"
      >
        {status === 'sending' ? 'Sending…' : 'Send message →'}
      </button>

      {/* Status messages: aria-live announces changes to screen readers */}
      <div aria-live="polite" role="status">
        {status === 'success' && (
          <p className="text-verified font-medium">
            Message sent successfully! I&apos;ll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-clay font-medium">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
        {status === 'ratelimited' && (
          <p className="text-clay font-medium">
            Please wait a minute before sending another message.
          </p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
