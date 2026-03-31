/**
 * @file Page.jsx
 * @description 页面基础布局：标题、描述与内容区域的统一排版。
 */

import React from 'react';
import { Container } from './Container';
import { cn } from '../utils/cn';

export function Page({ title, description, children, className }) {
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
                {description}
              </p>
            )}
          </header>
        )}

        {children}
      </Container>
    </main>
  );
}

