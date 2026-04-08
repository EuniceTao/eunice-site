/**
 * @file NotFoundPage.jsx
 * @description 404 页面：给用户一个可返回的出口。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../design-system';
import { Markdown } from '../blog/Markdown';
import { useSiteBlock } from '../site-blocks/useSiteBlock';

export function NotFoundPage() {
  const { content: copy } = useSiteBlock('copy.misc', {
    fallback: {
      title: '404',
      pageDescriptionMd: '你要找的页面不在这里。也许它还没写好，或者换了个位置。',
      bodyMd: '你可以回到首页，或者去看看作品与文章。',
      ctaHome: '回到首页',
      ctaProjects: '去作品集 →',
      ctaBlog: '去博客 →',
    },
  });

  return (
    <Page
      title={copy?.title || '404'}
      description={copy?.pageDescriptionMd || '你要找的页面不在这里。也许它还没写好，或者换了个位置。'}
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-7">
        <div className="text-sm leading-relaxed text-slate-600">
          <Markdown>{copy?.bodyMd || '你可以回到首页，或者去看看作品与文章。'}</Markdown>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 transition-colors"
          >
            {copy?.ctaHome || '回到首页'}
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-colors"
          >
            {copy?.ctaProjects || '去作品集 →'}
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-colors"
          >
            {copy?.ctaBlog || '去博客 →'}
          </Link>
        </div>
      </div>
    </Page>
  );
}

