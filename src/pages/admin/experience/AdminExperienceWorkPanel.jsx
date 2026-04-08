/**
 * @file AdminExperienceWorkPanel.jsx
 * @description Admin：工作经历表单（字段化；亮点/标签为「每行一项」）。
 */

import React from 'react';
import { Button, Input, Textarea } from '../../../design-system';
import { linesToText, slugId, textToLines } from './experienceFormUtils';

export function AdminExperienceWorkPanel({ value, onChange }) {
  const items = Array.isArray(value?.items) ? value.items : [];

  function updateItem(idx, patch) {
    const next = items.map((w, i) => (i === idx ? { ...w, ...patch } : w));
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
          id: slugId(`work-${items.length + 1}`),
          company: '',
          role: '',
          time: '',
          summary: '',
          highlights: [],
          tags: [],
        },
      ],
    });
  }

  return (
    <section className="border border-[color:var(--border)] bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">工作 WORK</p>
        <Button type="button" size="sm" variant="outline" onClick={addItem}>
          添加经历
        </Button>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        亮点与标签：每行一条。首页标签优先读这里的「标签」；留空则沿用站点默认映射。
      </p>

      <div className="mt-6 grid gap-8">
        {items.map((w, idx) => (
          <div key={w.id || idx} className="rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[11px] text-slate-400">#{idx + 1}</p>
              <Button type="button" size="sm" variant="ghost" onClick={() => removeItem(idx)}>
                删除
              </Button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-slate-600">路由 id（/work/:id）</span>
                <Input value={w.id || ''} onChange={(ev) => updateItem(idx, { id: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">公司</span>
                <Input value={w.company || ''} onChange={(ev) => updateItem(idx, { company: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">时间</span>
                <Input value={w.time || ''} onChange={(ev) => updateItem(idx, { time: ev.target.value })} />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-slate-600">岗位</span>
                <Input value={w.role || ''} onChange={(ev) => updateItem(idx, { role: ev.target.value })} />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-slate-600">一句话总结</span>
                <Textarea
                  rows={2}
                  value={w.summary || ''}
                  onChange={(ev) => updateItem(idx, { summary: ev.target.value })}
                />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-slate-600">亮点（每行一条，详情页列表）</span>
                <Textarea
                  rows={6}
                  value={linesToText(w.highlights)}
                  onChange={(ev) => updateItem(idx, { highlights: textToLines(ev.target.value) })}
                />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-slate-600">首页标签（每行一条）</span>
                <Textarea
                  rows={2}
                  value={linesToText(w.tags)}
                  onChange={(ev) => updateItem(idx, { tags: textToLines(ev.target.value) })}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
