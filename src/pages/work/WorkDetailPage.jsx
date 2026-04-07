/**
 * @file WorkDetailPage.jsx
 * @description Work 详情页：两列（28/72）排版 + 破折号列表 + 数据亮点展示。
 */

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Page } from '../../design-system';
import { getWorkItem } from './workData';

function extractMetrics(texts) {
  const joined = texts.filter(Boolean).join(' ');
  const matches = joined.match(/(\d+(?:\.\d+)?%|\d+(?:\.\d+)?\/\d+|\d+(?:\.\d+)?分)/g) || [];
  return Array.from(new Set(matches)).slice(0, 3);
}

function DashList({ items }) {
  return (
    <ul className="space-y-2 text-[14px] leading-[1.9] text-[color:var(--text-muted)]">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="select-none text-[color:var(--text-muted)]">—</span>
          <span className="min-w-0">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function WorkDetailPage() {
  const { id } = useParams(); // 路由参数
  const item = getWorkItem(id); // 数据

  if (!item) {
    return (
      <Page title="Not found" description="这条经历不存在，或者链接写错了。">
        <Link
          to="/work"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← 返回 Work
        </Link>
      </Page>
    );
  }

  const metrics = extractMetrics([item.summary, ...(item.highlights || [])]);

  return (
    <Page title={`${item.company}`} description={`${item.role} · ${item.time}`}>
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)]">
        <Link to="/work" className="hover:text-slate-600 transition-colors">
          ← Work 时间轴
        </Link>
        <span className="text-[color:var(--text-light)]">{item.time}</span>
      </div>

      <div className="mt-12 border-t border-[color:var(--border)] pt-12">
        <div className="grid gap-10 md:grid-cols-[28%_72%] md:gap-12">
          <aside>
            <p className="font-body text-[14px] font-medium text-[color:var(--text)]">
              {item.company}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)]">
              {item.role}
            </p>
            <p className="mt-2 font-mono text-[11px] text-[color:var(--text-light)]">
              {item.time}
            </p>
          </aside>

          <section className="min-w-0">
            <DashList items={[item.summary, ...(item.highlights || [])]} />

            {metrics.length > 0 ? (
              <div className="mt-10 space-y-3">
                {metrics.map((m) => (
                  <p
                    key={m}
                    className="font-display text-[24px] font-normal leading-snug text-[color:var(--text)] border-l-2 border-[color:var(--text)] pl-4"
                  >
                    {m}
                  </p>
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </Page>
  );
}

