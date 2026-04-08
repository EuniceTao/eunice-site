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
import { Markdown } from '../blog/Markdown';

export function HomePage() {
  const { content: projectsBlock } = useSiteBlock('experience.projects', {
    fallback: { items: projects },
  });
  const allProjects = Array.isArray(projectsBlock?.items) ? projectsBlock.items : projects;
  const projectsPreview = allProjects.slice(0, 3);

  const { content: copy } = useSiteBlock('copy.home', {
    fallback: {
      contactLabel: 'CONTACT',
      contactTitle: '联系我',
      contactBodyMd: '如果你想合作、咨询，或者只是想聊聊，都欢迎给我留言。',
      emailLabel: '邮箱',
      email: 'taoyuan_china@163.com',
      wechatLabel: '微信',
      wechat: 'Tyuan1216',
      socialsLabel: '社交媒体',
      socials: [
        { label: '小红书', value: '@陶子小姐和她的英镑小朋友' },
        { label: '微博', value: '@陶子小姐不吃桃' },
        { label: '抖音', value: '@陶子小姐不吃桃' },
      ],
      contactCtaText: '去留言 →',
      contactCtaTo: '/contact',
    },
  });

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
                  {copy?.contactLabel || 'CONTACT'}
                </p>
                <h2 className="font-display font-light text-white" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>
                  {copy?.contactTitle || '联系我'}
                </h2>
                <div className="mt-4 max-w-prose text-[14px] leading-[1.8] font-light text-[#BBBBBB]">
                  <Markdown>{copy?.contactBodyMd || '如果你想合作、咨询，或者只是想聊聊，都欢迎给我留言。'}</Markdown>
                </div>
                <div className="mt-6 space-y-8">
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-4 font-mono text-[13px] text-[#BBBBBB] sm:grid-cols-2 sm:gap-y-3">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[5.5rem_1fr] sm:items-baseline">
                      <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">{copy?.emailLabel || '邮箱'}</dt>
                      <dd className="min-w-0">
                        <a
                          href={`mailto:${copy?.email || 'taoyuan_china@163.com'}`}
                          className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                        >
                          {copy?.email || 'taoyuan_china@163.com'}
                        </a>
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[5.5rem_1fr] sm:items-baseline">
                      <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">{copy?.wechatLabel || '微信'}</dt>
                      <dd className="min-w-0">{copy?.wechat || 'Tyuan1216'}</dd>
                    </div>
                  </dl>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888888]">
                      {copy?.socialsLabel || '社交媒体'}
                    </p>
                    <dl className="mt-3 grid grid-cols-1 gap-6 font-mono text-[13px] text-[#BBBBBB] sm:grid-cols-3 sm:gap-8">
                      {(Array.isArray(copy?.socials) ? copy.socials : []).map((s) => (
                        <div key={s?.label || s?.value} className="min-w-0">
                          <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">
                            {s?.label || ''}
                          </dt>
                          <dd className="mt-1 break-words">{s?.value || ''}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  to={copy?.contactCtaTo || '/contact'}
                  className="inline-flex items-center rounded-[4px] border border-white bg-transparent px-4 py-2 text-[13px] text-white transition-colors hover:bg-white hover:text-[#111111]"
                >
                  {copy?.contactCtaText || '去留言 →'}
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

