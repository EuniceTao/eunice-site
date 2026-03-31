/**
 * @file NowPage.jsx
 * @description Now 页：此刻我在做什么（温度感的动态页）。
 */

import React from 'react';
import { Page } from '../../design-system';

export function NowPage() {
  const updatedAt = '2026-03-30'; // 最近更新时间

  const sections = [
    { title: '我在做', body: '搭建并迭代我的个人小站：让作品更可讲述，让文字更轻、更好读。' },
    { title: '我在学', body: '写作与信息结构：如何用更少的字，让读者更快理解。' },
    { title: '我在关注', body: '长期主义的增长、克制但有质感的设计、以及真实的用户洞察。' },
    { title: '我在期待', body: '把“想做”变成“做出来”，把“做出来”变成“可持续”。' },
  ];

  return (
    <Page
      title="Now"
      description="这不是动态，也不是简历更新。更像一封写给朋友的小信。"
    >
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="uppercase tracking-widest">Last updated</span>
        <span className="uppercase tracking-widest">{updatedAt}</span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <section
            key={s.title}
            className="rounded-2xl border border-slate-200 bg-white p-7"
          >
            <h2 className="text-sm font-semibold tracking-wide text-slate-900">
              {s.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-7">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">
          写给未来的自己
        </h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-600">
          如果你正在读这页：记得把“重要”放在“紧急”之前。保持克制，保持好奇，
          保持表达。
        </p>
      </section>
    </Page>
  );
}

