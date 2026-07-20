import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIALS } from '../data/profile';
import { trackEvent } from '../lib/analytics';

function FooterLink({ href, icon: Icon, label }: { href: string; icon: typeof Mail; label: string }) {
  const isMail = href.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noreferrer'}
      onClick={() => trackEvent('social_link_click', { platform: label, location: 'footer' })}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-mute transition-colors hover:bg-accent-500/10 hover:text-accent-text"
    >
      <Icon size={16} aria-hidden /> {label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 md:flex-row md:px-8">
        <p className="text-sm text-faint">© {new Date().getFullYear()} Ashfaque Rifaye. Built with care.</p>
        <nav aria-label="Social links" className="flex items-center gap-1">
          <FooterLink href={SOCIALS.linkedin} icon={Linkedin} label="LinkedIn" />
          <FooterLink href={SOCIALS.github} icon={Github} label="GitHub" />
          <FooterLink href={`mailto:${SOCIALS.email}`} icon={Mail} label="Email" />
        </nav>
      </div>
    </footer>
  );
}
