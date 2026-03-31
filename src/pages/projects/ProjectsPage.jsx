/**
 * @file ProjectsPage.jsx
 * @description 作品集：可扫读列表（展开查看背景与角色）。
 */

import React from 'react';
import { Page } from '../../design-system';
import { projects } from './projectsData';

function Tag({ children }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
      {children}
    </span>
  );
}

export function ProjectsPage() {
  return (
    <Page
      title="Work"
      description="先给你一个可扫读的版本：每个项目先看一句结果，展开再看背景与过程。"
    >
      <div className="space-y-3">
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
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Outcome
                    </span>
                    <span className="ml-2">{p.outcome}</span>
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-slate-400">
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

            <div className="mt-6 border-t border-slate-100 pt-6 space-y-5">
              <section>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Background
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.background}
                </p>
              </section>

              <section>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  My role
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.role}
                </p>
              </section>
            </div>
          </details>
        ))}
      </div>
    </Page>
  );
}

