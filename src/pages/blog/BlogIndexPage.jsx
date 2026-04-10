/**
 * @file BlogIndexPage.jsx
 * @description 博客列表页：轻量目录式呈现。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../design-system';
import { useNotesPosts } from './useNotesPosts';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

export function BlogIndexPage() {
  const { posts } = useNotesPosts();
  const { content: copy } = useSiteBlock('copy.blog', {
    fallback: {
      pageDescriptionMd: '不追求高频更新。把值得写的写清楚，把值得留的留下来。',
      title: 'Blog / Notes',
    },
  });

  return (
    <Page
      title={copy?.title || 'Blog / Notes'}
      description={copy?.pageDescriptionMd || '不追求高频更新。把值得写的写清楚，把值得留的留下来。'}
    >
      <div className="mb-10 border border-[color:var(--border)] bg-white p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
          ALSO IN MORE
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[18px] font-medium leading-[1.5] text-[color:var(--text)]">
              想看「此刻」吗？
            </p>
            <p className="mt-1 text-[14px] font-light leading-[1.8] text-[color:var(--text-muted)]">
              Now 是更短、更及时的近况记录。
            </p>
          </div>
          <Link
            to="/now"
            className="shrink-0 border border-[color:var(--border)] px-4 py-2 text-[12px] uppercase tracking-[0.15em] text-[color:var(--text-muted)] hover:text-[color:var(--text)] transition-colors"
          >
            Go to Now →
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <Link
            key={p.slug || p.id}
            to={`/blog/${p.slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-base font-medium text-slate-900">
                {p.title}
              </h2>
              <span className="text-xs uppercase tracking-widest text-slate-400">
                {p.date}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {p.summary}
            </p>
          </Link>
        ))}
      </div>
    </Page>
  );
}

