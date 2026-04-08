/**
 * @file AdminDashboardPage.jsx
 * @description Admin Dashboard：快速入口与发布提示。
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../design-system';
import { AdminShell } from './AdminShell';
import { useAdminSession } from './useAdminSession';

function EntryCard({ title, desc, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left group border border-[color:var(--border)] bg-white p-7 transition-colors hover:bg-[#FAFAFA]"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
        ADMIN
      </p>
      <h2 className="mt-3 text-[18px] font-medium text-[color:var(--text)]">{title}</h2>
      <p className="mt-3 text-[14px] leading-[1.8] font-light text-[#666666]">{desc}</p>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)] transition-colors group-hover:text-[color:var(--text)]">
        打开 →
      </p>
    </button>
  );
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { session, loading } = useAdminSession();

  useEffect(() => {
    if (!loading && !session) navigate('/admin', { replace: true });
  }, [loading, session, navigate]);

  return (
    <Page title="Admin" description="在这里编辑站点内容：先保存草稿，确认后再发布。">
      <AdminShell>
        <div className="grid gap-8 md:grid-cols-2">
          <EntryCard
            title="Home"
            desc="编辑 Hero（照片/文字）与引用文案。"
            onClick={() => navigate('/admin/home')}
          />
          <EntryCard
            title="Experience"
            desc="编辑学习/工作/项目等经验内容。"
            onClick={() => navigate('/admin/experience')}
          />
          <EntryCard
            title="Notes"
            desc="编辑笔记（Markdown），发布后前台 /blog 自动更新。"
            onClick={() => navigate('/admin/notes')}
          />
          <EntryCard
            title="Now"
            desc="编辑此刻（日记/备忘录），发布后首页与 /now 自动更新。"
            onClick={() => navigate('/admin/now')}
          />
          <EntryCard
            title="Blocks"
            desc="通用编辑器：编辑任意内容块 key（草稿/发布），用于补齐所有可运营内容。"
            onClick={() => navigate('/admin/blocks')}
          />
        </div>
      </AdminShell>
    </Page>
  );
}

