import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check, Copy, Wand2 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { HIRE_CTA, PERSON, RESUME, SOCIALS } from '../content/profile';
import { trackEvent } from '../lib/analytics';

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email);
      setCopied(true);
      trackEvent('email_copied', { location: 'contact' });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = SOCIALS.email;
    }
  };

  const rows = [
    { key: 'Based', value: `${PERSON.location} · ${PERSON.timezone}` },
    { key: 'Open to', value: PERSON.openTo },
    { key: 'Status', value: PERSON.availability },
  ];

  const elsewhere = [
    { label: 'LinkedIn', href: SOCIALS.linkedin, detail: 'in/ashfaque-rifaye' },
    { label: 'GitHub', href: SOCIALS.github, detail: 'ashfaque-rifaye' },
    { label: 'Résumé', href: RESUME.pdf, detail: 'PDF, 2 pages', download: true },
  ];

  return (
    <div className="pb-[var(--section)]">
      <PageHeader title={
          <>
            Let’s <span className="text-grad">talk</span>
          </>
        } lede={`${HIRE_CTA.question} ${HIRE_CTA.line}`} />

      <section aria-label="Contact details" className="wrap">
        <div className="grid gap-14 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="t-label">Email is the fastest route</p>
            <a
              href={SOCIALS.email}
              onClick={() => trackEvent('social_link_click', { platform: 'email', location: 'contact' })}
              className="mt-5 block break-words text-[clamp(1.5rem,1rem+2.2vw,2.75rem)] font-medium leading-tight tracking-[-0.02em] text-ink underline decoration-accent decoration-1 underline-offset-[0.2em] transition-colors hover:text-accent"
              style={{ fontStretch: '106%' }}
            >
              {PERSON.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`${SOCIALS.email}?subject=${encodeURIComponent("Let's talk")}`}
                onClick={() => trackEvent('social_link_click', { platform: 'email', location: 'contact_cta' })}
                className="btn btn-primary"
              >
                Write an email
                <ArrowRight size={17} aria-hidden className="arrow" />
              </a>
              <button type="button" onClick={() => void copy()} className="btn btn-secondary">
                {copied ? <Check size={16} aria-hidden className="text-accent" /> : <Copy size={16} aria-hidden />}
                {copied ? 'Copied' : 'Copy address'}
              </button>
              <span role="status" aria-live="polite" className="sr-only">
                {copied ? 'Email address copied to the clipboard' : ''}
              </span>
            </div>
            <div className="mt-12 border-t border-line pt-8">
              <h2 className="text-[1.0625rem] font-semibold text-ink" style={{ fontStretch: '106%' }}>
                Hiring for a specific role?
              </h2>
              <p className="t-body mt-2 max-w-[54ch]">
                Paste the job description into my Hiring Agent. It maps each requirement to evidence from my work, scores the fit
                honestly, and drafts an email and a calendar invite for you.
              </p>
              <Link to="/agent/" className="btn btn-ai ring-grad mt-5">
                <Wand2 size={17} aria-hidden className="text-tone-violet" />
                Match me to your role
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <dl className="titleblock">
              {rows.map((r) => (
                <div key={r.key}>
                  <dt className="t-label">{r.key}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 border-t border-line">
              {elsewhere.map((l) => (
                <li key={l.label} className="border-b border-line">
                  <a
                    href={l.href}
                    target={l.download ? undefined : '_blank'}
                    rel={l.download ? undefined : 'noreferrer'}
                    download={l.download ? '' : undefined}
                    onClick={() =>
                      l.download
                        ? trackEvent('resume_download', { file_extension: 'pdf', location: 'contact' })
                        : trackEvent('social_link_click', { platform: l.label.toLowerCase(), location: 'contact' })
                    }
                    className="group flex min-h-12 items-center justify-between py-3 no-underline"
                  >
                    <span className="font-medium text-ink transition-colors group-hover:text-accent">{l.label}</span>
                    <span className="text-[0.875rem] text-ink-3">{l.detail}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
