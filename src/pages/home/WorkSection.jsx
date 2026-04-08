/**
 * @file WorkSection.jsx
 * @description 首页工作经历：纵向列表（无时间轴线/圆点/箭头），两条信息结构清晰。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { workItems } from '../work/workData';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

function tagsForWorkId(id) {
  if (id === 'beike') return ['产品设计', '运营落地'];
  if (id === 'bytedance') return ['用户体验', 'B端运营'];
  return [];
}

export function WorkSection({ showAllLink = true } = {}) {
  const { content } = useSiteBlock('experience.work', {
    fallback: { items: workItems },
  });
  const items = Array.isArray(content?.items) ? content.items : workItems;

  return (
    <div>
      {items.map((w, idx) => (
        <Link
          key={w.id}
          to={`/work/${w.id}`}
          className={[
            'group block transition-all duration-200 ease-out hover:bg-[#FAFAFA]',
            idx === 0 ? '' : 'border-t border-[color:var(--border)]',
            'py-9 px-4 -mx-4',
          ].join(' ')}
        >
          <div className="border-l-2 border-transparent pl-0 transition-all duration-200 ease-out group-hover:border-[color:var(--text)] group-hover:pl-4">
            <div className="flex items-baseline justify-between gap-6">
              <p className="text-[18px] font-medium text-[color:var(--text)]">
                {w.company}
              </p>
              <p className="font-mono text-[12px] text-[#BBBBBB] tabular-nums">
                {w.time}
              </p>
            </div>
            <p className="mt-1.5 text-[14px] font-light text-[#666666]">
              {w.role}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {tagsForWorkId(w.id).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-[2px] border border-[#DDDDDD] px-2.5 py-[2px] font-mono text-[11px] text-[#888888]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}

      {showAllLink && (
        <div className="pt-6">
          <Link
            to="/experience"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] transition-colors hover:text-[color:var(--text)]"
          >
            全部经历 →
          </Link>
        </div>
      )}
    </div>
  );
}
