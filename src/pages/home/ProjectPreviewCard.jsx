/**
 * @file ProjectPreviewCard.jsx
 * @description 首页项目预览卡片：细边框与对比细节（不加装饰），hover 时边框变黑并加轻阴影。
 */

import React from 'react';
import { Link } from 'react-router-dom';

function initialsFromId(id) {
  const head = id.split('-')[0] || id;
  return head.slice(0, 2).toUpperCase();
}

function companyFromId(id) {
  if (id.startsWith('bk-')) return 'BEIKE';
  if (id.startsWith('bytedance-')) return 'BYTEDANCE';
  return initialsFromId(id);
}

function ClockIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function ProjectPreviewCard({ project, index = 0 }) {
  const companyLabel = companyFromId(project.id);
  const typeLabel = project.tags[0] ?? '';

  const bottomHighlight =
    project.id === 'bk-multistack'
      ? '达成率 143%'
      : project.id === 'bytedance-feedback-ops'
        ? '覆盖 7 个中台产品'
        : '中台事务线全覆盖';

  return (
    <Link to="/projects" className="group block h-full">
      <div className="flex h-full flex-col border border-[#E8E8E8] bg-white px-8 pb-7 pt-8 transition-[border-color,box-shadow] duration-300 ease-out group-hover:border-[#111111] group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-4">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-[#BBBBBB]">
            {companyLabel}
          </span>
          <span className="h-px flex-1 bg-[#E8E8E8]" aria-hidden />
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-[#BBBBBB]">
            {typeLabel}
          </span>
        </div>

        <h3 className="mt-6 text-[17px] font-medium leading-[1.5] text-[color:var(--text)]">
          {project.title}
        </h3>

        <p className="mt-4 text-[13px] font-light leading-[1.7] text-[#666666] line-clamp-2">
          {project.outcome}
        </p>

        <div className="my-5 h-px w-full bg-[#EEEEEE]" aria-hidden />

        <div className="mt-auto flex items-center justify-between gap-6">
          <p className="text-[15px] font-medium text-[#111111]">
            {bottomHighlight}
          </p>
          <span className="text-[#BBBBBB] transition-colors group-hover:text-[#111111]">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
