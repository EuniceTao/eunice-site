/**
 * @file ProjectsPage.jsx
 * @description 作品集：可扫读列表（展开查看背景与角色）。
 */

import React from 'react';
import { Page } from '../../design-system';
import { projects } from './projectsData';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

function toBullets(text) {
  if (!text) return [];
  return String(text)
    .split(/(?:\r?\n|；|。)\s*/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
      {children}
    </span>
  );
}

export function ProjectsPage() {
  const { content: copy } = useSiteBlock('copy.projects', {
    fallback: {
      pageDescriptionMd: '先给你一个可扫读的版本：每个项目先看一句结果，展开再看背景与过程。',
      title: 'Work',
    },
  });

  return (
    <Page
      title={copy?.title || 'Work'}
      description={copy?.pageDescriptionMd || '先给你一个可扫读的版本：每个项目先看一句结果，展开再看背景与过程。'}
    >
      <div className="space-y-4">
        {projects.map((p) => (
          <details
            key={p.id}
            className="group rounded-2xl border border-slate-200 bg-white p-6 md:p-7 open:border-slate-300"
          >
            <summary className="list-none cursor-pointer select-none">
              <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                <div className="min-w-0">
                  <h2 className="text-base md:text-lg font-medium text-slate-900">
                    {p.title}
                  </h2>
                  <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Outcome
                    </p>
                    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                      {toBullets(p.outcome).map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                    {p.period}
                  </span>
                  <span className="text-slate-300 group-open:rotate-90 transition-transform">
                    →
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </summary>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Background
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                    {toBullets(p.background).map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    My role
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                    {toBullets(p.role).map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </details>
        ))}
      </div>
    </Page>
  );
}

