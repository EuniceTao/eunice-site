/**
 * @file AdminHomeEditorPage.jsx
 * @description 首页内容编辑：Hero 与 Quote（草稿/发布）。
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Page, Textarea } from '../../design-system';
import { useAdminSession } from './useAdminSession';
import { AdminShell } from './AdminShell';
import { getSiteBlockRow, publishSiteBlock, saveSiteBlockDraft } from '../site-blocks/siteBlocksApi';
import { supabase } from '../../lib/supabaseClient';

function parseLines(value) {
  return String(value || '')
    .split(/\r?\n/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function toLines(value) {
  return Array.isArray(value) ? value.join('\n') : '';
}

export function AdminHomeEditorPage() {
  const navigate = useNavigate();
  const { session, loading } = useAdminSession();

  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [heroDraft, setHeroDraft] = useState({
    nameLine: '我是陶源「Eunice」',
    roles: ['AI PM', '心理咨询师', '探索世界的 ENFP'],
    hobbies: '唱歌、旅行、古筝、剧本杀、拳击 成就解锁中... ...',
    photos: ['hero-7.jpg', 'hero-6.jpg', 'hero-1.jpg', 'hero-5.jpg', 'hero-2.png'],
  });

  const [quoteDraft, setQuoteDraft] = useState({
    text:
      '当一个人能够如此单纯，如此觉醒，如此专注于当下，毫无疑虑地走过这个世界，生命真是一件赏心乐事。',
    author: '—— 黑塞 《悉达多》',
    authorEn: '(by - Hermann Hesse)',
  });

  useEffect(() => {
    if (!loading && !session) navigate('/admin', { replace: true });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    async function run() {
      try {
        const [heroRow, quoteRow] = await Promise.all([
          getSiteBlockRow('home.hero'),
          getSiteBlockRow('home.quote'),
        ]);
        if (cancelled) return;
        if (heroRow?.draft && Object.keys(heroRow.draft).length > 0) {
          setHeroDraft((prev) => ({ ...prev, ...heroRow.draft }));
        }
        if (quoteRow?.draft && Object.keys(quoteRow.draft).length > 0) {
          setQuoteDraft((prev) => ({ ...prev, ...quoteRow.draft }));
        }
      } catch {
        // ignore; defaults already set
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const canSave = useMemo(() => {
    return String(heroDraft?.nameLine || '').trim().length > 0 && String(quoteDraft?.text || '').trim().length > 0;
  }, [heroDraft, quoteDraft]);

  async function saveDraft() {
    setStatus(null);
    setSaving(true);
    try {
      await Promise.all([
        saveSiteBlockDraft('home.hero', heroDraft),
        saveSiteBlockDraft('home.quote', quoteDraft),
      ]);
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
      await Promise.all([publishSiteBlock('home.hero'), publishSiteBlock('home.quote')]);
      setStatus({ type: 'success', message: '已发布。' });
    } catch (err) {
      setStatus({ type: 'error', message: `发布失败：${err?.message ?? '未知错误'}` });
    } finally {
      setSaving(false);
    }
  }

  async function uploadHeroPhotos(files) {
    if (!supabase) {
      setStatus({ type: 'error', message: 'Supabase 未配置，无法上传。' });
      return;
    }
    if (!files || files.length === 0) return;

    setStatus(null);
    setUploading(true);
    try {
      const bucket = 'site-assets';
      const uploadedPaths = [];

      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop() || 'jpg';
        const id = (crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).replace(/\./g, '');
        const path = `hero/${new Date().toISOString().slice(0, 10)}/${id}.${ext}`;

        const { error: upErr } = await supabase.storage
          .from(bucket)
          .upload(path, file, { upsert: false, cacheControl: '31536000' });
        if (upErr) throw upErr;
        uploadedPaths.push(path);
      }

      if (uploadedPaths.length > 0) {
        const refs = uploadedPaths.map((p) => `storage:site-assets/${p}`);
        setHeroDraft((p) => ({ ...p, photos: [...refs, ...(p.photos || [])] }));
        setStatus({
          type: 'success',
          message: `已上传 ${uploadedPaths.length} 张图片，并已加入照片列表（记得保存草稿/发布）。`,
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message:
          `上传失败：${err?.message ?? '未知错误'}。若提示 RLS：请在 Supabase SQL Editor 执行 migrations 里的 storage 策略（site-assets 写入权限）。`,
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <Page title="Admin · Home" description="编辑首页 Hero 与引用文案（草稿/发布）。">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">HERO</p>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">上传照片（会自动加入列表）</span>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  onChange={(e) => uploadHeroPhotos(e.target.files)}
                />
                <span className="text-[12px] leading-[1.7] text-[color:var(--text-muted)]">
                  需要 Supabase Storage 存储桶：`site-assets`（公开）。上传后记得「保存草稿/发布」。
                </span>
                <span className="text-[12px] leading-[1.7] text-[color:var(--text-muted)]">
                  {uploading ? '上传中…（上传成功后会自动把 storage:… 加进下面的照片列表）' : null}
                  {!uploading && status?.message ? `最新提示：${status.message}` : null}
                </span>
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-600">姓名行（Hi 下方那句）</span>
                <Input
                  value={heroDraft.nameLine}
                  onChange={(e) => setHeroDraft((p) => ({ ...p, nameLine: e.target.value }))}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-600">角色标签（每行一个）</span>
                <Textarea
                  rows={4}
                  value={toLines(heroDraft.roles)}
                  onChange={(e) => setHeroDraft((p) => ({ ...p, roles: parseLines(e.target.value) }))}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-600">爱好/一句话</span>
                <Textarea
                  rows={3}
                  value={heroDraft.hobbies}
                  onChange={(e) => setHeroDraft((p) => ({ ...p, hobbies: e.target.value }))}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-600">照片列表（每行一个文件名或 URL）</span>
                <Textarea
                  rows={5}
                  value={toLines(heroDraft.photos)}
                  onChange={(e) => setHeroDraft((p) => ({ ...p, photos: parseLines(e.target.value) }))}
                  placeholder={'hero-7.jpg\nhero-6.jpg\n...'}
                />
              </label>

              <p className="text-[12px] leading-[1.7] text-[color:var(--text-muted)]">
                支持三种格式：public 文件名（如 `hero-7.jpg`）、直接 URL、或 `storage:site-assets/路径`（私有 bucket 通过签名链接展示）。
              </p>
            </div>
          </section>

          <section className="border border-[color:var(--border)] bg-white p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">QUOTE</p>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">引用正文</span>
                <Textarea
                  rows={5}
                  value={quoteDraft.text}
                  onChange={(e) => setQuoteDraft((p) => ({ ...p, text: e.target.value }))}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-600">作者（中文）</span>
                <Input
                  value={quoteDraft.author}
                  onChange={(e) => setQuoteDraft((p) => ({ ...p, author: e.target.value }))}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-600">作者（英文/补充）</span>
                <Input
                  value={quoteDraft.authorEn}
                  onChange={(e) => setQuoteDraft((p) => ({ ...p, authorEn: e.target.value }))}
                />
              </label>
            </div>
          </section>
        </div>
      </AdminShell>
    </Page>
  );
}

