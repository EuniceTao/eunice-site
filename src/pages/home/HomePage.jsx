/**
 * @file HomePage.jsx
 * @description 首页：核心信息总览（教育/工作/联系）+ 跳转到详情。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Page, ScrollReveal } from '../../design-system';
import { HeroSection } from './HeroSection';
import { HomeQuoteBand } from './HomeQuoteBand';
import { ExperienceSection } from './ExperienceSection';
import { MoreAboutMeSection } from './MoreAboutMeSection';
import { projects } from '../projects/projectsData';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

export function HomePage() {
  const { content: projectsBlock } = useSiteBlock('experience.projects', {
    fallback: { items: projects },
  });
  const allProjects = Array.isArray(projectsBlock?.items) ? projectsBlock.items : projects;
  const projectsPreview = allProjects.slice(0, 3);

  return (
    <Page
      className="pt-8 md:pt-10"
    >
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal>
        <HomeQuoteBand />
      </ScrollReveal>

      <div id="content" className="h-1" />

      <ScrollReveal>
        <section className="border-t border-[color:var(--border)] py-[72px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] mb-3">
            EXPERIENCE
          </p>
          <h2
            className="font-display text-[color:var(--text)] font-light"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            经验
          </h2>

          <div className="mt-9">
            <ExperienceSection projectsPreview={projectsPreview} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="border-t border-[color:var(--border)] py-[72px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] mb-3">
            MORE
          </p>
          <h2
            className="font-display text-[color:var(--text)] font-light"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            关于我
          </h2>

          <div className="mt-9">
            <MoreAboutMeSection />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="border-t border-[color:var(--border)] py-[72px]">
          <div className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen max-w-[100vw] bg-[#111111]">
            <div className="mx-auto w-full max-w-[1100px] px-6 py-20 md:px-12">
              <div className="flex flex-wrap items-start justify-between gap-8">
              <div className="min-w-0 max-w-none flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999] mb-3">
                  CONTACT
                </p>
                <h2 className="font-display font-light text-white" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>
                  联系我
                </h2>
                <p className="mt-4 max-w-prose text-[14px] leading-[1.8] font-light text-[#BBBBBB]">
                  如果你想合作、咨询，或者只是想聊聊，都欢迎给我留言。
                </p>
                <div className="mt-6 space-y-8">
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-4 font-mono text-[13px] text-[#BBBBBB] sm:grid-cols-2 sm:gap-y-3">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[5.5rem_1fr] sm:items-baseline">
                      <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">邮箱</dt>
                      <dd className="min-w-0">
                        <a
                          href="mailto:taoyuan_china@163.com"
                          className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                        >
                          taoyuan_china@163.com
                        </a>
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[5.5rem_1fr] sm:items-baseline">
                      <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">微信</dt>
                      <dd className="min-w-0">Tyuan1216</dd>
                    </div>
                  </dl>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888888]">
                      社交媒体
                    </p>
                    <dl className="mt-3 grid grid-cols-1 gap-6 font-mono text-[13px] text-[#BBBBBB] sm:grid-cols-3 sm:gap-8">
                      <div className="min-w-0">
                        <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">小红书</dt>
                        <dd className="mt-1 break-words">@陶子小姐和她的英镑小朋友</dd>
                      </div>
                      <div className="min-w-0">
                        <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">微博</dt>
                        <dd className="mt-1">@陶子小姐不吃桃</dd>
                      </div>
                      <div className="min-w-0">
                        <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">抖音</dt>
                        <dd className="mt-1">@陶子小姐不吃桃</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-[4px] border border-white bg-transparent px-4 py-2 text-[13px] text-white transition-colors hover:bg-white hover:text-[#111111]"
                >
                  去留言 →
                </Link>
              </div>
            </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </Page>
  );
}

