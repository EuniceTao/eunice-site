/**
 * @file WorkIndexPage.jsx
 * @description Work 总览：两列（28/72）极简排版，可点击进入详情。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../design-system';
import { workItems } from './workData';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

function WorkRow({ item }) {
  return (
    <Link
      to={`/work/${item.id}`}
      className="group block border-t border-[color:var(--border)] py-12 first:border-t-0"
    >
      <div className="grid gap-6 md:grid-cols-[28%_72%] md:gap-12">
        <div>
          <p className="font-body text-[14px] font-medium text-[color:var(--text)]">
            {item.company}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)]">
            {item.role}
          </p>
          <p className="mt-2 font-mono text-[11px] text-[color:var(--text-light)]">
            {item.time}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-[14px] leading-[1.9] text-[color:var(--text-muted)]">
            {item.summary}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--text)]">
            {item._viewDetailsLabel || '查看详情 →'}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function WorkIndexPage() {
  const { content: copy } = useSiteBlock('copy.work', {
    fallback: {
      pageDescriptionMd: '工作经历时间轴：先扫一眼公司/岗位/时间，点开看具体做成了什么。',
      viewDetailsLabel: '查看详情 →',
      title: 'Work',
    },
  });

  return (
    <Page
      title={copy?.title || 'Work'}
      description={copy?.pageDescriptionMd || '工作经历时间轴：先扫一眼公司/岗位/时间，点开看具体做成了什么。'}
    >
      <div className="mt-12">
        {workItems.map((item) => (
          <WorkRow key={item.id} item={{ ...item, _viewDetailsLabel: copy?.viewDetailsLabel }} />
        ))}
      </div>
    </Page>
  );
}

