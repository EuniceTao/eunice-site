/**
 * @file SiteHeader.jsx
 * @description 站点顶部导航：极简、可读性强、移动端友好。
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { Container } from './Container';

const navItems = [
  { to: '/', label: 'Home' }, // 首页
  { to: '/about', label: 'About' }, // 关于
  { to: '/projects', label: 'Work' }, // 作品
  { to: '/blog', label: 'Blog' }, // 博客
  { to: '/now', label: 'Now' }, // 此刻
  { to: '/contact', label: 'Contact' }, // 联系
];

function SiteNavLink({ to, children }) {
  const baseClassName =
    'text-sm tracking-wide text-slate-500 hover:text-slate-900 transition-colors'; // 基础样式

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(baseClassName, isActive && 'text-slate-900')
      }
    >
      {children}
    </NavLink>
  );
}

export function SiteHeader({ brand = 'Eunice' }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-baseline gap-3">
          <NavLink to="/" className="text-sm font-semibold text-slate-900">
            {brand}
          </NavLink>
          <span className="text-xs text-slate-400">personal site</span>
        </div>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <SiteNavLink key={item.to} to={item.to}>
              {item.label}
            </SiteNavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="md:hidden text-xs tracking-widest uppercase text-slate-500 hover:text-slate-900 transition-colors"
        >
          Contact →
        </NavLink>
      </Container>
    </header>
  );
}

