/**
 * @file SiteLayout.jsx
 * @description 站点通用布局：极简顶部导航 + 内容区 + Footer。
 */

import React from 'react';
import { SiteFooter, SiteHeader } from '../design-system';
import { AnimatedOutlet } from './AnimatedOutlet';

export function SiteLayout() {
  return (
    <div className="min-h-screen">
      <SiteHeader brand="Eunice" />
      <AnimatedOutlet />
      <SiteFooter />
    </div>
  );
}

