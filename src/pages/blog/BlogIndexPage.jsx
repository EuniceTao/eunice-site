/**
 * @file BlogIndexPage.jsx
 * @description 博客列表页：轻量目录式呈现。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../design-system';
import { posts } from './blogData';

export function BlogIndexPage() {
  return (
    <Page
      title="Blog / Notes"
      description="不追求高频更新。把值得写的写清楚，把值得留的留下来。"
    >
      <div className="space-y-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
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

