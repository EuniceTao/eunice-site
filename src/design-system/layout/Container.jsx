/**
 * @file Container.jsx
 * @description 全站内容容器：控制最大宽度与左右留白。
 */

import React from 'react';
import { cn } from '../utils/cn';

export function Container({ as: Comp = 'div', className, children }) {
  const baseClassName = 'mx-auto w-full max-w-5xl px-6'; // 基础样式

  return <Comp className={cn(baseClassName, className)}>{children}</Comp>;
}

