/**
 * @file ProjectPreviewCard.jsx
 * @description 首页项目预览卡片：扁平线框分区（无阴影凸起），顶栏、正文、元数据行与底栏。
 */

import React from 'react';
import { Link } from 'react-router-dom';

function initialsFromId(id) {
  const head = id.split('-')[0] || id;
  return head.slice(0, 2).toUpperCase();
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
  const primaryTag = project.tags[0] ?? 'Project';
  const secondaryTag = project.tags[1] ?? project.period;

  return (
    <Link to="/projects" className="group block h-full">
      <div
        className={[
          'h-full px-5 py-7 md:px-6',
          index > 0 ? 'border-t border-slate-300/50 md:border-t-0' : '',
        ].join(' ')}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-[11px] font-semibold tracking-tight text-slate-500">
                {initialsFromId(project.id)}
              </span>
              <span className="truncate text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors group-hover:decoration-slate-500">
                {primaryTag}
              </span>
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            {secondaryTag}
          </span>
        </div>

        <div className="mt-4 border-t border-slate-200/70 pt-4">
          <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-900 md:text-xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-[1.65] text-slate-600 line-clamp-5">
            {project.outcome}
          </p>
        </div>

        <div className="mt-4 grid gap-3 border-t border-slate-200/70 pt-4 md:grid-cols-2 md:gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-800">周期</p>
            <p className="mt-1 text-xs text-slate-500 tabular-nums">{project.period}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">角色</p>
            <p className="mt-1 text-xs text-slate-500 line-clamp-2">{project.role}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <ClockIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            {project.period}
          </span>
          <span className="text-slate-400 transition-colors group-hover:text-slate-700">→</span>
        </div>
      </div>
    </Link>
  );
}
