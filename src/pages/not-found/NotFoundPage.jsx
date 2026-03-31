/**
 * @file NotFoundPage.jsx
 * @description 404 页面：给用户一个可返回的出口。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../design-system';

export function NotFoundPage() {
  return (
    <Page
      title="404"
      description="你要找的页面不在这里。也许它还没写好，或者换了个位置。"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-7">
        <p className="text-sm leading-relaxed text-slate-600">
          你可以回到首页，或者去看看作品与文章。
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 transition-colors"
          >
            回到首页
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-colors"
          >
            去作品集 →
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-colors"
          >
            去博客 →
          </Link>
        </div>
      </div>
    </Page>
  );
}

