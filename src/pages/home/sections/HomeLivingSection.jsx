/**
 * @file HomeLivingSection.jsx
 * @description 首页近期动态：把 Now 与 Notes 提升到履历之前。
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function SignalLink({ to, label, title, meta, body, tone = 'light' }) {
  const isDark = tone === 'dark';
  return (
    <Link
      to={to}
      className={`group flex min-h-[300px] flex-col justify-between border p-7 transition-colors md:p-9 ${
        isDark
          ? 'border-[#111111] bg-[#111111] text-white hover:bg-[#292725]'
          : 'border-[color:var(--border)] bg-[#eee8dd] text-[#171512] hover:bg-[#e5dccd]'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-5">
          <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${isDark ? 'text-white/45' : 'text-black/45'}`}>
            {label}
          </p>
          <p className={`font-mono text-[9px] uppercase tracking-[0.15em] ${isDark ? 'text-white/35' : 'text-black/35'}`}>
            {meta}
          </p>
        </div>
        <h3 className="mt-10 max-w-[15ch] font-display text-[38px] font-light leading-[0.98] md:text-[48px]">
          {title}
        </h3>
        <p className={`mt-6 max-w-lg text-[14px] font-light leading-[1.75] ${isDark ? 'text-white/55' : 'text-black/55'}`}>
          {body}
        </p>
      </div>
      <span className="mt-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
        继续阅读
        <ArrowRight size={17} strokeWidth={1.5} className="transition-transform group-hover:translate-x-2" />
      </span>
    </Link>
  );
}

export function HomeLivingSection({ latestNow, latestNote, loading }) {
  const nowBody = Array.isArray(latestNow?.body) ? latestNow.body.find(Boolean) : '';
  return (
    <section id="content" className="py-20 md:py-28">
      <div className="mb-10 grid gap-5 md:grid-cols-[1fr_1.3fr] md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">RECENT SIGNALS</p>
          <h2 className="mt-3 font-display text-[46px] font-light leading-[0.95] md:text-[64px]">最近的生命信号</h2>
        </div>
        <p className="max-w-xl text-[14px] font-light leading-[1.8] text-[#666666] md:justify-self-end">
          履历说明我曾经做过什么；这些仍在变化的片段，更接近现在的我。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <SignalLink
          to="/now"
          label="NOW / 此刻"
          title={loading ? '正在连接此刻…' : latestNow?.title || '最近在发生什么'}
          meta={latestNow?.date || 'ONGOING'}
          body={nowBody || '记录工作之外的天气、身体、关系，以及那些还没有变成结论的想法。'}
          tone="dark"
        />
        <SignalLink
          to="/blog"
          label="NOTES / 笔记"
          title={loading ? '正在翻开笔记…' : latestNote?.title || '最近写下的东西'}
          meta={latestNote?.date || 'ARCHIVE'}
          body={latestNote?.summary || '把值得写的写清楚，把值得留的留下来。'}
        />
      </div>
    </section>
  );
}
