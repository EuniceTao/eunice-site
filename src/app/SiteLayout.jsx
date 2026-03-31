/**
 * @file SiteLayout.jsx
 * @description 站点通用布局：Header + 内容区 + Footer。
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { SiteFooter, SiteHeader } from '../design-system';

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader brand="Eunice" />
      <Outlet />
      <SiteFooter />
    </div>
  );
}

