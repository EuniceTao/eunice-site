/**
 * @file EducationSection.jsx
 * @description 首页学习经历：全宽区域 + 线条分隔（去除“卡片感”）；悬停/聚焦展开主修课程。
 */

import React from 'react';
import { BleedBand } from '../../design-system';
import { educationEntries } from './educationData';

function DetailBlock({ courses, honors }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-600">
      <p>
        <span className="font-medium text-slate-800">主修课程：</span>
        {courses.join('，')}
      </p>
      {honors.length > 0 ? (
        <p>
          <span className="font-medium text-slate-800">所获荣誉：</span>
          {honors.join('，')}
        </p>
      ) : null}
    </div>
  );
}

export function EducationSection() {
  return (
    <BleedBand
      as="section"
      className="mt-12 bg-slate-200/55 py-10 md:mt-14 md:py-16"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
        Education
      </p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
        学习 / Education
      </h2>

      <div className="mt-8">
        <div className="grid divide-y divide-slate-300/35 md:grid-cols-2 md:divide-x md:divide-y-0">
          {educationEntries.map((e) => (
            <article
              key={e.id}
              tabIndex={0}
              className="group p-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200/55 md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="min-w-0 flex-1 text-lg font-semibold leading-tight tracking-tight text-slate-900 md:text-xl">
                  {e.school}
                </h3>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                    期间
                  </p>
                  <p className="mt-1 text-sm font-medium tabular-nums text-slate-800">{e.time}</p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-300/35 pt-4">
                <p className="min-w-0 flex-1 text-sm leading-snug text-slate-700">{e.program}</p>
                <p className="shrink-0 max-w-[42%] text-right text-xs leading-snug text-slate-600">
                  {e.schoolNote ||
                    (e.honors.length > 0 ? `${e.honors.length} 项荣誉` : '')}
                </p>
              </div>

              <div className="hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:block max-h-0 opacity-0 group-hover:max-h-[28rem] group-hover:opacity-100 group-focus-within:max-h-[28rem] group-focus-within:opacity-100">
                <div className="mt-4 border-t border-slate-300/35 pt-4">
                  <DetailBlock courses={e.courses} honors={e.honors} />
                </div>
              </div>

              <details className="mt-4 border-t border-slate-300/35 pt-4 md:hidden">
                <summary className="cursor-pointer select-none text-xs font-medium text-slate-600">
                  主修课程{e.honors.length > 0 ? '与荣誉' : ''}
                </summary>
                <div className="mt-3">
                  <DetailBlock courses={e.courses} honors={e.honors} />
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </BleedBand>
  );
}
