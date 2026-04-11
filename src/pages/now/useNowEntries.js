/**
 * @file useNowEntries.js
 * @description Now 数据源：优先 Supabase（已发布），失败则 fallback 本地数据。
 */

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { nowEntries as localNowEntries } from './nowData';

const NOW_CACHE_KEY = 'cache:now_entries:v2';

function normalizeRow(row) {
  const body = Array.isArray(row.body)
    ? row.body.filter(Boolean).map(String)
    : typeof row.body === 'string'
      ? [row.body]
      : [];

  const date =
    typeof row.date === 'string'
      ? row.date
      : row.date instanceof Date
        ? row.date.toISOString().slice(0, 10)
        : '';

  return {
    id: String(row.id),
    date,
    mood: row.mood ? String(row.mood) : '',
    title: String(row.title || ''),
    body,
  };
}

export function useNowEntries({ includeDrafts = false } = {}) {
  const [entries, setEntries] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(NOW_CACHE_KEY) || 'null');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    } catch {
      // ignore
    }
    return supabase ? [] : localNowEntries;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!supabase) return;

      setLoading(true);
      try {
        let q = supabase
          .from('now_entries')
          .select('id,date,mood,title,body,published')
          .order('date', { ascending: false });

        if (!includeDrafts) q = q.eq('published', true);

        const { data, error } = await q;
        if (error) throw error;
        if (cancelled) return;

        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map(normalizeRow);
          setEntries(normalized);
          try {
            localStorage.setItem(NOW_CACHE_KEY, JSON.stringify(normalized));
          } catch {
            // ignore
          }
        }
      } catch {
        if (!cancelled && entries.length === 0) setEntries(localNowEntries);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeDrafts]);

  const updatedAt = useMemo(() => entries?.[0]?.date || '', [entries]);

  return { entries, updatedAt, loading };
}

