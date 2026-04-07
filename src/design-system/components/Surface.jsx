/**
 * @file Surface.jsx
 * @description Surface：统一卡片/容器的底色、圆角与阴影层次（轻拟物质感）。
 */

import React from 'react';
import { cn } from '../utils/cn';

const variants = {
  default: 'bg-[var(--surface)] border border-[color:var(--border)] shadow-[var(--shadow-soft)]',
  flat: 'bg-[var(--surface)] border border-[color:var(--border)]',
  lift: 'bg-[var(--surface)] border border-[color:var(--border)] shadow-[var(--shadow-lift)]',
  soft: 'bg-[var(--surface-soft)] border border-[color:var(--border)] backdrop-blur-md',
  dark: 'bg-slate-950 text-slate-50',
};

export function Surface({ as: Comp = 'div', variant = 'default', className, children }) {
  const base = 'rounded-2xl'; // 统一圆角
  return <Comp className={cn(base, variants[variant], className)}>{children}</Comp>;
}

