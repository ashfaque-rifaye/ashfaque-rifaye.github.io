import type { ReactNode } from 'react';

/** Content placeholder, visible only in `vite dev`. Production builds
    (including the prerender) omit it; open items live in CONTENT-TODO.md. */
export function Todo({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="todo" role="note">
      <span className="font-semibold text-accent">[ADD DETAIL]</span> {children}
    </div>
  );
}
