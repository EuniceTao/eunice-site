/**
 * @file AdminExperienceEditorPage.jsx
 * @description Experience 编辑：学习/工作/项目（字段化表单 + 草稿/发布）。
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Page } from '../../design-system';
import { AdminShell } from './AdminShell';
import { useAdminSession } from './useAdminSession';
import { getSiteBlockRow, publishSiteBlock, saveSiteBlockDraft } from '../site-blocks/siteBlocksApi';
import { AdminExperienceEducationPanel } from './experience/AdminExperienceEducationPanel';
import { AdminExperienceWorkPanel } from './experience/AdminExperienceWorkPanel';
import { AdminExperienceProjectsPanel } from './experience/AdminExperienceProjectsPanel';
import {
  DEFAULT_EDUCATION,
  DEFAULT_PROJECTS,
  DEFAULT_WORK,
  normalizeEducation,
  normalizeProjects,
  normalizeWork,
} from './experience/experienceNormalize';

export function AdminExperienceEditorPage() {
  const navigate = useNavigate();
  const { session, loading } = useAdminSession();

  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const [education, setEducation] = useState(() => normalizeEducation(DEFAULT_EDUCATION));
  const [work, setWork] = useState(() => normalizeWork(DEFAULT_WORK));
  const [projectsState, setProjectsState] = useState(() => normalizeProjects(DEFAULT_PROJECTS));

  useEffect(() => {
    if (!loading && !session) navigate('/admin', { replace: true });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    async function run() {
      try {
        const [a, b, c] = await Promise.all([
          getSiteBlockRow('experience.education'),
          getSiteBlockRow('experience.work'),
          getSiteBlockRow('experience.projects'),
        ]);
        if (cancelled) return;
        setEducation(normalizeEducation(a?.draft && Object.keys(a.draft).length ? a.draft : null));
        setWork(normalizeWork(b?.draft && Object.keys(b.draft).length ? b.draft : null));
        setProjectsState(normalizeProjects(c?.draft && Object.keys(c.draft).length ? c.draft : null));
      } catch {
        // 保持默认
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [session]);

  async function saveDraft({ throwOnError = false } = {}) {
    setStatus(null);
    setSaving(true);
    try {
      await Promise.all([
        saveSiteBlockDraft('experience.education', education),
        saveSiteBlockDraft('experience.work', work),
        saveSiteBlockDraft('experience.projects', projectsState),
      ]);
      setStatus({ type: 'success', message: '草稿已保存。' });
      return true;
    } catch (err) {
      setStatus({ type: 'error', message: `保存失败：${err?.message ?? '未知错误'}` });
      if (throwOnError) throw err;
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    setStatus(null);
    setSaving(true);
    try {
      await saveDraft({ throwOnError: true });
      await Promise.all([
        publishSiteBlock('experience.education'),
        publishSiteBlock('experience.work'),
        publishSiteBlock('experience.projects'),
      ]);
      setStatus({ type: 'success', message: '已发布。线上 Experience / 首页项目区会读取已发布内容。' });
    } catch (err) {
      setStatus({ type: 'error', message: `发布失败：${err?.message ?? '未知错误'}` });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Page
      title="Admin · Experience"
      description="用表单编辑学习 / 工作 / 项目。列表类字段用「每行一条」，也支持行首 - 的列表写法。保存草稿后点发布才会上站。"
    >
      <AdminShell>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => saveDraft()} disabled={saving}>
            保存草稿
          </Button>
          <Button variant="outline" onClick={publish} disabled={saving}>
            发布
          </Button>
        </div>

        {status?.message ? (
          <p className={status.type === 'success' ? 'mt-6 text-sm text-slate-600' : 'mt-6 text-sm text-red-600'}>
            {status.message}
          </p>
        ) : null}

        <div className="mt-10 grid gap-10">
          <AdminExperienceEducationPanel value={education} onChange={setEducation} />
          <AdminExperienceWorkPanel value={work} onChange={setWork} />
          <AdminExperienceProjectsPanel value={projectsState} onChange={setProjectsState} />
        </div>
      </AdminShell>
    </Page>
  );
}
