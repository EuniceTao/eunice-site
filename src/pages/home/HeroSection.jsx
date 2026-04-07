/**
 * @file HeroSection.jsx
 * @description 首页 Hero：左半屏单图轮换 + 右半屏白底姓名与角色标签；桌面左栏高度见 index.css 中 --hero-height-desktop。
 */

import React from 'react';
import { publicUrl } from '../../lib/publicUrl';

const FILM_PHOTOS = [
  publicUrl('hero-7.jpg'),
  publicUrl('hero-6.jpg'),
  publicUrl('hero-1.jpg'),
  publicUrl('hero-5.jpg'),
  publicUrl('hero-2.png'),
];

/** 每张停留时长（ms），偏慢、一张换一张 */
const SLIDE_INTERVAL_MS = 9000;
const FADE_MS = 1200;

export function HeroSection() {
  const [active, setActive] = React.useState(0);
  const [prev, setPrev] = React.useState(null);
  const [isFading, setIsFading] = React.useState(false);
  const [broken, setBroken] = React.useState(() => new Set());

  const activeSrc = FILM_PHOTOS[active];
  const nextSrc = FILM_PHOTOS[(active + 1) % FILM_PHOTOS.length];

  const nextIndex = React.useMemo(() => {
    // 找到下一个“未坏掉”的索引，避免循环滚到空白
    if (!broken?.size) return (active + 1) % FILM_PHOTOS.length;
    for (let step = 1; step <= FILM_PHOTOS.length; step += 1) {
      const idx = (active + step) % FILM_PHOTOS.length;
      if (!broken.has(FILM_PHOTOS[idx])) return idx;
    }
    return (active + 1) % FILM_PHOTOS.length;
  }, [active, broken]);

  const safeNextSrc = FILM_PHOTOS[nextIndex];

  const markBroken = React.useCallback((src) => {
    setBroken((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.add(src);
      return nextSet;
    });
  }, []);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setPrev(activeSrc);
      setIsFading(true);
      setActive(nextIndex);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [activeSrc, nextIndex]);

  React.useEffect(() => {
    if (!isFading) return;
    const t = window.setTimeout(() => {
      setIsFading(false);
      setPrev(null);
    }, FADE_MS + 50);
    return () => window.clearTimeout(t);
  }, [isFading]);

  React.useEffect(() => {
    // 只预加载下一张，避免首屏把所有图都拉下来
    const img = new Image();
    img.decoding = 'async';
    img.src = safeNextSrc;
  }, [safeNextSrc]);

  return (
    <section className="relative">
      <div className="hero-split-bleed relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen max-w-[100vw]">
        <div className="hero-split">
          <div className="hero-film-split" aria-hidden>
            {prev ? (
              <img
                key={`prev:${prev}`}
                src={prev}
                alt=""
                className={`hero-slide-img hero-slide-img--active ${isFading ? 'hero-slide-img--fadeout' : ''}`}
                loading="eager"
                decoding="async"
              />
            ) : null}

            <img
              key={`active:${activeSrc}`}
              src={activeSrc}
              alt=""
              className="hero-slide-img hero-slide-img--active"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onError={() => {
                markBroken(activeSrc);
                setActive(nextIndex);
              }}
            />
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
