/**
 * @file ExperienceSection.jsx
 * @description 首页 Experience：学习 / 工作 / 项目采用左标右内容的统一分区布局。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { EducationSection } from './EducationSection';
import { WorkSection } from './WorkSection';
import { ProjectPreviewCard } from './ProjectPreviewCard';

/** @description 经验区分区容器：左侧子标题，右侧承载具体内容。 */
function ExperienceBlock({ labelEn, titleZh, children, className = '' }) {
  return (
    <section className={className}>
      <div className="grid gap-8 md:grid-cols-[12rem_minmax(0,1fr)] md:items-start md:gap-10">
        <div className="md:sticky md:top-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
            {labelEn}
          </p>
          <h3 className="mt-2 text-[18px] font-light text-[color:var(--text)]">
            {titleZh}
          </h3>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** @description 项目区左侧标题（「全部项目」链路与 Work 一致放在卡片下方）。 */
function ProjectsHeader() {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
        PROJECTS
      </p>
      <h3 className="mt-2 text-[18px] font-light text-[color:var(--text)]">项目</h3>
    </div>
  );
}

export function ExperienceSection({ projectsPreview }) {
  return (
    <div className="space-y-10">
      <ExperienceBlock labelEn="EDUCATION" titleZh="学习">
        <EducationSection />
      </ExperienceBlock>

      <ExperienceBlock
        labelEn="WORK"
        titleZh="工作"
        className="border-t border-[color:var(--border)] pt-10"
      >
        <WorkSection showAllLink />
      </ExperienceBlock>

      <section className="border-t border-[color:var(--border)] pt-10">
        <div className="grid gap-8 md:grid-cols-[12rem_minmax(0,1fr)] md:items-start md:gap-10">
          <div className="md:sticky md:top-24">
            <ProjectsHeader />
          </div>
          <div>
            <div className="grid gap-8 md:grid-cols-3 md:items-stretch">
              {projectsPreview.map((p) => (
                <ProjectPreviewCard key={p.id} project={p} />
              ))}
            </div>
            <div className="pt-6">
              <Link
                to="/projects"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] transition-colors hover:text-[color:var(--text)]"
              >
                全部项目 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

