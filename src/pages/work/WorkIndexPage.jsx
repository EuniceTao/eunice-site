/**
 * @file WorkIndexPage.jsx
 * @description Work 总览：左右交错时间轴，可点击进入详情。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../design-system';
import { workItems } from './workData';

function WorkTimelineItem({ item, side }) {
  const alignClassName = side === 'left' ? 'md:pr-10' : 'md:pl-10'; // 对齐
  const justifyClassName = side === 'left' ? 'md:justify-end' : 'md:justify-start'; // 排布

  return (
    <div className="relative grid md:grid-cols-2">
      <div className={`hidden md:block ${side === 'left' ? '' : 'order-2'}`} />

      <div className={`flex ${justifyClassName}`}>
        <Link
          to={`/work/${item.id}`}
          className={`group w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors ${alignClassName}`}
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-base font-medium text-slate-900">
              {item.company}
            </h3>
            <span className="text-xs uppercase tracking-widest text-slate-400">
              {item.time}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {item.role}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {item.summary}
          </p>
          <div className="mt-4 text-sm text-slate-400 group-hover:text-slate-500 transition-colors">
            查看详情 →
          </div>
        </Link>
      </div>

      <span className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-200" />
      <span className="hidden md:block absolute left-1/2 top-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-slate-900" />
    </div>
  );
}

export function WorkIndexPage() {
  return (
    <Page
      title="Work"
      description="工作经历时间轴：先扫一眼公司/岗位/时间，点开看具体做成了什么。"
    >
      <div className="space-y-6 md:space-y-8">
        {workItems.map((item, idx) => (
          <WorkTimelineItem
            key={item.id}
            item={item}
            side={idx % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </Page>
  );
}

