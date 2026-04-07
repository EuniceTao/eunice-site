/**
 * @file MoreAboutMeSection.jsx
 * @description 首页 More About Me：合并 Notes 与 Now 的展示入口。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useNowEntries } from '../now/useNowEntries';

export function MoreAboutMeSection() {
  const { entries } = useNowEntries();
  const latestNow = entries?.[0];
  const latestNowMeta = latestNow?.date ? `最近：${latestNow.date}` : '';
  const latestNowPreview = latestNow?.body?.[0] || '随手记几条：今天在做什么、在想什么。';

  return (
    <div className="mt-9 grid gap-8 md:grid-cols-2 md:gap-12">
      <Link
        to="/blog"
        className="group border border-[color:var(--border)] p-8 transition-colors hover:bg-[#FAFAFA]"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] mb-3">
          NOTES
        </p>
        <h2 className="font-body text-[22px] font-normal text-[color:var(--text)]">
          笔记
        </h2>
        <p className="mt-4 text-[14px] leading-[1.8] font-light text-[#666666]">
          产品思考、行业观察，也记录折腾与生活。
        </p>
      </Link>

      <Link
        to="/now"
        className="group border border-[color:var(--border)] p-8 transition-colors hover:bg-[#FAFAFA]"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] mb-3">
          NOW
        </p>
        <h2 className="font-body text-[22px] font-normal text-[color:var(--text)]">
          此刻
        </h2>
        {latestNowMeta ? (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
            {latestNowMeta}
          </p>
        ) : null}
        <p className="mt-4 text-[14px] leading-[1.8] font-light text-[#666666] line-clamp-2">
          {latestNowPreview}
        </p>
      </Link>
    </div>
  );
}

