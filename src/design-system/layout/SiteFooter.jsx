/**
 * @file SiteFooter.jsx
 * @description 站点页脚：轻量信息与外链区域。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';

export function SiteFooter() {
  const year = new Date().getFullYear(); // 年份

  return (
    <footer className="border-t border-slate-100 py-10">
      <Container className="flex flex-col gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>© {year} Eunice</span>
          <span className="text-slate-300">·</span>
          <Link to="/design-system" className="hover:text-slate-600 transition-colors">
            Design System
          </Link>
        </div>
        <p className="max-w-prose">
          少即是多。留白、字体与克制的动效，是我喜欢的表达方式。
        </p>
      </Container>
    </footer>
  );
}

