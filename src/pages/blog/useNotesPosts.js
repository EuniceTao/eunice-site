/**
 * @file useNotesPosts.js
 * @description Notes 数据源：前台优先 Supabase（已发布），失败 fallback 本地 blogData。
 */

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { posts as localPosts } from './blogData';

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
  const [posts, setPosts] = useState(localPosts);
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
          setPosts(slug ? normalized : normalized);
        }
      } catch {
        // fallback stays local
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [includeDrafts, slug]);

  const post = useMemo(() => {
    if (!slug) return null;
    return posts.find((p) => p.slug === slug) ?? null;
  }, [posts, slug]);

  return { posts, post, loading };
}

