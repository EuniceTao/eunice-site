/**
 * @file ScrollReveal.jsx
 * @description 滚动入场包装器：默认类名 .reveal，进入视口后追加 .visible。
 */

import React from 'react';
import { cn } from '../utils/cn';
import { useScrollReveal } from './useScrollReveal';

export function ScrollReveal({ as: Comp = 'div', className, children }) {
  const ref = useScrollReveal();
  return (
    <Comp ref={ref} className={cn('reveal', className)}>
      {children}
    </Comp>
  );
}

