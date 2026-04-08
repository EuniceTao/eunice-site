/**
 * @file AdminExperienceEducationPanel.jsx
 * @description Admin：学习经历表单（字段化；课程/荣誉为「每行一项」，支持 `- ` 列表）。
 */

import React from 'react';
import { Button, Input, Textarea } from '../../../design-system';
import { linesToText, slugId, textToLines } from './experienceFormUtils';

export function AdminExperienceEducationPanel({ value, onChange }) {
  const entries = Array.isArray(value?.entries) ? value.entries : [];

  function updateEntry(idx, patch) {
    const next = entries.map((e, i) => (i === idx ? { ...e, ...patch } : e));
    onChange({ entries: next });
  }

  function removeEntry(idx) {
    onChange({ entries: entries.filter((_, i) => i !== idx) });
  }

  function addEntry() {
    onChange({
      entries: [
        ...entries,
        {
          id: slugId(`school-${entries.length + 1}`),
          school: '',
          schoolNote: '',
          program: '',
          time: '',
          courses: [],
          honors: [],
        },
      ],
    });
  }

  return (
    <section className="border border-[color:var(--border)] bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">学习 EDUCATION</p>
        <Button type="button" size="sm" variant="outline" onClick={addEntry}>
          添加院校
        </Button>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        课程与荣誉：每行一条；也支持以 <span className="font-mono">- </span> 开头的 Markdown 列表写法。
      </p>

      <div className="mt-6 grid gap-8">
        {entries.map((e, idx) => (
          <div key={e.id || idx} className="rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[11px] text-slate-400">#{idx + 1}</p>
              <Button type="button" size="sm" variant="ghost" onClick={() => removeEntry(idx)}>
                删除
              </Button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-slate-600">路由 id（勿随便改，影响链接）</span>
                <Input value={e.id || ''} onChange={(ev) => updateEntry(idx, { id: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">学校</span>
                <Input value={e.school || ''} onChange={(ev) => updateEntry(idx, { school: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">学校备注（如 QS）</span>
                <Input value={e.schoolNote || ''} onChange={(ev) => updateEntry(idx, { schoolNote: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">专业</span>
                <Input value={e.program || ''} onChange={(ev) => updateEntry(idx, { program: ev.target.value })} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-600">时间</span>
                <Input value={e.time || ''} onChange={(ev) => updateEntry(idx, { time: ev.target.value })} />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-slate-600">主修课程（每行一条）</span>
                <Textarea
                  rows={6}
                  value={linesToText(e.courses)}
                  onChange={(ev) => updateEntry(idx, { courses: textToLines(ev.target.value) })}
                />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-slate-600">荣誉（每行一条）</span>
                <Textarea
                  rows={3}
                  value={linesToText(e.honors)}
                  onChange={(ev) => updateEntry(idx, { honors: textToLines(ev.target.value) })}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
