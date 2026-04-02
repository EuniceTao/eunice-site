/**
 * @file HeroSection.jsx
 * @description 首页 Hero：杂志拼贴 + 衬线标题 + 引言；底部分割线（黑条 + 灰线）与下滚指示。
 */

import React from 'react';

/** 拼贴图片（7 张，与 public/hero-*.jpg 一一对应） */
const COLLAGE = [
  {
    src: '/hero-7.jpg',
    className: 'col-span-12 md:col-span-7 aspect-[16/9] md:aspect-[21/9]',
    eager: true,
  },
  {
    src: '/hero-4.jpg',
    className: 'col-span-6 md:col-span-2 aspect-[4/5] md:aspect-[3/4]',
    eager: false,
  },
  {
    src: '/hero-6.jpg',
    className: 'col-span-6 md:col-span-3 aspect-[4/5] md:aspect-[3/4]',
    eager: false,
  },
  {
    src: '/hero-1.jpg',
    className: 'col-span-12 md:col-span-4 aspect-[16/10]',
    eager: false,
  },
  {
    src: '/hero-5.jpg',
    className: 'col-span-6 md:col-span-3 aspect-[4/5]',
    eager: false,
  },
  {
    src: '/hero-2.jpg',
    className: 'col-span-6 md:col-span-3 aspect-[4/5]',
    eager: false,
  },
  {
    src: '/hero-3.jpg',
    className: 'col-span-12 md:col-span-2 aspect-[3/4]',
    eager: false,
  },
];

function CollageTile({ className, children }) {
  return (
    <div className={['overflow-hidden rounded-lg bg-transparent', className].join(' ')}>
      {children}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative">
      <div className="relative py-6 md:py-8">
        <div className="relative grid grid-cols-12 gap-3 md:gap-4">
          {COLLAGE.map((item) => (
            <CollageTile key={item.src} className={item.className}>
              <img
                src={item.src}
                alt=""
                className="h-full w-full object-cover"
                loading={item.eager ? 'eager' : 'lazy'}
                decoding={item.eager ? 'sync' : 'async'}
              />
            </CollageTile>
          ))}
        </div>

        <div className="relative mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h1 className="font-serif text-[44px] leading-[0.92] tracking-tight text-slate-950 md:text-[72px] lg:text-[96px]">
            Hi, 我是陶源「Eunice」
          </h1>

          <div className="lg:pb-3">
            <blockquote className="font-serif text-[18px] leading-[1.75] text-slate-700 md:text-[20px]">
              当一个人能够如此单纯，如此觉醒，如此专注于当下，毫无疑虑地走过这个世界，生命真是一件赏心乐事。
            </blockquote>
            <div className="mt-3 flex justify-end">
              <p className="text-sm text-slate-500">
                —— 黑塞 《悉达多》 <span className="text-slate-400">(by - Hermann Hesse)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-12 flex items-center gap-4 md:mt-14" aria-hidden>
          <span className="h-1.5 w-14 shrink-0 rounded-sm bg-slate-900 md:w-20" />
          <span className="h-px flex-1 bg-slate-300/90" />
        </div>

        <div className="relative mt-8 flex justify-center md:mt-10">
          <a
            href="#content"
            className="scroll-indicator inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 ring-1 ring-slate-300/60 transition-colors hover:text-slate-900 hover:ring-slate-400/80"
            aria-label="向下滚动"
          >
            <span className="text-lg leading-none">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
