/**
 * @file WorkDetailPage.jsx
 * @description Work 详情页：单条经历的细节与要点。
 */

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Page } from '../../design-system';
import { getWorkItem } from './workData';

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

  return (
    <Page title={`${item.company}`} description={`${item.role} · ${item.time}`}>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <Link to="/work" className="hover:text-slate-600 transition-colors">
          ← Work 时间轴
        </Link>
        <span className="uppercase tracking-widest">{item.time}</span>
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">
          一句话
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {item.summary}
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-7">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">
          关键工作
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
          {item.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}

