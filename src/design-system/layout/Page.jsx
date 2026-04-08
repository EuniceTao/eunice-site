/**
 * @file Page.jsx
 * @description 页面基础布局：标题、描述与内容区域的统一排版。
 */

import React from 'react';
import { Container } from './Container';
import { cn } from '../utils/cn';
import { Markdown } from '../../pages/blog/Markdown';

export function Page({ title, description, children, className }) {
  const desc = String(description || '').trim(); // 描述（支持 Markdown）
  const isMarkdown = Boolean(desc) && /[\n*_`#[\]()>-]/.test(desc);

  return (
    <main className={cn('py-12 md:py-16', className)}>
      <Container>
        {(title || description) && (
          <header className="mb-10">
            {title && (
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-3 max-w-prose text-base leading-relaxed text-slate-500">
                {isMarkdown ? <Markdown>{desc}</Markdown> : desc}
              </p>
            )}
          </header>
        )}

        {children}
      </Container>
    </main>
  );
}

