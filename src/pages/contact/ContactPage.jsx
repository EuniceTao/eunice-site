/**
 * @file ContactPage.jsx
 * @description 联系页：简洁联系方式 + 需求收集表单。
 */

import React, { useState } from 'react';
import { Button, Input, Page, Textarea } from '../../design-system';
import { supabase } from '../../lib/supabaseClient';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

function ContactItem({ label, value, href }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 hover:border-slate-300 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noreferrer' : undefined}
    >
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900">{value}</span>
    </a>
  );
}

export function ContactPage() {
  const { content: copy } = useSiteBlock('copy.contact', {
    fallback: {
      title: 'Contact',
      pageDescriptionMd: '如果你有一个项目、一个想法，或者只是想聊聊——都欢迎来找我。',
      contacts: [
        { label: '邮箱 Email', value: 'taoyuan_china@163.com', href: 'mailto:taoyuan_china@163.com' },
        { label: '微信 WeChat', value: 'Tyuan1216', href: '#' },
      ],
      socialHeading: '社交媒体',
      socials: [
        { label: '小红书', value: '@陶子小姐和她的英镑小朋友', href: '#' },
        { label: '微博', value: '@陶子小姐不吃桃', href: '#' },
        { label: '抖音', value: '@陶子小姐不吃桃', href: '#' },
      ],
      formTitle: '留言表单',
      formDescriptionMd: '写下你的需求和联系方式，我会尽快回复你。',
      fieldNameLabel: '称呼',
      fieldNamePlaceholder: '怎么称呼你',
      fieldContactLabel: '联系方式',
      fieldContactPlaceholder: '邮箱 / 微信号（任选其一）',
      fieldNeedLabel: '你的需求',
      fieldNeedPlaceholder: '简单描述一下你想做什么、时间/目标/现状（越具体越好）',
      submitText: '提交',
      submittingText: '提交中…',
      missingRequiredError: '请填写「联系方式」和「你的需求」。',
      successText: '已收到，我会尽快回复你。',
    },
  });

  const [name, setName] = useState(''); // 姓名
  const [contact, setContact] = useState(''); // 联系方式（邮箱/微信等）
  const [need, setNeed] = useState(''); // 需求描述
  const [company, setCompany] = useState(''); // 反机器人（蜜罐字段）
  const [submitting, setSubmitting] = useState(false); // 提交状态
  const [status, setStatus] = useState(null); // { type, message }

  const canSubmit = contact.trim().length > 0 && need.trim().length > 0; // 校验

  return (
    <Page
      title={copy?.title || 'Contact'}
      description={copy?.pageDescriptionMd || '如果你有一个项目、一个想法，或者只是想聊聊——都欢迎来找我。'}
    >
      <div className="space-y-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {(Array.isArray(copy?.contacts) ? copy.contacts : []).map((c) => (
            <ContactItem key={`${c?.label || ''}:${c?.value || ''}`} label={c?.label} value={c?.value} href={c?.href || '#'} />
          ))}
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            {copy?.socialHeading || '社交媒体'}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(Array.isArray(copy?.socials) ? copy.socials : []).map((s) => (
              <ContactItem key={`${s?.label || ''}:${s?.value || ''}`} label={s?.label} value={s?.value} href={s?.href || '#'} />
            ))}
          </div>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-7">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">
          {copy?.formTitle || '留言表单'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {copy?.formDescriptionMd || '写下你的需求和联系方式，我会尽快回复你。'}
        </p>

        <form
          className="mt-6 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setStatus(null);

            if (company.trim().length > 0) return; // 蜜罐：被填说明像机器人
            if (!canSubmit) {
              setStatus({ type: 'error', message: copy?.missingRequiredError || '请填写「联系方式」和「你的需求」。' });
              return;
            }
            if (!supabase) {
              setStatus({
                type: 'error',
                message: '站点还没配置 Supabase 环境变量（VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY）。',
              });
              return;
            }

            setSubmitting(true);
            try {
              const { error } = await supabase.from('contact_requests').insert({
                name: name.trim() || null,
                contact: contact.trim(),
                need: need.trim(),
                page_path: window.location.pathname,
                user_agent: navigator.userAgent,
              });
              if (error) throw error;

              setStatus({ type: 'success', message: copy?.successText || '已收到，我会尽快回复你。' });
              setName('');
              setContact('');
              setNeed('');
            } catch (err) {
              setStatus({
                type: 'error',
                message: `提交失败：${err?.message ?? '未知错误'}`,
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {/* 蜜罐字段：人类不会看到 */}
          <label className="hidden">
            <span>Company</span>
            <input value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-600">{copy?.fieldNameLabel || '称呼'}</span>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy?.fieldNamePlaceholder || '怎么称呼你'}
              autoComplete="name"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-600">{copy?.fieldContactLabel || '联系方式'}</span>
            <Input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={copy?.fieldContactPlaceholder || '邮箱 / 微信号（任选其一）'}
              autoComplete="email"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-slate-600">{copy?.fieldNeedLabel || '你的需求'}</span>
            <Textarea
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder={copy?.fieldNeedPlaceholder || '简单描述一下你想做什么、时间/目标/现状（越具体越好）'}
              rows={6}
              required
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" disabled={submitting || !canSubmit}>
              {submitting ? copy?.submittingText || '提交中…' : copy?.submitText || '提交'}
            </Button>
          </div>

          {status?.message && (
            <p
              className={
                status.type === 'success'
                  ? 'text-sm text-slate-600'
                  : 'text-sm text-red-600'
              }
            >
              {status.message}
            </p>
          )}
        </form>
      </section>
    </Page>
  );
}

