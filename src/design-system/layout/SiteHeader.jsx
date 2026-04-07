/**
 * @file SiteHeader.jsx
 * @description 顶部导航：黑白灰极简（白底+底边线），以字重/字号作为唯一强调。
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { Container } from './Container';

const navItems = [
  { to: '/', label: 'Home' }, // 首页
  { to: '/experience', label: 'Experience' }, // 经验
  { to: '/blog', label: 'More' }, // 关于我区块入口（笔记等）
  { to: '/contact', label: 'Contact' }, // 联系
];

function SiteNavLink({ to, children }) {
  const baseClassName =
    'font-mono text-[12px] uppercase tracking-[0.15em] text-[color:var(--text-muted)] transition-colors duration-300 hover:text-[color:var(--text)]';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(baseClassName, isActive && 'text-[color:var(--text)]')
      }
    >
      {children}
    </NavLink>
  );
}

export function SiteHeader({ brand = 'Eunice' }) {
  return (
    <header className="sticky top-0 z-40 bg-[color:var(--bg)] border-b border-[color:var(--border)]">
      <Container className="flex items-center justify-between py-5">
        <NavLink
          to="/"
          className="font-display text-[18px] leading-none font-light text-[color:var(--text)]"
        >
          {brand}
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <SiteNavLink key={item.to} to={item.to}>
              {item.label}
            </SiteNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a
            href="/resume.pdf"
            className="font-mono text-[12px] uppercase tracking-[0.15em] text-[color:var(--text-muted)] transition-colors duration-300 hover:text-[color:var(--text)]"
          >
            下载简历
          </a>
          <NavLink
            to="/contact"
            className="md:hidden font-mono text-[12px] uppercase tracking-[0.15em] text-[color:var(--text-muted)] transition-colors duration-300 hover:text-[color:var(--text)]"
          >
            Contact
          </NavLink>
        </div>
      </Container>
    </header>
  );
}

