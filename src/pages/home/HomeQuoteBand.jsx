/**
 * @file HomeQuoteBand.jsx
 * @description 首页 Hero 与主内容之间的白底引言条（黑塞《悉达多》）+ 分割线与向下滚动。
 */

import React from 'react';

export function HomeQuoteBand() {
  return (
    <section
      className="border-t border-b border-[color:var(--border)] bg-[color:var(--bg)] py-12 md:py-16"
      aria-label="引言"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
        <blockquote className="font-display text-[color:var(--text)]">
          <p className="text-left text-[18px] leading-[1.75] text-[color:var(--text)] md:text-[20px]">
            当一个人能够如此单纯，如此觉醒，如此专注于当下，毫无疑虑地走过这个世界，生命真是一件赏心乐事。
          </p>
          <footer className="mt-4 flex justify-end">
            <p className="max-w-full text-right font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)]">
              —— 黑塞 《悉达多》{' '}
              <span className="text-[color:var(--text-light)]">(by - Hermann Hesse)</span>
            </p>
          </footer>
        </blockquote>

        <div className="relative mt-8 w-full md:mt-10">
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5">
            <a
              href="#content"
              className="scroll-indicator inline-flex items-center justify-center font-mono text-[12px] text-[color:var(--text-light)] transition-colors hover:text-[color:var(--text)]"
              aria-label="向下滚动"
            >
              <span className="text-lg leading-none">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
