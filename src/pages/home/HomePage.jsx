/**
 * @file HomePage.jsx
 * @description 首页：一句话 slogan、自我定位、引导到核心板块。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ImageFrame, Page } from '../../design-system';

export function HomePage() {
  const slogan = '把复杂的事，做成简单又有温度的体验。'; // slogan
  const positioning = '我做产品、内容与增长相关的事，关注用户洞察、叙事与长期主义。'; // 定位

  const cards = [
    { title: '关于我 / About', desc: '一些经历、价值观，以及让我成为“我”的细节。', to: '/about' },
    { title: '工作 / Work', desc: '项目背景 → 我的角色 → 结果与复盘（尽量可量化）。', to: '/projects' },
    { title: '笔记 / Notes', desc: '产品思考、行业观察，也记录折腾与生活。', to: '/blog' },
    { title: '此刻 / Now', desc: '此刻我在做什么，最近在关注什么（更像一封小信）。', to: '/now' },
  ];

  return (
    <Page
      title="Hi, I’m Eunice."
      description="这里是我把想法写下来、把作品整理好、把生活留下来的地方。"
    >
      <section className="rounded-2xl border border-slate-200 bg-white p-7 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_260px] md:items-stretch">
          <div className="flex flex-col">
            <div>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-900">
                {slogan}
              </p>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-slate-500">
                {positioning}
              </p>
            </div>

            <div className="mt-8 md:mt-auto flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 transition-colors"
              >
                找我聊聊
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-colors"
              >
                看看作品 →
              </Link>
            </div>
          </div>

          <div className="flex md:justify-end md:self-end">
            <ImageFrame className="w-full max-w-[260px]">
              <img
                src="/profile.png"
                alt="Eunice portrait"
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </ImageFrame>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-slate-900">{c.title}</h2>
              <span className="text-slate-300 group-hover:text-slate-400 transition-colors">
                →
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.desc}</p>
          </Link>
        ))}
      </section>
    </Page>
  );
}

