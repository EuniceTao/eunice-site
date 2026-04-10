/**
 * @file MorePage.jsx
 * @description More 聚合页：集中入口到 Notes（Blog）与 Now，避免导航只落到单一内容。
 */
 
import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../design-system';
import { useNotesPosts } from '../blog/useNotesPosts';
import { useNowEntries } from '../now/useNowEntries';
 
function MoreCard({ to, eyebrow, title, meta, preview }) {
  return (
    <Link
      to={to}
      className="group border border-[color:var(--border)] p-8 transition-colors hover:bg-[#FAFAFA]"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] mb-3">
        {eyebrow}
      </p>
      <h2 className="font-body text-[22px] font-normal text-[color:var(--text)]">
        {title}
      </h2>
      {meta ? (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
          {meta}
        </p>
      ) : null}
      <p className="mt-4 text-[14px] leading-[1.8] font-light text-[#666666] line-clamp-2">
        {preview}
      </p>
    </Link>
  );
}
 
export function MorePage() {
  const { posts, loading: notesLoading } = useNotesPosts();
  const { entries, loading: nowLoading } = useNowEntries();

  const latestNote = posts?.[0];
  const latestNoteMeta = latestNote?.date ? `最近：${latestNote.date}` : '';
  const latestNotePreview = latestNote?.summary || '把值得写的写清楚，把值得留的留下来。';

  const latestNow = entries?.[0];
  const latestNowMeta = latestNow?.date ? `最近：${latestNow.date}` : '';
  const latestNowPreview = latestNow?.body?.[0] || '随手记几条：今天在做什么、在想什么。';

  return (
    <Page
      title="More"
      description="Notes 与 Now 的入口都在这里：写下值得留的，也记录当下正在发生的。"
    >
      <div className="mt-9 grid gap-8 md:grid-cols-2 md:gap-12">
        <MoreCard
          to="/blog"
          eyebrow="NOTES"
          title="笔记"
          meta={notesLoading ? '加载中…' : latestNoteMeta}
          preview={
            notesLoading
              ? '正在加载你在 Admin 编辑过的内容…'
              : latestNote?.title
                ? `${latestNote.title}：${latestNotePreview}`
                : latestNotePreview
          }
        />
        <MoreCard
          to="/now"
          eyebrow="NOW"
          title="此刻"
          meta={nowLoading ? '加载中…' : latestNowMeta}
          preview={nowLoading ? '正在加载你在 Admin 编辑过的内容…' : latestNowPreview}
        />
      </div>
    </Page>
  );
}
 
