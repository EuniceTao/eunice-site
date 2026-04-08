/**
 * @file ExperiencePage.jsx
 * @description Experience 聚合页：学习 / 工作 / 项目在同一页完整呈现。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../design-system';
import { EducationSection } from '../home/EducationSection';
import { WorkSection } from '../home/WorkSection';
import { projects } from '../projects/projectsData';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

function toBullets(text) {
  if (!text) return [];
  return String(text)
    .split(/(?:\r?\n|；|。)\s*/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function ProjectDetails({ project }) {
  return (
    <details className="group border border-[color:var(--border)] bg-white px-7 py-6 open:border-[#111111]">
      <summary className="list-none cursor-pointer select-none">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#BBBBBB]">
              {project.period}
            </p>
            <h3 className="mt-3 text-[18px] font-medium leading-[1.5] text-[color:var(--text)]">
              {project.title}
            </h3>
            <p className="mt-4 text-[13px] font-light leading-[1.8] text-[color:var(--text-muted)]">
              {project.outcome}
            </p>
          </div>

          <span className="shrink-0 text-[#BBBBBB] transition-transform group-open:rotate-90">
            →
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-[2px] border border-[#DDDDDD] px-2.5 py-[2px] font-mono text-[11px] text-[#888888]"
            >
              {t}
            </span>
          ))}
        </div>
      </summary>

      <div className="mt-6 border-t border-[color:var(--border)] pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <section className="border border-[color:var(--border)] bg-white p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
              BACKGROUND
            </p>
            <ul className="mt-4 space-y-2 text-[14px] leading-[1.9] text-[color:var(--text-muted)]">
              {toBullets(project.background).map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="select-none text-[color:var(--text-muted)]">—</span>
                  <span className="min-w-0">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-[color:var(--border)] bg-white p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
              MY ROLE
            </p>
            <ul className="mt-4 space-y-2 text-[14px] leading-[1.9] text-[color:var(--text-muted)]">
              {toBullets(project.role).map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="select-none text-[color:var(--text-muted)]">—</span>
                  <span className="min-w-0">{b}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </details>
  );
}

function SectionHeading({ label, title, description }) {
  return (
    <div className="max-w-prose">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
        {label}
      </p>
      <h2
        className="mt-3 font-display font-light text-[color:var(--text)]"
        style={{ fontSize: 'clamp(30px, 4.2vw, 44px)' }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[14px] leading-[1.9] font-light text-[color:var(--text-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ExperienceSection({ label, title, description, children, footer }) {
  return (
    <section className="border-t border-[color:var(--border)] py-[72px]">
      <SectionHeading label={label} title={title} description={description} />
      <div className="mt-9">{children}</div>
      {footer ? <div className="mt-6">{footer}</div> : null}
    </section>
  );
}

export function ExperiencePage() {
  const { content: projectsBlock } = useSiteBlock('experience.projects', {
    fallback: { items: projects },
  });
  const projectItems = Array.isArray(projectsBlock?.items) ? projectsBlock.items : projects;

  const { content: pageCopy } = useSiteBlock('copy.experience', {
    fallback: {
      pageDescriptionMd: '学习、工作与项目：可先扫读，再点开看细节。',
      educationDescriptionMd: '我如何建立知识结构，以及在校学习里最有价值的训练。',
      workDescriptionMd: '按经历展开：先看一句总结，点进去看背景、动作与结果。',
      projectsDescriptionMd: '完整作品集：背景 → 角色 → 结果。',
    },
  });

  return (
    <Page
      title="Experience"
      description={pageCopy?.pageDescriptionMd || '学习、工作与项目：可先扫读，再点开看细节。'}
    >
      <ExperienceSection
        label="EDUCATION"
        title="学习"
        description={pageCopy?.educationDescriptionMd || '我如何建立知识结构，以及在校学习里最有价值的训练。'}
      >
        <EducationSection />
      </ExperienceSection>

      <ExperienceSection
        label="WORK"
        title="工作"
        description={pageCopy?.workDescriptionMd || '按经历展开：先看一句总结，点进去看背景、动作与结果。'}
        footer={
          <Link
            to="/work"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] transition-colors hover:text-[color:var(--text)]"
          >
            仅看工作页 →
          </Link>
        }
      >
        <WorkSection showAllLink={false} />
      </ExperienceSection>

      <ExperienceSection
        label="PROJECTS"
        title="项目"
        description={pageCopy?.projectsDescriptionMd || '完整作品集：背景 → 角色 → 结果。'}
        footer={
          <Link
            to="/projects"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] transition-colors hover:text-[color:var(--text)]"
          >
            仅看项目页 →
          </Link>
        }
      >
        <div className="space-y-4">
          {projectItems.map((p) => (
            <ProjectDetails key={p.id} project={p} />
          ))}
        </div>
      </ExperienceSection>
    </Page>
  );
}

