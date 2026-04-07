/**
 * @file HeroSection.jsx
 * @description 首页 Hero：左半屏单图轮换 + 右半屏白底姓名与角色标签；桌面左栏高度见 index.css 中 --hero-height-desktop。
 */

import React from 'react';

const FILM_PHOTOS = [
  '/hero-7.jpg',
  '/hero-6.jpg',
  '/hero-1.jpg',
  '/hero-5.jpg',
  '/hero-2.png',
];

/** 每张停留时长（ms），偏慢、一张换一张 */
const SLIDE_INTERVAL_MS = 9000;

export function HeroSection() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % FILM_PHOTOS.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative">
      <div className="hero-split-bleed relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen max-w-[100vw]">
        <div className="hero-split">
          <div className="hero-film-split" aria-hidden>
            {FILM_PHOTOS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`hero-slide-img ${i === active ? 'hero-slide-img--active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding={i === 0 ? 'sync' : 'async'}
              />
            ))}
          </div>

          <div className="hero-text-panel">
            <h1
              className="fade-up font-display font-light leading-[0.92] tracking-tight text-[color:var(--text)]"
              style={{
                fontSize: 'clamp(48px, 15vw, 96px)',
                animationDelay: '0s',
              }}
            >
              <span className="block">Hi,</span>
              <span
                className="mt-4 block md:mt-5"
                style={{ fontSize: '0.78em', whiteSpace: 'nowrap' }}
              >
                我是陶源「Eunice」
              </span>
            </h1>
            <div
              className="fade-up mt-6 flex flex-col items-center text-center font-mono text-[12px] leading-relaxed tracking-[0.08em] text-[color:var(--text-muted)] md:mt-8 md:text-[13px]"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="flex max-w-[42rem] flex-wrap items-center justify-center">
                <span>AI PM</span>
                <span className="px-3">|</span>
                <span>心理咨询师</span>
                <span className="px-3">|</span>
                <span>探索世界的 ENFP</span>
              </div>

              <div className="mt-3 w-full max-w-[42rem]">
                <span className="block whitespace-normal md:whitespace-nowrap">
                  唱歌、旅行、古筝、剧本杀、拳击 成就解锁中... ...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
