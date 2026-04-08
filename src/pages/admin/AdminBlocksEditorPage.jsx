/**
 * @file AdminBlocksEditorPage.jsx
 * @description 通用内容块编辑器：可编辑任意 site_blocks key（草稿/发布），用于“所有内容都能在 Admin 管”。
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Page, Textarea } from '../../design-system';
import { AdminShell } from './AdminShell';
import { useAdminSession } from './useAdminSession';
import { getSiteBlockRow, publishSiteBlock, saveSiteBlockDraft } from '../site-blocks/siteBlocksApi';

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

const PRESET_KEYS = [
  'home.hero',
  'home.quote',
  'copy.home',
  'copy.about',
  'copy.experience',
  'copy.projects',
  'copy.work',
  'copy.workDetail',
  'copy.contact',
  'copy.now',
  'copy.blog',
  'copy.blogPost',
  'copy.misc',
  'experience.education',
  'experience.work',
  'experience.projects',
  'site.footer',
];

export function AdminBlocksEditorPage() {
  const navigate = useNavigate();
  const { session, loading } = useAdminSession();

  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const [keyInput, setKeyInput] = useState('site.footer');
  const [draftText, setDraftText] = useState(pretty({}));
  const [publishedText, setPublishedText] = useState(pretty({}));

  useEffect(() => {
    if (!loading && !session) navigate('/admin', { replace: true });
  }, [loading, session, navigate]);

  async function loadKey(k) {
    if (!k) return;
    setStatus(null);
    setBusy(true);
    try {
      const row = await getSiteBlockRow(k);
      setDraftText(pretty(row?.draft ?? {}));
      setPublishedText(pretty(row?.published ?? {}));
      setStatus({ type: 'success', message: `已加载：${k}` });
    } catch (err) {
      setDraftText(pretty({}));
      setPublishedText(pretty({}));
      setStatus({ type: 'error', message: `加载失败：${err?.message ?? '未知错误'}` });
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!session) return;
    loadKey(keyInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.access_token]);

  const parsed = useMemo(() => safeParseJson(draftText), [draftText]);

  async function saveDraft() {
    setStatus(null);
    if (!parsed.ok) {
      setStatus({ type: 'error', message: `JSON 格式错误：${parsed.error}` });
      return;
    }
    const k = String(keyInput || '').trim();
    if (!k) {
      setStatus({ type: 'error', message: '请先填写 key' });
      return;
    }

    setBusy(true);
    try {
      await saveSiteBlockDraft(k, parsed.value);
      const row = await getSiteBlockRow(k);
      setDraftText(pretty(row?.draft ?? {}));
      setPublishedText(pretty(row?.published ?? {}));
      setStatus({ type: 'success', message: '草稿已保存。' });
    } catch (err) {
      setStatus({ type: 'error', message: `保存失败：${err?.message ?? '未知错误'}` });
    } finally {
      setBusy(false);
    }
  }

  async function publish() {
    setStatus(null);
    if (!parsed.ok) {
      setStatus({ type: 'error', message: `JSON 格式错误：${parsed.error}` });
      return;
    }
    const k = String(keyInput || '').trim();
    if (!k) {
      setStatus({ type: 'error', message: '请先填写 key' });
      return;
    }

    setBusy(true);
    try {
      await saveSiteBlockDraft(k, parsed.value);
      await publishSiteBlock(k);
      const row = await getSiteBlockRow(k);
      setDraftText(pretty(row?.draft ?? {}));
      setPublishedText(pretty(row?.published ?? {}));
      setStatus({ type: 'success', message: '已发布。' });
    } catch (err) {
      setStatus({ type: 'error', message: `发布失败：${err?.message ?? '未知错误'}` });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page title="Admin · Blocks" description="通用内容块编辑：支持任意 key（草稿/发布）。用于补齐所有可运营内容。">
      <AdminShell>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => loadKey(keyInput)} disabled={busy}>
            {busy ? '加载中…' : '加载'}
          </Button>
          <Button onClick={saveDraft} disabled={busy || !parsed.ok}>
            保存草稿
          </Button>
          <Button variant="outline" onClick={publish} disabled={busy || !parsed.ok}>
            发布
          </Button>
        </div>

        {status?.message ? (
          <p className={status.type === 'success' ? 'mt-6 text-sm text-slate-600' : 'mt-6 text-sm text-red-600'}>
            {status.message}
          </p>
        ) : null}

        {!parsed.ok ? <p className="mt-6 text-sm text-red-600">Draft JSON 错误：{parsed.error}</p> : null}

        <div className="mt-10 grid gap-10 md:grid-cols-[360px_minmax(0,1fr)]">
          <section className="border border-[color:var(--border)] bg-white p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">KEYS</p>

            <label className="mt-6 grid gap-2">
              <span className="text-sm text-slate-600">Key</span>
              <Input value={keyInput} onChange={(e) => setKeyInput(e.target.value)} placeholder="e.g. site.footer" />
            </label>

            <div className="mt-6 grid gap-2">
              <p className="text-sm text-slate-600">常用 key</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_KEYS.map((k) => (
                  <button
                    key={k}
                    type="button"
                    className="rounded-[4px] border border-slate-200 bg-white px-3 py-1.5 font-mono text-[11px] text-slate-600 hover:bg-slate-50"
                    onClick={() => {
                      setKeyInput(k);
                      loadKey(k);
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              说明：前台默认只读取 <span className="font-mono">published</span>；你在这里发布后，线上对应区域才会变。
            </p>
          </section>

          <section className="min-w-0 border border-[color:var(--border)] bg-white p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">DRAFT</p>
            <div className="mt-4">
              <Textarea rows={18} value={draftText} onChange={(e) => setDraftText(e.target.value)} />
            </div>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[#BBBBBB]">PUBLISHED</p>
            <div className="mt-4">
              <Textarea rows={14} value={publishedText} readOnly />
            </div>
          </section>
        </div>
      </AdminShell>
    </Page>
  );
}

