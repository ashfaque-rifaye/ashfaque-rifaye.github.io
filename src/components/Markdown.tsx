import type { ReactNode } from 'react';

/* Dependency-free markdown renderer for chat messages. Builds React
   elements (no dangerouslySetInnerHTML) so it's XSS-safe. Supports
   bold, italic, inline code, links, and bullet lists. */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let idx = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${idx++}`;
    if (m[2] || m[3]) nodes.push(<strong key={key} className="font-semibold">{m[2] || m[3]}</strong>);
    else if (m[4] || m[5]) nodes.push(<em key={key}>{m[4] || m[5]}</em>);
    else if (m[6]) nodes.push(<code key={key} className="rounded bg-black/10 px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/10">{m[6]}</code>);
    else if (m[7] && m[8]) nodes.push(<a key={key} href={m[8]} target="_blank" rel="noreferrer" className="underline underline-offset-2">{m[7]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ text }: { text: string }) {
  const lines = String(text).split('\n');
  const blocks: ReactNode[] = [];
  let list: string[] | null = null;
  const flush = () => {
    if (list) {
      const items = list;
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="my-1 list-disc space-y-0.5 pl-4 marker:text-accent-500">
          {items.map((item, i) => <li key={i}>{renderInline(item, `li-${blocks.length}-${i}`)}</li>)}
        </ul>
      );
      list = null;
    }
  };
  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      if (!list) list = [];
      list.push(bullet[1]);
    } else {
      flush();
      if (line.trim() !== '') {
        blocks.push(<p key={`p-${i}`} className="whitespace-pre-line break-words">{renderInline(line, `p-${i}`)}</p>);
      }
    }
  });
  flush();
  return <div className="space-y-1.5">{blocks}</div>;
}
