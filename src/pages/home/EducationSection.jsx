/**
 * @file EducationSection.jsx
 * @description 首页学习经历：两列信息（中间竖线分隔），时间左对齐置于学校名下方；悬停/聚焦展开课程。
 */

import React from 'react';
import { educationEntries } from './educationData';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

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
  const { content } = useSiteBlock('experience.education', {
    fallback: { entries: educationEntries },
  });
  const entries = Array.isArray(content?.entries) ? content.entries : educationEntries;

  return (
    <div className="grid divide-y divide-[color:var(--border)] md:grid-cols-2 md:divide-y-0">
      {entries.map((e, idx) => (
        <article
          key={e.id}
          tabIndex={0}
          className={[
            'group py-8 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text)] focus-visible:ring-offset-2',
            idx === 1 ? 'md:border-l md:border-[color:var(--border)] md:pl-12' : 'md:pr-12',
          ].join(' ')}
        >
          <h3 className="text-[18px] font-medium text-[color:var(--text)]">
            {e.school}
            {e.schoolNote ? (
              <span
                className="font-mono text-[11px] text-[#999999] ml-2 align-top"
              >
                {e.schoolNote.includes('40') ? 'QS #40' : e.schoolNote}
              </span>
            ) : null}
          </h3>
          <p className="mt-2 font-mono text-[12px] text-[#BBBBBB] tabular-nums">
            {e.time}
          </p>

          <div className="mt-4 text-[14px] leading-[1.8] font-light text-[#555555]">
            <p>{e.program}</p>
          </div>

          <div className="mt-5 border-t border-[color:var(--border)] pt-5">
            <div className="hidden overflow-hidden md:block max-h-0 opacity-0 transition-[max-height,opacity] duration-300 ease-out group-hover:max-h-[28rem] group-hover:opacity-100 group-focus-within:max-h-[28rem] group-focus-within:opacity-100">
              <DetailBlock courses={e.courses} honors={e.honors} />
            </div>

            <details className="md:hidden">
              <summary className="cursor-pointer select-none font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
                课程
              </summary>
              <div className="mt-4">
                <DetailBlock courses={e.courses} honors={e.honors} />
              </div>
            </details>
          </div>
        </article>
      ))}
    </div>
  );
}
