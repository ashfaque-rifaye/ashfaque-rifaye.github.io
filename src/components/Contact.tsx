import { useState } from 'react';
import { Download, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { SOCIALS } from '../data/profile';
import { trackEvent } from '../lib/analytics';
import { cx } from '../lib/utils';
import { CARD, Reveal, Section } from './ui';

const INPUT =
  'w-full rounded-xl border border-line bg-base/60 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20';

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-text">
        <Icon size={18} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-wide text-faint">{label}</span>
        <span className="block truncate text-sm font-medium">{value}</span>
      </span>
    </>
  );
  const cls = 'group flex items-center gap-3 rounded-xl border border-line bg-raised p-3 transition-colors hover:border-accent-500/40';
  if (!href) return <div className={cls}>{content}</div>;
  const isMail = href.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noreferrer'}
      onClick={() => trackEvent('social_link_click', { platform: label, location: 'contact' })}
      className={cls}
    >
      {content}
    </a>
  );
}

export function Contact({ onResume }: { onResume: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('contact_form_submit', { method: 'email_client' });
    const subject = `Portfolio Inquiry from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:${SOCIALS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something intelligent."
      intro="Open to product, AI, and analytics roles — and always happy to talk shop. The form opens your email client; nothing is stored."
    >
      <div className="grid gap-5 md:grid-cols-[1fr,1.15fr]">
        <Reveal>
          <div className={cx(CARD, 'flex h-full flex-col gap-3.5 p-6 md:p-7')}>
            <ContactRow icon={Mail} label="Email" value={SOCIALS.email} href={`mailto:${SOCIALS.email}`} />
            <ContactRow icon={Linkedin} label="LinkedIn" value="in/ashfaque-rifaye" href={SOCIALS.linkedin} />
            <ContactRow icon={Github} label="GitHub" value="ashfaque-rifaye" href={SOCIALS.github} />
            <ContactRow icon={MapPin} label="Location" value="Chennai, IND · Remote-friendly" />
            <button
              onClick={onResume}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-5 py-2.5 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-500/20"
            >
              <Download size={16} aria-hidden /> Download Resume
            </button>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form onSubmit={submit} className={cx(CARD, 'space-y-4 p-6 md:p-7')}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-faint">Name</label>
                <input
                  id="contact-name"
                  className={INPUT}
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-faint">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  className={INPUT}
                  placeholder="you@company.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-faint">Message</label>
              <textarea
                id="contact-message"
                className={INPUT}
                rows={5}
                placeholder="Tell me about the role or project…"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink shadow-glow transition-all hover:brightness-105 active:scale-[0.98]"
            >
              Send message <Send size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
