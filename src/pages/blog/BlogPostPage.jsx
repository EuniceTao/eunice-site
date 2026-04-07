/**
 * @file BlogPostPage.jsx
 * @description 博客文章页：按 slug 展示 Markdown。
 */

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Page } from '../../design-system';
import { Markdown } from './Markdown';
import { useNotesPosts } from './useNotesPosts';

export function BlogPostPage() {
  const { slug } = useParams(); // 路由参数
  const { post } = useNotesPosts({ slug });

  if (!post) {
    return (
      <Page title="Not found" description="这篇文章可能还没写好，或者链接写错了。">
        <Link
          to="/blog"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← 返回文章列表
        </Link>
      </Page>
    );
  }

  return (
    <Page title={post.title} description={post.summary}>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="uppercase tracking-widest">{post.date}</span>
        <Link
          to="/blog"
          className="hover:text-slate-600 transition-colors"
        >
          ← All posts
        </Link>
      </div>

      <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 md:p-10">
        <Markdown>{post.body}</Markdown>
      </article>
    </Page>
  );
}

