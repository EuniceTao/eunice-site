/**
 * @file AdminLoginPage.jsx
 * @description 后台登录：邮箱 + 密码（Supabase Auth）。
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Page } from '../../design-system';
import { supabase } from '../../lib/supabaseClient';
import { useAdminSession } from './useAdminSession';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { session, loading } = useAdminSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type, message }

  const canSubmit = useMemo(
    () => email.trim().length > 3 && password.length > 5,
    [email, password]
  );

  useEffect(() => {
    if (!loading && session) navigate('/admin/now', { replace: true });
  }, [loading, session, navigate]);

  return (
    <Page title="Admin" description="登录后可编辑站点内容（仅你本人可用）。">
      <section className="max-w-[520px] border border-[color:var(--border)] bg-white p-7">
        {!supabase ? (
          <p className="text-sm text-red-600">
            Supabase 未配置（`VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY`）。
          </p>
        ) : null}

        <form
          className="mt-2 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setStatus(null);
            if (!supabase) return;
            if (!canSubmit) {
              setStatus({ type: 'error', message: '请填写邮箱与密码。' });
              return;
            }

            setSubmitting(true);
            try {
              const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
              });
              if (error) throw error;
              navigate('/admin/now', { replace: true });
            } catch (err) {
              setStatus({
                type: 'error',
                message: `登录失败：${err?.message ?? '未知错误'}`,
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <label className="grid gap-2">
            <span className="text-sm text-slate-600">邮箱</span>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-600">密码</span>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" disabled={submitting || !supabase || !canSubmit}>
              {submitting ? '登录中…' : '登录'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEmail('');
                setPassword('');
                setStatus(null);
              }}
              disabled={submitting}
            >
              清空
            </Button>
          </div>

          {status?.message ? (
            <p
              className={
                status.type === 'success'
                  ? 'text-sm text-slate-600'
                  : 'text-sm text-red-600'
              }
            >
              {status.message}
            </p>
          ) : null}
        </form>
      </section>
    </Page>
  );
}

