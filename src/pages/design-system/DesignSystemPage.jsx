/**
 * @file DesignSystemPage.jsx
 * @description 设计系统展示主页面，汇总 Tokens 和 Components 展示区块。
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TokensSection } from './TokensSection';
import { ComponentsSection } from './ComponentsSection';

const tabs = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'components', label: 'Components' },
];

export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('tokens');

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-slate-400 hover:text-slate-900 transition-colors text-sm"
            >
              ← 返回首页
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              Design System
            </h1>
          </div>

          {/* Tab 切换 */}
          <nav className="flex gap-1 rounded-lg bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {activeTab === 'tokens' && <TokensSection />}
        {activeTab === 'components' && <ComponentsSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        Design System · Built with React + Tailwind CSS
      </footer>
    </div>
  );
}
