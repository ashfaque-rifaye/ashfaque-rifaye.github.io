import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { cx } from '../../lib/utils';

type Variant = 'primary' | 'secondary';

/** Internal navigation styled as a button. */
export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link to={to} onClick={onClick} className={cx('btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary', className)}>
      {children}
      <ArrowRight size={17} aria-hidden className="arrow" />
    </Link>
  );
}

/** External link or file download styled as a button. */
export function ButtonAnchor({
  href,
  children,
  variant = 'secondary',
  download,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  download?: string | boolean;
  className?: string;
  onClick?: () => void;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      onClick={onClick}
      download={download === true ? '' : download || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={cx('btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary', className)}
    >
      {children}
      {download ? (
        <Download size={17} aria-hidden className="arrow arrow-down" />
      ) : (
        <ArrowUpRight size={17} aria-hidden className="arrow" />
      )}
    </a>
  );
}

/** Inline text link with an arrow (internal). */
export function ArrowLink({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link to={to} onClick={onClick} className={cx('link-arrow', className)}>
      <span className="u">{children}</span>
      <ArrowRight size={16} aria-hidden />
    </Link>
  );
}

/** Inline text link with an arrow (external, opens in a new tab). */
export function ArrowAnchor({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" onClick={onClick} className={cx('link-arrow', className)}>
      <span className="u">{children}</span>
      <ArrowUpRight size={16} aria-hidden />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
