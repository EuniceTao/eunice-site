/**
 * @file SiteHeader.jsx
 * @description 顶部导航：让房间、工作、笔记、近况与关于我都能被直接访问。
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { Container } from './Container';
import { publicUrl } from '../../lib/publicUrl';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/work', label: '我的工作' },
  { to: '/blog', label: '随手写写' },
  { to: '/now', label: '最近' },
  { to: '/about', label: '关于我' },
];

function SiteNavLink({ to, children }) {
  const baseClassName =
    'font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)] transition-colors duration-300 hover:text-[color:var(--text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black';

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(baseClassName, isActive && 'text-[color:var(--text)]')}
    >
      {children}
    </NavLink>
  );
}

export function SiteHeader({ brand = 'Eunice' }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--bg)]">
      <Container className="flex items-center justify-between py-5">
        <NavLink
          to="/"
          className="font-display text-[20px] font-light leading-none text-[color:var(--text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          {brand}
        </NavLink>

        <nav className="hidden items-center gap-7 md:flex" aria-label="主要导航">
          {navItems.map((item) => (
            <SiteNavLink key={item.to} to={item.to}>
              {item.label}
            </SiteNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={publicUrl('resume.pdf')}
            className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:inline"
          >
            Résumé
          </a>
          <NavLink
            to="/contact"
            className="border border-[color:var(--text)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--text)] transition-colors hover:bg-[color:var(--text)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Contact
          </NavLink>
        </div>
      </Container>
    </header>
  );
}
