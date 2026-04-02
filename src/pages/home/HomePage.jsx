/**
 * @file HomePage.jsx
 * @description 首页：核心信息总览（教育/工作/联系）+ 跳转到详情。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { BleedBand, Page, Reveal } from '../../design-system';
import { EducationSection } from './EducationSection';
import { HeroSection } from './HeroSection';
import { ProjectPreviewCard } from './ProjectPreviewCard';
import { WorkSection } from './WorkSection';
import { projects } from '../projects/projectsData';

export function HomePage() {
  const projectsPreview = projects.slice(0, 3);

  return (
    <Page
      className="pt-8 md:pt-10"
    >
      <Reveal>
        <HeroSection />
      </Reveal>

      <div id="content" className="h-1" />

      <Reveal delay={0.05}>
        <EducationSection />
      </Reveal>

      <Reveal delay={0.08}>
        <WorkSection />
      </Reveal>

      <Reveal delay={0.05}>
        <BleedBand
          as="section"
          className="mt-10 bg-slate-100/80 py-10 md:mt-14 md:py-16"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                Projects
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                项目 / Projects
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                先看结果，再看过程。点进项目页会有更完整的背景与复盘。
              </p>
            </div>
            <Link
              to="/projects"
              className="text-sm font-medium text-slate-600 underline-offset-4 transition-colors hover:text-slate-900 hover:underline"
            >
              查看全部 →
            </Link>
          </div>

          <div className="mt-10 grid gap-0 md:grid-cols-3 md:divide-x md:divide-slate-300/50">
            {projectsPreview.map((p, idx) => (
              <ProjectPreviewCard key={p.id} project={p} index={idx} />
            ))}
          </div>
        </BleedBand>
      </Reveal>

      <Reveal delay={0.05}>
        <section className="mt-10 md:mt-14">
          <div className="bg-slate-200/50">
            <div className="grid divide-y divide-slate-300/60 md:grid-cols-2 md:divide-x md:divide-y-0">
              <Link
                to="/blog"
                className="group block px-5 py-8 transition-colors hover:bg-white/60 md:px-8 md:py-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-base font-semibold text-slate-900">笔记 / Notes</h2>
                  <span className="text-slate-500 transition-colors group-hover:text-slate-900">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  产品思考、行业观察，也记录折腾与生活。
                </p>
              </Link>

              <Link
                to="/now"
                className="group block px-5 py-8 transition-colors hover:bg-white/60 md:px-8 md:py-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-base font-semibold text-slate-900">此刻 / Now</h2>
                  <span className="text-slate-500 transition-colors group-hover:text-slate-900">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  此刻我在做什么，最近在关注什么（更像一封小信）。
                </p>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section className="mt-10 md:mt-14">
          <div className="bg-slate-900 px-5 py-10 text-slate-300 md:px-8 md:py-12">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-prose">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                  Contact
                </p>
                <h2 className="mt-2 text-lg font-semibold text-white">联系我 / Contact</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  如果你想合作、咨询，或者只是想聊聊，都欢迎给我留言。
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                  <a
                    href="mailto:taoyuan_china@163.com"
                    className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                  >
                    taoyuan_china@163.com
                  </a>
                  <span className="text-slate-600">·</span>
                  <span>WeChat: Tyuan1216</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-200"
                >
                  去留言 →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

