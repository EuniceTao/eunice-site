/**
 * @file SiteLayout.jsx
 * @description 站点通用布局：内容区 + Footer（无顶部导航）。
 */

import React from 'react';
import { SiteFooter } from '../design-system';
import { AnimatedOutlet } from './AnimatedOutlet';

export function SiteLayout() {
  return (
    <div className="min-h-screen text-slate-900">
      <AnimatedOutlet />
      <SiteFooter />
    </div>
  );
}

