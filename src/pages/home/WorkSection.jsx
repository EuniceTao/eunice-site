/**
 * @file WorkSection.jsx
 * @description 首页工作经历：白色柔和面板 + 时间轴列表（与全站灰阶协调）。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { workItems } from '../work/workData';

export function WorkSection() {
  return (
    <section className="mt-10 border-t border-[color:var(--border)] pt-10 pb-10 md:mt-14 md:pt-14 md:pb-14">
      <div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
              Experience
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              工作 / Work
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              产品、策略与落地并行：从洞察到上线，把复杂问题拆成可执行的版本。
            </p>
          </div>
          <Link
            to="/work"
            className="shrink-0 text-sm font-medium text-slate-600 underline-offset-4 transition-colors hover:text-slate-900 hover:underline"
          >
            完整时间轴 →
          </Link>
        </div>

        <div className="mt-10 md:mt-12">
          {workItems.map((w, idx) => {
            const isRight = idx % 2 === 0;
            const linkBody = (
              <>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">
                    {w.company}
                  </h3>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs uppercase tracking-widest text-slate-500">
                      {w.time}
                    </span>
                    <span className="text-slate-400 transition-colors group-hover:text-slate-700">
                      →
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.role}</p>
              </>
            );

            return (
              <div
                key={w.id}
                className="grid grid-cols-1 border-b border-slate-200/90 last:border-b-0 md:grid-cols-[1fr_2.75rem_1fr] md:items-stretch"
              >
                <div
                  className={
                    isRight ? 'hidden min-w-0 md:block' : 'min-w-0 py-6 md:pr-4'
                  }
                >
                  {!isRight ? (
                    <Link
                      to={`/work/${w.id}`}
                      className="group relative z-10 block w-full max-w-xl transition-colors hover:text-slate-900"
                    >
                      {linkBody}
                    </Link>
                  ) : null}
                </div>

                <div
                  className="relative hidden h-full md:block pointer-events-none"
                  aria-hidden
                >
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-200/90" />
                  <span className="absolute left-1/2 top-8 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-800" />
                </div>

                <div
                  className={
                    isRight ? 'min-w-0 py-6 md:pl-4' : 'hidden min-w-0 md:block'
                  }
                >
                  {isRight ? (
                    <Link
                      to={`/work/${w.id}`}
                      className="group relative z-10 ml-auto block w-full max-w-xl transition-colors hover:text-slate-900"
                    >
                      {linkBody}
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
