import { useState, useRef } from 'react';
import { MdEmail, MdPerson, MdMessage, MdSend } from 'react-icons/md';

const COOLDOWN_MS = 60_000; // 60 seconds between submissions

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
    <section id="contact-form" className="mt-16 pt-12 px-6 lg:px-24">
      <h4 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
        Send Me a{' '}
        <span className="text-orange-700 dark:text-orange-400">Message</span>
      </h4>

      <p className="mt-8 leading-7 text-base text-zinc-600 dark:text-zinc-300 font-light">
        Have a project idea, a question, or just want to say hello? Fill out the
        form below and I&apos;ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        {/* Honeypot — invisible to humans, bots auto-fill it */}
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

        {/* Name */}
        <div className="relative">
          <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl
              bg-zinc-100 dark:bg-zinc-800
              border border-zinc-200/80 dark:border-zinc-700/50
              text-zinc-900 dark:text-zinc-100
              placeholder:text-zinc-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-orange-700/50 dark:focus:ring-orange-400/50 focus:border-transparent
              transition-all duration-300"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-400 dark:text-zinc-500" />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl
              bg-zinc-100 dark:bg-zinc-800
              border border-zinc-200/80 dark:border-zinc-700/50
              text-zinc-900 dark:text-zinc-100
              placeholder:text-zinc-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-orange-700/50 dark:focus:ring-orange-400/50 focus:border-transparent
              transition-all duration-300"
          />
        </div>

        {/* Message */}
        <div className="relative">
          <MdMessage className="absolute left-4 top-4 text-lg text-zinc-400 dark:text-zinc-500" />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl resize-none
              bg-zinc-100 dark:bg-zinc-800
              border border-zinc-200/80 dark:border-zinc-700/50
              text-zinc-900 dark:text-zinc-100
              placeholder:text-zinc-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-orange-700/50 dark:focus:ring-orange-400/50 focus:border-transparent
              transition-all duration-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'sending' || status === 'ratelimited'}
          className="flex items-center gap-2 px-6 py-3 font-medium
            border border-black dark:border-white
            text-zinc-900 dark:text-zinc-100
            hover:bg-orange-700 hover:text-white hover:border-orange-700
            dark:hover:bg-orange-400 dark:hover:text-zinc-900 dark:hover:border-orange-400
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
          <MdSend className="text-lg" />
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <p className="text-green-600 dark:text-green-400 font-medium">
            Message sent successfully! I&apos;ll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 dark:text-red-400 font-medium">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
        {status === 'ratelimited' && (
          <p className="text-orange-600 dark:text-orange-400 font-medium">
            Please wait a minute before sending another message.
          </p>
        )}
      </form>
    </section>
  );
}

export default ContactForm;
