/**
 * @file useNotesPosts.js
 * @description Notes 数据源：前台优先 Supabase（已发布），失败 fallback 本地 blogData。
 */

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { posts as localPosts } from './blogData';

const NOTES_CACHE_KEY = 'cache:notes_posts:v1';

function normalizeRow(row) {
  const date =
    typeof row.date === 'string'
      ? row.date
      : row.date instanceof Date
        ? row.date.toISOString().slice(0, 10)
        : '';

  return {
    id: String(row.id),
    slug: String(row.slug || ''),
    title: String(row.title || ''),
    date,
    summary: String(row.summary || ''),
    body: String(row.body_md || ''),
    published: Boolean(row.published),
  };
}

export function useNotesPosts({ includeDrafts = false, slug } = {}) {
  const [posts, setPosts] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(NOTES_CACHE_KEY) || 'null');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    } catch {
      // ignore
    }
    // 关键：避免先渲染本地默认内容导致“闪一下”
    // 若能连 supabase，先空；否则再 fallback 本地
    return supabase ? [] : localPosts;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!supabase) return;
      setLoading(true);

      try {
        let q = supabase
          .from('notes_posts')
          .select('id,slug,title,summary,body_md,date,published')
          .order('date', { ascending: false });

        if (!includeDrafts) q = q.eq('published', true);
        if (slug) q = q.eq('slug', slug).limit(1);

        const { data, error } = await q;
        if (error) throw error;
        if (cancelled) return;

        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map(normalizeRow);
          setPosts(normalized);
          try {
            localStorage.setItem(NOTES_CACHE_KEY, JSON.stringify(normalized));
          } catch {
            // ignore
          }
        } else if (!slug) {
          // 远程为空时，前台页不强行回退到本地默认（避免闪）；保持当前即可
        }
      } catch {
        // fallback stays local
        if (!cancelled && posts.length === 0) setPosts(localPosts);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeDrafts, slug]);

  const post = useMemo(() => {
    if (!slug) return null;
    return posts.find((p) => p.slug === slug) ?? null;
  }, [posts, slug]);

  return { posts, post, loading };
}

