/**
 * @file Markdown.jsx
 * @description Markdown 渲染器：提供一套极简但可读的排版样式。
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';

const components = {
  h1: (props) => (
    <h1 className="mt-8 text-2xl font-medium tracking-tight text-slate-900" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 text-xl font-medium tracking-tight text-slate-900" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 text-lg font-medium tracking-tight text-slate-900" {...props} />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-slate-700" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-slate-200 pl-4 text-slate-600"
      {...props}
    />
  ),
  a: (props) => (
    <a className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500 transition-colors" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-slate-50 px-1.5 py-0.5 text-[0.9em] text-slate-800" {...props} />
  ),
};

export function Markdown({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}

