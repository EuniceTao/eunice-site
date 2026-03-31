/**
 * @file ImageFrame.jsx
 * @description 图片展示框：轻微圆角、细边框与克制的质感阴影。
 */

import React from 'react';
import { cn } from '../utils/cn';

export function ImageFrame({ className, children }) {
  const baseClassName =
    'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'; // 基础样式

  return <div className={cn(baseClassName, className)}>{children}</div>;
}

