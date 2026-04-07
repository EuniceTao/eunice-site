/**
 * @file AdminShell.jsx
 * @description Admin 通用壳：统一顶部导航与退出入口。
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../../design-system';
import { useAdminSession } from './useAdminSession';

function TabLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'font-mono text-[11px] uppercase tracking-[0.15em] transition-colors',
          isActive ? 'text-[color:var(--text)]' : 'text-[color:var(--text-light)] hover:text-[color:var(--text)]',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
}

export function AdminShell({ children }) {
  const navigate = useNavigate();
  const { signOut, user } = useAdminSession();

  return (
    <div>
      <div className="mb-10 border border-[color:var(--border)] bg-white px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <TabLink to="/admin/home">Home</TabLink>
            <TabLink to="/admin/experience">Experience</TabLink>
            <TabLink to="/admin/notes">Notes</TabLink>
            <TabLink to="/admin/now">Now</TabLink>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-light)]">
              {user?.email || ''}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                await signOut();
                navigate('/admin', { replace: true });
              }}
            >
              退出
            </Button>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}

