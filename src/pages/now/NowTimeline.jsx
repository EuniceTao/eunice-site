/**
 * @file NowTimeline.jsx
 * @description Now 时间轴：按日期倒序展示，可折叠展开，适合“小日记/备忘录”。
 */

import React from 'react';

function EntryMeta({ date, mood }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)]">
        {date}
      </p>
      {mood ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
          {mood}
        </p>
      ) : null}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-4 space-y-2 text-[14px] leading-[1.9] text-[color:var(--text-muted)]">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="select-none text-[color:var(--text-muted)]">—</span>
          <span className="min-w-0">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function NowEntry({ entry, defaultOpen = false }) {
  const preview = entry.body?.[0] ?? '';

  return (
    <details
      className="group border border-[color:var(--border)] bg-white px-7 py-6 open:border-[#111111]"
      open={defaultOpen}
    >
      <summary className="list-none cursor-pointer select-none">
        <EntryMeta date={entry.date} mood={entry.mood} />

        <div className="mt-3 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 className="text-[18px] font-medium leading-[1.5] text-[color:var(--text)]">
              {entry.title}
            </h3>
            {preview ? (
              <p className="mt-3 text-[14px] font-light leading-[1.8] text-[color:var(--text-muted)]">
                {preview}
              </p>
            ) : null}
          </div>

          <span className="shrink-0 text-[#BBBBBB] transition-transform group-open:rotate-90">
            →
          </span>
        </div>
      </summary>

      {entry.body?.length ? (
        <div className="mt-6 border-t border-[color:var(--border)] pt-6">
          <BulletList items={entry.body} />
        </div>
      ) : null}
    </details>
  );
}

export function NowTimeline({ entries }) {
  const items = Array.isArray(entries) ? entries : [];

  return (
    <div className="space-y-4">
      {items.map((e, idx) => (
        <NowEntry key={e.id} entry={e} defaultOpen={idx === 0} />
      ))}
    </div>
  );
}

