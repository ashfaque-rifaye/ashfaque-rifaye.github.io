import type { ReactNode } from 'react';

/* Dependency-free markdown for chat replies. Builds React elements (no
   dangerouslySetInnerHTML), so model output can never inject markup.
   Supports bold, italic, inline code, https links and bullet lists. */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|`([^`]+)`|\[([^\]]+)\]\((https:\/\/[^\s)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let idx = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${idx++}`;
    if (m[2] || m[3]) nodes.push(<strong key={key} className="font-semibold text-ink">{m[2] || m[3]}</strong>);
    else if (m[4] || m[5]) nodes.push(<em key={key}>{m[4] || m[5]}</em>);
    else if (m[6]) nodes.push(<code key={key} className="rounded bg-bg-3 px-1 py-0.5 font-mono text-[0.85em]">{m[6]}</code>);
    else if (m[7] && m[8]) {
      nodes.push(
        <a key={key} href={m[8]} target="_blank" rel="noreferrer" className="text-ink underline decoration-accent underline-offset-2">
          {m[7]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] | null = null;
  const flush = () => {
    if (!list) return;
    const items = list;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="grid gap-1 pl-4 [list-style:disc] marker:text-accent">
        {items.map((item, i) => (
          <li key={i}>{renderInline(item, `li-${blocks.length}-${i}`)}</li>
        ))}
      </ul>
    );
    list = null;
  };
  String(text)
    .split('\n')
    .forEach((raw, i) => {
      const line = raw.trimEnd();
      const bullet = line.match(/^\s*[-*]\s+(.*)$/);
      if (bullet) {
        (list ??= []).push(bullet[1]);
      } else {
        flush();
        if (line.trim()) blocks.push(<p key={`p-${i}`} className="break-words">{renderInline(line, `p-${i}`)}</p>);
      }
    });
  flush();
  return <div className="grid gap-2">{blocks}</div>;
}
