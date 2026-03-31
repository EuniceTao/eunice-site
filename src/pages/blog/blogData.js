/**
 * @file blogData.js
 * @description 博客元数据与内容源（使用 Vite 的 `?raw` 读取 Markdown）。
 */

import helloMinimalism from '../../content/blog/hello-minimalism.md?raw';
import nowPageNotes from '../../content/blog/now-page-notes.md?raw';

export const posts = [
  {
    slug: 'hello-minimalism', // 路由 slug
    title: '极简不是空：留白如何让内容更有力量', // 标题
    date: '2026-03-30', // 日期
    summary: '谈谈我为什么偏爱克制的排版，以及留白如何提升阅读体验。', // 摘要
    body: helloMinimalism, // 正文
  },
  {
    slug: 'now-page-notes',
    title: '写一页 Now：把近况写成一封小信',
    date: '2026-03-30',
    summary: 'Now 页为什么加分？以及我会怎样写它。',
    body: nowPageNotes,
  },
].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null;
}

