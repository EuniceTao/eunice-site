/**
 * @file HeroSection.jsx
 * @description 首页 Hero：左半屏单图轮换 + 右半屏白底姓名与角色标签；桌面左栏高度见 index.css 中 --hero-height-desktop。
 */

import React from 'react';
import { publicUrl } from '../../lib/publicUrl';
import { useSiteBlock } from '../site-blocks/useSiteBlock';
import { getSignedAssetUrl } from '../../lib/signedAssetUrl';

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
  const { content: heroBlock } = useSiteBlock('home.hero', {
    fallback: {
      nameLine: '我是陶源「Eunice」',
      roles: ['AI PM', '心理咨询师', '探索世界的 ENFP'],
      hobbies: '唱歌、旅行、古筝、剧本杀、拳击 成就解锁中... ...',
      photos: FILM_PHOTOS,
    },
  });

  const [photos, setPhotos] = React.useState(FILM_PHOTOS);

  React.useEffect(() => {
    let cancelled = false;

    async function resolvePhotos() {
      const raw = Array.isArray(heroBlock?.photos) ? heroBlock.photos : null;
      const list = raw && raw.length > 0 ? raw : FILM_PHOTOS;

      const resolved = await Promise.all(
        list.map(async (p) => {
          const s = String(p || '').trim();
          if (!s) return '';
          if (s.startsWith('http://') || s.startsWith('https://')) return s;

          // 私有存储引用：storage:<bucket>/<path>
          if (s.startsWith('storage:')) {
            const ref = s.slice('storage:'.length);
            const [bucket, ...rest] = ref.split('/');
            const path = rest.join('/');
            const signed = await getSignedAssetUrl({ bucket, path, expiresInSec: 3600 });
            return signed || '';
          }

          // public 文件名/相对路径
          return publicUrl(s);
        })
      );

      if (!cancelled) setPhotos(resolved.filter(Boolean));
    }

    resolvePhotos();
    return () => {
      cancelled = true;
    };
  }, [heroBlock?.photos]);

  const [active, setActive] = React.useState(0);
  const [prev, setPrev] = React.useState(null);
  const [isFading, setIsFading] = React.useState(false);
  const [broken, setBroken] = React.useState(() => new Set());

  React.useEffect(() => {
    // 数据源变更时，重置轮播状态，避免索引越界
    setActive(0);
    setPrev(null);
    setIsFading(false);
    setBroken(new Set());
  }, [photos.join('|')]);

  const activeSrc = photos[active];

  const nextIndex = React.useMemo(() => {
    // 找到下一个“未坏掉”的索引，避免循环滚到空白
    if (!broken?.size) return (active + 1) % photos.length;
    for (let step = 1; step <= photos.length; step += 1) {
      const idx = (active + step) % photos.length;
      if (!broken.has(photos[idx])) return idx;
    }
    return (active + 1) % photos.length;
  }, [active, broken, photos]);

  const safeNextSrc = photos[nextIndex];

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
                {heroBlock?.nameLine || '我是陶源「Eunice」'}
              </span>
            </h1>
            <div
              className="fade-up mt-6 flex flex-col items-center text-center font-mono text-[12px] leading-relaxed tracking-[0.08em] text-[color:var(--text-muted)] md:mt-8 md:text-[13px]"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="flex max-w-[42rem] flex-wrap items-center justify-center">
                {(heroBlock?.roles || ['AI PM', '心理咨询师', '探索世界的 ENFP']).map((r, idx, arr) => (
                  <React.Fragment key={r}>
                    <span>{r}</span>
                    {idx < arr.length - 1 ? <span className="px-3">|</span> : null}
                  </React.Fragment>
                ))}
              </div>

              <div className="mt-3 w-full max-w-[42rem]">
                <span className="block whitespace-normal md:whitespace-nowrap">
                  {heroBlock?.hobbies || '唱歌、旅行、古筝、剧本杀、拳击 成就解锁中... ...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
