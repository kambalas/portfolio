import { useState, useRef } from 'react';

const COOLDOWN_MS = 60_000; // 60 seconds between submissions

const fieldClass =
  "font-sans text-[15px] px-4 py-3.5 rounded-[10px] bg-surface text-ink " +
  "border border-hairline placeholder:text-faint " +
  "focus:outline-none focus:border-clay transition-colors duration-200";

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.12em] text-faint";

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | ratelimited
  const lastSubmitRef = useRef(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: if filled, silently pretend success
    if (honeypot) {
      setStatus('success');
      return;
    }

    // Rate limit: block if submitted within cooldown
    const now = Date.now();
    if (now - lastSubmitRef.current < COOLDOWN_MS) {
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
        lastSubmitRef.current = Date.now();
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'ratelimited'}
        className="self-start rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-paper
          hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
      >
        {status === 'sending' ? 'Sending…' : 'Send message →'}
      </button>

      {/* Status Messages */}
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
    </form>
  );
}

export default ContactForm;
