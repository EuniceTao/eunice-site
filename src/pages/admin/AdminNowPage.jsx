/**
 * @file AdminNowPage.jsx
 * @description Now 内容管理：新建/编辑/发布/删除（仅管理员可用）。
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Page, Textarea } from '../../design-system';
import { supabase } from '../../lib/supabaseClient';
import { useAdminSession } from './useAdminSession';

function toTextAreaValue(body) {
  return Array.isArray(body) ? body.filter(Boolean).join('\n') : '';
}

function fromTextAreaValue(value) {
  return String(value || '')
    .split(/\r?\n/g)
    .map((s) => s.trim())
    .filter(Boolean);
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

export function AdminNowPage() {
  const navigate = useNavigate();
  const { session, loading, signOut, user } = useAdminSession();

  const [entries, setEntries] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [status, setStatus] = useState(null); // { type, message }

  const [editing, setEditing] = useState(null); // { id?, date, mood, title, body[], published }
  const isEditing = Boolean(editing);

  const canSave = useMemo(() => {
    if (!editing) return false;
    return String(editing.date || '').length >= 8 && String(editing.title || '').trim().length > 0;
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
        .from('now_entries')
        .select('id,date,mood,title,body,published,created_at')
        .order('date', { ascending: false });
      if (error) throw error;
      setEntries(Array.isArray(data) ? data : []);
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
      date: today,
      mood: '',
      title: '',
      body: [],
      published: false,
    });
    setStatus(null);
  }

  function startEdit(row) {
    setEditing({
      id: row.id,
      date: row.date,
      mood: row.mood || '',
      title: row.title || '',
      body: Array.isArray(row.body) ? row.body : [],
      published: Boolean(row.published),
    });
    setStatus(null);
  }

  async function save() {
    if (!supabase || !editing) return;
    if (!canSave) {
      setStatus({ type: 'error', message: '请至少填写日期与标题。' });
      return;
    }

    setStatus(null);
    try {
      const payload = {
        date: editing.date,
        mood: editing.mood || null,
        title: String(editing.title || '').trim(),
        body: Array.isArray(editing.body) ? editing.body : [],
        published: Boolean(editing.published),
      };

      if (editing.id) {
        const { error } = await supabase
          .from('now_entries')
          .update(payload)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('now_entries').insert(payload);
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
        .from('now_entries')
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
      const { error } = await supabase.from('now_entries').delete().eq('id', row.id);
      if (error) throw error;
      await refresh();
    } catch (err) {
      setStatus({ type: 'error', message: `删除失败：${err?.message ?? '未知错误'}` });
    }
  }

  return (
    <Page title="Admin · Now" description="管理你的 Now 日记：发布后首页与 Now 页会自动更新。">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={startNew} disabled={!supabase || fetching}>
            新建一条
          </Button>
          <Button variant="outline" onClick={refresh} disabled={!supabase || fetching}>
            {fetching ? '刷新中…' : '刷新'}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
            {user?.email || ''}
          </span>
          <Button
            variant="outline"
            onClick={async () => {
              await signOut();
              navigate('/admin', { replace: true });
            }}
          >
            退出
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

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_420px]">
        <section className="min-w-0">
          <div className="border border-[color:var(--border)] bg-white">
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[color:var(--border)] px-6 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
                Entries
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
                {entries.length}
              </p>
            </div>

            <div className="divide-y divide-[color:var(--border)]">
              {entries.map((e) => (
                <div key={e.id} className="px-6 py-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={e.published ? 'green' : 'amber'}>
                          {e.published ? 'PUBLISHED' : 'DRAFT'}
                        </Badge>
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
                          {e.date}
                        </span>
                        {e.mood ? (
                          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
                            {e.mood}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 text-[16px] font-medium text-[color:var(--text)]">
                        {e.title}
                      </p>
                      {Array.isArray(e.body) && e.body[0] ? (
                        <p className="mt-2 text-[14px] font-light leading-[1.8] text-[color:var(--text-muted)] line-clamp-2">
                          {e.body[0]}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(e)}>
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePublish(e)}
                      >
                        {e.published ? '取消发布' : '发布'}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => remove(e)}>
                        删除
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {entries.length === 0 ? (
                <div className="px-6 py-10">
                  <p className="text-sm text-[color:var(--text-muted)]">
                    还没有内容。点「新建一条」开始写第一条日记。
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="min-w-0">
          <div className="border border-[color:var(--border)] bg-white p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
              {isEditing ? 'Edit' : 'Tips'}
            </p>

            {isEditing ? (
              <div className="mt-5 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">日期</span>
                  <Input
                    type="date"
                    value={editing.date}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">心情（可选）</span>
                  <Input
                    value={editing.mood}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, mood: e.target.value }))
                    }
                    placeholder="比如：平静 / 兴奋 / 焦虑"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">标题</span>
                  <Input
                    value={editing.title}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="一句话概括这条记录"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">内容（每行一个要点）</span>
                  <Textarea
                    rows={8}
                    value={toTextAreaValue(editing.body)}
                    onChange={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        body: fromTextAreaValue(e.target.value),
                      }))
                    }
                    placeholder={'写几行就好：\n- 今天做了什么\n- 今天想到了什么\n- 一个小结论'}
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
                  <Button
                    variant="outline"
                    onClick={() => setEditing(null)}
                    disabled={!supabase}
                  >
                    取消
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-3 text-[14px] leading-[1.9] text-[color:var(--text-muted)]">
                <p>你可以把 Now 当作“心情记录/备忘录”。写短一点、写勤一点就很好看。</p>
                <p>
                  首页与 `/now` 只展示已发布内容；草稿只有你登录后在后台可见。
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </Page>
  );
}

