/**
 * @file AdminExperienceProjectsPanel.jsx
 * @description Admin：项目表单（字段化；标签每行一条；背景/角色/结果支持长文与换行）。
 */

import React from 'react';
import { Button, Input, Textarea } from '../../../design-system';
import { linesToText, slugId, textToLines } from './experienceFormUtils';

export function AdminExperienceProjectsPanel({ value, onChange }) {
  const items = Array.isArray(value?.items) ? value.items : [];

  function updateItem(idx, patch) {
    const next = items.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    onChange({ items: next });
  }

  function removeItem(idx) {
    onChange({ items: items.filter((_, i) => i !== idx) });
  }

  function addItem() {
    onChange({
      items: [
        ...items,
        {
          id: slugId(`project-${items.length + 1}`),
          title: '',
          period: '',
          background: '',
          role: '',
          outcome: '',
          tags: [],
        },
      ],
    });
  }

  return (
    <section className="border border-[color:var(--border)] bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">项目 PROJECTS</p>
        <Button type="button" size="sm" variant="outline" onClick={addItem}>
          添加项目
        </Button>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        背景 / 角色 / 结果：可直接写多段文字；前台会按句号、分号、换行拆成列表展示。
      </p>

      <div className="mt-6 grid gap-8">
        {items.map((p, idx) => (
          <div key={p.id || idx} className="rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[11px] text-slate-400">#{idx + 1}</p>
              <Button type="button" size="sm" variant="ghost" onClick={() => removeItem(idx)}>
                删除
              </Button>
            </div>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">项目 id（勿随便改）</span>
                <Input value={p.id || ''} onChange={(ev) => updateItem(idx, { id: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">标题</span>
                <Input value={p.title || ''} onChange={(ev) => updateItem(idx, { title: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">时间/周期</span>
                <Input value={p.period || ''} onChange={(ev) => updateItem(idx, { period: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">标签（每行一条）</span>
                <Textarea
                  rows={2}
                  value={linesToText(p.tags)}
                  onChange={(ev) => updateItem(idx, { tags: textToLines(ev.target.value) })}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">背景</span>
                <Textarea
                  rows={4}
                  value={p.background || ''}
                  onChange={(ev) => updateItem(idx, { background: ev.target.value })}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">我的角色</span>
                <Textarea
                  rows={4}
                  value={p.role || ''}
                  onChange={(ev) => updateItem(idx, { role: ev.target.value })}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">结果 / outcome</span>
                <Textarea
                  rows={4}
                  value={p.outcome || ''}
                  onChange={(ev) => updateItem(idx, { outcome: ev.target.value })}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
