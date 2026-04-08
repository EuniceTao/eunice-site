/**
 * @file experienceNormalize.js
 * @description 将 site_blocks draft 规范为 Experience 表单可用的结构。
 */

import { educationEntries } from '../../home/educationData';
import { workItems } from '../../work/workData';
import { projects } from '../../projects/projectsData';
import { slugId } from './experienceFormUtils';

export const DEFAULT_EDUCATION = { entries: educationEntries };
export const DEFAULT_WORK = { items: workItems };
export const DEFAULT_PROJECTS = { items: projects };

export function normalizeEducation(raw) {
  const d = raw && typeof raw === 'object' ? raw : {};
  const list = Array.isArray(d.entries) && d.entries.length > 0 ? d.entries : educationEntries;
  return {
    entries: list.map((en) => ({
      id: String(en.id || slugId(en.school || 'school')),
      school: en.school ?? '',
      schoolNote: en.schoolNote ?? '',
      program: en.program ?? '',
      time: en.time ?? '',
      courses: Array.isArray(en.courses) ? en.courses : [],
      honors: Array.isArray(en.honors) ? en.honors : [],
    })),
  };
}

export function normalizeWork(raw) {
  const d = raw && typeof raw === 'object' ? raw : {};
  const list = Array.isArray(d.items) && d.items.length > 0 ? d.items : workItems;
  return {
    items: list.map((w) => ({
      id: String(w.id || slugId(w.company || 'work')),
      company: w.company ?? '',
      role: w.role ?? '',
      time: w.time ?? '',
      summary: w.summary ?? '',
      highlights: Array.isArray(w.highlights) ? w.highlights : [],
      tags: Array.isArray(w.tags) ? w.tags : [],
    })),
  };
}

export function normalizeProjects(raw) {
  const d = raw && typeof raw === 'object' ? raw : {};
  const list = Array.isArray(d.items) && d.items.length > 0 ? d.items : projects;
  return {
    items: list.map((p) => ({
      id: String(p.id || slugId(p.title || 'project')),
      title: p.title ?? '',
      period: p.period ?? '',
      background: p.background ?? '',
      role: p.role ?? '',
      outcome: p.outcome ?? '',
      tags: Array.isArray(p.tags) ? p.tags : [],
    })),
  };
}
