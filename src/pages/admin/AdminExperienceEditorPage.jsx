/**
 * @file AdminExperienceEditorPage.jsx
 * @description Experience 编辑：学习/工作/项目（草稿/发布，先用 JSON 表单跑通）。
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Page, Textarea } from '../../design-system';
import { AdminShell } from './AdminShell';
import { useAdminSession } from './useAdminSession';
import { getSiteBlockRow, publishSiteBlock, saveSiteBlockDraft } from '../site-blocks/siteBlocksApi';
import { educationEntries } from '../home/educationData';
import { workItems } from '../work/workData';
import { projects } from '../projects/projectsData';

function pretty(value) {
  return JSON.stringify(value, null, 2);
}

function safeParseJson(text) {
  const s = String(text || '').trim();
  if (!s) return { ok: true, value: {} };
  try {
    return { ok: true, value: JSON.parse(s) };
  } catch (e) {
    return { ok: false, error: e?.message || 'JSON 解析失败' };
  }
}

const DEFAULT_EDUCATION = { entries: educationEntries };
const DEFAULT_WORK = { items: workItems };
const DEFAULT_PROJECTS = { items: projects };

export function AdminExperienceEditorPage() {
  const navigate = useNavigate();
  const { session, loading } = useAdminSession();

  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const [educationText, setEducationText] = useState(pretty(DEFAULT_EDUCATION));
  const [workText, setWorkText] = useState(pretty(DEFAULT_WORK));
  const [projectsText, setProjectsText] = useState(pretty(DEFAULT_PROJECTS));

  const [publishedPreview, setPublishedPreview] = useState({
    education: pretty(DEFAULT_EDUCATION),
    work: pretty(DEFAULT_WORK),
    projects: pretty(DEFAULT_PROJECTS),
  });

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
        if (a?.draft && Object.keys(a.draft).length) setEducationText(pretty(a.draft));
        if (b?.draft && Object.keys(b.draft).length) setWorkText(pretty(b.draft));
        if (c?.draft && Object.keys(c.draft).length) setProjectsText(pretty(c.draft));
        setPublishedPreview({
          education: pretty(a?.published && Object.keys(a.published).length ? a.published : DEFAULT_EDUCATION),
          work: pretty(b?.published && Object.keys(b.published).length ? b.published : DEFAULT_WORK),
          projects: pretty(c?.published && Object.keys(c.published).length ? c.published : DEFAULT_PROJECTS),
        });
      } catch {
        // defaults already set
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const parsed = useMemo(() => {
    return {
      education: safeParseJson(educationText),
      work: safeParseJson(workText),
      projects: safeParseJson(projectsText),
    };
  }, [educationText, workText, projectsText]);

  const canSave = parsed.education.ok && parsed.work.ok && parsed.projects.ok;

  async function saveDraft({ throwOnError = false } = {}) {
    setStatus(null);
    if (!canSave) {
      setStatus({ type: 'error', message: '请先修正 JSON 格式错误，再保存。' });
      if (throwOnError) throw new Error('JSON 格式错误');
      return false;
    }
    setSaving(true);
    try {
      await Promise.all([
        saveSiteBlockDraft('experience.education', parsed.education.value),
        saveSiteBlockDraft('experience.work', parsed.work.value),
        saveSiteBlockDraft('experience.projects', parsed.projects.value),
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
      // 发布后刷新一次 published 预览，避免“以为发布了但其实没更新”的错觉
      const [a, b, c] = await Promise.all([
        getSiteBlockRow('experience.education'),
        getSiteBlockRow('experience.work'),
        getSiteBlockRow('experience.projects'),
      ]);
      setPublishedPreview({
        education: pretty(a?.published && Object.keys(a.published).length ? a.published : DEFAULT_EDUCATION),
        work: pretty(b?.published && Object.keys(b.published).length ? b.published : DEFAULT_WORK),
        projects: pretty(c?.published && Object.keys(c.published).length ? c.published : DEFAULT_PROJECTS),
      });
      setStatus({ type: 'success', message: '已发布。' });
    } catch (err) {
      setStatus({ type: 'error', message: `发布失败：${err?.message ?? '未知错误'}` });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Page title="Admin · Experience" description="学习/工作/项目（草稿/发布）。先用 JSON 表单跑通，下一步做成更友好的字段化编辑。">
      <AdminShell>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={saveDraft} disabled={!canSave || saving}>
            保存草稿
          </Button>
          <Button variant="outline" onClick={publish} disabled={!canSave || saving}>
            发布
          </Button>
        </div>

        {status?.message ? (
          <p className={status.type === 'success' ? 'mt-6 text-sm text-slate-600' : 'mt-6 text-sm text-red-600'}>
            {status.message}
          </p>
        ) : null}

        {!parsed.education.ok ? <p className="mt-6 text-sm text-red-600">Education JSON 错误：{parsed.education.error}</p> : null}
        {!parsed.work.ok ? <p className="mt-2 text-sm text-red-600">Work JSON 错误：{parsed.work.error}</p> : null}
        {!parsed.projects.ok ? <p className="mt-2 text-sm text-red-600">Projects JSON 错误：{parsed.projects.error}</p> : null}

        <div className="mt-10 grid gap-10">
          <section className="border border-[color:var(--border)] bg-white p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">EDUCATION</p>
            <Textarea rows={14} value={educationText} onChange={(e) => setEducationText(e.target.value)} />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#BBBBBB]">PUBLISHED PREVIEW</p>
            <Textarea rows={8} value={publishedPreview.education} readOnly />
          </section>

          <section className="border border-[color:var(--border)] bg-white p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">WORK</p>
            <Textarea rows={14} value={workText} onChange={(e) => setWorkText(e.target.value)} />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#BBBBBB]">PUBLISHED PREVIEW</p>
            <Textarea rows={8} value={publishedPreview.work} readOnly />
          </section>

          <section className="border border-[color:var(--border)] bg-white p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">PROJECTS</p>
            <Textarea rows={14} value={projectsText} onChange={(e) => setProjectsText(e.target.value)} />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#BBBBBB]">PUBLISHED PREVIEW</p>
            <Textarea rows={8} value={publishedPreview.projects} readOnly />
          </section>
        </div>
      </AdminShell>
    </Page>
  );
}

