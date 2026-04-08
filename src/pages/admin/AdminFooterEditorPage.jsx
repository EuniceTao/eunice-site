/**
 * @file AdminFooterEditorPage.jsx
 * @description 站点页脚（脚注）编辑：文字 + 版权名 + 链接（草稿/发布）。
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Page, Textarea } from '../../design-system';
import { AdminShell } from './AdminShell';
import { useAdminSession } from './useAdminSession';
import { getSiteBlockRow, publishSiteBlock, saveSiteBlockDraft } from '../site-blocks/siteBlocksApi';

function parseLinks(text) {
  // 支持两种行格式：
  // 1) label | /path
  // 2) label | https://...
  const lines = String(text || '')
    .split(/\r?\n/g)
    .map((s) => s.trim())
    .filter(Boolean);

  return lines
    .map((line) => {
      const [labelRaw, targetRaw] = line.split('|').map((s) => (s || '').trim());
      const label = labelRaw || '';
      const target = targetRaw || '';
      if (!target) return null;
      if (target.startsWith('http://') || target.startsWith('https://')) return { label: label || target, href: target };
      return { label: label || target, to: target };
    })
    .filter(Boolean);
}

function linksToText(links) {
  if (!Array.isArray(links) || links.length === 0) return '';
  return links
    .map((l) => {
      const label = l?.label || '';
      const target = l?.to || l?.href || '';
      if (!target) return '';
      return `${label} | ${target}`.trim();
    })
    .filter(Boolean)
    .join('\n');
}

export function AdminFooterEditorPage() {
  const navigate = useNavigate();
  const { session, loading } = useAdminSession();

  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const [draft, setDraft] = useState({
    copyrightName: 'Eunice',
    note: '少即是多。留白、字体与克制的动效，是我喜欢的表达方式。',
    linksText: 'Design System | /design-system',
  });

  useEffect(() => {
    if (!loading && !session) navigate('/admin', { replace: true });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    async function run() {
      try {
        const row = await getSiteBlockRow('site.footer');
        if (cancelled) return;
        if (row?.draft && Object.keys(row.draft).length > 0) {
          setDraft((p) => ({
            ...p,
            ...row.draft,
            linksText: linksToText(row.draft.links),
          }));
        }
      } catch {
        // defaults
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const payload = useMemo(() => {
    return {
      copyrightName: String(draft?.copyrightName || '').trim(),
      note: String(draft?.note || '').trim(),
      links: parseLinks(draft?.linksText),
    };
  }, [draft]);

  const canSave = payload.copyrightName.length > 0;

  async function saveDraft() {
    setStatus(null);
    setSaving(true);
    try {
      await saveSiteBlockDraft('site.footer', payload);
      setStatus({ type: 'success', message: '草稿已保存。' });
    } catch (err) {
      setStatus({ type: 'error', message: `保存失败：${err?.message ?? '未知错误'}` });
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    setStatus(null);
    setSaving(true);
    try {
      await saveDraft();
      await publishSiteBlock('site.footer');
      setStatus({ type: 'success', message: '已发布。' });
    } catch (err) {
      setStatus({ type: 'error', message: `发布失败：${err?.message ?? '未知错误'}` });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Page title="Admin · Footer" description="编辑站点页脚（脚注）：版权名、说明文字与链接（草稿/发布）。">
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

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <section className="border border-[color:var(--border)] bg-white p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">FOOTER</p>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">版权署名</span>
                <Input
                  value={draft.copyrightName}
                  onChange={(e) => setDraft((p) => ({ ...p, copyrightName: e.target.value }))}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-600">脚注文案</span>
                <Textarea rows={4} value={draft.note} onChange={(e) => setDraft((p) => ({ ...p, note: e.target.value }))} />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-600">链接（每行一个：Label | /path 或 Label | https://...）</span>
                <Textarea
                  rows={4}
                  value={draft.linksText}
                  onChange={(e) => setDraft((p) => ({ ...p, linksText: e.target.value }))}
                  placeholder={'Design System | /design-system\n小红书 | https://...'}
                />
              </label>
            </div>
          </section>
        </div>
      </AdminShell>
    </Page>
  );
}

