/**
 * @file useScrollReveal.js
 * @description IntersectionObserver 驱动的滚动入场：进入视口后给元素加 .visible。
 */

import React from 'react';

export function useScrollReveal({ rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('visible');
          }
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return ref;
}

