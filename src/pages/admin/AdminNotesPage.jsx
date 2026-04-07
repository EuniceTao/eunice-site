/**
 * @file AdminNotesPage.jsx
 * @description Notes 管理：新建/编辑/发布/删除（Markdown）。
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Page, Textarea } from '../../design-system';
import { supabase } from '../../lib/supabaseClient';
import { useAdminSession } from './useAdminSession';
import { AdminShell } from './AdminShell';

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function Badge({ children, tone = 'neutral' }) {
  const toneClass =
    tone === 'green'
      ? 'border-[#CFEAD9] text-[#2D6A4F] bg-[#F2FBF6]'
      : tone === 'amber'
        ? 'border-[#F5E3C2] text-[#7C5A1A] bg-[#FFFBF3]'
        : 'border-[#E6E6E6] text-[#777777] bg-white';

  return (
    <span
      className={[
        'inline-flex items-center rounded-[2px] border px-2.5 py-[2px] font-mono text-[11px]',
        toneClass,
      ].join(' ')}
    >
      {children}
    </span>
  );
}

export function AdminNotesPage() {
  const navigate = useNavigate();
  const { session, loading, signOut, user } = useAdminSession();

  const [rows, setRows] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [status, setStatus] = useState(null);

  const [editing, setEditing] = useState(null); // { id?, slug,title,summary,body_md,date,published }

  const canSave = useMemo(() => {
    if (!editing) return false;
    return (
      String(editing.slug || '').trim().length > 0 &&
      String(editing.title || '').trim().length > 0 &&
      String(editing.date || '').trim().length > 0
    );
  }, [editing]);

  useEffect(() => {
    if (!loading && !session) navigate('/admin', { replace: true });
  }, [loading, session, navigate]);

  async function refresh() {
    if (!supabase) return;
    setFetching(true);
    setStatus(null);
    try {
      const { data, error } = await supabase
        .from('notes_posts')
        .select('id,slug,title,summary,body_md,date,published,updated_at')
        .order('date', { ascending: false });
      if (error) throw error;
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setStatus({ type: 'error', message: `读取失败：${err?.message ?? '未知错误'}` });
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    if (!session) return;
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.access_token]);

  function startNew() {
    const today = new Date().toISOString().slice(0, 10);
    setEditing({
      slug: '',
      title: '',
      summary: '',
      body_md: '',
      date: today,
      published: false,
    });
    setStatus(null);
  }

  function startEdit(row) {
    setEditing({
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary || '',
      body_md: row.body_md || '',
      date: row.date,
      published: Boolean(row.published),
    });
    setStatus(null);
  }

  async function save() {
    if (!supabase || !editing) return;
    if (!canSave) {
      setStatus({ type: 'error', message: '请至少填写 slug、标题与日期。' });
      return;
    }

    setStatus(null);
    try {
      const payload = {
        slug: String(editing.slug).trim(),
        title: String(editing.title).trim(),
        summary: String(editing.summary || '').trim(),
        body_md: String(editing.body_md || ''),
        date: editing.date,
        published: Boolean(editing.published),
      };

      if (editing.id) {
        const { error } = await supabase
          .from('notes_posts')
          .update(payload)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('notes_posts').insert(payload);
        if (error) throw error;
      }

      setEditing(null);
      await refresh();
      setStatus({ type: 'success', message: '已保存。' });
    } catch (err) {
      setStatus({ type: 'error', message: `保存失败：${err?.message ?? '未知错误'}` });
    }
  }

  async function togglePublish(row) {
    if (!supabase) return;
    setStatus(null);
    try {
      const { error } = await supabase
        .from('notes_posts')
        .update({ published: !row.published })
        .eq('id', row.id);
      if (error) throw error;
      await refresh();
    } catch (err) {
      setStatus({ type: 'error', message: `更新失败：${err?.message ?? '未知错误'}` });
    }
  }

  async function remove(row) {
    if (!supabase) return;
    const ok = window.confirm(`确定删除「${row.title}」吗？这个操作无法撤销。`);
    if (!ok) return;

    setStatus(null);
    try {
      const { error } = await supabase.from('notes_posts').delete().eq('id', row.id);
      if (error) throw error;
      await refresh();
    } catch (err) {
      setStatus({ type: 'error', message: `删除失败：${err?.message ?? '未知错误'}` });
    }
  }

  return (
    <Page title="Admin · Notes" description="管理笔记（Markdown）。发布后前台 /blog 自动更新。">
      <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={startNew} disabled={!supabase || fetching}>
            新建一篇
          </Button>
          <Button variant="outline" onClick={refresh} disabled={!supabase || fetching}>
            {fetching ? '刷新中…' : '刷新'}
          </Button>
        </div>
      </div>

      {status?.message ? (
        <p
          className={
            status.type === 'success'
              ? 'mt-6 text-sm text-slate-600'
              : 'mt-6 text-sm text-red-600'
          }
        >
          {status.message}
        </p>
      ) : null}

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_520px]">
        <section className="min-w-0">
          <div className="border border-[color:var(--border)] bg-white">
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[color:var(--border)] px-6 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
                Posts
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
                {rows.length}
              </p>
            </div>

            <div className="divide-y divide-[color:var(--border)]">
              {rows.map((p) => (
                <div key={p.id} className="px-6 py-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={p.published ? 'green' : 'amber'}>
                          {p.published ? 'PUBLISHED' : 'DRAFT'}
                        </Badge>
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
                          {p.date}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
                          {p.slug}
                        </span>
                      </div>
                      <p className="mt-3 text-[16px] font-medium text-[color:var(--text)]">
                        {p.title}
                      </p>
                      {p.summary ? (
                        <p className="mt-2 text-[14px] font-light leading-[1.8] text-[color:var(--text-muted)] line-clamp-2">
                          {p.summary}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(p)}>
                        编辑
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => togglePublish(p)}>
                        {p.published ? '取消发布' : '发布'}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => remove(p)}>
                        删除
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {rows.length === 0 ? (
                <div className="px-6 py-10">
                  <p className="text-sm text-[color:var(--text-muted)]">
                    还没有文章。点「新建一篇」开始写第一篇笔记。
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="min-w-0">
          <div className="border border-[color:var(--border)] bg-white p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
              {editing ? 'Edit' : 'Tips'}
            </p>

            {editing ? (
              <div className="mt-5 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">标题</span>
                  <Input
                    value={editing.title}
                    onChange={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        title: e.target.value,
                        slug: prev.slug || slugify(e.target.value),
                      }))
                    }
                    placeholder="文章标题"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">slug（URL）</span>
                  <Input
                    value={editing.slug}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                    }
                    placeholder="hello-minimalism"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">日期</span>
                  <Input
                    type="date"
                    value={editing.date}
                    onChange={(e) => setEditing((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">摘要</span>
                  <Textarea
                    rows={3}
                    value={editing.summary}
                    onChange={(e) => setEditing((prev) => ({ ...prev, summary: e.target.value }))}
                    placeholder="一两句话概括这篇笔记"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">正文（Markdown）</span>
                  <Textarea
                    rows={12}
                    value={editing.body_md}
                    onChange={(e) => setEditing((prev) => ({ ...prev, body_md: e.target.value }))}
                    placeholder={'# 标题\n\n写点什么…'}
                  />
                </label>

                <label className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.published)}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, published: e.target.checked }))
                    }
                  />
                  <span className="text-sm text-slate-600">发布（公开可见）</span>
                </label>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button onClick={save} disabled={!supabase || !canSave}>
                    保存
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(null)} disabled={!supabase}>
                    取消
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-3 text-[14px] leading-[1.9] text-[color:var(--text-muted)]">
                <p>正文支持 Markdown；建议先写摘要，列表页更好扫读。</p>
                <p>未发布内容只在后台可见；发布后会出现在前台 `/blog`。</p>
              </div>
            )}
          </div>
        </aside>
      </div>
      </AdminShell>
    </Page>
  );
}

